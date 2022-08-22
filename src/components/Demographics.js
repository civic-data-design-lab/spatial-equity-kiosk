import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretUp} from "@fortawesome/free-solid-svg-icons";
import Form from 'react-bootstrap/Form';


import Slider from "./Carousel";
import Toggle from "./Toggle";


export default function Demographics({
                                         selectedSpecificIssue,
                                         currentValue = null, items = null, setValue = null,
                                         showDemographics, setShowDemographics,
                                         compareSearch, communitySearch,
                                         mapDemographics, setMapDemographics,
                                         boundary, communities, councils, selectedChapter
                                     }) {


    // TODO: update demographics drop down
    const demographics = {
        1: "Race & Ethnicity",
        2: "Poverty Level",
        3: "Bike to Work",
        4: "Car-free",
        5: "Take Public Transit to Work",
        6: "Drive Alone to Work",
        7: "Transit, Biked or Walked (Total)",
        8: "Walk to Work"

    }

    const [showDropdownItems, setShowDropdownItems] = useState(false)
    const [toggleText, setToggleText] = useState("Select a demographic to explore")

    useEffect(() => {
        if (currentValue) {
            setToggleText(demographics[currentValue])
        }
    }, [])


    return (
        <>

            {/*<div
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
            </div>*/}

            <div
                className={`${showDemographics ? 'expand-demographic' : 'collapse-demographic'}`}>
                <div className={"dropdown-container mb-3"}>
                    <div className={"dropdown-bar dropdown-bar-black d-flex flex-row justify-content-between align-items-center"}
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
                            Object.keys(demographics).map((key, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={`dropdown-item ${currentValue === key ? "dropdown-item-active" : ""}`}
                                        onMouseDown={() => {
                                            setShowDropdownItems(false)
                                            setToggleText(demographics[key])
                                            setValue(key)
                                        }}
                                    >
                                        <p className={"small-font m-0"}>{demographics[key]}</p>
                                    </div>)

                            })}

                    </div>

                </div>


                {currentValue && selectedChapter===2 &&
                    <div>
                        <div className={"d-flex flex-row justify-content-between"}>
                            <p className={"m-0"}>New York City</p>
                            <div className={"d-flex flex-row align-items-center col-gap"}>
                                <Toggle value={mapDemographics} callback={setMapDemographics}
                                        textOff={"Show on map"}
                                        textOn={"Show on map"}/>
                            </div>
                        </div>
                    </div>
                }

                {currentValue && communitySearch && !compareSearch && selectedChapter===3 &&
                    <div>
                        <div className={"d-flex flex-row justify-content-between"}>
                            <p className={"m-0"}>{(councils[communitySearch] && councils[communitySearch].bolded_text) || (communities[communitySearch] && communities[communitySearch].bolded_text)}</p>
                            <div className={"d-flex flex-row align-items-center col-gap"}>
                                <Toggle value={mapDemographics} callback={setMapDemographics}
                                        textOff={"Show on map"}
                                        textOn={"Show on map"}/>
                            </div>
                        </div>
                    </div>

                }

                {currentValue && communitySearch && compareSearch && selectedChapter===3 &&
                    <div id={"demographic-slider"}>
                        <Slider>
                            <div>
                                <div className={"d-flex flex-row justify-content-between"}>
                                    <p className={"m-0"}>{(councils[communitySearch] && councils[communitySearch].bolded_text) || (communities[communitySearch] && communities[communitySearch].bolded_text)}</p>
                                    <div className={"d-flex flex-row align-items-center col-gap"}>
                                <Toggle value={mapDemographics} callback={setMapDemographics}
                                        textOff={"Show on map"}
                                        textOn={"Show on map"}/>
                            </div>
                                </div>
                            </div>
                            <div>
                                <div className={"d-flex flex-row justify-content-between"}>
                                    <p className={"m-0"}>{(councils[compareSearch] && councils[compareSearch].bolded_text) || (communities[compareSearch] && communities[compareSearch].bolded_text)}</p>
                                    <div className={"d-flex flex-row align-items-center col-gap"}>
                                <Toggle value={mapDemographics} callback={setMapDemographics}
                                        textOff={"Show on map"}
                                        textOn={"Show on map"}/>
                            </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                }


            </div>
        </>
    )

}