import React from "react";
import IssuesMiddleColumn from "./IssuesMiddleColumn";
import IssuesTileView from "./IssuesTileView";
import CommunityRightColumn from "./CommunityRightColumn";
import CommunityMiddleColumn from "./CommunityMiddleColumn";
import About from "./About";

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
                                    communities,
                                    demographic,
                                    setDemographic,
    boundary,
    setCommunitySearch, setCompareSearch
                                }) {


    return (
        <div className={"col-9 d-flex flex-row"}>

            <div
                className={`middle-column h-100 ${(selectedChapter === 2) || (selectedChapter === 3 && communitySearch && showMap) ? "col-4 no-top-border" : selectedChapter === 3 && communitySearch && !showMap ? "col-6" : "collapsed-middle-column"}`}>
                {((selectedChapter === 2) || (selectedChapter === 3 && communitySearch && showMap)) &&
                    <IssuesMiddleColumn
                        selectedIssue={selectedIssue} setSelectedIssue={setSelectedIssue} issues={issues}
                        selectedSpecificIssue={selectedSpecificIssue}
                        setSelectedSpecificIssue={setSelectedSpecificIssue} demographic={demographic} setDemographic={setDemographic}
                        communitySearch={communitySearch} compareSearch={compareSearch}
                    />}

                {selectedChapter === 3 && <CommunityMiddleColumn
                    communitySearch={communitySearch} compareSearch={compareSearch}
                    selectedSpecificIssue={selectedSpecificIssue} issues={issues}
                    communities={communities} setSelectedSpecificIssue={setSelectedSpecificIssue}
                />}

            </div>

            <div className={`h-100 flex-grow-1 ${!selectedChapter || selectedChapter === 1 ? "no-left-border" : ""}`}
                 id="right-column">


                {selectedChapter === 2 && <IssuesTileView
                    selectedSpecificIssue={selectedSpecificIssue} issues={issues}
                    showToggle={showToggle} showMap={showMap} setShowMap={setShowMap}
                    selectedIssue={selectedIssue} selectedChapter={selectedChapter}
                    communitySearch={communitySearch} compareSearch={compareSearch}
                    boundary={boundary} demographic={demographic}

                />}

                {selectedChapter === 3 && <CommunityRightColumn
                    communitySearch={communitySearch}
                    compareSearch={compareSearch}
                    selectedSpecificIssue={selectedSpecificIssue}
                    issues={issues}
                    showMap={showMap}
                    setShowMap={setShowMap}
                    showToggle={showToggle}
                    selectedIssue={selectedIssue} selectedChapter={selectedChapter}
                    boundary={boundary} demographic={demographic}




                />}

                {selectedChapter === 4 && <About issues={issues}/>}

            </div>


        </div>
    )
}