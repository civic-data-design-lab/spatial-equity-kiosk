import {useState} from "react";

import CommunitySearchBar from "../CommunitySearchBar";
import BoundaryToggle from "../BoundaryToggle";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faMinus, faPlus, faXmark} from "@fortawesome/free-solid-svg-icons";
import {default as _TILE_BLACK} from "../../img/tile_black.svg";
import {default as _TILE_WHITE} from "../../img/tile_white.svg";
import {default as _GLOBE_WHITE} from "../../img/globe_white.svg";
import {default as _GLOBE_BLACK} from "../../img/globe_black.svg";
import ShareButton from "../ShareButton";
import CommunityProfile from "../CommunityProfile";
import Histogram from "../Histogram";
import categories from "../../texts/issue_categories.json";
import IssueProfile from "../IssuesProfile";
import Demographics from "../Demographics";
import Carousel from "../Carousel";
import Legend from "../Legend";

export default function MobileCommunityProfile({
                                                   selectedChapter,
                                                   setSelectedChapter,
                                                   selectedIssue,
                                                   issue_categories,
                                                   boundary,
                                                   setBoundary,
                                                   selectedSpecificIssue,
                                                   setSelectedSpecificIssue,
                                                   issues,
                                                   setSelectedIssue,
                                                   communities,
                                                   communitySearch,
                                                   compareSearch,
                                                   setCommunitySearch,
                                                   setCompareSearch,
                                                   setShowMap,
                                                   councils,
                                                   setMoreIssues,
                                                   setMoreIssuesLength,
                                                   addCompare,
                                                   setAddCompare,
                                                   selectedCoord,
                                                   setSelectedCoord,
                                                   selectedCompareCoord,
                                                   setselectedCompareCoord,
                                                   badSearch,
                                                   setBadSearch,
                                                   setSearchSource,
                                                   errorCode,
                                                   setErrorCode,
                                                   setUserPoints,
                                                   setMapDemographics,
                                                   info,
                                                   userPoints,
                                                   viewState,
                                                   setViewState,
                                                   demographic,
                                                   setDemographic,
                                                   setShowDemographics,
                                                   showDemographics,
                                                   mapDemographics,
                                                   toggleTransit,
                                                   setToggleTransit,
                                                   toggleBike,
                                                   setToggleBike,
                                                   toggleWalk,
                                                   setToggleWalk,
                                                   demoLookup,
                                                   demoColorRamp,
                                                   demoLegendBins,
                                                   setDemoColorRamp,
                                                   setDemoLegendBins,
                                                   zoomToggle,
                                                   binList,
                                                   setToggleUnderperformers,
                                                   toggleUnderperformers,
                                                   handleLegend,
                                                   dataScale,
                                                   setdataScale,
                                                   showMap,
                                                   moreIssues,
                                                   setSelectedAbout,
                                                   moreIssuesLength,
                                                   colorRamps,
                                                   communityPinned,
                                                   setCommunityPinned,
                                                   councilPinned,
                                                   setCouncilPinned
                                               }) {

    const [searching, setSearching] = useState(false)
    const [showCompareSearch, setShowCompareSearch] = useState(false);
    const [showLegend, setShowLegend] = useState(false)

    const [showSearch, setShowSearch] = useState(false);

    const getHyperlinkText = (texts) => {
        return (
            <p className={"mb-0 small-font"}>
                {texts.map((texts) => {
                    return (
                        <span className={texts.bolded ? 'bold' : ''}>
              {texts.text}
                            {texts.hyperlink && (
                                <span
                                    className={`${
                                        categories.labels[
                                            issues.specific_issues_data[selectedSpecificIssue]
                                                .issue_type_ID
                                            ]
                                    }`}
                                >
                  <a
                      className={`hyperlink ${
                          categories.labels[
                              issues.specific_issues_data[selectedSpecificIssue]
                                  .issue_type_ID
                              ]
                      }`}
                      href={texts.source}
                      target="_blank"
                  >
                    {texts.hyperlink}
                  </a>
                </span>
                            )}
            </span>
                    );
                })}
            </p>
        );
    };

    const getSearchItems = (forSearch, boundary) => {
        let searchItems = [];
        let boundaryData;
        if (boundary === "community") {
            boundaryData = communities;
        } else {
            boundaryData = councils;
        }
        switch (forSearch) {
            case true:
                for (let [key, value] of Object.entries(boundaryData)) {
                    if (key !== compareSearch) {
                        searchItems.push(
                            <div
                                key={key}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                className={`${
                                    communitySearch && communitySearch.startsWith(key)
                                        ? "search-item-active"
                                        : "search-item-inactive"
                                } col search-item p-2`}
                                onMouseDown={(e) => {
                                    e.stopPropagation(e);
                                    setCommunitySearch(key);
                                    setShowSearch(false);
                                    setSearchSource("search")
                                    for (const [
                                        index,
                                        element,
                                    ] of info.selectedBoundary.features.entries()) {
                                        if (element.properties.CDTA2020?.toString() === key || element.properties.CounDist?.toString() === key) {
                                            setSelectedCoord([element.properties.X_Cent, element.properties.Y_Cent])
                                            break
                                        }
                                    }
                                    e.target.blur();
                                }}
                            >
                                <div className={"row w-100 p-0 m-0"}>
                                    <div className={"col-10 m-0 p-0"}>
                                        <span style={{fontWeight: "bold"}}>{value.name}</span>{" "}
                                        {value.neighborhoods}
                                    </div>
                                    <div
                                        className={`${
                                            communitySearch && communitySearch.startsWith(key)
                                                ? "visible"
                                                : "invisible"
                                        } d-flex col-2 p-0 flex-row justify-content-center align-items-center`}
                                    >
                                        <FontAwesomeIcon icon={faArrowRight}/>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                }
                break;
            case false:
                for (let [key, value] of Object.entries(boundaryData)) {
                    if (key !== communitySearch) {
                        searchItems.push(
                            <div
                                key={key}
                                className={`${
                                    compareSearch && compareSearch.startsWith(key)
                                        ? "search-item-active"
                                        : "search-item-inactive"
                                } col search-item p-2`}
                                onMouseDown={(e) => {
                                    e.stopPropagation()
                                    setCompareSearch(key);
                                    setShowCompareSearch(false);
                                    setSearchSource("search")
                                    for (const [
                                        index,
                                        element,
                                    ] of info.selectedBoundary.features.entries()) {
                                        if (element.properties.CDTA2020?.toString() === key || element.properties.CounDist?.toString() === key) {
                                            setselectedCompareCoord([element.properties.X_Cent, element.properties.Y_Cent])
                                            break
                                        }
                                    }
                                    e.target.blur();
                                }}
                            >
                                <div className={"row w-100 p-0 m-0"}>
                                    <div className={"col-10 m-0 p-0"}>
                                        <span style={{fontWeight: "bold"}}>{value.name}</span>{" "}
                                        {value.neighborhoods}
                                    </div>
                                    <div
                                        className={`${
                                            compareSearch && compareSearch.startsWith(key)
                                                ? "visible"
                                                : "invisible"
                                        } d-flex col-2 p-0 flex-row justify-content-center align-items-center`}
                                    >
                                        <FontAwesomeIcon icon={faArrowRight}/>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                }
        }

        return searchItems;
    };

    return (
        <div className={"mobile-community"}>
            <div className={"mobile-community-search-screen"}
                 style={{
                     padding: !communitySearch ? "1rem" : "0",
                     height: communitySearch ? "0" : "calc(100vh - 4.025rem - .3vw)"
                 }}
            >

                {!communitySearch && <BoundaryToggle
                    boundary={boundary}
                    setBoundary={setBoundary}
                    setCompareSearch={setCompareSearch}
                    setCommunitySearch={setCommunitySearch}
                    setSelectedCoord={setSelectedCoord}
                    setselectedCompareCoord={setselectedCompareCoord}
                    badSearch={badSearch}
                    setBadSearch={setBadSearch}
                />}


                <div className={"d-flex flex-row"}>
                    <div style={{width: !communitySearch ? "calc(100vw - 2rem - 2px)" : "calc(100vw - 10vh)"}}>
                        <CommunitySearchBar
                            selectedCompareCoord={selectedCompareCoord}
                            setselectedCompareCoord={setselectedCompareCoord}
                            toggleValue={
                                communitySearch
                                    ? (communities[communitySearch] &&
                                        communities[communitySearch].name) ||
                                    (councils[communitySearch] && councils[communitySearch].name)
                                    : null
                            }
                            communitySearch={communitySearch}
                            callBack={setCommunitySearch}
                            selectedCoord={selectedCoord}
                            setSelectedCoord={setSelectedCoord}
                            setShowSearch={setShowSearch}
                            showSearch={showSearch}
                            setShowMap={setShowMap}
                            primarySearch={true}
                            badSearch={badSearch}
                            setBadSearch={setBadSearch}
                            setSearchSource={setSearchSource}
                            boundary={boundary}
                            info={info}
                            setCommunitySearch={setCommunitySearch}
                            setCompareSearch={setCompareSearch}
                            setAddCompare={setAddCompare}
                            setUserPoints={setUserPoints}
                            userPoints={userPoints}
                        >
                            {getSearchItems(true, boundary)}
                        </CommunitySearchBar>
                    </div>

                    {communitySearch && <>
                        <div
                            onClick={() => {
                                setShowMap(false)
                            }}
                            className={`mobile-map-toggle ${showMap ? "inactive-scheme" : "active-scheme"}`}>
                            {showMap ? <img src={_TILE_BLACK}/> : <img src={_TILE_WHITE}/>}
                        </div>
                        <div
                            onClick={() => {
                                setShowMap(true)
                            }}
                            className={`mobile-map-toggle ${!showMap ? "inactive-scheme" : "active-scheme"}`}>
                            {showMap ? <img src={_GLOBE_WHITE}/> : <img src={_GLOBE_BLACK}/>}
                        </div>
                    </>}


                </div>

                <div className={"mobile-boundary-nav"}>
                    <div className={"d-flex flex-row col-gap align-items-center"}>
                        <p className={"small-font mb-0"}
                           style={{textDecorationLine: boundary !== "council" ? "underline" : ""}}
                        >Community <br/> Board</p>
                        <div
                            className={`d-flex switch-container flex-row justify-content-between`}>
                            <label className="switch">
                                <input type="checkbox" checked={boundary === "council"}
                                       onChange={(e) => {
                                           let b = e.target.checked ? "council" : "community"
                                           setBoundary(b)
                                       }}/>
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <p className={`small-font mb-0`}
                           style={{textDecorationLine: boundary === "council" ? "underline" : ""}}
                        >Council <br/> District</p>
                    </div>
                    <ShareButton/>

                </div>

                <div
                    style={{
                        position:"relative",
                        zIndex:1,
                        height: "calc(100vh - 4.025rem - .3vw - 5vh - 7vh)"
                    }}
                >{!showMap &&
                    <CommunityProfile
                        issues={issues} selectedSpecificIssue={selectedSpecificIssue}
                        communities={communities} communitySearch={communitySearch}
                        setSelectedSpecificIssue={setSelectedSpecificIssue}
                        compareSearch={compareSearch}
                        moreIssues={moreIssues} setMoreIssues={setMoreIssues} moreIssuesLength={moreIssuesLength}
                        setMoreIssuesLength={setMoreIssuesLength}
                        boundary={boundary} councils={councils} setSelectedChapter={setSelectedChapter}
                        setSelectedAbout={setSelectedAbout}
                    />
                }</div>

                <div className={"selected-issue-card"}
                     style={{
                         transition: "height 0.5s, top 0.5s",
                         height: "calc(100vh - 5vh - 4.025rem - .3vw)",
                         backgroundColor: "white",
                         position: "absolute",
                         zIndex: 2,
                         width: "100vw",
                         top: `${!selectedSpecificIssue ? "100vh" : "calc(4.025rem + .3vw + 5vh"}`
                     }}
                >
                    <div
                        className={"selected-issue-card-header d-flex flex-row align-items-center justify-content-between"}
                        style={{
                            height: "5vh",
                            backgroundColor: "black",
                            color: "white",
                            padding: "1rem"
                        }}
                    >
                        <p className={"mb-0"}>{issues.specific_issues_data[selectedSpecificIssue]?.specific_issue_name || null}</p>
                        <p className={'m-0 smaller-text'}>
                            ({issues.specific_issues_data[selectedSpecificIssue]?.specific_issue_units || null})</p>
                        <ShareButton/>
                        <FontAwesomeIcon icon={faXmark}
                                         onClick={() => {
                                             setSelectedSpecificIssue(null)
                                         }}
                        />


                    </div>

                    <div
                        className={"selected-issue-card-body"}
                        style={{
                            height: `${(!showMap && showDemographics) || (showMap && showLegend) ? "calc(50vh - 4.025rem - 0.3vw)" : "calc(83vh - 4.025rem - 0.3vw)"}`,
                            backgroundColor: "white",
                            color: "black",
                            padding: "1rem",
                            overflow: "auto",
                            transition: "height 0.5s"
                        }}
                    >

                        <div>
                            {issues.specific_issues_data[selectedSpecificIssue]?.specific_issue_ranking_narrative}
                        </div>
                        {selectedSpecificIssue &&
                            <>
                            <div style={{flex: 1, height: "70vh"}} className={'histogram-responsive-box'}>

                                <Histogram
                                    colorRampsyType={colorRamps}
                                    issues={issues}
                                    boundary={boundary}
                                    selectedSpecificIssue={selectedSpecificIssue}
                                    communityPinned={communityPinned}
                                    setCommunityPinned={setCommunityPinned}
                                    councilPinned={councilPinned}
                                    setCouncilPinned={setCouncilPinned}
                                    setCommunitySearch={setCommunitySearch}
                                    setSelectedChapter={setSelectedChapter}
                                />

                            </div>
                            <IssueProfile
                                    issues={issues}
                                    selectedSpecificIssue={selectedSpecificIssue}
                                    boundary={boundary}
                                    setSelectedSpecificIssue={setSelectedSpecificIssue}
                                    setCommunitySearch={setCommunitySearch}
                                    setSelectedChapter={setSelectedChapter}
                                    councils={councils}
                                    communities={communities}
                                />
                            </>
                        }


                    </div>

                    <div
                    className={`mobile-demographics-toggle ${(!showMap && showDemographics) || (showMap && showLegend) ? "active-scheme" : "inactive-scheme"}`}
                    onClick={() => {
                        if (!showMap) {
                            setShowDemographics(!showDemographics)
                        } else {
                            setShowDemographics(true)
                            setShowLegend(!showLegend)
                        }
                    }}
                >
                    <div>
                        {!showMap && showDemographics ? "Hide Demographics"
                            : !showMap && !showDemographics ? "Show Demographics"
                                : showMap && showLegend ? "Hide Legend"
                                    : "Show Legend"

                        }
                    </div>

                    <FontAwesomeIcon
                        icon={(!showMap && showDemographics) || (showMap && showLegend) ? faMinus : faPlus}/>
                </div>
                <div className={"mobile-demographics-container"}
                     style={{
                         height: (!showMap && showDemographics) || (showMap && showLegend) ? "calc(100vh - 19vh  - 48vh)" : "0"
                     }}
                >
                    {selectedSpecificIssue && !showMap &&
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
                            demoLookup={demoLookup[demographic]}
                            showMap={showMap}
                            info={info}
                        />}

                    {selectedSpecificIssue && showMap &&
                        <Carousel>
                            <div
                                className={"d-flex flex-column justify-content-between"}
                                style={{height: "calc(100vh - 19vh  - 48vh - 5rem)"}}>
                                <p className={"mb-0"}>
                                    Description
                                </p>
                                <p className="mb-0">{getHyperlinkText(issues.specific_issues_data[selectedSpecificIssue].specific_issue_description)}</p>
                            </div>

                            <div
                                className={"d-flex flex-column justify-content-between"}
                                style={{height: "calc(100vh - 19vh  - 48vh - 5rem)"}}>
                                <p className={"mb-0"}>Data Legend</p>

                                <Legend
                                    mapDemographics={mapDemographics}
                                    demoColorRamp={demoColorRamp}
                                    demoLegendBins={demoLegendBins}
                                    demoLookup={demoLookup[demographic]}
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
                                    selectedChapter={selectedChapter}
                                />

                            </div>

                            <div
                                className={"d-flex flex-column justify-content-between"}
                                style={{
                                    transition: "height 0.5s",
                                    height: `${showMap && showLegend ? "calc(100vh - 19vh  - 48vh - 5rem)" : "0"}`
                                }}>
                                <p className={"mb-0"}>
                                    Demographics
                                </p>


                                <div style={{position: "relative", zIndex: 1, height: "100%"}}>
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
                                        demoLookup={demoLookup[demographic]}
                                        showMap={showMap}
                                        info={info}
                                    />
                                </div>

                            </div>
                        </Carousel>
                    }
                </div>

                </div>

                {/*<div className={"typewriter-container"}
                     onClick={()=>{

                     }}
                >
                    <p className={"mb-0"} style={{fontStyle:"3rem"}}>
                        Try searching for
                    </p>
                        <Typewriter
                            onInit={(typewriter) => {return}}
                            options={{
                                strings:  ['your address', 'Hamilton Heights', '111 John Street',
                                    "Bronx 9", 'Bedford Stuyvesant', '350 5th Avenue', "Washington Heights", "350 5th Avenue", "District 5",
                                    "Bensonhurst"],
                                autoStart: true,
                                loop: true,
                                pauseFor: 2000,
                            }}
                        />
                    </div>*/}

            </div>
        </div>
    )
}