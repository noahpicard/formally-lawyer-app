import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import LawyerCard from './lawyerCard';
import CardSelector from './CardSelector'


const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "row"
  },
  leftDisplay: {
    flex: 2,
  },
  rightDisplay: {
    flex: 3,
  }
});

function AccountHome(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.leftDisplay}>
        <LawyerCard/>
      </div>
      <div className={classes.rightDisplay}>
        <CardSelector/>
      </div>
    </div>
  );
}

AccountHome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountHome);