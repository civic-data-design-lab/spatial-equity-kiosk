import React, {useState, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretUp, faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";

import Slider from "./Carousel";


export default function Demographics({
                                         selectedSpecificIssue,
                                         currentValue = null, items = null, setValue = null,
                                         showDemographics, setShowDemographics,
                                         compareSearch, communitySearch
                                     }) {

    const demographics = {
        1: "Race & Ethnicity",
        2: "Poverty Level",
        3: "Commute to Work"
    }

    const [showDropdownItems, setShowDropdownItems] = useState(false)
    const [toggleText, setToggleText] = useState("Select a demographic to explore")




    return (
        <>

            <div
                className={`${selectedSpecificIssue ? "" : "d-none"} add-demographic-btn d-flex flex-row align-items-center`}
                onClick={(e) => {
                    e.stopPropagation()
                    setShowDemographics(!showDemographics)
                }}
            >

                <div className={"d-flex flex-row justify-content-between w-100 align-items-center"}>
                    {!showDemographics ? <p className={"m-0"}>See Demographics</p> :
                        <p className={"m-0"}>Hide Demographics</p>}
                    {!showDemographics ? <FontAwesomeIcon icon={faPlus} width={32}/> :
                        <FontAwesomeIcon icon={faMinus} width={32}/>}
                </div>
            </div>

            <div className={`${selectedSpecificIssue && showDemographics ? 'expand-demographic' : 'collapse-demographic' }`}>
                    <div className={"dropdown-container"}>
                        <div className={"dropdown-bar d-flex flex-row justify-content-between align-items-center"}
                             onMouseDown={() => {
                                 setShowDropdownItems(!showDropdownItems)
                             }}
                        >
                            <p className={"mb-0"}>{toggleText}</p>

                            {!showDropdownItems && <FontAwesomeIcon icon={faCaretDown}/>}
                            {showDropdownItems && <FontAwesomeIcon icon={faCaretUp}/>}
                        </div>

                        <div
                            className={`${showDropdownItems ? "d-block" : "d-none"} dropdown-body position-absolute   w-100`}>
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


                    {currentValue && !communitySearch && !compareSearch &&
                    <div>
                        NYC DEMOGRAPHICS VISUALIZATION
                    </div>
                }

                {currentValue && communitySearch && !compareSearch &&
                    <div>
                        NYC COMMUNITY VISUALIZATION
                    </div>
                }

                {currentValue && communitySearch && compareSearch &&
                    <Slider>
                        <div>NYC COMMUNITY #1 VISUALIZATION</div>
                        <div>NYC COMMUNITY #2 VISUALIZATION</div>
                    </Slider>
                }



            </div>
        </>
    )

}