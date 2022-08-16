import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import Table from "react-bootstrap/Table";

export default function IssueProfile({issues, selectedSpecificIssue, rankingProse = false, boundary}) {

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
                <h5 className={"issues-tile-heading bold"}>
                    Understand How Districts Rank
                </h5>
                <p className={"m-0"}>{issues.specific_issues_data[selectedSpecificIssue].specific_issue_ranking_narrative}</p>
            </div> : null}

            <div className={"issues-tile-ranking issues-tile-text"}>
                <h5 className={"issues-tile-heading bold"}>
                    Worst {getIssueName()} by District
                </h5>
                <div className={"smaller-font"}>
                    <Table bordered>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>{boundary.charAt(0).toUpperCase() + boundary.slice(1)} District</th>
                            <th>{issues.specific_issues_data[selectedSpecificIssue].specific_issue_name} {issues.specific_issues_data[selectedSpecificIssue].specific_issue_units}</th>
                        </tr>
                        </thead>
                        <tbody>

                        {/*TODO: populate chart with ranking data*/}
                        {issues.all_issues_id.slice(0, 5).map((id, index) => {
                            return <tr key={index}>
                                <td>{issues.specific_issues_data[id].specific_issue_ID}</td>
                                <td>{issues.specific_issues_data[id].specific_issue_name}</td>
                                <td>{issues.specific_issues_data[id].specific_issue_source}</td>
                            </tr>
                        })}


                                {expand && issues.all_issues_id.slice(5).map((id, index) => {

                                    return <tr key={index}>
                                        <td>{issues.specific_issues_data[id].specific_issue_ID}</td>
                                        <td>{issues.specific_issues_data[id].specific_issue_name}</td>
                                        <td>{issues.specific_issues_data[id].specific_issue_source}</td>
                                    </tr>

                                }

                            )}

                        </tbody>
                    </Table>

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
                    About this Indicator
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
                    Take Action
                </h5>
                <div>
                    {getIssueSolutions()}
                </div>

            </div>
        </div>

    )
}