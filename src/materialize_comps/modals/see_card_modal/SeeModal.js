/* eslint-disable react/prop-types */
import React from "react";
import { Component } from "react";
import "./seeModal.css";

class SeeModal extends Component {
    componentDidMount() {
        //To access the materialize modal structure!
        M.Modal.init(document.querySelectorAll(".modal"));
    }

    render() {
        const {
            title = "New Card",
            description = `A Small Description for Card!`,
            fullDescription = `A more complete description, following the card we want!`,
            cardKey,
        } = this.props;

        return (
            <>
                <abbr className="modal-trigger-abbr" title="More info!">
                    <a className="modal-trigger" href={`#seeInfo${cardKey}`}>
                        <span className="material-icons pin">
                            remove_red_eye
                        </span>
                    </a>
                </abbr>
                <div id={`seeInfo${cardKey}`} className="modal">
                    <div className="see-modal-content">
                        <div className="see-modal-title">
                            <h4> {title} </h4>
                        </div>
                        <div className="see-modal-description">
                            <p> {description} </p>
                        </div>
                        <div className="see-modal-fdescription">
                            <p> {fullDescription} </p>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default SeeModal;
