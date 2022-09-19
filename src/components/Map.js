// dependencies
import { useCallback, useEffect, useRef, useState } from 'react';
import DeckGL from '@deck.gl/react';
import { Map, Popup } from 'react-map-gl';
import { GeoJsonLayer, ScatterplotLayer, TextLayer } from '@deck.gl/layers';
import { LinearInterpolator, MapView } from '@deck.gl/core';
import { scaleQuantile, scaleThreshold } from 'd3-scale';
import { FillStyleExtension } from '@deck.gl/extensions';
import { max, min } from 'd3-array';

// geospatial dependencies
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { point } from '@turf/helpers';
import { distance } from '@turf/turf';

// data
// import _ISSUES from "../texts/issues.json";
import _NEIGHBORHOODS from '../data/neighborhoods.json';
import _NEIGHBORHOOD_NAMES from '../data/neighborhood_names.json';
import _ETHNICITY from '../data/ethnicity.json';
import _FILL_PATTERN from '../data/fill_pattern.json';
import _HATCH_ATLAS from '../data/triple_hatch_pattern.png';
import _CHAPTER_COLORS from '../data/chapter_colors.json';
import _ETHNICITY_COLORS from '../data/ethnicity_colors.json';
import _RANKINGS from '../data/rankings.json';

// mapbox style
import 'mapbox-gl/dist/mapbox-gl.css';
import { project } from 'deck.gl';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const MAP_STYLE = 'mapbox://styles/mitcivicdata/cl6fa3jro002d14qxp2nu9wng'; //toner

// color ramps
const CHOROPLETH_OPACITY = 0.85;
const BIN_SIZE = 5; // number of bins in the color ramp
// Map Viewport settings
const ZOOM_MIN = 9.5;
const ZOOM_MAX = 13;

const LONGITUDE_RANGE = [-74.25, -73.7];
const LATITUDE_RANGE = [40.5, 40.9];

function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

const popupOffset = 20;

const RESET_VIEW = {
  longitude: -74,
  latitude: 40.7131,
  zoom: 9.5,
  transitionDuration: 500,
  transitionInerpolator: new LinearInterpolator(),
};

const MAP_BACKGROUND_STYLE = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  border: '1px solid black',
  borderRight: '2px solid black',
  // borderLeft: 'none',
};

const SPLIT_SCREEN_POSITIONING = {
  // height: '15%',
  position: 'absolute',
  top: '1rem',
  margin: '0rem 1rem 0rem 1rem',
  // borderRadius: "50px",
  pointerEvents: 'none',
};

const SPLIT_SCREEN_HEADER = {
  padding: '0rem 0.75rem',
  gridRowStart: '2',
  verticalAlign: 'middle',
  textAlign: 'center',
  fontFamily: 'Inter',
  color: 'white',
  fontWeight: '500',
  backgroundColor: 'black',
  border: '1px solid white',
  fontSize: '0.85rem',
  // borderRadius: "50px",
};

/**
 * Map view definitions
 */

const MAIN_VIEW = new MapView({
  id: 'primary',
  // https://deck.gl/docs/api-reference/core/controller
  controller: {
    dragRotate: false,
    doubleClickZoom: false,
    scrollZoom: {
      smooth: true,
      speed: 0.02,
    },
    inertia: 500,
  },
  x: 0,
  y: 0,
  width: '100%',
  height: '100%',
  clear: true,
});

const SPLIT_VIEW_LEFT = new MapView({
  id: 'splitLeft',
  controller: {
    dragRotate: false,
    doubleClickZoom: false,
    scrollZoom: {
      smooth: true,
      speed: 0.02,
    },
    inertia: 500,
  },
  x: 0,
  y: 0,
  width: '50%',
  height: '100%',
  clear: true,
});

const SPLIT_VIEW_RIGHT = new MapView({
  id: 'splitRight',
  controller: {
    dragRotate: false,
    doubleClickZoom: false,
    scrollZoom: {
      smooth: true,
      speed: 0.02,
    },
    inertia: 500,
  },
  x: '50%',
  y: 0,
  width: '50%',
  height: '100%',
  clear: true,
});

