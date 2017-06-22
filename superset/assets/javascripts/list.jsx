import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import { appSetup } from './common';

export default class ListViewPage extends React.Component{

  constructor(props) {
    super(props);
    appSetup();
  }

  updateTHead(labels, listColumns) {
    var body = $('#thead');
    body.empty();
    var row = $('<tr />');

    for (var key in listColumns) {
        var column = listColumns[key];
        var col = $('<th />');
        col.append(labels[column]);
        row.append(col);
    }
    var el = row.appendTo(body);
  }

  updateTBody(listColumns, data) {
    var body = $('#tbody');
    body.empty();
    for (var key in data) {
        var obj = data[key];
        var row = $('<tr />');
        for (var key in listColumns) {
            var column = listColumns[key];
            var col = $('<td />');
            col.append(obj[column]);
            row.append(col);
        }
        var el = row.appendTo(body);
    }
  }

  updateTable(labels, listColumns, data) {
    this.updateTHead(labels, listColumns);
    this.updateTBody(listColumns, data);
  }

  getData(filters) {
    var self = this;
    if (filters == "" || filters == null ) {
        var base_url = "/slicemodelview/api/read";
    }
    else {
        var base_url = "/slicemodelview/api/read?_flt_0_name=" + filters;
    }

    $.ajax({
      type: "GET",
      url: base_url
    })
      .done(function( result ) {
        self.updateTable(result.label_columns, result.list_columns, result.result);
      });
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.getData();
    var self = this;
    $('.filter_val').keyup(function(e) {
        self.getData($(this).val());
    });
  }

  render() {
     return (
      <div>
      <input class=" filter_val form-control" id="name" name="_flt_0_name" placeholder="Name" type="text" value="" />
      <div class="table-responsive">
      <table class="table table-bordered table-hover">
        <thread id="thead">
        </thread>
        <tbody id="tbody">
        </tbody>
      </table>
      </div>
      </div>
     );
  }
}


