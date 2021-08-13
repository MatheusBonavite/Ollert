/* eslint-disable react/prop-types */
import React from "react";
import { Component } from "react";
import CardEditForm from "../../card_edit_form/CardEditForm";

import "./editModal.css";

class EditModal extends Component {
    componentDidMount() {
        //To access the materialize modal structure!
        M.Modal.init(document.querySelectorAll(".modal"));
    }

    render() {
        const { cardHandler, id,listParent, cardKey } = this.props;

        return (
            <div id={id} className="modal">
                <div className="see-modal-content">
                    <CardEditForm cardHandler={cardHandler} listParent={listParent} cardKey={cardKey} />
                </div>
            </div>
        );
    }
}

export default EditModal;
