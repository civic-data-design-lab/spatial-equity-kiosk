import DeckGL from "@deck.gl/react";
import { PolygonLayer } from "@deck.gl/layers";
import { ScreenGridLayer } from "@deck.gl/aggregation-layers";
import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";
import { Map, LogoControl } from "react-map-gl";
import { GeoJsonLayer } from "@deck.gl/layers";
import { scaleThreshold, scaleLinear } from "d3-scale";
import { max } from "d3-array";

import _NEIGHBORHOODS from "../data/neighborhood_tabulation.json";
import _DISTRICTS from "../data/council_districts.geojson";
import _NYC_POVERTY from "../data/poverty_points_light.json";
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
  maxZoom: 12.5,
  pitch: 0,
  bearing: 0,
};

//used for wireframe - ignore
// const INITIAL_VIEW_STATE = {
//   longitude: -73.9405,
//   latitude: 40.77,
//   zoom: 13.5,
//   minZoom: 10,
//   pitch: 0,
//   bearing: 0,
// };

const colorRange = [
  [55, 40, 45, 30],
  [120, 45, 45, 155],
  [220, 45, 45],
  [114, 64, 128],
  [28, 27, 128],
  [0, 0, 0],
];

const COLOR_SCALE = scaleThreshold()
  // .domain([0, 0.3, 0.5, 0.7, 0.75, 0.8, 0.85, 0.9, 1]) //unequal bins
  .domain([0, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]) //equal bins with shifted basepoint
  .range([
    [103, 0, 31],
    [152, 0, 67],
    [206, 18, 86],
    [231, 41, 138],
    [201, 148, 199],
    [223, 101, 176],
    [212, 185, 218],
    [231, 225, 239],
    [247, 244, 249],
    [0, 0, 0, 0], //null item
  ]);

//  ---------------------------------------------------------------------------------------------------------------------
// Example - feel free to delete after familiarizing yourself with color ramps
// // get array of car free values
// const value_list = [];
// for (let i = 0; i < _NEIGHBORHOODS.features.length; i++) {
//   value_list.push(_NEIGHBORHOODS.features[i].properties.F__car_fre);
// }

// // D3 remap values into linear color domain
// const COLOR_SCALE = scaleLinear()
//   .domain([0, max(value_list)])
//   .range([
//     [0, 0, 0],
//     [255, 255, 255],
//   ]);
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

const lightingEffect = new LightingEffect({ ambientLight, pointLight });

const material = {
  ambient: 0.1,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [60, 64, 70],
};

const theme = {
  buildingColor: [74, 80, 87],
  material,
  effects: [lightingEffect],
};

export default function App({}) {
  const layers = [
    new GeoJsonLayer({
      id: "neighborhoods",
      data: _NEIGHBORHOODS.features,
      stroked: true,
      filled: true,
      getFillColor: (f) => COLOR_SCALE(f.properties.F__car_fre),
      lineWidthUnits: "pixels",
      getLineColor: [0, 0, 0, 255],
      getLineWidth: 2,
      opacity: 0.33,
      pickable: true,
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
      pickable: true,
      autoHighlight: true,
      highlightColor: [235, 255, 0, 225],
      onHover: (info) => {
        // console.log(info);
      },
    }),
  ];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
      getCursor={() => "crosshair"}
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
