import './App.css';
import React, { useEffect, useMemo, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import Nav from './components/Nav';
import Content from './components/Content';
import Map from './components/Map';
/*import BaseMap from "./components/BaseMap";*/
import MobileNav from './components/Mobile Components/MobileNav';
import CitywideData from './components/Mobile Components/CitywideData';
import { max, min } from 'd3-array';

import _ISSUE_CATEGORIES from './texts/issue_categories.json';
import _ISSUES from './texts/issues.json';
import _COMMUNITIES from './texts/communities.json';
import _COUNCILS from './texts/councildistricts.json';
import _DEMOGRAPHICS from './texts/demographics.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import _COUNCIL_DISTRICTS from './data/council_districts.json';
import _COMMUNITY_BOARDS from './data/community_boards.json';
import _NEIGHBORHOODS from './data/neighborhoods.json';

import Protect from './utils/react-app-protect';
import MobileCommunityProfile from './components/Mobile Components/MobileCommunityProfile';

let siteProtection =
  process.env.REACT_APP_SITE_PROTECTION == 'false'
    ? false
    : process.env.REACT_APP_SITE_PROTECTION == 'true'
    ? true
    : undefined;
let sha512 = process.env.REACT_APP_SITE_PWD;

// map data imports

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
  const [boundary, setBoundary] = useState('council');
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
  const [searchSource, setSearchSource] = useState('search');
  const [selectedCoord, setSelectedCoord] = useState([]);
  const [selectedCompareCoord, setselectedCompareCoord] = useState([]);
  const [badSearch, setBadSearch] = useState([0, 0]);
  const [errorCode, setErrorCode] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [info, setInfo] = useState(null);
  const [userPoints, setUserPoints] = useState([], []);

  const [communityPinned, setCommunityPinned] = useState([]);
  const [councilPinned, setCouncilPinned] = useState([]);
  const [collapseMap, setCollapseMap] = useState(false);
  const [collapseMapToggle, setCollapseMapToggle] = useState(false);

  const [adultAsthma, setAdultAsthma] = useState(true);

  // console.log(collapseMap)

  // console.log(demoColorRamp)
  // map hooks

  // map starting position and view state constraints

  const [viewState, setViewState] = useState({
    longitude: -74,
    latitude: 40.7131,
    zoom: 9.5,
  });

  const [mapSelection, setMapSelection] = useState([], []);
  const [zoomToggle, setzoomToggle] = useState(0);
  const [handleLegend, sethandleLegend] = useState(0);


  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    let createCoords = [[], []];
    let createViewState = {
      latitude: 40.7131,
      longitude: -74,
      zoom: 9.5,
    };
    for (let pair of queryParams.entries()) {
      switch (pair[0]) {
        case 'swM':
          setShowMap(pair[1] === 'true');
          break;
        case 'swT':
          setShowToggle(pair[1] === 'true');
          break;
        case 'sdC':
          setSelectedChapter(parseInt(pair[1]));
          break;
        case 'sdI':
          setSelectedIssue(parseInt(pair[1]));
          break;
        case 'sdS':
          setSelectedSpecificIssue(parseInt(pair[1]));
          break;
        case 'ctS':
          setCommunitySearch(pair[1]);
          const selectedBoundary =
            boundary === 'council' ? _COUNCIL_DISTRICTS : _COMMUNITY_BOARDS;
          for (const [index, element] of selectedBoundary.features.entries()) {
            if (
              element.properties.CDTA2020?.toString() === pair[1] ||
              element.properties.CounDist?.toString() === pair[1]
            ) {
              setSelectedCoord([
                element.properties.X_Cent,
                element.properties.Y_Cent,
              ]);
              break;
            }
          }
          break;
        case 'cpS':
          setCompareSearch(pair[1]);
          break;
        case 'b':
          setBoundary(pair[1]);
          break;
        case 'd':
          setDemographic(pair[1]);
          break;
        case 'swD':
          setShowDemographics(pair[1] === 'true');
          break;
        case 'mI':
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
        case 'mD':
          setMapDemographics(pair[1] === 'true');
          break;
        case 'aC':
          setAddCompare(pair[1] === 'true');
          break;
        case 'cR':
          setColorRamps(pair[1]);
          break;
        case 'ctC':
          createCoords = [
            JSON.parse(pair[1]).map((item) => {
              return parseFloat(item.toString());
            }),
            createCoords[1],
          ];
          setSelectedCoord(JSON.parse(pair[1]).map((item) => {
              return parseFloat(item.toString());
            }))
          setselectedCompareCoord(createCoords[1])
          break;

        case 'cpC':
          createCoords = [
            createCoords[0],
            JSON.parse(pair[1]).map((item) => {
              return parseFloat(item.toString());
            }),
          ];
          setSelectedCoord(createCoords[0])
          setselectedCompareCoord(JSON.parse(pair[1]).map((item) => {
              return parseFloat(item.toString());
            }))
          break;

        case 'lat':
          createViewState.latitude = parseFloat(pair[1].toString());
          break;
        case 'lon':
          createViewState.longitude = parseFloat(pair[1].toString());
          break;
        case 'z':
          createViewState.zoom = parseFloat(pair[1].toString());
          break;
        case 'sS':
          setSearchSource(pair[1]);
          break

        /*  case "uP":
                            console.log("pair[1] ", pair[1])
                            setUserPoints(
                                JSON.parse(pair[1]).map((item) => {
                                    return parseInt(item);
                                })
                            )*/
      }
    }
    setViewState(createViewState);
    setUserPoints(createCoords);
  }, []);

 /* useEffect(()=>{
    console.log("user points ", userPoints)
  })*/

  const selectedBoundary = useMemo(() => {
    if (boundary === 'council') {
      return _COUNCIL_DISTRICTS;
    } else if (boundary === 'community') {
      return _COMMUNITY_BOARDS;
    } else {
      return _COMMUNITY_BOARDS;
    }
  }, [boundary]);

  const getColorRamp = () => {
    // console.log("get color ramp triggered")
    let selectedRamp;
    if (selectedSpecificIssue) {
      // console.log("case 1 ", selectedSpecificIssue)
      selectedRamp =
        issues.specific_issues_data[selectedSpecificIssue].issue_type_ID === 1
          ? 'health'
          : issues.specific_issues_data[selectedSpecificIssue].issue_type_ID ===
            2
          ? 'env'
          : issues.specific_issues_data[selectedSpecificIssue].issue_type_ID ===
            3
          ? 'infra'
          : 'troubleshoot';
    } else {
      // console.log("case 2 ", selectedIssue)
      selectedRamp =
        selectedIssue === 1
          ? 'health'
          : selectedIssue === 2
          ? 'env'
          : selectedIssue === 3
          ? 'infra'
          : 'troubleshoot';
    }
    return selectedRamp;
  };

  useEffect(() => {
    setColorRamps(getColorRamp());
  }, [
    selectedSpecificIssue,
    selectedIssue,
    zoomToggle,
    selectedBoundary,
    toggleTransit,
    toggleBike,
    toggleWalk,
  ]);

  useEffect(() => {
    // SELECT BOUNDARY ------------------------------------------------------------
    // toggle between council districts and community boards
    const binSize = 5;

    // SELECT BOUNDARY END --------------------------------------------------------

    // METRIC CONFIG -----------------------------------------------------

    // select metric to display
    let selectedMetric;
    let metricGoodBad; // Declare whether metric is good or bad at high values (for hatching areas)

    if (selectedSpecificIssue != null) {
      if (
        typeof selectedSpecificIssue == 'number' &&
        isNaN(selectedSpecificIssue) === false
      ) {
        selectedMetric =
          issues.specific_issues_data[selectedSpecificIssue].json_id;

        metricGoodBad =
          issues.specific_issues_data[selectedSpecificIssue].good_or_bad;
      }
    }

    // 01 CREATE METRIC COLOR RAMPS -------------------------------------------------------

    //pick scale for legend bins
    const mapScale =
      handleLegend == 0
        ? _NEIGHBORHOODS
        : handleLegend == 1 && selectedBoundary == _COUNCIL_DISTRICTS
        ? _COUNCIL_DISTRICTS
        : _COMMUNITY_BOARDS;

    //variables for scale thresholds

    // pick color ramp for metrics and have default to avoid errors

    const selectedMetricArray = []; // a clean array of values for the color ramp with no NaN and no Null values
    const binList = []; // derived from the selectedMetricArray array, this is the list of bins for the legend

    // 01.1 get an array of all the values for the selected metric
    for (let i = 0; i < mapScale.features.length; i++) {
      let floatValue = parseFloat(
        mapScale.features[i].properties[selectedMetric]
      );
      if (isNaN(floatValue) === false) {
        if (
          boundary === 'council' ||
          (zoomToggle == 1 &&
            boundary === 'community' &&
            mapScale.features[i].properties.Data_YN === 'Y') ||
          (zoomToggle == 0 && mapScale.features[i].properties.AnsUnt_YN === 'Y')
        ) {
          selectedMetricArray.push(floatValue);
        }
      }
    }

    // create a new sorted array for the quantile, but dont modify existing array
    const sortedSelectedMetricArray = [...selectedMetricArray].sort(function (
      a,
      b
    ) {
      return a - b;
    });

    const uniqueValueArray = [...new Set(sortedSelectedMetricArray)];

    // 01.2 break the metric array into bins and get the bin list
    for (let i = 0; i < binSize; i++) {
      if (dataScale === 'equal') {
        const threshold =
          (max(selectedMetricArray) - min(selectedMetricArray)) / (binSize + 1);
        binList.push(
          Math.round((threshold * (i + 1) + min(selectedMetricArray)) * 100) /
            100
        );
      } else {
        const interval = Math.floor(
          ((uniqueValueArray.length - 1) / binSize) * (i + 1)
        );
        // quantile breaks
        binList.push(uniqueValueArray[interval]);
      }
    }

    // console.log("legendBins ", uniqueValueArray[0], binList)

    setInfo({
      binList: binList,
      uniqueValueArray: uniqueValueArray,
      sortedSelectedMetricArray: sortedSelectedMetricArray,
      selectedMetricArray: selectedMetricArray,
      selectedBoundary: selectedBoundary,
      selectedMetric: selectedMetric,
      metricGoodorBad: metricGoodBad,
      mapScale: mapScale,
    });

    // console.log("info ", info)
  }, [boundary, selectedSpecificIssue, selectedIssue, zoomToggle]);



  useEffect(() => {
    // console.log("userPoints ", userPoints)
    // console.log("demoLookup ", demoLookup);
    // console.log("HERE ARE THE STATES")
    // console.log("selectedChapter ", selectedChapter)
    // console.log("selectedIssue ", selectedIssue)
    // console.log("selectedSpecficIssue ", selectedSpecificIssue)
    // console.log("showMap ", showMap)
    // console.log("show toggle ", showToggle)
    // console.log("add Compare ", addCompare)
    // console.log("councils", councils)
    // console.log("communities", communities)
    // console.log("community search ", communitySearch)
    // console.log("compare search ", compareSearch)
    // console.log("boundary ", boundary)
    // console.log("selectedAbout ", selectedAbout)
    // console.log("demographic", demographic)
    //  console.log("colorRamps", colorRamps)
    // console.log("selectedCoord", selectedCoord)
    // console.log("info", info)
    // console.log("-------------------------------------------")

    /* if (!selectedSpecificIssue) {
                             setSelectedIssue(1)
                             setSelectedSpecificIssue(1)
                         }
                         if (!selectedSpecificIssue) {
                             setSelectedSpecificIssue(1)
                         }*/

    // console.log("demoLookup ", demoLookup)

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

    // TODO: save these states
    if (zoomToggle !== null) {
      params.push(`zT=${zoomToggle}`);
    }

    if (viewState.primary && viewState.primary.latitude !== null)
      params.push(`lat=${viewState.primary.latitude}`);
    if (viewState.primary && viewState.primary.longitude !== null)
      params.push(`lon=${viewState.primary.longitude}`);
    if (viewState.primary && viewState.primary.zoom !== null)
      params.push(`z=${viewState.primary.zoom}`);

   //if (searchSource!==null) params.push(`sS=${searchSource}`)

    /* if (viewState !== null) {
             params.push(`lat=${viewState.primary.latitude}`)
             params.push(`lon=${viewState.primary.longitude}`)
             params.push(`z=${viewState.primary.zoom}`)
         }*/

    if (userPoints && userPoints[0]?.length > 0) {
      params.push(`ctC=[${userPoints[0][0]},${userPoints[0][1]}]`);
    }

    if (userPoints && userPoints[1]?.length > 0) {
      params.push(`cpC=[${userPoints[1][0]},${userPoints[1][1]}]`);
    }

    let path = window.location.href.split('?')[0];
    path = path.concat('?');
    params.map((param) => {
      path = path.concat('&', param);
    });

    if ('undefined' !== typeof window.history.pushState) {
      window.history.replaceState(null, '', path);
    } else {
      window.location.assign(path);
    }

    if ((selectedChapter === 3 && communitySearch) || selectedChapter === 2) {
      setShowToggle(true);
    }

    if (selectedChapter === 3 && !communitySearch) {
      setShowMap(true);
    }
  });

  useEffect(() => {
    if (selectedSpecificIssue) {
      setSelectedIssue(
        issues.specific_issues_data[selectedSpecificIssue].issue_type_ID
      );
    }
  }, [selectedSpecificIssue]);

  useEffect(()=>{
    console.log("selectdCompareCoord ", selectedCompareCoord)
    console.log("userpoints ", userPoints)
  }, [selectedCompareCoord, userPoints])



  // console.log('siteProtection', process.env.REACT_APP_SITE_PROTECTION)
  // console.log('sha512', process.env.REACT_APP_SITE_PWD)
  if (typeof siteProtection == 'undefined') siteProtection = true;
  if (typeof sha512 == 'undefined')
    sha512 =
      'EE26B0DD4AF7E749AA1A8EE3C10AE9923F618980772E473F8819A5D4940E0DB27AC185F8A0E1D5F84F88BC887FD67B143732C304CC5FA9AD8E6F57F50028A8FF';
  // console.log('siteProtection', siteProtection)
  // console.log('sha512', sha512)

  return (
    <Protect isEnabled={siteProtection} sha512={sha512}>
      {useWindowSize().width >= 576 ? (
        <Container fluid className={'h-100 p-0 m-0 d-flex flex-row'}>
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
            badSearch={badSearch}
            setBadSearch={setBadSearch}
            setSearchSource={setSearchSource}
            errorCode={errorCode}
            setErrorCode={setErrorCode}
            setUserPoints={setUserPoints}
            setMapDemographics={setMapDemographics}
            info={info}
            userPoints={userPoints}
            viewState={viewState}
            setViewState={setViewState}
            setCollapseMap={setCollapseMap}
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
            info={info}
            communityPinned={communityPinned}
            setCommunityPinned={setCommunityPinned}
            councilPinned={councilPinned}
            setCouncilPinned={setCouncilPinned}
            setCollapseMap={setCollapseMap}
            collapseMap={collapseMap}
            adultAsthma={adultAsthma}
            setAdultAsthma={setAdultAsthma}
          />

          <div className={`${showMap ? 'show-map' : 'hide-map'} map-container`}>
            <div className={'map-subcontainer'}>
              {/* <BaseMap viewState={viewState} /> */}

              <div
                className={`individual-maps`}
                style={{
                  width:
                    (selectedChapter === 3 &&
                      !communitySearch &&
                      !compareSearch) || !selectedChapter ||
                    ((selectedChapter === 2 || selectedChapter === 3) &&
                      collapseMap)
                      ? '75vw'
                      : '50vw',
                  transition: 'width 0.5s',
                }}
                id={mapDemographics ? 'left-map' : 'left-map-alone'}
              >
                <div
                  className={`collapse-map-button`}
                  style={{
                    width:
                      showMap &&
                      ((selectedChapter === 3 && communitySearch) ||
                        selectedChapter === 2)
                        ? '1.5vw'
                        : 0,
                    borderLeft: 'none',
                    outline:
                      showMap &&
                      ((selectedChapter === 3 && communitySearch) ||
                        selectedChapter === 2)
                        ? '1px solid black'
                        : 'none',
                    opacity:
                      showMap &&
                      ((selectedChapter === 3 && communitySearch) ||
                        selectedChapter === 2)
                        ? 1
                        : 0,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCollapseMap(!collapseMap);
                  }}
                  onMouseEnter={() => {
                    setCollapseMapToggle(true);
                  }}
                  onMouseLeave={() => {
                    setCollapseMapToggle(false);
                  }}
                >
                  {showMap && (
                    <FontAwesomeIcon
                      icon={collapseMap ? faCaretRight : faCaretLeft}
                    />
                  )}

                  <div
                    className={`collapse-map-tooltip ${
                      collapseMapToggle ? '' : 'd-none'
                    }`}
                  >
                    {collapseMap ? 'Show Panel' : 'Collapse Panel'}
                  </div>
                </div>

                <Map
                  issues={issues}
                  selectedIssue={selectedIssue}
                  selectedSpecificIssue={selectedSpecificIssue}
                  boundary={boundary}
                  showDemographics={showDemographics}
                  mapDemographics={mapDemographics}
                  demographic={demographic}
                  setColorRamps={setColorRamps}
                  toggleUnderperformers={toggleUnderperformers}
                  demoLookup={demoLookup}
                  selectedChapter={selectedChapter}
                  setSelectedChapter={setSelectedChapter}
                  communitySearch={communitySearch}
                  setCommunitySearch={setCommunitySearch}
                  addCompare={addCompare}
                  setAddCompare={setAddCompare}
                  compareSearch={compareSearch}
                  setCompareSearch={setCompareSearch}
                  showMap={showMap}
                  setShowMap={setShowMap}
                  communities={communities}
                  councils={councils}
                  viewState={viewState}
                  setViewState={setViewState}
                  mapSelection={mapSelection}
                  setMapSelection={setMapSelection}
                  zoomToggle={zoomToggle}
                  setzoomToggle={setzoomToggle}
                  handleLegend={handleLegend}
                  sethandleLegend={sethandleLegend}
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
                  selectedCoord={selectedCoord}
                  selectedCompareCoord={selectedCompareCoord}
                  setSelectedCoord={setSelectedCoord}
                  setSelectedCompareCoord={setselectedCompareCoord}
                  badSearch={badSearch}
                  setBadSearch={setBadSearch}
                  searchSource={searchSource}
                  setSearchSource={setSearchSource}
                  setErrorCode={setErrorCode}
                  infoTransfer={info}
                  userPoints={userPoints}
                  setUserPoints={setUserPoints}
                  colorRamp={colorRamps}
                  collapseMap={collapseMap}
                />
              </div>
            </div>
          </div>
        </Container>
      ) : (
        <Container className={'p-0 vh-100'}>
          {/* TODO: dynamically change header content based on selected chapter*/}
          <div className={'mobile-nav-header'}>
            <div>
              {selectedChapter && (
                <p className={'m-0 small-font'}>
                  {selectedChapter === 1
                    ? 'What is'
                    : selectedChapter < 4
                    ? 'Explore Spatial Equity by'
                    : 'Learn More'}
                </p>
              )}
              <h4 className={'m-0'}>
                {!selectedChapter
                  ? 'Spatial Equity NYC'
                  : selectedChapter === 1
                  ? 'Spatial Equity'
                  : selectedChapter === 2
                  ? 'Citywide Data'
                  : selectedChapter === 3
                  ? 'Community Profiles'
                  : 'Take Action'}
              </h4>
            </div>
            {/*TODO: animate bars into x*/}

            <div
              className={`${showMenu ? 'toggle-menu-active' : ''} toggle-menu`}
              onClick={() => setShowMenu(!showMenu)}
            >
              <span
                className={`${
                  showMenu ? 'toggle-menu-span-active' : ''
                } toggle-menu-span`}
              ></span>
            </div>
          </div>

          <div
            className={'w-100 position-absolute'}
            style={{
              zIndex: 3,
            }}
          >
            <MobileNav
              showMenu={showMenu}
              setSelectedChapter={setSelectedChapter}
              selectedChapter={selectedChapter}
            />
          </div>

          {!selectedChapter ? (
            <div></div>
          ) : selectedChapter === 2 ? (
            <CitywideData
              selectedIssue={selectedIssue}
              setSelectedIssue={setSelectedIssue}
              selectedSpecificIssue={selectedSpecificIssue}
              setSelectedSpecificIssue={setSelectedSpecificIssue}
              showDemographics={showDemographics}
              setShowDemographics={setShowDemographics}
              issues={issues}
              issue_categories={issue_categories}
              boundary={boundary}
              setBoundary={setBoundary}
              showToggle={showToggle}
              showMap={showMap}
              setShowMap={setShowMap}
              colorRamps={colorRamps}
              setColorRamps={setColorRamps}
              setShowToggle={setShowToggle}
              demographic={demographic}
              setDemographic={setDemographic}
              mapDemographics={mapDemographics}
              setMapDemographics={setMapDemographics}
              communities={communities}
              councils={councils}
              selectedChapter={selectedChapter}
              toggleTransit={toggleTransit}
              setToggleTransit={setToggleTransit}
              toggleBike={toggleBike}
              setToggleBike={setToggleBike}
              toggleWalk={toggleWalk}
              setToggleWalk={setToggleWalk}
              demoColorRamp={demoColorRamp}
              demoLegendBins={demoLegendBins}
              setDemoColorRamp={setDemoColorRamp}
              setDemoLegendBins={setDemoLegendBins}
              demoLookup={demoLookup}
              toggleUnderperformers={toggleUnderperformers}
              setSelectedChapter={setSelectedChapter}
              communitySearch={communitySearch}
              setCommunitySearch={setCommunitySearch}
              addCompare={addCompare}
              setAddCompare={setAddCompare}
              compareSearch={compareSearch}
              setCompareSearch={setCompareSearch}
              viewState={viewState}
              setViewState={setViewState}
              mapSelection={mapSelection}
              setMapSelection={setMapSelection}
              zoomToggle={zoomToggle}
              setzoomToggle={setzoomToggle}
              handleLegend={handleLegend}
              sethandleLegend={sethandleLegend}
              coordinateLookup={coordinateLookup}
              setCoordinateLookup={setCoordinateLookup}
              dataScale={dataScale}
              setdataScale={setdataScale}
              highlightFeature={highlightFeature}
              sethighlightFeature={sethighlightFeature}
              selectedCoord={selectedCoord}
              selectedCompareCoord={selectedCompareCoord}
              setSelectedCoord={setSelectedCoord}
              setSelectedCompareCoord={setselectedCompareCoord}
              badSearch={badSearch}
              setBadSearch={setBadSearch}
              mainMap={true}
              communityPinned={communityPinned}
              setCommunityPinned={setCommunityPinned}
              councilPinned={councilPinned}
              setCouncilPinned={setCouncilPinned}
              info={info}
              setToggleUnderperformers={setToggleUnderperformers}
              binList={info.binList}
            />
          ) : selectedChapter === 3 ? (
            <MobileCommunityProfile
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
              badSearch={badSearch}
              setBadSearch={setBadSearch}
              setSearchSource={setSearchSource}
              errorCode={errorCode}
              setErrorCode={setErrorCode}
              setUserPoints={setUserPoints}
              setMapDemographics={setMapDemographics}
              info={info}
              userPoints={userPoints}
              viewState={viewState}
              setViewState={setViewState}
              showMap={showMap}
              setSelectedAbout={setSelectedAbout}
              moreIssuesLength={moreIssuesLength}
              moreIssues={moreIssues}
              colorRamps={colorRamps}
              communityPinned={communityPinned}
              setCommunityPinned={setCommunityPinned}
              councilPinned={councilPinned}
              setCouncilPinned={setCouncilPinned}
              demographic={demographic}
              setDemographic={setDemographic}
              setShowDemographics={setShowDemographics}
              showDemographics={showDemographics}
              mapDemographics={mapDemographics}
              toggleTransit={toggleTransit}
              setToggleTransit={setToggleTransit}
              toggleBike={toggleBike}
              setToggleBike={setToggleBike}
              toggleWalk={toggleWalk}
              setToggleWalk={setToggleWalk}
              demoLookup={demoLookup}
              demoColorRamp={demoColorRamp}
              demoLegendBins={demoLegendBins}
              setDemoColorRamp={setDemoColorRamp}
              setDemoLegendBins={setDemoLegendBins}
              zoomToggle={zoomToggle}
              binList={info.binList}
              setToggleUnderperformers={setToggleBike}
              toggleUnderperformers={toggleUnderperformers}
              handleLegend={handleLegend}
              dataScale={dataScale}
              setdataScale={setdataScale}
            />
          ) : null}

          <div
            className={'position-absolute'}
            style={{ height: '100%', width: '100%', top: 0, zIndex: 0 }}
          >
            <Map
              issues={issues}
              selectedIssue={selectedIssue}
              selectedSpecificIssue={selectedSpecificIssue}
              boundary={boundary}
              showDemographics={showDemographics}
              mapDemographics={mapDemographics}
              demographic={demographic}
              setColorRamps={setColorRamps}
              toggleUnderperformers={toggleUnderperformers}
              demoLookup={demoLookup}
              selectedChapter={selectedChapter}
              setSelectedChapter={setSelectedChapter}
              setCommunitySearch={setCommunitySearch}
              addCompare={addCompare}
              setAddCompare={setAddCompare}
              compareSearch={compareSearch}
              setCompareSearch={setCompareSearch}
              showMap={showMap}
              setShowMap={setShowMap}
              communities={communities}
              councils={councils}
              viewState={viewState}
              setViewState={setViewState}
              mapSelection={mapSelection}
              setMapSelection={setMapSelection}
              zoomToggle={zoomToggle}
              setzoomToggle={setzoomToggle}
              handleLegend={handleLegend}
              sethandleLegend={sethandleLegend}
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
              selectedCoord={selectedCoord}
              selectedCompareCoord={selectedCompareCoord}
              setSelectedCoord={setSelectedCoord}
              setSelectedCompareCoord={setselectedCompareCoord}
              badSearch={badSearch}
              setBadSearch={setBadSearch}
              searchSource={searchSource}
              setSearchSource={setSearchSource}
              setErrorCode={setErrorCode}
              infoTransfer={info}
              userPoints={userPoints}
              setUserPoints={setUserPoints}
              colorRamp={colorRamps}
              collapseMap={collapseMap}
            />
          </div>
        </Container>
      )}
    </Protect>
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
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