export default function DeckMap({
  issues,
  selectedIssue,
  selectedSpecificIssue,
  boundary,
  showDemographics,
  mapDemographics,
  demographic,
  setColorRamps,
  toggleUnderperformers,
  demoLookup,
  selectedChapter,
  setSelectedChapter,
  communitySearch,
  addCompare,
  setAddCompare,
  setCommunitySearch,
  compareSearch,
  setCompareSearch,
  communities,
  councils,
  viewState,
  setViewState,
  zoomToggle,
  setzoomToggle,
  handleLegend,
  sethandleLegend,
  highlightFeature,
  sethighlightFeature,
  toggleTransit,
  toggleBike,
  toggleWalk,
  setDemoLegendBins,
  selectedCoord,
  selectedCompareCoord,
  setSelectedCoord,
  setSelectedCompareCoord,
  badSearch,
  setBadSearch,
  searchSource,
  setSearchSource,
  setErrorCode,
  infoTransfer,
  setShowMap,
  showMap,
  userPoints,
  setUserPoints,
  colorRamp,
  collapseMap,
}) {
  // map hooks
  const [underperformers, setUnderperformers] = useState(null);

  const deckRef = useRef(null);
  const mapRef = useRef(null);
  const dataScale = useRef('q'); //set to "equal" for equal binning, "q" for quantile binning
  // const [searchPoint, setSearchPoint] = useState([[], []]);

  // 01.4 Color Scale function

  const COLOR_SCALE =
    dataScale == 'equal'
      ? scaleThreshold()
          .domain(infoTransfer.binList)
          .range(_CHAPTER_COLORS[colorRamp])
      : scaleQuantile()
          .domain(infoTransfer.uniqueValueArray)
          .range(_CHAPTER_COLORS[colorRamp]); //quantile bins

  // 01 CREATE METRIC COLOR RAMPS END ---------------------------------------------------------------------------

  // 02 IDENTIFY NEIGHBORHOODS IN NEED ---------------------------------------------------------------------------
  // 02.1 Get low performers and ignore parks/graveyards/airports

  // REPLACE MAP SCALE WITH BOUNDARY SCALE
  // console.log(infoTransfer.mapScale);

  useEffect(() => {
    if (toggleUnderperformers && infoTransfer.selectedMetric) {
      const performanceBar = infoTransfer.mapScale.features
        .map((value) => {
          if (
            (!zoomToggle && value.properties.AnsUnt_YN == 'Y') ||
            (zoomToggle &&
              boundary == 'community' &&
              value.properties.Data_YN == 'Y') ||
            (zoomToggle && boundary == 'council')
          ) {
            return value.properties[infoTransfer.selectedMetric];
          }
        })
        .sort(function (a, b) {
          // return the sorted list of values depending if you want the highest scores or lowest scores of a given metric
          if (typeof infoTransfer.metricGoodorBad == 'number') {
            return infoTransfer.metricGoodorBad == 1
              ? b - a // highest scores
              : a - b; // lowest scores
          }
        });

      setUnderperformers(
        zoomToggle ? performanceBar[4] : [...new Set(performanceBar)][7]
      );
    } else {
      setUnderperformers(null);
    }
  }, [toggleUnderperformers, infoTransfer]);

  // 02 IDENTIFY NEIGHBORHOODS IN NEED END -----------------------------------------------------------------------

  // 03 DEMOGRAPHICS ----------------------------------------------------------------------------------------------
  //variables for scale thresholds
  const ethnicityColors = _ETHNICITY_COLORS;
  let selectedDemographic;
  let toggleScatterPlot = false; //scatter plot viz
  let toggleDemChoropleth = false; //standard choropleth viz but for demographics
  const selectedDemoArray = []; // a clean array of values for the color ramp with no NaN and no Null values
  const neighborhoodDemoArray = []; // a clean array of values for the color ramp with no NaN and no Null values
  const demoBinList = []; // derived from the selectedDemoArray array, this is the list of bins for the legend

  // 03.1 toggle demographics on off and pick which to display
  if (showDemographics && mapDemographics) {
    selectedDemographic = demoLookup[demographic].lookup;
    if (demographic === '1' && toggleScatterPlot === false) {
      toggleScatterPlot = true;
    } else if (parseFloat(demographic) > 1 && toggleDemChoropleth === false) {
      toggleDemChoropleth = true;
    } else {
      toggleScatterPlot = false;
      toggleDemChoropleth = false;
    }
  }

  // 03.2 get an array of all the values for the selected demographic
  function getDemoArray(analysisScale, outputArray) {
    for (let i = 0; i < analysisScale.features.length; i++) {
      const scale = analysisScale;

      if (selectedDemographic == 'F10_TrsBkW') {
        let transportationBreakdown = [];
        // check which transportation toggles are on and add them to the list
        if (toggleTransit) {
          transportationBreakdown.push(
            scale.features[i].properties['F8_PubTran']
          );
        }
        if (toggleBike) {
          transportationBreakdown.push(scale.features[i].properties['F6_bike']);
        }
        if (toggleWalk) {
          transportationBreakdown.push(
            scale.features[i].properties['F11_Walk']
          );
        }

        const transportationAggregation = transportationBreakdown.reduce(
          (a, b) => a + b,
          0
        );

        outputArray.push(transportationAggregation);
      } else {
        outputArray.push(
          parseFloat(scale.features[i].properties[selectedDemographic])
        );
      }
    }
  }

  // demographic array for the analysis scale
  getDemoArray(infoTransfer.selectedBoundary, selectedDemoArray);

  // demographic array for the neighborhood scale
  getDemoArray(_NEIGHBORHOODS, neighborhoodDemoArray);

  const sortedDemoArray = [
    ...(!zoomToggle ? neighborhoodDemoArray : selectedDemoArray),
  ].sort(function (a, b) {
    return a - b;
  });

  const uniqueDemoArray = [...new Set(sortedDemoArray)];

  // 03.3 break the demographic array into bins and get the bin list
  for (let i = 0; i < BIN_SIZE; i++) {
    if (dataScale === 'equal') {
      const legendScale = !zoomToggle
        ? neighborhoodDemoArray
        : selectedDemoArray;
      const threshold = (max(legendScale) - min(legendScale)) / (BIN_SIZE + 1);
      demoBinList.push(
        Math.round((threshold * (i + 1) + min(legendScale)) * 100) / 100
      );
    } else {
      const interval = Math.floor(
        ((uniqueDemoArray.length - 1) / BIN_SIZE) * (i + 1)
      );
      //  quantile breaks
      demoBinList.push(uniqueDemoArray[interval]);
    }
  }

  // 03.4 select the color ramp from the json lookup for demographics and create a default to "1" to avoid errors
  let selectedDemoRamp =
    demoLookup[demographic] !== undefined
      ? demoLookup[demographic].colorRamp
      : demoLookup['default'].colorRamp;

  // 03.4 function for demographics scale
  const DEMO_COLOR_SCALE =
    dataScale == 'equal'
      ? scaleThreshold().domain(demoBinList).range(selectedDemoRamp)
      : scaleQuantile().domain(uniqueDemoArray).range(selectedDemoRamp);

  // 03 DEMOGRAPHICS END ----------------------------------------------------------------------------------------------

  // 04 VIEWSTATE CONTROL ----------------------------------------------------------------------------------------------
  const onViewStateChange = useCallback(({ viewState }) => {
    // setViewState(viewState);
    setViewState(() => ({
      primary: viewState,
      splitLeft: viewState,
      splitRight: viewState,
    }));
    // 04.1 set constraints on view state

    viewState.longitude = Math.min(
      LONGITUDE_RANGE[1],
      Math.max(LONGITUDE_RANGE[0], viewState.longitude)
    );
    viewState.latitude = Math.min(
      LATITUDE_RANGE[1],
      Math.max(LATITUDE_RANGE[0], viewState.latitude)
    );

    // max zoom
    viewState.zoom = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, viewState.zoom));

    viewState.width = '100%';

    // 04.2 ramp in/out based on zoom level

    // 04.3 toggle based on zoom level
    if (viewState.zoom > 12.25) {
      setzoomToggle(0);
      sethandleLegend(0);
    } else {
      setzoomToggle(1);
      sethandleLegend(1);
    }
  }, []);
  // 04 VIEWSTATE CONTROL END ----------------------------------------------------------------------------------------------

  // 05 TOOLTIP ----------------------------------------------------------------------------------------------
  const getRankingTooltip = (boundaryName) => {
    const metricCheck = _RANKINGS[boundary][infoTransfer.selectedMetric]
      ? true
      : false;
    const maxRanking = metricCheck
      ? _RANKINGS[boundary][infoTransfer.selectedMetric].length
      : '';
    const ranking = metricCheck
      ? _RANKINGS[boundary][infoTransfer.selectedMetric].find(
          (t) => t.community_ID == boundaryName
        ).rank
      : '';

    const suffix = {
      1: 'st',
      2: 'nd',
      3: 'rd',
      4: 'th',
      5: 'th',
      6: 'th',
      7: 'th',
      8: 'th',
      9: 'th',
    };

    return metricCheck
      ? `${ranking}${suffix[ranking % 10]} of ${maxRanking} ${
          boundary === 'council' ? 'council districts' : 'community boards'
        }`
      : '';
  };

  const getMetricValueTooltip = (obj) => {
    const accessor = obj.properties ? obj.properties : obj;
    return `<strong> ${
      infoTransfer.selectedMetric != null
        ? accessor[infoTransfer.selectedMetric] >= 10
          ? accessor[infoTransfer.selectedMetric].toFixed(0)
          : accessor[infoTransfer.selectedMetric].toFixed(1)
        : ''
    }${
      issues.specific_issues_data[selectedSpecificIssue].issue_units_symbol !=
      ''
        ? issues.specific_issues_data[selectedSpecificIssue].issue_units_symbol
        : ''
    }</strong> ${
      typeof selectedSpecificIssue == 'number'
        ? issues.specific_issues_data[selectedSpecificIssue]
            .issue_units_shorthand != ''
          ? `<strong>${issues.specific_issues_data[selectedSpecificIssue].issue_units_shorthand}</strong>`
          : ` ${issues.specific_issues_data[selectedSpecificIssue].specific_issue_units}`
        : ''
    }`;
  };

  const getTooltip = (info) => {
    if (
      info.object &&
      ((boundary == 'community' && info.object.properties.Data_YN == 'Y') ||
        boundary == 'council')
    ) {
      const obj = info.object;
      const tooltipBounds =
        boundary == 'community' ? 'Community Board' : 'Council District';
      const boundaryName =
        boundary == 'community'
          ? obj.properties.CDTA2020
          : obj.properties.CounDist;

      // update auto highlight
      sethighlightFeature(info.index);

      const metricCheck = _RANKINGS[boundary][infoTransfer.selectedMetric]
        ? true
        : false;

      const neighborhoodList =
        boundary == 'council'
          ? councils[String(obj.properties.CounDist)].neighborhoods
          : boundary == 'community'
          ? communities[obj.properties.CDTA2020].neighborhoods
          : null;

      const transportationModesArray = [];
      if (toggleTransit) {
        transportationModesArray.push('Public Transit');
      }
      if (toggleBike) {
        transportationModesArray.push('Bike');
      }
      if (toggleWalk) {
        transportationModesArray.push('Walk');
      }
      let transportationModes = transportationModesArray.join(' & ');

      if (transportationModesArray.length > 2) {
        const last = transportationModesArray.pop();
        transportationModes = ` ${transportationModesArray.join(
          ', '
        )}, & ${last}`;
      }

      if (boundary == 'council' || boundary == 'community') {
        // return the tooltip for the selected boundary with selected metric and selected demographic

        //debug get mouse x and y
        const x = info.x.toFixed(0);
        const y = info.y.toFixed(0);
        return (
          obj && {
            className: 'map-tooltip',
            style: {
              border: '1px solid black',
              background: 'white',
              color: 'black',
              padding: '0px',
              maxWidth: '250px',
            },
            html: `\
          <!-- select metric -->
          <div class=map-tooltip-header>${tooltipBounds} <strong>${boundaryName}</strong></div>
          ${
            metricCheck
              ? `<div>
            <div class=map-tooltip-info>${`Ranks <strong>${getRankingTooltip(
              boundaryName
            )}</strong> for ${
              typeof selectedSpecificIssue == 'number'
                ? issues.specific_issues_data[selectedSpecificIssue]
                    .specific_issue_name
                : ''
            } with ${`${getMetricValueTooltip(obj)}`}.`}</div>
          </div>`
              : ''
          }
          <!-- select demographic -->
          ${
            selectedDemographic != null
              ? `<div class=map-tooltip-info>
            ${
              selectedDemographic != null
                ? demographic !== '5'
                  ? `${demoLookup[demographic].name}—`
                  : toggleTransit || toggleBike || toggleWalk
                  ? `${transportationModes}—`
                  : `Check off one of the transportation options above the demographics legend to see how people are getting around.`
                : ''
            } ${
                  selectedDemographic != null
                    ? demographic !== '1'
                      ? demographic !== '5'
                        ? `<strong>${obj.properties[
                            selectedDemographic
                          ].toFixed(0)}% </strong>`
                        : toggleTransit || toggleBike || toggleWalk
                        ? `<strong>${selectedDemoArray[info.index].toFixed(
                            0
                          )}%</strong>`
                        : ''
                      : `\
                  <div class=tooltip-grid>
                    <div style="color:${
                      ethnicityColors.Latino.htmlFormat
                    }">■</div>
                    <div>${Math.round(obj.properties.P_Hispanic * 100)}%</div>
                    <div>Latino</div>
                    <div style="color:${
                      ethnicityColors.White.htmlFormat
                    }">■</div>
                    <div>${Math.round(obj.properties.P_White * 100)}%</div>
                    <div>White</div>
                    <div style="color:${
                      ethnicityColors.Black.htmlFormat
                    }">■</div>
                    <div>${Math.round(obj.properties.P_Black * 100)}%</div>
                    <div>Black</div>
                    <div style="color:${
                      ethnicityColors.Asian.htmlFormat
                    }">■</div>
                    <div>${Math.round(obj.properties.P_Asian * 100)}%</div>
                    <div>Asian</div>
                    <div style="color:${
                      ethnicityColors.Other.htmlFormat
                    }">■</div>
                    <div>${Math.round(obj.properties.P_Other * 100)}%</div>
                    <div>Other</div>
                  </div>`
                    : ''
                }</div>`
              : ''
          }
            `,
          }
        );
      }
    }
  };

  // 05 TOOLTIP END ----------------------------------------------------------------------------------------------

  const getCommunitySearch = (coord, b) => {
    const searchItemFound = [];
    const searchItemData = [];
    for (const [
      index,
      element,
    ] of infoTransfer.selectedBoundary.features.entries()) {
      if (
        element &&
        booleanPointInPolygon(point(coord), element) &&
        (b == 'council' ||
          (b == 'community' && element.properties.Data_YN == 'Y'))
      ) {
        const lookup =
          b == 'council'
            ? String(element.properties.CounDist)
            : b == 'community' && element.properties.Data_YN == 'Y'
            ? element.properties.CDTA2020
            : null;

        searchItemFound.push(lookup);
        searchItemData.push(element.properties);
      }
    }
    return [searchItemFound, searchItemData];
  };

  // 06 DIRECT PICKING ENGINE ---------------------------------------------------------------------------------------------
  // 00 update via search engine
  // 06 DIRECT PICKING ENGINE ---------------------------------------------------------------------------------------------
  // 00 update via search engine

  function updateSearchEngine(searchEngine, searchEngineType) {
    //check if search engine is valid coordinates
    if (searchEngineType === 0 && selectedChapter === 3) {
      if (selectedCoord.length === 2) {
        const newCommunitySearch = getCommunitySearch(
          searchEngine,
          boundary
        )[0];
        if (newCommunitySearch.length > 0) {
          if (
            (searchSource === 'click' &&
              newCommunitySearch[0] !== communitySearch) ||
            searchSource === 'search'
          ) {
            setCommunitySearch(newCommunitySearch[0]);
            setBadSearch([0, badSearch[1]]);
            setUserPoints([searchEngine, userPoints[1]]);
            // move camera to new neighborhood
            setViewState({
              longitude: selectedCoord[0],
              latitude: selectedCoord[1],
              zoom: ZOOM_MAX - 0.5,
              transitionDuration: 500,
              transitionInerpolator: new LinearInterpolator(),
            });
          }
          /*else {
            if (searchSource === 'click' || searchSource === 'search') {
              setSelectedCoord([]);
              setCommunitySearch(null);
              setUserPoints([[], userPoints[1]]);
              setViewState(RESET_VIEW);
            }
          }*/
        }
      } else {
        setBadSearch([1, badSearch[1]]);
        setUserPoints([[], []]);
        setViewState(RESET_VIEW);
      }
    }

    if (searchEngineType === 1 && selectedChapter === 3) {
      if (selectedCompareCoord.length === 2) {
        const newCompareSearch = getCommunitySearch(searchEngine, boundary)[0];
        if (
          newCompareSearch.length > 0 &&
          newCompareSearch[0] !== communitySearch &&
          ((searchSource === 'click' &&
            newCompareSearch[0] !== compareSearch) ||
            searchSource === 'search') &&
          selectedCoord.length === 2
        ) {
          //   console.log('case 1');
          setCompareSearch(newCompareSearch[0]);
          setBadSearch([badSearch[0], 0]);
          const ptA = selectedCoord;
          const ptB = selectedCompareCoord;
          const maxDistance = !mapDemographics ? 25 : 15;
          const ptCompareDistance =
            distance(point(ptA), point(ptB)) < maxDistance
              ? distance(point(ptA), point(ptB))
              : maxDistance;

          const remapZoom = !mapDemographics
            ? map_range(ptCompareDistance, 0.3, maxDistance, ZOOM_MAX, ZOOM_MIN)
            : mapDemographics &&
              map_range(
                ptCompareDistance,
                0.3,
                maxDistance,
                ZOOM_MAX,
                ZOOM_MIN
              ) -
                0.5 >
                ZOOM_MIN
            ? map_range(
                ptCompareDistance,
                0.3,
                maxDistance,
                ZOOM_MAX,
                ZOOM_MIN
              ) - 0.5
            : ZOOM_MIN;

          setUserPoints([userPoints[0], searchEngine]);

          setViewState({
            longitude: (ptA[0] + ptB[0]) / 2,
            latitude: (ptA[1] + ptB[1]) / 2,
            zoom: !mapDemographics ? remapZoom : remapZoom - 0.5,
            transitionDuration: 500,
            transitionInerpolator: new LinearInterpolator(),
          });
        } else if (
          newCompareSearch.length > 0 &&
          newCompareSearch[0] === compareSearch &&
          searchEngine.length === 2 &&
          searchSource === 'click'
        ) {
          //   console.log('case 2');
          setSelectedCompareCoord([]);
          setCompareSearch(null);
          setUserPoints([userPoints[0], []]);
          setViewState({
            longitude: selectedCoord[0],
            latitude: selectedCoord[1],
            zoom: ZOOM_MAX - 0.5,
            transitionDuration: 500,
            transitionInerpolator: new LinearInterpolator(),
          });
        } else if (
          newCompareSearch.length > 0 &&
          newCompareSearch[0] === communitySearch &&
          searchEngine.length === 2 &&
          searchSource === 'click'
        ) {
          //   console.log('case 3');
          if (!compareSearch) {
            /*setSelectedCoord([]);
            setCommunitySearch(null);
            setUserPoints([[], []]);
            setViewState(RESET_VIEW);*/
          } else {
            // console.log('case 4');
            setCommunitySearch(compareSearch);
            setCompareSearch(null);
            setSelectedCoord(userPoints[1]);
            setUserPoints([userPoints[1], []]);
            setViewState({
              longitude: userPoints[1][0],
              latitude: userPoints[1][1],
              zoom: ZOOM_MAX - 0.5,
              transitionDuration: 500,
              transitionInerpolator: new LinearInterpolator(),
            });
            setSelectedCompareCoord([]);
          }
        } else {
          if (searchEngineType == 1) {
            setBadSearch([badSearch[0], 1]);
          }
        }
      }
    }
  }

  useEffect(() => {
    if (!addCompare || !communitySearch) {
      updateSearchEngine(selectedCoord, 0);
    }
  }, [selectedCoord, infoTransfer.selectedBoundary]);

  useEffect(() => {
    updateSearchEngine(selectedCoord, 0);
  }, [infoTransfer.selectedBoundary]);

  useEffect(() => {
    updateSearchEngine(selectedCompareCoord, 1);
  }, [selectedCompareCoord, infoTransfer.selectedBoundary]);

  useEffect(() => {
    if (!addCompare) {
      setUserPoints([userPoints[0], []]);
    }
  }, [addCompare]);

  // fix view on resize
  useEffect(() => {
    if (searchSource !== 'click' && selectedChapter === 2) {
      setViewState(RESET_VIEW);
    } else if (selectedChapter === 3) {
      setViewState(viewState);
    } else {
      setViewState(RESET_VIEW);
    }
  }, [selectedChapter]);

  // 06 Render lifecycle
  useEffect(() => {
    /*if (infoTransfer.binList.length > 0) {
              setColorRamps(colorRamp);
            }*/
    setDemoLegendBins(demoBinList);
  }, [
    selectedSpecificIssue,
    zoomToggle,
    infoTransfer.selectedBoundary,
    selectedDemographic,
    toggleTransit,
    toggleBike,
    toggleWalk,
  ]);

  // 06 MAP LAYERS ----------------------------------------------------------------------------------------------

  const metricLayers = [
    new GeoJsonLayer({
      id: 'neighborhoods',
      data: _NEIGHBORHOODS.features,
      stroked: false,
      filled: true,
      getFillColor: (f) => {
        let fillValue = parseFloat(f.properties[infoTransfer.selectedMetric]);

        if (f.properties.AnsUnt_YN == 'Y') {
          if (isNaN(fillValue)) {
            return [0, 0, 0, 0];
          } else {
            return COLOR_SCALE(f.properties[infoTransfer.selectedMetric]);
          }
        } else {
          return [0, 0, 0, 0];
        }
      },
      lineWidthUnits: 'pixels',
      opacity: CHOROPLETH_OPACITY,
      visible: !zoomToggle,
      // update triggers
      updateTriggers: {
        getFillColor: [infoTransfer.selectedMetric],
      },
    }),

    new GeoJsonLayer({
      id: 'administrative-choropleth',
      data: infoTransfer.selectedBoundary,
      filled: true,
      getFillColor: (f) => {
        let fillValue = parseFloat(f.properties[infoTransfer.selectedMetric]);
        if (
          isNaN(fillValue) ||
          (boundary == 'community' && f.properties.Data_YN == 'N')
        ) {
          return [0, 0, 0, 0];
        } else {
          // return [255, 0, 0, 255];
          return COLOR_SCALE(f.properties[infoTransfer.selectedMetric]);
        }
      },
      pointType: 'text',
      getText: 'test',
      getTextSize: 320,
      opacity: CHOROPLETH_OPACITY,
      visible: zoomToggle,

      updateTriggers: {
        getFillColor: [infoTransfer.selectedMetric, addCompare],
      },
    }),

    new GeoJsonLayer({
      id: 'administrative-choropleth-highlights',
      data: infoTransfer.selectedBoundary,
      filled: true,
      stroked: true,

      getLineWidth: (w) => {
        let boundaryValue = parseFloat(
          w.properties[infoTransfer.selectedMetric]
        );
        if (
          toggleUnderperformers === true &&
          (boundary == 'council' ||
            (boundary == 'community' && w.properties.Data_YN == 'Y'))
        ) {
          if (infoTransfer.metricGoodorBad == 1) {
            return boundaryValue >= underperformers ? 100 : 0;
          } else {
            return boundaryValue <= underperformers ? 100 : 0;
          }
        }
        return 0;
      },

      opacity: CHOROPLETH_OPACITY,
      visible: toggleUnderperformers ? zoomToggle : false,

      // props added by FillStyleExtension
      fillPatternMask: true,
      fillPatternAtlas: _HATCH_ATLAS,
      fillPatternMapping: _FILL_PATTERN,
      getFillPattern: (f) => {
        let fillValue = parseFloat(f.properties[infoTransfer.selectedMetric]);
        if (
          toggleUnderperformers === true &&
          (boundary == 'council' ||
            (boundary == 'community' && f.properties.Data_YN == 'Y'))
        ) {
          if (infoTransfer.metricGoodorBad == 1) {
            return fillValue >= underperformers
              ? 'hatch-pattern'
              : 'hatch-solid';
          } else {
            return fillValue <= underperformers
              ? 'hatch-pattern'
              : 'hatch-solid';
          }
        }
        return 'hatch-solid';
      },
      getFillPatternScale: 10,
      getFillPatternOffset: [0, 0],
      // Define extensions
      extensions: [new FillStyleExtension({ pattern: true })],

      updateTriggers: {
        getLineWidth: [underperformers],
        getFillPattern: [underperformers],
      },
    }),

    new GeoJsonLayer({
      id: 'neighborhood-choropleth-highlights',
      data: _NEIGHBORHOODS.features,
      filled: true,
      stroked: true,

      getLineWidth: (w) => {
        let boundaryValue = parseFloat(
          w.properties[infoTransfer.selectedMetric]
        );
        if (toggleUnderperformers === true && w.properties.AnsUnt_YN == 'Y') {
          if (infoTransfer.metricGoodorBad == 1) {
            return boundaryValue >= underperformers ? 50 : 0;
          } else {
            return boundaryValue <= underperformers ? 50 : 0;
          }
        }
        return 0;
      },

      opacity: CHOROPLETH_OPACITY,
      visible: toggleUnderperformers ? !zoomToggle : false,

      // props added by FillStyleExtension
      fillPatternMask: true,
      fillPatternAtlas: _HATCH_ATLAS,
      fillPatternMapping: _FILL_PATTERN,
      getFillPattern: (f) => {
        let fillValue = parseFloat(f.properties[infoTransfer.selectedMetric]);
        if (toggleUnderperformers === true && f.properties.AnsUnt_YN == 'Y') {
          // console.log(toggleUnderperformers, underperformers);
          if (infoTransfer.metricGoodorBad == 1) {
            return fillValue >= underperformers ? 'hatch-small' : 'hatch-solid';
          } else {
            return fillValue <= underperformers ? 'hatch-small' : 'hatch-solid';
          }
        }
        return 'hatch-solid';
      },
      getFillPatternScale: 10,
      getFillPatternOffset: [0, 0],
      // Define extensions
      extensions: [new FillStyleExtension({ pattern: true })],

      updateTriggers: {
        getLineWidth: [underperformers],
        getFillPattern: [underperformers],
      },
    }),
  ];

  const demoLayers = [
    new GeoJsonLayer({
      id: 'neighborhood-demographics',
      data: _NEIGHBORHOODS.features,
      stroked: false,
      filled: true,
      getFillColor: (f) => {
        let fillValue =
          selectedDemographic !== 'F10_TrsBkW'
            ? parseFloat(f.properties[selectedDemographic])
            : neighborhoodDemoArray[f.id];

        if (f.properties.AnsUnt_YN == 'Y') {
          if (
            isNaN(fillValue) ||
            (selectedDemographic == 'F10_TrsBkW' &&
              !toggleTransit &&
              !toggleBike &&
              !toggleWalk)
          ) {
            return [255, 255, 255, 255];
          } else {
            return DEMO_COLOR_SCALE(fillValue);
          }
        }
        return [0, 0, 0, 0];
      },
      lineWidthMinPixels: 1,

      opacity: CHOROPLETH_OPACITY,
      visible: !zoomToggle ? toggleDemChoropleth : 0,

      updateTriggers: {
        getLineWidth: [
          selectedDemographic,
          toggleTransit,
          toggleBike,
          toggleWalk,
          zoomToggle,
        ],
        getFillColor: [
          selectedDemographic,
          toggleTransit,
          toggleBike,
          toggleWalk,
          zoomToggle,
        ],
      },
    }),

    new GeoJsonLayer({
      id: 'administrative-demographics',
      data: infoTransfer.selectedBoundary,
      stroked: false,
      filled: true,
      getFillColor: (f) => {
        let fillValue =
          selectedDemographic !== 'F10_TrsBkW'
            ? parseFloat(f.properties[selectedDemographic])
            : selectedDemoArray[f.id];

        if (
          selectedDemographic == 'F10_TrsBkW' &&
          !toggleTransit &&
          !toggleBike &&
          !toggleWalk
        ) {
          return [255, 255, 255, 255];
        }
        if (boundary == 'community') {
          if (f.properties.Data_YN == 'N') {
            return [0, 0, 0, 0];
          }
        }
        return DEMO_COLOR_SCALE(fillValue);
      },
      lineWidthMinPixels: 1,

      opacity: CHOROPLETH_OPACITY,
      visible: zoomToggle ? toggleDemChoropleth : 0,

      updateTriggers: {
        getLineWidth: [
          selectedDemographic,
          toggleTransit,
          toggleBike,
          toggleWalk,
          zoomToggle,
        ],
        getFillColor: [
          selectedDemographic,
          toggleTransit,
          toggleBike,
          toggleWalk,
          zoomToggle,
        ],
      },
    }),

    new ScatterplotLayer({
      id: 'ethnicity',
      data: _ETHNICITY.features,
      stroked: false,
      filled: true,
      radiusScale: 6,
      radiusMinPixels: 1,
      radiusMaxPixels: 100,
      lineWidthMinPixels: 1,
      getPosition: (d) => d.geometry.coordinates,
      getRadius: 3,
      opacity: 0.75,
      visible: toggleScatterPlot,
      getFillColor: (d) => {
        let color;
        switch (d.properties.EthnicityCode) {
          case '1':
            color = ethnicityColors.Latino.deckFormat; // latino
            break;
          case '2':
            return ethnicityColors.White.deckFormat; // white
            break;
          case '3':
            return ethnicityColors.Black.deckFormat; // black
            break;
          case '4':
            return ethnicityColors.Indigenous.deckFormat; // indigenous
            break;
          case '5':
            return ethnicityColors.Asian.deckFormat; // asian
            break;
          default:
            return ethnicityColors.Other.deckFormat; // other
        }
        return color;
      },
    }),
  ];

  const annoLayers = [
    new GeoJsonLayer({
      id: 'administrative-boundaries',
      data: infoTransfer.selectedBoundary,
      stroked: true,
      filled: true,
      getFillColor: [255, 255, 255, 0],
      getLineColor: (f) => {
        if (
          boundary == 'council' ||
          (boundary == 'community' && f.properties.Data_YN == 'Y')
        ) {
          if (f.id == highlightFeature) {
            return [0, 0, 0, 255];
          } else {
            return [67, 67, 67, 100];
          }
        }
        return [0, 0, 0, 0];
      },
      lineWidthUnits: 'meters',
      getLineWidth: (w) => {
        if (
          boundary == 'council' ||
          (boundary == 'community' && w.properties.Data_YN == 'Y')
        ) {
          if (w.id == highlightFeature) {
            return zoomToggle ? 100 : 50;
          }
          return zoomToggle ? 50 : 25;
        }
        return 0;
      },
      lineWidthMinPixels: 1,
      pickable: true,
      autoHighlight: true,
      highlightColor: (info) => {
        if (boundary == 'community' && info.object.properties.Data_YN == 'N') {
          return [0, 0, 0, 0];
        }
        return [0, 0, 0, 50];
      },
      onClick: (info) => {
        const obj = info.object;

        // change selected boundary
        const lookup =
          boundary == 'council'
            ? String(obj.properties.CounDist)
            : boundary == 'community' && obj.properties.Data_YN == 'Y'
            ? obj.properties.CDTA2020
            : null;

        if (
          (boundary == 'community' && obj.properties.Data_YN == 'Y') ||
          boundary == 'council'
        ) {
          setSearchSource('click'); //set search source to click
          // change chapter
          if (selectedChapter !== 3) {
            setSelectedChapter(3);
          }

          // add clicked object to chapter 3 searchbar and highlight single selection on map
          if (communitySearch == null || addCompare == false) {
            // updateSearchEngine(info.coordinate, 0);
            setSelectedCoord(info.coordinate);
          }
          // double selection functionality
          else {
            setSelectedCompareCoord(info.coordinate);
          }
        }
      },
      updateTriggers: {
        getLineColor: [highlightFeature],
        getLineWidth: [highlightFeature, zoomToggle],
      },
    }),

    new GeoJsonLayer({
      id: 'administrative-selected',
      data: infoTransfer.selectedBoundary,
      filled: false,
      stroked: true,

      getLineColor: (f) => {
        if (
          (boundary == 'council' &&
            (f.properties.CounDist == communitySearch ||
              f.properties.CounDist == compareSearch)) ||
          (boundary == 'community' &&
            f.properties.Data_YN == 'Y' &&
            (f.properties.CDTA2020 == communitySearch ||
              f.properties.CDTA2020 == compareSearch))
        ) {
          return selectedSpecificIssue
            ? [255, 255, 255, 255]
            : [127, 255, 0, 255];
        }
        return [0, 0, 0, 0];
      },
      getLineWidth: 100,
      updateTriggers: {
        getLineColor: [
          infoTransfer.selectedMetric,
          addCompare,
          communitySearch,
          compareSearch,
        ],
      },
    }),

    new TextLayer({
      id: 'neighborhood-names',
      data: _NEIGHBORHOOD_NAMES.features,
      characterSet: 'auto',
      sizeUnits: 'meters',
      fontFamily: 'Roboto',
      fontWeight: '1000',
      getColor: infoTransfer.selectedMetric
        ? [255, 255, 255, 255]
        : [0, 0, 0, 255],
      getText: (d) => d.properties.NTAName.toUpperCase(),
      getPosition: (d) => d.geometry.coordinates,
      getSize: 75,
      maxWidth: 600,
      opacity: !zoomToggle,
    }),

    new ScatterplotLayer({
      id: 'user-search',
      data: userPoints,
      stroked: true,
      filled: true,
      radiusScale: 4,
      radiusMinPixels: 8,
      // radiusMaxPixels: 125,
      lineWidthMinPixels: 1,
      getPosition: (d) => d,
      getRadius: 30,
      getFillColor: [0, 0, 0, 255],
      getLineColor: [255, 255, 255, 255],
    }),

    new TextLayer({
      id: 'text-layer-details',
      data: userPoints,
      getPosition: (d) => {
        // console.log(d);
        // console.log(project(d));
        if (d.length == 2) return d;
      },
      getText: (d) => {
        if (d.length == 2) {
          //   const rank = 99;
          const selection = getCommunitySearch(d, boundary);
          const value = selection[1][0][[infoTransfer.selectedMetric]];

          const metricCheck = _RANKINGS[boundary][infoTransfer.selectedMetric]
            ? true
            : false;
          return metricCheck
            ? `Ranks ${getRankingTooltip(selection[0])} for ${
                issues.specific_issues_data[selectedSpecificIssue]
                  .specific_issue_name
              } with ${value >= 10 ? value.toFixed(0) : value.toFixed(1)}${
                issues.specific_issues_data[selectedSpecificIssue]
                  .issue_units_symbol != ''
                  ? issues.specific_issues_data[selectedSpecificIssue]
                      .issue_units_symbol
                  : ''
              } ${
                issues.specific_issues_data[selectedSpecificIssue]
                  .issue_units_shorthand != ''
                  ? issues.specific_issues_data[selectedSpecificIssue]
                      .issue_units_shorthand
                  : issues.specific_issues_data[selectedSpecificIssue]
                      .specific_issue_units
              }.`
            : '';
        }
      },
      visible: infoTransfer.selectedMetric ? true : false,
      getSize: 12,
      getPixelOffset: [popupOffset, popupOffset + 45],
      maxWidth: boundary == 'community' ? 1150 : 1000,
      background: true,
      backgroundPadding: [10, 10, 10, 10],
      getBackgroundColor: [255, 255, 255, 255],
      getBorderWidth: 1,
      getBorderColor: [0, 0, 0, 255],
      getTextAnchor: 'start',
      getAlignmentBaseline: 'top',
      fontFamily: 'Roboto',
      updateTriggers: {
        getText: [infoTransfer.selectedBoundary, infoTransfer.selectedMetric],
      },
    }),

    new TextLayer({
      id: 'comparison-layer-title',
      data: userPoints,
      getPosition: (d) => {
        if (d.length == 2) {
          return d;
        } else {
          return;
        }
      },
      getText: (d) => {
        if (d.length == 2) {
          const selection = getCommunitySearch(d, boundary);
          return (
            (boundary == 'council' ? 'Council District ' : 'Community Board ') +
            selection[0]
          );
        }
      },
      getColor: [255, 255, 255, 255],
      getSize: 16,
      getPixelOffset: [popupOffset, popupOffset],
      background: true,
      backgroundPadding: [10, 10, 10, 10],
      getBackgroundColor: [0, 0, 0, 255],
      getBorderWidth: 1,
      getBorderColor: [0, 0, 0, 255],
      getTextAnchor: 'start',
      getAlignmentBaseline: 'top',
      fontFamily: 'Roboto',
      fontWeight: '1000',
      updateTriggers: {
        getText: [infoTransfer.selectedBoundary, infoTransfer.selectedMetric],
      },
    }),
  ];

  //   console.log(project(userPoints[0]));
  //   console.log(userPoints);
  //   console.log(infoTransfer.selectedBoundary.features[0].properties.X_Cent);

  const layerFilter = useCallback(({ layer, viewport }) => {
    if (!showMap && selectedSpecificIssue) return false;

    const metricList = [];
    const annoList = [];

    for (let i = 0; i < metricLayers.length; i++) {
      metricList.push(metricLayers[i].id);
    }
    for (let i = 0; i < annoLayers.length; i++) {
      annoList.push(annoLayers[i].id);
    }

    if (annoList.includes(layer.id)) {
      return true;
    } else if (metricList.includes(layer.id) && viewport.id !== 'splitRight') {
      return true;
    } else if (!metricList.includes(layer.id) && viewport.id == 'splitRight') {
      return viewport.id === 'splitRight';
    }
  });

  // console.log(map ? map : "no map");
  return (
    <div>
      <DeckGL
        // viewState={viewState}
        style={{ backgroundColor: 'black' }}
        initialViewState={viewState}
        onViewStateChange={onViewStateChange}
        views={
          showMap || (!showMap && !selectedSpecificIssue)
            ? mapDemographics
              ? [SPLIT_VIEW_LEFT, SPLIT_VIEW_RIGHT]
              : [MAIN_VIEW]
            : null
        }
        layers={[metricLayers, demoLayers, annoLayers]}
        getCursor={() => 'crosshair'}
        getTooltip={getTooltip}
        layerFilter={layerFilter}
        ref={deckRef}
        // eventRecognizerOptions={
        //   isMobile ? { pan: { threshold: 10 }, tap: { threshold: 5 } } : {}
        // }
        // style={{ mixBlendMode: "multiply" }}
        // _pickable={isMobile ? false : true}
      >
        {!mapDemographics && (
          <MapView id="primary">
            <Map
              ref={mapRef}
              reuseMaps
              mapStyle={MAP_STYLE}
              preventStyleDiffing={true}
              mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
              attributionControl={false}
              logoPosition="top-right"
            />
            {collapseMap && selectedSpecificIssue && (
              <div style={SPLIT_SCREEN_POSITIONING}>
                <div style={SPLIT_SCREEN_HEADER}>
                  {
                    issues.specific_issues_data[selectedSpecificIssue]
                      .specific_issue_name
                  }{' '}
                  by{' '}
                  {boundary == 'community'
                    ? 'Community Boards'
                    : 'City Districts'}
                </div>
              </div>
            )}
          </MapView>
        )}

        {mapDemographics && (
          <MapView id="splitLeft">
            <Map
              reuseMaps
              mapStyle={MAP_STYLE}
              preventStyleDiffing={true}
              mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
              attributionControl={false}
              logoPosition="top-right"
            />
            <div style={MAP_BACKGROUND_STYLE} />
            {selectedSpecificIssue && (
              <div style={SPLIT_SCREEN_POSITIONING}>
                <div style={SPLIT_SCREEN_HEADER}>
                  {
                    issues.specific_issues_data[selectedSpecificIssue]
                      .specific_issue_name
                  }{' '}
                  by{' '}
                  {boundary == 'community'
                    ? 'Community Boards'
                    : 'City Districts'}
                </div>
              </div>
            )}
          </MapView>
        )}
        {mapDemographics && (
          <MapView id="splitRight">
            <Map
              reuseMaps
              mapStyle={MAP_STYLE}
              preventStyleDiffing={true}
              mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
              attributionControl={false}
              logoPosition="top-right"
            />
            <div style={MAP_BACKGROUND_STYLE} />
            {demographic && (
              <div style={SPLIT_SCREEN_POSITIONING}>
                <div style={SPLIT_SCREEN_HEADER}>
                  {demoLookup[demographic].name}
                </div>
              </div>
            )}
          </MapView>
        )}
      </DeckGL>
    </div>
  );
}
