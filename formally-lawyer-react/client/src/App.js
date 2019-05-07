import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Header from './components/header.js'
import AccountHome from './components/AccountHome.js'
import ClientPage from './components/ClientPage.js'
import Landing from './components/Landing.js'
import DocReview from './components/DocReview.js'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { storeUser } from './actions/storeUser';


const theme = createMuiTheme({
  typography: {
    // https://material-ui.com/style/typography/#migration-to-typography-v2
    useNextVariants: true,
    fontFamily: [
      'soleil',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontFamily: 'mrs-eaves-xl-serif',
      color: '#01BABB',
    },
    h2: {
      fontFamily: 'mrs-eaves-xl-serif',
      color: '#01BABB',
    },
    h3: {
      fontFamily: 'mrs-eaves-xl-serif',
      color: '#01BABB',
    },
    h4: {
      fontFamily: 'mrs-eaves-xl-serif',
      color: '#01BABB',
    },
    h5: {
      fontFamily: 'mrs-eaves-xl-serif',
      color: '#01BABB',
    },
    body1: {
      fontFamily: 'soleil',
    },
    body2: {
      fontFamily: 'soleil',
    },

  },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#01BABB',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#f0f0f0',
      main: '#f0f0f0',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#7d7d7d',
    },
    // error: will use the default color
  },
});

class App extends Component {

render() {
  return (<div>
              <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                  <div>
                    <Header />
                    <Switch>
                      <Route path="/" exact component={Landing} />
                      <Route path="/Home" exact component={AccountHome} />
                      <Route path="/ClientPage/*" exact component={ClientPage} />
                        <Route path="/Document/*" exact component={DocReview} />
                    </Switch>
                    {/* <Footer /> */}
                  </div>
                </BrowserRouter>
              </MuiThemeProvider>
          </div>);
}
}

const mapDispatchToProps = dispatch => ({
  storeUser: string => dispatch(storeUser(string))
})

const mapStateToProps = state => ({
  ...state
})


export default connect(mapStateToProps, mapDispatchToProps)(App);