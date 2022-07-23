import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretUp} from "@fortawesome/free-solid-svg-icons";


export default function IssueDropDown({issues, setSelectedIssue, setSelectedSpecificIssue, communitySearch, selectedSpecificIssue}) {

    const [showDropdownItems, setShowDropdownItems] = useState(false)
    const [toggleText, setToggleText] = useState("Select an Issue")

    useEffect(()=>{
        if (communitySearch) {
            setToggleText(issues.specific_issues_data[selectedSpecificIssue].specific_issue_name)
        }
    })


    return (
        <div className={"select-issue-dropdown w-100 position-relative"}>
            <div className={"select-issue-toggle d-flex flex-row justify-content-between align-items-center mb-2"}
                 onMouseDown={() => {
                     setShowDropdownItems(!showDropdownItems)
                 }}
                 onBlur={() => {
                     setShowDropdownItems(false)
                 }}
            >
                <h5 className={"mb-0"}>{toggleText}</h5>
                {!showDropdownItems && <FontAwesomeIcon icon={faCaretDown}/>}
                {showDropdownItems && <FontAwesomeIcon icon={faCaretUp}/>}

            </div>

                <div
                    className={`${showDropdownItems ? "d-block" : "d-none"} select-issue-menu position-absolute black-border w-100`}>
                    {issues.all_issues_id.map((id) => {
                        return (
                            <div
                                key={id}
                                className={`${toggleText === issues.specific_issues_data[id].specific_issue_name ? "select-issue-item-active" : ""} select-issue-item p-2`}
                                onClick={(e) => {
                                    setToggleText(issues.specific_issues_data[id].specific_issue_name)
                                    setShowDropdownItems(false)
                                    setSelectedSpecificIssue(id)
                                    setSelectedIssue(issues.specific_issues_data[id].issue_type_ID)
                                }
                                }>{issues.specific_issues_data[id].specific_issue_name}</div>)
                    })}
                </div>


        </div>
    );
}
