import M from "materialize-css";
import React from "react";
import { Component } from "react";

class ListDropdown extends Component {
    componentDidMount() {
        console.log(document.querySelectorAll(".dropdown-trigger"));
        M.FormSelect.init(document.querySelectorAll("select"));
    }

    render() {
        const { id, list, title } = this.props;

        return (
            <>
                <select id={id} defaultValue={"Normal"}>
                    {list?.length &&
                        list.map((listVal) => {
                            return (
                                <option key={listVal} value={listVal}>
                                    {" "}
                                    {listVal}{" "}
                                </option>
                            );
                        })}
                </select>
                <label>{title}</label>
            </>
        );
    }
}

export default ListDropdown;
