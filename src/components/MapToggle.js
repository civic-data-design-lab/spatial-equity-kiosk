import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGlobe,
  faChartSimple,
  faList,
} from '@fortawesome/free-solid-svg-icons';

export default function MapToggle({
  showToggle = false,
  showMap,
  setShowMap,
  boundary,
  showMenu,
  selectedChapter,
  selectedSpecificIssue,
  displayModes = null,
  setDisplayModes = null,

  // mobile only
  isMobile = false,
}) {
  const [hover, setHover] = useState(null);

  // disable map toggle on certain mobile conditions
  const hideMapToggle =
    isMobile && (showMenu || (selectedChapter !== 2 && selectedChapter !== 3))
      ? true
      : false;

  return (
    <>
      {hover && !isMobile && (
        <div
          className={'d-inline-block toggle-tooltip'}
          style={{
            position: 'absolute',
            top: '4rem',
            right: '0.5rem',
            backgroundColor: 'black',
            padding: '0.5rem',
            zIndex: '3',
          }}
        >
          {hover}
        </div>
      )}
      <div
        className={`${showToggle ? '' : 'd-none'} map-toggle-container ${
          hideMapToggle ? 'disabled' : ''
        }`}
        style={
          selectedSpecificIssue && !showMap
            ? {
                gridTemplateColumns: '1fr 1fr 1fr',
                width: '9em',
              }
            : {
                gridTemplateColumns: '1fr 1fr',
                width: '6em',
              }
        }
      >
        {/* enable table */}
        {selectedSpecificIssue && !showMap && (
          <div
            className={`${
              !showMap && displayModes[selectedSpecificIssue]
                ? 'active-tag'
                : 'inactive-tag'
            } map-toggle`}
            onClick={() => {
              setShowMap(false);

              setDisplayModes({
                ...displayModes,
                [selectedSpecificIssue]: true,
              });
            }}
            onMouseEnter={() => {
              setHover(
                `List ${
                  boundary == 'council'
                    ? 'Council Districts'
                    : 'Community Boards'
                }`
              );
            }}
            onMouseLeave={() => {
              setHover(null);
            }}
          >
            <FontAwesomeIcon icon={faList} />
          </div>
        )}

        {/* enable chart */}
        <div
          className={`${
            !showMap && !displayModes[selectedSpecificIssue]
              ? 'active-tag'
              : 'inactive-tag'
          } map-toggle`}
          onClick={() => {
            setShowMap(false);

            setDisplayModes({
              ...displayModes,
              [selectedSpecificIssue]: false,
            });
          }}
          onMouseEnter={() => {
            setHover(
              selectedChapter == 3 && showMap
                ? 'View Community Profile'
                : `Chart ${
                    boundary === 'council'
                      ? 'Council Districts'
                      : 'Community Boards'
                  }`
            );
          }}
          onMouseLeave={() => {
            setHover(null);
          }}
        >
          <FontAwesomeIcon icon={faChartSimple} />
        </div>

        <div
          className={`${showMap ? 'active-tag' : 'inactive-tag'} map-toggle`}
          onClick={() => {
            setShowMap(true);
          }}
          onMouseEnter={() => {
            setHover(
              `Map ${
                boundary == 'council' ? 'Council Districts' : 'Community Boards'
              }`
            );
          }}
          onMouseLeave={() => {
            setHover(null);
          }}
        >
          <FontAwesomeIcon icon={faGlobe} />
        </div>
      </div>
    </>
  );
}
