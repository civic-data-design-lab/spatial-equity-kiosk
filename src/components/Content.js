import React from "react";
import IssuesMiddleColumn from "./IssuesMiddleColumn";
import IssuesTileView from "./IssuesTileView";
import CommunityRightColumn from "./CommunityRightColumn";
import CommunityMiddleColumn from "./CommunityMiddleColumn";

export default function Content({
                                    selectedChapter,
                                    selectedIssue,
                                    setSelectedIssue,
                                    issues,
                                    selectedSpecificIssue,
                                    setSelectedSpecificIssue,
                                    showToggle,
                                    showMap,
                                    setShowMap,
                                    communitySearch,
                                    compareSearch,
                                    communities
}) {


    return (
        <div className={"col-9 d-flex flex-row"}>

            <div className={`h-100 black-border ${(selectedChapter === 2) || (selectedChapter === 3 && communitySearch && showMap) ? "col-4" : selectedChapter === 3 && communitySearch && !showMap ? "col-6" : "collapsed-middle-column"} middle-column`}>
                {((selectedChapter === 2) || (selectedChapter === 3 && communitySearch && showMap)) && <IssuesMiddleColumn
                    selectedIssue={selectedIssue} setSelectedIssue={setSelectedIssue} issues={issues}
                    selectedSpecificIssue={selectedSpecificIssue} setSelectedSpecificIssue={setSelectedSpecificIssue} />}

                {selectedChapter === 3 && <CommunityMiddleColumn
                    communitySearch={communitySearch} compareSearch={compareSearch}
                    selectedSpecificIssue={selectedSpecificIssue} issues={issues}
                    communities={communities} setSelectedSpecificIssue={setSelectedSpecificIssue}
                />}

            </div>

            <div className={`h-100 black-border flex-grow-1 `}>
                {selectedChapter === 2 && <IssuesTileView
                    selectedSpecificIssue={selectedSpecificIssue} issues={issues}
                    showToggle={showToggle} showMap={showMap} setShowMap={setShowMap}
                />}

                {selectedChapter === 3 && <CommunityRightColumn
                    communitySearch={communitySearch}
                    compareSearch={compareSearch}
                    selectedSpecificIssue={selectedSpecificIssue}
                    issues={issues}
                    showMap={showMap}
                    setShowMap={setShowMap}
                    showToggle={showToggle}

                />}

            </div>


        </div>
    )
}