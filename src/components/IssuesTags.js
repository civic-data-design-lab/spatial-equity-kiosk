import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import IssuesCard from "./IssuesCard";

export default function IssuesTags({
                                       issues,
                                       leastPerforming,
                                       setSelectedSpecificIssue,
                                       selectedSpecificIssue,
                                       setModal,
                                       moreIssues,
                                       setMoreIssues,
                                       setMoreIssuesLength,
                                       compareSearch, communitySearch,
                                       boundary,
                                       selectedCommunity
                                   }) {

    // TODO: all tags when communitySearch && compareSearch


    /*useEffect(() => {
        if (selectedSpecificIssue && !leastPerforming.includes(selectedSpecificIssue)) {
            setMoreIssues([selectedSpecificIssue])
            setMoreIssuesLength(1)
        }
    }, [])*/


    return (
        <div className={"more-issues-container"}>
            {moreIssues.length > 0 && <div className={"d-flex flex-column row-gap"}>
                {moreIssues.map((issue, index) => {
                    return (
                        <div
                            key={index}
                            className={selectedSpecificIssue && selectedSpecificIssue !== issue ? "opacity-50" : ""}>
                            <IssuesCard selectedSpecificIssue={selectedSpecificIssue} specificIssue={issue}
                                        issues={issues} setSelectedSpecificIssue={setSelectedSpecificIssue}
                                        setModal={setModal} forMoreIssues={true} setMoreIssues={setMoreIssues}
                                        moreIssues={moreIssues}
                                        boundary={boundary}
                                        selectedCommunity={selectedCommunity}
                            />
                        </div>
                    )
                })}
            </div>}




                <div className={"issue-tags-container"}>
                    {
                        issues.all_issues_id
                            .filter(id => !leastPerforming.includes(id) && (moreIssues && !moreIssues.includes(id)))
                            .map((id, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={`${(moreIssues && !moreIssues.includes(id)) ? "inactive-tag" : "active-tag"} issues-tag col-gap`}

                                        onClick={() => {
                                            if ((moreIssues && !moreIssues.includes(id))) {
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
                                        {(moreIssues && !moreIssues.includes(id)) ? <FontAwesomeIcon icon={faPlus}/> :
                                            <FontAwesomeIcon icon={faPlus}/>}
                                    </div>
                                )
                            })


                    }

                </div>


        </div>)
}