/* eslint-disable react/prop-types */
import React from "react";
import { Component } from "react";
import "./infoListModal.css";
import returnAvailableKeys from "../../../local_forage_integration/returnAvailableKeys";
import localForage from "localforage";

const statusCounter = {
    "Not started": 0,
    "In Progress": 0,
    Done: 0,
    Closed: 0,
};

class InfoListModal extends Component {
    state = {
        bars: {},
    };

    componentDidMount() {
        //To access the materialize modal structure!
        M.Modal.init(document.querySelectorAll(".modal"));
    }

    resetStatusCounter() {
        Object.keys(statusCounter).forEach((status) => {
            statusCounter[status] = 0;
        });
    }

    async getBarsBasedOnStatus(listTitle) {
        let keys = await returnAvailableKeys();
        let values = await Promise.all(
            keys
                .filter((key) => key.split("+")[0] == listTitle)
                .map(async function (keyToGet) {
                    let [listParent, cardKey] = [
                        keyToGet.split("+")[0],
                        keyToGet.split("+")[1],
                    ];
                    return await localForage.getItem(
                        `${listParent}+${cardKey}`
                    );
                })
        );
        let statusKeys = values.map((val) => val?.taskStatus || "Not started");
        statusKeys.forEach((statusKey) => (statusCounter[statusKey] += 1));
        let max = Math.max(...Object.values(statusCounter));
        Object.keys(statusCounter).forEach((keyStatus) => {
            statusCounter[keyStatus] = Math.round(
                (12.0 * statusCounter[keyStatus]) / max
            );
        });

        this.setState({ bars: JSON.parse(JSON.stringify(statusCounter)) });
        console.log(this.state.bars);
        this.resetStatusCounter();
    }

    render() {
        const { listTitle } = this.props;

        return (
            <>
                <abbr className="modal-trigger-abbr" title="More info!">
                    <a
                        className="modal-trigger"
                        href={`#seeInfo${listTitle}`}
                        onClick={(e) => {
                            this.getBarsBasedOnStatus(listTitle);
                        }}
                    >
                        <span className="material-icons pin">info</span>
                    </a>
                </abbr>

                <div id={`seeInfo${listTitle}`} className="modal">
                    <div className="info-modal-content">
                        <div className="info-modal-title">
                            <h4> {"Status Log: "} </h4>
                        </div>
                        <div className="info-modal-log">
                            <div className="row">
                                <div
                                    className={`col s${this.state.bars["Not started"]}`}
                                    style={{ backgroundColor: "orange" }}
                                >
                                    Not started
                                </div>
                            </div>
                            <div className="row">
                                <div
                                    className={`col s${this.state.bars["In Progress"]}`}
                                    style={{ backgroundColor: "#1ac0ea" }}
                                >
                                    In Progress
                                </div>
                            </div>
                            <div className="row">
                                <div
                                    className={`col s${this.state.bars["Done"]}`}
                                    style={{ backgroundColor: "lightgreen" }}
                                >
                                    Done
                                </div>
                            </div>
                            <div className="row">
                                <div
                                    className={`col s${this.state.bars["Closed"]}`}
                                    style={{ backgroundColor: "crimson" }}
                                >
                                    Closed
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default InfoListModal;
