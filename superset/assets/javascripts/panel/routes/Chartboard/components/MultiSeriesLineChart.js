import * as d3 from 'd3';
import * as topojson from 'topojson';
import React from 'react';
import ReactDOM from 'react-dom';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import PageBase from '../../../components/PageBase';

export default class MultiSeriesLineChart extends React.Component {
    constructor(props){
      super(props);
      this.dm = null;
    }

    draw(){
      var svg = d3.select("#mm-container-svg"),
          margin = {top: 20, right: 80, bottom: 30, left: 50},
          width = svg.attr("width") - margin.left - margin.right,
          height = svg.attr("height") - margin.top - margin.bottom,
          g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var parseTime = d3.timeParse("%Y%m%d");

      var x = d3.scaleTime().range([0, width]),
          y = d3.scaleLinear().range([height, 0]),
          z = d3.scaleOrdinal(d3.schemeCategory10);

      var line = d3.line()
          .curve(d3.curveBasis)
          .x(function(d) { return x(d.name); })
          .y(function(d) { return y(d.value); });

      d3.json(window.ihme.office.getFromLocalStorage('inputDataSourceAPI'), function(error, data) {
        if (error) throw error;

        var nm_values = [];
        nm_values[0]={id: 'nm_lower', values:[]}, nm_values[1]={id: 'nm_mean', values:[]}, nm_values[2] = {id: 'nm_upper', values:[]};
        
        for( var i=0; i<data.length;i++){
             nm_values[0].values.push({name:data[i].year_id, value: data[i].nm_lower}); 
             nm_values[1].values.push({name:data[i].year_id, value: data[i].nm_mean}); 
             nm_values[2].values.push({name:data[i].year_id, value: data[i].nm_upper}); 
        }

        console.log('nm_values', nm_values);
        x.domain(d3.extent(data, function(d) { return d.id; }));

        y.domain([
          d3.min(nm_values, function(c) { return d3.min(c.values, function(d) { return d.value; }); }),
          d3.max(nm_values, function(c) { return d3.max(c.values, function(d) { return d.value; }); })
        ]);

        z.domain(nm_values.map(function(c) { return c.name; }));

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("fill", "#000")
            .text("NM");

        var nm_value = g.selectAll(".nm_value")
          .data(nm_values)
          .enter().append("g")
            .attr("class", "nm_value");

        nm_value.append("path")
            .attr("class", "line")
            .attr("d", function(d) { return line(d.values); })
            .style("stroke", function(d) { return z(d.id); });

        nm_value.append("text")
            .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
            .attr("transform", function(d) { return "translate(" + x(d.value.name) + "," + y(d.value.value) + ")"; })
            .attr("x", 3)
            .attr("dy", "0.35em")
            .style("font", "10px sans-serif")
            .text(function(d) { return d.id; });
      });

    }

    componentDidMount(){
          // Redraw based on the new size whenever the browser window is resized.
          var self = this; 
          this.dm = this.draw();
    }

    render() {
      return (
       <PageBase navigation="Multi variate Choropleth Map ">
         <div id="mm-container" style={{position: 'relative', width: '100%', height: '400', }}>
         <svg id="mm-container-svg" style={{position: 'relative', width: '100%', height: '100%', }}></svg>
         </div>
       </PageBase>
      );
    }
}
