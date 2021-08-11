/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
// import MCard from "../../materialize_comps/card/MCard";
import List from "../list/list";
import "./listAdderStyle.css";
const listTitleCache = new Set();

const ListAdder = () => {
    const [lists, setLists] = useState([]);

    function handleClick() {
        const listTitle = document.getElementById("list_title");
        if (listTitle?.value) {
            setLists([...lists, listTitle.value]);
            console.log(lists);
        }
    }
    
    return (
        <>
            {lists.length
                ? lists.map((list) => {
                        return <List key={list} listTitle={list} />;
                  })
                : ""}
            <div className="get_list_name">
                <input type="text" id="list_title" />
                <i
                    className="material-icons right"
                    onClick={() => {
                        handleClick()
                        listTitleCache.add(...lists)
                    }}
                >
                    airplay
                </i>
            </div>
        </>
    );
};

export default ListAdder;
