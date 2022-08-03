import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

import CommunitySearchBar from "./CommunitySearchBar";


export default function CompareSearchBar({toggleValue, callBack, searchItems, communitySearch}) {
    return (
        <CommunitySearchBar toggleValue={toggleValue} callBack={callBack} communitySearch={communitySearch}>
            {searchItems}
        </CommunitySearchBar>
    )
}