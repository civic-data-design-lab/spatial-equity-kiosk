import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";

import CommunitySearchBar from "./CommunitySearchBar";


export default function CommunityNav({
                                         communities, communitySearch,
                                         compareSearch,
                                         setCommunitySearch,
                                         setCompareSearch
                                     }) {

    const [addCompare, setAddCompare] = useState(false)

    useEffect(() => {
        if (!communitySearch) {
            setAddCompare(false)
        }
    })


    const getSearchItems = (communities, forSearch) => {
        let searchItems = []
        switch (forSearch) {
            case true:
                for (let [key, value] of Object.entries(communities)) {
                    if (key !== compareSearch) {
                        searchItems.push(
                            <div key={key}
                                 onClick={(e) => {
                                     e.stopPropagation()
                                 }}
                                 className={`${communitySearch && communitySearch.startsWith(key) ? "search-item-active" : "search-item-inactive"} col search-item p-2`}
                                 onMouseDown={(e) => {
                                     e.stopPropagation()
                                     setCommunitySearch(key)
                                 }
                                 }
                            >
                                <div className={"row w-100 p-0 m-0"}>
                                    <div className={"col-10 m-0 p-0"}>
                                        <span
                                            style={{fontWeight: 'bold'}}>{value.bolded_text}</span> {value.remaining_text}
                                    </div>
                                    <div
                                        className={`${communitySearch && communitySearch.startsWith(key) ? "visible" : "invisible"} d-flex col-2 p-0 flex-row justify-content-center align-items-center`}>
                                        <FontAwesomeIcon icon={faArrowRight}/></div>
                                </div>
                            </div>
                        )
                    }
                }
                break;
            case false:
                for (let [key, value] of Object.entries(communities)) {
                    if (key !== communitySearch) {
                        searchItems.push(
                            <div key={key}
                                 className={`${compareSearch && compareSearch.startsWith(key) ? "search-item-active" : "search-item-inactive"} col search-item p-2`}
                                 onMouseDown={() => {
                                     setCompareSearch(key)
                                 }}
                            >
                                <div className={"row w-100 p-0 m-0"}>
                                    <div className={"col-10 m-0 p-0"}>
                                        <span
                                            style={{fontWeight: 'bold'}}>{value.bolded_text}</span> {value.remaining_text}
                                    </div>
                                    <div
                                        className={`${compareSearch && compareSearch.startsWith(key) ? "visible" : "invisible"} d-flex col-2 p-0 flex-row justify-content-center align-items-center`}>
                                        <FontAwesomeIcon icon={faArrowRight}/></div>
                                </div>
                            </div>
                        )
                    }
                }

        }
        return searchItems
    }

    return (
        <div className={"community-nav-container d-flex flex-column justify-content-between h-100"}>
            <div className={"position-relative"}>
                <CommunitySearchBar toggleValue={communitySearch}
                                    communitySearch={communitySearch}
                                    callBack={setCommunitySearch}>
                    {getSearchItems(communities, true)}
                </CommunitySearchBar>

                {addCompare &&
                    <CommunitySearchBar toggleValue={compareSearch}
                                        communitySearch={communitySearch}
                                        callBack={setCompareSearch}>
                        {getSearchItems(communities, false)}
                    </CommunitySearchBar>

                }
            </div>

            <div className={"community-nav-text"}>

                {communitySearch &&
                    <p className={"m-0 community-description"}><span
                        className={"underline"}>{communities[communitySearch].bolded_text}</span> {communities[communitySearch].description}
                    </p>}
                {compareSearch &&
                    <p className={"m-0 community-description"}>{communities[compareSearch].bolded_text} {communities[compareSearch].description}</p>}

                <div
                    className={`${communitySearch ? "" : "d-none"} add-community-btn d-flex flex-row align-items-center`}
                    onClick={(e) => {
                        e.stopPropagation()
                        setCompareSearch(null)
                        setAddCompare(!addCompare)
                    }}
                >
                    {!addCompare ? <FontAwesomeIcon icon={faPlus} width={32}/> :
                        <FontAwesomeIcon icon={faMinus} width={32}/>}
                    <p className={"m-0"}>Compare Communities</p>
                </div>
            </div>


        </div>
    )
}