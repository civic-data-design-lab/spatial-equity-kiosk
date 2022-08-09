import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretUp} from "@fortawesome/free-solid-svg-icons";


export default function IssuesDropDown({currentValue = null, items, setValue = null, setShowDemographics}) {

    const [showDropdownItems, setShowDropdownItems] = useState(false)
    const [toggleText, setToggleText] = useState("Select an issue to explore")



    useEffect(() => {
        let changed = false
        console.log("items ", items)
        items.map((item) => {
            if (item.specific_issue_ID === currentValue) {
                setToggleText(item.specific_issue_name)
                changed = true
            }
        })
        if (!changed) {
            setToggleText("Select an issue to explore")
        }
    })

    return (
        <>

            <div className={"dropdown-container"}
            >
                <div className={"dropdown-bar d-flex flex-row justify-content-between align-items-center mb-0"}
                     onMouseDown={() => {
                         setShowDropdownItems(!showDropdownItems)
                     }}
                >
                    <p className={"mb-0"}>{toggleText}</p>

                    {!showDropdownItems && <FontAwesomeIcon icon={faCaretDown}/>}
                    {showDropdownItems && <FontAwesomeIcon icon={faCaretUp}/>}
                </div>

                <div
                    className={`${showDropdownItems ? "d-block" : "d-none"} dropdown-body position-absolute w-100`}>
                    {
                        items.map((item) => {
                            return (
                                <div
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
                                        }
                                    }}
                                >
                                    {item.specific_issue_name}
                                </div>)

                        })}

                </div>

            </div>
        </>
    )
}