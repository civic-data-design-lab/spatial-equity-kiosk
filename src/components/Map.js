// dependencies
import { useState, useCallback, useEffect, useMemo } from "react";
import DeckGL from "@deck.gl/react";
import { Map } from "react-map-gl";
import { GeoJsonLayer, TextLayer, ScatterplotLayer } from "@deck.gl/layers";
import { FlyToInterpolator, LinearInterpolator } from "@deck.gl/core";
import { scaleThreshold, scaleQuantile, scaleQuantize } from "d3-scale";
import { MaskExtension, FillStyleExtension } from "@deck.gl/extensions";
import { max, min } from "d3-array";

// data
// import _ISSUES from "../texts/issues.json";
import _NEIGHBORHOODS from "../data/neighborhoods.json";
import _COUNCIL_DISTRICTS from "../data/council_districts.json"; //council districts
import _COMMUNITY_BOARDS from "../data/community_boards.json"; //community boards
import _NEIGHBORHOOD_NAMES from "../data/neighborhood_names.json";
import _ETHNICITY from "../data/ethnicity.json";
import _FILL_PATTERN from "../data/fill_pattern.json";
import _HATCH_ATLAS from "../data/hatch_pattern.png";
import _CHAPTER_COLORS from "../data/chapter_colors.json";
import _ETHNICITY_COLORS from "../data/ethnicity_colors.json";
import _RANKINGS from "../data/rankings.json";

import "mapbox-gl/dist/mapbox-gl.css";

//check if mobile
let isMobile = false; //initiate as false
// device detection
if (
  /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
    navigator.userAgent
  ) ||
  /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
    navigator.userAgent.substr(0, 4)
  )
) {
  isMobile = true;
}

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const mapStyle = "mapbox://styles/mitcivicdata/cl6fa3jro002d14qxp2nu9wng"; //toner

