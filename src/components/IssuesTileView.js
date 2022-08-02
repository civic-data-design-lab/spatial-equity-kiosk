import React, {useState} from "react";
import MapToggle from "./MapToggle";
import ShareButton from "./ShareButton";
import IssueProfile from "./IssuesProfile";

export default function IssuesTileView({selectedSpecificIssue, issues, showToggle, showMap, setShowMap}) {

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
                                <ShareButton showMap={showMap}/>
                            </div>
                            <div id={"toggle-container"}>
                                <MapToggle showToggle={showToggle} showMap={showMap} setShowMap={setShowMap}/>
                            </div>
                        </div>
                    </div>


                    <div className={"issues-tile-body row"}>


                        <div className={"col-6 w-50 d-flex flex-column justify-content-between"}>
                            <div>
                                <h5 className={"m-0"}>{getIssueName()}</h5>
                                <small>{issues.specific_issues_data[selectedSpecificIssue].specific_issue_units}</small>
                            </div>
                            <div>
                                VISUALIZATION
                            </div>
                            <small>{issues.specific_issues_data[selectedSpecificIssue].specific_issue_source}</small>
                        </div>


                        <div className={"col-6 w-50"}>
                            <IssueProfile issues={issues} selectedSpecificIssue={selectedSpecificIssue}/>
                        </div>
                    </div>
                </div>
            }

            {!selectedSpecificIssue && <div
                className={"col-12 h-100 issues-tile-container d-flex flex-row justify-content-center align-items-center"}>
                PLACEHOLDER IMAGE
            </div>}
        </>
    )

}