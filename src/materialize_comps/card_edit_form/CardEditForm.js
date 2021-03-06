/* eslint-disable react/prop-types */
import React from "react";
import { Component } from "react";
import "./cardEditForm.css";
import ListDropdown from "../dropdowns/ListDropdown";
class CardEditForm extends Component {
    constructor() {
        super();

        this.priorityMatcher = function (priority) {
            const priorityMatcherObj = {
                Critical: "looks_one",
                Important: "looks_two",
                Normal: "looks_3",
                Low: "looks_4",
            };
            if (priority) return priorityMatcherObj[priority];
            return Object.keys(priorityMatcherObj);
        };

        this.handleSubmit = function (event, cardHandler) {
            const { cardKey } = this.props;
            event.preventDefault();
            const updated_card = {
                title: document.getElementById(`card_title+${cardKey}`).value,
                description: document.getElementById(
                    `small_description+${cardKey}`
                ).value,
                fullDescription: document.getElementById(
                    `description+${cardKey}`
                ).value,
                priority: document.getElementById(`priority+${cardKey}`).value,
                deadline: document.getElementById(`get_deadline+${cardKey}`)
                    .value,
                timeEstimated: document.getElementById(`to_complete+${cardKey}`)
                    .value,
                cardKey: cardKey,
                listParent: this.props.listParent,
                taskStatus: Array.from(
                    document.querySelectorAll(
                        `[name='group+${cardKey}']:checked`
                    )
                ).map((v) => v?.nextSibling?.innerText || "Not started")[0],
            };
            cardHandler(updated_card);
        };
    }

    componentDidMount() {
        M.Datepicker.init(document.querySelectorAll(".datepicker"));
        M.Range.init(document.querySelectorAll("input[type=range]"));
    }

    render() {
        const {
            cardHandler,
            cardKey,
            title,
            description,
            fullDescription,
            deadline,
            timeEstimated,
            taskStatus,
        } = this.props;
        console.log("Render cardKey ===> ", cardKey);
        return (
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <input
                                id={`card_title+${cardKey}`}
                                type="text"
                                className="validate"
                                defaultValue={title}
                                placeholder=""
                            />
                            <label
                                className="active"
                                htmlFor={`card_title+${cardKey}`}
                            >
                                Card Title
                            </label>
                        </div>
                        <div className="input-field col s6">
                            <input
                                id={`small_description+${cardKey}`}
                                type="text"
                                className="validate"
                                defaultValue={description}
                                placeholder=""
                            />
                            <label
                                className="active"
                                htmlFor={`small_description+${cardKey}`}
                            >
                                Card Short Description
                            </label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s12">
                            <textarea
                                id={`description+${cardKey}`}
                                className="materialize-textarea"
                                defaultValue={fullDescription}
                                placeholder=""
                            ></textarea>
                            <label
                                className="active"
                                htmlFor={`description+${cardKey}`}
                            >
                                Description
                            </label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s6">
                            <i className="material-icons prefix">date_range</i>
                            <input
                                id={`get_deadline+${cardKey}`}
                                type="text"
                                className="datepicker"
                                defaultValue={deadline}
                                placeholder=""
                            />
                            <label
                                className="active"
                                htmlFor={`get_deadline+${cardKey}`}
                            >
                                Deadline
                            </label>
                        </div>
                        <div className="input-field col s6">
                            <ListDropdown
                                id={`priority+${cardKey}`}
                                title={"Select Priority"}
                                list={this.priorityMatcher()}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s12">
                            <p className="range-field">
                                <input
                                    id={`to_complete+${cardKey}`}
                                    type="range"
                                    min="1"
                                    max="40"
                                    className="active"
                                    defaultValue={
                                        timeEstimated != "N/A"
                                            ? timeEstimated
                                            : 0
                                    }
                                />
                            </p>
                            <label htmlFor={`to_complete+${cardKey}`}>
                                Time to Complete (Hours)
                            </label>
                        </div>
                    </div>

                    <div className="select-status">
                        Task Status:
                        <p>
                            <label>
                                <input
                                    className="with-gap"
                                    name={`group+${cardKey}`}
                                    type="radio"
                                />
                                <span>Not started</span>
                            </label>
                            <label>
                                <input
                                    className="with-gap"
                                    name={`group+${cardKey}`}
                                    type="radio"
                                />
                                <span>In Progress</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input
                                    className="with-gap"
                                    name={`group+${cardKey}`}
                                    type="radio"
                                />
                                <span>Done</span>
                            </label>
                            <label>
                                <input
                                    className="with-gap"
                                    name={`group+${cardKey}`}
                                    type="radio"
                                />
                                <span>Closed</span>
                            </label>
                        </p>
                    </div>

                    <button
                        id={`submit_form+${cardKey}`}
                        className="modal-close btn waves-effect waves-light submit_form"
                        type="submit"
                        name="action"
                        onClick={(event) => {
                            this.handleSubmit(event, cardHandler);
                        }}
                    >
                        {`Submit for ID: ${this.props.cardKey}`}
                    </button>
                </form>
            </div>
        );
    }
}

export default CardEditForm;
