import React, { useState } from 'react';
import { default as _GLOBE_WHITE } from '../img/globe_white.svg';
import { default as _GLOBE_BLACK } from '../img/globe_black.svg';
import { default as _TILE_WHITE } from '../img/tile_white.svg';
import { default as _TILE_BLACK } from '../img/tile_black.svg';

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
  toggleDisplayMode,
  setToggleDisplayMode,
  selectedSpecificIssue,

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
        style={{
          gridTemplateColumns:
            selectedChapter == 2 && selectedSpecificIssue
              ? '1fr 1fr 1fr'
              : '1fr 1fr',
          width: selectedChapter == 2 && selectedSpecificIssue ? '9em' : '6em',
        }}
      >
        <div
          className={`${
            !showMap && !toggleDisplayMode ? 'active-tag' : 'inactive-tag'
          } map-toggle`}
          onClick={() => {
            setShowMap(false);
            setToggleDisplayMode(false);
          }}
          onMouseEnter={() => {
            setHover(
              `Chart ${
                boundary === 'council'
                  ? 'council districts'
                  : 'community boards'
              }`
            );
          }}
          onMouseLeave={() => {
            setHover(null);
          }}
        >
          <FontAwesomeIcon icon={faChartSimple} />
        </div>

        {selectedChapter == 2 && selectedSpecificIssue && (
          <div
            className={`${
              !showMap && toggleDisplayMode ? 'active-tag' : 'inactive-tag'
            } map-toggle`}
            onClick={() => {
              setShowMap(false);
              setToggleDisplayMode(true);
            }}
            onMouseEnter={() => {
              setHover(
                `List ${
                  boundary == 'council'
                    ? 'council districts'
                    : 'community boards'
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

        <div
          className={`${showMap ? 'active-tag' : 'inactive-tag'} map-toggle`}
          onClick={() => {
            setShowMap(true);
          }}
          onMouseEnter={() => {
            setHover(
              `Map ${
                boundary == 'council' ? 'council districts' : 'community boards'
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
