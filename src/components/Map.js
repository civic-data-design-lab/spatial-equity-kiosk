import { useState, useCallback } from "react";
import DeckGL from "@deck.gl/react";
import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";
import { Map } from "react-map-gl";
import { GeoJsonLayer, TextLayer } from "@deck.gl/layers";
import { scaleThreshold, scaleQuantile } from "d3-scale";
import { DataFilterExtension, MaskExtension } from "@deck.gl/extensions";
import { max } from "d3-array";

import _NEIGHBORHOODS from "../data/neighborhood_tabulation.json";
import _DISTRICTS from "../data/council_districts.geojson";
import _NYC_POVERTY from "../data/poverty_points_light.json";
import _NEIGHBORHOOD_NAMES from "../data/neighborhood_names.json";
import "mapbox-gl/dist/mapbox-gl.css";

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const mapStyle = "mapbox://styles/mitcivicdata/cl6fa3jro002d14qxp2nu9wng"; //toner
// const mapStyle = "mapbox://styles/mitcivicdata/cl6f8enp0001x14rrqcztxlxv"; //toon
// const mapStyle = "mapbox://styles/mitcivicdata/cl6f9a8b0002b14qx1hs0ehq6"; //grey natural

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -73.9,
  latitude: 40.7131,
  zoom: 10,
  minZoom: 10,
  maxZoom: 13,
  pitch: 0,
  bearing: 0,
};

const value_list = [];
const binSize = 5;
const binCount = 10;
const bin_list = [];

//  ---------------------------------------------------------------------------------------------------------------------
// // get array of car free values

for (let i = 0; i < _NEIGHBORHOODS.features.length; i++) {
  let floatValue = parseFloat(_NEIGHBORHOODS.features[i].properties.F__car_fre);
  if (isNaN(floatValue) === false) {
    value_list.push(floatValue);
  }
}

for (let i = 0; i < binSize; i++) {
  let threshold = (max(value_list) / binSize) * (i + 1);
  bin_list.push(Math.round(threshold * 100) / 100);
}

console.log(bin_list);

// const COLOR_SCALE = scaleThreshold()
//   .domain(bin_list)
//   .range([
//     [233, 50, 128],
//     [230, 87, 149],
//     [237, 109, 159],
//     [244, 151, 192],
//     [248, 198, 220],
//     [0, 0, 0, 0], //null item
//   ]);

// console.log(value_list);
const COLOR_SCALE = scaleQuantile()
  .domain(value_list)
  .range([
    [233, 50, 128],
    [230, 87, 149],
    [237, 109, 159],
    [244, 151, 192],
    [248, 198, 220],
  ]);
// ---------------------------------------------------------------------------------------------------------------------

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0,
});

const pointLight = new PointLight({
  color: [255, 255, 255],
  intensity: 2.0,
  position: [-74.05, 40.7, 8000],
});

const dataFilter = new DataFilterExtension({
  filterSize: 1,
  // Enable for higher precision, e.g. 1 second granularity
  // See DataFilterExtension documentation for how to pick precision
  fp64: false,
});

export default function App({}) {
  //   ---------------------------------------------------------------------------------------------------------------------
  // 5 bin color ramp
  const [colorBins, setColorBins] = useState([]);
  const [zoomOpacity, setZoomOpacity] = useState(1);
  // ---------------------------------------------------------------------------------------------------------------------

  const layers = [
    new GeoJsonLayer({
      id: "neighborhoods",
      data: _NEIGHBORHOODS.features,
      stroked: true,
      filled: true,
      getFillColor: (f) =>
        f.properties.F__car_fre === "#DIV/0!"
          ? [0, 0, 0, 0]
          : COLOR_SCALE(f.properties.F__car_fre),
      lineWidthUnits: "pixels",
      getLineColor: [0, 0, 0, 255],
      getLineWidth: 0,
      opacity: 1,

      // interactivity
      pickable: true,
      autoHighlight: true,
      highlightColor: [235, 255, 0, 225],
      onClick: (info) => {
        console.log(_NEIGHBORHOODS.features[info.index].properties.NTAName);
        console.log(_NEIGHBORHOODS.features[info.index].properties.F__car_fre);
        console.log(
          COLOR_SCALE(_NEIGHBORHOODS.features[info.index].properties.F__car_fre)
        );
      },
    }),

    new GeoJsonLayer({
      id: "council-districts",
      data: _DISTRICTS,
      stroked: true,
      filled: true,
      getFillColor: [255, 255, 255, 0],
      getLineColor: [0, 0, 0, 255],
      lineWidthUnits: "meters",
      getLineWidth: 50,
      lineWidthMinPixels: 1,
      // pickable: true,
      // onHover: (info) => {
      //   // console.log(info);
      // },
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
      background: true,
      getBackgroundColor: [0, 0, 0],
      backgroundPadding: [3, 3],
      opacity: zoomOpacity,
    }),
  ];

  const onViewStateChange = useCallback(({ viewState }) => {
    if (viewState.zoom > 12.25) {
      setZoomOpacity(1);
    } else {
      setZoomOpacity(0);
    }
  }, []);

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
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
