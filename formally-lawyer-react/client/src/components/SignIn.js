import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/es/FormControl/FormControl'
import InputLabel from '@material-ui/core/es/InputLabel/InputLabel'
import Input from '@material-ui/core/es/Input/Input'
import FormControlLabel from '@material-ui/core/es/FormControlLabel/FormControlLabel'
import Checkbox from '@material-ui/core/es/Checkbox/Checkbox';


class SignIn extends React.Component {
  state = {
    email: '', password: '', error: false, errorMsg: '', redirect: false,
  };

  // componentDidMount() {
  //   this.callApi()
  //     .then(res => this.setState({ response: res.express }))
  //     .catch(err => console.log(err));
  // }
  // callApi = async () => {
  //   const response = await fetch('/api/hello');
  //   const body = await response.json();
  //   if (response.status !== 200) throw Error(body.message);
  //   return body;
  // };

  signIn = async e => {
    e.preventDefault();
    const response = await fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: this.state.email, password: this.state.password }),
    });
    const body = await response.json();
    console.log(body);
  };


  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value });
  };


  render() {

    return (
      <div>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form  onSubmit={this.signIn}>
          <FormControl margin="normal" required fullWidth >
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" onChange={this.handleChange('email')} autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth >
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleChange('password')} />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign in
          </Button>
        </form>
      </div>
    );
  }
}


export default SignIn;