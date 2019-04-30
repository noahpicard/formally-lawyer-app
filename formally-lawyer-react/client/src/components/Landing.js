import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
    bigPaper:{
        marginTop: theme.spacing.unit * 6,
        paddingBottom: theme.spacing.unit * 2,
        backgroundColor: "lightgrey",
        height: "800px",
        width: "900px",
        position: "relative",
        left: "20%"  
    },
});

class Landing extends React.Component {

  render() {
    const { classes } = this.props;
    const { redirect } = this.props.redirectReducer;


    if (redirect) {
      return (<Redirect to='/Home' />);
    }

    return (
        <Paper className="bigPaper">

        </Paper>
    );
  }
}

const mapDispatchToProps = dispatch => ({})

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
