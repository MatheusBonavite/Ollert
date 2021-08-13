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
            event.preventDefault();
            const updated_card = {
                title: document.getElementById("card_title").value,
                description: document.getElementById("small_description").value,
                fullDescription: document.getElementById("description").value,
                priority: document.getElementById("priority").value,
                deadline: document.getElementById("get_deadline").value,
                timeEstimated: document.getElementById("to_complete").value,
                cardKey: this.props.cardKey,
                listParent: this.props.listParent
            };
            cardHandler(updated_card);
        };
    }

    componentDidMount() {
        M.Datepicker.init(document.querySelectorAll(".datepicker"));
        M.Range.init(document.querySelectorAll("input[type=range]"));
    }

    render() {
        const { cardHandler } = this.props;
        return (
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <input
                                id="card_title"
                                type="text"
                                className="validate"
                            />
                            <label htmlFor="card_title">Card Title</label>
                        </div>
                        <div className="input-field col s6">
                            <input
                                id="small_description"
                                type="text"
                                className="validate"
                            />
                            <label htmlFor="small_description">
                                Card Short Description
                            </label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s12">
                            <textarea
                                id="description"
                                className="materialize-textarea"
                            ></textarea>
                            <label htmlFor="description">Description</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s6">
                            <i className="material-icons prefix">date_range</i>
                            <input
                                id="get_deadline"
                                type="text"
                                className="datepicker"
                            />
                            <label htmlFor="get_deadline">Deadline</label>
                        </div>
                        <div className="input-field col s6">
                            <ListDropdown
                                id={"priority"}
                                title={"Select Priority"}
                                list={this.priorityMatcher()}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s12">
                            <p className="range-field">
                                <input
                                    id="to_complete"
                                    type="range"
                                    min="1"
                                    max="40"
                                    className="active"
                                />
                            </p>
                            <label htmlFor="to_complete">
                                Time to Complete (Hours)
                            </label>
                        </div>
                    </div>
                    <button
                        id="submit_form"
                        className="modal-close btn waves-effect waves-light"
                        type="submit"
                        name="action"
                        onClick={(event) => {
                            this.handleSubmit(event, cardHandler);
                        }}
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

export default CardEditForm;
