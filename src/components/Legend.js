import React from "react";
import { max, min } from "d3-array";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import _CHAPTER_COLORS from "../data/chapter_colors.json";
import _COUNCIL_DISTRICTS from "../data/council_districts.json";
import _COMMUNITY_BOARDS from "../data/community_boards.json";
import _NEIGHBORHOODS from "../data/neighborhoods.json";
import _ETHNICITY_COLORS from "../data/ethnicity_colors.json";

export default function Legend({
  issues,
  demographic,
  selectedSpecificIssue,
  //legendBins,
  colorRamps,
  toggleUnderperformers,
  setToggleUnderperformers,
  boundary,
  dataScale,
  setdataScale,
  forDemographic = false,
  handleLegend,
  selectedIssue,
  zoomToggle,
  demoLookup,
  demoColorRamp,
  demoLegendBins,
  mapDemographics,
  showMap,
}) {
  const administrativeBoundary =
    boundary === "council" ? "Council Districts" : "Community Boards";

  const getImpactStatement = () => {
    return issues.specific_issues_data[selectedSpecificIssue]
      ? issues.specific_issues_data[selectedSpecificIssue].highlight_statement
      : "";
  };

  const getButtonStatement = () => {
    return !toggleUnderperformers
      ? `Highlight ${administrativeBoundary} with the ${getImpactStatement()}.`
      : `Remove highlights of ${administrativeBoundary} with the ${getImpactStatement()}.`;
  };

  // button statement
  const buttonStatement2 = dataScale ? `Equal Bins` : "Equal Counts";

  const getLegendBins = () => {
    const binSize = 5;
    // toggle areas in need

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

    // console.log(selectedSpecificIssue)
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
        ? "health"
        : selectedIssue === 2
        ? "env"
        : selectedIssue === 3
        ? "infra"
        : "troubleshoot";

    // console.log(selectedMetric)
    // 01.1 get an array of all the values for the selected metric
    for (let i = 0; i < mapScale.features.length; i++) {
      let floatValue = parseFloat(
        mapScale.features[i].properties[selectedMetric]
      );
      // console.log(mapScale.features[i].properties)
      // console.log(mapScale.features[i].properties[selectedMetric])
      if (!isNaN(floatValue)) {
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
    return [uniqueValueArray[0], binList];
  };

  const legendBins = getLegendBins();

  let cleanNumbers = isNaN(legendBins[1][0])
    ? ""
    : min(legendBins[1]) >= 10
    ? legendBins[1].map((d) => Math.round(d))
    : legendBins[1];

  const getLegend = () => {
    switch (forDemographic) {
      case false:
        if (!selectedSpecificIssue) {
          return (
            <div className={"placeholder-legend"}>
              {/* <div style={{fontFamily: "Arial"}}></div>
                                <div className={"m-0"}>Bin 1</div>
                                <div style={{fontFamily: "Arial"}}></div>
                                <div className={"m-0"}>Bin 2</div>
                                <div style={{fontFamily: "Arial"}}></div>
                                <div className={"m-0"}>Bin 3</div>
                                <div style={{fontFamily: "Arial"}}></div>
                                <div className={"m-0"}>Bin 4</div>
                                <div style={{fontFamily: "Arial"}}></div>
                                <div className={"m-0"}>Bin 5</div> */}
            </div>
          );
        } else {
          return (
            <div className={"d-flex flex-column row-gap"}>
              <div>
                <p className={"mb-3"}>
                  {
                    issues.specific_issues_data[selectedSpecificIssue]
                      .specific_issue_units
                  }
                </p>
                <div className={"placeholder-legend"}>
                  <div
                    className={"legend-scale"}
                    style={{
                      backgroundColor: `rgb(${_CHAPTER_COLORS[
                        colorRamps
                      ][0].toString()})`,
                      fontFamily: "Arial",
                    }}
                  />
                  <div
                    className={"legend-scale"}
                    style={{
                      backgroundColor: `rgb(${_CHAPTER_COLORS[
                        colorRamps
                      ][1].toString()})`,
                      fontFamily: "Arial",
                    }}
                  />
                  <div
                    className={"legend-scale"}
                    style={{
                      backgroundColor: `rgb(${_CHAPTER_COLORS[
                        colorRamps
                      ][2].toString()})`,
                      fontFamily: "Arial",
                    }}
                  />{" "}
                  <div
                    className={"legend-scale"}
                    style={{
                      backgroundColor: `rgb(${_CHAPTER_COLORS[
                        colorRamps
                      ][3].toString()})`,
                      fontFamily: "Arial",
                    }}
                  />{" "}
                  <div
                    className={"legend-scale"}
                    style={{
                      backgroundColor: `rgb(${_CHAPTER_COLORS[
                        colorRamps
                      ][4].toString()})`,
                      fontFamily: "Arial",
                    }}
                  />
                  <div className={"small-font"}>
                    {legendBins[0] < 0 ? legendBins[0] : 0} → {cleanNumbers[0]}
                  </div>
                  <div className={"small-font"}>
                    {cleanNumbers[0]} → {cleanNumbers[1]}
                  </div>{" "}
                  <div className={"small-font"}>
                    {cleanNumbers[1]} → {cleanNumbers[2]}
                  </div>
                  <div className={"small-font"}>
                    {cleanNumbers[2]} → {cleanNumbers[3]}
                  </div>
                  <div className={"small-font"}>{cleanNumbers[3]}+</div>
                </div>
              </div>

              {showMap && (
                <div
                  className={`mt-3 big-button ${
                    toggleUnderperformers
                      ? "big-button-active"
                      : "big-button-inactive"
                  }`}
                  onClick={() => {
                    setToggleUnderperformers(!toggleUnderperformers);
                  }}
                >
                  {getButtonStatement()}

                  <div>
                    {toggleUnderperformers ? (
                      <FontAwesomeIcon icon={faMinus} />
                    ) : (
                      <FontAwesomeIcon icon={faPlus} />
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        }
      case true:
        if (demoLookup.name !== "Race & Ethnicity" && mapDemographics) {
          return (
            <div className={"d-flex flex-column row-gap"}>
              <div>
                <p className={"mb-3"}>
                  {demoLookup.metric_units} {demoLookup.name}
                </p>
                <div className={"placeholder-legend"}>
                  <div
                    className={"legend-scale"}
                    style={{
                      backgroundColor: `rgb(${demoLookup.colorRamp[0].join(
                        ","
                      )})`,
                      fontFamily: "Arial",
                    }}
                  />
                  <div
                    className={"legend-scale"}
                    style={{
                      backgroundColor: `rgb(${demoLookup.colorRamp[1].join(
                        ","
                      )})`,
                      fontFamily: "Arial",
                    }}
                  />
                  <div
                    className={"legend-scale"}
                    style={{
                      backgroundColor: `rgb(${demoLookup.colorRamp[2].join(
                        ","
                      )})`,
                      fontFamily: "Arial",
                    }}
                  />
                  <div
                    className={"legend-scale"}
                    style={{
                      backgroundColor: `rgb(${demoLookup.colorRamp[3].join(
                        ","
                      )})`,
                      fontFamily: "Arial",
                    }}
                  />
                  <div
                    className={"legend-scale"}
                    style={{
                      backgroundColor: `rgb(${demoLookup.colorRamp[4].join(
                        ","
                      )})`,
                      fontFamily: "Arial",
                    }}
                  />

                  <div className={"small-font"}>
                    0% → {(demoLegendBins[0] * 100).toFixed(0)}%
                  </div>
                  <div className={"small-font"}>
                    {(demoLegendBins[0] * 100).toFixed(0)}% →{" "}
                    {(demoLegendBins[1] * 100).toFixed(0)}%
                  </div>
                  <div className={"small-font"}>
                    {(demoLegendBins[1] * 100).toFixed(0)}% →{" "}
                    {(demoLegendBins[2] * 100).toFixed(0)}%
                  </div>
                  <div className={"small-font"}>
                    {(demoLegendBins[2] * 100).toFixed(0)}% →{" "}
                    {(demoLegendBins[3] * 100).toFixed(0)}%
                  </div>
                  <div className={"small-font"}>
                    {(demoLegendBins[3] * 100).toFixed(0)}% +
                  </div>
                </div>
              </div>
            </div>
          );
        } else if (mapDemographics) {
          return (
            <div className={"d-flex flex-column row-gap"}>
              <div>
                <p className={"mb-3"}>NYC Overall {demoLookup.name}</p>
                <div
                  className={"placeholder-legend placeholder-legend-ethnicity"}
                >
                  <div
                    className={"legend-scale"}
                    style={{
                      backgroundColor: `${_ETHNICITY_COLORS.Hispanic.htmlFormat}`,
                      fontFamily: "Arial",
                    }}
                  />
                  <div
                    className={"legend-scale"}
                    style={{
                      backgroundColor: `${_ETHNICITY_COLORS.White.htmlFormat}`,
                      fontFamily: "Arial",
                    }}
                  />
                  <div
                    className={"legend-scale"}
                    style={{
                      backgroundColor: `${_ETHNICITY_COLORS.Black.htmlFormat}`,
                      fontFamily: "Arial",
                    }}
                  />
                  <div
                    className={"legend-scale"}
                    style={{
                      backgroundColor: `${_ETHNICITY_COLORS.Asian.htmlFormat}`,
                      fontFamily: "Arial",
                    }}
                  />
                  <div
                    className={"legend-scale"}
                    style={{
                      backgroundColor: `${_ETHNICITY_COLORS.Other.htmlFormat}`,
                      fontFamily: "Arial",
                    }}
                  />
                  <div className={"small-font"}>29% Hispanic</div>
                  <div className={"small-font"}>33% White</div>
                  <div className={"small-font"}>23% Black</div>
                  <div className={"small-font"}>13% Asian</div>
                  <div className={"small-font"}>3% Other</div>
                </div>
              </div>
            </div>
          );
        } else {
          // DEFAULT CASE - ADD D3 DEMOGRAPHICS COMPONENT HERE!
        }
    }
  };

  return <>{getLegend()}</>;
}
