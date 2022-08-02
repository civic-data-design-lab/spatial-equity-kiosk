import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretUp} from "@fortawesome/free-solid-svg-icons";


export default function DemographicsDropDown({currentValue = null, items=null, setValue = null}) {

    const demographics = {
        1: "Race & Ethnicity",
        2: "Poverty Level",
        3: "Commute to Work"
    }

    const [showDropdownItems, setShowDropdownItems] = useState(false)
    const [toggleText, setToggleText] = useState("Select a demographic to explore")



    return (
        <>

            <div className={"dropdown-container"}
            >
                <div className={"dropdown-bar d-flex flex-row justify-content-between align-items-center"}
                     onMouseDown={() => {
                         setShowDropdownItems(!showDropdownItems)
                     }}
                >
                    <h5 className={"mb-0"}>{toggleText}</h5>

                    {!showDropdownItems && <FontAwesomeIcon icon={faCaretDown}/>}
                    {showDropdownItems && <FontAwesomeIcon icon={faCaretUp}/>}
                </div>

                <div
                    className={`${showDropdownItems ? "d-block" : "d-none"} dropdown-body position-absolute black-border w-100`}>
                    {
                        Object.keys(demographics).map((key) => {
                            return (
                                <div
                                    className={`dropdown-item ${currentValue === key ? "dropdown-item-active" : ""}`}
                                    onMouseDown={() => {
                                        setShowDropdownItems(false)
                                        setToggleText(demographics[key])
                                        setValue(key)
                                    }}
                                >
                                    {demographics[key]}
                                </div>)

                        })}

                </div>

            </div>
        </>
    )

}