import React from "react";

export default function MapToggle({showToggle, showMap, setShowMap}) {
    return (
        <div className={`${showToggle ? "d-flex" : "d-none"} switch-container flex-row justify-content-between`}>
            <small className={"m-0 pe-none"}>{showMap ? "Hide Map" : "Show Map"}</small>
            <label className="switch">
                <input type="checkbox" checked={showMap}
                       onChange={(e) => {
                           setShowMap(e.target.checked)
                       }}/>
                <span className={`${showMap ? 'active-slider' : ''} slider round`}></span>
            </label>
        </div>
    )
}