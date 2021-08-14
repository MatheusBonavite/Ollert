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
    let cardId = '';
    let keeper = [];
    return function () {
        let aux = (Math.random() + 1).toString(36).substring(2);
        while(keeper.find(value => value == aux)){
            aux = (Math.random() + 1).toString(36).substring(2);
        }
        keeper.push(aux);
        cardId = aux;
        return cardId;
    };
}

const List = React.memo(({ listTitle, cardIds }) => {
    const [cardItems, setCardItems] = useState([]);
    const storageCards = [];

    function removeCard(cardKey){
        setCardItems(
            cardItems.filter(cardId => cardId != cardKey)
        )
    }

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
                                    listParent={v?.listParent}
                                    cardKey={v?.cardKey}
                                    key={v?.cardKey}
                                    title={v?.title}
                                    deadline={v?.deadline}
                                    description={v?.description}
                                    fullDescription={v?.fullDescription}
                                    priority={v?.priority}
                                    timeEstimated={v?.timeEstimated}
                                    removable={removeCard}
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
                                    removable={removeCard}
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
