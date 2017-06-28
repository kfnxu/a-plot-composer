import React from 'react';
import {TableFooter as TF, TableRow, TableRowColumn, FontIcon, IconButton} from 'material-ui';

const styles = {
  footerContent: {
    float: 'right'
  },
  footerText: {
    float: 'right',
    paddingTop: 16,
    height: 16
  }
};

const TableFooter = React.createClass({

  propTypes: {
    offset: React.PropTypes.number.isRequired, // current offset
    total: React.PropTypes.number.isRequired, // total number of rows
    limit: React.PropTypes.number.isRequired, // num of rows in each page
    onPageClick: React.PropTypes.func // what to do after clicking page number
  },

  render() {
    let offset = this.props.offset;
    let total = this.props.total;
    let limit = this.props.limit;
    return (
      <TF adjustForCheckbox={false}>
        <TableRow>
          <TableRowColumn style={styles.footerContent}>
            <IconButton disabled={offset === 0} onClick={this.props.onPageClick.bind(null, offset - limit)}>
              <FontIcon className="material-icons">chevron_left</FontIcon>
            </IconButton>
            <IconButton disabled={offset + limit >= total} onClick={this.props.onPageClick.bind(null, offset + limit)}>
              <FontIcon className="material-icons">chevron_right</FontIcon>
            </IconButton>
          </TableRowColumn>
          <TableRowColumn style={styles.footerText}>
            {Math.min((offset + 1), total) + '-' + Math.min((offset + limit), total) + ' of ' + total}
          </TableRowColumn>
        </TableRow>
      </TF>
    );
  }

});

export default TableFooter;
