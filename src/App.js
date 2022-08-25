import "./App.css";
import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";

import Container from "react-bootstrap/Container";

import Nav from "./components/Nav";
import Content from "./components/Content";
import Map from "./components/Map";

import _ISSUE_CATEGORIES from "./texts/issue_categories.json";
import _ISSUES from "./texts/issues.json";
import _COMMUNITIES from "./texts/communities.json";
import _COUNCILS from "./texts/councildistricts.json";
import _DEMOGRAPHICS from "./texts/demographics.json";

const issue_categories = _ISSUE_CATEGORIES;
const issues = _ISSUES;
const communities = _COMMUNITIES;
const councils = _COUNCILS;
const demoLookup = _DEMOGRAPHICS;

function App() {

    const [showMap, setShowMap] = useState(false);
    const [showToggle, setShowToggle] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [selectedSpecificIssue, setSelectedSpecificIssue] = useState(null);
    const [communitySearch, setCommunitySearch] = useState(null);
    const [compareSearch, setCompareSearch] = useState(null);
    const [boundary, setBoundary] = useState("council");
    const [demographic, setDemographic] = useState(null);
    const [selectedAbout, setSelectedAbout] = useState(null);
    const [showDemographics, setShowDemographics] = useState(null);
    const [moreIssues, setMoreIssues] = useState([]);
    const [moreIssuesLength, setMoreIssuesLength] = useState(0);
    const [mapDemographics, setMapDemographics] = useState(false);
    const [addCompare, setAddCompare] = useState(false);
    const [legendBins, setLegendBins] = useState([1, [1, 1, 1, 1, 1]]);
    const [colorRamps, setColorRamps] = useState([1, 1, 1, 1, 1]);
    const [toggleUnderperformers, setToggleUnderperformers] = useState(false);
    const [coordinateLookup, setCoordinateLookup] = useState(null);
    const location = useLocation();
    const [toggleTransit, setToggleTransit] = useState(true);
    const [toggleBike, setToggleBike] = useState(false);
    const [toggleWalk, setToggleWalk] = useState(false);
    const [dataScale, setdataScale] = useState(false);
    const [highlightFeature, sethighlightFeature] = useState(null);
    const [openAssist, setOpenAssist] = useState(false);
    const [demoColorRamp, setDemoColorRamp] = useState([1, 1, 1, 1, 1]);
    const [demoLegendBins, setDemoLegendBins] = useState([1, [1, 1, 1, 1, 1]]);
    const [selectedCoord, setSelectedCoord] = useState([]);

    // map hooks

    // map starting position and view state constraints
    // Map Viewport settings
    const zoomMin = 10.5;
    const zoomMax = 13;

    const [viewState, setViewState] = useState({
        longitude: -73.9,
        latitude: 40.7131,
        zoom: 10,
        minZoom: zoomMin,
        maxZoom: zoomMax,
        pitch: 0,
        bearing: 0,
    });

    const [mapSelection, setMapSelection] = useState([]);
    const [zoomToggle, setzoomToggle] = useState(1);
    const [inverseZoomToggle, setinverseZoomToggle] = useState(1);
    const [handleLegend, sethandleLegend] = useState(0);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        for (let pair of queryParams.entries()) {
            switch (pair[0]) {
                case "swM":
                    setShowMap(pair[1] === "true");
                    break;
                case "swT":
                    setShowToggle(pair[1] === "true");
                    break;
                case "sdC":
                    setSelectedChapter(parseInt(pair[1]));
                    break;
                case "sdI":
                    setSelectedIssue(parseInt(pair[1]));
                    break;
                case "sdS":
                    setSelectedSpecificIssue(parseInt(pair[1]));
                    break;
                case "ctS":
                    setCommunitySearch(pair[1]);
                    break;
                case "cpS":
                    setCompareSearch(pair[1]);
                    break;
                case "b":
                    setBoundary(pair[1]);
                    break;
                case "d":
                    setDemographic(pair[1]);
                    break;
                case "swD":
                    setShowDemographics(pair[1] === "true");
                    break;
                case "mI":
                    setMoreIssues(
                        JSON.parse(pair[1]).map((item) => {
                            return parseInt(item);
                        })
                    );
                    setMoreIssuesLength(
                        JSON.parse(pair[1]).map((item) => {
                            return parseInt(item);
                        }).length
                    );
                    break;
                case "mD":
                    setMapDemographics(pair[1] === "true");
                    break;
                case "aC":
                    setAddCompare(pair[1] === "true");
                    break;
            }
        }
    }, []);


    useEffect(() => {
        // console.log("HERE ARE THE STATES")
        // console.log("selectedChapter ", selectedChapter)
        // console.log("selectedIssue ", selectedIssue)
        // console.log("selectedSpecficIssue ", selectedSpecificIssue)
        // console.log("showMap ", showMap)
        // console.log("show toggle ", showToggle)
        // console.log("community search ", communitySearch)
        // console.log("compare search ", compareSearch)
        // console.log("boundary ", boundary)
        // console.log("selectedAbout ", selectedAbout)
        // console.log("demographic", demographic)
        // console.log("legendBins ", legendBins)
        // console.log("colorRamps", colorRamps)
        // console.log("selectedCoord", selectedCoord)
        // console.log("-------------------------------------------")


        /* if (!selectedSpecificIssue) {
                 setSelectedIssue(1)
                 setSelectedSpecificIssue(1)
             }
             if (!selectedSpecificIssue) {
                 setSelectedSpecificIssue(1)
             }*/

        const params = [];

        if (showMap !== null) params.push(`swM=${showMap.toString()}`);
        if (showToggle !== null) params.push(`swT=${showToggle.toString()}`);
        if (communitySearch !== null) params.push(`ctS=${communitySearch}`);
        if (compareSearch !== null) params.push(`cpS=${compareSearch}`);
        if (selectedChapter !== null)
            params.push(`sdC=${selectedChapter.toString()}`);
        if (selectedIssue !== null) params.push(`sdI=${selectedIssue.toString()}`);
        if (selectedSpecificIssue !== null)
            params.push(`sdS=${selectedSpecificIssue.toString()}`);
        if (boundary !== null) params.push(`b=${boundary.toString()}`);
        if (demographic !== null) params.push(`d=${demographic.toString()}`);
        if (moreIssues.length > 0) params.push(`mI=[${moreIssues.toString()}]`);
        if (showDemographics !== null)
            params.push(`swD=${showDemographics.toString()}`);
        if (mapDemographics !== null)
            params.push(`mD=${mapDemographics.toString()}`);
        if (addCompare !== null) params.push(`aC=${addCompare.toString()}`);

        let path = window.location.href.split("?")[0];
        path = path.concat("?");
        params.map((param) => {
            path = path.concat("&", param);
        });

        if ("undefined" !== typeof window.history.pushState) {
            window.history.replaceState(null, "", path);
        } else {
            window.location.assign(path);
        }

        if ((selectedChapter === 3 && communitySearch) || selectedChapter === 2) {
            setShowToggle(true);
        }

        if (selectedChapter === 3 && !communitySearch) {
            setShowMap(false);
        }
    });

    useEffect(() => {
        if (selectedSpecificIssue) {
            setSelectedIssue(
                issues.specific_issues_data[selectedSpecificIssue].issue_type_ID
            );
        }
    }, [selectedSpecificIssue]);

    useEffect(() => {
        if (selectedSpecificIssue) {
            if (!moreIssues.includes(selectedSpecificIssue)) {
                let newMore = moreIssues
                newMore.push(selectedSpecificIssue)
                setMoreIssues(newMore)
                setMoreIssuesLength(moreIssuesLength + 1)
            }
        }
    }, [selectedSpecificIssue]);


    useEffect(() => {
        window.addEventListener("mouseup", () => {
            setMouseDown(false)
        })
        return () => {
            window.removeEventListener('keydown', () => {
                setMouseDown(false);
            })
        };
    }, [])

    const expandAssist = () => {
        let div = document.getElementById("assistive-touch-div")
        let offset = div.getBoundingClientRect();
        const offsetLeft = offset.left;
        const offsetTop = offset.top;
        setAssistivePos({ x: offsetLeft, y: offsetTop })

        div.style.top = ``;
        div.style.left = ``;
        div.style.transform = `translate(0px, 0px)`;


    }


    const collapseAssist = () => {
        let div = document.getElementById("assistive-touch-div");
        const offsetLeft = assistivePos.x;
        const offsetTop = assistivePos.y;
        div.style.transform = `translate(${offsetLeft}px, ${offsetTop}px)`;
        div.style.top = ``;
        div.style.left = ``;

    }


    const PRESS_TIME_UNTIL_DRAG_MS = 250;
    const [isDragging, setDragging] = useState(false)
    const [assistivePos, setAssistivePos] = useState({ x: 0, y: 0 })
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [mouseDown, setMouseDown] = useState(false);
    const [mouseMove, setMouseMove] = useState(false);

    const [initialPos,   setInitialPos] = useState(null);
    const [initialSize, setInitialSize] = useState(null);

    const initial = (e) => {
        e.preventDefault()
        console.log("on drag")
        let resizable = document.getElementById('resizeable-map');
        setInitialPos(e.clientX);
        setInitialSize(resizable.offsetWidth);
        console.log("intial pos and size ", initialPos, initialSize)

    }

    const resize = (e) => {
        e.preventDefault()
        console.log("dragging")
        let resizable = document.getElementById('resizeable-map');

        resizable.style.width = `${initialSize + e.clientX}px`;

    }


    return (
        <>
            {useWindowSize().width >= 576 ?
                <Container fluid className={"h-100 p-0 m-0 d-flex flex-row"}>
                    <Nav
                        setShowMap={setShowMap}
                        selectedChapter={selectedChapter} setSelectedChapter={setSelectedChapter}
                        selectedIssue={selectedIssue} setSelectedIssue={setSelectedIssue}
                        selectedSpecificIssue={selectedSpecificIssue}
                        setSelectedSpecificIssue={setSelectedSpecificIssue}
                        boundary={boundary} setBoundary={setBoundary}
                        communitySearch={communitySearch} setCommunitySearch={setCommunitySearch}
                        compareSearch={compareSearch} setCompareSearch={setCompareSearch}
                        setMoreIssues={setMoreIssues} setMoreIssuesLength={setMoreIssuesLength}
                        addCompare={addCompare} setAddCompare={setAddCompare}
                        issues={issues} communities={communities} councils={councils}
                        issue_categories={issue_categories}
                        highlightFeature={highlightFeature} sethighlightFeature={sethighlightFeature}
                        selectedCoord={selectedCoord}
                        setSelectedCoord={setSelectedCoord}

                    />

                    <Content
                        showToggle={showToggle} showMap={showMap}
                        selectedChapter={selectedChapter}
                        issues={issues} issue_categories={issue_categories}
                        selectedIssue={selectedIssue} setSelectedIssue={setSelectedIssue}
                        selectedSpecificIssue={selectedSpecificIssue}
                        setSelectedSpecificIssue={setSelectedSpecificIssue}
                        boundary={boundary}
                        setShowMap={setShowMap}
                        communitySearch={communitySearch} setCommunitySearch={setCommunitySearch}
                        compareSearch={compareSearch} setCompareSearch={setCompareSearch}
                        communities={communities} councils={councils}
                        demographic={demographic} setDemographic={setDemographic}
                        selectedAbout={selectedAbout} setSelectedAbout={setSelectedAbout}
                        showDemographics={showDemographics} setShowDemographics={setShowDemographics}
                        moreIssues={moreIssues} setMoreIssues={setMoreIssues}
                        moreIssuesLength={moreIssuesLength} setMoreIssuesLength={setMoreIssuesLength}
                        mapDemographics={mapDemographics} setMapDemographics={setMapDemographics}
                        legendBins={legendBins} colorRamps={colorRamps}
                        toggleUnderperformers={toggleUnderperformers}
                        setToggleUnderperformers={setToggleUnderperformers}
                        toggleTransit={toggleTransit} setToggleTransit={setToggleTransit}
                        toggleWalk={toggleWalk} setToggleWalk={setToggleWalk}
                        toggleBike={toggleBike} setToggleBike={setToggleBike}
                        dataScale={dataScale} setdataScale={setdataScale}
                        demoColorRamp={demoColorRamp} demoLegendBins={demoLegendBins}
                        setDemoColorRamp={setDemoColorRamp} setDemoLegendBins={setDemoLegendBins}
                    />


                    <div className={`${showMap ? "show-map" : "hide-map"} map-container`}>

                        {/*<div className={"map-subcontainer"}>
                            <div className={"individual-maps"}
                                 id={"draggable-map"}
                                 draggable="true"
                                 onDragStart={initial}
                                 onDrag={resize}
                            >*/}
                                <Map
                            issues={issues}
                            selectedIssue={selectedIssue}
                            selectedSpecificIssue={selectedSpecificIssue}
                            boundary={boundary}
                            showDemographics={showDemographics}
                            mapDemographics={mapDemographics}
                            demographic={demographic}
                            legendBins={legendBins}
                            setLegendBins={setLegendBins}
                            colorRamps={colorRamps}
                            setColorRamps={setColorRamps}
                            toggleUnderperformers={toggleUnderperformers}
                            setToggleUnderperformers={setToggleUnderperformers}
                            demoLookup={demoLookup}
                            selectedChapter={selectedChapter}
                            setSelectedChapter={setSelectedChapter}
                            communitySearch={communitySearch}
                            setCommunitySearch={setCommunitySearch}
                            addCompare={addCompare}
                            setAddCompare={setAddCompare}
                            compareSearch={compareSearch}
                            setCompareSearch={setCompareSearch}
                            setShowMap={setShowMap}
                            communities={communities}
                            councils={councils}
                            viewState={viewState}
                            setViewState={setViewState}
                            mapSelection={mapSelection}
                            setMapSelection={setMapSelection}
                            zoomToggle={zoomToggle}
                            setzoomToggle={setzoomToggle}
                            inverseZoomToggle={inverseZoomToggle}
                            setinverseZoomToggle={setinverseZoomToggle}
                            handleLegend={handleLegend}
                            sethandleLegend={sethandleLegend}
                            zoomMin={zoomMin}
                            zoomMax={zoomMax}
                            coordinateLookup={coordinateLookup}
                            setCoordinateLookup={setCoordinateLookup}
                            dataScale={dataScale}
                            setdataScale={setdataScale}
                            highlightFeature={highlightFeature}
                            sethighlightFeature={sethighlightFeature}
                            toggleTransit={toggleTransit}
                            toggleBike={toggleBike}
                            toggleWalk={toggleWalk}
                        />
                            {/*</div>
                            <div className={"wiper"}>
                                HI
                            </div>
                            <div className={"individual-maps"}
                                 id={"resizeable-map"}
                            >
                                <Map
                            issues={issues}
                            selectedIssue={selectedIssue}
                            selectedSpecificIssue={selectedSpecificIssue}
                            boundary={boundary}
                            showDemographics={showDemographics}
                            mapDemographics={mapDemographics}
                            demographic={demographic}
                            legendBins={legendBins}
                            setLegendBins={setLegendBins}
                            colorRamps={colorRamps}
                            setColorRamps={setColorRamps}
                            toggleUnderperformers={toggleUnderperformers}
                            setToggleUnderperformers={setToggleUnderperformers}
                            demoLookup={demoLookup}
                            selectedChapter={selectedChapter}
                            setSelectedChapter={setSelectedChapter}
                            communitySearch={communitySearch}
                            setCommunitySearch={setCommunitySearch}
                            addCompare={addCompare}
                            setAddCompare={setAddCompare}
                            compareSearch={compareSearch}
                            setCompareSearch={setCompareSearch}
                            setShowMap={setShowMap}
                            communities={communities}
                            councils={councils}
                            viewState={viewState}
                            setViewState={setViewState}
                            mapSelection={mapSelection}
                            setMapSelection={setMapSelection}
                            zoomToggle={zoomToggle}
                            setzoomToggle={setzoomToggle}
                            inverseZoomToggle={inverseZoomToggle}
                            setinverseZoomToggle={setinverseZoomToggle}
                            handleLegend={handleLegend}
                            sethandleLegend={sethandleLegend}
                            zoomMin={zoomMin}
                            zoomMax={zoomMax}
                            coordinateLookup={coordinateLookup}
                            setCoordinateLookup={setCoordinateLookup}
                            dataScale={dataScale}
                            setdataScale={setdataScale}
                            highlightFeature={highlightFeature}
                            sethighlightFeature={sethighlightFeature}
                            toggleTransit={toggleTransit}
                            toggleBike={toggleBike}
                            toggleWalk={toggleWalk}
                        />
                            </div>
                        </div>*/}
                    </div>
                </Container>
                :
                <Container>
                    <div
                        id={"menu-container"}
                        className={"menu-container"}>
                        {/* <Draggable bounds="body"
                                   onStart={() =>
                                   {setTimeout(() => {setDragging(true)}, PRESS_TIME_UNTIL_DRAG_MS)}}
                                   onDrag={e => {
                                       if (isDragging === true) {
                                           e.preventDefault()
                                       }
                                   }}
                                   onStop= {() => setTimeout(() => {setDragging(false)}, PRESS_TIME_UNTIL_DRAG_MS)}
                        >*/}
                        <div
                            id={`assistive-touch-div`}
                            className={`assistive-touch ${openAssist ? "assistive-touch-grow" : "assistive-touch-shrink"}`}

                            onMouseDown={(e) => {
                                e.preventDefault()
                                if (!openAssist) {
                                    setMouseDown(true)
                                    let div = document.getElementById("assistive-touch-div")
                                    setOffset({ x: div.offsetLeft - e.clientX, y: div.offsetTop - e.clientY });
                                }
                            }}

                            onMouseMove={(e) => {
                                e.preventDefault()
                                if (mouseDown) {
                                    setMouseMove(true)
                                    let div = document.getElementById("assistive-touch-div")
                                    const mousePos = { x: e.clientX, y: e.clientY };
                                    // div.style.transform = `translate(0px, 0px)`;;
                                    div.style.left = (mousePos.x + offset.x) + 'px';
                                    div.style.top = (mousePos.y + offset.y) + 'px';
                                }
                            }}

                            onMouseUp={(e) => {

                                setMouseDown(false)
                                if (!mouseMove) {
                                    if (!openAssist) {
                                        expandAssist()
                                    } else {
                                        collapseAssist()
                                    }
                                    setOpenAssist(!openAssist)
                                }
                                setMouseMove(false)
                            }
                            }
                        >
                            {!openAssist &&
                                <>
                                    <div>
                                        <div className={"assistive-touch-text"}>Spatial</div>
                                        <div className={"assistive-touch-text"}>Equity</div>
                                    </div>
                                    <div className={"assistive-touch-text"}>
                                        <svg width="37" height="12" viewBox="0 0 37 12" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M29.2138 1.3713C28.4725 1.78541 27.8874 2.38783 27.4593 3.17095C27.0276 3.96045 26.818 4.90695 26.818 6C26.818 7.08943 27.0242 8.03376 27.4488 8.82283L27.4492 8.82357C27.874 9.60676 28.4556 10.2108 29.1936 10.6283L29.1941 10.6285C29.9332 11.0446 30.7679 11.25 31.6915 11.25C32.3523 11.25 32.9528 11.1529 33.4892 10.954L33.49 10.9537C34.0228 10.754 34.4861 10.4824 34.8765 10.1368L34.8766 10.1367C35.2661 9.79166 35.5777 9.39909 35.809 8.95916C36.0423 8.51834 36.1893 8.05824 36.2481 7.57994L36.2825 7.30069L36.0011 7.29943L33.8784 7.28993L33.6697 7.28899L33.6315 7.49408C33.5881 7.72664 33.5111 7.92816 33.4032 8.10189L33.4017 8.10436C33.2953 8.28007 33.1617 8.42887 33 8.55214C32.838 8.67244 32.6501 8.76587 32.4337 8.83093L32.4328 8.8312C32.2201 8.89605 31.9848 8.92966 31.7254 8.92966C31.2665 8.92966 30.8728 8.81991 30.5358 8.60707C30.202 8.39621 29.9348 8.08072 29.7386 7.64665C29.5471 7.2156 29.4456 6.66986 29.4456 6C29.4456 5.34986 29.5469 4.81302 29.739 4.38108L29.7392 4.38051C29.9325 3.94315 30.1987 3.62263 30.5335 3.4056L30.5347 3.4048C30.8702 3.18453 31.2686 3.07034 31.74 3.07034C32.0009 3.07034 32.2377 3.10666 32.4522 3.17679L32.4532 3.17709C32.6724 3.2478 32.8617 3.34826 33.0238 3.47709C33.1855 3.60555 33.3179 3.7612 33.4219 3.94586L33.4227 3.94726C33.5248 4.12577 33.5949 4.33429 33.6298 4.5765L33.6607 4.79087H33.8772H36H36.2819L29.3361 1.58935M29.2138 1.3713C29.214 1.37122 29.2141 1.37115 29.2142 1.37108L29.3361 1.58935M29.2138 1.3713C29.2137 1.37137 29.2136 1.37143 29.2135 1.37151L29.3361 1.58935M29.2138 1.3713C29.9524 0.955605 30.7803 0.75 31.6915 0.75C32.2896 0.75 32.8488 0.832393 33.3672 0.999607M29.3361 1.58935C30.034 1.19645 30.8191 1 31.6915 1C32.2666 1 32.7997 1.07921 33.2908 1.23764M33.3672 0.999607C33.3672 0.999594 33.3672 0.999582 33.3671 0.99957L33.2908 1.23764M33.3672 0.999607C33.8882 1.16659 34.3531 1.41155 34.7594 1.73553M33.3672 0.999607C33.3674 0.999643 33.3675 0.99968 33.3676 0.999716L33.2908 1.23764M33.2908 1.23764L34.7594 1.73553M36 7.54943C35.9897 7.63326 35.9765 7.71654 35.9604 7.79925L35.9989 7.79943L36 7.54943ZM36 7.54943L35.7519 7.51892C35.7507 7.52872 35.7494 7.53852 35.7481 7.5483L36 7.54943ZM36 4.54087H35.7481C35.7494 4.5508 35.7506 4.56076 35.7518 4.57073L36 4.54087ZM36 4.54087V4.29087H35.9635C35.9776 4.37278 35.9898 4.45611 36 4.54087ZM34.7594 1.73553C34.7593 1.73547 34.7592 1.73541 34.7591 1.73534L34.6044 1.93133L34.7601 1.73614C34.7599 1.73593 34.7596 1.73573 34.7594 1.73553ZM34.7594 1.73553C35.1674 2.05775 35.4991 2.45279 35.7537 2.91841M34.7594 1.73553L35.7537 2.91841M35.7537 2.91841C35.7536 2.91821 35.7535 2.918 35.7534 2.91779L35.5347 3.03897L35.7541 2.91903C35.754 2.91883 35.7539 2.91862 35.7537 2.91841ZM9.552 1.13308V0.88308H9.302L7.21318 0.88308H6.96318V1.13308L6.96318 6.58618L3.04648 0.989734L2.97184 0.88308H2.84166L1 0.88308H0.75V1.13308L0.75 10.8669V11.1169H1H3.09852H3.34852V10.8669L3.34852 5.42598L7.28508 11.011L7.35978 11.1169H7.48942H9.302H9.552V10.8669L9.552 1.13308ZM13.6129 0.88308H13.1807L13.3962 1.25775L16.9833 7.49264V10.8669V11.1169H17.2333L19.3172 11.1169H19.5672V10.8669V7.49264L23.1542 1.25775L23.3698 0.88308H22.9375L20.587 0.88308H20.4379L20.367 1.01431L18.2752 4.88864L16.1835 1.01431L16.1126 0.88308H15.9635L13.6129 0.88308Z"
                                                fill="white" stroke="white" strokeWidth="0.5" />
                                        </svg>

                                    </div>

                                </>}
                            {openAssist &&
                                <Nav
                                    setShowMap={setShowMap}
                                    selectedChapter={selectedChapter} setSelectedChapter={setSelectedChapter}
                                    selectedIssue={selectedIssue} setSelectedIssue={setSelectedIssue}
                                    selectedSpecificIssue={selectedSpecificIssue}
                                    setSelectedSpecificIssue={setSelectedSpecificIssue}
                                    boundary={boundary} setBoundary={setBoundary}
                                    communitySearch={communitySearch} setCommunitySearch={setCommunitySearch}
                                    compareSearch={compareSearch} setCompareSearch={setCompareSearch}
                                    setMoreIssues={setMoreIssues} setMoreIssuesLength={setMoreIssuesLength}
                                    addCompare={addCompare} setAddCompare={setAddCompare}
                                    issues={issues} communities={communities} councils={councils}
                                    issue_categories={issue_categories}

                                />
                            }

                        </div>

                    </div>
                </Container>
            }
        </>
    );
}

export default App;

function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });
    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}