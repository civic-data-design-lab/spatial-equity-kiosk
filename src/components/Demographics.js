import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp, faMinus, faPlus, } from "@fortawesome/free-solid-svg-icons";

import Form from "react-bootstrap/Form";
import Slider from "./Carousel";
import Legend from "./Legend";

export default function Demographics({
    selectedSpecificIssue,
    //  currentValue = null,
    currentValue = null,
    items = null,
    setValue = null,
    showDemographics,
    setShowDemographics,
    compareSearch,
    communitySearch,
    mapDemographics,
    setMapDemographics,
    boundary,
    communities,
    councils,
    selectedChapter,
    toggleWalk,
    toggleTransit,
    toggleBike,
    setToggleWalk,
    setToggleTransit,
    setToggleBike,
    demoLegendBins,
    demoColorRamp,
    setDemoColorRamp,
    setDemoLegendBins,
    demoLookup, showMap
}) {
    const demographics = {
        1: "Race & Ethnicity",
        2: "Poverty Level",
        3: "No Car Ownership",
        4: "Drive Alone to Work",
        5: "Transit, Biked or Walked (Total)",
    };

    const [showDropdownItems, setShowDropdownItems] = useState(false);
    const [toggleText, setToggleText] = useState(
        "Select a demographic to explore"
    );
    const [demographic, setDemographic] = useState(null);

    useEffect(() => {
        if (currentValue) {
            setToggleText(demographics[currentValue]);
        }
    }, []);

    const getTransitToggles = () => {
        if (currentValue === "5") {
            return (
                <div className={"transit-toggle"}>
                    <div>
                        <Form>
                            <Form.Check
                                inline
                                type={"checkbox"}
                                id={`transit-check`}
                                checked={toggleTransit}
                                label={"Public Transit"}
                                onChange={(e) => {
                                    setToggleTransit(e.target.checked);
                                }}
                            />
                        </Form>
                    </div>
                    <div>
                        <Form>
                            <Form.Check
                                inline
                                type={"checkbox"}
                                id={`bike-check`}
                                label={"Bike"}
                                checked={toggleBike}
                                onChange={(e) => {
                                    setToggleBike(e.target.checked);
                                }}
                            />
                        </Form>
                    </div>
                    <div>
                        <Form>
                            <Form.Check
                                inline
                                type={"checkbox"}
                                id={`walk-check`}
                                label={"Walk"}
                                checked={toggleWalk}
                                onChange={(e) => {
                                    setToggleWalk(e.target.checked);
                                }}
                            />
                        </Form>
                    </div>
                </div>
            );
        }
    };

    return (
        <>
            <div
                className={`demographics-container row-gap ${showDemographics ? "expand-demographic" : "collapse-demographic"
                    }`}
            >
                <div className={"dropdown-container"}>
                    <div
                        className={
                            "dropdown-bar dropdown-bar-black d-flex flex-row justify-content-between align-items-center"
                        }
                        onMouseDown={() => {
                            setShowDropdownItems(!showDropdownItems);
                        }}
                    >
                        <p className={"mb-0 small-font"}>{toggleText}</p>

                        {!showDropdownItems && <FontAwesomeIcon icon={faCaretDown} />}
                        {showDropdownItems && <FontAwesomeIcon icon={faCaretUp} />}
                    </div>


                    <div
                        className={`${showDropdownItems ? "d-block" : "d-none"
                            } dropdown-body position-absolute`}
                    >
                        {Object.keys(demographics).map((key, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`dropdown-item ${currentValue === key ? "dropdown-item-active" : ""
                                        }`}
                                    onMouseDown={() => {
                                        setShowDropdownItems(false);
                                        setToggleText(demographics[key]);
                                        setValue(key);
                                    }}
                                >
                                    <p className={"small-font m-0"}>{demographics[key]}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>


                {currentValue && selectedChapter === 2 && (

                    <>
                        <Legend
                            mapDemographics={mapDemographics}
                            demoColorRamp={demoColorRamp}
                            demoLegendBins={demoLegendBins}
                            demoLookup={demoLookup}
                            demographic={demographic}
                            legendBins={demoLegendBins}
                            colorRamps={demoColorRamp}
                            boundary
                            dataScale
                            setdataScale
                            forDemographic={true}
                            transitToggles={getTransitToggles()}
                        />

                        {showMap && <div
                            className={`big-button ${mapDemographics ? "big-button-active" : "big-button-inactive"
                                }`}
                            onClick={() => {
                                setMapDemographics(!mapDemographics);
                            }}
                        >
                            <div><p
                                className={"mb-0 small-font"}>{mapDemographics ? "Remove from map" : "Show on map"}</p>
                            </div>
                            <div>
                                {mapDemographics ? (
                                    <FontAwesomeIcon icon={faMinus} />
                                ) : (
                                    <FontAwesomeIcon icon={faPlus} />
                                )}
                            </div>
                        </div>}
                    </>
                )}

                {currentValue &&
                    communitySearch &&
                    !compareSearch &&
                    selectedChapter === 3 && (
                        <>

                            <Legend
                                mapDemographics={mapDemographics}
                                demoColorRamp={demoColorRamp}
                                demoLegendBins={demoLegendBins}
                                demoLookup={demoLookup}
                                demographic={demographic}
                                legendBins={demoLegendBins}
                                colorRamps={demoColorRamp}
                                boundary
                                dataScale
                                setdataScale
                                forDemographic={true}
                                transitToggles={getTransitToggles()}
                            />

                            <div
                                className={`big-button ${mapDemographics ? "big-button-active" : "big-button-inactive"
                                    }`}
                                onClick={() => {
                                    setMapDemographics(!mapDemographics);
                                }}
                            >
                                <div><p
                                    className={"mb-0 small-font"}>{mapDemographics ? "Remove from map" : "Show on map"}</p>
                                </div>
                                <div>
                                    {mapDemographics ? (
                                        <FontAwesomeIcon icon={faMinus} />
                                    ) : (
                                        <FontAwesomeIcon icon={faPlus} />
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                {currentValue &&
                    communitySearch &&
                    compareSearch &&
                    selectedChapter === 3 && (
                        <div id={"demographic-slider"} style={{ flex: 1 }}>
                            <Slider>
                                <div>
                                    {currentValue === "1" && <p className={"m-0 small-font"}>
                                        {(councils[communitySearch] &&
                                            councils[communitySearch].name) ||
                                            (communities[communitySearch] &&
                                                communities[communitySearch].name)}
                                    </p>}


                                    <Legend
                                        mapDemographics={mapDemographics}
                                        demoColorRamp={demoColorRamp}
                                        demoLegendBins={demoLegendBins}
                                        demoLookup={demoLookup}
                                        demographic={demographic}
                                        legendBins={demoLegendBins}
                                        colorRamps={demoColorRamp}
                                        boundary
                                        dataScale
                                        setdataScale
                                        forDemographic={true}
                                        transitToggles={getTransitToggles()}
                                    />
                                </div>
                                <div>
                                    <div className={"d-flex flex-row justify-content-between"}>
                                        {currentValue === "1" &&
                                            <p className={"m-0 small-font"}>
                                                {(councils[compareSearch] &&
                                                    councils[compareSearch].name) ||
                                                    (communities[compareSearch] &&
                                                        communities[compareSearch].name)}
                                            </p>
                                        }
                                    </div>

                                    <Legend
                                        mapDemographics={mapDemographics}
                                        demoColorRamp={demoColorRamp}
                                        demoLegendBins={demoLegendBins}
                                        demoLookup={demoLookup}
                                        demographic={demographic}
                                        legendBins={demoLegendBins}
                                        colorRamps={demoColorRamp}
                                        boundary
                                        dataScale
                                        setdataScale
                                        forDemographic={true}
                                        transitToggles={getTransitToggles()}
                                    />
                                </div>
                            </Slider>
                            {/*<div className={"slider-demo-toggle"}>
                            <div className={"d-flex flex-row align-items-center col-gap"}>
                                <Toggle value={mapDemographics} callback={setMapDemographics}
                                        textOff={"Show on map"}
                                        textOn={"Show on map"}/>
                            </div>
                        </div>*/}


                            <div
                                className={`big-button ${mapDemographics ? "big-button-active" : "big-button-inactive"
                                    }`}
                                onClick={() => {
                                    setMapDemographics(!mapDemographics);
                                }}
                            >
                                <div><p
                                    className={"mb-0 small-font"}>{mapDemographics ? "Remove from map" : "Show on map"}</p>
                                </div>
                                <div>
                                    {mapDemographics ? (
                                        <FontAwesomeIcon icon={faMinus} />
                                    ) : (
                                        <FontAwesomeIcon icon={faPlus} />
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
            </div>
        </>
    );
}
