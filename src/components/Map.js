import { useState, useCallback } from "react";
import DeckGL from "@deck.gl/react";
import { Map } from "react-map-gl";
import { GeoJsonLayer, TextLayer, ScatterplotLayer } from "@deck.gl/layers";
import { scaleThreshold, scaleQuantile } from "d3-scale";
import { MaskExtension } from "@deck.gl/extensions";
import { max } from "d3-array";

import _NEIGHBORHOODS from "../data/nta_scores.json";
import _COUNCIL_DISTRICTS from "../data/council_districts.geojson"; //council districts
import _COMMUNITY_BOARDS from "../data/community_boards.json"; //community boards
// import _NYC_POVERTY from "../data/poverty_points_light.json";
import _NEIGHBORHOOD_NAMES from "../data/neighborhood_names.json";
import _ETHNICITY from "../data/ethnicity.json";
import "mapbox-gl/dist/mapbox-gl.css";

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const mapStyle = "mapbox://styles/mitcivicdata/cl6fa3jro002d14qxp2nu9wng"; //toner
// const mapStyle = "mapbox://styles/mitcivicdata/cl6f8enp0001x14rrqcztxlxv"; //toon
// const mapStyle = "mapbox://styles/mitcivicdata/cl6f9a8b0002b14qx1hs0ehq6"; //grey natural

// Map Viewport settings
const zoomMin = 10.5;
const zoomMax = 13;

const INITIAL_VIEW_STATE = {
  longitude: -73.9,
  latitude: 40.7131,
  zoom: 10,
  minZoom: zoomMin,
  maxZoom: zoomMax,
  pitch: 0,
  bearing: 0,
};

const rampValues = [];
const binSize = 5;
const bin_list = [];

//  ---------------------------------------------------------------------------------------------------------------------
// Create Color Scales
for (let i = 0; i < _NEIGHBORHOODS.features.length; i++) {
  let floatValue = parseFloat(_NEIGHBORHOODS.features[i].properties.F18_AsthmR);
  if (isNaN(floatValue) === false) {
    rampValues.push(floatValue);
  }
}

// color ramps
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
// const COLOR_SCALE = scaleQuantile().domain(rampValues).range(healthRamp);
// // get array of car free values

for (let i = 0; i < binSize; i++) {
  let threshold = (max(rampValues) / binSize) * (i + 1);
  bin_list.push(Math.round(threshold * 100) / 100);
}

const COLOR_SCALE = scaleThreshold().domain(bin_list).range(healthRamp);

// ---------------------------------------------------------------------------------------------------------------------

export default function App({
  selectedIssue,
  selectedSpecificIssue,
  boundary,
  showDemographics,
  mapDemographics,
  demographic,
}) {
  // change selected boundary
  let selectedBoundary;
  if (boundary === "council") {
    selectedBoundary = _COUNCIL_DISTRICTS;
  }
  if (boundary === "community") {
    selectedBoundary = _COMMUNITY_BOARDS;
  }

  // change selected demographic
  // console.log(demographic);
  let toggleEthnicity = false;
  let togglePoverty = false;
  let toggleCommute = false;

  if (
    showDemographics &&
    mapDemographics &&
    parseFloat(demographic) === 1 &&
    toggleEthnicity === false
  ) {
    toggleEthnicity = true;
    togglePoverty = false;
    toggleCommute = false;
  } else if (
    showDemographics &&
    mapDemographics &&
    parseFloat(demographic) === 2 &&
    togglePoverty === false
  ) {
    toggleEthnicity = false;
    togglePoverty = true;
    toggleCommute = false;
  } else if (
    showDemographics &&
    mapDemographics &&
    parseFloat(demographic) === 3 &&
    toggleCommute === false
  ) {
    toggleEthnicity = false;
    togglePoverty = false;
    toggleCommute = true;
  }

  // map hooks
  const [zoomToggle, setzoomToggle] = useState(1);
  const [zoomRamp, setzoomRamp] = useState(1);
  const [colorRamp, setcolorRamp] = useState(1);

  // Change properties based on camera move and zoom --------------------------------------------------------------
  const onViewStateChange = useCallback(({ viewState }) => {
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
    } else {
      setzoomToggle(0);
    }
  }, []);
  // End Change properties based on camera move and zoom -----------------------------------------------------------

  const layers = [
    new GeoJsonLayer({
      id: "neighborhoods",
      data: _NEIGHBORHOODS.features,
      stroked: false,
      filled: true,
      getFillColor: (f) => {
        if (isNaN(parseFloat(f.properties.F18_AsthmR))) {
          return [0, 0, 0, 0];
        } else if (parseFloat(f.properties.F18_AsthmR) == 0) {
          return [50, 50, 50, 0];
        } else {
          return COLOR_SCALE(f.properties.F18_AsthmR);
        }
      },
      lineWidthUnits: "pixels",
      // getLineColor: colorRamp,
      // getLineWidth: 2,
      opacity: 0.85,

      // interactivity
      onClick: (info) => {
        console.log(_NEIGHBORHOODS.features[info.index].properties.NTAName);
        console.log(
          parseFloat(_NEIGHBORHOODS.features[info.index].properties.F18_AsthmR)
        );
        console.log(
          COLOR_SCALE(_NEIGHBORHOODS.features[info.index].properties.F18_AsthmR)
        );
      },
    }),

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
      visible: toggleEthnicity,
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
        }
        return color;
      },
    }),

    new GeoJsonLayer({
      id: "council-districts",
      // data: _COMMUNITY_BOARDS, //COMMUNITY BOARDS
      // data: _COUNCIL_DISTRICTS, //COUNCIL DISTRICTS
      data: selectedBoundary,
      stroked: true,
      filled: true,
      getFillColor: [255, 255, 255, 0],
      getLineColor: [0, 0, 0, 255],
      lineWidthUnits: "meters",
      getLineWidth: 50,
      lineWidthMinPixels: 1,
      pickable: true,
      autoHighlight: true,
      highlightColor: [217, 255, 0, 215],
    }),

    new TextLayer({
      id: "neighborhood-names",
      data: _NEIGHBORHOOD_NAMES.features,
      characterSet: "auto",
      sizeUnits: "meters",
      fontFamily: "Roboto",
      fontWeight: "1000",
      getColor: (d) => [255, 255, 255, 255],
      getText: (d) => d.properties.NTAName.toUpperCase(),
      getPosition: (x) => x.geometry.coordinates,
      getSize: (d) => 75,
      // wordBreak: "break-all",
      maxWidth: 600,
      // background: true,
      // getBackgroundColor: [0, 0, 0],
      // backgroundPadding: [3, 3],
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
