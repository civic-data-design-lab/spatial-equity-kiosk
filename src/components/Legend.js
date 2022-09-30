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
  neighborhoodName = 'citywide',
  neighborhoodID,
  toggleWalk,
  toggleTransit,
  toggleBike,
  adultAsthma,
  setAdultAsthma,
  setSelectedSpecificIssue,
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

  let textList =
    demoLookup && _DEMOGRAPHIC_PERCENTAGED[demoLookup.name].textList;
  let percList =
    demoLookup && _DEMOGRAPHIC_PERCENTAGED[demoLookup.name].percList;
  if (demoLookup && neighborhoodData) {
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
            Math.round(neighborhoodData[demoLookup.lookup]),
            100 - Math.round(neighborhoodData[demoLookup.lookup]),
          ];
        } else {
          let otherPrec = 100;
          textList = [];
          percList = [];

          if (toggleWalk) {
            let perc = Math.round(neighborhoodData['F11_Walk']);
            otherPrec -= perc;
            percList.push(perc);
            textList.push('Walk');
          }

          if (toggleTransit) {
            let perc = Math.round(neighborhoodData['F8_PubTran']);
            otherPrec -= perc;
            percList.push(perc);
            textList.push('Ride Transit');
          }

          if (toggleBike) {
            let perc = Math.round(neighborhoodData['F6_bike']);
            otherPrec -= perc;
            percList.push(perc);
            textList.push('Bike');
          }

          percList.push(otherPrec);
          textList.push('Others');
        }
      } else {
        percList = [
          Math.round(neighborhoodData[demoLookup.lookup]),
          100 - Math.round(neighborhoodData[demoLookup.lookup]),
        ];
      }
    } else if (selectedChapter == 2) {
      if (demoLookup.lookup == 'F10_TrsBkW') {
        if (!toggleWalk && !toggleTransit && !toggleBike) {
          percList = _DEMOGRAPHIC_PERCENTAGED[demoLookup.name].percList;
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

  const administrativeBoundary =
    boundary === 'council' ? 'Council districts' : 'Community Boards';

  const getImpactStatement = () => {
    const connotation = issues.specific_issues_data[selectedSpecificIssue]
      .good_or_bad
      ? issues.specific_issues_data[selectedSpecificIssue].issue_hi_low[0]
      : issues.specific_issues_data[selectedSpecificIssue].issue_hi_low[1];
    return issues.specific_issues_data[selectedSpecificIssue]
      ? `${connotation} ${issues.specific_issues_data[selectedSpecificIssue].specific_issue_units_sentence}`
      : '';
  };

  const getButtonStatement = () => {
    return !toggleUnderperformers
      ? `Highlight ${administrativeBoundary} with the ${getImpactStatement()}.`
      : `Remove highlights of ${administrativeBoundary} with the ${getImpactStatement()}.`;
  };

  // button statement
  const buttonStatement2 = dataScale ? `Equal Bins` : 'Equal Counts';

  const getLegend = () => {
    switch (forDemographic) {
      case false:
        const legendBins = [info.uniqueValueArray[0], info.binList];

        let symbol = selectedSpecificIssue
          ? issues.specific_issues_data[selectedSpecificIssue]
              .issue_units_symbol
          : '';

        let cleanNumbers = isNaN(legendBins[1][0])
          ? ''
          : min(legendBins[1]) >= 10
          ? legendBins[1].map((d) => d.toFixed(0))
          : min(legendBins[1]) >= 1
          ? legendBins[1].map((d) => d.toFixed(1))
          : legendBins[1].map((d) => d.toFixed(2));

        if (!selectedSpecificIssue) {
          return <div className={'placeholder-legend'}></div>;
        } else {
          return (
            <>
              <>
                <div>
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
                      {legendBins[0] < 0 ? legendBins[0] : 0}
                      {symbol}
                    </div>
                    <div className={'small-font'}>
                      {cleanNumbers[0]}
                      {symbol}
                    </div>{' '}
                    <div className={'small-font'}>
                      {cleanNumbers[1]}
                      {symbol}
                    </div>
                    <div className={'small-font'}>
                      {cleanNumbers[2]}
                      {symbol}
                    </div>
                    <div className={'small-font'}>
                      {cleanNumbers[3]}
                      {symbol}+
                    </div>
                  </div>
                </div>
              </>

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
                  <div
                    className={
                      demoLookup.lookup == 'F10_TrsBkW'
                        ? 'mb-1 small-font'
                        : 'mb-3 small-font'
                    }
                    style={{ display: 'inline-block' }}
                  >
                    {100 - percList[percList.length - 1]}% of
                    {demoLookup.name ===
                      'Households Living Below the Poverty Line' ||
                    demoLookup.name === 'Households Without a Car'
                      ? ' households '
                      : ' commuters '}
                    {selectedChapter == 3 ? 'in' : ''} {neighborhoodName}{' '}
                    {demoLookup.name ===
                    'Households Living Below the Poverty Line'
                      ? 'live below the poverty line'
                      : demoLookup.name === 'Households Without a Car'
                      ? 'do not own a car'
                      : demoLookup.name ===
                        'Citywide Commuters Who Drive Alone to Work'
                      ? 'drive alone to work'
                      : ` `}
                    {transitToggles}.
                  </div>
                }
                {/* {demoLookup.name !== "Population Using Alternative Transportation" && <p className={"mb-3 small-font"}>
                                    {demoLookup.metric_units}{" "}
                                </p>}*/}
                {demoLookup.lookup !== 'F10_TrsBkW' ? (
                  <p className={'mb-1 small-font'}>{demoLookup.name}</p>
                ) : (
                  <div className={'d-flex col-gap'}></div>
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

                  <div className={'small-font'}>0%</div>
                  <div className={'small-font'}>
                    {demoLegendBins[0] > 10
                      ? demoLegendBins[0].toFixed(0)
                      : demoLegendBins[0] > 1
                      ? demoLegendBins[0].toFixed(1)
                      : demoLegendBins[0].toFixed(2)}
                    %
                  </div>
                  <div className={'small-font'}>
                    {demoLegendBins[1] > 10
                      ? demoLegendBins[1].toFixed(0)
                      : demoLegendBins[1] > 1
                      ? demoLegendBins[1].toFixed(1)
                      : demoLegendBins[1].toFixed(2)}
                    %
                  </div>
                  <div className={'small-font'}>
                    {demoLegendBins[2] > 10
                      ? demoLegendBins[2].toFixed(0)
                      : demoLegendBins[2] > 1
                      ? demoLegendBins[2].toFixed(1)
                      : demoLegendBins[2].toFixed(2)}
                    %
                  </div>
                  <div className={'small-font'}>
                    {demoLegendBins[3] > 10
                      ? demoLegendBins[3].toFixed(0)
                      : demoLegendBins[3] > 1
                      ? demoLegendBins[3].toFixed(1)
                      : demoLegendBins[3].toFixed(2)}
                    % +
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
                  {neighborhoodName}
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
                  {demoLookup.name} {selectedChapter == 3 ? 'in' : ''}{' '}
                  {neighborhoodName}.
                </p>
              ) : (
                <div
                  className={
                    demoLookup.lookup == 'F10_TrsBkW'
                      ? 'mb-1 small-font'
                      : 'mb-3 small-font'
                  }
                  style={{ display: 'inline-block' }}
                >
                  {100 - percList[percList.length - 1]}% of
                  {demoLookup.name ===
                    'Households Living Below the Poverty Line' ||
                  demoLookup.name === 'Households Without a Car'
                    ? ' households '
                    : ' commuters '}
                  {selectedChapter == 3 ? 'in' : ''} {neighborhoodName}{' '}
                  {demoLookup.name ===
                  'Households Living Below the Poverty Line'
                    ? 'live below the poverty line'
                    : demoLookup.name === 'Households Without a Car'
                    ? 'do not own a car'
                    : demoLookup.name ===
                      'Citywide Commuters Who Drive Alone to Work'
                    ? 'drive alone to work'
                    : ` `}
                  {transitToggles}.
                </div>
              )}

              {/* {demoLookup.lookup !== 'F10_TrsBkW' ? (
                ''
              ) : (
                <div className={'d-flex col-gap'}>
                  <p className={'mb-1 small-font'}>Citywide Commuters Who</p>
                </div>
              )} */}

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
