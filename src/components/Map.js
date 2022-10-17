// dependencies
import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import DeckGL from '@deck.gl/react';
import { Map, Popup } from 'react-map-gl';
import { GeoJsonLayer, ScatterplotLayer, TextLayer } from '@deck.gl/layers';
import { LinearInterpolator, MapView } from '@deck.gl/core';
import { scaleQuantile, scaleThreshold } from 'd3-scale';
import { FillStyleExtension } from '@deck.gl/extensions';
import { max, min } from 'd3-array';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import * as ReactDOMServer from 'react-dom/server';

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
import nycBoundary from '../data/nyc_boundary.json';

// mapbox style
import 'mapbox-gl/dist/mapbox-gl.css';
import { project } from 'deck.gl';
import MapTooltip from './MapTooltip';
import {
  debounce,
  getTransportationModes,
  mapRange,
  splitHyphens,
} from '../utils/functions';

import MapNotableIndicators from './MapNotableIndicators';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const MAP_STYLE = 'mapbox://styles/mitcivicdata/cl6fa3jro002d14qxp2nu9wng'; //toner

// color ramps
const CHOROPLETH_OPACITY = 0.85;
const BIN_SIZE = 5; // number of bins in the color ramp
// Map Viewport settings
const ZOOM_MIN = 9.5;
const ZOOM_MAX = 13;
const BUTTON_ZOOM_STEP = 0.5;

const LONGITUDE_RANGE = [-74.25, -73.7];
const LATITUDE_RANGE = [40.5, 40.9];

// Default view state (reset view)
export const DEFAULT_VIEW_STATE = {
  longitude: -74,
  latitude: 40.7131,
  zoom: 9.5,
  transitionDuration: 500,
  transitionInerpolator: new LinearInterpolator(),
  minZoom: ZOOM_MIN,
  maxZoom: ZOOM_MAX,
};

const MAP_BACKGROUND_STYLE = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  border: '0px solid black',
  borderRight: '1px solid black',
  borderLeft: 'none',
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
  padding: '0.25em 0.5em',
  gridRowStart: '2',
  verticalAlign: 'middle',
  textAlign: 'center',
  fontFamily: 'Inter',
  color: 'white',
  fontWeight: '700',
  backgroundColor: 'black',
  border: '1.5px solid white',
  fontSize: '0.8rem',
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
    // scrollZoom: {
    //   smooth: true,
    //   speed: 0.02,
    // },
    // inertia: 500,
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
    // scrollZoom: {
    //   smooth: true,
    //   speed: 0.02,
    // },
    // inertia: 500,
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
    // scrollZoom: {
    //   smooth: true,
    //   speed: 0.02,
    // },
    // inertia: 500,
  },
  x: '50%',
  y: 0,
  width: '50%',
  height: '100%',
  clear: true,
});

const defaultColors = [
  [220, 92, 233, 255], // health
  [236, 76, 51, 255], // environment
  [95, 128, 236, 255], // mobility
];

