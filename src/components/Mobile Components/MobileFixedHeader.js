import MapToggle from '../MapToggle';

export default function MobileFixedHeader({
  selectedChapter,
  showToggle,
  showMap,
  setShowMap,
  boundary,
  isMobile,
  setShowMenu,
  showMenu,
  communitySearch,
  selectedSpecificIssue,
  displayModes,
  setDisplayModes,
}) {
  return (
    <div
      className={'mobile-nav-header'}
      style={{ height: [4,1].includes(selectedChapter) ? '4rem' : '' }}
    >
      <div>
        <h4 className={'m-0'}>
          {selectedChapter === 1
            ? 'Spatial Equity NYC'
            : selectedChapter === 2
            ? 'Citywide Data'
            : selectedChapter === 3
            ? 'Community Profiles'
            : 'Take Action'}
        </h4>
      </div>

      <MapToggle
        showToggle={showToggle}
        showMap={showMap}
        setShowMap={setShowMap}
        boundary={boundary}
        isMobile={isMobile}
        showMenu={showMenu}
        communitySearch={communitySearch}
        selectedChapter={selectedChapter}
        // toggleDisplayMode={toggleDisplayMode}
        // setToggleDisplayMode={setToggleDisplayMode}
        selectedSpecificIssue={selectedSpecificIssue}
        displayModes={displayModes}
        setDisplayModes={setDisplayModes}
      
      />

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
  );
}
