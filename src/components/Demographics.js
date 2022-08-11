import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretUp} from "@fortawesome/free-solid-svg-icons";
import Form from 'react-bootstrap/Form';


import Slider from "./Carousel";


export default function Demographics({
                                         selectedSpecificIssue,
                                         currentValue = null, items = null, setValue = null,
                                         showDemographics, setShowDemographics,
                                         compareSearch, communitySearch,
                                         mapDemographics, setMapDemographics,
                                         boundary, communities, councils
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
                className={`${selectedSpecificIssue && showDemographics ? 'expand-demographic' : 'collapse-demographic'}`}>
                <div className={"dropdown-container mb-3"}>
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
                                        {demographics[key]}
                                    </div>)

                            })}

                    </div>

                </div>


                {currentValue && !communitySearch && !compareSearch &&
                    <div>
                        <div className={"d-flex flex-row justify-content-between"}>
                            <p className={"m-0"}>New York City</p>
                            <div className={"d-flex flex-row align-items-center col-gap"}>
                                <p className={"small-font m-0"}>Show on Map</p>
                                <Form>
                                    <Form.Check
                                        type={'checkbox'}
                                        id={`checkbox`}
                                        checked={mapDemographics}
                                        onChange={(e)=>{
                                            setMapDemographics(e.target.checked)}}
                                    />
                                </Form>
                            </div>
                        </div>
                    </div>
                }

                {currentValue && communitySearch && !compareSearch &&
                    <div>
                        <div className={"d-flex flex-row justify-content-between"}>
                            <p className={"m-0"}>{boundary === "council" ? councils[communitySearch].bolded_text : communities[communitySearch].bolded_text}</p>
                            <div className={"d-flex flex-row align-items-center col-gap"}>
                                <p className={"small-font m-0"}>Show on Map</p>
                                <Form>
                                    <Form.Check
                                        type={'checkbox'}
                                        id={`checkbox`}
                                        checked={mapDemographics}
                                        onChange={(e)=>{
                                            setMapDemographics(e.target.checked)}}
                                    />
                                </Form>
                            </div>
                        </div>
                    </div>

                }

                {currentValue && communitySearch && compareSearch &&
                    <div id={"demographic-slider"}>
                        <Slider>
                            <div>
                                <div className={"d-flex flex-row justify-content-between"}>
                                    <p className={"m-0"}>{boundary === "council" ? councils[communitySearch].bolded_text : communities[communitySearch].bolded_text}</p>
                                    <div className={"d-flex flex-row align-items-center col-gap"}>
                                        <p className={"small-font m-0"}>Show on Map</p>
                                        <Form>
                                            <Form.Check
                                                type={'checkbox'}
                                                id={`checkbox`}
                                                checked={mapDemographics}
                                                onChange={(e)=>{
                                                    setMapDemographics(e.target.checked)}}
                                            />
                                        </Form>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={"d-flex flex-row justify-content-between"}>
                                    <p className={"m-0"}>{boundary === "council" ? councils[compareSearch].bolded_text : communities[compareSearch].bolded_text}</p>
                                    <div className={"d-flex flex-row align-items-center col-gap"}>
                                        <p className={"small-font m-0"}>Show on Map</p>
                                        <Form>
                                            <Form.Check
                                                type={'checkbox'}
                                                id={`checkbox`}
                                                checked={mapDemographics}
                                                onChange={(e)=>{
                                                    setMapDemographics(e.target.checked)}}
                                            />
                                        </Form>
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