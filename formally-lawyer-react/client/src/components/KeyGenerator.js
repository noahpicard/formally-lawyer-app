import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: "flex",
    flexDirection: "column"
  },
  text: {
    margin: theme.spacing.unit * 6,
    textAlign: "center"
  },
  button: {
    marginLeft: theme.spacing.unit * 12,
    marginRight: theme.spacing.unit * 12,
    marginBottom: theme.spacing.unit * 3,
    color: "white"
  },
  buttonSec: {
    marginLeft: theme.spacing.unit * 12,
    marginRight: theme.spacing.unit * 12,
    marginBottom: theme.spacing.unit * 3,
  }

});

class KeyGenerator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {key : "Generate Key",
    genDisabled: false,
    sendDisabled: true}
  }

  generateKey() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 24; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    this.setState({
      key: text,
      sendDisabled: false,
      genDisabled: true
    })

  }

  emailCode(code) {
    window.location.href = "mailto:INSERT_CLIENT_EMAIL?subject=Sign%20Up%20Code%20:%20"+ code +"&body=Sign%20up%20on%20Formally%20with%20this%20code!%0A" + code;
  }

  render() {
    const { classes } = this.props;
    const { key, genDisabled, sendDisabled } = this.state;

    return (
      <div>
        <Paper className={classes.root} >
          <TextField
            id="filled-bare"
            className={classes.text}
            margin="normal"
            variant="filled"
            disabled={true}
            value={key}
          />
          <Button variant="contained" color="primary" disabled={genDisabled} className={classes.button} onClick={() => { this.generateKey() }}>
            Generate Key
          </Button>
          <Button className={classes.buttonSec} disabled={sendDisabled} onClick={() => { this.emailCode(key) }}>
            Email Code
          </Button>
        </Paper>
      </div>
    );
}

}

KeyGenerator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(KeyGenerator);