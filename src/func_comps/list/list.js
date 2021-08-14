/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from "react";
import "./listStyle.css";
import MCard from "../../materialize_comps/card/MCard";

var cardCounterCache = cardCounter();
function cardCounter() {
    let cardCounter = 0;
    return function () {
        cardCounter++;
        return cardCounter;
    };
}

const List = React.memo(({ listTitle, cardId }) => {
    const [cardItems, setCardItems] = useState([]);

    return (
        <div className="cards_parent list">
            <div id="card-list" className="list">
                <div>
                    <p>{listTitle}</p>
                    <hr />
                    {
                        cardItems?.length != 0 &&
                        cardItems.map((v) => {
                            return (
                                <MCard
                                    listParent={listTitle}
                                    cardKey={v}
                                    key={v}
                                ></MCard>
                            );
                        })
                    }
                    
                </div>
                <div>
                    <a
                        id="card_adder"
                        onClick={() => {
                            setCardItems([...cardItems, cardCounterCache()]);
                        }}
                    >
                        <span>
                            <i className="material-icons">add</i>
                        </span>
                        Add Card!
                    </a>
                </div>
            </div>
        </div>
    );
});

export default List;
