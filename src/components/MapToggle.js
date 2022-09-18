import React, {useState} from "react";
import {default as _GLOBE_WHITE} from "../img/globe_white.svg";
import {default as _GLOBE_BLACK} from "../img/globe_black.svg";
import {default as _TILE_WHITE} from "../img/tile_white.svg";
import {default as _TILE_BLACK} from "../img/tile_black.svg";

export default function MapToggle({showToggle, showMap, setShowMap, boundary}) {

    const [hover, setHover] = useState(null)


    return (
        <div>
            {hover &&
                <div className={"position-absolute"}
                     style={{
                         bottom: "3rem",
                         fontSize: "0.75rem",
                         backgroundColor: "white",
                         border: "1px solid black",
                         color: "black",
                         padding: "0.5rem 1rem",
                         width:"fit-content",
                         right: "0.5rem"
                     }}
                >{hover}</div>}
            <div className={`${showToggle ? "" : "d-none"} map-toggle-container`}>
                <div
                    className={`${
                        !showMap ? "active-tag" : "inactive-tag"
                    } map-toggle no-right-border`}
                    onClick={() => {
                        setShowMap(false);
                    }}
                    onMouseEnter={()=>{setHover(`Rank ${boundary==="council"? "council districts" : "community boards"}`)}}
                    onMouseLeave={()=>{setHover(null)}}
                >
                    {showMap ? <img src={_TILE_WHITE}/> : <img src={_TILE_BLACK}/>}
                </div>
                <div
                    className={`${
                        showMap ? "active-tag" : "inactive-tag"
                    } map-toggle no-left-border`}
                    onClick={() => {
                        setShowMap(true);
                    }}
                    onMouseEnter={()=>{setHover(`Map ${boundary==="council"? "council districts" : "community boards"}`)}}
                    onMouseLeave={()=>{setHover(null)}}
                >
                    {showMap ? <img src={_GLOBE_BLACK}/> : <img src={_GLOBE_WHITE}/>}
                </div>
            </div>
        </div>
    );
}
