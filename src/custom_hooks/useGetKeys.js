import React, { useState, useEffect } from "react";
import returnAvailableKeys from "../local_forage_integration/returnAvailableKeys";

const useGetKeys = () => {
    const [keys, setKeys] = useState([]);
    const [status, setStatus] = useState("unloaded");

    useEffect(() => {
        async function requestKeys() {
            const keysVal = await returnAvailableKeys();
            if (keysVal?.length) setKeys(keysVal);
            else setKeys([]);

            setStatus("loaded");
        }
        requestKeys();
        console.log('i fire once');
    }, []);

    return [keys, status];
};

export default useGetKeys;
