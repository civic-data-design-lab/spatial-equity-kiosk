import React, { useState } from 'react';
import { default as _GLOBE_WHITE } from '../img/globe_white.svg';
import { default as _GLOBE_BLACK } from '../img/globe_black.svg';
import { default as _TILE_WHITE } from '../img/tile_white.svg';
import { default as _TILE_BLACK } from '../img/tile_black.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartSimple,
  faList,
  faDatabase,
} from '@fortawesome/free-solid-svg-icons';

export default function HistogramToggle({
  showMap = true,
  setShowMap,
  boundary,
  toggleDisplayMode,
  setToggleDisplayMode,
}) {
  const [hover, setHover] = useState(null);

  return (
    <div
      className="d-grid slide"
      style={{
        width: '6rem',
        overflow: 'hidden',
        gridTemplateColumns: 'auto auto',
        alignItems: 'center',
      }}
    >
      {hover && (
        <div
          className={'d-inline-block toggle-tooltip'}
          style={{
            position: 'absolute',
            top: '4rem',
            right: '0.5rem',
            // right: '6.5rem',
            backgroundColor: 'black',
            padding: '0.5rem',
            zIndex: '3',
          }}
        >
          {hover}
        </div>
      )}
      <div className={`map-toggle-container`}>
        <div
          className={`${!showMap ? 'active-tag' : 'inactive-tag'} map-toggle`}
          style={!showMap ? { borderRight: '2px solid black' } : {}}
          onClick={() => {
            // setShowMap(false);
            setToggleDisplayMode(false);
            // switch to histogram here
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
          className={`active-tag map-toggle`}
          style={{ border: '2px solid black' }}
          onClick={() => {
            setToggleDisplayMode(true);
            // setShowMap(true);
            // switch to ranking view here
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
          <FontAwesomeIcon icon={faList} />
        </div>
      </div>
    </div>
  );
}
