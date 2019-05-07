import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import { InputBase } from '@material-ui/core/es/index'
import TextField from '@material-ui/core/es/TextField/TextField'
import { storeUser } from '../actions/storeUser'
import { redirect } from '../actions/redirect'

const styles = theme => ({
  root: {
  },
  card: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 10,
    marginRight: theme.spacing.unit * 2,
    backgroundColor: "#01BABB",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 45,
    marginTop: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 16,
  },
  pos: {
    marginBottom: 12,
  },
  topText: {
    marginLeft: theme.spacing.unit * 2,
    fontSize: "x-large"
  },
  bottomText: {
    marginLeft: theme.spacing.unit * 2,
    fontSize: "large",
    flex: "1",
  },
  button: {
    padding: 0,
    marginLeft: theme.spacing.unit * 2,
  },
  content: {
    paddingBottom: 0
  },
  add: {

  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    color: "white",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  rowItem: {
    color: "white",
  }
});

class LawyerCard extends React.Component {
  state = {
    network: "",
  };


  addOrganization() {
    let { user } = this.props.userReducer;
    if (this.state.network === "") {
      this.setState({network: ""})
    } else if (user.networks.includes(this.state.network)) {
      this.setState({network: ""})
    } else {

      fetch('/api/network/save', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.network,
          userId: user.id
        })
      }).then(
        function(response){
          console.log(response);
        });
      console.log(user);
      user.networks.push(this.state.network);
      this.props.storeUser(user);
      console.log(this.props.userReducer);
      this.setState({network: ""})
    }

  }

  removeOrganization(name) {
    let { user } = this.props.userReducer;
    fetch('/api/network/remove', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        userId: user.id
      })
    }).then(
      function(response){
      });
    this.remove(user.networks, name);
    this.props.storeUser(user);
  }

   remove(array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };



  render () {
    const {classes, user} = this.props;
    return (
      <div className={classes.root}>
        <Typography className={classes.title} color="primary">
          Welcome {user.first_name}
        </Typography>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Typography className={classes.topText} color="secondary">
              {user.first_name} {user.last_name}
            </Typography>
            <Typography className={classes.bottomText} color="secondary">
              {user.email}
            </Typography>
          </CardContent>
          <Divider variant="middle"/>
          <CardContent className={classes.content}>
            <Typography className={classes.topText} color="secondary">
              Your Networks
            </Typography>

              {user.networks.map((n) => (<div className={classes.row} id={n}><Typography className={classes.bottomText} color="secondary">{n}</Typography>
                <Remove className={classes.rowItem} onClick={() => this.removeOrganization(n)}/></div>))}
            <div className={classes.row} > <Add onClick={() => this.addOrganization()} className={classes.rowItem}/>
              <TextField
                id="standard-name"
                className={classes.textField}
                value={this.state.network}
                onChange={this.handleChange('network')}
                margin="normal"
              /></div>

          </CardContent>
        </Card>
      </div>
    );
  }
}

LawyerCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  redirect: () => dispatch(redirect()),
  storeUser: string => dispatch(storeUser(string))
})


const mapStateToProps = state => ({
  ...state
})


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LawyerCard));
