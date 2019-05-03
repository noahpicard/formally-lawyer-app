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
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


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
class AccountHome extends React.Component {


  render() {
    const { classes } = this.props;
    const { user } = this.props.userReducer;
    if (user === undefined) {
      return <Redirect to="/" />;
    }

    return (
      <div className={classes.root}>
        <div className={classes.leftDisplay}>
          <LawyerCard user={user}/>
        </div>
        <div className={classes.rightDisplay}>
          <CardSelector user={user}/>
        </div>
      </div>
    );
  }

}

AccountHome.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({})

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AccountHome));