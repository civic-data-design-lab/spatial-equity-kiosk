export default function BoundaryToggle({
  isMobile = false,
  setBoundary,
  boundary,
  setCompareSearch,
  setCommunitySearch,
  badSearch,
  setBadSearch,
  setSelectedCoord,
  setselectedCompareCoord,
}) {
  return (
    <div
      className={`${isMobile ? `m-0` : ''} w-100 boundary-toggle`}
      style={{ cursor: 'pointer', flexGrow: isMobile ? '2' : '' }}
    >
      <div
        className={`boundary-toggle-item ${
          boundary === 'council'
            ? 'boundary-toggle-item-active'
            : 'boundary-toggle-item-inactive'
        } no-right-border small-font ${isMobile ? `border-0` : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          if (boundary !== 'council') {
            //setCommunitySearch(null)
            //setCompareSearch(null)
          }
          setBoundary('council');
          if (badSearch[0] || badSearch[1]) {
            setBadSearch([0, 0]);
            if (badSearch[0]) {
              setCommunitySearch(null);
              setSelectedCoord([]);
            }
            if (badSearch[1]) {
              setCompareSearch(null);
              setselectedCompareCoord([]);
            }
          }
        }}
      >
        City Council
      </div>

      <div
        className={`boundary-toggle-item ${
          boundary === 'community'
            ? 'boundary-toggle-item-active'
            : 'boundary-toggle-item-inactive'
        } no-left-border small-font ${isMobile ? `border-0` : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          if (boundary !== 'community') {
            //setCommunitySearch(null)
            //setCompareSearch(null)
          }
          setBoundary('community');
          if (badSearch[0] || badSearch[1]) {
            setBadSearch([0, 0]);
            if (badSearch[0]) {
              setCommunitySearch(null);
              setSelectedCoord([]);
            }
            if (badSearch[1]) {
              setCompareSearch(null);
              setselectedCompareCoord([]);
            }
          }
        }}
      >
        Community Board
      </div>
    </div>
  );
}
