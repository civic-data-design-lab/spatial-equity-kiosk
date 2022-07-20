import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import React from "@types/react";


export default function IssueSelection({selectedSpecificIssue}) {


    return (
        <div className={"row issues-arrow-row"}
                                             onClick={()=>{
                                                 if (selectedSpecificIssue !== 1) {
                                                     setSelectedSpecificIssue(1)
                                                 } else {
                                                     setSelectedSpecificIssue(null)
                                                 }
                                             }}>
                                            <div className={`${selectedSpecificIssue === 1 ? 'issues-arrow-active' : ''} col-2 issues-arrow health`}><FontAwesomeIcon
                                                icon={faArrowRight}/>
                                            </div>
                                            <div className={"col-10 no-padding"}><p className={"mb-2"}>Issue #1</p>
                                            </div>
                                        </div>
    )


}
