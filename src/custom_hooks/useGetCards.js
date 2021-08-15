import React, { useState, useEffect } from "react";
import getFromLocalForage from "../local_forage_integration/getFromLocalForage";

const useGetCards = (cardKey, listParent, dependency = []) => {
    const [cardFromStorage, setCardFromStorage] = useState({});
    console.log("(cardKey, listParent) => ", cardKey, listParent);
    useEffect(() => {
        async function requestCards() {
            const cardVal = await getFromLocalForage(cardKey, listParent);
            if (cardVal) setCardFromStorage(cardVal);
            else console.log("Card was not found here :(");
        }
        requestCards();
    }, dependency);

    return [cardFromStorage];
};

export default useGetCards;