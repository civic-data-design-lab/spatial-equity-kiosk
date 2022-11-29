// import React and React hooks
import React, { useEffect, useState } from 'react';

// import fonts
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faCaretUp,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

// import components
import Form from 'react-bootstrap/Form';
import Slider from './Carousel';
import Legend from './Legend';
import IssuesGrid from './IssuesGrid';

// import data and/or text
import _COUNCILS from '../texts/councildistricts.json';
import _COMMUNITIES from '../texts/communities.json';


/**
 * Demographics.js
 * 
 * @constructor
 * @param {int} currentValue - represents which demographics item is chosen.
 * @param {Function} setValue- update demographics item.
 * @param {boolean} showDemographics - whether to expand demographics tab or not
 * @param {string} compareSearch - user's query for community they want to compare the primary search with
 * @param {string} communitySearch - user's query for community (primary)
 * @param {boolean} mapDemographics - whether to display demographic information on the map or not
 * @param {Function} setMapDemographics - callback to update app's mapDemographics state
 * @param {string} boundary - string representing the toggled active boundary (either 'council' or 'community').
 * @param {int} selectedChapter - represents the current active section of the web app (either 1, 2, 3 or 4)
 * @param {boolean} toggleTransit - whether to include transit in alternative commute to work data layer
 * @param {boolean} toggleBike - whether to include bike in alternative commute to work data layer
 * @param {boolean} toggleWalk - whether to include walk in alternative commute to work data layer
 * @param {Float32Array[]} demoLegendBins - binning values for the legend (Array of 5 floats representing upper value of each bin )
 * @param {Int[]} demoColorRamp - color for legend
 * @param {boolean} showMap - if the user is on map view
 * @param {Object} info - contains information calculated in App.js (binList, mapScale, metricGoodorBad, seletedBoundary, selectedMetric, selectedMetricArray, sortedSelectedMetricArray, uniqueValueArray)
 * @param {Object} issue_categories - categories of demographics to display for IssueGrid.js
 * @param {Function} setSelectedChapter -function to set the current active chapter of the web app (either 1, 2, 3, or 4).
 * @param {Function} setShowMap - update the app's showMap state
 */

