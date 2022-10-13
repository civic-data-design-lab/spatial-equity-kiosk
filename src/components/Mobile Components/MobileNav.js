import ISSUES_CATEGORIES from '../../texts/issue_categories.json';
import BoundaryToggle from '../BoundaryToggle';
import ShareButton from '../ShareButton';
import MapToggle from '../MapToggle';

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
}) {
  return (
    <div
      className={`mobile-nav overflow-hidden height-transition position-absolute`}
      style={{
        height: '100%',
        pointerEvents: showMenu ? 'auto' : 'none',
      }}
    >
      {' '}
      {/* fixed header */}
      {selectedChapter && (
        <div className={'mobile-nav-header'}>
          <div>
            <p className={'m-0 small-font'}>
              {selectedChapter === 1
                ? 'What is'
                : selectedChapter < 4
                ? 'Explore Spatial Equity by'
                : 'Learn More'}
            </p>
            <h4 className={'m-0'}>
              {selectedChapter === 1
                ? 'Spatial Equity'
                : selectedChapter === 2
                ? 'Citywide Data'
                : selectedChapter === 3
                ? 'Community Profiles'
                : 'Take Action'}
            </h4>
          </div>
          {!showMenu &&
            (selectedChapter == 2 ||
              (selectedChapter == 3 && communitySearch)) && (
              <MapToggle
                showToggle={true}
                showMap={showMap}
                setShowMap={setShowMap}
                boundary={boundary}
                isMobile={true}
              />
            )}

          <div
            className={`${showMenu ? 'toggle-menu-active' : ''} toggle-menu`}
            onClick={() => setShowMenu(!showMenu)}
          >
            <span
              className={`${
                showMenu ? 'toggle-menu-span-active' : ''
              } toggle-menu-span`}
            ></span>
          </div>
        </div>
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
            Spatial Equity{' '}
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
        >
          <ShareButton isMobile={true} />
        </div>
      </div>
    </div>
  );
}
