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

export default function Demographics({
  selectedSpecificIssue,
  //  currentValue = null,
  currentValue = null,
  items = null,
  setValue = null,
  showDemographics,
  setShowDemographics,
  compareSearch,
  communitySearch,
  mapDemographics,
  setMapDemographics,
  boundary,
  communities,
  councils,
  selectedChapter,
  toggleWalk,
  toggleTransit,
  toggleBike,
  setToggleWalk,
  setToggleTransit,
  setToggleBike,
  demoLegendBins,
  demoColorRamp,
  setDemoColorRamp,
  setDemoLegendBins,
  demoLookup,
  showMap,
  info,
  issues,
  issue_categories,
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
      return (
        <div className={'transit-toggle'}>
          <div>
            <Form>
              <Form.Check
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
            <Form>
              <Form.Check
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
            <Form>
              <Form.Check
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
          issues={issues}
          issue_categories={issue_categories}
          showDemographics={showDemographics}
          setDemoToggleText={setDemoToggleText}
        />
      )}
      {currentValue && (
        <div
          className={`demographics-container row-gap ${
            showDemographics ? 'expand-demographic' : 'collapse-demographic'
          }`}
        >
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
              } dropdown-body position-absolute`}
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

          {currentValue && selectedChapter === 2 && (
            <>
              <Legend
                mapDemographics={mapDemographics}
                demoColorRamp={demoColorRamp}
                demoLegendBins={demoLegendBins}
                demoLookup={demoLookup}
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
                neighborhoodID={communitySearch}
                toggleWalk={toggleWalk}
                toggleTransit={toggleTransit}
                toggleBike={toggleBike}
              />

              {showMap && (
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
                  mapDemographics={mapDemographics}
                  demoColorRamp={demoColorRamp}
                  demoLegendBins={demoLegendBins}
                  demoLookup={demoLookup}
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
                    (councils[communitySearch] &&
                      councils[communitySearch].name) ||
                    (communities[communitySearch] &&
                      communities[communitySearch].name)
                  }
                  neighborhoodID={communitySearch}
                  toggleWalk={toggleWalk}
                  toggleTransit={toggleTransit}
                  toggleBike={toggleBike}
                />

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
                      mapDemographics={mapDemographics}
                      demoColorRamp={demoColorRamp}
                      demoLegendBins={demoLegendBins}
                      demoLookup={demoLookup}
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
                        (councils[communitySearch] &&
                          councils[communitySearch].name) ||
                        (communities[communitySearch] &&
                          communities[communitySearch].name)
                      }
                      neighborhoodID={communitySearch}
                      toggleWalk={toggleWalk}
                      toggleTransit={toggleTransit}
                      toggleBike={toggleBike}
                    />
                  </div>
                  <div>
                    <div
                      className={'d-flex flex-row justify-content-between'}
                    ></div>

                    <Legend
                      mapDemographics={mapDemographics}
                      demoColorRamp={demoColorRamp}
                      demoLegendBins={demoLegendBins}
                      demoLookup={demoLookup}
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
                        (councils[compareSearch] &&
                          councils[compareSearch].name) ||
                        (communities[compareSearch] &&
                          communities[compareSearch].name)
                      }
                      neighborhoodID={compareSearch}
                      toggleWalk={toggleWalk}
                      toggleTransit={toggleTransit}
                      toggleBike={toggleBike}
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
