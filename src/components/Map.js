// dependencies
import { useState, useCallback, useEffect, useMemo } from "react";
import DeckGL from "@deck.gl/react";
import { Map } from "react-map-gl";
import { GeoJsonLayer, TextLayer, ScatterplotLayer } from "@deck.gl/layers";
import { scaleThreshold, scaleQuantile } from "d3-scale";
import { MaskExtension, FillStyleExtension } from "@deck.gl/extensions";
import { max } from "d3-array";

// data
// import _ISSUES from "../texts/issues.json";
import _NEIGHBORHOODS from "../data/nta_scores.json";
import _COUNCIL_DISTRICTS from "../data/council_districts.json"; //council districts
import _COMMUNITY_BOARDS from "../data/community_boards.json"; //community boards
import _NEIGHBORHOOD_NAMES from "../data/neighborhood_names.json";
import _ETHNICITY from "../data/ethnicity.json";
import _FILL_PATTERN from "../data/fill_pattern.json";
import _HATCH_ATLAS from "../data/hatch_pattern.png";
import _CHAPTER_COLORS from "../data/chapter_colors.json";

import "mapbox-gl/dist/mapbox-gl.css";

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const mapStyle = "mapbox://styles/mitcivicdata/cl6fa3jro002d14qxp2nu9wng"; //toner

// Map Viewport settings
const zoomMin = 10.5;
const zoomMax = 13;

// color ramps
const choroplethOpacity = 0.85;
const healthRamp = _CHAPTER_COLORS.health;
const envRamp = _CHAPTER_COLORS.env;
const infraRamp = _CHAPTER_COLORS.infra;
const binSize = 5; // number of bins in the color ramp

// map starting position and view state constraints
const INITIAL_VIEW_STATE = {
  longitude: -73.9,
  latitude: 40.7131,
  zoom: 10,
  minZoom: zoomMin,
  maxZoom: zoomMax,
  pitch: 0,
  bearing: 0,
};
const LONGITUDE_RANGE = [-74.25, -73.7];
const LATITUDE_RANGE = [40.5, 40.9];

