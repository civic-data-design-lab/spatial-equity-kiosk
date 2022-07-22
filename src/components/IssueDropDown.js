import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";


export default function IssueDropDown({}) {

    const [showDropdownItems, setShowDropdownItems] = useState(false)
    const [toggleText, setToggleText] = useState("Select an Issue")


    return (
        <div className={"select-issue-dropdown w-100"}>
            <div className={"select-issue-toggle d-flex flex-row justify-content-between align-items-center mb-2"}
                 onMouseDown={() => {
                     setShowDropdownItems(!showDropdownItems)
                 }}
                 onBlur={() => {
                     setShowDropdownItems(false)
                 }}
            >
                <h5 className={"mb-0"}>{toggleText}</h5>
                <FontAwesomeIcon icon={faCaretDown}/>

            </div>
            <div class={`${showDropdownItems ? "d-block" : "d-none"} select-issue-menu black-border`}>
                <div className={`${toggleText === "Issue #1" ? "select-issue-item-active" : ""} select-issue-item p-2`}
                     onClick={(e) => {
                         setToggleText(e.target.textContent)
                         setShowDropdownItems(false)}
                }>Issue #1</div>
                <div className={`${toggleText === "Issue #2" ? "select-issue-item-active" : ""} select-issue-item p-2`}
                     onClick={(e) => {
                         setToggleText(e.target.textContent)
                         setShowDropdownItems(false)}
                }>Issue #2</div>
                <div className={`${toggleText === "Issue #3" ? "select-issue-item-active" : ""} select-issue-item p-2`}
                     onClick={(e) => {
                         setToggleText(e.target.textContent)
                         setShowDropdownItems(false)}
                }>Issue #3</div>
            </div>

        </div>
    );
}
