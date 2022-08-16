export default function BoundaryToggle({setBoundary, boundary, setCompareSearch, setCommunitySearch}) {


    return (
        <div className={`w-100 boundary-toggle`}>

            <div className={`boundary-toggle-item ${boundary === "council" ? "boundary-toggle-item-active" : "boundary-toggle-item-inactive"} no-right-border small-font`}
                 onClick={(e) => {
                     e.stopPropagation()
                     if (boundary !== "council") {
                         setCommunitySearch(null)
                         setCompareSearch(null)
                     }
                     setBoundary("council")

                 }}
            >Council District</div>

            <div className={`boundary-toggle-item ${boundary === "community" ? "boundary-toggle-item-active" : "boundary-toggle-item-inactive"} no-left-border small-font`}
                 onClick={(e) => {
                     e.stopPropagation()
                     if (boundary !== "community") {
                         setCommunitySearch(null)
                         setCompareSearch(null)
                     }
                     setBoundary("community")
                 }}
            >Community Board</div>
        </div>

    )
}