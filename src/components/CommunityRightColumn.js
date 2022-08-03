import Reach, {useState, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

import CommunityProfile from "./CommunityProfile";
import IssueProfile from "./IssuesProfile";
import ShareButton from "./ShareButton";
import MapToggle from "./MapToggle";
import React from "react";

export default function CommunityRightColumn({
                                                communitySearch,
                                                compareSearch,
                                                selectedSpecificIssue,
                                                issues,
                                                showMap, setShowMap, showToggle
                                             }) {

    useEffect(()=>{
        console.log("community serch is ", communitySearch)
    })

    return(
        <>
            {!communitySearch && <div className={"d-flex flex-row align-items-center h-100 p-5 col-gap"}>
                <FontAwesomeIcon icon={faArrowLeft}/>
                <p className={"m-0"}>Search for a district to begin exploring</p>
            </div>}

            {communitySearch && !selectedSpecificIssue &&
                <div className={"d-flex flex-row align-items-center h-100 p-5 col-gap"}>
                <FontAwesomeIcon icon={faArrowLeft}/>
                <p className={"m-0"}>Click on a card to learn more about the issue</p>
            </div>
            }

            {communitySearch && selectedSpecificIssue &&
                <div className={"standard-padding d-flex flex-column h-100"}>
                    <div className={"issues-tile-header"}>
                        <div className={"toggle-share-container"}>
                            <div id={"share-container"}>
                                <ShareButton showMap={showMap}/>
                            </div>
                            <div id={"toggle-container"}>
                                <MapToggle showToggle={showToggle} showMap={showMap} setShowMap={setShowMap}/>
                            </div>
                    </div>
                    </div>
                        <div className={"standard-padding overflow-scroll"}>
                            <IssueProfile issues={issues} selectedSpecificIssue={selectedSpecificIssue} rankingProse={true}/>
                        </div>
                </div>}

        </>
    )
}