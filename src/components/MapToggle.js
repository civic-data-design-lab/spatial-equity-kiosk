import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

import { default as _GLOBE_WHITE } from "../img/globe_white.svg";
import { default as _GLOBE_BLACK } from "../img/globe_black.svg";
import { default as _TILE_WHITE } from "../img/tile_white.svg";
import { default as _TILE_BLACK } from "../img/tile_black.svg";

export default function MapToggle({ showToggle, showMap, setShowMap }) {
  return (
    <div className={`${showToggle ? "" : "d-none"} map-toggle-container`}>
      <div
        className={`${
          !showMap ? "active-tag" : "inactive-tag"
        } map-toggle no-right-border`}
        onClick={() => {
          setShowMap(false);
        }}
      >
        {showMap ? <img src={_TILE_WHITE} /> : <img src={_TILE_BLACK} />}
      </div>
      <div
        className={`${
          showMap ? "active-tag" : "inactive-tag"
        } map-toggle no-left-border`}
        onClick={() => {
          setShowMap(true);
        }}
      >
        {showMap ? <img src={_GLOBE_BLACK} /> : <img src={_GLOBE_WHITE} />}
      </div>
    </div>
  );
}
