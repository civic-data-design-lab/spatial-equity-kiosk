import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import Table from "react-bootstrap/Table";
import categories from "../texts/issue_categories.json"

import rankings from "../data/rankings.json";

export default function IssueProfile({
                                         issues,
                                         selectedSpecificIssue,
                                         rankingProse = false,
                                         boundary,
                                         setSelectedSpecificIssue
                                     }) {

    const [expand, setExpand] = useState(false)

    const getIssueName = () => {
        return issues.specific_issues_data[selectedSpecificIssue].specific_issue_name || null
    }

    const getHyperlinkText = (texts) => {
        return <p>
            {texts.map((texts)=>{
                return <>{texts.text}{texts.hyperlink && <span className={`${categories.labels[issues.specific_issues_data[selectedSpecificIssue].issue_type_ID]}`}><a className={`hyperlink ${categories.labels[issues.specific_issues_data[selectedSpecificIssue].issue_type_ID]}`} href={texts.source} target="_blank">{texts.hyperlink}</a></span>}</>
        })}
        </p>
    }

    const getListSolution = () => {
        return issues.specific_issues_data[selectedSpecificIssue].specific_issue_solutions.solutions_list.map((solution)=>{
            return <li>{getHyperlinkText(solution)}</li>
        })

    }


    const getRelatedIssues = () => {
        return issues.specific_issues_data[selectedSpecificIssue].related.map((issue, index) => {
            return <span> <a onClick={() => {
                setSelectedSpecificIssue(issue)
            }}>{issues.specific_issues_data[issue].specific_issue_name}</a>{index === 2 ? "." : ","}</span>
        })
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
                        {rankings[boundary][issues.specific_issues_data[selectedSpecificIssue].json_id].slice(0, 5).map((entry, index) => {
                            return <tr key={index}>
                                <td>{entry.rank}</td>
                                <td>{entry.community}</td>
                                <td>{entry.data}</td>
                            </tr>
                        })}


                        {expand && rankings[boundary][issues.specific_issues_data[selectedSpecificIssue].json_id].slice(5).map((entry, index) => {
                            return <tr key={index}>
                                <td>{entry.rank}</td>
                                <td>{entry.community}</td>
                                <td>{entry.data}</td>
                            </tr>
                        })}

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
                    {getHyperlinkText(issues.specific_issues_data[selectedSpecificIssue].specific_issue_description)}
                </div>
                <div className={"fst-italic"}>Related: {getRelatedIssues()}</div>
            </div>
            <div className={"issues-tile-solutions issues-tile-text"}>
                <h5 className={"issues-tile-heading bold"}>
                    Take Action
                </h5>
                <div>
                    {getHyperlinkText(issues.specific_issues_data[selectedSpecificIssue].specific_issue_solutions.base_text)}

                    <ol>
                        {getListSolution()}
                    </ol>
                </div>


            </div>
        </div>

    )
}