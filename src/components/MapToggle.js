import React, { useState } from 'react';
import { default as _GLOBE_WHITE } from '../img/globe_white.svg';
import { default as _GLOBE_BLACK } from '../img/globe_black.svg';
import { default as _TILE_WHITE } from '../img/tile_white.svg';
import { default as _TILE_BLACK } from '../img/tile_black.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMap,
  faChartSimple,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';

export default function MapToggle({
  showToggle,
  showMap,
  setShowMap,
  boundary,
}) {
  const [hover, setHover] = useState(null);

  return (
    <div>
      {hover && (
        <div
          className={'position-absolute'}
          style={{
            bottom: '3rem',
            fontSize: '0.75rem',
            backgroundColor: 'white',
            border: '2px solid black',
            color: 'black',
            padding: '0.25em 0.5em',
            width: 'fit-content',
            right: '0rem',
            pointerEvents: 'none',
          }}
        >
          {hover}
        </div>
      )}
      <div className={`${showToggle ? '' : 'd-none'} map-toggle-container`}>
        <div
          className={`${!showMap ? 'active-tag' : 'inactive-tag'} map-toggle`}
          style={!showMap ? { borderRight: '2px solid black' } : {}}
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
          <FontAwesomeIcon icon={faChartSimple} />
        </div>
        <div
          className={`${showMap ? 'active-tag' : 'inactive-tag'} map-toggle`}
          style={showMap ? { borderLeft: '2px solid black' } : {}}
          onClick={() => {
            setShowMap(true);
          }}
          onMouseEnter={() => {
            setHover(
              `Map ${
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
          <FontAwesomeIcon icon={faGlobe} />
        </div>
      </div>
    </div>
  );
}
