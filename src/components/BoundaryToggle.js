/**
 * BoundaryToggle.js renders the UI component that allows the user to toggle
 * between city council and communit board admministrative boundaries.
 * @constructor
 * @param {boolean} isMobile - whether to display the mobile or web version, based on inner width and inner height of screen.
 * @param {Function} setBoundary - callback function to set the boundary state of the app.
 * @param {string} boundary - string representing the toggled active boundary (either 'council' or 'community').
 * @param {Function} setCompareSearch - callback function to set the compare search query of the app.
 * @param {Function} setCommunitySearch - callback function to set the community search query of the app.
 * @param {} badSearch - TODO!!!!!!!
 * @param {} setBadSearch - TODO!!!!!!
 * @param {Function} setSelectedCoord - 
 * @param {Function} setselectedCompareCoord -
 */

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
      {/* CITY COUNCIL BUTTON */}
      <div
        className={`boundary-toggle-item ${
          boundary === 'council'
            ? 'boundary-toggle-item-active'
            : 'boundary-toggle-item-inactive'
        } no-right-border small-font ${isMobile ? `border-0` : ''}`}
        onClick={(e) => {
          e.stopPropagation();

          // set app's boundary state appropriately
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

      {/* COMMUNITY BOARD BUTTON */}
      <div
        className={`boundary-toggle-item ${
          boundary === 'community'
            ? 'boundary-toggle-item-active'
            : 'boundary-toggle-item-inactive'
        } no-left-border small-font ${isMobile ? `border-0` : ''}`}
        onClick={(e) => {
          e.stopPropagation();

          // set app's boundary state appropriately
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
