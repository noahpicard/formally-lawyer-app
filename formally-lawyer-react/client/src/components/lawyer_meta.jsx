import React, { Component } from 'react';
import './static/css/lawyer_meta.css';
class Lawyer_meta extends React.Component {
   

    constructor(props){
        super(props)
        this.state = {first_name:"Lawrence", last_name:"Arabia",
            email:"lawrenceofarabia@aol.com", networks: ["Coalition of Princes"] }//networks just names??
    }

    render() {
        return (
            <div id = "main">
                <h3 class = "cyan">Welcome, {this.state.first_name}!</h3>
                <div id = "container">
                    <div id = "meta_div">
                        <div className="meta_part">
                            <p className="white">{this.state.first_name + " " + this.state.last_name}</p>
                            <p className="white">{this.state.email}</p>
                        <button><span className="white">(Edit)</span></button>
                        </div>
                        <hr class = "divider"></hr>
                        <div class = "meta_part">
                            <p><span class="white">Your Networks</span></p>
                            <button><span className="white">(Add new Connection)</span></button>
                        </div>


                    </div>
                </div>
            </div>
        );
    }
}
export default Lawyer_meta;