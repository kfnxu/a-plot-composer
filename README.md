# plot composer

A web based tool for end user to compose data visualization plots into dashboard to tell a data story.

![Multichart](/screenshots/plot.composer.multichart.scatter.png)
![Compare - Dashboard](/screenshots/plot.composer.dashboard.bubble.compare.png)
![Heatmap data binding - Data and Plot](/screenshots/plot.composer.plot.heatmap.png)
![Define data set - Data Query](/screenshots/plot.composer.sqllab.png)
![Plot - List](/screenshots/plot.composer.slice.list.png)
![Dashboard - list](/screenshots/plot.composer.dashboard.png)
![Data json format - Data api](/screenshots/plot.composer.data.api.png)

## Table of Contents

* [Motivation](#Motivation]
* [Architecture](#Architecture)
* [UX design pattern](#UX design pattern)
* [Additional resources](#additional-resources)

## Motivation
* use Material Design for UX
* decouple client-side dependency from backend templates
* change data request to API based

## Architecture 
* client-side: react-redux-material-ui-d3
* server-side: Flask App Builder

## UX design pattern 
* Material design

## Prerequisites
* python 2.7
* python-setuptools
* gcc gcc-c++ libffi-devel python-devel python-pip python-wheel openssl-devel libsasl2-devel openldap-devel
* proxy server such as Nginx ( see nginx/proxy.conf example )

## New Chart Types
* multichart

![Multichart selection](/screenshots/plot.composer.new.chart.workflow.png)

## Procedure for Adding New Chart Type
primary
-superset/assets/javascripts/explore/stores/visTypes.js
 for defining plot-slice control panel setting
-superset/viz.py
 for defining how data processed

data flow

```
  panel store create-react-store->
  panel index->
  panel router->
  routes/Chartboard/component/charboard->
  javascripts/explore/index.jsx->
  VizTypeControl->
  routes/Chartboard/component/charboard->
  XHR /superset/datasources/->
  XHR /superset/favstar/slice/120/count->
  XHR /superset/explore_json/table/3/?form_data->
  superset/views/core.py get_viz->
  javascripts/explore/components/ChartContainer.jsx vizMap->
  visualizations/nvd3_vis.js->
```
files and code sections

```
# -a-plot-composer/superset/assets/javascripts/explore/stores/visTypes.js
   multichart: {
    label: 'Multi Chart',

    requiresTime: true,
    controlPanelSections: [
      {
        label: 'Chart Options',
        controlSetRows: [
          ['x_axis_format'],
        ],
      },
      {
        label: 'Y Axis 1',
        controlSetRows: [
          ['metric'],
          ['y_axis_format'],
        ],
      },
      {
        label: 'Y Axis 2',
        controlSetRows: [
          ['metric_2'],
          ['y_axis_2_format'],
        ],
      },
    ],

   },

# - a-plot-composer/superset/assets/visualizations/nvd3_vis.js

    case 'multichart': 

         var groups = 8;
         var points = 20;
         var mh = 1000;
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

         break;

# - a-plot-composer/superset/viz.py

   class NVD3MultiChartViz(NVD3DualLineViz):

     """A multichart """

     viz_type = "multichart"
     sort_series = True
     verbose_name = _("MultiChart")


   viz_types_list = [
     ...
     NVD3TimeSeriesBarViz,
     NVD3MultiChartViz,

# - a-plot-composer/superset/assets/backendSync.json

        [
          "multichart",
          "Multi Chart",
          "/static/assets/images/viz_thumbnails/multichart.png"
        ],
        [
          "mapbox",
          "Mapbox",
          "/static/assets/images/viz_thumbnails/mapbox.png"
        ]

# - a-plot-composer/superset/assets/visualizations/main.js

   const vizMap = {
     ...
     markup: require('./markup.js'),
     multichart: require('./nvd3_vis.js'),

# - a-plot-composer/superset/views/core.py 

   def get_viz(
        ...
        if slice_id:
            ...
        else:
            form_data = self.get_form_data()
            viz_type = form_data.get('viz_type', 'table')
            datasource = ConnectorRegistry.get_datasource(
                datasource_type, datasource_id, db.session)
            print("debug multichart")
            print(viz_type)
            print(form_data)
            print(datasource)
            print(viz)
            print(viz.viz_types[viz_type])
            print("end of multichart")
            viz_obj = viz.viz_types[viz_type](
                datasource,
                form_data=form_data,
            )
            return viz_obj
            
# - sql example for multichart ( not implemented yet )
SELECT x, y, plot_type_id, plot_name_id
from
(SELECT year as x, SP_URB_TOTL as y, 1 as plot_type_id, (SP_URB_TOTL+SE_XPD_TOTL_GD_ZS) as x_std, (SP_URB_TOTL+SE_TER_ENRR) as y_std, 101 as plot_name_id
from wb_health_population
where SP_URB_TOTL is not null 
and SP_URB_TOTL < 100
and SE_XPD_TOTL_GD_ZS is not NULL
and SE_TER_ENRR is not null
limit 100) as line1

UNION

SELECT x, x_std as y, plot_type_id, plot_name_id
from
(SELECT year as x, SE_SEC_NENR as y, 1 as plot_type_id, (SE_SEC_NENR+SE_XPD_TOTL_GD_ZS) as x_std, (SE_SEC_NENR+SE_TER_ENRR) as y_std, 102 as plot_name_id
from wb_health_population
where SP_URB_TOTL is not null 
and SE_SEC_NENR is not null
and SE_XPD_TOTL_GD_ZS is not NULL
and SE_TER_ENRR is not null
limit 100) as line2

union 

SELECT x, y_std as y, plot_type_id, plot_name_id
from
(SELECT year as x, SE_PRM_ENRR as y, 2 as plot_type_id, (SE_PRM_ENRR+SE_XPD_TOTL_GD_ZS) as x_std, (SE_PRM_ENRR+SE_TER_ENRR) as y_std, 103 as plot_name_id
from wb_health_population
where SE_PRM_ENRR is not null 
and SE_XPD_TOTL_GD_ZS is not NULL
and SE_TER_ENRR is not null
limit 100) as scatter1

UNION

SELECT x, y, plot_type_id, plot_name_id
from
(SELECT year as x, SE_PRM_NENR as y, 2 as plot_type_id, (SE_PRM_NENR+SE_XPD_TOTL_GD_ZS) as x_std, (SE_PRM_NENR+SE_TER_ENRR) as y_std, 104 as plot_name_id
from wb_health_population
where SE_PRM_NENR is not null 
and SE_XPD_TOTL_GD_ZS is not NULL
and SE_TER_ENRR is not null
limit 100) as scatter2

order by plot_type_id, plot_name_id

```
## Debug
* install gbd
  sudo debuginfo-install glibc
  sudo yum install gdb python-debuginfo
* start debug
  gdb -ex r --args python setup.py install
  run superset runserver -p 8080 -t 300 

## Additional resources
* flask-SQLAlchemy
* mariadb 
* react
* react-reduce
* react-router
* material-ui
* redis 

## Todo
* add more nvd3 charts to current visualization type list

## Changes from original codebase
* use material-ui interface instead of flask-appbuild default ui interface 
* flask-appbuilder template: mainly use newly created list.html and panel.html templates
* merge most javascript index file to use reactjs
* request data from api using ajax instead of embeded in html page ( in the progress )

## Plot Composer is based on Superset from AirBnb with Material Design interface using Material-UI lib.

## License
Apache 2.0


