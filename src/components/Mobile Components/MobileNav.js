import ISSUES_CATEGORIES from '../../texts/issue_categories.json';
import BoundaryToggle from '../BoundaryToggle';
import ShareButton from '../ShareButton';
import MapToggle from '../MapToggle';
import MobileFixedHeader from './MobileFixedHeader';

export default function MobileNav({
  setShowMenu,
  showMenu,
  selectedChapter,
  setSelectedChapter,
  boundary,
  setBoundary,
  setCompareSearch,
  setCommunitySearch,
  setSelectedCoord,
  setselectedCompareCoord,
  badSearch,
  setBadSearch,
  showMap,
  setShowMap,
  communitySearch,
  showToggle,
  displayModes,
  setDisplayModes,
  selectedSpecificIssue,

  setUserPoints,
  setMoreIssuesLength,
  setCollapseMap,
  setSearchSource,
  setMoreIssues,
}) {
  return (
    <div
      className={`mobile-nav overflow-hidden height-transition position-absolute`}
      style={{
        height: '100%',
        pointerEvents: showMenu ? 'auto' : 'none',
      }}
    >
      {selectedChapter && (
        <MobileFixedHeader
          selectedChapter={selectedChapter}
          showToggle={showToggle}
          showMap={showMap}
          setShowMap={setShowMap}
          boundary={boundary}
          isMobile={true}
          setShowMenu={setShowMenu}
          showMenu={showMenu}
          communitySearch={communitySearch}
          // toggleDisplayMode={toggleDisplayMode}
          // setToggleDisplayMode={setToggleDisplayMode}
          selectedSpecificIssue={selectedSpecificIssue}
          displayModes={displayModes}
          setDisplayModes={setDisplayModes}
        />
      )}

      <div
        className="height-transition d-flex flex-column overflow-hidden"
        style={{ height: showMenu ? '100%' : '0%' }}
      >
        <BoundaryToggle
          isMobile={true}
          boundary={boundary}
          setBoundary={setBoundary}
          setCompareSearch={setCompareSearch}
          setCommunitySearch={setCommunitySearch}
          setSelectedCoord={setSelectedCoord}
          setselectedCompareCoord={setselectedCompareCoord}
          badSearch={badSearch}
          setBadSearch={setBadSearch}
        />
        {/* chapter 1 */}

        <div
          className={`mobile-nav-chapter
            big-padding ${
              showMenu ? 'grow regular-border border-0' : 'shrink border-none'
            }
            ${selectedChapter === 1 ? 'active-scheme' : 'inactive-scheme'}
            `}
          onClick={() => {
            if (selectedChapter !== 1) {
              setSelectedChapter(1);
              setShowMenu(false);
              setShowMap(false);
            } else {
              setSelectedChapter(null);
              setShowMenu(false);
            }
          }}
        >
          <p
            className={`mb-0 mobile-transition-font ${
              showMenu ? 'small-text opacity-100' : 'small-text opacity-0'
            }`}
          >
            {' '}
            What is{' '}
          </p>
          <p
            className={`mb-0 mobile-transition-font ${
              showMenu ? 'big-text opacity-100' : 'big-text opacity-0'
            }`}
          >
            {' '}
            Spatial Equity NYC{' '}
          </p>
        </div>
        {/* chapter 2 */}
        <div
          className={`mobile-nav-chapter
            big-padding ${
              showMenu ? 'grow regular-border' : 'shrink border-none'
            }
            ${selectedChapter === 2 ? 'active-scheme' : 'inactive-scheme'}`}
          onClick={() => {
            if (selectedChapter !== 2) {
              setSelectedChapter(2);
              setShowMenu(false);
              setUserPoints([], []);
              setMoreIssuesLength(0);
              setMoreIssues([]);
              setCollapseMap(false);
              setSearchSource(null);
              setBadSearch([0, 0]);
              setCommunitySearch(null);
              setCompareSearch(null);
              setShowMap(false);
            } else {
              setSelectedChapter(null);
              setShowMenu(false);
            }
          }}
        >
          <p
            className={`mb-0 mobile-transition-font ${
              showMenu ? 'small-text opacity-100' : 'small-text opacity-0'
            }`}
          >
            {' '}
            Explore Spatial Equity by{' '}
          </p>
          <p
            className={`mb-0 mobile-transition-font ${
              showMenu ? 'big-text opacity-100' : 'big-text opacity-0'
            }`}
          >
            Citywide Data
          </p>
        </div>
        {/* chapter 3 */}
        <div
          className={`mobile-nav-chapter
            big-padding ${
              showMenu ? 'grow regular-border' : 'shrink border-none'
            }
            ${selectedChapter === 3 ? 'active-scheme' : 'inactive-scheme'}`}
          onClick={() => {
            if (selectedChapter !== 3) {
              setSelectedChapter(3);
              setShowMenu(false);
              setShowMap(true);
            } else {
              setSelectedChapter(null);
              setShowMenu(false);
            }
          }}
        >
          <p
            className={`mb-0 mobile-transition-font ${
              showMenu ? 'small-text opacity-100' : 'small-text opacity-0'
            }`}
          >
            {' '}
            Explore Spatial Equity by{' '}
          </p>
          <p
            className={`mb-0 mobile-transition-font ${
              showMenu ? 'big-text opacity-100' : 'big-text opacity-0'
            }`}
          >
            {' '}
            Community Profiles{' '}
          </p>
        </div>
        {/* chapter 4 */}
        <div
          className={`mobile-nav-chapter
            big-padding ${
              showMenu ? 'grow regular-border' : 'shrink border-none'
            }
            ${selectedChapter === 4 ? 'active-scheme' : 'inactive-scheme'}`}
          onClick={() => {
            if (selectedChapter !== 4) {
              setSelectedChapter(4);
              setShowMenu(false);
              setShowMap(false);
            }
          }}
        >
          <p
            className={`mb-0 mobile-transition-font ${
              showMenu ? 'small-text opacity-100' : 'small-text opacity-0'
            }`}
          >
            {' '}
            Learn More &{' '}
          </p>
          <p
            className={`mb-0 mobile-transition-font ${
              showMenu ? 'big-text opacity-100' : 'big-text opacity-0'
            }`}
          >
            {' '}
            Take Action{' '}
          </p>
        </div>
        {/* mobile */}
        <div
          className={`mobile-nav-chapter
            big-padding ${showMenu ? 'regular-border' : 'shrink border-none'}
            active-scheme`}
        ></div>
      </div>
    </div>
  );
}
