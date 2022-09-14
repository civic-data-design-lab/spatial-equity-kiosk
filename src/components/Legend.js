import React from 'react';
import { min } from 'd3-array';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import GridGraph from './GridGraph';

import _CHAPTER_COLORS from '../data/chapter_colors.json';
import _ETHNICITY_COLORS from '../data/ethnicity_colors.json';
import _DEMOGRAPHIC_PERCENTAGED from '../data/demographic_percentage.json';

import _COMMUNITIES from '../texts/communities.json';
import _COUNCILS from '../texts/councildistricts.json';
import _COUNCIL_DISTRICTS from '../data/council_districts.json';
import _COMMUNITY_BOARDS from '../data/community_boards.json';

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
  transitToggles = null,
  info,
  selectedChapter,
  neighborhoodName = 'New York City',
  neighborhoodID,
  toggleWalk,
  toggleTransit,
  toggleBike,
}) {
  const communities = _COMMUNITIES;
  const councils = _COUNCILS;
  const communitiesData = _COMMUNITY_BOARDS;
  const councilsData = _COUNCIL_DISTRICTS;
  const neighborhoodJsonLookup =
    (councils[neighborhoodID] && councils[neighborhoodID].json_lookup) ||
    (
      communities[neighborhoodID] && communities[neighborhoodID].json_lookup
    )?.toString();
  const selectedNeighborhood =
    boundary === 'council' ? _COUNCIL_DISTRICTS : _COMMUNITY_BOARDS;

  let neighborhoodData;
  for (const [index, element] of selectedNeighborhood.features.entries()) {
    if (
      element.properties.CDTA2020?.toString() === neighborhoodJsonLookup ||
      element.properties.CounDist?.toString() === neighborhoodJsonLookup
    ) {
      // console.log(element.properties)
      neighborhoodData = element.properties;
      break;
    }
  }

  let textList;
  let percList;
  if (demoLookup) {
    textList = _DEMOGRAPHIC_PERCENTAGED[demoLookup.name].textList;
    if (selectedChapter == 3) {
      if (demoLookup.name == 'Race & Ethnicity') {
        percList = [
          Math.round(neighborhoodData['P_Hispanic'] * 100),
          Math.round(neighborhoodData['P_White'] * 100),
          Math.round(neighborhoodData['P_Black'] * 100),
          Math.round(neighborhoodData['P_Asian'] * 100),
          100 -
            (Math.round(neighborhoodData['P_Hispanic'] * 100) +
              Math.round(neighborhoodData['P_White'] * 100) +
              Math.round(neighborhoodData['P_Black'] * 100) +
              Math.round(neighborhoodData['P_Asian'] * 100)),
        ];
      } else if (demoLookup.lookup == 'F10_TrsBkW') {
        if (!toggleWalk && !toggleTransit && !toggleBike) {
          percList = [
            Math.round(neighborhoodData[demoLookup.lookup] * 100),
            100 - Math.round(neighborhoodData[demoLookup.lookup] * 100),
          ];
        } else {
          let otherPrec = 100;
          textList = [];
          percList = [];

          if (toggleWalk) {
            let perc = Math.round(neighborhoodData['F11_Walk'] * 100);
            otherPrec -= perc;
            percList.push(perc);
            textList.push('Walk');
          }

          if (toggleTransit) {
            let perc = Math.round(neighborhoodData['F8_PubTran'] * 100);
            otherPrec -= perc;
            percList.push(perc);
            textList.push('Ride Transit');
          }

          if (toggleBike) {
            let perc = Math.round(neighborhoodData['F6_bike'] * 100);
            otherPrec -= perc;
            percList.push(perc);
            textList.push('Bike');
          }

          percList.push(otherPrec);
          textList.push('Others');
        }
      } else {
        percList = [
          Math.round(neighborhoodData[demoLookup.lookup] * 100),
          100 - Math.round(neighborhoodData[demoLookup.lookup] * 100),
        ];
      }
    } else if (selectedChapter == 2) {
      if (demoLookup.lookup == 'F10_TrsBkW') {
        if (!toggleWalk && !toggleTransit && !toggleBike) {
          percList = [
            Math.round(neighborhoodData[demoLookup.lookup] * 100),
            100 - Math.round(neighborhoodData[demoLookup.lookup] * 100),
          ];
        } else {
          let otherPrec = 100;
          textList = [];
          percList = [];

          if (toggleWalk) {
            let perc = _DEMOGRAPHIC_PERCENTAGED[demoLookup.name]['F11_Walk'];
            otherPrec -= perc;
            percList.push(perc);
            textList.push('Walk');
          }

          if (toggleTransit) {
            let perc = _DEMOGRAPHIC_PERCENTAGED[demoLookup.name]['F8_PubTran'];
            otherPrec -= perc;
            percList.push(perc);
            textList.push('Ride Transit');
          }

          if (toggleBike) {
            let perc = _DEMOGRAPHIC_PERCENTAGED[demoLookup.name]['F6_bike'];
            otherPrec -= perc;
            percList.push(perc);
            textList.push('Bike');
          }

          percList.push(otherPrec);
          textList.push('Others');
        }
      } else {
        percList = _DEMOGRAPHIC_PERCENTAGED[demoLookup.name].percList;
      }
    }
  }
  // console.log("--------------------")
  // console.log("demoLegendBins", demoLegendBins)
  // console.log("demoLookup", demoLookup)
  // console.log("forDemographic", forDemographic)
  // console.log("neighborhoodID", neighborhoodID)
  // console.log("communities", communities)
  // console.log("councils", councils)
  // console.log("communitiesData", communitiesData)
  // console.log("councilsData", councilsData)
  // console.log("neighborhoodJsonLookup", neighborhoodJsonLookup)
  // console.log("demographics json ", _DEMOGRAPHIC_PERCENTAGED)
  // console.log("demoLookup.lookup", demoLookup.lookup)
  // console.log("neighborhoodData", Math.round(neighborhoodData[demoLookup.lookup] * 100))
  // console.log("percList", percList)
  // console.log("toggleWalk", toggleWalk)
  // console.log("toggleTransit", toggleTransit)
  // console.log("toggleBike", toggleBike)
  // console.log("--------------------")

  const administrativeBoundary =
    boundary === 'council' ? 'Council Districts' : 'Community Boards';

  const getImpactStatement = () => {
    return issues.specific_issues_data[selectedSpecificIssue]
      ? `${issues.specific_issues_data[selectedSpecificIssue].issue_hi_low[1]} ${issues.specific_issues_data[selectedSpecificIssue].specific_issue_units_sentence}`
      : '';
  };

  const getButtonStatement = () => {
    return !toggleUnderperformers
      ? `Highlight ${administrativeBoundary} with the ${getImpactStatement()}.`
      : `Remove highlights of ${administrativeBoundary} with the ${getImpactStatement()}.`;
  };

  // button statement
  const buttonStatement2 = dataScale ? `Equal Bins` : 'Equal Counts';

  /*const getLegendBins = () => {
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
          if (isNaN(floatValue) === false) {
            if (
              boundary === "council" ||
              (zoomToggle == 1 &&
                boundary === "community" &&
                mapScale.features[i].properties.Data_YN === "Y") ||
              (zoomToggle == 0 && mapScale.features[i].properties.AnsUnt_YN === "Y")
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
      };*/

  const getLegend = () => {
    switch (forDemographic) {
      case false:
        const legendBins = [info.uniqueValueArray[0], info.binList];

        let cleanNumbers = isNaN(legendBins[1][0])
          ? ''
          : min(legendBins[1]) >= 10
          ? legendBins[1].map((d) => Math.round(d))
          : legendBins[1];
        if (!selectedSpecificIssue) {
          return (
            <div className={'placeholder-legend'}>
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
            <>
              <div className={'d-flex flex-column justify-content-between'}>
                <p className={'small-font mb-1'}>
                  {
                    issues.specific_issues_data[selectedSpecificIssue]
                      .specific_issue_units
                  }
                </p>
                <div className={'placeholder-legend'}>
                  <div
                    className={'legend-scale'}
                    style={{
                      backgroundColor: `rgb(${_CHAPTER_COLORS[
                        colorRamps
                      ][0].toString()})`,
                      fontFamily: 'Arial',
                    }}
                  />
                  <div
                    className={'legend-scale'}
                    style={{
                      backgroundColor: `rgb(${_CHAPTER_COLORS[
                        colorRamps
                      ][1].toString()})`,
                      fontFamily: 'Arial',
                    }}
                  />
                  <div
                    className={'legend-scale'}
                    style={{
                      backgroundColor: `rgb(${_CHAPTER_COLORS[
                        colorRamps
                      ][2].toString()})`,
                      fontFamily: 'Arial',
                    }}
                  />{' '}
                  <div
                    className={'legend-scale'}
                    style={{
                      backgroundColor: `rgb(${_CHAPTER_COLORS[
                        colorRamps
                      ][3].toString()})`,
                      fontFamily: 'Arial',
                    }}
                  />{' '}
                  <div
                    className={'legend-scale'}
                    style={{
                      backgroundColor: `rgb(${_CHAPTER_COLORS[
                        colorRamps
                      ][4].toString()})`,
                      fontFamily: 'Arial',
                    }}
                  />
                  <div className={'small-font'}>
                    {legendBins[0] < 0 ? legendBins[0] : 0} → {cleanNumbers[0]}
                  </div>
                  <div className={'small-font'}>
                    {cleanNumbers[0]} → {cleanNumbers[1]}
                  </div>{' '}
                  <div className={'small-font'}>
                    {cleanNumbers[1]} → {cleanNumbers[2]}
                  </div>
                  <div className={'small-font'}>
                    {cleanNumbers[2]} → {cleanNumbers[3]}
                  </div>
                  <div className={'small-font'}>{cleanNumbers[3]}+</div>
                </div>
              </div>

              {showMap && (
                <div
                  className={`big-button small-font ${
                    toggleUnderperformers
                      ? 'big-button-active'
                      : 'big-button-inactive'
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
            </>
          );
        }
      case true:
        if (demoLookup.name !== 'Race & Ethnicity' && mapDemographics) {
          return (
            <div className={'d-flex flex-column row-gap'} style={{ flex: 1 }}>
              <div>
                {
                  <p className={'m-0 small-font'}>
                    <span className={'bold'}>{percList[0]}</span>% of
                    {demoLookup.name ===
                      'Households Living Below the Poverty Line' ||
                    demoLookup.name === 'Households Without a Car'
                      ? ' households '
                      : ' commuters '}
                    in{' '}
                    <span className={'underline bold'}>{neighborhoodName}</span>{' '}
                    {demoLookup.name ===
                    'Households Living Below the Poverty Line'
                      ? 'live below the poverty line'
                      : demoLookup.name === 'Households Without a Car'
                      ? 'do not own a car'
                      : demoLookup.name ===
                        'Citywide Commuters Who Drive Alone to Work'
                      ? 'drive alone to work'
                      : 'bike, walk, or ride transit'}
                  </p>
                }
                {/* {demoLookup.name !== "Population Using Alternative Transportation" && <p className={"mb-3 small-font"}>
                                    {demoLookup.metric_units}{" "}
                                </p>}*/}
                {demoLookup.lookup !== 'F10_TrsBkW' ? (
                  <p className={'mb-1 small-font'}>{demoLookup.name}</p>
                ) : (
                  <div className={'d-flex col-gap'}>
                    <p className={'mb-1 small-font'}>Citywide Commuters Who</p>
                    {transitToggles}
                  </div>
                )}

                <div className={'placeholder-legend'}>
                  <div
                    className={'legend-scale'}
                    style={{
                      backgroundColor: `rgb(${demoLookup.colorRamp[0].join(
                        ','
                      )})`,
                      fontFamily: 'Arial',
                    }}
                  />
                  <div
                    className={'legend-scale'}
                    style={{
                      backgroundColor: `rgb(${demoLookup.colorRamp[1].join(
                        ','
                      )})`,
                      fontFamily: 'Arial',
                    }}
                  />
                  <div
                    className={'legend-scale'}
                    style={{
                      backgroundColor: `rgb(${demoLookup.colorRamp[2].join(
                        ','
                      )})`,
                      fontFamily: 'Arial',
                    }}
                  />
                  <div
                    className={'legend-scale'}
                    style={{
                      backgroundColor: `rgb(${demoLookup.colorRamp[3].join(
                        ','
                      )})`,
                      fontFamily: 'Arial',
                    }}
                  />
                  <div
                    className={'legend-scale'}
                    style={{
                      backgroundColor: `rgb(${demoLookup.colorRamp[4].join(
                        ','
                      )})`,
                      fontFamily: 'Arial',
                    }}
                  />


                  <div className={'small-font'}>
                    0% → {(demoLegendBins[0] * 100).toFixed(0)}%
                  </div>
                  <div className={'small-font'}>
                    {(demoLegendBins[0] * 100).toFixed(0)}% →{' '}
                    {(demoLegendBins[1] * 100).toFixed(0)}%
                  </div>
                  <div className={'small-font'}>
                    {(demoLegendBins[1] * 100).toFixed(0)}% →{' '}
                    {(demoLegendBins[2] * 100).toFixed(0)}%
                  </div>
                  <div className={'small-font'}>
                    {(demoLegendBins[2] * 100).toFixed(0)}% →{' '}
                    {(demoLegendBins[3] * 100).toFixed(0)}%
                  </div>
                  <div className={'small-font'}>
                    {(demoLegendBins[3] * 100).toFixed(0)}% +
                  </div>
                </div>
              </div>
            </div>
          );
        } else if (mapDemographics) {
          return (
            <div className={'d-flex flex-column row-gap'} style={{ flex: 1 }}>
              <div>
                <p className={'mb-3 small-font'}>
                  {selectedChapter == 3 ? '' : 'Citywide'} {demoLookup.name} in{' '}
                  <span className={'underline bold'}>{neighborhoodName}</span>
                </p>
                <div
                  className={'placeholder-legend placeholder-legend-ethnicity'}
                >
                  <div
                    className={'legend-scale'}
                    style={{
                      backgroundColor: `${_ETHNICITY_COLORS.Latino.htmlFormat}`,
                      fontFamily: 'Arial',
                    }}
                  />
                  <div
                    className={'legend-scale'}
                    style={{
                      backgroundColor: `${_ETHNICITY_COLORS.White.htmlFormat}`,
                      fontFamily: 'Arial',
                    }}
                  />
                  <div
                    className={'legend-scale'}
                    style={{
                      backgroundColor: `${_ETHNICITY_COLORS.Black.htmlFormat}`,
                      fontFamily: 'Arial',
                    }}
                  />
                  <div
                    className={'legend-scale'}
                    style={{
                      backgroundColor: `${_ETHNICITY_COLORS.Asian.htmlFormat}`,
                      fontFamily: 'Arial',
                    }}
                  />
                  <div
                    className={'legend-scale'}
                    style={{
                      backgroundColor: `${_ETHNICITY_COLORS.Other.htmlFormat}`,
                      fontFamily: 'Arial',
                    }}
                  />
                  <div className={'small-font'}>29% Latino</div>
                  <div className={'small-font'}>33% White</div>
                  <div className={'small-font'}>23% Black</div>
                  <div className={'small-font'}>13% Asian</div>
                  <div className={'small-font'}>3% Other</div>
                </div>
              </div>
            </div>
          );
        } else {
          // DEFAULT CASE - ADD D3 DEMOGRAPHICS COMPONENT HERE!
          let gridColorRamps;


          if (demoLookup.name == 'Race & Ethnicity') {
            gridColorRamps = [
              _ETHNICITY_COLORS.Latino.htmlFormat,
              _ETHNICITY_COLORS.White.htmlFormat,
              _ETHNICITY_COLORS.Black.htmlFormat,
              _ETHNICITY_COLORS.Asian.htmlFormat,
              _ETHNICITY_COLORS.Other.htmlFormat,
            ];
          } else if (demoLookup.lookup == 'F10_TrsBkW') {
            if (!toggleWalk && !toggleTransit && !toggleBike) {
              gridColorRamps = [
                `rgb(${demoLookup.colorRamp[2].join(',')})`,
                `rgb(${demoLookup.colorRamp[4].join(',')})`,
              ];
            } else {
              gridColorRamps = [];
              if (toggleWalk)
                gridColorRamps.push(
                  `rgb(${demoLookup.colorRamp[1].join(',')})`
                );
              if (toggleTransit)
                gridColorRamps.push(
                  `rgb(${demoLookup.colorRamp[2].join(',')})`
                );
              if (toggleBike)
                gridColorRamps.push(
                  `rgb(${demoLookup.colorRamp[3].join(',')})`
                );
              gridColorRamps.push(`rgb(${demoLookup.colorRamp[4].join(',')})`);
            }
          } else {
            gridColorRamps = [
              // `rgb(${demoLookup.colorRamp[0].join(",")})`,
              // `rgb(${demoLookup.colorRamp[1].join(",")})`,
              `rgb(${demoLookup.colorRamp[2].join(',')})`,
              // `rgb(${demoLookup.colorRamp[3].join(",")})`,
              `rgb(${demoLookup.colorRamp[4].join(',')})`,
            ];
          }

          return (
            <div style={{ flex: 1 }}>
              {demoLookup.name == 'Race & Ethnicity' ? (
                <p
                  className={
                    demoLookup.lookup == 'F10_TrsBkW'
                      ? 'mb-1 small-font'
                      : 'mb-3 small-font'
                  }
                >
                  {selectedChapter == 3 ? '' : 'Citywide'} {demoLookup.name} in{' '}
                  <span className={'underline bold'}>{neighborhoodName}</span>
                </p>
              ) : (
                <p
                  className={
                    demoLookup.lookup == 'F10_TrsBkW'
                      ? 'mb-1 small-font'
                      : 'mb-3 small-font'
                  }
                >
                  <span className={'bold'}>{percList[0]}</span>% of
                  {demoLookup.name ===
                    'Households Living Below the Poverty Line' ||
                  demoLookup.name === 'Households Without a Car'
                    ? ' households '
                    : ' commuters '}
                  in{' '}
                  <span className={'underline bold'}>{neighborhoodName}</span>{' '}
                  {demoLookup.name ===
                  'Households Living Below the Poverty Line'
                    ? 'live below the poverty line'
                    : demoLookup.name === 'Households Without a Car'
                    ? 'do not own a car'
                    : demoLookup.name ===
                      'Citywide Commuters Who Drive Alone to Work'
                    ? 'drive alone to work'
                    : 'bike, walk, or ride transit'}
                </p>
              )}

              {demoLookup.lookup !== 'F10_TrsBkW' ? (
                ''
              ) : (
                <div className={'d-flex col-gap'}>
                  <p className={'mb-1 small-font'}>Citywide Commuters Who</p>
                  {transitToggles}
                </div>
              )}

              <div
                className={'placeholder-legend placeholder-legend-ethnicity'}
              />
              <GridGraph
                colorRamps={gridColorRamps}
                percList={percList}
                textList={textList}
              />
            </div>
          );
        }
    }
  };

  return <>{getLegend()}</>;
}
