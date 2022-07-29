import React from "react";
import IssuesMiddleColumn from "./IssuesMiddleColumn";
import IssuesTileView from "./IssuesTileView";

export default function Content({
                                    selectedChapter,
                                    selectedIssue,
                                    setSelectedIssue,
                                    issues,
                                    selectedSpecificIssue,
                                    setSelectedSpecificIssue,
                                    showToggle,
                                    showMap,
                                    setShowMap
}) {


    return (
        <div className={"col-9 d-flex flex-row"}>

            <div className={`h-100 black-border ${selectedChapter === 2 || selectedChapter === 3 ? "col-4" : "collapsed-middle-column"} middle-column`}>
                {selectedChapter === 2 && <IssuesMiddleColumn
                    selectedIssue={selectedIssue} setSelectedIssue={setSelectedIssue} issues={issues}
                    selectedSpecificIssue={selectedSpecificIssue} setSelectedSpecificIssue={setSelectedSpecificIssue} />}
            </div>

            <div className={`h-100 black-border flex-grow-1 `}>
                {selectedChapter === 2 && <IssuesTileView
                    selectedSpecificIssue={selectedSpecificIssue} issues={issues}
                    showToggle={showToggle} showMap={showMap} setShowMap={setShowMap}
                />}

            </div>


        </div>
    )
}