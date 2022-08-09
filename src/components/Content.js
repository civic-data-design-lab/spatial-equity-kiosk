import React from "react";
import IssuesMiddleColumn from "./IssuesMiddleColumn";
import IssuesTileView from "./IssuesTileView";
import CommunityRightColumn from "./CommunityRightColumn";
import CommunityMiddleColumn from "./CommunityMiddleColumn";
import About from "./About";
import AboutMiddleColumn from "./AboutMiddleColumn";

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
                                    selectedAbout,
                                    setSelectedAbout,
                                    boundary,
                                    setCommunitySearch, setCompareSearch,
                                    showDemographics, setShowDemographics,
    moreIssues, setMoreIssues, moreIssuesLength, setMoreIssuesLength
                                }) {


    return (
        <div className={"col-9 d-flex flex-row"}>

            <div
                className={`middle-column h-100 ${(selectedChapter === 2 || selectedChapter === 4) || (selectedChapter === 3 && communitySearch && showMap) ? "col-4 no-top-border" : selectedChapter === 3 && communitySearch && !showMap ? "col-6" : "collapsed-middle-column"}`}>
                {((selectedChapter === 2) || (selectedChapter === 3 && communitySearch && showMap)) &&
                    <IssuesMiddleColumn
                        selectedIssue={selectedIssue} setSelectedIssue={setSelectedIssue} issues={issues}
                        selectedSpecificIssue={selectedSpecificIssue}
                        setSelectedSpecificIssue={setSelectedSpecificIssue} demographic={demographic} setDemographic={setDemographic}
                        communitySearch={communitySearch} compareSearch={compareSearch}
                        showDemographics={showDemographics} setShowDemographics={setShowDemographics}
                    />}

                {selectedChapter === 3 && <CommunityMiddleColumn
                    communitySearch={communitySearch} compareSearch={compareSearch}
                    selectedSpecificIssue={selectedSpecificIssue} issues={issues}
                    communities={communities} setSelectedSpecificIssue={setSelectedSpecificIssue}
                    moreIssues={moreIssues} setMoreIssues={setMoreIssues} moreIssuesLength={moreIssuesLength} setMoreIssuesLength={setMoreIssuesLength}
                />}

                {selectedChapter === 4 && <AboutMiddleColumn selectedAbout={selectedAbout} setSelectedAbout={setSelectedAbout}/>}

            </div>

            <div className={`h-100 flex-grow-1 ${!selectedChapter || selectedChapter === 1 ? "no-left-border" : ""}`}
                 id="right-column">


                {selectedChapter === 2 && <IssuesTileView
                    selectedSpecificIssue={selectedSpecificIssue} issues={issues}
                    showToggle={showToggle} showMap={showMap} setShowMap={setShowMap}
                    selectedIssue={selectedIssue} selectedChapter={selectedChapter}
                    communitySearch={communitySearch} compareSearch={compareSearch}
                    boundary={boundary} demographic={demographic}
                    showDemographics={showDemographics}
                    moreIssues={moreIssues} setMoreIssues={setMoreIssues} moreIssuesLength={moreIssuesLength} setMoreIssuesLength={setMoreIssuesLength}

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
                    showDemographics={showDemographics}
                    moreIssues={moreIssues} setMoreIssues={setMoreIssues} moreIssuesLength={moreIssuesLength} setMoreIssuesLength={setMoreIssuesLength}
                />}

                {selectedChapter === 4 && <About issues={issues} selectedAbout={selectedAbout}/>}

            </div>


        </div>
    )
}