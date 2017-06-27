import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
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
    this.state = { data: null };
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
        self.setState({data: result});
        //self.updateTable(result.label_columns, result.list_columns, result.result);
      });
  }

  componentWillMount() {
    this.getData();
    var self = this;
    $('.filter_val').keyup(function(e) {
        self.getData($(this).val());
    });
  }

  componentDidMount() {
  }

  render() {
    var self = this;
    var tableNode = function(){
        if( !self.state.data ) 
            return ( <div></div> )
        
        return (
        <Table>
          <TableHeader>
            <TableRow>
              {self.state.data.list_columns.map(function (column, index) {
                return (
                <TableHeaderColumn>{self.state.data.label_columns[column]}</TableHeaderColumn>
                )
             }
            )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {self.state.data.result.map(function (item, index) {
  
              return (
                <TableRow key={index}> 
                {self.state.data.list_columns.map(function (column, index) {
                    var i = item[column];
                    var s = jQuery(i).text(); 
                    var a = (   (i).match(/href="([^"]*)/) 
                             && (i).match(/href="([^"]*)/)[1] !== undefined ) ? 
                             (i).match(/href="([^"]*)/)[1] : "" ;
                    
                    console.log('list.jsx item[column]', i, s, a );
                    if ( a && a.length > 0 )
                      return (
                        <TableRowColumn ><RaisedButton label="View" primary={true} linkButton={true} href={a} />{s}</TableRowColumn>
                      )
                    else 
                      return (
                        <TableRowColumn >{s}</TableRowColumn>
                      )
                  })
                 } 
                </TableRow>
              )
            })
            }
          </TableBody>
        </Table>
        )
       }

    return(
      <div>
      <input class=" filter_val form-control" id="name" name="_flt_0_name" placeholder="Name" type="text" value="" />
      <div class="table-responsive">
      {tableNode()}
      </div>
      </div>
     );
  }
}

/*

var CommentList = React.createClass({
  componentWillMount: function () {
    $.get('comments.json').done(function (json) {
      this.setState({comments: json});
    }.bind(this));
  },
  render: function() {
    var commentNodes = this.state.comments.map(function (comment) {
      return (
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn style={styles.columns.id}>index</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Data.api.items.map( function(item, index) {
                return (
                <TableRow key={index}>
                <TableRowColumn style={styles.columns.id}>{index}</TableRowColumn>
                </TableRow>
                )
             }
            )}
          </TableBody>
        </Table>

*/
 
