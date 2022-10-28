import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faCaretUp,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

import Form from 'react-bootstrap/Form';
import Slider from './Carousel';
import Legend from './Legend';
import IssuesGrid from './IssuesGrid';

import _COUNCILS from '../texts/councildistricts.json';
import _COMMUNITIES from '../texts/communities.json';

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
  const demographics = {
    1: 'Race & Ethnicity',
    2: 'Poverty Level',
    3: 'Vehicle Ownership',
    4: 'Drive Alone to Work',
    5: 'Walk, Bike, or Ride Transit',
  };

  const [showDropdownItems, setShowDropdownItems] = useState(false);
  const [demoToggleText, setDemoToggleText] = useState(
    'Select a demographic to explore'
  );
  const [demographic, setDemographic] = useState(null);

  useEffect(() => {
    if (currentValue) {
      setDemoToggleText(demographics[currentValue]);
    }
  }, []);

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
      {currentValue && (
        <div
          className={`demographics-container row-gap ${
            showDemographics ? 'expand-demographic' : 'collapse-demographic'
          }`}
          style={{ paddingBottom: isMobile ? '0' : '' }}
        >
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
                      demographic={demographic}
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
