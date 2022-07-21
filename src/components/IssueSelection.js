import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";


export default function IssueSelection({issueName, issueID, selectedSpecificIssue, setSelectedSpecificIssue, issueType, resetMap}) {


    return (
        <div className={"row issues-arrow-row"}
             onClick={() => {
                 if (selectedSpecificIssue !== issueID) {
                     setSelectedSpecificIssue(issueID)
                     resetMap(false)

                 } else {
                     setSelectedSpecificIssue(null)
                     resetMap(true)
                 }
             }}>
            <div className={`${selectedSpecificIssue === issueID ? 'issues-arrow-active' : ''} col-2 issues-arrow ${issueType}`}>
                <FontAwesomeIcon
                    icon={faArrowRight}/>
            </div>
            <div className={"col-10 no-padding"}><p className={"mb-2"}>{issueName}</p>
            </div>
        </div>

    )


}
