import React, { useState } from 'react';
import { default as _GLOBE_WHITE } from '../img/globe_white.svg';
import { default as _GLOBE_BLACK } from '../img/globe_black.svg';
import { default as _TILE_WHITE } from '../img/tile_white.svg';
import { default as _TILE_BLACK } from '../img/tile_black.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faGlobe } from '@fortawesome/free-solid-svg-icons';

export default function MapToggle({
  showToggle = false,
  showMap,
  setShowMap,
  boundary,

  // mobile only
  isMobile = false,
}) {
  const [hover, setHover] = useState(null);

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
      <div className={`${showToggle ? '' : 'd-none'} map-toggle-container`}>
        <div
          className={`${!showMap ? 'active-tag' : 'inactive-tag'} map-toggle`}
          onClick={() => {
            setShowMap(false);
          }}
          onMouseEnter={() => {
            setHover(
              `Rank ${
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
          <FontAwesomeIcon icon={faDatabase} />
        </div>
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
