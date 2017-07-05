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


  getData(filters) {
    var self = this;
    //var view = 'slicemodelview';
    var path = ((window.location.pathname).split('/')).slice(1,2);
    console.log('list.jsx url path', path[0], path, window.location.pathname)
    var view = path[0]
    if (filters == "" || filters == null ) {
        var base_url = "/" + view.toLowerCase() + "/api/read";
    }
    else {
        var base_url = "/" +  view.toLowerCase() +  "/api/read?_flt_0_name=" + filters;
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

  getPreviousPage() {
  }

  getNextPage() {
  }

  render() {
    var self = this;
    var tableNode = function(){
        if( !self.state.data ) 
            return ( <div></div> )
        
        return (
        <div>
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
                    var s = jQuery(jQuery.parseHTML(i)).text(); 
                    var a = (   (i).match(/href="([^"]*)/) 
                             && (i).match(/href="([^"]*)/)[1] !== undefined ) ? 
                             (i).match(/href="([^"]*)/)[1] : "" ;
                    
                    console.log('list.jsx item[column]', i, s, a );
                    if ( a && a.length > 0 )
                      return (
                        <TableRowColumn ><RaisedButton label="View" primary={true} linkButton={true} href={a} /> {s}</TableRowColumn>
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
        </div>
        )
       }

    return(
      <div>
      <input class=" filter_val form-control" id="name" name="_flt_0_name" placeholder="Name" type="text" value="" />
      
      <div style={{height:'100%', overflow:'auto'}}>
      {tableNode()}
      </div>
      </div>
     );
  }
}

 
