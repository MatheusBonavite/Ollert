/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from "react";
import "./listStyle.css";
import MCard from "../../materialize_comps/card/MCard";
import useGetCards from "../../custom_hooks/useGetCards"

var cardCounterCache = cardCounter();
function cardCounter() {
    let cardCounter = 0;
    return function () {
        cardCounter++;
        return cardCounter;
    };
}

const List = React.memo(({ listTitle, cardIds }) => {
    const [cardItems, setCardItems] = useState([]);
    const storageCards = [];
    cardIds?.length && cardIds.forEach(cardId =>{
        cardCounterCache();
        const [cardFromStorage] = useGetCards(cardId, listTitle);
        storageCards.push(cardFromStorage);
    });

    return (
        <div className="cards_parent list">
            <div id="card-list" className="list">
                <div>
                    <p>{listTitle}</p>
                    <hr />
                    {
                        storageCards?.length != 0 &&
                        storageCards.map((v) => {
                            return (
                                <MCard
                                    listParent={v?.listTitle}
                                    cardKey={v?.cardKey}
                                    key={v?.cardKey}
                                ></MCard>
                            );
                        })
                    }
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
