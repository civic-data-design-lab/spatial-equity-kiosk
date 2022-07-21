import React from "react";

export default function MapToggle({showToggle, showMap, setShowMap}) {
    return (
        <div className={`${showToggle ? "d-flex" : "d-none"} switch-container flex-row justify-content-between`}>
            <p>{showMap ? "HIDE MAP" : "SHOW MAP"}</p>
            <label className="switch">
                <input type="checkbox" checked={showMap}
                       onChange={(e) => {
                           setShowMap(e.target.checked)
                       }}/>
                <span className="slider round"></span>
            </label>
        </div>
    )
}