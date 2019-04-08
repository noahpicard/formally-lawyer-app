import React, { Component } from 'react';
import './static/css/header.css';
class Header extends Component {
    state = {

    };
    componentDidMount() {

    }


    render() {
        return (
            <div id="header">
                <div id = "logo_div">
                    <img id = "logo_image" src={require("./static/images/Logo.png")} alt="Formally logo"></img>

                </div>
                <div id = "buttons_div">
                    {/*
                    <button className="header_button">Click me</button>
                    <button className="header_button">Click me</button>
                    <button className="header_button">Click me</button>
      */}

                    <a className="header_button" href="home.html">Home</a>
                    <a className="header_button" href="mission.html">Mission</a>
                    <a className="header_button" href="team.html">Team</a>
                    <a className="header_button" href="about.html">About</a>

                </div>




            </div>
        );
    }
}
export default Header;