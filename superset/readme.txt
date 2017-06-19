#############################################################################
#############        url for tests                             ##############
#############################################################################
https://host-name/superset/panel/dashboard/4/#/chartboard



#############################################################################
#############        architecture of the data-vis(supserset)   ##############
#############################################################################
architecture of the supserset
-python/templates for the site layout
 templates/superset
 templates/appbuilder/baselayout.html

-javascript for dashboard charts
-react-redux for slice chart

path /superset/... map to following code base
├── common.js
├── components
├── constants.js
├── css-theme.js
├── dashboard
├── explore
├── modules
├── panel
├── profile
├── reduxUtils.js
├── SqlLab
├── syncBackend.js
└── welcome.js

superset/views/core.js do the flask-appbuilder 'path' to 'code-base' mapping
    @log_this
    @has_access
    @expose("/explore/<datasource_type>/<datasource_id>/")

    @expose("/welcome")
    def welcome(self):
        """Personalized welcome page"""
        if not g.user or not g.user.get_id():
            return redirect(appbuilder.get_url_for_login)
        return self.render_template('superset/welcome.html', utils=utils)

    @has_access
    @expose("/profile/<username>/")
    def profile(self, username):
        """User profile page"""


primary charts on site for slice and dashboard
visualization(plain javascript)
 
src/superset/superset/assets/javascripts/modules/superset.js
import visMap from '../../../visualizations/main';
      render(force) {
        if (force === undefined) {
          this.force = false;
        } else {
          this.force = force;
        }
        token.find('img.loading').show();
        container.fadeTo(0.5, 0.25);
        container.css('height', this.height());
        $.getJSON(this.jsonEndpoint(), (queryResponse) => {
          try {
            vizMap[formData.viz_type](this, queryResponse);
            console.log("javascripts/modules/superset.js vizMap", queryResponse, formData, vizMap, vizMap[formData.viz_type]);
            this.done(queryResponse);
          } catch (e) {
            this.error('An error occurred while rendering the visualization: ' + e);
          }
        }).fail((err) => {
          this.error(err.responseText, err);
        });
      },

for editing slice chart
explore(react)
src/superset/superset/assets/javascripts/explore/components/ChartContainer.jsx
import visMap from '../../../visualizations/main';
  renderViz() {
    this.props.actions.renderTriggered();
    const mockSlice = this.getMockedSliceObject();
    this.setState({ mockSlice });
    try {
      visMap[this.props.viz_type](mockSlice, this.props.queryResponse);
      console.log('javascripts/explore/components/ChartContainer.jsx vizMap', visMap, this.props, mockSlice, this.props.queryResponse, visMap[this.props.viz_type]);

    } catch (e) {
      this.props.actions.chartRenderingFailed(e);
    }
  }

class ChartContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selector: `#${props.containerId}`,
      showStackTrace: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (
        this.props.queryResponse &&
        (
          prevProps.queryResponse !== this.props.queryResponse ||
          prevProps.height !== this.props.height ||
          this.props.triggerRender
        ) && !this.props.queryResponse.error
        && this.props.chartStatus !== 'failed'
        && this.props.chartStatus !== 'stopped'
        && this.props.chartStatus !== 'loading'
      ) {
      this.renderViz();
    }
  }

all visulization files are grouped for import:

src/superset/superset/assets/visualizations/main.js 
const vizMap = {
  area: require('./nvd3_vis.js'),
  bar: require('./nvd3_vis.js'),
  big_number: require('./big_number.js'),
  big_number_total: require('./big_number.js'),
  box_plot: require('./nvd3_vis.js'),
  bubble: require('./nvd3_vis.js'),
  bullet: require('./nvd3_vis.js'),
  cal_heatmap: require('./cal_heatmap.js'),
  compare: require('./nvd3_vis.js'),
  directed_force: require('./directed_force.js'),
  dist_bar: require('./nvd3_vis.js'),
  filter_box: require('./filter_box.jsx'),
  heatmap: require('./heatmap.js'),
  histogram: require('./histogram.js'),
  horizon: require('./horizon.js'),
  iframe: require('./iframe.js'),
  line: require('./nvd3_vis.js'),
  mapbox: require('./mapbox.jsx'),
  markup: require('./markup.js'),
  para: require('./parallel_coordinates.js'),
  pie: require('./nvd3_vis.js'),
  pivot_table: require('./pivot_table.js'),
  sankey: require('./sankey.js'),
  separator: require('./markup.js'),
  sunburst: require('./sunburst.js'),
  table: require('./table.js'),
  treemap: require('./treemap.js'),
  country_map: require('./country_map.js'),
  word_cloud: require('./word_cloud.js'),
  world_map: require('./world_map.js'),
  dual_line: require('./nvd3_vis.js'),
};
export default vizMap;

data are import from

import d3 from 'd3';
import { colorScalerFactory } from '../javascripts/modules/colors';

const $ = require('jquery');
d3.tip = require('d3-tip');

require('./heatmap.css');

