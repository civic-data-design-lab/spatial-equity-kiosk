import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HistogramToggle from './HistogramToggle';
import { faMinus, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function RightColumnFooter({
  boundary,
  useBoroughColor,
  setUseBoroughColor,
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
            gridTemplateColumns: '1fr auto',
            gridGap: '0.5rem',
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
              padding: '0 1.5rem',
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

          {/* <HistogramToggle
            boundary={boundary}
            toggleDisplayMode={toggleDisplayMode}
            setToggleDisplayMode={setToggleDisplayMode}
          /> */}
        </div>
      </div>
    </div>
  );
}
