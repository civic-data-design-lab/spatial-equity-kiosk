export default function BoundaryToggle({
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
    <div className={`w-100 boundary-toggle`} style={{ cursor: "pointer" }}>
      <div
        className={`boundary-toggle-item ${
          boundary === "council"
            ? "boundary-toggle-item-active"
            : "boundary-toggle-item-inactive"
        } no-right-border small-font`}
        onClick={(e) => {
          e.stopPropagation();
          if (boundary !== "council") {
            //setCommunitySearch(null)
            //setCompareSearch(null)
          }
          setBoundary("council");
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
        Council District
      </div>

      <div
        className={`boundary-toggle-item ${
          boundary === "community"
            ? "boundary-toggle-item-active"
            : "boundary-toggle-item-inactive"
        } no-left-border small-font`}
        onClick={(e) => {
          e.stopPropagation();
          if (boundary !== "community") {
            //setCommunitySearch(null)
            //setCompareSearch(null)
          }
          setBoundary("community");
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
