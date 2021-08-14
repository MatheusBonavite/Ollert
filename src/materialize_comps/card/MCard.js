/* eslint-disable react/prop-types */
import React from "react";
import { Component } from "react";
import SeeModal from "../modals/see_card_modal/SeeModal";
import EditModal from "../modals/edit_card_modal/EditModal";
import ListDropdown from "../dropdowns/ListDropdown";
import integrateWithLocalForage from "../../local_forage_integration/integrateWithLocalForage";

// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./cardStyle.css";
import BlogSticky from "./BlogStickies.jpg";
let cardListCache = [];

class MCard extends Component {
    state = {
        title: this.props.title || "New Card",
        description: this.props.description || `A Small Description for Card!`,
        fullDescription:
            this.props.fullDescription || `A Bigger Description for Card!`,
        cardKey: this.props.cardKey || 0,
        priority: this.props.priority || "Normal",
        deadline: this.props.deadline || "xx/xx/xxxx",
        timeEstimated: this.props.timeEstimated || "N/A",
        listParent: this.props.listParent || "N/A",
    };

    componentDidMount() {
        if(this?.props){
            cardListCache.push({
                title: this.props.title,
                description: this.props.description,
                cardKey: this.props.cardKey,
                listParent: this.props.listParent,
            });
            integrateWithLocalForage(this.props);
        }
        console.log("cardsListCache >>> ", cardListCache);
    }

    priorityMatcher(priority) {
        const priorityMatcherObj = {
            Critical: "looks_one",
            Important: "looks_two",
            Normal: "looks_3",
            Low: "looks_4",
        };
        if (priority) return priorityMatcherObj[priority];
        return priorityMatcherObj;
    }

    handleCardState(props) {
        let newState = {
            title: props.title,
            description: props.description,
            fullDescription: props.fullDescription,
            priority: props.priority,
            deadline: props.deadline,
            timeEstimated: props.timeEstimated,
            listParent: props.listParent,
            cardKey: props.cardKey,
        };
        this.setState(newState);
        integrateWithLocalForage(props);
    }

    render() {
        const {
            title,
            description,
            fullDescription,
            cardKey,
            priority,
            deadline,
            timeEstimated,
            listParent,
        } = this.state;
        console.log("Parametros >> ", this.state);
        return (
            <>
                <div className={`card ${listParent}`} id={"card " + cardKey}>
                    <div className="card-image waves-effect waves-block waves-light">
                        <img
                            className="activator"
                            src={BlogSticky}
                            alt="officeSticky"
                        />
                    </div>
                    <div className="card-content">
                        <span className="content-title activator grey-text text-darken-4">
                            <div className="card-title">
                                <p>
                                    {title}
                                    <abbs title={`Priority: ${priority}`}>
                                        <i
                                            className="material-icons"
                                            data-target="priority_dropdown"
                                        >
                                            {this.priorityMatcher(priority) ||
                                                "looks_4"}
                                        </i>
                                    </abbs>
                                </p>
                            </div>
                        </span>
                        <p>{description}</p>

                        {/* Watch Modal Trigger*/}
                        <abbr className="modal-trigger-abbr" title="More info!">
                            <a className="modal-trigger" href="#getInfo">
                                <span className="material-icons pin">
                                    remove_red_eye
                                </span>
                            </a>
                        </abbr>
                        {/* End of Watch Modal Trigger*/}

                        {/* Edit Modal Trigger*/}
                        <abbr
                            className="modal-trigger-abbr"
                            title="Edit card info!"
                        >
                            <a className="modal-trigger" href="#editInfo">
                                <span className="material-icons pin">edit</span>
                            </a>
                        </abbr>
                        {/* End of Edit Modal Trigger*/}

                        <abbr
                            className="deadline-range"
                            title={`Deadline: ${deadline}`}
                        >
                            <span className="material-icons pin">
                                date_range
                            </span>
                        </abbr>

                        <abbr
                            className="deadline-range"
                            title={`Time to Complete: ${timeEstimated}hrs`}
                        >
                            <span className="material-icons pin">av_timer</span>
                        </abbr>
                    </div>
                    <SeeModal id={"getInfo"} />
                    <EditModal
                        id={"editInfo"}
                        cardHandler={this.handleCardState.bind(this)}
                        listParent={listParent}
                        cardKey={cardKey}
                    />
                </div>
            </>
        );
    }
}

export default MCard;
