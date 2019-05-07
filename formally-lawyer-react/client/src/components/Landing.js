import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import splash from '../splash.jpg';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/es/styles/index'

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: "flex",
  },
    img:{
        flex: 10,
        marginTop: theme.spacing.unit * 6,
        // marginRight: theme.spacing.unit * 6,
        // marginLeft: theme.spacing.unit * 6,
        // paddingBottom: theme.spacing.unit * 2,
        minHeight: "500px",
        width: "100%;",
        position: "relative",
        display: "block",
        // left: "20%"  ,
        backgroundImage: "url("+ splash + ")",
        backgroundPosition: "20% 100%",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat"
    },
    side: {
    flex: 1,
    }
});


class Landing extends React.Component {
    test = async e => {
        console.log("SENDING")
        const response = await fetch('/api/forms/test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id:"1"}),
        });
        const body = await response.json();
        console.log(body);
        if ("error" in body) {
            console.log(body);

        }

        else {
            console.log(body);
        }

    };
  render() {
      //this.test()
    const { classes } = this.props;
    const { redirect } = this.props.redirectReducer;


    if (redirect) {
      return (<Redirect to='/Home' />);
    }

    return (
      <div className={classes.root}>
        <div className={classes.side}></div>
        <div className={classes.img}>
          <h2 color="white">Start Helping the ones who need it the most.</h2>
        </div>
        <div className={classes.side}></div>
      </div>

    );
  }
}

const mapDispatchToProps = dispatch => ({})

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Landing));
