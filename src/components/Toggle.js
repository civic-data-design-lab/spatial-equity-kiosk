import React from "react";

export default function Toggle({value, callback, textOn, textOff}) {
    return (
        <div className={`d-flex switch-container flex-row col-gap justify-content-between`}>
            <div>
                <p className={"m-0 small-font"}>{value ? textOn : textOff}</p>
            </div>
            <label className="switch">
                <input type="checkbox" checked={value}
                       onChange={(e) => {
                           callback(e.target.checked)
                       }}/>
                <span className={`${value ? 'active-slider' : ''} slider round`}></span>
            </label>
        </div>
    )
}