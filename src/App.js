import "./App.css";
import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";

import Container from "react-bootstrap/Container";

import Nav from "./components/Nav";
import Content from "./components/Content";
import Map from "./components/Map";
import MobileNav from "./components/Mobile Components/MobileNav";
import CitywideData from "./components/Mobile Components/CitywideData";

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
  //const [legendBins, setLegendBins] = useState([1, [1, 1, 1, 1, 1]]);
  const [colorRamps, setColorRamps] = useState(null);
  const [toggleUnderperformers, setToggleUnderperformers] = useState(false);
  const [coordinateLookup, setCoordinateLookup] = useState(null);
  const location = useLocation();
  const [toggleTransit, setToggleTransit] = useState(true);
  const [toggleBike, setToggleBike] = useState(false);
  const [toggleWalk, setToggleWalk] = useState(false);
  const [dataScale, setdataScale] = useState(false);
  const [highlightFeature, sethighlightFeature] = useState(null);
  const [openAssist, setOpenAssist] = useState(false);
  const [demoColorRamp, setDemoColorRamp] = useState(
    [255, 0, 0],
    [0, 255, 0],
    [0, 0, 255],
    [255, 255, 0],
    [255, 0, 255]
  );
  const [demoLegendBins, setDemoLegendBins] = useState([1, 1, 1, 1, 1]);
  const [selectedCoord, setSelectedCoord] = useState([]);
  const [selectedCompareCoord, setselectedCompareCoord] = useState([]);

  // console.log(demoColorRamp)
  // map hooks

  // map starting position and view state constraints
  // Map Viewport settings
  const zoomMin = 10;
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
        case "cR":
          setColorRamps(pair[1]);
          break;
        case "tU":
          setToggleUnderperformers(pair[1] === "true");
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
    // console.log("add Compare ", addCompare)
    // console.log("community search ", communitySearch)
    // console.log("compare search ", compareSearch)
    // console.log("boundary ", boundary)
    // console.log("selectedAbout ", selectedAbout)
    // console.log("demographic", demographic)
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
    if (colorRamps !== null) params.push(`cR=${colorRamps}`);
    if (toggleUnderperformers !== null)
      params.push(`tU=${toggleUnderperformers}`);

    // TODO: add colorRamps and legendBins
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

    /*if (selectedChapter === 3 && !communitySearch) {
            setShowMap(false);
        }*/
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
        let newMore = moreIssues;
        newMore.push(selectedSpecificIssue);
        setMoreIssues(newMore);
        setMoreIssuesLength(moreIssuesLength + 1);
      }
    }
  }, [selectedSpecificIssue]);

  const [assistivePos, setAssistivePos] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseMove, setMouseMove] = useState(false);

  useEffect(() => {
    console.log("useEffect triggerted");
    window.addEventListener("mouseup", () => {
      setMouseDown(false);
    });

    /*window.addEventListener("mousemove", (e) => {
            e.preventDefault()
            console.log("mouseDOwn in event listener is ", mouseDown)
            if (mouseDown) {
                setMouseMove(true)
                let div = document.getElementById("assistive-touch-div")
                const mousePos = {x: e.clientX, y: e.clientY};
                // div.style.transform = `translate(0px, 0px)`;;
                div.style.left = (mousePos.x + offset.x) + 'px';
                div.style.top = (mousePos.y + offset.y) + 'px';
            }
    })*/

    return () => {
      window.removeEventListener("mouseup", () => {
        setMouseDown(false);
      });

      /*window.removeEventListener("mousemove", (e) => {
            e.preventDefault()
            if (mouseDown) {
                setMouseMove(true)
                let div = document.getElementById("assistive-touch-div")
                const mousePos = {x: e.clientX, y: e.clientY};
                // div.style.transform = `translate(0px, 0px)`;;
                div.style.left = (mousePos.x + offset.x) + 'px';
                div.style.top = (mousePos.y + offset.y) + 'px';
            }
    })*/
    };
  }, []);

  const expandAssist = () => {
    let div = document.getElementById("assistive-touch-div");
    let offset = div.getBoundingClientRect();
    const offsetLeft = offset.left;
    const offsetTop = offset.top;
    setAssistivePos({ x: offsetLeft, y: offsetTop });

    div.style.top = ``;
    div.style.left = ``;

    div.style.transition =
      "height 0.5s 0.2s, width 0.5s 0.2s, background-color 1s, color 1s";
    div.style.transform = `translate(${offsetLeft}px, ${offsetTop}px)`;
    setTimeout(() => {
      div.style.transition =
        "transform 0.5s, height 0.5s 0.2s, width 0.5s 0.2s, background-color 1s, color 1s";
      div.style.transform = `translate(0px, 0px)`;
    }, 50);
  };

  const collapseAssist = () => {
    let div = document.getElementById("assistive-touch-div");
    const offsetLeft = assistivePos.x;
    const offsetTop = assistivePos.y;
    div.style.transform = `translate(${offsetLeft}px, ${offsetTop}px)`;
    div.style.top = ``;
    div.style.left = ``;
  };

  const [leftWidth, setLeftWidth] = useState(0);

  const mouseMoveHandler = function (e) {
    const resizer = document.getElementById("wiper");
    const leftSide = resizer.previousElementSibling;
    const rightSide = resizer.nextElementSibling;
    // How far the mouse has been moved
    const dx = e.clientX - leftWidth - window.innerWidth / 2;

    const newLeftWidth =
      ((leftWidth + dx) * 100) /
      resizer.parentNode.getBoundingClientRect().width;
    // console.log("newLeftWidth ", newLeftWidth)
    leftSide.style.width = `${newLeftWidth}%`;
    leftSide.style.userSelect = "none";
    leftSide.style.pointerEvents = "none";

    rightSide.style.userSelect = "none";
    rightSide.style.pointerEvents = "none";

    setLeftWidth(newLeftWidth);
  };

  const mouseUpHandler = function () {
    const resizer = document.getElementById("wiper");
    const leftSide = resizer.previousElementSibling;
    const rightSide = resizer.nextElementSibling;
    resizer.style.removeProperty("cursor");
    document.body.style.removeProperty("cursor");

    leftSide.style.removeProperty("user-select");
    leftSide.style.removeProperty("pointer-events");

    rightSide.style.removeProperty("user-select");
    rightSide.style.removeProperty("pointer-events");

    // Remove the handlers of `mousemove` and `mouseup`
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  };

  return (
    <>
      {useWindowSize().width >= 576 ? (
        <Container fluid className={"h-100 p-0 m-0 d-flex flex-row"}>
          <Nav
            setShowMap={setShowMap}
            selectedChapter={selectedChapter}
            setSelectedChapter={setSelectedChapter}
            selectedIssue={selectedIssue}
            setSelectedIssue={setSelectedIssue}
            selectedSpecificIssue={selectedSpecificIssue}
            setSelectedSpecificIssue={setSelectedSpecificIssue}
            boundary={boundary}
            setBoundary={setBoundary}
            communitySearch={communitySearch}
            setCommunitySearch={setCommunitySearch}
            compareSearch={compareSearch}
            setCompareSearch={setCompareSearch}
            setMoreIssues={setMoreIssues}
            setMoreIssuesLength={setMoreIssuesLength}
            addCompare={addCompare}
            setAddCompare={setAddCompare}
            issues={issues}
            communities={communities}
            councils={councils}
            issue_categories={issue_categories}
            highlightFeature={highlightFeature}
            sethighlightFeature={sethighlightFeature}
            selectedCoord={selectedCoord}
            setSelectedCoord={setSelectedCoord}
            selectedCompareCoord={selectedCompareCoord}
            setselectedCompareCoord={setselectedCompareCoord}
            isMobile={false}
          />

          <Content
              setSelectedChapter={setSelectedChapter}
            showToggle={showToggle}
            showMap={showMap}
            selectedChapter={selectedChapter}
            issues={issues}
            issue_categories={issue_categories}
            selectedIssue={selectedIssue}
            setSelectedIssue={setSelectedIssue}
            selectedSpecificIssue={selectedSpecificIssue}
            setSelectedSpecificIssue={setSelectedSpecificIssue}
            boundary={boundary}
            setShowMap={setShowMap}
            communitySearch={communitySearch}
            setCommunitySearch={setCommunitySearch}
            compareSearch={compareSearch}
            setCompareSearch={setCompareSearch}
            communities={communities}
            councils={councils}
            demographic={demographic}
            setDemographic={setDemographic}
            selectedAbout={selectedAbout}
            setSelectedAbout={setSelectedAbout}
            showDemographics={showDemographics}
            setShowDemographics={setShowDemographics}
            moreIssues={moreIssues}
            setMoreIssues={setMoreIssues}
            moreIssuesLength={moreIssuesLength}
            setMoreIssuesLength={setMoreIssuesLength}
            mapDemographics={mapDemographics}
            setMapDemographics={setMapDemographics}
            colorRamps={colorRamps} //legendBins={legendBins}
            toggleUnderperformers={toggleUnderperformers}
            setToggleUnderperformers={setToggleUnderperformers}
            toggleTransit={toggleTransit}
            setToggleTransit={setToggleTransit}
            toggleWalk={toggleWalk}
            setToggleWalk={setToggleWalk}
            toggleBike={toggleBike}
            setToggleBike={setToggleBike}
            dataScale={dataScale}
            setdataScale={setdataScale}
            demoColorRamp={demoColorRamp}
            demoLegendBins={demoLegendBins}
            setDemoColorRamp={setDemoColorRamp}
            setDemoLegendBins={setDemoLegendBins}
            setColorRamps={setColorRamps}
            handleLegend={handleLegend}
            zoomToggle={zoomToggle}
            demoLookup={demoLookup[demographic]}
          />

          <div className={`${showMap ? "show-map" : "hide-map"} map-container`}>
            <div className={"map-subcontainer"}>
              <div
                className={"individual-maps"}
                id={mapDemographics ? "left-map" : "left-map-alone"}
              >
                <Map
                  issues={issues}
                  selectedIssue={selectedIssue}
                  selectedSpecificIssue={selectedSpecificIssue}
                  boundary={boundary}
                  showDemographics={showDemographics}
                  mapDemographics={mapDemographics}
                  demographic={demographic}
                  //legendBins={legendBins}
                  //setLegendBins={setLegendBins}
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
                  setDemoLegendBins={setDemoLegendBins}
                  setDemoColorRamp={setColorRamps}
                  selectedCoord={selectedCoord}
                  selectedCompareCoord={selectedCompareCoord}
                />
              </div>
              {mapDemographics && (
                <>
                  <div
                    className={"wiper"}
                    id={"wiper"}
                    onMouseDown={(e) => {
                      // Get the current mouse position
                      const resizer = document.getElementById("wiper");
                      const leftSide = resizer.previousElementSibling;

                      setLeftWidth(leftSide.getBoundingClientRect().width);
                      console.log(
                        "left width is ",
                        leftSide.getBoundingClientRect().width
                      );

                      // Attach the listeners to `document`
                      document.addEventListener("mousemove", mouseMoveHandler);
                      document.addEventListener("mouseup", mouseUpHandler);
                    }}
                  ></div>

                  <div className={"individual-maps"} id={"right-map"}>
                    <Map
                      issues={issues}
                      selectedIssue={selectedIssue}
                      selectedSpecificIssue={selectedSpecificIssue}
                      boundary={boundary}
                      showDemographics={showDemographics}
                      mapDemographics={mapDemographics}
                      demographic={demographic}
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
                      demoColorRamp={demoColorRamp}
                      demoLegendBins={demoLegendBins}
                      setDemoColorRamp={setDemoColorRamp}
                      setDemoLegendBins={setDemoLegendBins}
                      selectedCoord={selectedCoord}
                      selectedCompareCoord={selectedCompareCoord}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </Container>
      ) : (
        <Container className={"p-0"}>
          <CitywideData/>
        </Container>
      )}
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