// color ramps
const choroplethOpacity = 0.85;
const healthRamp = _CHAPTER_COLORS.health;
const envRamp = _CHAPTER_COLORS.env;
const infraRamp = _CHAPTER_COLORS.infra;
const binSize = 5; // number of bins in the color ramp

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
  selectedChapter,
  setSelectedChapter,
  communitySearch,
  addCompare,
  setAddCompare,
  setCommunitySearch,
  compareSearch,
  setCompareSearch,
  setShowMap,
  communities,
  councils,
  viewState,
  setViewState,
  mapSelection,
  setMapSelection,
  zoomToggle,
  setzoomToggle,
  inverseZoomToggle,
  setinverseZoomToggle,
  handleLegend,
  sethandleLegend,
  zoomMin,
  zoomMax,
  highlightFeature,
  sethighlightFeature,
  toggleTransit,
  toggleBike,
  toggleWalk,
}) {
  // map hooks
  const dataScale = "q";

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
  let selectedMetric; // MAKE THIS A STATE AT THE APP LEVEL FOR OPTIMIZATION
  let metricGoodBad; // Declare whether metric is good or bad at high values (for hatching areas)

  if (selectedSpecificIssue != null) {
    if (
      typeof selectedSpecificIssue == "number" &&
      isNaN(selectedSpecificIssue) === false
    ) {
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
      if (
        boundary === "council" ||
        (zoomToggle == 0 &&
          boundary === "community" &&
          mapScale.features[i].properties.Data_YN === "Y") ||
        (zoomToggle == 1 && mapScale.features[i].properties.AnsUnt_YN === "Y")
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
  // console.log(selectedMetricArray, uniqueValueArray);

  // 01.2 break the metric array into bins and get the bin list
  for (let i = 0; i < binSize; i++) {
    if (dataScale === "equal") {
      const threshold =
        (max(selectedMetricArray) - min(selectedMetricArray)) / (binSize + 1);
      binList.push(
        Math.round((threshold * (i + 1) + min(selectedMetricArray)) * 100) / 100
      );
    } else {
      const interval = Math.floor(
        (uniqueValueArray.length / binSize) * (i + 1)
      );
      // quantile breaks
      binList.push(uniqueValueArray[interval]);
    }
  }

  // 01.3 set legend scale and color
  useEffect(() => {
    if (binList.length > 0) {
      setLegendBins([uniqueValueArray[0], binList]);
      setColorRamps(selectedRamp);
    }
  }, [selectedSpecificIssue, zoomToggle, selectedBoundary]);

  // 01.4 Color Scale function
  const COLOR_SCALE =
    dataScale == "equal"
      ? scaleThreshold().domain(binList).range(selectedRamp)
      : scaleQuantile().domain(uniqueValueArray).range(selectedRamp); //quantile bins

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
  const ethnicityColors = _ETHNICITY_COLORS;
  let selectedDemographic;
  let toggleScatterPlot = false; //scatter plot viz
  let toggleDemChoropleth = false; //standard choropleth viz but for demographics
  const selectedDemoArray = []; // a clean array of values for the color ramp with no NaN and no Null values
  const demoBinList = []; // derived from the selectedDemoArray array, this is the list of bins for the legend

  // 03.1 toggle demographics on off and pick which to display
  if (showDemographics && mapDemographics) {
    selectedDemographic = demoLookup[demographic].lookup;
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
    if (selectedDemographic == "F10_TrsBkW") {
      let transportationBreakdown = [];
      // check which transportation toggles are on and add them to the list
      if (toggleTransit) {
        transportationBreakdown.push(
          selectedBoundary.features[i].properties["F8_PubTran"]
        );
      }
      if (toggleBike) {
        transportationBreakdown.push(
          selectedBoundary.features[i].properties["F6_bike"]
        );
      }
      if (toggleWalk) {
        transportationBreakdown.push(
          selectedBoundary.features[i].properties["F11_Walk"]
        );
      }

      const transportationAggregation = transportationBreakdown.reduce(
        (a, b) => a + b,
        0
      );

      selectedDemoArray.push(transportationAggregation);
    } else {
      selectedDemoArray.push(
        parseFloat(selectedBoundary.features[i].properties[selectedDemographic])
      );
    }
  }

  const sortedSelectedDemoArray = [...selectedDemoArray].sort(function (a, b) {
    return a - b;
  });

  const uniqueDemoArray = [...new Set(sortedSelectedDemoArray)];

  // 03.3 break the demographic array into bins and get the bin list
  for (let i = 0; i < binSize; i++) {
    if (dataScale === "equal") {
      const threshold =
        (max(selectedDemoArray) - min(selectedDemoArray)) / (binSize + 1);
      demoBinList.push(
        Math.round((threshold * (i + 1) + min(selectedDemoArray)) * 100) / 100
      );
    } else {
      const interval = Math.floor((uniqueDemoArray.length / binSize) * (i + 1));
      //  quantile breaks
      demoBinList.push(uniqueDemoArray[interval]);
    }
  }

  // 03.4 select the color ramp from the json lookup for demographics and create a default to "1" to avoid errors
  let selectedDemoRamp =
    demoLookup[demographic] !== undefined
      ? demoLookup[demographic].colorRamp
      : demoLookup["default"].colorRamp;

  // 03.4 function for demographics scale
  const DEMO_COLOR_SCALE =
    dataScale == "equal"
      ? scaleThreshold().domain(demoBinList).range(selectedDemoRamp)
      : scaleQuantile().domain(uniqueDemoArray).range(selectedDemoRamp);

  // 03 DEMOGRAPHICS END ----------------------------------------------------------------------------------------------

  // 04 VIEWSTATE CONTROL ----------------------------------------------------------------------------------------------
  const onViewStateChange = useCallback(({ viewState }) => {
    // setViewState(viewState);
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
    viewState.zoom = Math.min(zoomMax, Math.max(zoomMin, viewState.zoom));

    // 04.2 ramp in/out based on zoom level

    // 04.3 toggle based on zoom level
    if (viewState.zoom > 12.25) {
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

  // 05 TOOLTIP ----------------------------------------------------------------------------------------------
  const getTooltip = (info) => {
    if (
      info.object &&
      ((boundary == "community" && info.object.properties.Data_YN == "Y") ||
        boundary == "council")
    ) {
      const obj = info.object;
      const tooltipBounds =
        boundary == "community" ? "Community Board" : "Council District";
      const boundaryName =
        boundary == "community"
          ? obj.properties.CDTA2020
          : obj.properties.CounDist;

      // update auto highlight
      sethighlightFeature(info.index);
      // console.log(highlightFeature);

      const metricCheck = _RANKINGS[boundary][selectedMetric] ? true : false;

      const maxRanking = metricCheck
        ? _RANKINGS[boundary][selectedMetric].length
        : "";
      const ranking = metricCheck
        ? _RANKINGS[boundary][selectedMetric].find(
            (t) => t.community_ID == boundaryName
          ).rank
        : "";

      const neighborhoodList =
        boundary == "council"
          ? councils[String(obj.properties.CounDist)].remaining_text
          : boundary == "community"
          ? communities[obj.properties.CDTA2020].remaining_text
          : null;

      if (boundary == "council" || boundary == "community") {
        // return the tooltip for the selected boundary with selected metric and selected demographic

        return (
          obj && {
            className: "map-tooltip",
            style: {
              border: "1px solid black",
              background: "white",
              color: "black",
              padding: "0px",
              // maxWidth: "250px",
            },
            html: `\
          <!-- select metric -->
          <div class=map-tooltip-header>${tooltipBounds} <strong>${boundaryName}</strong></div>
          <div class=map-tooltip-subinfo>${neighborhoodList}</div>
          <div>
            <div class=map-tooltip-info>${
              metricCheck
                ? `Ranking in ${
                    typeof selectedSpecificIssue == "number"
                      ? issues.specific_issues_data[selectedSpecificIssue]
                          .specific_issue_name
                      : ""
                  }—`
                : ""
            }</div>
            <div class=map-tooltip-info><a class=map-tooltip-ranking>${
              metricCheck ? `${ranking} / ${maxRanking}` : ""
            } </a><a class=map-tooltip-subinfo>${
              metricCheck
                ? `(${
                    selectedMetric != null ? obj.properties[selectedMetric] : ""
                  })`
                : ""
            }  </a></div>
          </div>
          <!-- select demographic -->
          <div class=tooltip-info>
          ${selectedDemographic != null ? demoLookup[demographic].name : ""} ${
              selectedDemographic != null
                ? demographic !== "1"
                  ? demographic !== "7"
                    ? obj.properties[selectedDemographic]
                    : (selectedDemoArray[info.index] * 100).toFixed(0) + "%"
                  : `\
                  <div class=tooltip-grid>
                    <div style="color:${
                      ethnicityColors.Hispanic.htmlFormat
                    }">■</div>
                    <div>${Math.round(obj.properties.P_Hispanic * 100)}%</div>
                    <div>Hispanic</div>
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
                : ""
            }</div>
            <!-- <div>
            ${COLOR_SCALE(
              selectedBoundary.features[info.index].properties[selectedMetric]
            )}
            </div> -->
            `,
          }
        );
      }
    }
  };

  // 05 TOOLTIP END ----------------------------------------------------------------------------------------------

  // 06 MAP LAYERS ----------------------------------------------------------------------------------------------
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
      id: "neighborhood-demographics",
      data: _NEIGHBORHOODS.features,
      stroked: false,
      filled: true,
      getFillColor: (f) => {
        let fillValue =
          selectedDemographic !== "F10_TrsBkW"
            ? parseFloat(f.properties[selectedDemographic])
            : selectedDemoArray[f.id];
        if (f.properties.AnsUnt_YN == "Y") {
          if (isNaN(fillValue)) {
            return [0, 0, 0, 0];
          } else {
            return DEMO_COLOR_SCALE(fillValue);
          }
        }
        return [0, 0, 0, 0];
      },
      lineWidthMinPixels: 1,

      opacity: choroplethOpacity,
      visible: zoomToggle == 1 ? toggleDemChoropleth : 0,

      updateTriggers: {
        getLineWidth: [selectedDemographic],
        getFillColor: [selectedDemographic],
      },
    }),

    new GeoJsonLayer({
      id: "administrative-choropleth",
      data: selectedBoundary,
      filled: true,
      getFillColor: (f) => {
        let fillValue = parseFloat(f.properties[selectedMetric]);
        if (
          isNaN(fillValue) ||
          (boundary == "community" && f.properties.Data_YN == "N")
        ) {
          return [0, 0, 0, 0];
        } else {
          // return [255, 0, 0, 255];
          return COLOR_SCALE(f.properties[selectedMetric]);
        }
      },
      opacity: choroplethOpacity,
      visible: inverseZoomToggle,

      updateTriggers: {
        getFillColor: [selectedMetric, mapSelection, addCompare],
      },
    }),

    new GeoJsonLayer({
      id: "administrative-demographics",
      data: selectedBoundary,
      stroked: false,
      filled: true,
      getFillColor: (f) => {
        let fillValue =
          selectedDemographic !== "F10_TrsBkW"
            ? parseFloat(f.properties[selectedDemographic])
            : selectedDemoArray[f.id];

        // console.log(f.id);
        // console.log(selectedDemoArray[f.id]);

        // subfiltering for transportation mode demographics:

        if (boundary == "community") {
          if (f.properties.Data_YN == "N") {
            return [0, 0, 0, 0];
          }
        }
        return DEMO_COLOR_SCALE(fillValue);
      },
      lineWidthMinPixels: 1,

      opacity: choroplethOpacity,
      visible: zoomToggle == 0 ? toggleDemChoropleth : 0,

      updateTriggers: {
        getLineWidth: [
          selectedDemographic,
          toggleTransit,
          toggleBike,
          toggleWalk,
        ],
        getFillColor: [
          selectedDemographic,
          toggleTransit,
          toggleBike,
          toggleWalk,
        ],
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
      opacity: 0.75,
      visible: toggleScatterPlot,
      getFillColor: (d) => {
        let color;
        switch (d.properties.EthnicityCode) {
          case "1":
            color = ethnicityColors.Hispanic.deckFormat; // hispanic
            break;
          case "2":
            return ethnicityColors.White.deckFormat; // white
            break;
          case "3":
            return ethnicityColors.Black.deckFormat; // black
            break;
          case "4":
            return ethnicityColors.Indigenous.deckFormat; // indigenous
            break;
          case "5":
            return ethnicityColors.Asian.deckFormat; // asian
            break;
          default:
            return ethnicityColors.Other.deckFormat; // other
        }
        return color;
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
        getLineWidth: [selectedMetric, zoomToggle, toggleUnderperformers],
        getFillPattern: [selectedMetric, zoomToggle, toggleUnderperformers],
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
          if (f.id == highlightFeature) {
            return [0, 0, 0, 255];
          } else {
            return [67, 67, 67, 100];
          }
        }
        return [0, 0, 0, 0];
      },
      lineWidthUnits: "meters",
      getLineWidth: (w) => {
        if (
          boundary == "council" ||
          (boundary == "community" && w.properties.Data_YN == "Y")
        ) {
          if (w.id == highlightFeature) {
            return 100;
          }
          return 50;
        }
        return 0;
      },
      lineWidthMinPixels: 1,
      pickable: true,
      autoHighlight: true,
      highlightColor: (info) => {
        if (boundary == "community" && info.object.properties.Data_YN == "N") {
          return [0, 0, 0, 0];
        }
        return [0, 0, 0, 50];
      },
      onClick: (info) => {
        const obj = info.object;

        // change selected boundary
        const lookup =
          boundary == "council"
            ? String(obj.properties.CounDist)
            : boundary == "community" && obj.properties.Data_YN == "Y"
            ? obj.properties.CDTA2020
            : null;

        if (
          (boundary == "community" && obj.properties.Data_YN == "Y") ||
          boundary == "council"
        ) {
          // change chapter
          setSelectedChapter(3);

          // add clicked object to chapter 3 searchbar and highlight single selection on map
          if (communitySearch == null || addCompare == false) {
            // animate view
            setViewState({
              longitude: obj.properties.X_Cent,
              latitude: obj.properties.Y_Cent,
              zoom: zoomMax - 0.5,
              transitionDuration: 500,
              transitionInerpolator: new LinearInterpolator(),
              // transitionEasing: easeCubic,
            });

            if (communitySearch == lookup) {
              setCommunitySearch(null);
              if (mapSelection.includes(info.index) == true) {
                setMapSelection([null]);
              }
            } else {
              setCommunitySearch(lookup);
              if (mapSelection.includes(info.index) == false) {
                setMapSelection([info.index]);
              }
            }
          }
          // double selection functionality
          else {
            if (mapSelection.includes(info.index)) {
              setMapSelection(mapSelection.filter((x) => x != info.index));
              if (compareSearch == lookup) {
                setCompareSearch(null);
              } else if (communitySearch == lookup) {
                setCommunitySearch(compareSearch);
                setCompareSearch(null);
              }
            } else {
              setCompareSearch(lookup);
              setMapSelection([mapSelection[0], info.index]);
            }
          }
        }
      },
      updateTriggers: {
        getLineColor: [highlightFeature],
        getLineWidth: [highlightFeature],
      },
    }),

    new GeoJsonLayer({
      id: "administrative-selected",
      data: selectedBoundary,
      filled: true,
      stroked: true,

      getLineColor: (f) => {
        if (
          (boundary == "council" &&
            (f.properties.CounDist == communitySearch ||
              f.properties.CounDist == compareSearch)) ||
          (boundary == "community" &&
            f.properties.Data_YN == "Y" &&
            (f.properties.CDTA2020 == communitySearch ||
              f.properties.CDTA2020 == compareSearch))
        ) {
          return selectedSpecificIssue ? [255, 255, 255, 255] : [127, 255, 0];
        }
        return [0, 0, 0, 0];
      },

      getFillColor: (f) => {
        if (
          (boundary == "council" &&
            (f.properties.CounDist == communitySearch ||
              f.properties.CounDist == compareSearch)) ||
          (boundary == "community" &&
            f.properties.Data_YN == "Y" &&
            (f.properties.CDTA2020 == communitySearch ||
              f.properties.CDTA2020 == compareSearch))
        ) {
          return selectedSpecificIssue ? [0, 0, 0, 0] : [0, 0, 0, 125];
        }
        return [0, 0, 0, 0];
      },

      getLineWidth: (f) => {
        return 100;
      },
      updateTriggers: {
        getLineColor: [
          selectedMetric,
          mapSelection,
          addCompare,
          communitySearch,
          compareSearch,
        ],
        getFillColor: [
          selectedMetric,
          mapSelection,
          addCompare,
          communitySearch,
          compareSearch,
        ],
      },
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
  // 06 MAP LAYERS END ----------------------------------------------------------------------------------------------------

  const divStyle = {
    color: "red",
    border: "3px solid white",
  };

  return (
    <DeckGL
      // viewState={viewState}
      initialViewState={viewState}
      onViewStateChange={onViewStateChange}
      controller={{
        dragRotate: false,
        doubleClickZoom: false,
      }}
      layers={layers}
      getCursor={() => "crosshair"}
      getTooltip={getTooltip}
      // style={{ mixBlendMode: "multiply" }}
      // _pickable={isMobile ? false : true}
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
