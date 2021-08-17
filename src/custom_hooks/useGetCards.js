import React, { useState, useEffect } from "react";
import getFromLocalForage from "../local_forage_integration/getFromLocalForage";

const useGetCards = (cardKey, listParent, dependency = []) => {
    const [cardFromStorage, setCardFromStorage] = useState({});
    useEffect(() => {
        async function requestCards() {
            const cardVal = await getFromLocalForage(cardKey, listParent);
            if (cardVal) setCardFromStorage(cardVal);
        }
        requestCards();
    }, dependency);

    return [cardFromStorage];
};

export default useGetCards;
