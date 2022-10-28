import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import GridGraph from './GridGraph';
import SourceInfo from './SourceInfo';

import _CHAPTER_COLORS from '../data/chapter_colors.json';
import _ETHNICITY_COLORS from '../data/ethnicity_colors.json';
import _DEMOGRAPHIC_PERCENTAGED from '../data/demographic_percentage.json';

import _ISSUES from '../texts/issues.json';
import _DEMOGRAPHICS from '../texts/demographics.json';
import _COMMUNITIES from '../texts/communities.json';
import _COUNCILS from '../texts/councildistricts.json';
import _COUNCIL_DISTRICTS from '../data/council_districts.json';
import _COMMUNITY_BOARDS from '../data/community_boards.json';

import { getNumber } from '../utils/functions';

export default function Legend({
  demographic,
  selectedSpecificIssue,
  colorRamps,
  toggleUnderperformers,
  setToggleUnderperformers,
  boundary,
  dataScale,
  forDemographic,
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
  setSelectedChapter = null,
  setShowMap = null,

  // mobile only
  isMobile = false,
  showLegend = false,
}) {
  const [textList, setTextList] = useState(null);
  const [percList, setPercList] = useState(null);
  const [administrativeBoundary, setAdministrativeBoundary] = useState(null);
  const [demoData, setDemoData] = useState(null);

  const getLegendData = () => {
    const legendData = {};

    // Get the administrative boundary
    legendData.administrativeBoundary =
      boundary === 'council' ? 'Council districts' : 'Community Boards';

    const neighborhoodJsonLookup =
      (_COUNCILS[neighborhoodID] && _COUNCILS[neighborhoodID].json_lookup) ||
      (
        _COMMUNITIES[neighborhoodID] && _COMMUNITIES[neighborhoodID].json_lookup
      )?.toString();

    const selectedNeighborhood =
      boundary === 'council' ? _COUNCIL_DISTRICTS : _COMMUNITY_BOARDS;

    let neighborhoodData;
    for (const [index, element] of selectedNeighborhood.features.entries()) {
      if (
        element.properties.CDTA2020?.toString() === neighborhoodJsonLookup ||
        element.properties.CounDist?.toString() === neighborhoodJsonLookup
      ) {
        neighborhoodData = element.properties;
        break;
      }
    }

    legendData.newDemoData = _DEMOGRAPHICS[demographic];

    if (!(legendData.newDemoData && neighborhoodData)) {
      // No new data, early return
      return legendData;
    }

    // Get the demo name and lookup ID for future reference
    const demoName = legendData.newDemoData.name;
    const lookup = legendData.newDemoData.lookup;

    // Set the default text list and percent list
    legendData.textList =
      legendData.newDemoData && _DEMOGRAPHIC_PERCENTAGED[demoName].textList;
    legendData.percList =
      legendData.newDemoData && _DEMOGRAPHIC_PERCENTAGED[demoName].percList;

    if (selectedChapter !== 3 && selectedChapter !== 2) {
      // Outside of the necessary chapters
      return legendData;
    }

    // SELECTED CHAPTER 3
    if (selectedChapter === 3) {
      // Race and Ethnicity demographics
      if (demoName == 'Race & Ethnicity') {
        legendData.percList = [
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

        return legendData;
      }

      // Lookup is F10_TrsBkW
      if (lookup == 'F10_TrsBkW') {
        // Default percent list, no toggles selected
        if (!toggleWalk && !toggleTransit && !toggleBike) {
          legendData.percList = [
            Math.round(neighborhoodData[lookup]),
            100 - Math.round(neighborhoodData[lookup]),
          ];
          return legendData;
        }

        // At least one toggle selected
        let otherPrec = 100;
        legendData.textList = [];
        legendData.percList = [];

        if (toggleWalk) {
          let perc = Math.round(neighborhoodData['F11_Walk']);
          otherPrec -= perc;
          legendData.percList.push(perc);
          legendData.textList.push('Walk');
        }

        if (toggleTransit) {
          let perc = Math.round(neighborhoodData['F8_PubTran']);
          otherPrec -= perc;
          legendData.percList.push(perc);
          legendData.textList.push('Ride Transit');
        }

        if (toggleBike) {
          let perc = Math.round(neighborhoodData['F6_bike']);
          otherPrec -= perc;
          legendData.percList.push(perc);
          legendData.textList.push('Bike');
        }

        legendData.percList.push(otherPrec);
        legendData.textList.push('Others');

        return legendData;
      }

      // Everything else
      legendData.percList = [
        Math.round(neighborhoodData[lookup]),
        100 - Math.round(neighborhoodData[lookup]),
      ];

      return legendData;
    }

    // SELECTED CHAPTER 2

    // Lookup is the transit information
    if (lookup == 'F10_TrsBkW') {
      // Default percent list, no toggles selected
      if (!toggleWalk && !toggleTransit && !toggleBike) {
        legendData.percList = _DEMOGRAPHIC_PERCENTAGED[demoName].percList;
        return legendData;
      }
      let otherPrec = 100;
      legendData.textList = [];
      legendData.percList = [];

      if (toggleWalk) {
        let perc = _DEMOGRAPHIC_PERCENTAGED[demoName]['F11_Walk'];
        otherPrec -= perc;
        legendData.percList.push(perc);
        legendData.textList.push('Walk');
      }

      if (toggleTransit) {
        let perc = _DEMOGRAPHIC_PERCENTAGED[demoName]['F8_PubTran'];
        otherPrec -= perc;
        legendData.percList.push(perc);
        legendData.textList.push('Ride Transit');
      }

      if (toggleBike) {
        let perc = _DEMOGRAPHIC_PERCENTAGED[demoName]['F6_bike'];
        otherPrec -= perc;
        legendData.percList.push(perc);
        legendData.textList.push('Bike');
      }

      legendData.percList.push(otherPrec);
      legendData.textList.push('Others');

      return legendData;
    }

    // Lookup is something else
    legendData.percList = _DEMOGRAPHIC_PERCENTAGED[demoName].percList;
    return legendData;
  };

  /**
   * Update the legend state when props change
   */
  useEffect(() => {
    const newLegendData = getLegendData();
    setTextList(newLegendData.textList);
    setPercList(newLegendData.percList);
    setAdministrativeBoundary(newLegendData.administrativeBoundary);
    setDemoData(newLegendData.newDemoData);
  }, [
    neighborhoodID,
    boundary,
    selectedChapter,
    toggleWalk,
    toggleTransit,
    toggleBike,
    mapDemographics,
    forDemographic,
    demographic,
    selectedChapter,
  ]);

  const getImpactStatement = () => {
    return _ISSUES.specific_issues_data[selectedSpecificIssue]
      ? `${_ISSUES.specific_issues_data[selectedSpecificIssue].issue_highlight}`
      : '';
  };

  const getButtonStatement = () => {
    if (toggleUnderperformers) {
      return `Remove highlights of ${administrativeBoundary}
        with the ${getImpactStatement()}.`;
    }
    return `Highlight ${administrativeBoundary} with the ${getImpactStatement()}.`;
  };

  // button statement
  const buttonStatement2 = dataScale ? `Equal Bins` : 'Equal Counts';

  const getDemoStatement = (value) => {
    return (
      <>
        <div
          className={
            demoData.lookup == 'F10_TrsBkW'
              ? 'mb-1 small-font d-inline-block'
              : 'mb-3 small-font d-inline-block'
          }
        >
          {getNumber(100 - percList[percList.length - 1])}% of
          {demoData.name === 'Households Living Below the Poverty Line' ||
          demoData.name === 'Households Without a Car'
            ? ' households '
            : ' commuters '}
          {selectedChapter == 3 ? 'in' : ''} {neighborhoodName}{' '}
          {demoData.name === 'Households Living Below the Poverty Line'
            ? 'live below the poverty line'
            : demoData.name === 'Households Without a Car'
            ? 'do not own a car'
            : demoData.name === 'Citywide Commuters Who Drive Alone to Work'
            ? 'drive alone to work'
            : ''}
          {demoData.name === 'Commuters Who Bike, Walk, or Ride Transit'
            ? ''
            : '.'}
        </div>
        {demoData.name === 'Commuters Who Bike, Walk, or Ride Transit' && (
          <div className={'d-inline-block'}>
            {transitToggles}
            {!isMobile ? '.' : ''}
          </div>
        )}{' '}
        <SourceInfo
          type={'demographic'}
          setSelectedChapter={setSelectedChapter}
          setShowMap={setShowMap}
        />
      </>
    );
  };

  const getLegend = () => {
    if (!forDemographic) {
      // metric legend
      const legendBins = [info.uniqueValueArray[0], info.binList];

      let symbol = selectedSpecificIssue
        ? _ISSUES.specific_issues_data[selectedSpecificIssue].issue_units_symbol
        : '';

      let cleanNumbers = isNaN(legendBins[1][0])
        ? ''
        : getNumber(legendBins[1]);

      if (!selectedSpecificIssue) {
        return <div className={'placeholder-legend'}></div>;
      }

      return (
        <>
          <>
            <div className="w-100">
              <div className={'small-font mb-1'}>
                {_ISSUES.specific_issues_data[selectedSpecificIssue].units}{' '}
                {!isMobile && (
                  <SourceInfo
                    selectedSpecificIssue={selectedSpecificIssue}
                    setSelectedChapter={setSelectedChapter}
                    setShowMap={setShowMap}
                  />
                )}
              </div>
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
                  {legendBins[0] < 0 ? getNumber(legendBins[0]) : 0}
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

          {showMap && !isMobile && (
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

    // demographic legend
    /* three cases for demographic legend:
     ** 1. Demographic is displayed on the map
     **   1.1 Demographics are displayed on map, but not the race and ethnicity
     *    breakdown
     **   1.2 Race and ethnicity breakdown is displayed for race and ethnicity
     ** 2. if the demographics are not displayed on the map
     */
    if (!demoData) {
      return;
    }

    if (mapDemographics) {
      // 1.1 Demographics are displayed on map, but not the race and ethnicity
      // breakdown
      if (demoData.name !== 'Race & Ethnicity') {
        return (
          <div className={'d-flex flex-column row-gap'} style={{ flex: 1 }}>
            <div>
              {!isMobile || (isMobile && showLegend)
                ? getDemoStatement(1)
                : null}
              {demoData.lookup !== 'F10_TrsBkW' ? (
                <p className={'mb-1 small-font'}>{demoData.name}</p>
              ) : (
                <div className={'d-flex col-gap'}></div>
              )}

              <div className={'placeholder-legend'}>
                <div
                  className={'legend-scale'}
                  style={{
                    backgroundColor: `rgb(${demoData.colorRamp[0].join(',')})`,
                    fontFamily: 'Arial',
                  }}
                />
                <div
                  className={'legend-scale'}
                  style={{
                    backgroundColor: `rgb(${demoData.colorRamp[1].join(',')})`,
                    fontFamily: 'Arial',
                  }}
                />
                <div
                  className={'legend-scale'}
                  style={{
                    backgroundColor: `rgb(${demoData.colorRamp[2].join(',')})`,
                    fontFamily: 'Arial',
                  }}
                />
                <div
                  className={'legend-scale'}
                  style={{
                    backgroundColor: `rgb(${demoData.colorRamp[3].join(',')})`,
                    fontFamily: 'Arial',
                  }}
                />
                <div
                  className={'legend-scale'}
                  style={{
                    backgroundColor: `rgb(${demoData.colorRamp[4].join(',')})`,
                    fontFamily: 'Arial',
                  }}
                />

                <div className={'small-font'}>0%</div>
                <div className={'small-font'}>
                  {getNumber(demoLegendBins[0])}%
                </div>
                <div className={'small-font'}>
                  {getNumber(demoLegendBins[1])}%
                </div>
                <div className={'small-font'}>
                  {getNumber(demoLegendBins[2])}%
                </div>
                <div className={'small-font'}>
                  {getNumber(demoLegendBins[3])}% +
                </div>
              </div>
            </div>
          </div>
        );
      }
      // 1.2 Race and ethnicity breakdown is displayed for race and ethnicity
      // (it has a different display mode due to the multiple categories)
      return (
        <div className={'d-flex flex-column row-gap'} style={{ flex: 1 }}>
          <div>
            <p className={'mb-3 small-font'}>
              {selectedChapter == 3 ? '' : 'Citywide'} {demoData.name}
              {selectedChapter == 3 ? ' in ' : ''}
              {selectedChapter == 3 ? neighborhoodName : ''}.
            </p>
            <div className={'placeholder-legend placeholder-legend-ethnicity'}>
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
              <div className={'small-font'}>
                {percList[0]}% {textList[0]}
              </div>
              <div className={'small-font'}>
                {percList[1]}% {textList[1]}
              </div>
              <div className={'small-font'}>
                {percList[2]}% {textList[2]}
              </div>
              <div className={'small-font'}>
                {percList[3]}% {textList[3]}
              </div>
              <div className={'small-font'}>
                {percList[4]}% {textList[4]}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // 3. if the demographics are not displayed on the map
    let gridColorRamps;

    if (demoData.name == 'Race & Ethnicity') {
      gridColorRamps = [
        _ETHNICITY_COLORS.Latino.htmlFormat,
        _ETHNICITY_COLORS.White.htmlFormat,
        _ETHNICITY_COLORS.Black.htmlFormat,
        _ETHNICITY_COLORS.Asian.htmlFormat,
        _ETHNICITY_COLORS.Other.htmlFormat,
      ];
    } else if (demoData.lookup == 'F10_TrsBkW') {
      if (!toggleWalk && !toggleTransit && !toggleBike) {
        gridColorRamps = [
          `rgb(${demoData.colorRamp[3].join(',')})`,
          `rgb(${demoData.colorRamp[1].join(',')})`,
        ];
      } else {
        gridColorRamps = [];
        if (toggleWalk)
          gridColorRamps.push(`rgb(${demoData.colorRamp[4].join(',')})`);
        if (toggleTransit)
          gridColorRamps.push(`rgb(${demoData.colorRamp[3].join(',')})`);
        if (toggleBike)
          gridColorRamps.push(`rgb(${demoData.colorRamp[2].join(',')})`);
        gridColorRamps.push(`rgb(${demoData.colorRamp[1].join(',')})`);
      }
    } else {
      gridColorRamps = [
        // `rgb(${demoData.colorRamp[0].join(",")})`,
        // `rgb(${demoData.colorRamp[1].join(",")})`,
        `rgb(${demoData.colorRamp[3].join(',')})`,
        // `rgb(${demoData.colorRamp[3].join(",")})`,
        // `rgb(${demoData.colorRamp[4].join(',')})`,
        `rgb(${demoData.colorRamp[1].join(',')})`,
      ];
    }
    return (
      <div style={{ flex: 1 }}>
        {demoData.name == 'Race & Ethnicity' ? (
          <p
            className={
              demoData.lookup == 'F10_TrsBkW'
                ? 'mb-1 small-font'
                : 'mb-3 small-font'
            }
          >
            {demoData.name} {selectedChapter == 3 ? 'in' : ''}{' '}
            {neighborhoodName}.
          </p>
        ) : (
          getDemoStatement(2)
        )}

        <div className={'placeholder-legend placeholder-legend-ethnicity'} />
        <GridGraph
          colorRamps={gridColorRamps}
          percList={percList}
          textList={textList}
        />
      </div>
    );
  };

  return getLegend();
}
