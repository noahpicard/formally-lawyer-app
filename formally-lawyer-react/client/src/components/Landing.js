import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class Landing extends React.Component {
  render() {
    const { classes } = this.props;
    return (
        <Paper>
          <Typography variant="body1" paragraph>
            Log in or sign up!
          </Typography>
        </Paper>
    );
  }
}

export default Landing;