export default function DeckMap({
  issues,
  selectedIssue,
  selectedSpecificIssue,
  boundary,
  showDemographics,
  mapDemographics,
  demographic,
  legendBins,
  setLegendBins,
  colorRamps,
  setColorRamps,
  toggleUnderperformers,
  setToggleUnderperformers,
  demoLookup,
}) {
  // map hooks
  const [hoverInfo, setHoverInfo] = useState();
  const [zoomToggle, setzoomToggle] = useState(1);
  const [inverseZoomToggle, setinverseZoomToggle] = useState(1);
  const [zoomRamp, setzoomRamp] = useState(1);
  const [layerColorRamp, setLayerColorRamp] = useState(1);
  const [handleLegend, sethandleLegend] = useState(0);

  // SELECT BOUNDARY ------------------------------------------------------------
  let selectedBoundary;
  if (boundary === "council") {
    selectedBoundary = _COUNCIL_DISTRICTS;
  }
  if (boundary === "community") {
    selectedBoundary = _COMMUNITY_BOARDS;
  }

  // toggle between council districts and community boards
  const mapScale =
    handleLegend == 0
      ? _NEIGHBORHOODS
      : handleLegend == 1 && selectedBoundary == _COUNCIL_DISTRICTS
      ? _COUNCIL_DISTRICTS
      : _COMMUNITY_BOARDS;

  // SELECT BOUNDARY END --------------------------------------------------------

  // METRIC CONFIG -----------------------------------------------------

  // select metric to display
  let selectedMetric;
  let metricGoodBad; // Declare whether metric is good or bad at high values (for hatching areas)
  if (selectedSpecificIssue !== null) {
    if (selectedSpecificIssue !== false) {
      selectedMetric =
        issues.specific_issues_data[selectedSpecificIssue].json_id;
      metricGoodBad =
        issues.specific_issues_data[selectedSpecificIssue].good_or_bad;
    }
  }

  // 01 CREATE METRIC COLOR RAMPS -------------------------------------------------------

  //variables for scale thresholds
  const selectedMetricArray = []; // a clean array of values for the color ramp with no NaN and no Null values
  const binList = []; // derived from the selectedMetricArray array, this is the list of bins for the legend

  // pick color ramp for metrics and have default to avoid errors
  const selectedRamp =
    selectedIssue === 1
      ? healthRamp
      : selectedIssue === 2
      ? envRamp
      : infraRamp;

  // 01.1 get an array of all the values for the selected metric
  for (let i = 0; i < mapScale.features.length; i++) {
    let floatValue = parseFloat(
      mapScale.features[i].properties[selectedMetric]
    );
    if (isNaN(floatValue) === false) {
      selectedMetricArray.push(floatValue);
    }
  }

  // 01.2 break the metric array into bins and get the bin list
  for (let i = 0; i < binSize; i++) {
    let threshold = (max(selectedMetricArray) / binSize) * (i + 1);
    binList.push(Math.round(threshold * 100) / 100);
  }

  // 01.3 set legend scale and color
  useEffect(() => {
    if (binList.length > 0) {
      setLegendBins(binList);
      setColorRamps(selectedRamp);
    }
  }, [selectedSpecificIssue, zoomRamp, selectedBoundary]);

  // 01.4 Color Scale function
  let COLOR_SCALE = scaleThreshold().domain(binList).range(selectedRamp); //equal bins
  // 01 CREATE METRIC COLOR RAMPS END ---------------------------------------------------------------------------

  // 02 IDENTIFY NEIGHBORHOODS IN NEED ---------------------------------------------------------------------------
  // 02.1 Get low performers and ignore parks/graveyards/airports
  const setPerformanceBar = [];
  for (let i = 0; i < mapScale.features.length; i++) {
    if (
      (boundary == "community" &&
        mapScale.features[i].properties.Data_YN == "Y") ||
      boundary == "council"
    ) {
      setPerformanceBar.push(
        parseFloat(mapScale.features[i].properties[selectedMetric])
      );
    }
  }

  // 02.2 Get the 5 lowest performers
  setPerformanceBar.sort(function (a, b) {
    // return the sorted list of values depending if you want the highest scores or lowest scores of a given metric
    if (typeof metricGoodBad == "number") {
      return issues.specific_issues_data[selectedSpecificIssue].good_or_bad == 1
        ? b - a // highest scores
        : a - b; // lowest scores
    }
  });
  const underperformers = setPerformanceBar[4]; //get the 5 worst performing values

  // 02 IDENTIFY NEIGHBORHOODS IN NEED END -----------------------------------------------------------------------

  // 03 DEMOGRAPHICS ----------------------------------------------------------------------------------------------
  //variables for scale thresholds
  let selectedDemographic;
  let toggleScatterPlot = false; //scatter plot viz
  let toggleDemChoropleth = false; //standard choropleth viz but for demographics
  const selectedDemoArray = []; // a clean array of values for the color ramp with no NaN and no Null values
  const demoBinList = []; // derived from the selectedDemoArray array, this is the list of bins for the legend

  // 03.1 toggle demographics on off and pick which to display
  if (showDemographics && mapDemographics) {
    selectedDemographic = demoLookup[demographic].name;
    if (demographic === "1" && toggleScatterPlot === false) {
      toggleScatterPlot = true;
    } else if (parseFloat(demographic) > 1 && toggleDemChoropleth === false) {
      toggleDemChoropleth = true;
    } else {
      toggleScatterPlot = false;
      toggleDemChoropleth = false;
    }
  }

  // 03.2 get an array of all the values for the selected demographic
  for (let i = 0; i < selectedBoundary.features.length; i++) {
    selectedDemoArray.push(
      parseFloat(selectedBoundary.features[i].properties[selectedDemographic])
    );
  }

  // 03.3 break the demographic array into bins and get the bin list
  for (let i = 0; i < binSize; i++) {
    let threshold = (max(selectedDemoArray) / binSize) * (i + 1);
    demoBinList.push(Math.round(threshold * 100) / 100);
  }

  // 03.4 select the color ramp from the json lookup for demographics and create a default to "1" to avoid errors
  let selectedDemoRamp =
    demoLookup[demographic] !== undefined
      ? demoLookup[demographic].colorRamp
      : demoLookup["default"].colorRamp;

  // 03.4 function for demographics scale
  let DEMO_COLOR_SCALE = scaleThreshold()
    .domain(demoBinList)
    .range(selectedDemoRamp); //equal bins

  // 03 DEMOGRAPHICS END ----------------------------------------------------------------------------------------------

  // 04 VIEWSTATE CONTROL ----------------------------------------------------------------------------------------------
  const onViewStateChange = useCallback(({ viewState }) => {
    // 04.1 set constraints on view state
    viewState.longitude = Math.min(
      LONGITUDE_RANGE[1],
      Math.max(LONGITUDE_RANGE[0], viewState.longitude)
    );
    viewState.latitude = Math.min(
      LATITUDE_RANGE[1],
      Math.max(LATITUDE_RANGE[0], viewState.latitude)
    );

    // 04.2 ramp in/out based on zoom level
    const ramp =
      0 + ((viewState.zoom - zoomMin) * (0.85 - 0)) / (zoomMax - zoomMin);
    setzoomRamp(ramp);

    const cRamp =
      0 + ((viewState.zoom - zoomMin) * (175 - 0)) / (zoomMax - zoomMin);
    setLayerColorRamp([50, 50, 50, cRamp]); // set color ramp to cRamp value

    // 04.3 toggle based on zoom level
    if (viewState.zoom > 12.5) {
      setzoomToggle(1);
      setinverseZoomToggle(0);
      sethandleLegend(0);
    } else {
      setzoomToggle(0);
      setinverseZoomToggle(1);
      sethandleLegend(1);
    }
  }, []);
  // 04 VIEWSTATE CONTROL END ----------------------------------------------------------------------------------------------

  const layers = [
    new GeoJsonLayer({
      id: "neighborhoods",
      data: _NEIGHBORHOODS.features,
      stroked: false,
      filled: true,
      getFillColor: (f) => {
        let fillValue = parseFloat(f.properties[selectedMetric]);

        if (f.properties.AnsUnt_YN == "Y") {
          if (isNaN(fillValue)) {
            return [0, 0, 0, 0];
          } else {
            return COLOR_SCALE(f.properties[selectedMetric]);
          }
        } else {
          return [0, 0, 0, 0];
        }
      },
      lineWidthUnits: "pixels",
      opacity: choroplethOpacity,
      visible: zoomToggle,
      // update triggers
      updateTriggers: {
        getFillColor: [selectedMetric],
      },
    }),

    new GeoJsonLayer({
      id: "administrative-choropleth",
      data: selectedBoundary,
      filled: true,
      getFillColor: (f) => {
        let fillValue = parseFloat(f.properties[selectedMetric]);
        if (boundary == "community") {
          if (f.properties.Data_YN == "N") {
            return [0, 0, 0, 0];
          }
        }
        if (isNaN(fillValue)) {
          return [0, 0, 0, 0];
        }
        // else if (fillValue == 0) {
        //   return [50, 50, 50, 0];
        // }
        else {
          // return [255, 0, 0, 255];
          return COLOR_SCALE(f.properties[selectedMetric]);
        }
      },
      opacity: choroplethOpacity,
      visible: inverseZoomToggle,

      onHover: (info) => setHoverInfo(info),
      updateTriggers: {
        getFillColor: [selectedMetric],
      },
    }),

    new GeoJsonLayer({
      id: "administrative-choropleth-highlights",
      data: selectedBoundary,
      filled: true,
      stroked: true,

      getFillColor: (f) => {
        if (boundary == "community") {
          if (f.properties.Data_YN == "N") {
            return [0, 0, 0, 0];
          }
        }
        return [0, 0, 0, 255];
      },
      lineWidthUnits: "meters",
      lineWidthMinPixels: 1,

      getLineColor: (f) => {
        if (
          boundary == "council" ||
          (boundary == "community" && f.properties.Data_YN == "Y")
        ) {
          return [0, 0, 0, 255];
        }
        return [0, 0, 0, 0];
      },

      getLineWidth: (w) => {
        let strokeValue = parseFloat(w.properties[selectedMetric]);
        if (
          toggleUnderperformers === true &&
          (boundary == "council" ||
            (boundary == "community" && w.properties.Data_YN == "Y"))
        ) {
          if (metricGoodBad == 1) {
            return strokeValue >= underperformers ? 100 : 0;
          } else {
            return strokeValue <= underperformers ? 100 : 0;
          }
        }
        return 0;
      },

      opacity: choroplethOpacity,
      visible: inverseZoomToggle,

      // props added by FillStyleExtension
      fillPatternMask: true,
      fillPatternAtlas: _HATCH_ATLAS,
      fillPatternMapping: _FILL_PATTERN,
      getFillPattern: (f) => {
        let fillValue = parseFloat(f.properties[selectedMetric]);
        if (toggleUnderperformers === true) {
          if (metricGoodBad == 1) {
            return fillValue >= underperformers
              ? "hatch-pattern"
              : "hatch-solid";
          } else {
            return fillValue <= underperformers
              ? "hatch-pattern"
              : "hatch-solid";
          }
        }
        return "hatch-solid";
      },
      getFillPatternScale: 10,
      getFillPatternOffset: [0, 0],
      // Define extensions
      extensions: [new FillStyleExtension({ pattern: true })],

      updateTriggers: {
        getLineWidth: [selectedMetric, toggleUnderperformers],
        getFillPattern: [selectedMetric, toggleUnderperformers],
      },
    }),

    new GeoJsonLayer({
      id: "administrative-boundaries",
      data: selectedBoundary,
      stroked: true,
      filled: true,
      getFillColor: [255, 255, 255, 0],
      getLineColor: (f) => {
        if (
          boundary == "council" ||
          (boundary == "community" && f.properties.Data_YN == "Y")
        ) {
          return [0, 0, 0, 255];
        }
        return [0, 0, 0, 0];
      },
      lineWidthUnits: "meters",
      getLineWidth: (w) => {
        if (
          boundary == "council" ||
          (boundary == "community" && w.properties.Data_YN == "Y")
        ) {
          return 50;
        }
        return 0;
      },
      lineWidthMinPixels: 1,
      pickable: true,
      autoHighlight: true,
      highlightColor: [217, 255, 0, 215],
      onClick: (info) => {
        if (boundary == "council") {
          console.log(
            selectedBoundary.features[info.index].properties.CounDist
          );
        }
        console.log(
          selectedMetric,
          selectedBoundary.features[info.index].properties[selectedMetric]
        );
      },
    }),

    new GeoJsonLayer({
      id: "demographics-choropleth",
      data: selectedBoundary,
      stroked: true,
      filled: true,
      getFillColor: (f) => {
        let fillValue = parseFloat(f.properties[selectedDemographic]);
        if (boundary == "community") {
          if (f.properties.Data_YN == "N") {
            return [0, 0, 0, 0];
          }
        }
        // return COLOR_SCALE(fillValue);
        return DEMO_COLOR_SCALE(fillValue);
      },
      getLineColor: (f) => {},
      getLineWidth: (w) => {},
      lineWidthMinPixels: 1,

      opacity: choroplethOpacity,
      visible: toggleDemChoropleth,

      updateTriggers: {
        getLineWidth: [selectedDemographic],
        getFillColor: [selectedDemographic],
      },
    }),

    // race ethnicity
    new ScatterplotLayer({
      id: "ethnicity",
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
          case "1":
            color = [244, 133, 0, 255]; // hispanic
            break;
          case "2":
            return [29, 168, 39, 255]; // white
            break;
          case "3":
            return [80, 128, 234, 255]; // black
            break;
          case "4":
            return [252, 186, 3, 255]; // indigenous
            break;
          case "5":
            return [252, 75, 56, 255]; // asian
            break;
          default:
          // do nothing
        }
        return color;
      },
    }),

    new TextLayer({
      id: "administrative-text-info",
      data: selectedBoundary.features,
      characterSet: "auto",
      sizeUnits: "meters",
      fontFamily: "Roboto",
      fontWeight: "1000",
      getColor: [255, 0, 0, 255],
      // getText: (d) => d.properties.CounDist,
      getText: (d) => "YES",
      getPosition: (x) => [x.properties.longitude, x.properties.latitude],
      getSize: 100,
      // wordBreak: "break-all",
      // maxWidth: 600,
      // background: true,
      // getBackgroundColor: [0, 0, 0],
      // backgroundPadding: [3, 3],
      // opacity: zoomToggle,
    }),

    new TextLayer({
      id: "neighborhood-names",
      data: _NEIGHBORHOOD_NAMES.features,
      characterSet: "auto",
      sizeUnits: "meters",
      fontFamily: "Roboto",
      fontWeight: "1000",
      getColor: [255, 255, 255, 255],
      getText: (d) => d.properties.NTAName.toUpperCase(),
      getPosition: (x) => x.geometry.coordinates,
      getSize: 75,
      maxWidth: 600,
      opacity: zoomToggle,
    }),
  ];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={{ dragRotate: false }}
      layers={layers}
      getCursor={() => "crosshair"}
      onViewStateChange={onViewStateChange}
    >
      {/* WIP tooltip not sure whats wrong  */}
      {/* {hoverInfo.object && (
        <div
          style={{
            position: "absolute",
            zIndex: 1,
            pointerEvents: "none",
            left: hoverInfo.x,
            top: hoverInfo.y,
          }}
        >
          {hoverInfo.object.message}
        </div>
      )} */}
      <Map
        reuseMaps
        mapStyle={mapStyle}
        preventStyleDiffing={true}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
        attributionControl={false}
        logoPosition="top-left"
      />
    </DeckGL>
  );
}
