/* eslint-disable react/prop-types */
import React from "react";
import { Component } from "react";
import SeeModal from "../modals/see_card_modal/SeeModal";
import EditModal from "../modals/edit_card_modal/EditModal";
import ListDropdown from "../dropdowns/ListDropdown";
import integrateWithLocalForage from "../../local_forage_integration/integrateWithLocalForage";
import getFromLocalForage from "../../local_forage_integration/getFromLocalForage";
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
        taskStatus: this.props.taskStatus || "Not started",
    };

    async componentDidMount() {
        if (this?.props) {
            const fromLocal = await getFromLocalForage(
                this.props.cardKey,
                this.props.listParent
            );
            console.log("fromLocal >>> ", fromLocal);
            integrateWithLocalForage({
                title: this.props.title || fromLocal?.title,
                description: this.props.description || fromLocal?.description,
                cardKey: this.props.cardKey,
                listParent: this.props.listParent,
                fullDescription:
                    this.props.fullDescription || fromLocal?.fullDescription,
                priority: this.props.priority || fromLocal?.priority,
                deadline: this.props.deadline || fromLocal?.deadline,
                timeEstimated:
                    this.props.timeEstimated || fromLocal?.timeEstimated,
                taskStatus: this.props.taskStatus || fromLocal?.taskStatus,
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

    statusMatcher(status) {
        console.log("Status matcher > ", status);
        const statusMatch = {
            "Not started": "not_started",
            "In Progress": "in_progress",
            Done: "done",
            Closed: "closed",
        };
        console.log("Status matcher > ", statusMatch[status]);
        if (status) return statusMatch[status];
        else return "not_started";
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
            taskStatus: props.taskStatus,
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
            taskStatus,
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
                    <div
                        className={`marked-task ${this.statusMatcher(
                            taskStatus || "Not started"
                        )}`}
                    >
                        <a className="waves-effect waves-light btn">
                            {taskStatus || "Not started"}
                        </a>
                    </div>
                    <div className="card-content">
                        <div className="card-title-priority">
                            <span className="content-title activator grey-text text-darken-4">
                                <div className="card-title">
                                    <abbr title={`Priority: ${priority}`}>
                                        <i
                                            className="material-icons"
                                            data-target="priority_dropdown"
                                        >
                                            {this.priorityMatcher(priority) ||
                                                "looks_4"}
                                        </i>
                                    </abbr>
                                    <abbr
                                        className="abbr-title-card"
                                        title={`${title}`}
                                    >
                                        {title}
                                    </abbr>
                                </div>
                            </span>
                        </div>

                        <div className="card-title-description">
                            <p className="card-title-description">
                                {description}
                            </p>
                        </div>

                        {/* See Modal */}
                        <SeeModal
                            title={title}
                            description={description}
                            fullDescription={fullDescription}
                            cardKey={cardKey}
                        />
                        {/* End of See Modal */}

                        {/* Edit Modal */}
                        <EditModal
                            cardHandler={this.handleCardState.bind(this)}
                            listParent={listParent}
                            cardKey={cardKey}
                            title={title}
                            description={description}
                            fullDescription={fullDescription}
                            priority={priority}
                            deadline={deadline}
                            timeEstimated={timeEstimated}
                            taskStatus={taskStatus}
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
                            onClick={() => this.removeCard(listParent, cardKey)}
                        >
                            <span className="material-icons pin">delete</span>
                        </abbr>
                    </div>
                </div>
            </>
        );
    }
}

export default MCard;
