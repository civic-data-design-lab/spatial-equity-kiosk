import React, {useEffect, useState} from "react";

export default function AboutMiddleColumn({setSelectedAbout, selectedAbout}) {
    return(
        <div className={"d-flex flex-column h-100"}>
            <div className={`${selectedAbout===1 ? "about-chapters-active" : ""} about-chapters`}
                 onClick={()=>{
                     if (selectedAbout === 1) {
                         setSelectedAbout(null)
                     } else {
                         setSelectedAbout(1)
                     }
                 }}
            >
                <h5>NYC Spatial Equity Tool</h5>
            </div>

            <div className={`${selectedAbout===2 ? "about-chapters-active" : ""} about-chapters`}
                 onClick={()=>{
                     if (selectedAbout === 2) {
                         setSelectedAbout(null)
                     } else {
                         setSelectedAbout(2)
                     }
                 }}
            >
                <h5>About the Data</h5>
            </div>

            <div className={`${selectedAbout===3 ? "about-chapters-active" : ""} about-chapters`}
                 onClick={()=>{
                     if (selectedAbout === 3) {
                         setSelectedAbout(null)
                     } else {
                         setSelectedAbout(3)
                     }
                 }}
            >
                <h5>Take Action</h5>
            </div>

            <div className={`${selectedAbout===4 ? "about-chapters-active" : ""} about-chapters`}
                 onClick={()=>{
                     if (selectedAbout === 4) {
                         setSelectedAbout(null)
                     } else {
                         setSelectedAbout(4)
                     }
                 }}
            >
                <h5>Credits</h5>
            </div>
        </div>
    )
}