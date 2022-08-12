import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import IssueProfile from "./IssuesProfile";
import ShareButton from "./ShareButton";
import MapToggle from "./MapToggle";
import Typewriter from 'typewriter-effect';

export default function CommunityRightColumn({
                                                 communitySearch,
                                                 compareSearch,
                                                 selectedSpecificIssue,
                                                 issues,
                                                 showMap, setShowMap, showToggle,
                                                 selectedIssue, selectedChapter,
                                                 boundary, demographic, showDemographics,
                                                 setMoreIssues, moreIssuesLength, moreIssues, setMoreIssuesLength

                                             }) {


    return (
        <>
            {!communitySearch && <div className={"d-flex flex-row align-items-center h-100 p-5 col-gap w-100"}>

                    <FontAwesomeIcon icon={faArrowLeft} className={"fa-lg"}/>
                <h2 className={"m-0"}>Try searching for</h2>

                <div className={"typewriter-container"}>
                    <Typewriter
                    options={{
                        strings: (boundary === "community" ? ['Hamilton Heights', "Bronx 9", 'Bedford Stuyvesant'] : ["Washington Heights", "District 5", "Bensonhurst"]),
                        autoStart: true,
                        loop: true,
                        pauseFor: 2000,
                    }}
                />
                </div>


            </div>}

            {communitySearch && !selectedSpecificIssue &&
                <div className={"d-flex flex-row h-100 col-gap standard-padding"}>
                    <div className={"issues-tile-header"}>
                        <div className={"toggle-share-container"}>
                            <div id={"share-container"}>
                                <ShareButton showMap={showMap}
                                             communitySearch={communitySearch}
                                             compareSearch={compareSearch}
                                             selectedSpecificIssue={selectedSpecificIssue}
                                             issues={issues}
                                             setShowMap={setShowMap}
                                             showToggle={showToggle}
                                             selectedIssue={selectedIssue} selectedChapter={selectedChapter}
                                             boundary={boundary} demographic={demographic}
                                             showDemographics={showDemographics}
                                             moreIssues={moreIssues} setMoreIssues={setMoreIssues}
                                             moreIssuesLength={moreIssuesLength}
                                             setMoreIssuesLength={setMoreIssuesLength}
                                />
                            </div>
                            <div id={"toggle-container"}>
                                <MapToggle showToggle={showToggle} showMap={showMap} setShowMap={setShowMap}/>
                            </div>
                        </div>
                    </div>
                    <div className={"d-flex flex-row col-gap prompt"}>
                        <FontAwesomeIcon icon={faArrowLeft} className={"fa-lg"}/>
                        <h5 className={"m-0"}>Click on a card to learn more about the issue</h5>
                    </div>
                </div>
            }

            {communitySearch && selectedSpecificIssue &&
                <div className={"standard-padding d-flex flex-column h-100"}>
                    <div className={"issues-tile-header"}>
                        <div className={"toggle-share-container"}>
                            <div id={"share-container"}>
                                <ShareButton showMap={showMap}
                                             communitySearch={communitySearch}
                                             compareSearch={compareSearch}
                                             selectedSpecificIssue={selectedSpecificIssue}
                                             issues={issues}
                                             setShowMap={setShowMap}
                                             showToggle={showToggle}
                                             selectedIssue={selectedIssue} selectedChapter={selectedChapter}
                                             boundary={boundary} demographic={demographic}
                                             showDemographics={showDemographics}
                                             moreIssues={moreIssues} setMoreIssues={setMoreIssues}
                                             moreIssuesLength={moreIssuesLength}
                                             setMoreIssuesLength={setMoreIssuesLength}
                                />
                            </div>
                            <div id={"toggle-container"}>
                                <MapToggle showToggle={showToggle} showMap={showMap} setShowMap={setShowMap}/>
                            </div>
                        </div>
                    </div>
                    <div className={"standard-padding overflow-scroll"}>
                        <IssueProfile issues={issues} selectedSpecificIssue={selectedSpecificIssue}
                                      rankingProse={true} boundary={boundary}/>
                    </div>
                </div>}

        </>
    )
}