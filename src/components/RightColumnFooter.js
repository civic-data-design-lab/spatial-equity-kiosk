import { useState } from 'react';
import SourceInfo from './SourceInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HistogramToggle from './HistogramToggle';
import {
  faMinus,
  faPlus,
  faXmark,
  faCaretDown,
  faCaretUp,
} from '@fortawesome/free-solid-svg-icons';

export default function RightColumnHeaders({
  boundary,
  issues = null,
  target = true,
  selectedSpecificIssue = null,
  setSelectedChapter = null,
  setSelectedSpecificIssue = null,
  setMoreIssues = null,

  forMoreIssues = false,
  moreIssues = null,
  useBoroughColor,
  setUseBoroughColor,
  isHovering,
  setIsHovering,
  councilPinned,
  setCouncilPinned,
  communityPinned,
  setCommunityPinned,
  toggleDisplayMode,
  setToggleDisplayMode,
}) {
  //   console.log(issues.specific_issues_data[selectedSpecificIssue] || null);

  return (
    <div className={''}>
      <div
        className={`${'issues-chapters-active'} collapse-issue issues-chapters top-border transition-height`}
      >
        <div
          className="position-relative d-grid "
          style={{
            gridTemplateColumns: '1fr 1fr auto',
            gridGap: '0.33rem',
            alignItems: 'center',
          }}
        >
          <h6
            className="mb-0 chart-footer"
            onClick={() => {
              setUseBoroughColor(!useBoroughColor);
            }}
            style={{ visibility: !toggleDisplayMode ? 'visible' : 'hidden' }}
          >
            {useBoroughColor ? `Hide Borough` : `Show Borough`}{' '}
            <FontAwesomeIcon icon={useBoroughColor ? faMinus : faPlus} />
          </h6>

          <h6
            className="mb-0 chart-footer"
            style={{
              visibility:
                (!toggleDisplayMode &&
                  boundary == 'council' &&
                  councilPinned.length > 0) ||
                (!toggleDisplayMode &&
                  boundary == 'community' &&
                  communityPinned.length > 0)
                  ? ''
                  : 'hidden',
            }}
            onClick={() => {
              if (boundary == 'council') {
                setCouncilPinned([]);
              } else {
                setCommunityPinned([]);
              }
            }}
          >
            Clear Pins <FontAwesomeIcon icon={faXmark} />
          </h6>

          {/* <div className={`d-flex switch-container flex-row `}>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={toggleDisplayMode}
                  onChange={(e) => {
                    setToggleDisplayMode(!toggleDisplayMode);
                  }}
                />
                <span className="slider round"></span>
              </label>

              <p
                className={'small-font d-inline-block big-button m-0'}
                style={{ whiteSpace: 'nowrap' }}
              >
                {toggleDisplayMode ? `Show Histogram` : `Show List`}
              </p>
            </div> */}

          <HistogramToggle
            boundary={boundary}
            toggleDisplayMode={toggleDisplayMode}
            setToggleDisplayMode={setToggleDisplayMode}
          />

          {/* {!toggleDisplayMode && (
              <div>
                <div
                  className={`big-button ${
                    useBoroughColor
                      ? 'big-button-active'
                      : 'big-button-inactive'
                  } small-font`}
                  style={{
                    display: 'inline-block',
                    justifyContent: '',
                    width: 'auto',
                    whiteSpace: 'nowrap',
                  }}
                  onClick={() => {
                    setUseBoroughColor(!useBoroughColor);
                  }}
                >
                  {useBoroughColor ? `Hide Borough ` : `Show Borough `}
                  {useBoroughColor ? (
                    <FontAwesomeIcon icon={faMinus} />
                  ) : (
                    <FontAwesomeIcon icon={faPlus} />
                  )}
                </div>
              </div>
            )} */}

          {/* <div>
              <div
                className={`big-button ${
                  isHovering ? 'big-button-active' : 'big-button-inactive'
                } small-font`}
                style={{
                  justifyContent: '',
                  width: 'auto',
                  visibility:
                    (!toggleDisplayMode &&
                      boundary == 'council' &&
                      councilPinned.length > 0) ||
                    (!toggleDisplayMode &&
                      boundary == 'community' &&
                      communityPinned.length > 0)
                      ? ''
                      : 'hidden',
                }}
                onMouseOver={() => {
                  setIsHovering(true);
                }}
                onMouseLeave={() => {
                  setIsHovering(false);
                }}
                onClick={() => {
                  if (boundary == 'council') {
                    setCouncilPinned([]);
                  } else {
                    setCommunityPinned([]);
                  }
                }}
              >
                Clear All <FontAwesomeIcon icon={faXmark} />
              </div>
            </div> */}
        </div>
      </div>
    </div>
  );
}
