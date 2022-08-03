import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobe} from "@fortawesome/free-solid-svg-icons";

export default function MapToggle({showToggle, showMap, setShowMap}) {
    return (
        <div className={`${showToggle ? "" : "d-none"} map-toggle-container`}>
            <div className={`${!showMap ? "active-tag" : "inactive-tag"} d-flex flex-row justify-content-center align-items-center black-border map-toggle-transition`}
                 onClick={()=>{setShowMap(false)}}
            >
                <FontAwesomeIcon icon={faGlobe}/>
            </div>
            <div className={`${showMap ? "active-tag" : "inactive-tag"} d-flex flex-row justify-content-center align-items-center black-border map-toggle-transition`}
                onClick={()=>{setShowMap(true)}}
            >
                <FontAwesomeIcon icon={faGlobe}/>
            </div>
        </div>
        /*<div className={`${showToggle ? "d-flex" : "d-none"} switch-container flex-row justify-content-between`}>
            <small className={"m-0 pe-none"}>{showMap ? "Hide Map" : "Show Map"}</small>
            <label className="switch">
                <input type="checkbox" checked={showMap}
                       onChange={(e) => {
                           setShowMap(e.target.checked)
                       }}/>
                <span className={`${showMap ? 'active-slider' : ''} slider round`}></span>
            </label>
        </div>*/
    )
}