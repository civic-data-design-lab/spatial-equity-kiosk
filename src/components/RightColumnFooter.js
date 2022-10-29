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
  // toggleDisplayMode,
  // setToggleDisplayMode,
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
            cursor: 'default',
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
                : 'hover-underline'
            }`}
            onClick={() => {
              setUseBoroughColor(!useBoroughColor);
            }}
            style={{ cursor: 'pointer' }}
          >
            {useBoroughColor ? `Hide Borough` : `Show Borough`}{' '}
            <FontAwesomeIcon icon={useBoroughColor ? faMinus : faPlus} />
          </h6>

          <h6
            className={`mb-0 ${isMobile ? 'big-button' : 'hover-underline'}`}
            style={{
              visibility:
                (boundary == 'council' && councilPinned.length > 0) ||
                (boundary == 'community' && communityPinned.length > 0)
                  ? ''
                  : 'hidden',
              border: isMobile ? '2px solid black' : '',
              cursor: 'pointer',
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
