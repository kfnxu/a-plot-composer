import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';
import ThemeDefault from '../../theme-default';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillReceiveProps(nextProps) {
  }

  handleChangeRequestNavDrawer() {
  }

  render() {

    const styles = {
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft: 0
      }
    };

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
            <div style={styles.container}>
              {this.props.children}
            </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  width: PropTypes.number
};

export default withWidth()(App);
