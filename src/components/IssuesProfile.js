import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";

export default function IssueProfile({issues, selectedSpecificIssue, rankingProse=false}) {

    const [expand, setExpand] = useState(false)

    const getIssueName = () => {
        return issues.specific_issues_data[selectedSpecificIssue].specific_issue_name || null
    }

    const getIssueSolutions = () => {
        return issues.specific_issues_data[selectedSpecificIssue].specific_issue_solutions || null
    }

    return (

        <div className={"issues-tile-text-container"}>

            {rankingProse ? <div className={"issues-tile-prose issues-tile-text"}>
                <p className={"m-0"}>{issues.specific_issues_data[selectedSpecificIssue].specific_issue_ranking_narrative}</p>
            </div> : null}

            <div className={"issues-tile-ranking issues-tile-text"}>
                <h5 className={"issues-tile-heading bold"}>
                    Least Performing Districts
                </h5>
                <div>
                    <div className={"issues-tile-first-rankings"}>
                        <p className={"mb-0"}>57/59 - Community District 3</p>
                        <p className={"mb-0"}>57/59 - Community District 3</p>
                        <p className={"mb-0"}>57/59 - Community District 3</p>
                        <p className={"mb-0"}>57/59 - Community District 3</p>
                        <p className={"mb-0"}>57/59 - Community District 3</p>
                    </div>

                    <div className={`${expand ? "issues-tile-ranking-vis" : "issues-tile-ranking-invis"}`}>
                        <p className={"mb-0"}>57/59 - Community District 4</p>
                        <p className={"mb-0"}>57/59 - Community District 4</p>
                        <p className={"mb-0"}>57/59 - Community District 4</p>
                        <p className={"mb-0"}>57/59 - Community District 4</p>
                        <p className={"mb-0"}>57/59 - Community District 4</p>
                    </div>

                    <div className={"d-flex flex-row justify-content-center ranking-button"}
                         onClick={() => {
                             setExpand(!expand)
                         }}>
                        {expand ? <FontAwesomeIcon icon={faChevronUp}/> : <FontAwesomeIcon icon={faChevronDown}/>}
                    </div>

                </div>
            </div>

            <div className={"issues-tile-description issues-tile-text"}>
                <h5 className={"issues-tile-heading bold"}>
                    {getIssueName()}
                </h5>
                <div>
                    Neighborhoods with fewer street trees are hotter, more polluted, more flood-prone, and have higher
                    rates of heat-related mortality. Street trees can remove pollution from the air, lower the air
                    temperature, mitigate heat-related mortality, increase ground permeability, mitigate flooding, and
                    help keep stormwater runoff and street pollution out of waterways.
                </div>
            </div>
            <div className={"issues-tile-solutions issues-tile-text"}>
                <h5 className={"issues-tile-heading bold"}>
                    Solutions
                </h5>
                <div>
                    {getIssueSolutions()}
                </div>

            </div>
        </div>

    )
}