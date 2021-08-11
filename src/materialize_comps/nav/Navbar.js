/* eslint-disable react/prop-types */
import React from "react";
import { Component } from "react";
import LogoName from "./OllertLogo.svg";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./navbarStyle.css";

class MNavbar extends Component {
    componentDidMount() {
        console.log("Navbar is being rendered...");
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo center">
                        <img src={LogoName} alt="logo" />
                    </Link>
                </div>
            </nav>
        );
    }
}

export default MNavbar;
