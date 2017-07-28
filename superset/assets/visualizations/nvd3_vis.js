// JS
import $ from 'jquery';
import throttle from 'lodash.throttle';
import d3 from 'd3';

import { category21 } from '../javascripts/modules/colors';
import { timeFormatFactory, formatDate } from '../javascripts/modules/dates';
import { customizeToolTip, tryNumify } from '../javascripts/modules/utils';

import { TIME_STAMP_OPTIONS } from '../javascripts/explore/stores/controls';

const nv = require('nvd3');

// CSS
require('../node_modules/nvd3/build/nv.d3.min.css');
require('./nvd3_vis.css');

const timeStampFormats = TIME_STAMP_OPTIONS.map(opt => opt[0]);
const minBarWidth = 15;
const animationTime = 1000;

const BREAKPOINTS = {
  small: 340,
};

const addTotalBarValues = function (svg, chart, data, stacked, axisFormat) {
  const format = d3.format(axisFormat || '.3s');
  const countSeriesDisplayed = data.length;

  const totalStackedValues = stacked && data.length !== 0 ?
    data[0].values.map(function (bar, iBar) {
      const bars = data.map(function (series) {
        return series.values[iBar];
      });
      return d3.sum(bars, function (d) {
        return d.y;
      });
    }) : [];

  const rectsToBeLabeled = svg.selectAll('g.nv-group').filter(
    function (d, i) {
      if (!stacked) {
        return true;
      }
      return i === countSeriesDisplayed - 1;
    }).selectAll('rect.positive');

  const groupLabels = svg.select('g.nv-barsWrap').append('g');
  rectsToBeLabeled.each(
    function (d, index) {
      const rectObj = d3.select(this);
      const transformAttr = rectObj.attr('transform');
      const yPos = parseFloat(rectObj.attr('y'));
      const xPos = parseFloat(rectObj.attr('x'));
      const rectWidth = parseFloat(rectObj.attr('width'));
      const t = groupLabels.append('text')
        .attr('x', xPos) // rough position first, fine tune later
        .attr('y', yPos - 5)
        .text(format(stacked ? totalStackedValues[index] : d.y))
        .attr('transform', transformAttr)
        .attr('class', 'bar-chart-label');
      const labelWidth = t.node().getBBox().width;
      t.attr('x', xPos + rectWidth / 2 - labelWidth / 2); // fine tune
    });
};

function hideTooltips() {
  $('.nvtooltip').css({ opacity: 0 });
}

function getMaxLabelSize(container, axisClass) {
  // axis class = .nv-y2  // second y axis on dual line chart
  // axis class = .nv-x  // x axis on time series line chart
  const labelEls = container.find(`.${axisClass} text`).not('.nv-axislabel');
  const labelDimensions = labelEls.map(i => labelEls[i].getComputedTextLength());
  return Math.max(...labelDimensions);
}

