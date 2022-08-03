import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobe} from "@fortawesome/free-solid-svg-icons";

export default function MapToggle({showToggle, showMap, setShowMap}) {
    return (
        <div className={`${showToggle ? "" : "d-none"} map-toggle-container`}>
            <div
                className={`${!showMap ? "active-tag" : "inactive-tag"} map-toggle no-right-border`}
                onClick={() => {
                    setShowMap(false)
                }}
            >
                <FontAwesomeIcon icon={faGlobe}/>
            </div>
            <div
                className={`${showMap ? "active-tag" : "inactive-tag"} map-toggle no-left-border`}
                onClick={() => {
                    setShowMap(true)
                }}
            >
                <FontAwesomeIcon icon={faGlobe}/>
            </div>
        </div>
    )
}