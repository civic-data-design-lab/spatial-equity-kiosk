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

  isMobile,
  citywideTab,
}) {
  return (
    <div className="py-0">
      <div
        className={`${
          isMobile && citywideTab
            ? 'issues-chapters-inactive'
            : 'issues-chapters issues-chapters-active collapse-issue top-border'
        } transition-height`}
      >
        <div
          className="position-relative d-grid "
          style={{
            gridTemplateColumns: '1fr 1fr',
            gridGap: '0.5rem',
            alignItems: 'center',
          }}
        >
          <h6
            className={`mb-0 ${
              isMobile
                ? `big-button ${
                    useBoroughColor
                      ? 'big-button-active'
                      : 'big-button-inactive'
                  }`
                : ''
            }`}
            onClick={() => {
              setUseBoroughColor(!useBoroughColor);
            }}
            style={{
              visibility: !toggleDisplayMode ? 'visible' : 'hidden',
            }}
          >
            {useBoroughColor ? `Hide Borough` : `Show Borough`}{' '}
            <FontAwesomeIcon icon={useBoroughColor ? faMinus : faPlus} />
          </h6>

          <h6
            className={`mb-0 ${isMobile ? 'big-button' : ''}`}
            style={{
              // padding: '0 1.5rem',
              visibility:
                (!toggleDisplayMode &&
                  boundary == 'council' &&
                  councilPinned.length > 0) ||
                (!toggleDisplayMode &&
                  boundary == 'community' &&
                  communityPinned.length > 0)
                  ? ''
                  : 'hidden',
              border: isMobile ? '2px solid black' : '',
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
        </div>
      </div>
    </div>
  );
}
