import React, { useState, useEffect } from "react";
import returnAvailableKeys from "../local_forage_integration/returnAvailableKeys";

const useGetKeys = () => {
    const [keys, setKeys] = useState([]);
    const [uniqueLists, setUniqueLists] = useState([]);
    const [status, setStatus] = useState("unloaded");

    useEffect(() => {
        async function requestKeys() {
            const keysVal = await returnAvailableKeys();
            if (keysVal?.length) {
                setKeys(keysVal);
                setUniqueLists(
                    Array.from(
                        new Set(keysVal.map((key) => key.split("+")[0]))
                    ).filter((value) => Boolean(value))
                );
            } else setKeys([]);

            setStatus("loaded");
        }
        requestKeys();
        console.log("i fire once");
    }, []);

    return [keys, uniqueLists, status];
};

export default useGetKeys;
