import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

import CommunitySearchBar from "./CommunitySearchBar";


export default function CommunityNav({
                                         communities, communitySearch,
                                         compareSearch,
                                         setCommunitySearch,
                                         setCompareSearch
                                     }) {


    const getSearchItems = (communities, forSearch) => {
        let searchItems = []
        switch (forSearch) {
            case true:
                for (let [key, value] of Object.entries(communities)) {
                    if (key !== compareSearch) {
                        searchItems.push(
                            <div key={key}
                                 className={`${communitySearch && communitySearch.startsWith(key) ? "search-item-active" : "search-item-inactive"} col search-item p-2`}
                                 onMouseDown={() => {
                                     setCommunitySearch(key)
                                 }}
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
        <div className={"community-nav-container"}>
            <CommunitySearchBar toggleValue={communitySearch}
                                communitySearch={communitySearch}
                                callBack={setCommunitySearch}>
                {getSearchItems(communities, true)}
            </CommunitySearchBar>



        </div>
    )
}