import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Header from'./components/header'
import Lawyer_meta from'./components/lawyer_meta'

import * as serviceWorker from './serviceWorker';


ReactDOM.render(<div>
    <Header/>
    <Lawyer_meta/>
</div>, document.getElementById('root'));

//ReactDOM.render(<Lawyer_meta />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
