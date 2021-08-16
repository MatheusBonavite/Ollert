/* eslint-disable react/prop-types */
import React from "react";
import { Component } from "react";
import SeeModal from "../modals/see_card_modal/SeeModal";
import EditModal from "../modals/edit_card_modal/EditModal";
import ListDropdown from "../dropdowns/ListDropdown";
import integrateWithLocalForage from "../../local_forage_integration/integrateWithLocalForage";
import removeFromLocalForage from "../../local_forage_integration/removeFromLocalForage";

// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./cardStyle.css";
import BlogSticky from "./BlogStickies.jpg";

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
        setCardItems:
            this.props.setCardItems ||
            function () {
                console.log("Error in setCardItems");
            },
        cardItems:
            this.props.cardItems ||
            function () {
                console.log("Error in cardItems");
            },
        storageCards:
            this.props.storageCards ||
            function () {
                console.log("Error in storageCards");
            },
    };

    componentDidMount() {
        if (this?.props) {
            integrateWithLocalForage({
                title: this.props.title,
                description: this.props.description,
                cardKey: this.props.cardKey,
                listParent: this.props.listParent,
            });
        }
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
        console.log("Who are props >", props);
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

    removeCard(listParent, cardKey) {
        removeFromLocalForage(listParent, cardKey);
        location.reload();
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
            setCardItems,
            cardItems,
            storageCards,
        } = this.state;

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
                        <div className="card-title-priority">
                            <span className="content-title activator grey-text text-darken-4">
                                <div className="card-title">
                                    <p className="card-title-priority">
                                        <abbr title={`Priority: ${priority}`}>
                                            <i
                                                className="material-icons"
                                                data-target="priority_dropdown"
                                            >
                                                {this.priorityMatcher(
                                                    priority
                                                ) || "looks_4"}
                                            </i>
                                        </abbr>
                                        <abbr
                                            id="abbr-title-card"
                                            title={`${title}`}
                                        >
                                            {title}
                                        </abbr>
                                    </p>
                                </div>
                            </span>
                        </div>

                        <div className="card-title-description">
                            <p className="card-title-description">
                                {description}
                            </p>
                        </div>

                        {/* Watch Modal */}
                        <abbr className="modal-trigger-abbr" title="More info!">
                            <a className="modal-trigger" href="#getInfo">
                                <span className="material-icons pin">
                                    remove_red_eye
                                </span>
                            </a>
                        </abbr>
                        {/* End of Watch Modal */}

                        {/* Edit Modal */}
                        <EditModal
                            id={"editInfo"}
                            cardHandler={this.handleCardState.bind(this)}
                            listParent={listParent}
                            cardKey={cardKey}
                        />
                        {/* End of Edit Modal */}

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

                        <abbr
                            className="deadline-range"
                            title={`Delete Card!`}
                            onClick={() =>
                                this.removeCard(
                                    listParent,
                                    cardKey
                                )
                            }
                        >
                            <span className="material-icons pin">delete</span>
                        </abbr>
                    </div>
                    <SeeModal id={"getInfo"} />
                </div>
            </>
        );
    }
}

export default MCard;