// Inspired from http://bl.ocks.org/mbostock/3074470
// https://jsfiddle.net/cyril123/h0reyumq/
function heatmapVis(slice, payload) {
...


configure log, site-name: config.py

header:

src/superset/superset/templates/appbuilder/navbar.html

#############################################################################
#############how templates leads to javascript/react ########################
#############################################################################
from flask-appbuilder-templates connect to assets/javascript is the 'javascript file after build from assets directory' 
superset/partials/_script_tag.html
{% set VERSION_STRING = appbuilder.get_app.config.get("VERSION_STRING") %}
{% block tail_js %}
  <script src="/static/assets/dist/{{filename}}.{{VERSION_STRING}}.entry.js"></script>
{% endblock %}

files which use _script_tag.html to have to feathure:
superset/base.html:      {% include "superset/partials/_script_tag.html" %}
superset/base.html:      {% include "superset/partials/_script_tag.html" %}
superset/dashboard.html:    {% include "superset/partials/_script_tag.html" %}
superset/explore.html:    {% include "superset/partials/_script_tag.html" %}
superset/import_dashboards.html:    {% include "superset/partials/_script_tag.html" %}
superset/profile.html:    {% include "superset/partials/_script_tag.html" %}
superset/sqllab.html:    {% include "superset/partials/_script_tag.html" %}
superset/welcome.html:    {% include "superset/partials/_script_tag.html" %}
superset/basic.html.org:        {% include "superset/partials/_script_tag.html" %}
superset/basic.html:        {% include "superset/partials/_script_tag.html" %}


#############################################################################
############# flask appbuilder routes defined        ########################
#############################################################################
all routes are defined in this file:
views/core.py

    @has_access_api
    @expose("/datasources/")
    def datasources(self):
        datasources = ConnectorRegistry.get_all_datasources(db.session)
        datasources = [(str(o.id) + '__' + o.type, repr(o)) for o in datasources]
        return self.json_response(datasources)

    @has_access_api
    @expose("/override_role_permissions/", methods=['POST'])
    def override_role_permissions(self):
        """Updates the role with the give datasource permissions.

          Permissions not in the request will be revoked. This endpoint should
          be available to admins only. Expects JSON in the format:
           {
            'role_name': '{role_name}',
            'database': [{
                'datasource_type': '{table|druid}',
                'name': '{database_name}',
                'schema': [{
                    'name': '{schema_name}',
                    'datasources': ['{datasource name}, {datasource name}']
                }]
            }]
        }
        """

https://host-name/users/list/
https://host-name/roles/list/
https://host-name/superset/profile/admin/
https://host-name/superset/dashboard/4/
https://host-name/slicemodelview/list/
https://host-name/databaseview/edit/2
https://host-name/superset/explore/table/2/?form_data=%7B%22y_axis_label%22%3A+%22%22%2C+%22series%22%3A+%22region%22%2C+%22entity%22%3A+%22country_name%22%2C+%22show_legend%22%3A+true%2C+%22filters%22%3A+%5B%7B%22col%22%3A+%22country_code%22%2C+%22val%22%3A+%5B%22TCA%22%2C+%22MNP%22%2C+%22DMA%22%2C+%22MHL%22%2C+%22MCO%22%2C+%22SXM%22%2C+%22CYM%22%2C+%22TUV%22%2C+%22IMY%22%2C+%22KNA%22%2C+%22ASM%22%2C+%22ADO%22%2C+%22AMA%22%2C+%22PLW%22%5D%2C+%22op%22%3A+%22not+in%22%7D%5D%2C+%22granularity_sqla%22%3A+%22year%22%2C+%22size%22%3A+%22sum__SP_POP_TOTL%22%2C+%22viz_type%22%3A+%22bubble%22%2C+%22since%22%3A+%222011-01-01%22%2C+%22x_axis_label%22%3A+%22%22%2C+%22until%22%3A+%222011-01-02%22%2C+%22slice_id%22%3A+82%2C+%22time_grain_sqla%22%3A+%22Time+Column%22%2C+%22y_log_scale%22%3A+false%2C+%22limit%22%3A+500%2C+%22datasource%22%3A+%222__table%22%2C+%22y%22%3A+%22sum__SP_DYN_LE00_IN%22%2C+%22x%22%3A+%22sum__SP_RUR_TOTL_ZS%22%2C+%22x_log_scale%22%3A+false%2C+%22where%22%3A+%22%22%2C+%22having%22%3A+%22%22%2C+%22max_bubble_size%22%3A+%2250%22%7D


#############################################################################
#############            data access example         ########################
#############################################################################
data access example: 
https://host-name/superset/explore_json/table/2/?form_data=%7B%22datasource%22%3A%222__table%22%2C%22viz_type%22%3A%22bubble%22%2C%22slice_id%22%3A82%2C%22granularity_sqla%22%3A%22year%22%2C%22time_grain_sqla%22%3A%22Time+Column%22%2C%22since%22%3A%222011-01-01%22%2C%22until%22%3A%222011-01-02%22%2C%22series%22%3A%22region%22%2C%22entity%22%3A%22country_name%22%2C%22x%22%3A%22sum__SP_RUR_TOTL_ZS%22%2C%22y%22%3A%22sum__SP_DYN_LE00_IN%22%2C%22size%22%3A%22sum__SP_POP_TOTL%22%2C%22limit%22%3A500%2C%22show_legend%22%3Atrue%2C%22max_bubble_size%22%3A%2250%22%2C%22x_axis_label%22%3A%22%22%2C%22y_axis_label%22%3A%22%22%2C%22x_log_scale%22%3Afalse%2C%22y_log_scale%22%3Afalse%2C%22where%22%3A%22%22%2C%22having%22%3A%22%22%2C%22filters%22%3A%5B%7B%22col%22%3A%22country_code%22%2C%22val%22%3A%5B%22TCA%22%2C%22MNP%22%2C%22DMA%22%2C%22MHL%22%2C%22MCO%22%2C%22SXM%22%2C%22CYM%22%2C%22TUV%22%2C%22IMY%22%2C%22KNA%22%2C%22ASM%22%2C%22ADO%22%2C%22AMA%22%2C%22PLW%22%5D%2C%22op%22%3A%22not+in%22%7D%5D%7D
