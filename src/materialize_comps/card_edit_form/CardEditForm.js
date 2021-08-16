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
            };
            cardHandler(updated_card);
        };
    }

    componentDidMount() {
        M.Datepicker.init(document.querySelectorAll(".datepicker"));
        M.Range.init(document.querySelectorAll("input[type=range]"));
    }

    render() {
        const { cardHandler, cardKey } = this.props;
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
                            />
                            <label htmlFor={`card_title+${cardKey}`}>
                                Card Title
                            </label>
                        </div>
                        <div className="input-field col s6">
                            <input
                                id={`small_description+${cardKey}`}
                                type="text"
                                className="validate"
                            />
                            <label htmlFor={`small_description+${cardKey}`}>
                                Card Short Description
                            </label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s12">
                            <textarea
                                id={`description+${cardKey}`}
                                className="materialize-textarea"
                            ></textarea>
                            <label htmlFor={`description+${cardKey}`}>
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
                            />
                            <label htmlFor={`get_deadline+${cardKey}`}>
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
                                />
                            </p>
                            <label htmlFor={`to_complete+${cardKey}`}>
                                Time to Complete (Hours)
                            </label>
                        </div>
                    </div>
                    <button
                        id={`submit_form+${cardKey}`}
                        className="modal-close btn waves-effect waves-light"
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
