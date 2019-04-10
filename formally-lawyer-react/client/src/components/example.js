import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


import StyledButton from './StyledButton';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  row: {
    display: 'flex',
    flexGrow: 1,
    width: '100%',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  finalRow: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
  },
  street: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    flex: 1,
    [theme.breakpoints.up('md')]: {
      flexGrow: 2,
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    flex: 1,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

class Example extends React.Component {
  state = {
    disabled: true,
    button: 'Edit',
  };

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value });
  };

  handleEdit = () => {
    const { disabled, button } = this.state;
    this.setState({
      disabled: !disabled,
      button: button === 'Edit' ? 'Save' : 'Edit',
    });
  };

  render() {
    const { button, disabled } = this.state;
    const { classes, props } = this.props;
    const {
      first, last, phone, street, city, zip, state,
    } = props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <div className={classes.row}>
          <TextField
            required
            disabled={(disabled)}
            label="First Name"
            className={classes.textField}
            value={first}
            onChange={this.handleChange('firstName')}
            margin="normal"
            variant="outlined"
          />
          <StyledButton onClick={this.handleEdit}>{button}</StyledButton>
        </div>

      </form>
    );
  }
}

PersonalInfo.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  props: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(Example);
