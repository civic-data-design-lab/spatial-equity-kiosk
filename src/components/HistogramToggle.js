import React, { useState } from 'react';
import { default as _GLOBE_WHITE } from '../img/globe_white.svg';
import { default as _GLOBE_BLACK } from '../img/globe_black.svg';
import { default as _TILE_WHITE } from '../img/tile_white.svg';
import { default as _TILE_BLACK } from '../img/tile_black.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faList } from '@fortawesome/free-solid-svg-icons';

export default function HistogramToggle({
  toggleDisplayMode,
  setToggleDisplayMode,
}) {
  const [hover, setHover] = useState(null);

  return (
    <>
      {hover && (
        <div
          className={'d-inline-block toggle-tooltip'}
          style={{
            position: 'absolute',
            bottom: '4rem',
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
          className={`${
            !toggleDisplayMode ? 'active-tag' : 'inactive-tag'
          } map-toggle`}
          onClick={() => {
            setToggleDisplayMode(false);
          }}
          onMouseEnter={() => {
            setHover(`Show Histogram`);
          }}
          onMouseLeave={() => {
            setHover(null);
          }}
        >
          <FontAwesomeIcon icon={faChartSimple} />
        </div>
        <div
          className={`${
            toggleDisplayMode ? 'active-tag' : 'inactive-tag'
          } map-toggle`}
          onClick={() => {
            setToggleDisplayMode(true);
          }}
          onMouseEnter={() => {
            setHover(`Show List`);
          }}
          onMouseLeave={() => {
            setHover(null);
          }}
        >
          <FontAwesomeIcon icon={faList} />
        </div>
      </div>
    </>
  );
}
