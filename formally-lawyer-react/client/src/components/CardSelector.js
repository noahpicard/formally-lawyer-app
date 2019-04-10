import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ClientList from './ClientList';
import KeyGenerator from './KeyGenerator';



const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#F6F6F6",
    margin: "50px",
  },
  bar: {
    backgroundColor: "#F6F6F6",
  },
  tabs: {
    display: "flex",
    justifyContent: "space-evenly"
  },
  tab: {
    flex: "1"
  }
});

class CardSelector extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root} >
        <AppBar position="static" className={classes.bar} >
          <Tabs value={value} onChange={this.handleChange} className={classes.tabs} >
            <Tab label="View Clients" className={classes.tab}/>
            <Tab label="Generate Key" className={classes.tab}/>
          </Tabs>
        </AppBar>
        {value === 1 && <ClientList/>}
        {value === 0 && <KeyGenerator/>}
      </div>
    );
  }
}

CardSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardSelector);