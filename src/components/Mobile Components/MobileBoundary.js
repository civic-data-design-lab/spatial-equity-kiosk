import {useEffect, useState} from "react";

export default function MobileBoundary({boundary, setBoundary}) {
    return (
        <div className={`mobile-boundary-toggle`}>
            <div className={`mobile-boundary-item ${boundary === "council" ? "active-scheme" : "inactive-scheme"}`}
                 onClick={()=>{setBoundary("council")}}
            >
                <p className={"mb-0"}> Council District</p>
            </div>
            <div className={`mobile-boundary-item ${boundary === "community" ? "active-scheme" : "inactive-scheme"}`}
                 onClick={()=>{setBoundary("community")}}
            >
                <p className={"mb-0"}> Community Board</p>
            </div>
        </div>
    )
}