function nvd3Vis(slice, payload) {
  let chart;
  let colorKey = 'key';
  const isExplore = $('#explore-container').length === 1;

  slice.container.html('');
  slice.clearError();

  // Calculates the longest label size for stretching bottom margin
  function calculateStretchMargins(payloadData) {
    let stretchMargin = 0;
    const pixelsPerCharX = 4.5; // approx, depends on font size
    let maxLabelSize = 10; // accommodate for shorter labels
    payloadData.data.forEach((d) => {
      const axisLabels = d.values;
      for (let i = 0; i < axisLabels.length; i++) {
        maxLabelSize = Math.max(axisLabels[i].x.toString().length, maxLabelSize);
      }
    });
    stretchMargin = Math.ceil(pixelsPerCharX * maxLabelSize);
    return stretchMargin;
  }

  let width = slice.width();
  const fd = slice.formData;

  const barchartWidth = function () {
    let bars;
    if (fd.bar_stacked) {
      bars = d3.max(payload.data, function (d) { return d.values.length; });
    } else {
      bars = d3.sum(payload.data, function (d) { return d.values.length; });
    }
    if (bars * minBarWidth > width) {
      return bars * minBarWidth;
    }
    return width;
  };

  const vizType = fd.viz_type;
  const f = d3.format('.3s');
  const reduceXTicks = fd.reduce_x_ticks || false;
  let stacked = false;
  let row;

  const drawGraph = function () {
    let svg = d3.select(slice.selector).select('svg');
    if (svg.empty()) {
      svg = d3.select(slice.selector).append('svg');
    }
    switch (vizType) {
      case 'line':
        if (fd.show_brush) {
          chart = nv.models.lineWithFocusChart();
          chart.focus.xScale(d3.time.scale.utc());
          chart.x2Axis
          .showMaxMin(fd.x_axis_showminmax)
          .staggerLabels(false);
        } else {
          chart = nv.models.lineChart();
        }
        // To alter the tooltip header
        // chart.interactiveLayer.tooltip.headerFormatter(function(){return '';});
        chart.xScale(d3.time.scale.utc());
        chart.interpolate(fd.line_interpolation);
        chart.xAxis
        .showMaxMin(fd.x_axis_showminmax)
        .staggerLabels(false);
        break;

      case 'dual_line':
        chart = nv.models.multiChart();
        chart.interpolate('linear');
        break;

      case 'bar':
        chart = nv.models.multiBarChart()
        .showControls(fd.show_controls)
        .groupSpacing(0.1);

        if (!reduceXTicks) {
          width = barchartWidth();
        }
        chart.width(width);
        chart.xAxis
        .showMaxMin(false)
        .staggerLabels(true);

        stacked = fd.bar_stacked;
        chart.stacked(stacked);

        if (fd.show_bar_value) {
          setTimeout(function () {
            addTotalBarValues(svg, chart, payload.data, stacked, fd.y_axis_format);
          }, animationTime);
        }
        break;

      case 'dist_bar':
        chart = nv.models.multiBarChart()
        .showControls(fd.show_controls)
        .reduceXTicks(reduceXTicks)
        .rotateLabels(45)
        .groupSpacing(0.1); // Distance between each group of bars.

        chart.xAxis
        .showMaxMin(false);

        stacked = fd.bar_stacked;
        chart.stacked(stacked);
        if (fd.order_bars) {
          payload.data.forEach((d) => {
            d.values.sort((a, b) => tryNumify(a.x) < tryNumify(b.x) ? -1 : 1);
          });
        }
        if (fd.show_bar_value) {
          setTimeout(function () {
            addTotalBarValues(svg, chart, payload.data, stacked, fd.y_axis_format);
          }, animationTime);
        }
        if (!reduceXTicks) {
          width = barchartWidth();
        }
        chart.width(width);
        break;

      case 'pie':
        chart = nv.models.pieChart();
        colorKey = 'x';
        chart.valueFormat(f);
        if (fd.donut) {
          chart.donut(true);
        }
        chart.labelsOutside(fd.labels_outside);
        chart.labelThreshold(0.05)  // Configure the minimum slice size for labels to show up
          .labelType(fd.pie_label_type);
        chart.cornerRadius(true);

        if (fd.pie_label_type === 'percent') {
          let total = 0;
          payload.data.forEach((d) => { total += d.y; });
          chart.tooltip.valueFormatter(d => `${((d / total) * 100).toFixed()}%`);
        }

        break;

      case 'column':
        chart = nv.models.multiBarChart()
        .reduceXTicks(false)
        .rotateLabels(45);
        break;

      case 'compare':
        chart = nv.models.cumulativeLineChart();
        chart.xScale(d3.time.scale.utc());
        chart.useInteractiveGuideline(true);
        chart.xAxis
        .showMaxMin(false)
        .staggerLabels(true);
        break;

      case 'bubble':
        row = (col1, col2) => `<tr><td>${col1}</td><td>${col2}</td></tr>`;
        chart = nv.models.scatterChart();
        chart.showDistX(true);
        chart.showDistY(true);
        chart.tooltip.contentGenerator(function (obj) {
          const p = obj.point;
          let s = '<table>';
          s += (
            `<tr><td style="color: ${p.color};">` +
              `<strong>${p[fd.entity]}</strong> (${p.group})` +
            '</td></tr>');
          s += row(fd.x, f(p.x));
          s += row(fd.y, f(p.y));
          s += row(fd.size, f(p.size));
          s += '</table>';
          return s;
        });
        chart.pointRange([5, fd.max_bubble_size ** 2]);
        chart.pointDomain([0, d3.max(payload.data, d => d3.max(d.values, v => v.size))]);
        break;

      case 'area':
        chart = nv.models.stackedAreaChart();
        chart.showControls(fd.show_controls);
        chart.style(fd.stacked_style);
        chart.xScale(d3.time.scale.utc());
        chart.xAxis
        .showMaxMin(fd.x_axis_showminmax)
        .staggerLabels(true);
        break;

      case 'box_plot':
        colorKey = 'label';
        chart = nv.models.boxPlotChart();
        chart.x(function (d) {
          return d.label;
        });
        chart.staggerLabels(true);
        chart.maxBoxWidth(75); // prevent boxes from being incredibly wide
        break;

      case 'bullet':
        chart = nv.models.bulletChart();
        break;

      case 'multichart': 

        //chart = nv.models.multiChart();
        //chart.interpolate('linear');
        //console.log('superset/assets/visualizations/nvd3_vis.js multichart in ', chart)
        //break;

         /*
         var groups = 8;
         var points = 20;
         var mh = 80; //1000;
         //shapes = ['circle'],
         var rdata = [],
            shapes = ['thin-x', 'circle', 'cross',
                      'triangle-up', 'triangle-down',
                      'diamond', 'square'],
            random = d3.random.normal();

         for (var i = 0; i < groups; i++) {
            rdata.push({
                key: 'Group ' + i,
                values: [],
                slope: Math.random() - .01,
                intercept: Math.random() - .5
            });

            for (var j = 0; j < points; j++) {
                rdata[i].values.push({
                    x: random() * mh,
                    y: random() * mh,
                    size: Math.random(),
                    shape: shapes[j % shapes.length]
                });
            }
         }


         for ( var t=0; t<rdata.length; t++){
           switch(t){
            case 0:    rdata[t].type = "scatter";
                       rdata[t].yAxis = 1;
                       break; 
            case 1:    rdata[t].type = "bar";
                       rdata[t].yAxis = 1;
                       break;
            //case 2:    rdata[t].type = "line";
            //           rdata[t].yAxis = 2;
            //           break;
            //case 3:    rdata[t].type = "line";
            //           rdata[t].yAxis = 1;
            //           break;
            default:
                       rdata[t].type = "scatter";
                       rdata[t].yAxis = 1;
                       break;
           }
         }

         var groupdata = rdata.concat(payload.data);
         console.log('visualizations/nvd3_vis.js shape data', payload.data, rdata, groupdata);
         var orgdata = payload.data;
         payload.data = groupdata;

         */
         console.log('visualizations/nvd3_vis.js shape data', payload.data);
         nv.utils.symbolMap.set('thin-x', function(size) {
         size = Math.sqrt(size);
         return 'M' + (-size/2) + ',' + (-size/2) +
                'l' + size + ',' + size +
                'm0,' + -(size) +
                'l' + (-size) + ',' + size;
         });

         var chart = nv.models.multiChart()
            .margin({top: 30, right: 60, bottom: 50, left: 70})
            .useVoronoi(true)
            .color(d3.scale.category10().range())
            .duration(300)

         chart.yAxis1.tickFormat(d3.format('.02f'));
         chart.yAxis2.tickFormat(d3.format('.02f'));
         chart.xAxis
              .staggerLabels(false)
              .tickFormat(d3.format('.02f'));

         //chart.interpolate('linear');
         chart.useInteractiveGuideline(true)
         chart.interactiveLayer.tooltip(
                {
                    enabled: true,
                    contentGenerator: function(d) {
                        var header = moment(d.value).format('dddd, MMM Do YYYY, hh:mm:ss A');
                        var headerhtml = "<thead><tr><td colspan='3'><strong class='x-value'>" + header + "</strong></td></tr></thead>";
                        var bodyhtml = "<tbody>";
                        var series = d.series;
                        series.forEach(function(c) {
                            bodyhtml = bodyhtml + "<tr><td class='legend-color-guide'><div style='background-color: " + c.color + ";'></div></td><td class='key'>" + c.key + "</td><td class='value'>" + c.value + "</td></tr>";
                        });
                        bodyhtml = bodyhtml+"</tbody>";
                        return "<table>"+headerhtml+''+bodyhtml+"</table>";
                    }
                })

         //d3.select('#chart1 svg')
         //    .datum(testdata)
         //    .transition().duration(500).call(chart);
         //nv.utils.windowResize(chart.update);

         break;

      default:
        throw new Error('Unrecognized visualization for nvd3' + vizType);

    }

    if ('showLegend' in chart && typeof fd.show_legend !== 'undefined') {
      if (width < BREAKPOINTS.small && vizType !== 'pie') {
        chart.showLegend(false);
      } else {
        chart.showLegend(fd.show_legend);
      }
    }

    let height = slice.height();
    if (vizType === 'bullet') {
      height = Math.min(height, 50);
    }

    chart.height(height);
    slice.container.css('height', height + 'px');

    if ((vizType === 'line' || vizType === 'area') && fd.rich_tooltip) {
      chart.useInteractiveGuideline(true);
    }
    if (chart.forceY &&
        fd.y_axis_bounds &&
        (fd.y_axis_bounds[0] !== null || fd.y_axis_bounds[1] !== null)) {
      chart.forceY(fd.y_axis_bounds);
    }
    if (fd.y_log_scale) {
      chart.yScale(d3.scale.log());
    }
    if (fd.x_log_scale) {
      chart.xScale(d3.scale.log());
    }
    let xAxisFormatter;
    if (vizType === 'bubble') {
      xAxisFormatter = d3.format('.3s');
    } else if (fd.x_axis_format === 'smart_date') {
      xAxisFormatter = formatDate;
      chart.xAxis.tickFormat(xAxisFormatter);
    } else if (fd.x_axis_format !== undefined) {
      xAxisFormatter = timeFormatFactory(fd.x_axis_format);
      chart.xAxis.tickFormat(xAxisFormatter);
    }

    const isTimeSeries = timeStampFormats.indexOf(fd.x_axis_format) > -1;
    // if x axis format is a date format, rotate label 90 degrees
    if (isTimeSeries) {
      chart.xAxis.rotateLabels(45);
    }

    if (chart.hasOwnProperty('x2Axis')) {
      chart.x2Axis.tickFormat(xAxisFormatter);
      height += 30;
    }

    if (vizType === 'bubble') {
      chart.xAxis.tickFormat(d3.format('.3s'));
    } else if (fd.x_axis_format === 'smart_date') {
      chart.xAxis.tickFormat(formatDate);
    } else if (fd.x_axis_format !== undefined) {
      chart.xAxis.tickFormat(timeFormatFactory(fd.x_axis_format));
    }
    if (chart.yAxis !== undefined) {
      chart.yAxis.tickFormat(d3.format('.3s'));
    }

    if (fd.y_axis_format && chart.yAxis) {
      chart.yAxis.tickFormat(d3.format(fd.y_axis_format));
      if (chart.y2Axis !== undefined) {
        chart.y2Axis.tickFormat(d3.format(fd.y_axis_format));
      }
    }
    if (vizType !== 'bullet') {
      chart.color(d => category21(d[colorKey]));
    }

    if (fd.x_axis_label && fd.x_axis_label !== '' && chart.xAxis) {
      let distance = 0;
      if (fd.bottom_margin && !isNaN(fd.bottom_margin)) {
        distance = fd.bottom_margin - 50;
      }
      chart.xAxis.axisLabel(fd.x_axis_label).axisLabelDistance(distance);
    }

    if (fd.y_axis_label && fd.y_axis_label !== '' && chart.yAxis) {
      chart.yAxis.axisLabel(fd.y_axis_label);
      chart.margin({ left: 90 });
    }

    if (fd.bottom_margin === 'auto') {
      if (vizType === 'dist_bar') {
        const stretchMargin = calculateStretchMargins(payload);
        chart.margin({ bottom: stretchMargin });
      } else {
        chart.margin({ bottom: 50 });
      }
    } else {
      chart.margin({ bottom: fd.bottom_margin });
    }

    if (vizType === 'dual_line') {
      const yAxisFormatter1 = d3.format(fd.y_axis_format);
      const yAxisFormatter2 = d3.format(fd.y_axis_2_format);
      chart.yAxis1.tickFormat(yAxisFormatter1);
      chart.yAxis2.tickFormat(yAxisFormatter2);
      customizeToolTip(chart, xAxisFormatter, [yAxisFormatter1, yAxisFormatter2]);
      chart.showLegend(width > BREAKPOINTS.small);
    }
    svg
    .datum(payload.data)
    .transition().duration(500)
    .attr('height', height)
    .attr('width', width)
    .call(chart);

    if (fd.show_markers) {
      svg.selectAll('.nv-point')
      .style('stroke-opacity', 1)
      .style('fill-opacity', 1);
    }

    if (chart.yAxis !== undefined || chart.yAxis2 !== undefined) {
      // Hack to adjust y axis left margin to accommodate long numbers
      const marginPad = isExplore ? width * 0.01 : width * 0.03;
      const maxYAxisLabelWidth = chart.yAxis2 ? getMaxLabelSize(slice.container, 'nv-y1')
                                              : getMaxLabelSize(slice.container, 'nv-y');
      const maxXAxisLabelHeight = getMaxLabelSize(slice.container, 'nv-x');
      chart.margin({ left: maxYAxisLabelWidth + marginPad });
      if (fd.y_axis_label && fd.y_axis_label !== '') {
        chart.margin({ left: maxYAxisLabelWidth + marginPad + 25 });
      }
      // Hack to adjust margins to accommodate long axis tick labels.
      // - has to be done only after the chart has been rendered once
      // - measure the width or height of the labels
      // ---- (x axis labels are rotated 45 degrees so we use height),
      // - adjust margins based on these measures and render again
      if (isTimeSeries && vizType !== 'bar') {
        const chartMargins = {
          bottom: maxXAxisLabelHeight + marginPad,
          right: maxXAxisLabelHeight + marginPad,
        };

        if (vizType === 'dual_line') {
          const maxYAxis2LabelWidth = getMaxLabelSize(slice.container, 'nv-y2');
          // use y axis width if it's wider than axis width/height
          if (maxYAxis2LabelWidth > maxXAxisLabelHeight) {
            chartMargins.right = maxYAxis2LabelWidth + marginPad;
          }
        }

        // apply margins
        chart.margin(chartMargins);
      }
      if (fd.x_axis_label && fd.x_axis_label !== '' && chart.xAxis) {
        chart.margin({ bottom: maxXAxisLabelHeight + marginPad + 25 });
      }

      // render chart
      svg
      .datum(payload.data)
      .transition().duration(500)
      .attr('height', height)
      .attr('width', width)
      .call(chart);
    }

    // on scroll, hide tooltips. throttle to only 4x/second.
    $(window).scroll(throttle(hideTooltips, 250));

    return chart;
  };

  // hide tooltips before rendering chart, if the chart is being re-rendered sometimes
  // there are left over tooltips in the dom,
  // this will clear them before rendering the chart again.
  hideTooltips();

  nv.addGraph(drawGraph);
}

module.exports = nvd3Vis;
