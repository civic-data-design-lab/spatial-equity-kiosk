import React, {useEffect} from "react";
import IssuesDropDown from "./IssuesDropDown";
import Demographics from "./Demographics";
import Legend from "./Legend";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import _RANKINGS from "../data/rankings.json";
import _COUNCILDISTRICTS from "../texts/councildistricts.json";

export default function IssuesMiddleColumn({
                                               issues,
                                               selectedIssue,
                                               setSelectedIssue,
                                               selectedSpecificIssue,
                                               setSelectedSpecificIssue,
                                               demographic,
                                               setDemographic,
                                               communitySearch,
                                               compareSearch,
                                               showDemographics,
                                               setShowDemographics,
                                               mapDemographics,
                                               setMapDemographics,
                                               boundary,
                                               communities,
                                               councils,
                                               colorRamps,
                                               toggleUnderperformers,
                                               setToggleUnderperformers, //legendBins,
                                               selectedChapter,
                                               issue_categories,
                                               toggleWalk,
                                               setToggleWalk,
                                               toggleTransit,
                                               setToggleTransit,
                                               toggleBike,
                                               setToggleBike,
                                               dataScale,
                                               setdataScale,
                                               setDemoColorRamp,
                                               setDemoLegendBins,
                                               demoColorRamp,
                                               demoLegendBins,
                                               handleLegend,
                                               zoomToggle,
                                               setColorRamps,
                                               demoLookup,
                                               showMap,
                                               binList,
                                               info, collapseMap
                                           }) {
    // console.log("demoLegend in issuesmiddle ", demoLegendBins)

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

    //   NIKO CONTINUE WORKING HERE FINISH UP PROCEDURAL SENTENCES, then DETERMINE WHEN THE FONT SHOWS
    const getRankingNarrative = (items) => {
        const possible_keys = items.map((item) => {
            return item.specific_issue_ID;
        });

        const boundaryPhrase = selectedSpecificIssue
            ? boundary == "council"
                ? _RANKINGS.council[
                    issues.specific_issues_data[selectedSpecificIssue].json_id
                    ].find((f) => f.rank == 1)
                : _RANKINGS.community[
                    issues.specific_issues_data[selectedSpecificIssue].json_id
                    ].find((f) => f.rank == 1)
            : "";

        const councilDistrictBorough =
            boundary == "council"
                ? _COUNCILDISTRICTS[boundaryPhrase.community_ID].borough
                : "";

        if (possible_keys.includes(selectedSpecificIssue)) {
            return (
                <p className={"mb-3 small-font"}>
                    {boundary === "council"
                        ? `City Council ${boundaryPhrase.community} in ${councilDistrictBorough} ranks `
                        : `Community Board ${boundaryPhrase.community} ranks `}
                    {"1st <strong>update this</strong>"}
                    {` out of ${
                        boundary == "council" ? "51" : "59"
                    } districts citywide for `}
                    {issues.specific_issues_data[selectedSpecificIssue].issue_hi_low[0]}{" "}
                    {issues.specific_issues_data[
                        selectedSpecificIssue
                        ].specific_issue_name.toLowerCase()}{" "}
                    {issues.specific_issues_data[selectedSpecificIssue]
                        .issue_units_shorthand != ""
                        ? issues.specific_issues_data[
                            selectedSpecificIssue
                            ].issue_units_shorthand.toLowerCase()
                        : issues.specific_issues_data[
                            selectedSpecificIssue
                            ].specific_issue_units.toLowerCase()}
                    {"."}
                    {" Confirm last sentence works in every case"}
                    {/* issues.specific_issues_data[selectedSpecificIssue]
              .specific_issue_ranking_narrative */}
                </p>
            );
        }
    };

    useEffect(() => {
        if (!selectedIssue) {
            setShowDemographics(false);
            //setDemographic(null)
        }
    });

    /*    useEffect(() => {
                console.log("in use effect")
                if (!selectedSpecificIssue) {
                    setShowDemographics(false)
                    console.log(showDemographics)
                }
            }, [selectedSpecificIssue])*/

    return (
        <div className={"d-flex flex-column h-100 position-relative"}>
            <div
                className={`${selectedIssue === 1 ? "issues-chapters-active" : ""} ${
                    selectedIssue || showDemographics ? "collapse-issue" : ""
                } issues-chapters top-border`}
                onClick={() => {

                    setSelectedSpecificIssue(null);
                    if (selectedIssue !== 1) {
                        setSelectedIssue(1);
                        setColorRamps("health");
                    } else {
                        setSelectedIssue(null);
                        setShowDemographics(null);
                    }
                }}
            >
                <h5 className={`${selectedIssue ? "mb-0" : ""}`}>Health</h5>
                <h5 className={`${selectedIssue ? "invis" : "vis"}`}>
                    Health issues imperdiet dui accumsan sit amet. Diam donec adipiscing.
                </h5>
            </div>

            <div
                className={`${
                    selectedIssue === 1 ? "expand-issue" : ""
                } accordion-body`}
            >
                <div
                    className={
                        "h-100 position-relative d-flex flex-column justify-content-between row-gap"
                    }
                >
                    <IssuesDropDown
                        items={health_issues}
                        currentValue={selectedSpecificIssue}
                        setValue={setSelectedSpecificIssue}
                        setShowDemographics={setShowDemographics}
                        issues={issues}
                        issue_categories={issue_categories}
                    />

                    <div className={`d-flex flex-column h-100 justify-content-between`}>
                        <div>
                            {selectedSpecificIssue &&
                                !showDemographics &&
                                getRankingNarrative(health_issues)}
                            {!selectedSpecificIssue && (
                                <p className={"mb-3 small-font"}>
                                    This is where you will hear about the topic that you select.
                                    Topics include a range of health metrics.
                                </p>
                            )}

                            {(!showMap || !selectedSpecificIssue) && (
                                <p className={"m-0 small-font"}>
                                    {issue_categories.descriptions[selectedIssue]}
                                </p>
                            )}
                        </div>

                        {/*{!showDemographics && <p className={"small-font m-0"}></p>}*/}
                        {showMap && (
                            <Legend
                                mapDemographics={mapDemographics}
                                demoColorRamp={demoColorRamp}
                                demoLegendBins={demoLegendBins}
                                demoLookup={demoLookup}
                                demographic={demographic}
                                dataScale={dataScale}
                                setdataScale={setdataScale}
                                issues={issues}
                                selectedSpecificIssue={selectedSpecificIssue}
                                colorRamps={colorRamps}
                                toggleUnderperformers={toggleUnderperformers} //legendBins={legendBins}
                                setToggleUnderperformers={setToggleUnderperformers}
                                boundary={boundary}
                                handleLegend={handleLegend}
                                selectedIssue={selectedSpecificIssue}
                                zoomToggle={zoomToggle}
                                showMap={showMap}
                                binList={binList}
                                info={info}
                            />
                        )}
                    </div>
                </div>
            </div>

            <div
                className={`${
                    selectedIssue === 2
                        ? "issues-chapters-active"
                        : selectedIssue === 1
                            ? "top-border"
                            : ""
                } ${
                    selectedIssue || showDemographics ? "collapse-issue" : ""
                } issues-chapters`}
                onClick={() => {
                    //setShowDemographics(false)
                    setSelectedSpecificIssue(null);
                    //setCommunitySearch(null)
                    //setCompareSearch(null)
                    if (selectedIssue !== 2) {
                        setSelectedIssue(2);
                        setColorRamps("env");
                    } else {
                        setSelectedIssue(null);
                        setShowDemographics(null);
                    }
                }}
            >
                <h5 className={`${selectedIssue ? "mb-0" : ""}`}>Environment</h5>
                <h5 className={`${selectedIssue ? "invis" : "vis"}`}>
                    Environment imperdiet dui accumsan sit amet. Diam donec adipiscing.
                </h5>
            </div>
            <div
                className={`${
                    selectedIssue === 2 ? "expand-issue" : ""
                } accordion-body`}
            >
                <div
                    className={
                        "h-100 position-relative d-flex flex-column justify-content-between row-gap"
                    }
                >
                    <IssuesDropDown
                        items={environment_issues}
                        currentValue={selectedSpecificIssue}
                        setValue={setSelectedSpecificIssue}
                        setShowDemographics={setShowDemographics}
                        issues={issues}
                        issue_categories={issue_categories}
                    />

                    <div className={`d-flex flex-column h-100 justify-content-between`}>
                        <div>
                            {selectedSpecificIssue &&
                                !showDemographics &&
                                getRankingNarrative(environment_issues)}
                            {!selectedSpecificIssue && (
                                <p className={"mb-3 small-font"}>
                                    This is where you will hear about the topic that you select.
                                    Topics include a range of environment metrics.
                                </p>
                            )}

                            {(!showMap || !selectedSpecificIssue) && (
                                <p className={"m-0 small-font"}>
                                    {issue_categories.descriptions[selectedIssue]}
                                </p>
                            )}
                        </div>

                        {/*{!showDemographics && <p className={"small-font m-0"}></p>}*/}
                        {showMap && (
                            <Legend
                                mapDemographics={mapDemographics}
                                demoColorRamp={demoColorRamp}
                                demoLegendBins={demoLegendBins}
                                demoLookup={demoLookup}
                                demographic={demographic}
                                dataScale={dataScale}
                                setdataScale={setdataScale}
                                issues={issues}
                                selectedSpecificIssue={selectedSpecificIssue}
                                colorRamps={colorRamps}
                                toggleUnderperformers={toggleUnderperformers} //legendBins={legendBins}
                                setToggleUnderperformers={setToggleUnderperformers}
                                boundary={boundary}
                                handleLegend={handleLegend}
                                selectedIssue={selectedSpecificIssue}
                                zoomToggle={zoomToggle}
                                showMap={showMap}
                                binList={binList}
                                info={info}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div
                className={`${
                    selectedIssue === 3
                        ? "issues-chapters-active"
                        : selectedIssue === 2
                            ? "top-border"
                            : ""
                } ${
                    selectedIssue || showDemographics ? "collapse-issue" : ""
                } issues-chapters`}
                onClick={() => {
                    setSelectedSpecificIssue(null);
                    //setShowDemographics(false)
                    //setCommunitySearch(null)
                    //setCompareSearch(null)
                    if (selectedIssue !== 3) {
                        setSelectedIssue(3);
                        setColorRamps("infra");
                    } else {
                        setSelectedIssue(null);
                        setShowDemographics(null);
                    }
                }}
            >
                <h5 className={`${selectedIssue ? "mb-0" : ""}`}>Infrastructure</h5>
                <h5 className={`${selectedIssue ? "invis" : "vis"}`}>
                    Infrastructure imperdiet dui accumsan sit amet. Diam donec adipiscing.
                </h5>
            </div>
            <div
                className={`${
                    selectedIssue === 3 ? "expand-issue" : ""
                } accordion-body`}
            >
                <div
                    className={
                        "h-100 position-relative d-flex flex-column justify-content-between row-gap"
                    }
                >
                    <IssuesDropDown
                        items={infrastructure_issues}
                        currentValue={selectedSpecificIssue}
                        setValue={setSelectedSpecificIssue}
                        setShowDemographics={setShowDemographics}
                        issues={issues}
                        issue_categories={issue_categories}
                    />

                    <div className={`d-flex flex-column h-100 justify-content-between`}>
                        <div>
                            {selectedSpecificIssue &&
                                !showDemographics &&
                                getRankingNarrative(infrastructure_issues)}
                            {!selectedSpecificIssue && (
                                <p className={"mb-3 small-font"}>
                                    This is where you will hear about the topic that you select.
                                    Topics include a range of infrastructure metrics.
                                </p>
                            )}

                            {(!showMap || !selectedSpecificIssue) && (
                                <p className={"m-0 small-font"}>
                                    {issue_categories.descriptions[selectedIssue]}
                                </p>
                            )}
                        </div>

                        {/*{!showDemographics && <p className={"small-font m-0"}></p>}*/}
                        {showMap && (
                            <Legend
                                mapDemographics={mapDemographics}
                                demoColorRamp={demoColorRamp}
                                demoLegendBins={demoLegendBins}
                                demoLookup={demoLookup}
                                demographic={demographic}
                                dataScale={dataScale}
                                setdataScale={setdataScale}
                                issues={issues}
                                selectedSpecificIssue={selectedSpecificIssue}
                                colorRamps={colorRamps}
                                toggleUnderperformers={toggleUnderperformers} //legendBins={legendBins}
                                setToggleUnderperformers={setToggleUnderperformers}
                                boundary={boundary}
                                handleLegend={handleLegend}
                                selectedIssue={selectedSpecificIssue}
                                zoomToggle={zoomToggle}
                                showMap={showMap}
                                binList={binList}
                                info={info}
                            />
                        )}
                    </div>
                </div>
            </div>

            <div
                className={`collapse-issue transition-height
                ${selectedIssue ? "some-height" : "no-height"}
                ${
                    showDemographics ? "bottom-border issues-chapters-active" : ""
                } ${
                    selectedIssue === 3 ? "top-border" : ""
                } issues-chapters no-bottom-border`}
                onClick={() => {
                    if (selectedIssue) setShowDemographics(!showDemographics);
                    if (showDemographics) {
                        setMapDemographics(false);
                    }
                }}
                id="bottom-chapter"
            >
                <div
                    className={`d-flex flex-row justify-content-between align-items-center
                transition-height ${selectedIssue ? "some-height" : "no-height"}
                `}
                >
                    <h5 className={`${showDemographics ? "mb-0" : "mb-0"}`}>
                        {showDemographics
                            ? "Hide U.S. Census Data"
                            : "Show U.S. Census Data"}
                    </h5>
                    {showDemographics ? (
                        <FontAwesomeIcon icon={faMinus}/>
                    ) : (
                        <FontAwesomeIcon icon={faPlus}/>
                    )}
                </div>
            </div>

            <div
                className={`${showDemographics ? "expand-issue" : ""} accordion-body`}
            >
                <div className={"h-100 position-relative"}>
                    <Demographics
                        currentValue={demographic}
                        setValue={setDemographic}
                        selectedSpecificIssue={selectedSpecificIssue}
                        setShowDemographics={setShowDemographics}
                        showDemographics={showDemographics}
                        communitySearch={communitySearch}
                        compareSearch={compareSearch}
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
                        colorRamps={colorRamps} // legendBins={legendBins}
                        demoColorRamp={demoColorRamp}
                        demoLegendBins={demoLegendBins}
                        setDemoColorRamp={setDemoColorRamp}
                        setDemoLegendBins={setDemoLegendBins}
                        demoLookup={demoLookup}
                        showMap={showMap}
                    />
                </div>
            </div>

        </div>
    );
}
