import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ClientList from './ClientList';
import KeyGenerator from './KeyGenerator';
import { connect } from 'react-redux'



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
    const { classes, user } = this.props;
    const { value } = this.state;
    console.log("here");
    console.log(user);

    return (
      <div className={classes.root} >
        <AppBar position="static" className={classes.bar} >
          <Tabs value={value} onChange={this.handleChange} className={classes.tabs} >
            <Tab label="View Clients" className={classes.tab}/>
            <Tab label="Generate Key" className={classes.tab}/>
          </Tabs>
        </AppBar>
        {value === 0 && <ClientList clients={user.clients}/>}
        {value === 1 && <KeyGenerator/>}
      </div>
    );
  }
}

CardSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({})

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CardSelector));