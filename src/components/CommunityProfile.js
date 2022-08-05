import React, {useEffect, useState} from "react";
import IssuesCard from "./IssuesCard";
import IssuesTags from "./IssuesTags"

export default function CommunityProfile({
                                             selectedSpecificIssue,
                                             issues,
                                             communities,
                                             communitySearch,
                                             setSelectedSpecificIssue,
                                             compareSearch
                                         }) {

    useEffect(() => {
        console.log("communities", communities)
    }, [])


    const [modal, setModal] = useState(null)

    return (
        <div className={"community-profile-container"}>
            <div className={"issues-tile-header"}></div>
            {!compareSearch ? <>
                    <div className={"standard-padding"}>
                        {<h5 className={"mb-3"}>Topic of Interests - {communities[communitySearch].bolded_text}</h5>}
                        <p className={"mt-3"}>A few sentences on how these topics of interest were selected. A few sentences
                            on
                            how these topics of interest were selected. </p>


                        <div className={"d-flex flex-column row-gap"}>
                            {communities[communitySearch].least_performing_issues.map((issue) => {
                                return <div
                                    className={selectedSpecificIssue && selectedSpecificIssue !== issue ? "opacity-50" : ""}>
                                    <IssuesCard selectedSpecificIssue={selectedSpecificIssue}
                                                setSelectedSpecificIssue={setSelectedSpecificIssue}
                                                issues={issues} specificIssue={issue} setModal={setModal}/>
                                </div>
                            })}
                        </div>
                    </div>

                    <div className={"standard-padding"}>
                        <h5 className={"mb-3"}>More Issues</h5>

                        <IssuesTags issues={issues} leastPerforming={communities[communitySearch].least_performing_issues}
                                    communities={communities} setSelectedSpecificIssue={setSelectedSpecificIssue}
                                    selectedSpecificIssue={selectedSpecificIssue}
                                    setModal={setModal}
                        />

                    </div>
                </> :

                <>
                    <div className={"standard-padding"}>
                        {<h5 className={"mb-3"}>Topic of Interests
                            - {communities[communitySearch].bolded_text} & {communities[compareSearch].bolded_text}</h5>}
                        <p className={"mt-3"}>A few sentences on how these topics of interest were selected. A few
                            sentences on
                            how these topics of interest were selected. </p>

                        <IssuesTags issues={issues}
                                    leastPerforming={communities[communitySearch].least_performing_issues}
                                    communities={communities} setSelectedSpecificIssue={setSelectedSpecificIssue}
                                    selectedSpecificIssue={selectedSpecificIssue}
                                    setModal={setModal}
                        />
                    </div>






                </>


            }

            {modal &&
                <div className="modal-background">
                    <div className={"modal-card"}>
                        <IssuesCard selectedSpecificIssue={selectedSpecificIssue}
                                    setSelectedSpecificIssue={setSelectedSpecificIssue}
                                    issues={issues} specificIssue={modal} setModal={setModal}
                                    modalVersion={true}
                        />
                    </div>
                </div>}
        </div>
    )
}