import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faList } from '@fortawesome/free-solid-svg-icons';

export default function HistogramToggle({
  toggleDisplayMode,
  setToggleDisplayMode,
  target,
}) {
  const [hover, setHover] = useState(null);

  return (
    <>
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
      <div
        className={`map-toggle-container`}
        style={{
          gridTemplateColumns: '1fr 1fr',
          width: '6em',
          opacity: target ? '1' : '0',
        }}
      >
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
