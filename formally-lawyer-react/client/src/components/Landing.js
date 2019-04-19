import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

class Landing extends React.Component {



  render() {
    const { classes } = this.props;
    const { redirect } = this.props.redirectReducer;


    if (redirect) {
      return (<Redirect to='/Home' />);
    }

    return (
        <Paper>
          <Typography variant="body1" paragraph>
            Log in or sign up!
          </Typography>

        </Paper>
    );
  }
}

const mapDispatchToProps = dispatch => ({})

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
