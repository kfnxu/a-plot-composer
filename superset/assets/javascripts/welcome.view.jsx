/* eslint no-unused-vars: 0 */
import React from 'react';
import 'datatables.net';
import dt from 'datatables.net-bs';
import d3 from 'd3';

import '../stylesheets/welcome.css';
import { appSetup } from './common';
require('datatables-bootstrap3-plugin/media/css/datatables-bootstrap3.css');

export default class WelcomeViewPage extends React.Component{

  constructor(props) {
    super(props);
    appSetup();
    dt(window, $);
  }

  modelViewTable(selector, modelView, orderCol, order) {

  // Builds a dataTable from a flask appbuilder api endpoint
  let url = '/' + modelView.toLowerCase() + '/api/read';
  url += '?_oc_' + modelView + '=' + orderCol;
  url += '&_od_' + modelView + '=' + order;
  console.log('welcome.js modelViewTable url', url);
  $.getJSON(url, function (data) {
    const columns = ['dashboard_link', 'creator', 'modified'];
    const tableData = $.map(data.result, function (el) {
      const row = $.map(columns, function (col) {
        return el[col];
      });
      return [row];
    });
    const cols = $.map(columns, function (col) {
      return { sTitle: data.label_columns[col] };
    });
    //const panel = $(selector).parents('.panel');
    //panel.find('img.loading').remove();
    $("img[src$='loading.gif']").remove();
    console.log("welcome getJSON", data);
    $(selector).DataTable({
      aaData: tableData,
      aoColumns: cols,
      bPaginate: true,
      pageLength: 10,
      bLengthChange: false,
      aaSorting: [],
      searching: true,
      bInfo: false,
    });
    // Hack to move the searchbox in the right spot
    const search = panel.find('.dataTables_filter input');
    search.addClass('form-control').detach();
    search.appendTo(panel.find('.search'));
    panel.find('.dataTables_filter').remove();
    // Hack to display the page navigator properly
    panel.find('.col-sm-5').remove();
    const nav = panel.find('.col-sm-7');
    nav.removeClass('col-sm-7');
    nav.addClass('col-sm-12');
    $(selector).slideDown();
    $('[data-toggle="tooltip"]').tooltip({ container: 'body' });
  });
  }

  componentWillMount() {
  }

  componentDidMount() {
     this.modelViewTable('#welcome_node', 'DashboardModelViewAsync', 'changed_on', 'desc');
  }

  render() {
     return (
     <div class="container welcome">
     <div class="panel panel-default">
     <div class="panel-heading">
      <div class="panel-title">
        <div class="row">
          <div class="col-md-6">
          </div>
          <div class="col-md-6">
            <div class="search-container pull-right">
              <i class="fa fa-search"></i>
              <span class="search"></span>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div class="panel-body">
      <img class="loading" src="/static/assets/images/loading.gif"/>
      <table id="welcome_node" class="table" width="100%"></table>
      </div>
      </div>
      </div>
      );
  }
}
