import { faCaretDown, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import MapToggle from "../MapToggle";
import Demographics from "../Demographics";
import Histogram from "../Histogram";
import IssueProfile from "../IssuesProfile";
import Map from "../Map"


export default function CitywideData({
    selectedIssue,
    setSelectedIssue,
    selectedSpecificIssue,
    setSelectedSpecificIssue,
    setShowDemographics,
    issues,
    issue_categories,
    boundary,
    setBoundary,
    showToggle,
    showMap,
    setShowMap,
    colorRamps,
    setColorRamps,
    setShowToggle,
    showDemographics,

    demographic,
    setDemographic,
    mapDemographics,
    setMapDemographics,
    communities,
    councils,
    selectedChapter,
    toggleTransit,
    setToggleTransit,
    toggleBike,
    setToggleBike,
    toggleWalk,
    setToggleWalk,
    demoColorRamp,
    demoLegendBins,
    setDemoColorRamp,
    setDemoLegendBins,
    demoLookup,
    toggleUnderperformers,
    setSelectedChapter,
    communitySearch,
    setCommunitySearch,
    addCompare,
    setAddCompare,
    compareSearch,
    setCompareSearch,
    viewState,
    setViewState,
    mapSelection,
    setMapSelection,
    zoomToggle,
    setzoomToggle,
    handleLegend,
    sethandleLegend,
    coordinateLookup,
    setCoordinateLookup,
    dataScale,
    setdataScale,
    highlightFeature,
    sethighlightFeature,
    selectedCoord,
    selectedCompareCoord,
    setSelectedCoord,
    setSelectedCompareCoord,
    badSearch,
    setBadSearch,
    mainMap,
    communityPinned,
    setCommunityPinned,
    councilPinned,
    setCouncilPinned,
    info,
}) {


    const health_issues = issues.issues_data["health"].specific_issues_ID.map(
        (id_) => {
            return issues.specific_issues_data[id_];
        }
    );

    const environment_issues = issues.issues_data[
        "environment"
    ].specific_issues_ID.map((id_) => {
        return issues.specific_issues_data[id_];
    });

    const infrastructure_issues = issues.issues_data[
        "infrastructure"
    ].specific_issues_ID.map((id_) => {
        return issues.specific_issues_data[id_];
    });

    const [showCategories, setShowCategories] = useState(false)
    const [showIssues, setShowIssues] = useState(false)

    const getIssueItems = () => {
        let specific_issues = selectedIssue === 1 ? health_issues : selectedIssue === 2 ? environment_issues : infrastructure_issues
        console.log(specific_issues)
        return specific_issues.map((issue, index) => {
            return <div key={index}
                style={{ zIndex: 3 }}
                className={`mobile-dropdown-item ${selectedSpecificIssue === issue.specific_issue_ID ? "active-scheme" : "inactive-scheme"}`}
                onClick={() => {
                    setShowIssues(false)
                    if (selectedSpecificIssue !== issue.specific_issue_ID) {
                        setSelectedSpecificIssue(issue.specific_issue_ID)
                    } else {
                        setSelectedSpecificIssue(null)
                    }
                }}>
                <p className={"m-0 small-font"}>{issue.specific_issue_name}</p>
            </div>
        })
    }

    return (
        <div className={"mobile-citywide"}>
            {/*<div className={`mobile-citywide-chapter
            ${!selectedIssue ? "grow big-padding regular-border" : "shrink no-padding border-none"}
            ${selectedIssue === 1 ? "active-scheme" : "inactive-scheme"}
            `}
                 onClick={() => {
                     if (selectedIssue !== 1) {
                         setSelectedIssue(1)
                     }
                 }}
            >
                <div className={`d-flex flex-row align-items-center justify-content-between`}>
                    <p className={`mb-0 mobile-transition-font ${!selectedIssue ? "big-text" : "no-text"}`}>
                        Health
                    </p>
                </div>
                <p className={`mb-0 mobile-transition-font
                ${!selectedIssue ? "small-text" : "no-text"}`}>
                    {ISSUES_CATEGORIES.descriptions["1"]}
                </p>
            </div>

            <div className={`mobile-citywide-chapter
            ${!selectedIssue ? "grow big-padding regular-border" : "shrink no-padding border-none"}
            ${selectedIssue === 2 ? "active-scheme" : "inactive-scheme"}
            `}
                 onClick={() => {
                     if (selectedIssue !== 2) {
                         setSelectedIssue(2)
                     }
                 }}
            >
                <div className={`d-flex flex-row align-items-center justify-content-between`}>
                    <p className={`mb-0 mobile-transition-font ${!selectedIssue ? "big-text" : "no-text"}`}>
                        Environment
                    </p>
                </div>
                <p className={`mb-0 mobile-transition-font
                ${!selectedIssue ? "small-text" : "no-text"}`}>
                    {ISSUES_CATEGORIES.descriptions["2"]}
                </p>
            </div>

            <div className={`mobile-citywide-chapter
            ${!selectedIssue ? "grow big-padding regular-border" : "shrink no-padding border-none"}
            ${selectedIssue === 3 ? "active-scheme" : "inactive-scheme"}
            `} onClick={() => {
                if (selectedIssue !== 3) {
                    setSelectedIssue(3)
                }
            }}
            >
                <div className={`d-flex flex-row align-items-center justify-content-between`}>
                    <p className={`mb-0 mobile-transition-font ${!selectedIssue ? "big-text" : "no-text"}`}>
                        Infrastructure
                    </p>
                </div>
                <p className={`mb-0 mobile-transition-font
                ${!selectedIssue ? "small-text" : "no-text"}`}>
                    {ISSUES_CATEGORIES.descriptions["3"]}
                </p>
            </div>
*/}
            {/*// TODO: citywide nav*/}
            {
                <div className={"citywide-nav position-relative"}>

                    <div className={"h-100 grow position-relative"}
                        style={{
                            maxWidth: !selectedIssue ? "100vw" : !selectedSpecificIssue ? "calc(100vw / 2)" : "calc((100vw - 10vh)/2",
                            transition: "max-width 0.5s"
                        }}
                    >
                        <div className={"category-dropdown"}>
                            <div className={"citywide-categories-dropdown grow"}>
                                <p className={"mb-0 small-font hide-text"}>{!selectedIssue ? "Select a category" : issue_categories.labels[selectedIssue]}</p>
                            </div>
                            <FontAwesomeIcon icon={faCaretDown} onClick={() => {
                                setShowCategories(!showCategories)
                            }} />
                        </div>
                        {showCategories && <div className={"position-absolute w-100"}
                            style={{ maxHeight: "30vh", overflow: "auto", border: "1px solid black" }}
                        >
                            {<div
                                className={`mobile-dropdown-item ${selectedIssue === 1 ? "active-scheme" : "inactive-scheme"}`}
                                onClick={() => {
                                    setShowCategories(false)
                                    if (selectedIssue !== 1) {
                                        setSelectedIssue(1)
                                        setSelectedSpecificIssue(null)
                                    } else {
                                        setSelectedIssue(null)
                                        setShowIssues(false)
                                    }
                                }}
                            ><p className={"mb-0 small-font"}>Health</p></div>}
                            {<div
                                className={`mobile-dropdown-item ${selectedIssue === 2 ? "active-scheme" : "inactive-scheme"}`}
                                onClick={() => {
                                    setShowCategories(false)
                                    if (selectedIssue !== 2) {
                                        setSelectedIssue(2)
                                        setSelectedSpecificIssue(null)
                                    } else {
                                        setSelectedIssue(null)
                                        setShowIssues(false)
                                    }
                                }}
                            ><p className={"mb-0 small-font"}>Environment</p></div>}
                            {<div
                                className={`mobile-dropdown-item ${selectedIssue === 3 ? "active-scheme" : "inactive-scheme"}`}
                                onClick={() => {
                                    setShowCategories(false)
                                    if (selectedIssue !== 3) {
                                        setSelectedIssue(3)
                                        setSelectedSpecificIssue(null)
                                    } else {
                                        setSelectedIssue(null)
                                        setShowIssues(false)
                                    }
                                }}
                            ><p className={"mb-0 small-font"}>Infrastructure</p></div>}
                        </div>}
                    </div>
                    <div className={`h-100 position-relative ${selectedIssue ? "grow" : "shrink"}`}
                        style={{
                            maxWidth: !selectedIssue ? "0" : selectedSpecificIssue ? "calc((100vw - 10vh)/2)" : "calc(100vw / 2)",
                            transition: "max-width 0.5s, flex-grow 0.25s",
                            border: !selectedIssue ? "border: 1px solid black" : "none"
                        }
                        }
                    >
                        <div className={"issue-dropdown"}>
                            <div className={"citywide-issue-dropdown grow"}>
                                <p className={"mb-0 hide-text small-font"}>{!selectedSpecificIssue ? "Select an issue" : issues.specific_issues_data[selectedSpecificIssue].specific_issue_name}</p>
                            </div>
                            <FontAwesomeIcon icon={faCaretDown} onClick={() => {
                                setShowIssues(!showIssues)
                            }} />
                        </div>
                        {showIssues && <div className={"position-absolute w-100"}
                            style={{ maxHeight: "30vh", overflow: "auto", border: "1px solid black", zIndex: 3 }}
                        >
                            {getIssueItems()}
                        </div>}
                    </div>

                    <div className={`mobile-map-toggle`}
                        style={{
                            maxWidth: selectedIssue && selectedSpecificIssue ? "10vh" : "0",
                            opacity: selectedIssue && selectedSpecificIssue ? 1 : 0,
                            transition: "max-width 0.5s",
                            border: selectedSpecificIssue ? "border: 1px solid black" : "none"
                        }}
                    >
                        <MapToggle showToggle={showToggle} showMap={showMap} setShowMap={setShowMap} />
                    </div>
                </div>
            }



            <div className={`${selectedIssue && selectedSpecificIssue ? "big-padding" : "no-padding"}`}
                style={{
                    overflow: "auto",
                    maxHeight: selectedIssue && selectedSpecificIssue ? "100vh" : "0vh",
                    border: selectedIssue && selectedSpecificIssue ? "1px solid black" : "none",
                    opacity: showMap ? 0 : 1,
                    zIndex: !showMap ? 1 : -1,
                    backgroundColor: showMap ? "transparent" : "white",
                    transition: "max-height 0.5s, padding 0.5s"
                }}>
                <p className={"mb-3"}>{issues.specific_issues_data[selectedSpecificIssue]?.specific_issue_ranking_narrative || null}</p>
                <p className={"small-font mb-0"}>
                    {issues.specific_issues_data[selectedSpecificIssue]?.specific_issue_source ? `Source: ${issues.specific_issues_data[selectedSpecificIssue].specific_issue_source}` : null}</p>
                {selectedSpecificIssue && <> <Histogram
                    colorRampsyType={selectedIssue === 1 ? "health" : selectedIssue === 2 ? "env" : "infra"}
                    issues={issues}
                    boundary={boundary}
                    selectedSpecificIssue={selectedSpecificIssue}
                    communityPinned={communityPinned}
                    setCommunityPinned={setCommunityPinned}
                    councilPinned={councilPinned}
                    setCouncilPinned={setCouncilPinned}
                    />

                    <br />

                    <IssueProfile issues={issues}
                        selectedSpecificIssue={selectedSpecificIssue}
                        boundary={boundary}
                        setSelectedSpecificIssue={setSelectedSpecificIssue} /> </>}


            </div>



            <div style={{ zIndex: 1 }}>
                <div
                    className={`mobile-demographics-toggle ${showDemographics ? "active-scheme" : "inactive-scheme"}`}
                    style={{
                        height: selectedIssue && selectedSpecificIssue ? "5vh" : "0",
                        transition: "height 0.5s, padding 0.5s, border 0.5s",
                        border: selectedSpecificIssue && selectedIssue ? "1px solid black" : "none",
                        padding: selectedSpecificIssue && selectedIssue ? "0.5rem 1rem" : "0",
                        zIndex: 1,
                    }}
                >
                    {selectedIssue && selectedSpecificIssue &&
                        <>
                            <p className={"mb-0 small-font"}>{!showDemographics ? "See Demographics" : "Hide Demographics"}</p>
                            <div
                                onClick={() => {
                                    setShowDemographics(!showDemographics)
                                }}
                            >
                                {!showDemographics ? <FontAwesomeIcon icon={faPlus} /> :
                                    <FontAwesomeIcon icon={faMinus} />}
                            </div>
                        </>
                    }
                </div>
            </div>


            <div className={`mobile-demographics-body 
                             ${selectedIssue && selectedSpecificIssue && showDemographics ? "big-padding" : "no-padding"}`}
                style={{
                    height: selectedIssue && selectedSpecificIssue && showDemographics ? "100%" : "0",
                    transition: "height 0.5s, padding 0.5s",
                    bottom: 0,
                    zIndex: 1,
                    backgroundColor: "white",
                    border: selectedIssue && selectedSpecificIssue && showDemographics ? "1px solid black" : "none",
                    /*position: selectedIssue && selectedSpecificIssue && showDemographics && showMap ? "absolute" : "0",
                    zIndex: selectedIssue && selectedSpecificIssue && showDemographics && showMap ? 2 : */
                }}
            >
                <div
                    style={{
                        maxHeight: selectedIssue && selectedSpecificIssue && showDemographics ? "40vh" : "0",
                        transition: "max-height 0.5s"
                    }}
                >
                    <Demographics
                        currentValue={demographic}
                        setValue={setDemographic}
                        selectedSpecificIssue={selectedSpecificIssue}
                        setShowDemographics={setShowDemographics}
                        showDemographics={showDemographics}
                        mapDemographics={mapDemographics}
                        setMapDemographics={setMapDemographics}
                        boundary={boundary}
                        communities={communities}
                        councils={councils}
                        selectedChapter={selectedChapter}
                        toggleTransit={toggleTransit}
                        setToggleTransit={setToggleTransit}
                        toggleBike={toggleBike}
                        setToggleBike={setToggleBike}
                        toggleWalk={toggleWalk}
                        setToggleWalk={setToggleWalk}
                        colorRamps={selectedIssue === 1 ? "health" : selectedIssue === 2 ? "env" : "infra"}// legendBins={legendBins}
                        demoColorRamp={demoColorRamp}
                        demoLegendBins={demoLegendBins}
                        setDemoColorRamp={setDemoColorRamp}
                        setDemoLegendBins={setDemoLegendBins}
                        demoLookup={demoLookup[demographic]} showMap={showMap}
                        info={info}
                    />
                </div>
            </div>


            {/*{selectedIssue && <div className={`position-relative ${selectedIssue ? "bottom-border-small" : ""}`}>
                <div className={`mobile-citywide-chapter
            ${!selectedIssue ? "shrink no-padding inactive-scheme no-border" : "shrink small-padding active-scheme border-top "}`}
                     onClick={() => {
                         if (selectedIssue !== 1) {
                             setSelectedIssue(1)
                         }
                     }}
                >
                    <div className={`d-flex flex-row align-items-center justify-content-between`}>
                        <div className={"d-flex flex-row align-items-center small-col-gap"}>
                            <p className={`mb-0 mobile-transition-font 
                    ${!selectedIssue ? "big-text" : selectedIssue === 1 ? "small-text" : "no-text"}
                    ${!selectedSpecificIssue ? "underline" : ""}`}
                               onClick={() => {
                                   setSelectedSpecificIssue(null)
                               }}
                            >
                                Health
                            </p>
                            {selectedIssue === 1 && selectedSpecificIssue &&
                                <>
                                    <FontAwesomeIcon icon={faAngleRight}/>
                                    <p className={"small-text m-0 underline"}>{issues.specific_issues_data[selectedSpecificIssue].specific_issue_name}</p>
                                </>
                            }
                        </div>

                        {selectedIssue === 1 && selectedSpecificIssue &&
                            <div className={"mobile-map-toggle"}>
                                <MapToggle showToggle={showToggle} showMap={showMap} setShowMap={setShowMap}/>
                            </div>
                        }
                    </div>
                    <p className={`mb-0 mobile-transition-font 
                ${!selectedIssue ? "small-text" : "no-text"}`}>
                        {ISSUES_CATEGORIES.descriptions["1"]}
                    </p>
                </div>
            </div>}

            <div
                className={`${selectedSpecificIssue ? "overflow-scroll" : ""} ${selectedIssue ? "grow inactive-scheme big-padding regular-border" : "shrink no-padding inactive-scheme border-none"}`}>

                {selectedIssue && !selectedSpecificIssue &&
                    <div>
                        <MobileBoundary boundary={boundary} setBoundary={setBoundary}/>
                        <IssuesDropDown
                            items={selectedIssue === 1 ? health_issues : selectedIssue === 2 ? environment_issues : infrastructure_issues}
                            currentValue={selectedSpecificIssue}
                            setValue={setSelectedSpecificIssue}
                            setShowDemographics={setShowDemographics}
                            issues={issues}
                            issue_categories={issue_categories}
                        />

                        <div className={"mt-3"}>
                            <small>{`This is where you will hear about the topic that you select. Topics include a range of ${issue_categories.labels[selectedIssue].toLowerCase()} metrics.`}</small>
                        </div>
                    </div>
                }

                {selectedIssue && selectedSpecificIssue &&
                    <div className={"h-100"}>
                        <p>{issues.specific_issues_data[selectedSpecificIssue].specific_issue_ranking_narrative}</p>
                        <p className={"small-font mb-0"}>Source: {issues.specific_issues_data[selectedSpecificIssue].specific_issue_source}</p>
                        <Histogram
                            colorRampsyType={"health"}
                            issues={issues}
                            boundary={boundary}
                            selectedSpecificIssue={selectedSpecificIssue}
                        />

                        <br/>

                        <IssueProfile issues={issues}
                                      selectedSpecificIssue={selectedSpecificIssue}
                                      boundary={boundary}
                                      setSelectedSpecificIssue={setSelectedSpecificIssue}/>
                    </div>
                }


            </div>

            {selectedSpecificIssue && <div>
                <div className={"mobile-demographics-toggle"}>
                    <p className={"mb-0"}>See Demographics</p>
                    <FontAwesomeIcon icon={faPlus}/>
                </div>
            </div>}*/}


        </div>
    )
}