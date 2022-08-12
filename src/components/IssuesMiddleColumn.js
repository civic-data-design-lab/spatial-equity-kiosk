import React, {useEffect} from "react";
import IssuesDropDown from "./IssuesDropDown";
import Demographics from "./Demographics";
import Legend from "./Legend";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";


export default function IssuesMiddleColumn({
                                               issues,
                                               selectedIssue,
                                               setSelectedIssue,
                                               selectedSpecificIssue,
                                               setSelectedSpecificIssue,
                                               demographic, setDemographic,
                                               communitySearch, compareSearch,
                                               showDemographics, setShowDemographics,
                                               mapDemographics, setMapDemographics, boundary,
                                               communities, councils,
                                               legendBins, colorRamps

                                           }) {
                                        

    const health_issues = issues.issues_data["health"].specific_issues_ID.map((id_) => {
        return issues.specific_issues_data[id_]
    })

    const environment_issues = issues.issues_data["environment"].specific_issues_ID.map((id_) => {
        return issues.specific_issues_data[id_]
    })

    const infrastructure_issues = issues.issues_data["infrastructure"].specific_issues_ID.map((id_) => {
        return issues.specific_issues_data[id_]
    })

    const getRankingNarrative = (items) => {
        const possible_keys = items.map((item) => {
            return item.specific_issue_ID
        })

        if (possible_keys.includes(selectedSpecificIssue)) {
            return <p
                className={"mt-3"}>{issues.specific_issues_data[selectedSpecificIssue].specific_issue_ranking_narrative}</p>

        }
    }

    useEffect(() => {
        if (!selectedSpecificIssue) {
            setShowDemographics(false)
            setDemographic(null)
        }
    })

    /*    useEffect(() => {
            console.log("in use effect")
            if (!selectedSpecificIssue) {
                setShowDemographics(false)
                console.log(showDemographics)
            }
        }, [selectedSpecificIssue])*/


    return (
        <div className={"d-flex flex-column h-100"}>
            <div
                className={`${selectedIssue === 1 ? 'issues-chapters-active' : ''} ${selectedIssue ? "collapse-issue" : ""} issues-chapters top-border`}
                onClick={() => {
                    /*setShowMap(true)
                    setShowToggle(false)*/
                    //setCommunitySearch(null)
                    //setCompareSearch(null)
                    setShowDemographics(false)
                    setSelectedSpecificIssue(null)
                    if (selectedIssue !== 1) {
                        setSelectedIssue(1)
                    } else {
                        setSelectedIssue(null)
                        setShowDemographics(null)
                    }
                }}>
                <h5 className={`${selectedIssue ? 'mb-0' : ''}`}>Health</h5>
                <h5 className={`${selectedIssue ? "invis" : "vis"}`}>Health issues imperdiet dui accumsan sit amet. Diam
                    donec adipiscing.
                </h5>
            </div>

            <div className={`${selectedIssue === 1 ? 'expand-issue' : ''} accordion-body`}>
                <div className={"h-100 position-relative d-flex flex-column"}>

                    <IssuesDropDown items={health_issues}
                                    currentValue={selectedSpecificIssue}
                                    setValue={setSelectedSpecificIssue}
                                    setShowDemographics={setShowDemographics}
                    />

                    <div className={"d-flex flex-column justify-content-between h-100"}>
                        {((selectedSpecificIssue && !showDemographics) || (!selectedSpecificIssue)) &&
                            <div className={"thirds"}>
                                {selectedSpecificIssue && !showDemographics && getRankingNarrative(health_issues)}
                                {!selectedSpecificIssue &&
                                    <p className={"mt-3"}>This is where you will hear about the topic that
                                        you
                                        select.
                                        Topics
                                        include a range of health metrics.</p>}
                            </div>}
                        <div>
                            {!showDemographics && <h6>Data Legend</h6>}
                            <Legend issues={issues} selectedSpecificIssue={selectedSpecificIssue} legendBins={legendBins} colorRamps={colorRamps} />
                        </div>


                    </div>
                </div>
            </div>

            <div
                className={`${selectedIssue === 2 ? 'issues-chapters-active' : (selectedIssue === 1 ? "top-border" : "")} ${selectedIssue ? "collapse-issue" : ""} issues-chapters`}
                onClick={() => {
                    setShowDemographics(false)
                    setSelectedSpecificIssue(null)
                    //setCommunitySearch(null)
                    //setCompareSearch(null)
                    if (selectedIssue !== 2) {
                        setSelectedIssue(2)
                    } else {
                        setSelectedIssue(null)
                        setShowDemographics(null)
                    }
                }}>
                <h5 className={`${selectedIssue ? 'mb-0' : ''}`}>Environment</h5>
                <h5 className={`${selectedIssue ? "invis" : "vis"}`}>Environment imperdiet dui accumsan sit amet. Diam
                    donec adipiscing.</h5>
            </div>
            <div className={`${selectedIssue === 2 ? 'expand-issue' : ''} accordion-body`}>
                <div className={"h-100 position-relative d-flex flex-column"}>

                    <IssuesDropDown items={environment_issues}
                                    currentValue={selectedSpecificIssue}
                                    setValue={setSelectedSpecificIssue}
                                    setShowDemographics={setShowDemographics}
                    />

                    <div className={"d-flex flex-column justify-content-between h-100"}>
                        {((selectedSpecificIssue && !showDemographics) || (!selectedSpecificIssue)) &&
                            <div className={"thirds"}>
                                {selectedSpecificIssue && !showDemographics && getRankingNarrative(environment_issues)}
                                {!selectedSpecificIssue &&
                                    <p className={"mt-3"}>This is where you will hear about the topic that
                                        you
                                        select.
                                        Topics
                                        include a range of health metrics.</p>}
                            </div>}
                        <div>
                            {!showDemographics && <h6>Data Legend</h6>}
                            <Legend issues={issues} selectedSpecificIssue={selectedSpecificIssue} legendBins={legendBins} colorRamps={colorRamps}   />
                            
                        </div>


                    </div>
                </div>
            </div>
            <div
                className={`${selectedIssue === 3 ? 'issues-chapters-active' : (selectedIssue === 2 ? "top-border" : "")} ${selectedIssue ? "collapse-issue" : ""} issues-chapters`}
                onClick={() => {
                    setSelectedSpecificIssue(null)
                    setShowDemographics(false)
                    //setCommunitySearch(null)
                    //setCompareSearch(null)
                    if (selectedIssue !== 3) {
                        setSelectedIssue(3)
                    } else {
                        setSelectedIssue(null)
                        setShowDemographics(null)
                    }
                }}>
                <h5 className={`${selectedIssue ? 'mb-0' : ''}`}>Infrastructure</h5>
                <h5 className={`${selectedIssue ? "invis" : "vis"}`}>Infrastructure imperdiet dui accumsan sit amet.
                    Diam donec adipiscing.</h5>
            </div>
            <div className={`${selectedIssue === 3 ? 'expand-issue' : ''} accordion-body`}>
                <div className={"h-100 position-relative d-flex flex-column"}>

                    <IssuesDropDown items={infrastructure_issues}
                                    currentValue={selectedSpecificIssue}
                                    setValue={setSelectedSpecificIssue}
                                    setShowDemographics={setShowDemographics}
                    />

                    <div className={"d-flex flex-column justify-content-between h-100"}>
                        {((selectedSpecificIssue && !showDemographics) || (!selectedSpecificIssue)) &&
                            <div className={"thirds"}>
                                {selectedSpecificIssue && !showDemographics && getRankingNarrative(infrastructure_issues)}
                                {!selectedSpecificIssue &&
                                    <p className={"mt-3"}>This is where you will hear about the topic that
                                        you
                                        select.
                                        Topics
                                        include a range of health metrics.</p>}
                            </div>}
                        <div>
                            {!showDemographics && <h6>Data Legend</h6>}
                            <Legend issues={issues} selectedSpecificIssue={selectedSpecificIssue} legendBins={legendBins} colorRamps={colorRamps} />
                        </div>


                    </div>
                </div>
            </div>

            <div
                className={`${selectedIssue ? 'collapse-issue' : ''} ${showDemographics ? "bottom-border issues-chapters-active" : ""} ${selectedIssue === 3 ? "top-border" : ""} issues-chapters no-bottom-border`}
                onClick={() => {
                    if (selectedSpecificIssue) {
                        setShowDemographics(!showDemographics)
                    }
                }}>
                <div className={'d-flex flex-row justify-content-between align-items-center'}>
                    <h5 className={`${showDemographics ? 'mb-0' : 'mb-0'}`}>{showDemographics ? "Hide Demographics" : "Show Demographics"}</h5>
                    {showDemographics ? <FontAwesomeIcon icon={faMinus}/> : <FontAwesomeIcon icon={faPlus}/>}
                </div>
                <h5 className={`${!selectedIssue ? "vis" : "invis"}`}>Demographics imperdiet dui accumsan sit amet. Diam
                    donec adipiscing.</h5>
            </div>
            <div className={`${showDemographics ? 'expand-issue' : ''} accordion-body`}>
                <div className={"h-100 position-relative"}>
                    <Demographics currentValue={demographic} setValue={setDemographic}
                                  selectedSpecificIssue={selectedSpecificIssue}
                                  setShowDemographics={setShowDemographics} showDemographics={showDemographics}
                                  communitySearch={communitySearch} compareSearch={compareSearch}
                                  mapDemographics={mapDemographics} setMapDemographics={setMapDemographics}
                                  boundary={boundary} communities={communities} councils={councils}
                    />

                </div>

            </div>


        </div>
    )
}