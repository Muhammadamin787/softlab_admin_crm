import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import "./universal.scss"

class HomePage extends Component {
    state = {
        styles: {
            color: "#111",
            // backgroundColor: "rgba(280,280,280,.6)",
            display: "block",
            position: "relative",
            padding: "18px",
            textDecoration: "none",
            fontSize: "1.3em",
            // fontFamily: "Roboto",
            marginTop: "70px"
        }
    }

    render() {
        return (
            <div className={"homePage"}>
                <div className={"homapage_start"}>
                    <h1>
                        Assalomu Alaykum!
                        <br/>
                        Admin CRM sistemasiga hush kelibsiz!
                    </h1>
                    <div className={"homePage_btn mx-5"}>
                        <Link to="/login" style={this.state.styles} onCl>Kirish</Link>
                    </div>
                </div>
            </div>
        );
    }
}

HomePage.propTypes =
    {}
;

export default HomePage;
