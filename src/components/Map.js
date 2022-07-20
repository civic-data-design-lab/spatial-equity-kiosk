import DeckGL from "@deck.gl/react";
import { PolygonLayer } from "@deck.gl/layers";
import { ScreenGridLayer } from "@deck.gl/aggregation-layers";
import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";
import { Map } from "react-map-gl";
import { GeoJsonLayer } from "@deck.gl/layers";
import _NEIGHBORHOODS from "../data/neighborhood_tabluation.json";
import _DISTRICTS from "../data/council_districts.geojson";
import _BUILDINGS from "../data/buildings.json";
import _NYC_POVERTY from "../data/poverty_points_light.json";
import "mapbox-gl/dist/mapbox-gl.css";

console.log(_NEIGHBORHOODS.features[0].properties.NTAName);

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const mapStyle = "mapbox://styles/mitcivicdata/cl5mjm8u1000o14s2n2uv7kwm";

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -74.3102,
  latitude: 40.7131,
  zoom: 10,
  minZoom: 10,
  pitch: 0,
  bearing: 0,
};

const colorRange = [
  [55, 40, 45, 30],
  [120, 45, 45, 155],
  [220, 45, 45],
  [114, 64, 128],
  [28, 27, 128],
  [0, 0, 0],
];

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
      id: "council-districts",
      data: _DISTRICTS,
      stroked: true,
      filled: true,
      getFillColor: [255, 10, 50, 0],
      lineWidthUnits: "pixels",
      getLineColor: [0, 0, 0, 255],
      getLineWidth: 2,
    }),

    new GeoJsonLayer({
      id: "neighborhoods",
      data: _NEIGHBORHOODS.features,
      stroked: true,
      filled: true,
      getFillColor: [255, 10, 50, 0],
      lineWidthUnits: "pixels",
      getLineColor: [0, 0, 0, 100],
      getLineWidth: 2,
      pickable: true,
      autoHighlight: true,
      highlightColor: [235, 255, 0, 225],
      onClick: (info) => {
        console.log(_NEIGHBORHOODS.features[info.index].properties.NTAName);
      },
    }),

    new PolygonLayer({
      id: "buildings",
      data: _BUILDINGS,
      extruded: true,
      wireframe: false,
      opacity: 0.8,
      getPolygon: (f) => f.polygon,
      getElevation: (f) => f.height,
      getFillColor: theme.buildingColor,
      material: theme.material,
    }),

    new ScreenGridLayer({
      id: "grid",
      data: _NYC_POVERTY.features,
      opacity: 1,
      getPosition: (d) => d.geometry.coordinates,
      cellSizePixels: 12,
      colorRange: colorRange,
      gpuAggregation: true,
      aggregation: "SUM",
    }),
  ];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
      getCursor={() => "crosshair"}
      style={{ zIndex: -1, backgroundColor: "black" }}
    >
      <Map
        reuseMaps
        mapStyle={mapStyle}
        preventStyleDiffing={true}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      />
    </DeckGL>
  );
}
