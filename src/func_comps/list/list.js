/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from "react";
import "./listStyle.css";
import MCard from "../../materialize_comps/card/MCard";
import useGetCards from "../../custom_hooks/useGetCards";
import localForage from "localforage";
import returnAvailableKeys from "../../local_forage_integration/returnAvailableKeys";

var cardCounterCache = cardCounter();
function cardCounter() {
    let cardId = "";
    let keeper = [];
    return function () {
        let aux = (Math.random() + 1).toString(36).substring(2);
        while (keeper.find((value) => value == aux)) {
            aux = (Math.random() + 1).toString(36).substring(2);
        }
        keeper.push(aux);
        cardId = aux;
        return cardId;
    };
}

async function removeList(listTitle) {
    let keys = await returnAvailableKeys();
    keys.filter((key) => key.split("+")[0] == listTitle).forEach(
        async function (keyToDispose) {
            let [listParent, cardKey] = [
                keyToDispose.split("+")[0],
                keyToDispose.split("+")[1],
            ];
            await localForage.removeItem(`${listParent}+${cardKey}`);
        }
    );
    await localForage.setItem(
        "keys",
        keys.filter((key) => key.split("+")[0] != listTitle)
    );
    location.reload();
}

const List = React.memo(({ listTitle, cardIds }) => {
    const [cardItems, setCardItems] = useState([]);
    const storageCards = [];

    cardIds?.length &&
        cardIds.forEach((cardId) => {
            cardCounterCache();
            const [cardFromStorage] = useGetCards(cardId, listTitle);
            storageCards.push(cardFromStorage);
        });

    return (
        <div className="cards_parent list">
            <div className="list">
                <div>
                    {listTitle}
                    <abbr title="Delete list!">
                        <span
                            className="delete-list material-icons pin"
                            onClick={() => removeList(listTitle)}
                        >
                            delete
                        </span>
                    </abbr>
                    <hr />
                    {storageCards?.length != 0 &&
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
                                    cardItems={cardItems}
                                    setCardItems={setCardItems}
                                    storageCards={storageCards}
                                    taskStatus={v?.taskStatus}
                                ></MCard>
                            );
                        })}
                    {cardItems?.length != 0 &&
                        cardItems.map((v) => {
                            return (
                                <MCard
                                    listParent={listTitle}
                                    cardKey={v}
                                    key={v}
                                    cardItems={cardItems}
                                    setCardItems={setCardItems}
                                    storageCards={storageCards}
                                ></MCard>
                            );
                        })}
                </div>
                <div>
                    <a
                        className="card_adder"
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
