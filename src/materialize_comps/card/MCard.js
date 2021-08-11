/* eslint-disable react/prop-types */
import React from "react";
import { Component } from "react";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./cardStyle.css";
import BlogSticky from "./BlogStickies.jpg";
let cardListCache = [];

class MCard extends Component {

    componentDidMount() {
        cardListCache.push({
            title: this.props.title,
            description: this.props.description,
            cardKey: this.props.cardKey,
            listParent: this.props.listParent
        });
        console.log(cardListCache);
    }

    priorityMatcher(priority) {
        const priorityMatcherObj = {
            Critical: "looks_one",
            Important: "looks_two",
            Normal: "looks_3",
            Low: "looks_4"
        };
        return priorityMatcherObj[priority];
    }

    render() {
        const { 
            title = 'New Card',
            description = `A Small Description for Card!`,
            cardKey = 0,
            priority,
            deadline,
            timeEstimated,
            listParent
        } = this.props;

        return (
            <>
            <div className="card" id={"card " + cardKey}>
                <div className="card-image waves-effect waves-block waves-light">
                    <img
                        className="activator"
                        src={BlogSticky}
                        alt="officeSticky"
                    />
                </div>
                <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">
                        {title}
                        <i className="material-icons right">
                            {this.priorityMatcher(priority)}
                        </i>
                    </span>
                    <p>
                        {description}
                    </p>
                </div>
            </div>
            </>
        );
    }
}

export default MCard;
