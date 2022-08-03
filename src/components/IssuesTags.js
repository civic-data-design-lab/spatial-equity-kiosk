import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faMinus} from "@fortawesome/free-solid-svg-icons";
import IssuesCard from "./IssuesCard";

export default function IssuesTags({
                                       issues,
                                       leastPerforming,
                                       setSelectedSpecificIssue,
                                       selectedSpecificIssue,
                                       setModal
                                   }) {


    const [moreIssues, setMoreIssues] = useState([])
    const [moreIssuesLength, setMoreIssuesLength] = useState(0)

    useEffect(() => {
        // console.log("more issues ", moreIssues)
    }, [])


    return (
        <div className={"more-issues-container"}>
            {moreIssues.length > 0 && <div className={"d-flex flex-column row-gap"}>
                {moreIssues.map((issue) => {
                    return (
                        <div className={selectedSpecificIssue && selectedSpecificIssue !== issue ? "opacity-50" : ""}>
                            <IssuesCard selectedSpecificIssue={selectedSpecificIssue} specificIssue={issue}
                                        issues={issues} setSelectedSpecificIssue={setSelectedSpecificIssue}
                                        setModal={setModal}/>
                        </div>
                    )
                })}
            </div>}

            <div className={"issue-tags-container"}>
                {
                    issues.all_issues_id
                        .filter(id => !leastPerforming.includes(id))
                        .map((id) => {
                            return (
                                <div
                                    className={`${moreIssues.includes(id) ? "active-tag" : "inactive-tag"} issues-tag col-gap`}

                                    onClick={() => {
                                        if (!moreIssues.includes(id)) {
                                            let newMoreIssues = moreIssues
                                            newMoreIssues.push(id)
                                            setMoreIssues(newMoreIssues)
                                            setMoreIssuesLength(moreIssues + 1)

                                        } else {
                                            let newMoreIssues = moreIssues
                                            newMoreIssues = newMoreIssues.filter(issue => issue !== id)
                                            setMoreIssues(newMoreIssues)
                                            setMoreIssuesLength(moreIssues - 1)
                                        }
                                    }}
                                >
                                    <p className={"m-0"}>{issues.specific_issues_data[id].specific_issue_name}</p>
                                    {moreIssues.includes(id) ? <FontAwesomeIcon icon={faMinus}/> :
                                        <FontAwesomeIcon icon={faPlus}/>}
                                </div>
                            )
                        })


                }

            </div>


        </div>)
}