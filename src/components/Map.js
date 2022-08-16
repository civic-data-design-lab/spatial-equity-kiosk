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

import "mapbox-gl/dist/mapbox-gl.css";

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const mapStyle = "mapbox://styles/mitcivicdata/cl6fa3jro002d14qxp2nu9wng"; //toner

// Map Viewport settings
const zoomMin = 10.5;
const zoomMax = 13;

// color ramps
const choroplethOpacity = 0.85;
const healthRamp = [
  [248, 198, 220],
  [244, 151, 192],
  [237, 109, 159],
  [230, 87, 149],
  [233, 50, 128],
];
const envRamp = [
  [187, 241, 209],
  [129, 228, 170],
  [97, 210, 143],
  [59, 172, 105],
  [23, 159, 78],
];
const infraRamp = [
  [166, 202, 240],
  [128, 178, 233],
  [91, 157, 227],
  [55, 135, 221],
  [20, 111, 209],
];

const INITIAL_VIEW_STATE = {
  longitude: -73.9,
  latitude: 40.7131,
  zoom: 10,
  minZoom: zoomMin,
  maxZoom: zoomMax,
  pitch: 0,
  bearing: 0,
};

// view state constraints
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
  const [colorRamp, setcolorRamp] = useState(1);
  const [handleLegend, sethandleLegend] = useState(0);
  // const [underperformers, setunderperformers] = useState(null);

  //select issue
  const rampValues = [];
  const binSize = 5;
  const bin_list = [];

  // change selected boundary
  let selectedBoundary;
  if (boundary === "council") {
    selectedBoundary = _COUNCIL_DISTRICTS;
  }
  if (boundary === "community") {
    selectedBoundary = _COMMUNITY_BOARDS;
  }

  // change selected metric and declare whether metric is good or bad at high values
  let selectedMetric;
  let metricGoodBad;
  if (selectedSpecificIssue !== null) {
    if (selectedSpecificIssue !== false) {
      selectedMetric =
        issues.specific_issues_data[selectedSpecificIssue].json_id;
      metricGoodBad =
        issues.specific_issues_data[selectedSpecificIssue].good_or_bad;
    }
  }

  // Create Color Scales
  const mapScale =
    handleLegend == 0
      ? _NEIGHBORHOODS
      : handleLegend == 1 && selectedBoundary == _COUNCIL_DISTRICTS
      ? _COUNCIL_DISTRICTS
      : _COMMUNITY_BOARDS;

  for (let i = 0; i < mapScale.features.length; i++) {
    let floatValue = parseFloat(
      mapScale.features[i].properties[selectedMetric]
    );
    if (isNaN(floatValue) === false) {
      rampValues.push(floatValue);
    }
  }

  for (let i = 0; i < binSize; i++) {
    let threshold = (max(rampValues) / binSize) * (i + 1);
    bin_list.push(Math.round(threshold * 100) / 100);
  }

  // pick color ramp
  const selectedRamp =
    selectedIssue === 1
      ? healthRamp
      : selectedIssue === 2
      ? envRamp
      : infraRamp;

  // set legend scale and color
  useEffect(() => {
    if (bin_list.length > 0) {
      setLegendBins(bin_list);
      setColorRamps(selectedRamp);
    }
  }, [selectedSpecificIssue, zoomRamp, selectedBoundary]);

  // get low performers and ignore parks/graveyards/airports--------------------------------------------------------------------

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

  setPerformanceBar.sort(function (a, b) {
    // return the sorted list of values depending if you want the highest scores or lowest scores of a given metric
    if (typeof metricGoodBad == "number") {
      return issues.specific_issues_data[selectedSpecificIssue].good_or_bad == 1
        ? b - a // highest scores
        : a - b; // lowest scores
    }
  });
  const underperformers = setPerformanceBar[4]; //get the 5 worst performing values

  // -----------------------------------------------------------------------------------------

  // color threshold
  let COLOR_SCALE = scaleThreshold().domain(bin_list).range(selectedRamp); //equal bins
  // const COLOR_SCALE = scaleQuantile().domain(rampValues).range(selectedRamp); //quantile

  // change selected demographic ------------ UPDATE WITH EXTENSIVE DEMOGRAPHIC LIST

  if (selectedSpecificIssue !== null) {
    if (selectedSpecificIssue !== false) {
      selectedMetric =
        issues.specific_issues_data[selectedSpecificIssue].json_id;
      metricGoodBad =
        issues.specific_issues_data[selectedSpecificIssue].good_or_bad;
    }
  }

  let selectedDemographic;
  let toggleScatterPlot = false;
  let toggleDemChoropleth = false;

  // console.log(issues.specific_issues_data);

  if (showDemographics && mapDemographics) {
    // console.log(demoLookup[demographic]);
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

  // let DEMO_COLOR_SCALE = scaleThreshold().domain(selectedBoundary).range(selectedRamp); //equal bins
  for (let i = 0; i < selectedBoundary.features.length; i++) {
    console.log(selectedDemographic);
    console.log(selectedBoundary.features[i].properties[selectedDemographic]);
  }

  // Change properties based on camera move and zoom --------------------------------------------------------------
  const onViewStateChange = useCallback(({ viewState }) => {
    // set constraints on view state
    // console.log(viewState);
    viewState.longitude = Math.min(
      LONGITUDE_RANGE[1],
      Math.max(LONGITUDE_RANGE[0], viewState.longitude)
    );
    viewState.latitude = Math.min(
      LATITUDE_RANGE[1],
      Math.max(LATITUDE_RANGE[0], viewState.latitude)
    );

    // ramp in/out based on zoom level
    const ramp =
      0 + ((viewState.zoom - zoomMin) * (0.85 - 0)) / (zoomMax - zoomMin);
    setzoomRamp(ramp);

    const cRamp =
      0 + ((viewState.zoom - zoomMin) * (175 - 0)) / (zoomMax - zoomMin);
    setcolorRamp([50, 50, 50, cRamp]); // set color ramp to cRamp value

    // toggle based on zoom level
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
  // End Change properties based on camera move and zoom -----------------------------------------------------------

  const layers = [
    // new GeoJsonLayer({
    //   id: "neighborhoods",
    //   data: _NEIGHBORHOODS.features,
    //   stroked: false,
    //   filled: true,
    //   getFillColor: (f) => {
    //     let fillValue = parseFloat(f.properties[selectedMetric]);

    //     if (f.properties.AnsUnt_YN == "Y") {
    //       if (isNaN(fillValue)) {
    //         return [0, 0, 0, 0];
    //       } else {
    //         return COLOR_SCALE(f.properties[selectedMetric]);
    //       }
    //     } else {
    //       return [0, 0, 0, 0];
    //     }
    //   },
    //   lineWidthUnits: "pixels",
    //   opacity: choroplethOpacity,
    //   visible: zoomToggle,
    //   // update triggers
    //   updateTriggers: {
    //     getFillColor: [selectedMetric],
    //   },

    //   // interactivity ---- depracated
    //   // onClick: (info) => {
    //   //   console.log(_NEIGHBORHOODS.features[info.index].properties.NTAName);
    //   //   console.log(
    //   //     selectedMetric +
    //   //       ":" +
    //   //       parseFloat(
    //   //         _NEIGHBORHOODS.features[info.index].properties[selectedMetric]
    //   //       )
    //   //   );
    //   //   console.log(
    //   //     COLOR_SCALE(
    //   //       _NEIGHBORHOODS.features[info.index].properties[selectedMetric]
    //   //     )
    //   //   );
    //   // },
    // }),

    // new GeoJsonLayer({
    //   id: "administrative-choropleth",
    //   data: selectedBoundary,
    //   filled: true,
    //   getFillColor: (f) => {
    //     let fillValue = parseFloat(f.properties[selectedMetric]);
    //     if (boundary == "community") {
    //       if (f.properties.Data_YN == "N") {
    //         return [0, 0, 0, 0];
    //       }
    //     }
    //     if (isNaN(fillValue)) {
    //       return [0, 0, 0, 0];
    //     }
    //     // else if (fillValue == 0) {
    //     //   return [50, 50, 50, 0];
    //     // }
    //     else {
    //       // return [255, 0, 0, 255];
    //       return COLOR_SCALE(f.properties[selectedMetric]);
    //     }
    //   },
    //   opacity: choroplethOpacity,
    //   visible: inverseZoomToggle,

    //   onHover: (info) => setHoverInfo(info),
    //   updateTriggers: {
    //     getFillColor: [selectedMetric],
    //   },
    // }),

    // new GeoJsonLayer({
    //   id: "administrative-choropleth-highlights",
    //   data: selectedBoundary,
    //   filled: true,
    //   stroked: true,

    //   getFillColor: (f) => {
    //     if (boundary == "community") {
    //       if (f.properties.Data_YN == "N") {
    //         return [0, 0, 0, 0];
    //       }
    //     }
    //     return [0, 0, 0, 255];
    //   },
    //   lineWidthUnits: "meters",
    //   lineWidthMinPixels: 1,

    //   getLineColor: (f) => {
    //     if (
    //       boundary == "council" ||
    //       (boundary == "community" && f.properties.Data_YN == "Y")
    //     ) {
    //       return [0, 0, 0, 255];
    //     }
    //     return [0, 0, 0, 0];
    //   },

    //   getLineWidth: (w) => {
    //     let strokeValue = parseFloat(w.properties[selectedMetric]);
    //     if (
    //       toggleUnderperformers === true &&
    //       (boundary == "council" ||
    //         (boundary == "community" && w.properties.Data_YN == "Y"))
    //     ) {
    //       if (metricGoodBad == 1) {
    //         return strokeValue >= underperformers ? 100 : 0;
    //       } else {
    //         return strokeValue <= underperformers ? 100 : 0;
    //       }
    //     }
    //     return 0;
    //   },

    //   opacity: choroplethOpacity,
    //   visible: inverseZoomToggle,

    //   // props added by FillStyleExtension
    //   fillPatternMask: true,
    //   fillPatternAtlas: _HATCH_ATLAS,
    //   fillPatternMapping: _FILL_PATTERN,
    //   getFillPattern: (f) => {
    //     let fillValue = parseFloat(f.properties[selectedMetric]);
    //     if (toggleUnderperformers === true) {
    //       if (metricGoodBad == 1) {
    //         return fillValue >= underperformers
    //           ? "hatch-pattern"
    //           : "hatch-solid";
    //       } else {
    //         return fillValue <= underperformers
    //           ? "hatch-pattern"
    //           : "hatch-solid";
    //       }
    //     }
    //     return "hatch-solid";
    //   },
    //   getFillPatternScale: 10,
    //   getFillPatternOffset: [0, 0],
    //   // Define extensions
    //   extensions: [new FillStyleExtension({ pattern: true })],

    //   updateTriggers: {
    //     getLineWidth: [selectedMetric, toggleUnderperformers],
    //     getFillPattern: [selectedMetric, toggleUnderperformers],
    //   },
    // }),

    // new GeoJsonLayer({
    //   id: "administrative-boundaries",
    //   data: selectedBoundary,
    //   stroked: true,
    //   filled: true,
    //   getFillColor: [255, 255, 255, 0],
    //   getLineColor: (f) => {
    //     if (
    //       boundary == "council" ||
    //       (boundary == "community" && f.properties.Data_YN == "Y")
    //     ) {
    //       return [0, 0, 0, 255];
    //     }
    //     return [0, 0, 0, 0];
    //   },
    //   lineWidthUnits: "meters",
    //   getLineWidth: (w) => {
    //     if (
    //       boundary == "council" ||
    //       (boundary == "community" && w.properties.Data_YN == "Y")
    //     ) {
    //       return 50;
    //     }
    //     return 0;
    //   },
    //   lineWidthMinPixels: 1,
    //   pickable: true,
    //   autoHighlight: true,
    //   highlightColor: [217, 255, 0, 215],
    //   onClick: (info) => {
    //     if (boundary == "council") {
    //       console.log(
    //         selectedBoundary.features[info.index].properties.CounDist
    //       );
    //     }
    //     console.log(
    //       selectedMetric,
    //       selectedBoundary.features[info.index].properties[selectedMetric]
    //     );
    //   },
    // }),

    new GeoJsonLayer({
      id: "demographics-choropleth",
      data: selectedBoundary,
      stroked: true,
      filled: true,
      getFillColor: (f) => {
        let fillValue = parseFloat(f.properties[selectedDemographic]);
        // let max = Math.max(...demographics);
        // let min = Math.min(...demographics);

        if (boundary == "community") {
          if (f.properties.Data_YN == "N") {
            return [0, 0, 0, 0];
          }
        }
        // return COLOR_SCALE(fillValue);
        return demoLookup[demographic].colorRamp[0];
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
