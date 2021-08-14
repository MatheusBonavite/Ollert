/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import useGetKeys from "../../custom_hooks/useGetKeys";

// import MCard from "../../materialize_comps/card/MCard";
import List from "../list/list";
import "./listAdderStyle.css";
const listTitleCache = new Set();

const ListAdder = () => {
    const [lists, setLists] = useState([]);
    const [listTitle, setListTitle] = useState("");
    const [gotKeys, uniqueLists, status ] = useGetKeys();

    function handleClick() {

        if (listTitle) {
            setLists([...lists, listTitle]);
        }
    }

    if (status != "unloaded") {
        return (
            <>
                {   uniqueLists?.length ? uniqueLists.map((list) => {
                            let cardIds = gotKeys.filter(key => key.split("+")[0] == list).map(key => key.split("+")[1]);
                            return <List key={list} listTitle={list} cardIds={cardIds}/>;
                      }) : ""
                }
                {   lists?.length ? lists.map((list) => {
                          return <List key={list} listTitle={list} />;
                      }) : ""
                }
                <div className="get_list_name">
                    <input
                        type="text"
                        id="list_title"
                        onChange={(event) => setListTitle(event.target.value)}
                    />
                    <i
                        className="material-icons right"
                        onClick={() => {
                            handleClick();
                            listTitleCache.add(...lists);
                        }}
                    >
                        airplay
                    </i>
                </div>
            </>
        );
    }

    return (
        <div className="loading-screen">
            <div className="preloader-wrapper big active">
                <div className="spinner-layer spinner-blue-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div>
                    <div className="gap-patch">
                        <div className="circle"></div>
                    </div>
                    <div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                </div>
            </div>
            <h3 className="loadin-screen-title">Loading Environment</h3>
        </div>
    );
};

export default ListAdder;
