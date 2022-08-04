import React from "react";

export default function Legend({issues, selectedSpecificIssue}) {
    return (
        <>
            <h5>Data Legend</h5>
            {!selectedSpecificIssue ?
                <div className={"placeholder-legend"}>
                    <div>square</div>
                    <div>Bin 1</div>
                    <div>square</div>
                    <div>Bin 2</div>
                    <div>square</div>
                    <div>Bin 3</div>
                    <div>square</div>
                    <div>Bin 4</div>
                    <div>square</div>
                    <div>Bin 5</div>
                </div> :
                <div>
                    [REAL LEGEND]
                </div>
            }


        </>
    )
}