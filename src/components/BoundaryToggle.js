export default function BoundaryToggle({setBoundary, boundary}) {


    return (
        <div className={`w-100 boundary-toggle`}>
            <div className={`boundary-toggle-item ${boundary === "community" ? "boundary-toggle-item-active" : ""}`}
                 onClick={(e) => {
                     e.stopPropagation()
                     setBoundary("community")
                 }}
            ><small>Community District</small></div>
            <div className={`w-100 boundary-toggle-item ${boundary === "council" ? "boundary-toggle-item-active" : ""}`}
                 onClick={(e) => {
                     e.stopPropagation()
                     setBoundary("council")

                 }}
            ><small>Council District</small></div>
        </div>

    )
}