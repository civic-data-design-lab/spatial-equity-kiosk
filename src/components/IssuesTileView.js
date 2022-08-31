import React, { useState } from "react";
import MapToggle from "./MapToggle";
import ShareButton from "./ShareButton";
import IssueProfile from "./IssuesProfile";
import Histogram from "./Histogram";

export default function IssuesTileView({
    selectedSpecificIssue,
    issues, showToggle,
    showMap, setShowMap,
    selectedIssue, selectedChapter,
    communitySearch, compareSearch,
    boundary, demographic, showDemographics,
    moreIssues, setMoreIssues, moreIssuesLength, setMoreIssuesLength,
    setSelectedSpecificIssue, colorRamps
}) {

    const [expand, setExpand] = useState(false)

    const getIssueName = () => {
        return issues.specific_issues_data[selectedSpecificIssue].specific_issue_name || null
    }

    const getIssueSolutions = () => {
        return issues.specific_issues_data[selectedSpecificIssue].specific_issue_solutions || null
    }


    return (
        <>
            {selectedSpecificIssue &&
                <div className={"col-12 h-100 issues-tile-container"}>
                    <div className={"issues-tile-header"}>
                        <div className={"toggle-share-container"}>
                            <div id={"share-container"}>
                                <ShareButton
                                    showMap={showMap}
                                    communitySearch={communitySearch}
                                    compareSearch={compareSearch}
                                    selectedSpecificIssue={selectedSpecificIssue}
                                    issues={issues}
                                    setShowMap={setShowMap}
                                    showToggle={showToggle}
                                    selectedIssue={selectedIssue} selectedChapter={selectedChapter}
                                    boundary={boundary} demographic={demographic} showDemographics={showDemographics}
                                    moreIssues={moreIssues} setMoreIssues={setMoreIssues}
                                    moreIssuesLength={moreIssuesLength} setMoreIssuesLength={setMoreIssuesLength}
                                />
                            </div>
                            <div id={"toggle-container"}>
                                <MapToggle showToggle={showToggle} showMap={showMap} setShowMap={setShowMap} />
                            </div>
                        </div>
                    </div>

                    <div className={"issues-tile-body m-0"}>


                        <div className={"issue-tile-viz"}  >
                            <div>
                                <h5 className={"m-0 bold"}>{getIssueName()}</h5>
                                <p className={"m-0 small-font"}>{issues.specific_issues_data[selectedSpecificIssue].specific_issue_units}</p>
                            </div>
                            <div style={{  flex: 1 }}>
                                <Histogram
                                    colorRampsyType={colorRamps}
                                    issues={issues}
                                    boundary={boundary}
                                    selectedSpecificIssue={selectedSpecificIssue}
                                />
                            </div>
                            <p className={"m-0 small-font"}>{issues.specific_issues_data[selectedSpecificIssue].specific_issue_source}</p>
                        </div>


                        <div className={"col-6 w-50 overflow-scroll"}>
                            <IssueProfile issues={issues} selectedSpecificIssue={selectedSpecificIssue} boundary={boundary} setSelectedSpecificIssue={setSelectedSpecificIssue} />
                        </div>
                    </div>
                </div>
            }

            {!selectedSpecificIssue &&
                <div className={"col-12 h-100 issues-tile-container"}>

                    <div className={"issues-tile-header"}>
                        <div className={"toggle-share-container"}>
                            <div id={"share-container"}>
                                <ShareButton
                                    showMap={showMap}
                                    communitySearch={communitySearch}
                                    compareSearch={compareSearch}
                                    selectedSpecificIssue={selectedSpecificIssue}
                                    issues={issues}
                                    setShowMap={setShowMap}
                                    showToggle={showToggle}
                                    selectedIssue={selectedIssue} selectedChapter={selectedChapter}
                                    boundary={boundary} demographic={demographic} showDemographics={showDemographics}
                                    moreIssues={moreIssues} setMoreIssues={setMoreIssues}
                                    moreIssuesLength={moreIssuesLength} setMoreIssuesLength={setMoreIssuesLength}
                                />
                            </div>
                            <div id={"toggle-container"}>
                                <MapToggle showToggle={showToggle} showMap={showMap} setShowMap={setShowMap} />
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    )

}