export default function DeckMap({
  issues,
  selectedIssue,
  selectedSpecificIssue,
  setSelectedSpecificIssue,
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
  infoTransfer = null,
  setShowMap,
  showMap,
  userPoints,
  setUserPoints,
  colorRamp,
  collapseMap,

  // mobile only
  isMobile = false,
  showDropDown,
  setShowDropDown,
  showSubDropDown,
  setShowSubDropDown,
  showLegend,
  setShowLegend,
  isTouchingMapMobile,
  selectedCommunity,
  selectedCompareCommunity,
  showNotableTray,
  setShowNotableTray,
}) {
  // map hooks
  /**
   * @typedef TooltipCompData
   *
   * @property {pickingInfo} - The entire picking information object from
   *    Deck.gl.
   * @property {object} tooltipProperties - Tooltip properties from the Deck.gl
   *    picking information, mainly for convenience.
   * @property {number[]} coords - Lng/Lat coordinates of the tooltip
   * @property {object} pos - The projection onto screen-space, an object with
   *    `x` and `y` properties representing the number of pixels from the left
   *    and top, respectively.
   *
   */

  const [tooltipCompData1, setTooltipCompData1] = useState(null);
  const [tooltipCompData2, setTooltipCompData2] = useState(null);
  const [viewStateLocal, setViewStateLocal] = useState(DEFAULT_VIEW_STATE);
  const [underperformers, setUnderperformers] = useState(null);
  const [transportationModesArray, setTransportationModesArray] = useState([]);
  const [highlightFeature, sethighlightFeature] = useState(null);
  const [renderBaseMap, setRenderBaseMap] = useState(true);

  // console.log(tooltipCompData1, tooltipCompData2);

  const deckRef = useRef(null);
  const mapRef = useRef(null);
  const dataScale = useRef('q'); //set to "equal" for equal binning, "q" for quantile binning
  // const [searchPoint, setSearchPoint] = useState([[], []]);

  useEffect(() => {
    debounce(updateTooltipPositions, 750)();
  }, [deckRef.current?.deck.width, collapseMap, viewStateLocal]);

  // both of these should be hooks they are being re-rendered on every frame - made them memo and then moved to app.js
  // const selectedCommunity = communitySearch
  //   ? boundary == 'council'
  //     ? councils[communitySearch]
  //     : communities[communitySearch]
  //   : null;

  // const selectedCompareCommunity = compareSearch
  //   ? boundary == 'council'
  //     ? councils[compareSearch]
  //     : communities[compareSearch]
  //   : null;

  const handleDeckRenderError = (e) => {
    console.error(e);
    console.error('COULD NOT RENDER MAP');
    setRenderBaseMap(false);
  };

  /**
   * If global view state changes, change the local view state. This is done to
   * make sure the map is loaded properly from a link.
   */
  useEffect(() => {
    // Update the zoom bounds just in case
    setViewStateLocal({ ...viewState, minZoom: ZOOM_MIN, maxZoom: ZOOM_MAX });
  }, [viewState]);

  useEffect(() => {
    // Remove comparison tooltips if the user deselects comparisons from the
    // search bar
    if (communitySearch === null) {
      setTooltipCompData1(null);
    }

    if (compareSearch === null) {
      setTooltipCompData2(null);
    }
  }, [compareSearch, communitySearch]);

  useEffect(() => {
    const modes = [];
    if (toggleWalk) {
      modes.push('Walk');
    }
    if (toggleBike) {
      modes.push('Bike');
    }
    if (toggleTransit) {
      modes.push('Take Public Transit');
    }

    setTransportationModesArray(modes);
  }, [toggleTransit, toggleBike, toggleWalk]);

  const getStaticTooltipPos = (coords) => {
    const projection = mapRef.current?.getMap()?.project(coords);
    if (!projection) {
      return;
    }
    // Add an offset of 15 pixels from the left and top
    projection.x += viewStateLocal.zoom;
    projection.y += viewStateLocal.zoom;
    return projection;
  };

  const updateTooltipPositions = () => {
    // Update tooltip 1
    // console.log('Updating tooltip pos', tooltipCompData1?.coords);
    if (tooltipCompData1?.coords) {
      const projection = getStaticTooltipPos(tooltipCompData1.coords);
      if (projection !== tooltipCompData1.pos) {
        setTooltipCompData1({ ...tooltipCompData1, pos: projection });
      }
    }

    // Update tooltip 2
    if (tooltipCompData2?.coords) {
      const projection = getStaticTooltipPos(tooltipCompData2.coords);
      if (projection !== tooltipCompData2.pos) {
        setTooltipCompData2({ ...tooltipCompData2, pos: projection });
      }
    }
  };

  // 01.4 Color Scale function

  const COLOR_SCALE =
    infoTransfer != null
      ? dataScale == 'equal'
        ? scaleThreshold()
            .domain(infoTransfer != null ? infoTransfer?.binList : [0, 1])
            .range(_CHAPTER_COLORS[colorRamp])
        : scaleQuantile()
            .domain(
              infoTransfer != null ? infoTransfer?.uniqueValueArray : [0, 1]
            )
            .range(_CHAPTER_COLORS[colorRamp])
      : null; //quantile bins

  // 01 CREATE METRIC COLOR RAMPS END ---------------------------------------------------------------------------

  // 02 IDENTIFY NEIGHBORHOODS IN NEED ---------------------------------------------------------------------------
  // 02.1 Get low performers and ignore parks/graveyards/airports

  // REPLACE MAP SCALE WITH BOUNDARY SCALE
  // console.log(infoTransfer?.mapScale);

  useEffect(() => {
    if (toggleUnderperformers && infoTransfer?.selectedMetric) {
      const performanceBar = infoTransfer?.mapScale.features
        .map((value) => {
          if (
            (!zoomToggle && value.properties.AnsUnt_YN == 'Y') ||
            (zoomToggle &&
              boundary == 'community' &&
              value.properties.Data_YN == 'Y') ||
            (zoomToggle && boundary == 'council')
          ) {
            return value.properties[infoTransfer?.selectedMetric];
          }
        })
        .sort(function (a, b) {
          // return the sorted list of values depending if you want the highest scores or lowest scores of a given metric
          if (typeof infoTransfer?.metricGoodorBad == 'number') {
            return infoTransfer?.metricGoodorBad == 1
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
  if (showDemographics) {
    selectedDemographic = demoLookup[demographic]?.lookup;
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
  if (infoTransfer !== null) {
    getDemoArray(infoTransfer?.selectedBoundary, selectedDemoArray);
    getDemoArray(_NEIGHBORHOODS, neighborhoodDemoArray);
  }

  // demographic array for the neighborhood scale

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
  const onViewStateChange = ({ viewState }) => {
    // console.log('viewstate', viewState, 'newViewState', newViewState);
    // console.debug('Updating view state');

    // if (!mapDemographics) {
    //   setViewStateLocal(() => ({
    //     primary: viewState,
    //     splitLeft: viewState,
    //     splitRight: viewState,
    //   }));
    // }
    // 04.1 set constraints on view state

    const newViewStateProps = {};

    newViewStateProps.longitude = Math.min(
      LONGITUDE_RANGE[1],
      Math.max(LONGITUDE_RANGE[0], viewState.longitude)
    );

    newViewStateProps.latitude = Math.min(
      LATITUDE_RANGE[1],
      Math.max(LATITUDE_RANGE[0], viewState.latitude)
    );

    newViewStateProps.width = '100%';

    setViewStateLocal({ ...viewState, ...newViewStateProps });

    // 04.2 ramp in/out based on zoom level

    // 04.3 toggle based on zoom level
    if (viewState.zoom > 12.25 && zoomToggle) {
      // console.log('switch in');
      setzoomToggle(0);
      sethandleLegend(0);
    } else if (viewState.zoom < 12.25 && !zoomToggle) {
      // console.log('switch out');
      setzoomToggle(1);
      sethandleLegend(1);
    }
    debounce(updateTooltipPositions, 50)();
  };

  const zoomIn = ({}) => {
    updateTooltipPositions();

    setViewStateLocal({
      ...viewStateLocal,
      zoom: min([ZOOM_MAX, viewStateLocal.zoom + BUTTON_ZOOM_STEP]),
      transitionDuration: 500,
      transitionInerpolator: new LinearInterpolator(),
    });
  };

  const zoomOut = ({}) => {
    updateTooltipPositions();

    setViewStateLocal({
      ...viewStateLocal,
      zoom: max([ZOOM_MIN, viewStateLocal.zoom - BUTTON_ZOOM_STEP]),
      transitionDuration: 500,
      transitionInerpolator: new LinearInterpolator(),
    });
  };
  // 04 VIEWSTATE CONTROL END ----------------------------------------------------------------------------------------------

  // 05 TOOLTIP ----------------------------------------------------------------------------------------------
  const getDeckGlTooltip = (info) => {
    // update auto highlight
    sethighlightFeature(info.index);

    const tooltipElement = (
      <MapTooltip
        infoTransfer={infoTransfer}
        boundary={boundary}
        selectedChapter={selectedChapter}
        selectedCoord={selectedCoord}
        issues={issues}
        selectedDemographic={selectedDemographic}
        toggleTransit={toggleTransit}
        toggleBike={toggleBike}
        toggleWalk={toggleWalk}
        demographic={demographic}
        selectedSpecificIssue={selectedSpecificIssue}
        demoLookup={demoLookup}
        transportationModesArray={transportationModesArray}
        selectedDemoArray={selectedDemoArray}
        ethnicityColors={ethnicityColors}
        pickingInfoObject={info.object}
        pickingInfoIndex={info.index}
        tooltipProperties={info.object?.properties}
      />
    );

    const tooltipHtml = ReactDOMServer.renderToStaticMarkup(tooltipElement);

    if (tooltipHtml) {
      return {
        className: 'map-tooltip',
        html: tooltipHtml,
        style: {
          background: 'none',
          margin: '0',
          color: 'black',
          padding: '0',
        },
      };
    }
  };

  // 05 TOOLTIP END ----------------------------------------------------------------------------------------------

  const getCommunitySearch = (coord, b) => {
    const searchItemFound = [];
    const searchItemData = [];
    for (const [
      index,
      element,
    ] of infoTransfer?.selectedBoundary.features.entries()) {
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
        searchItemData.push({
          index: index,
          object: element,
          properties: element.properties,
        });
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
    // console.log('search engine type ', searchEngineType);

    // PRIMARY COMMUNITY SEARCH
    if (searchEngineType === 0 && selectedChapter === 3) {
      if (selectedCoord.length !== 2) {
        //console.debug('No coordinates, reset the view');
        setUserPoints([[], []]);
        setViewStateLocal(DEFAULT_VIEW_STATE);
        setTooltipCompData1(null);
        return;
      }

      const communitySearchResult = getCommunitySearch(searchEngine, boundary);
      const newCommunitySearch = communitySearchResult[0];

      if (!newCommunitySearch.length) {
        // Bad search, no results found
        //console.debug('A');
        setErrorCode(0);
        setBadSearch([1, badSearch[1]]);
        return;
      }
      const pickingInfo = communitySearchResult[1][0];

      if (
        searchSource !== 'search' &&
        (searchSource !== 'click' || newCommunitySearch[0] === communitySearch)
      ) {
        // Get the data of the selected community from the community search
        if (searchSource === 'click') {
          // user has clicked on already selected community
          setTooltipCompData1({
            ...pickingInfo,
            coords: searchEngine, // Search engine gives the position of the dots
            pos: getStaticTooltipPos(searchEngine),
          });
          setUserPoints([searchEngine, userPoints[1]]);
          return;
        }
        return;
      }

      console.debug('User clicked on map to get the primary community');

      // User clicked on the map for the community search
      setCommunitySearch(newCommunitySearch[0]);
      setBadSearch([0, badSearch[1]]);
      setUserPoints([searchEngine, userPoints[1]]);

      // Set the tooltip data of the primary community
      setTooltipCompData1({
        ...pickingInfo,
        coords: searchEngine, // Search engine gives the position of the dots
        pos: getStaticTooltipPos(searchEngine),
      });

      if (!compareSearch) {
        setViewStateLocal({
          ...viewStateLocal,
          longitude: selectedCoord[0],
          latitude: selectedCoord[1],
          zoom: ZOOM_MAX - 0.5,
          transitionDuration: 500,
          transitionInerpolator: new LinearInterpolator(),
        });

        return;
      }
      const ptA = selectedCoord;
      const ptB = selectedCompareCoord;
      const maxDistance = !mapDemographics ? 25 : 15;
      const ptCompareDistance =
        distance(point(ptA), point(ptB)) < maxDistance
          ? distance(point(ptA), point(ptB))
          : maxDistance;

      const remapZoom = !mapDemographics
        ? mapRange(ptCompareDistance, 0.3, maxDistance, ZOOM_MAX, ZOOM_MIN)
        : mapDemographics &&
          mapRange(ptCompareDistance, 0.3, maxDistance, ZOOM_MAX, ZOOM_MIN) -
            0.5 >
            ZOOM_MIN
        ? mapRange(ptCompareDistance, 0.3, maxDistance, ZOOM_MAX, ZOOM_MIN) -
          0.5
        : ZOOM_MIN;
      setViewStateLocal({
        ...viewStateLocal,
        longitude: (ptA[0] + ptB[0]) / 2,
        latitude: (ptA[1] + ptB[1]) / 2,
        zoom: !mapDemographics ? remapZoom : remapZoom - 0.5,
        transitionDuration: 500,
        transitionInerpolator: new LinearInterpolator(),
      });
    }

    // SELECT COMPARISON COMMUNITY
    if (searchEngineType === 1 && selectedChapter === 3) {
      if (selectedCompareCoord.length !== 2) {
        setTooltipCompData2(null);
        return;
      }

      const communitySearchResult = getCommunitySearch(searchEngine, boundary);
      const newCompareSearch = communitySearchResult[0];

      if (
        newCompareSearch.length > 0 &&
        newCompareSearch[0] !== communitySearch &&
        ((searchSource === 'click' && newCompareSearch[0] !== compareSearch) ||
          searchSource === 'search') &&
        selectedCoord.length === 2
      ) {
        // User clicked on the map to get the comparison community
        //console.debug('User clicked on map to get comparison community');
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
          ? mapRange(ptCompareDistance, 0.3, maxDistance, ZOOM_MAX, ZOOM_MIN)
          : mapDemographics &&
            mapRange(ptCompareDistance, 0.3, maxDistance, ZOOM_MAX, ZOOM_MIN) -
              0.5 >
              ZOOM_MIN
          ? mapRange(ptCompareDistance, 0.3, maxDistance, ZOOM_MAX, ZOOM_MIN) -
            0.5
          : ZOOM_MIN;

        setUserPoints([userPoints[0], searchEngine]);

        // Get the data of the selected community from the community search
        const pickingInfo = communitySearchResult[1][0];
        // Set the tooltip data of the comparison community
        setTooltipCompData2({
          ...pickingInfo,
          coords: searchEngine,
        });

        setViewStateLocal({
          ...viewStateLocal,
          longitude: (ptA[0] + ptB[0]) / 2,
          latitude: (ptA[1] + ptB[1]) / 2,
          zoom: !mapDemographics ? remapZoom : remapZoom - 0.5,
          transitionDuration: 500,
          transitionInerpolator: new LinearInterpolator(),
        });
        return;
      }

      if (
        newCompareSearch.length > 0 &&
        newCompareSearch[0] === compareSearch &&
        searchEngine.length === 2 &&
        searchSource === 'click'
      ) {
        // Clicked to get comparison community
        //console.debug('User clicked on map to unselect comparison community');
        setSelectedCompareCoord([]);
        setCompareSearch(null);
        setUserPoints([userPoints[0], []]);
        setViewStateLocal({
          ...viewStateLocal,
          longitude: selectedCoord[0],
          latitude: selectedCoord[1],
          zoom: ZOOM_MAX - 0.5,
          transitionDuration: 500,
          transitionInerpolator: new LinearInterpolator(),
        });
        setTooltipCompData2(null);
        return;
      }

      if (
        newCompareSearch.length > 0 &&
        newCompareSearch[0] === communitySearch &&
        searchEngine.length === 2
      ) {
        if (searchSource === 'search') {
          //console.debug('L');
          setErrorCode(1);
          setBadSearch([badSearch[0], 1]);
          return;
        }

        if (!compareSearch) {
          const pickingInfo = communitySearchResult[1][0];

          setTooltipCompData1({
            ...pickingInfo,
            coords: searchEngine, // Search engine gives the position of the dots
            pos: getStaticTooltipPos(searchEngine),
          });
          setUserPoints([searchEngine, userPoints[1]]);

          return;
        }

        // Update the search data
        // User unselected primary community, make the comparison one the primary one
        //console.debug(
        //  'User unselected primary community, make the comparison one the primary one'
        //);
        setCommunitySearch(compareSearch);
        setCompareSearch(null);
        setSelectedCoord(userPoints[1]);
        setUserPoints([userPoints[1], []]);
        setViewStateLocal({
          ...viewStateLocal,
          longitude: userPoints[1][0],
          latitude: userPoints[1][1],
          zoom: ZOOM_MAX - 0.5,
        });
        setSelectedCompareCoord([]);
        // Swap tooltip data
        setTooltipCompData1(tooltipCompData2);
        setTooltipCompData2(null);
        return;
      }

      // No above conditions matched, bad search
      //console.debug('User searched for comparison community but failed');
      setErrorCode(0);
      setBadSearch([badSearch[0], 1]);
    }
  }

  const scale = useRef(boundary); //had to add this to check if the useEffect was coming from new scale or new boundary
  useEffect(() => {
    // console.log('selectedCoord ', selectedCoord);
    //if (!addCompare || !communitySearch || boundary !== scale.current) {
    updateSearchEngine(selectedCoord, 0);
    //}
    scale.current = boundary;
  }, [selectedCoord, infoTransfer?.selectedBoundary]);

  useEffect(() => {
    // console.log('2');
    if (addCompare) {
      updateSearchEngine(selectedCompareCoord, 1);
    }
  }, [selectedCompareCoord, infoTransfer?.selectedBoundary]);

  useEffect(() => {
    if (!addCompare) {
      setUserPoints([userPoints[0], []]);
    }
  }, [addCompare]);

  // 06 Render lifecycle
  useEffect(() => {
    /*if (infoTransfer?.binList.length > 0) {
              setColorRamps(colorRamp);
            }*/
    setDemoLegendBins(demoBinList);
  }, [
    selectedSpecificIssue,
    zoomToggle,
    infoTransfer?.selectedBoundary,
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
        let fillValue = parseFloat(f.properties[infoTransfer?.selectedMetric]);

        if (f.properties.AnsUnt_YN == 'Y') {
          if (isNaN(fillValue)) {
            return [0, 0, 0, 0];
          } else {
            return COLOR_SCALE(f.properties[infoTransfer?.selectedMetric]);
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
        getFillColor: [infoTransfer?.selectedMetric],
      },
    }),

    new GeoJsonLayer({
      id: 'administrative-choropleth',
      data: infoTransfer?.selectedBoundary,
      filled: true,
      getFillColor: (f) => {
        let fillValue = parseFloat(f.properties[infoTransfer?.selectedMetric]);
        if (
          isNaN(fillValue) ||
          (boundary == 'community' && f.properties.Data_YN == 'N')
        ) {
          return [0, 0, 0, 0];
        } else {
          // return [255, 0, 0, 255];
          return COLOR_SCALE(f.properties[infoTransfer?.selectedMetric]);
        }
      },
      getTextSize: 320,
      opacity: CHOROPLETH_OPACITY,
      visible: zoomToggle,

      updateTriggers: {
        getFillColor: [infoTransfer?.selectedMetric, addCompare],
      },
    }),

    new GeoJsonLayer({
      id: 'administrative-choropleth-highlights',
      data: infoTransfer?.selectedBoundary,
      filled: true,
      stroked: true,

      getLineWidth: (w) => {
        let boundaryValue = parseFloat(
          w.properties[infoTransfer?.selectedMetric]
        );
        if (
          toggleUnderperformers === true &&
          (boundary == 'council' ||
            (boundary == 'community' && w.properties.Data_YN == 'Y'))
        ) {
          if (infoTransfer?.metricGoodorBad == 1) {
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
        let fillValue = parseFloat(f.properties[infoTransfer?.selectedMetric]);
        if (
          toggleUnderperformers === true &&
          (boundary == 'council' ||
            (boundary == 'community' && f.properties.Data_YN == 'Y'))
        ) {
          if (infoTransfer?.metricGoodorBad == 1) {
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
          w.properties[infoTransfer?.selectedMetric]
        );
        if (toggleUnderperformers === true && w.properties.AnsUnt_YN == 'Y') {
          if (infoTransfer?.metricGoodorBad == 1) {
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
        let fillValue = parseFloat(f.properties[infoTransfer?.selectedMetric]);
        if (toggleUnderperformers === true && f.properties.AnsUnt_YN == 'Y') {
          if (infoTransfer?.metricGoodorBad == 1) {
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
      data: infoTransfer?.selectedBoundary,
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
          case 1:
            color = ethnicityColors.Latino.deckFormat; // latino
            break;
          case 2:
            return ethnicityColors.White.deckFormat; // white
            break;
          case 3:
            return ethnicityColors.Black.deckFormat; // black
            break;
          case 4:
            return ethnicityColors.Indigenous.deckFormat; // indigenous
            break;
          case 5:
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
      id: 'nyc-boundaries',
      data: nycBoundary.features,
      stroked: true,
      filled: true,
      getFillColor: [255, 255, 255, 200],
      getLineColor: [0, 0, 0, 255],
      // lineWidthUnits: 'meters',
      getLineWidth: 3,
      lineWidthMinPixels: 1,
    }),

    new GeoJsonLayer({
      id: 'administrative-boundaries',
      data: infoTransfer?.selectedBoundary,
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
      data: infoTransfer?.selectedBoundary,
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
            : selectedIssue
            ? defaultColors[selectedIssue - 1]
            : [255, 0, 0, 255];
        }
        return [0, 0, 0, 0];
      },
      getLineWidth: 100,
      updateTriggers: {
        getLineColor: [
          infoTransfer?.selectedMetric,
          addCompare,
          communitySearch,
          compareSearch,
          selectedIssue,
        ],
      },
    }),

    new TextLayer({
      id: 'neighborhood-names',
      data: _NEIGHBORHOOD_NAMES.features,
      fontFamily: 'Inter',
      characterSet: 'auto',
      sizeUnits: 'meters',
      fontWeight: '1000',
      getColor: infoTransfer?.selectedMetric
        ? [255, 255, 255, 255]
        : [0, 0, 0, 255],
      getText: (d) => splitHyphens(d.properties.NTAName.toUpperCase()),
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
      lineWidthMinPixels: 1,
      getPosition: (d) => d,
      getRadius: 30,
      getFillColor: [0, 0, 0, 255],
      getLineColor: [255, 255, 255, 255],
    }),
  ];

  const layerFilter = useCallback(({ layer, viewport }) => {
    if (!showMap && selectedSpecificIssue) return false;

    const metricList = [];
    const annoList = [];
    const demoList = [];

    for (let i = 0; i < metricLayers.length; i++) {
      metricList.push(metricLayers[i].id);
    }
    for (let i = 0; i < annoLayers.length; i++) {
      annoList.push(annoLayers[i].id);
    }
    for (let i = 0; i < demoLayers.length; i++) {
      demoList.push(demoLayers[i].id);
    }

    // case 1: single view
    if (
      annoList.includes(layer.id) ||
      (metricList.includes(layer.id) &&
        !mapDemographics &&
        selectedSpecificIssue) ||
      (demoList.includes(layer.id) && mapDemographics && !selectedSpecificIssue)
    ) {
      return true;
      // case 2: split screen left
    } else if (metricList.includes(layer.id) && selectedSpecificIssue) {
      return viewport.id == 'splitLeft';
      // case 2: split screen right
    } else if (demoList.includes(layer.id) && mapDemographics) {
      return viewport.id == 'splitRight';
    }

    // case 2: split screen

    // else if (metricList.includes(layer.id) && viewport.id !== 'splitRight') {
    //   return true;
    // }
    // else if (
    //   demoList.includes(layer.id) &&
    //   mapDemographics &&
    //   !selectedSpecificIssue &&
    //   viewport.id !== 'splitRight'
    // ) {
    //   return true;
    // } else if (
    //   demoList.includes(layer.id) &&
    //   mapDemographics &&
    //   selectedSpecificIssue &&
    //   viewport.id == 'splitRight'
    // ) {
    //   return true;
    // }
  });

  const getCurrentMapViews = () => {
    if (!showMap && (showMap || selectedSpecificIssue)) {
      return null;
    }
    if (mapDemographics && selectedSpecificIssue) {
      return [SPLIT_VIEW_LEFT, SPLIT_VIEW_RIGHT];
    }
    return [MAIN_VIEW];
  };

  return (
    <div
      onTouchMove={() => {
        if (isMobile && showDropDown) setShowDropDown(false);
        if (isMobile && showSubDropDown) setShowSubDropDown(false);
        if (isMobile && showLegend) {
          isTouchingMapMobile.current = 1;
          setShowLegend(false);
        }
        if (isMobile && showNotableTray) {
          isTouchingMapMobile.current = 2;
          setShowNotableTray(false);
        }
      }}
      onTouchEnd={() => {
        if (isMobile && !showLegend && isTouchingMapMobile.current == 1) {
          setShowLegend(true);
        }
        if (isMobile && !showNotableTray && isTouchingMapMobile.current == 2) {
          setShowNotableTray(true);
        }
      }}
    >
      {!isMobile && (
        <div className="map-notable-container transition-height overflow-hidden">
          {selectedCommunity && (
            <MapNotableIndicators
              selectedCommunity={selectedCommunity}
              communitySearch={communitySearch}
              councils={councils}
              communities={communities}
              setSelectedSpecificIssue={setSelectedSpecificIssue}
              issues={issues}
              boundary={boundary}
              selectedSpecificIssue={selectedSpecificIssue}
            />
          )}
          {compareSearch && addCompare && (
            <MapNotableIndicators
              selectedCommunity={selectedCompareCommunity}
              communitySearch={compareSearch}
              councils={councils}
              communities={communities}
              setSelectedSpecificIssue={setSelectedSpecificIssue}
              issues={issues}
              boundary={boundary}
              selectedSpecificIssue={selectedSpecificIssue}
            />
          )}
        </div>
      )}
      {showMap && (
        <div className="map-zoom-toggle map-zoom-buttons-container">
          <FontAwesomeIcon onClick={zoomIn} icon={faPlus} />
          <FontAwesomeIcon onClick={zoomOut} icon={faMinus} />
        </div>
      )}
      {/* Static tooltip 1 */}
      {tooltipCompData1?.pos && (
        <div
          className="map-tooltip map-pinned noselect"
          style={{
            zIndex: '2',
            left: tooltipCompData1.pos.x,
            top: tooltipCompData1.pos.y,
          }}
        >
          <MapTooltip
            infoTransfer={infoTransfer}
            boundary={boundary}
            selectedChapter={selectedChapter}
            selectedCoord={selectedCoord}
            issues={issues}
            selectedDemographic={selectedDemographic}
            toggleTransit={toggleTransit}
            toggleBike={toggleBike}
            toggleWalk={toggleWalk}
            demographic={demographic}
            selectedSpecificIssue={selectedSpecificIssue}
            demoLookup={demoLookup}
            transportationModesArray={transportationModesArray}
            selectedDemoArray={selectedDemoArray}
            ethnicityColors={ethnicityColors}
            tooltipProperties={tooltipCompData1?.properties}
            pickingInfoObject={tooltipCompData1?.object}
            pickingInfoIndex={tooltipCompData1?.index}
            exit={true}
            toggleTooltip={setTooltipCompData1}
          />
        </div>
      )}
      {/* Static tooltip 2 */}
      {tooltipCompData2?.pos && (
        <div
          className="map-tooltip map-pinned noselect"
          style={{
            zIndex: tooltipCompData2.zIndex || '1',
            left: tooltipCompData2.pos.x,
            top: tooltipCompData2.pos.y,
          }}
          onMouseOver={() =>
            setTooltipCompData2((data) => ({ ...data, zIndex: '2' }))
          }
          onMouseOut={() =>
            setTooltipCompData2((data) => ({ ...data, zIndex: '1' }))
          }
        >
          <MapTooltip
            infoTransfer={infoTransfer}
            boundary={boundary}
            selectedChapter={selectedChapter}
            selectedCoord={selectedCoord}
            issues={issues}
            selectedDemographic={selectedDemographic}
            toggleTransit={toggleTransit}
            toggleBike={toggleBike}
            toggleWalk={toggleWalk}
            demographic={demographic}
            selectedSpecificIssue={selectedSpecificIssue}
            demoLookup={demoLookup}
            transportationModesArray={transportationModesArray}
            selectedDemoArray={selectedDemoArray}
            ethnicityColors={ethnicityColors}
            tooltipProperties={tooltipCompData2?.properties}
            pickingInfoObject={tooltipCompData2?.object}
            pickingInfoIndex={tooltipCompData2?.index}
            exit={true}
            toggleTooltip={setTooltipCompData2}
          />
        </div>
      )}
      <DeckGL
        style={{ backgroundColor: 'black' }}
        viewState={viewStateLocal}
        onViewStateChange={onViewStateChange}
        views={getCurrentMapViews()}
        controller={true}
        layers={[metricLayers, demoLayers, annoLayers]}
        getCursor={() => 'crosshair'}
        getTooltip={!isMobile ? getDeckGlTooltip : null}
        layerFilter={layerFilter}
        ref={deckRef}
        onError={handleDeckRenderError}
      >
        {renderBaseMap &&
          (!mapDemographics || (mapDemographics && !selectedSpecificIssue)) && (
            <MapView id="primary">
              <Map
                key={'map-key'}
                ref={mapRef}
                reuseMaps
                mapStyle={MAP_STYLE}
                preventStyleDiffing={true}
                mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
                attributionControl={false}
                logoPosition="top-right"
              />
              {collapseMap && (selectedSpecificIssue || mapDemographics) && (
                <div key={'map-header'} style={SPLIT_SCREEN_POSITIONING}>
                  <div style={SPLIT_SCREEN_HEADER}>
                    {issues.specific_issues_data[selectedSpecificIssue]
                      ?.specific_issue_name ||
                      `${
                        demoLookup[demographic].lookup == 'F10_TrsBkW'
                          ? `Commuters Who ${getTransportationModes(
                              transportationModesArray
                            )}`
                          : demoLookup[demographic].name
                      }`}{' '}
                    by{' '}
                    {boundary == 'community'
                      ? 'Community Board'
                      : 'City Council Districts'}
                  </div>
                </div>
              )}
            </MapView>
          )}

        {mapDemographics && selectedSpecificIssue && (
          <MapView id="splitLeft">
            <Map
              key={'map-key-left'}
              reuseMaps
              mapStyle={MAP_STYLE}
              preventStyleDiffing={true}
              mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
              attributionControl={false}
              logoPosition="top-right"
            />
            <div style={MAP_BACKGROUND_STYLE} />
            {selectedSpecificIssue && (
              <div key={'map-header-left'} style={SPLIT_SCREEN_POSITIONING}>
                <div style={SPLIT_SCREEN_HEADER}>
                  {
                    issues.specific_issues_data[selectedSpecificIssue]
                      .specific_issue_name
                  }{' '}
                  by{' '}
                  {boundary == 'community'
                    ? 'Community Board'
                    : 'City Council Districts'}
                </div>
              </div>
            )}
          </MapView>
        )}
        {mapDemographics && selectedSpecificIssue && (
          <MapView id="splitRight">
            <Map
              key={'map-key-right'}
              reuseMaps
              mapStyle={MAP_STYLE}
              preventStyleDiffing={true}
              mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
              attributionControl={false}
              logoPosition="top-right"
            />
            <div style={MAP_BACKGROUND_STYLE} />
            {demographic && (
              <div key={'map-header-right'} style={SPLIT_SCREEN_POSITIONING}>
                <div style={SPLIT_SCREEN_HEADER}>
                  {demoLookup[demographic].lookup == 'F10_TrsBkW'
                    ? `Commuters Who ${getTransportationModes(
                        transportationModesArray
                      )}`
                    : demoLookup[demographic].name}
                </div>
              </div>
            )}
          </MapView>
        )}
      </DeckGL>
    </div>
  );
}