export default function Demographics({
  currentValue = null,
  setValue = null,
  showDemographics,
  compareSearch,
  communitySearch,
  mapDemographics,
  setMapDemographics,
  boundary,
  selectedChapter,
  toggleWalk,
  toggleTransit,
  toggleBike,
  setToggleWalk,
  setToggleTransit,
  setToggleBike,
  demoLegendBins,
  demoColorRamp,
  showMap,
  info,
  issue_categories,
  setSelectedChapter,
  setShowMap,

  // mobile only
  isMobile = false,
  showLegend = false,
}) {

  // demographic dropdown items
  const demographics = {
    1: 'Race & Ethnicity',
    2: 'Poverty Level',
    3: 'Vehicle Ownership',
    4: 'Drive Alone to Work',
    5: 'Walk, Bike, or Ride Transit',
  };

  // state for keeping track of whether to display dropdown items or not
  const [showDropdownItems, setShowDropdownItems] = useState(false);

  // state for keeping track of what text to put in drop down toggle
  const [demoToggleText, setDemoToggleText] = useState(
    'Select a demographic to explore'
  );

  // make sure text inside dropdown toggle matches what has been selected
  useEffect(() => {
    if (currentValue) {
      setDemoToggleText(demographics[currentValue]);
    }
  }, []);


  // get three checkboxes for Transit, Bike and Walk to work 
  const getTransitToggles = () => {
    if (currentValue === '5') {
      const mobileStyle = isMobile
        ? {
            border: '1px solid black',
            padding: '0.5rem',
          }
        : {};
      const buttonAlignment = {
        display: 'flex',
        alignItems: 'center',
      };
      return (
        <div
          className={`transit-toggle ${isMobile ? 'd-grid mb-3' : ''}`}
          style={{
            gridTemplateColumns: 'auto auto auto',
            justifyContent: isMobile ? 'stretch' : '',
          }}
        >
          <div>
            <Form style={mobileStyle}>
              <Form.Check
                style={buttonAlignment}
                inline
                type={'checkbox'}
                id={`walk-check`}
                label={'Walk'}
                checked={toggleWalk}
                onChange={(e) => {
                  setToggleWalk(e.target.checked);
                }}
              />
            </Form>
          </div>
          <div>
            <Form style={mobileStyle}>
              <Form.Check
                style={buttonAlignment}
                inline
                type={'checkbox'}
                id={`bike-check`}
                label={'Bike'}
                checked={toggleBike}
                onChange={(e) => {
                  setToggleBike(e.target.checked);
                }}
              />
            </Form>
          </div>
          <div>
            <Form style={mobileStyle}>
              <Form.Check
                style={buttonAlignment}
                inline
                type={'checkbox'}
                id={`transit-check`}
                checked={toggleTransit}
                label={'Take Public Transit'}
                onChange={(e) => {
                  setToggleTransit(e.target.checked);
                }}
              />
            </Form>
          </div>
        </div>
      );
    }
  };




  return (
    <>

    {/* if nothing is chosen from the demographics dropdown, display the issues grid which lets users choose */}
      {!currentValue && (
        <IssuesGrid
          type={'demographics'}
          items={Object.values(demographics)}
          currentValue={currentValue}
          setValue={setValue}
          issue_categories={issue_categories}
          showDemographics={showDemographics}
          setDemoToggleText={setDemoToggleText}
          setMapDemographics={setMapDemographics}
        />
      )}


      {/* if a demographics is chosedn from the dropdown */}
      {currentValue && (
        <div
          className={`demographics-container row-gap ${
            showDemographics ? 'expand-demographic' : 'collapse-demographic'
          }`}
          style={{ paddingBottom: isMobile ? '0' : '' }}
        >

          {/* show dropdown */}
          {(!isMobile || (isMobile && showLegend)) && (
            <div className={'dropdown-container'}>
              <div
                className={
                  'dropdown-bar dropdown-bar-black d-flex flex-row justify-content-between align-items-center'
                }
                onMouseDown={() => {
                  setShowDropdownItems(!showDropdownItems);
                }}
              >
                <p className={'mb-0 small-font'}>{demoToggleText}</p>

                {!showDropdownItems && <FontAwesomeIcon icon={faCaretDown} />}
                {showDropdownItems && <FontAwesomeIcon icon={faCaretUp} />}
              </div>

              <div
                className={`${
                  showDropdownItems ? 'd-block' : 'd-none'
                } dropdown-body position-absolute w-100`}
              >
                {Object.keys(demographics).map((key, index) => {
                  return (
                    <div
                      key={index}
                      className={`dropdown-item ${
                        currentValue === key ? 'dropdown-item-active' : ''
                      }`}
                      onMouseDown={() => {
                        setShowDropdownItems(false);
                        setDemoToggleText(demographics[key]);
                        if (currentValue !== key) {
                          setValue(key);
                        } else {
                          setValue(null);
                          setMapDemographics(false);
                          setDemoToggleText('Select an indicator to explore');
                        }
                      }}
                    >
                      <p className={'small-font m-0'}>{demographics[key]}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {currentValue && selectedChapter === 2 && (
            <>
              <Legend
                setShowMap={setShowMap}
                mapDemographics={mapDemographics}
                demoColorRamp={demoColorRamp}
                demoLegendBins={demoLegendBins}
                demographic={currentValue}
                legendBins={demoLegendBins}
                colorRamps={demoColorRamp}
                boundary={boundary}
                dataScale
                setdataScale
                forDemographic={true}
                transitToggles={getTransitToggles()}
                selectedChapter={selectedChapter}
                info={info}
                neighborhoodID={communitySearch}
                toggleWalk={toggleWalk}
                toggleTransit={toggleTransit}
                toggleBike={toggleBike}
                setSelectedChapter={setSelectedChapter}
                // mobile only
                isMobile={isMobile}
                showLegend={showLegend}
              />

              
               {/* Show on map button  */}
              {showMap && (!isMobile || (isMobile && showLegend)) && (
                <div
                  className={`big-button ${
                    mapDemographics
                      ? 'big-button-active'
                      : 'big-button-inactive'
                  }`}
                  onClick={() => {
                    setMapDemographics(!mapDemographics);
                  }}
                >
                  <div>
                    <p className={'mb-0 small-font'}>
                      {mapDemographics ? 'Remove from map' : 'Show on map'}
                    </p>
                  </div>
                  <div>
                    {mapDemographics ? (
                      <FontAwesomeIcon icon={faMinus} />
                    ) : (
                      <FontAwesomeIcon icon={faPlus} />
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {currentValue &&
            communitySearch &&
            !compareSearch &&
            selectedChapter === 3 && (
              <>
                <Legend
                  setShowMap={setShowMap}
                  mapDemographics={mapDemographics}
                  demoColorRamp={demoColorRamp}
                  demoLegendBins={demoLegendBins}
                  demographic={currentValue}
                  legendBins={demoLegendBins}
                  colorRamps={demoColorRamp}
                  boundary={boundary}
                  dataScale
                  setdataScale
                  forDemographic={true}
                  transitToggles={getTransitToggles()}
                  selectedChapter={selectedChapter}
                  info={info}
                  neighborhoodName={
                    (_COUNCILS[communitySearch] &&
                      _COUNCILS[communitySearch].name) ||
                    (_COMMUNITIES[communitySearch] &&
                      _COMMUNITIES[communitySearch].name)
                  }
                  neighborhoodID={communitySearch}
                  toggleWalk={toggleWalk}
                  toggleTransit={toggleTransit}
                  toggleBike={toggleBike}
                  setSelectedChapter={setSelectedChapter}
                  // mobile only
                  isMobile={isMobile}
                  showLegend={showLegend}
                />
                {showMap && (!isMobile || (isMobile && showLegend)) && (
                  <div
                    className={`big-button ${
                      mapDemographics
                        ? 'big-button-active'
                        : 'big-button-inactive'
                    }`}
                    onClick={() => {
                      setMapDemographics(!mapDemographics);
                    }}
                  >
                    <div>
                      <p className={'mb-0 small-font'}>
                        {mapDemographics ? 'Remove from map' : 'Show on map'}
                      </p>
                    </div>
                    <div>
                      {mapDemographics ? (
                        <FontAwesomeIcon icon={faMinus} />
                      ) : (
                        <FontAwesomeIcon icon={faPlus} />
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

          {/* Carousel ver. */}
          {currentValue &&
            communitySearch &&
            compareSearch &&
            selectedChapter === 3 && (
              <div id={'demographic-slider'} style={{ flex: 1 }}>
                <Slider>
                  <div>
                    <Legend
                      setShowMap={setShowMap}
                      mapDemographics={mapDemographics}
                      demoColorRamp={demoColorRamp}
                      demoLegendBins={demoLegendBins}
                      demographic={currentValue}
                      legendBins={demoLegendBins}
                      colorRamps={demoColorRamp}
                      boundary={boundary}
                      dataScale
                      setdataScale
                      forDemographic={true}
                      transitToggles={getTransitToggles()}
                      selectedChapter={selectedChapter}
                      info={info}
                      neighborhoodName={
                        (_COUNCILS[communitySearch] &&
                          _COUNCILS[communitySearch].name) ||
                        (_COMMUNITIES[communitySearch] &&
                          _COMMUNITIES[communitySearch].name)
                      }
                      neighborhoodID={communitySearch}
                      toggleWalk={toggleWalk}
                      toggleTransit={toggleTransit}
                      toggleBike={toggleBike}
                      setSelectedChapter={setSelectedChapter}
                      // mobile only
                      isMobile={isMobile}
                      showLegend={showLegend}
                    />
                  </div>
                  <div>
                    <div
                      className={'d-flex flex-row justify-content-between'}
                    ></div>

                    <Legend
                      setShowMap={setShowMap}
                      mapDemographics={mapDemographics}
                      demoColorRamp={demoColorRamp}
                      demoLegendBins={demoLegendBins}
                      demographic={currentValue}
                      legendBins={demoLegendBins}
                      colorRamps={demoColorRamp}
                      boundary={boundary}
                      dataScale
                      setdataScale
                      forDemographic={true}
                      transitToggles={getTransitToggles()}
                      selectedChapter={selectedChapter}
                      info={info}
                      neighborhoodName={
                        (_COUNCILS[compareSearch] &&
                          _COUNCILS[compareSearch].name) ||
                        (_COMMUNITIES[compareSearch] &&
                          _COMMUNITIES[compareSearch].name)
                      }
                      neighborhoodID={compareSearch}
                      toggleWalk={toggleWalk}
                      toggleTransit={toggleTransit}
                      toggleBike={toggleBike}
                      setSelectedChapter={setSelectedChapter}
                      // mobile only
                      isMobile={isMobile}
                      showLegend={showLegend}
                    />
                  </div>
                </Slider>

                <div
                  className={`big-button ${
                    mapDemographics
                      ? 'big-button-active'
                      : 'big-button-inactive'
                  }`}
                  onClick={() => {
                    setMapDemographics(!mapDemographics);
                  }}
                >
                  <div>
                    <p className={'mb-0 small-font'}>
                      {mapDemographics ? 'Remove from map' : 'Show on map'}
                    </p>
                  </div>
                  <div>
                    {mapDemographics ? (
                      <FontAwesomeIcon icon={faMinus} />
                    ) : (
                      <FontAwesomeIcon icon={faPlus} />
                    )}
                  </div>
                </div>
              </div>
            )}
        </div>
      )}
    </>
  );
}
