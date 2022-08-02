import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo, faArrowsUpDownLeftRight} from "@fortawesome/free-solid-svg-icons";

export default function IssuesCard({issues, selectedSpecificIssue, setSelectedSpecificIssue, specificIssue}) {

    const [showInfo, setShowInfo] = useState(false)

    const getIssueName = () => {
        return issues.specific_issues_data[specificIssue].specific_issue_name|| null
    }

    return(
        <div className={"issues-card-container"}
            onClick={()=>{
                if (selectedSpecificIssue === specificIssue) {
                    setSelectedSpecificIssue(null)
                } else {
                    setSelectedSpecificIssue(specificIssue)
                }
            }}
        >
            <div className={"issues-card-header"}>
                <div className={"issues-card-title-container col-gap"}>
                    <p className={"m-0"}>{getIssueName()}</p>
                    <p className={"m-0 small-text"}>{issues.specific_issues_data[specificIssue].specific_issue_units}</p>
                </div>
                <div className={"issues-card-button-container col-gap"}>
                    <div
                        onMouseEnter={()=>{setShowInfo(true)}}
                        onMouseLeave={()=>{setShowInfo(false)}}
                    >
                        <FontAwesomeIcon icon={faCircleInfo}/>
                        <div className={`${showInfo ? "" : "d-none"} position-absolute info-tooltip`}>
                            <p className={"m-0"}>{issues.specific_issues_data[specificIssue].specific_issue_source}</p>
                        </div>
                    </div>
                    <FontAwesomeIcon icon={faArrowsUpDownLeftRight}/>
                </div>
            </div>
            <div className={"issues-card-body"}>
                <div>
                    VISUALIZATION
                </div>
                <div>
                    <p className={"m-0 small-text"}>{issues.specific_issues_data[specificIssue].specific_issue_sentence}</p>
                </div>
            </div>

        </div>
    )
}