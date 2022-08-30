import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretUp} from "@fortawesome/free-solid-svg-icons";



export default function IssuesDropDown({currentValue = null, items, setValue = null,
                                           setShowDemographics, issues,
                                           issue_categories
                                       }) {

    const [showDropdownItems, setShowDropdownItems] = useState(false)
    const [toggleText, setToggleText] = useState("Select an issue to explore")
    const [included, setIncluded] = useState(false)


    useEffect(() => {
        let changed = false
        items.map((item) => {
            if (item.specific_issue_ID === currentValue) {
                setToggleText(item.specific_issue_name)
                changed = true
                setIncluded(true)
            }
        })
        if (!changed) {
            setToggleText("Select an issue to explore")
            setIncluded(false)
        }
    })

    return (
        <>

            <div className={"dropdown-container"}
            >
                <div className={`${included && currentValue ? `dropdown-bar-${issue_categories.labels[issues.specific_issues_data[currentValue].issue_type_ID]}` : "dropdown-bar-black"} dropdown-bar d-flex flex-row justify-content-between align-items-center mb-0`}
                     onMouseDown={() => {
                         setShowDropdownItems(!showDropdownItems)
                     }}
                >
                    <p className={"mb-0"}>{toggleText}</p>

                    {!showDropdownItems && <FontAwesomeIcon icon={faCaretDown}/>}
                    {showDropdownItems && <FontAwesomeIcon icon={faCaretUp}/>}
                </div>

                <div
                    className={`${showDropdownItems ? "d-block" : "d-none"} dropdown-body position-absolute`}>
                    {
                        items.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`dropdown-item ${currentValue === item.specific_issue_ID ? "dropdown-item-active" : ""}`}
                                    onMouseDown={() => {
                                        setShowDropdownItems(false)
                                        setToggleText(item.specific_issue_name)
                                        if (currentValue === item.specific_issue_ID) {
                                            setValue(false)
                                            setToggleText("Select an issue to explore")
                                            setShowDemographics(false)
                                        } else {
                                            setValue(item.specific_issue_ID)
                                            setShowDemographics(true)
                                        }
                                    }}
                                >
                                    <p className={"small-font mb-0"}>{item.specific_issue_name}</p>
                                </div>)

                        })}

                </div>

            </div>
        </>
    )
}