import React, {useState, useEffect} from "react";
import IssuesCard from "./IssuesCard";
import IssuesTags from "./IssuesTags"

export default function CommunityProfile({selectedSpecificIssue, issues, communities, communitySearch, setSelectedSpecificIssue}) {

    useEffect(()=>{
        console.log("communities", communities )
    }, [])

    return (
        <div className={"community-profile-container"}>
            <div>
                <h5 className={"mb-3"}>Least Performing Issues</h5>

                <div className={"d-flex flex-column row-gap"}>
                    {communities[communitySearch].least_performing_issues.map((issue)=>{
                    return <div className={selectedSpecificIssue && selectedSpecificIssue!==issue ? "opacity-50":""}>
                        <IssuesCard selectedSpecificIssue={selectedSpecificIssue} setSelectedSpecificIssue={setSelectedSpecificIssue}
                            issues={issues} specificIssue={issue}/>
                    </div>
                })}
                </div>
            </div>

            <div>
                <h5 className={"mb-3"}>More Issues</h5>

                <IssuesTags issues={issues} leastPerforming={communities[communitySearch].least_performing_issues}
                            communities={communities} setSelectedSpecificIssue={setSelectedSpecificIssue} selectedSpecificIssue={selectedSpecificIssue}
                />

            </div>
        </div>
    )
}