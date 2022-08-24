import React from "react";
import {min} from "d3-array";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import _CHAPTER_COLORS from "../data/chapter_colors.json";


export default function Legend({
                                   issues,
                                   demographic,
                                   selectedSpecificIssue,
                                   legendBins,
                                   colorRamps,
                                   toggleUnderperformers,
                                   setToggleUnderperformers,
                                   boundary,
                                   dataScale,
                                   setdataScale, forDemographic = false,

                               }) {
    // toggle areas in need

    const administrativeBoundary =
        boundary === "council" ? "Council Districts" : "Community Boards";

    const getImpactStatement = () => {
        return (issues.specific_issues_data[selectedSpecificIssue]
            ? issues.specific_issues_data[selectedSpecificIssue].highlight_statement
            : "")
    }

    const getButtonStatement = () => {

        return (!toggleUnderperformers ? `Highlight ${administrativeBoundary} with the ${getImpactStatement()}.`
                : `Remove highlights of ${administrativeBoundary} with the ${getImpactStatement()}.`
        )
    }


    // button statement
    const buttonStatement2 = dataScale ? `Equal Bins` : "Equal Counts";

    let cleanNumbers = isNaN(legendBins[1][0])
        ? ""
        : min(legendBins[1]) >= 10
            ? legendBins[1].map((d) => Math.round(d))
            : legendBins[1];



    const getLegend = () => {
        switch (forDemographic) {
            case false:
                if (!selectedSpecificIssue) {
                    return (
                        <div className={"placeholder-legend"}>
                            {/* <div style={{fontFamily: "Arial"}}>■</div>
                                <div className={"m-0"}>Bin 1</div>
                                <div style={{fontFamily: "Arial"}}>■</div>
                                <div className={"m-0"}>Bin 2</div>
                                <div style={{fontFamily: "Arial"}}>■</div>
                                <div className={"m-0"}>Bin 3</div>
                                <div style={{fontFamily: "Arial"}}>■</div>
                                <div className={"m-0"}>Bin 4</div>
                                <div style={{fontFamily: "Arial"}}>■</div>
                                <div className={"m-0"}>Bin 5</div> */}
                        </div>
                    )
                } else {
                    return (
                        <div className={"d-flex flex-column row-gap"}>
                            <div>
                                <p className={"m-0"}>
                                    {
                                        issues.specific_issues_data[selectedSpecificIssue]
                                            .specific_issue_units
                                    }
                                </p>
                                <div className={"placeholder-legend"}>
                                    <div
                                        style={{
                                            color: `rgb(${_CHAPTER_COLORS[colorRamps][0].toString()})`,
                                            fontFamily: "Arial",
                                        }}
                                    >
                                        ■
                                    </div>
                                    <div className={"m-0"}>{legendBins[0] < 0 ? legendBins[0] : 0}</div>
                                    <div>→</div>
                                    <div className={"m-0"}>{cleanNumbers[0]}</div>
                                    <div
                                        style={{
                                            color: `rgb(${_CHAPTER_COLORS[colorRamps][1].toString()})`,
                                            fontFamily: "Arial",
                                        }}
                                    >
                                        ■
                                    </div>
                                    <div className={"m-0"}>{cleanNumbers[0]}</div>
                                    <div>→</div>
                                    <div className={"m-0"}>{cleanNumbers[1]}</div>
                                    <div
                                        style={{
                                            color: `rgb(${_CHAPTER_COLORS[colorRamps][2].toString()})`,
                                            fontFamily: "Arial",
                                        }}
                                    >
                                        ■
                                    </div>
                                    <div className={"m-0"}>{cleanNumbers[1]}</div>
                                    <div>→</div>
                                    <div className={"m-0"}>{cleanNumbers[2]}</div>
                                    <div
                                        style={{
                                            color: `rgb(${_CHAPTER_COLORS[colorRamps][3].toString()})`,
                                            fontFamily: "Arial",
                                        }}
                                    >
                                        ■
                                    </div>
                                    <div className={"m-0"}>{cleanNumbers[2]}</div>
                                    <div>→</div>
                                    <div className={"m-0"}>{cleanNumbers[3]}</div>
                                    <div
                                        style={{
                                            color: `rgb(${_CHAPTER_COLORS[colorRamps][4].toString()})`,
                                            fontFamily: "Arial",
                                        }}
                                    >
                                        ■
                                    </div>
                                    <div className={"m-0"}>{cleanNumbers[3]}+</div>
                                </div>
                            </div>


                            <div
                                className={`big-button ${toggleUnderperformers ? "big-button-active" : "big-button-inactive"}`}
                                onClick={() => {
                                    setToggleUnderperformers(!toggleUnderperformers)
                                }}
                            >{getButtonStatement()}

                                <div>{toggleUnderperformers ? <FontAwesomeIcon icon={faMinus}/> :
                                    <FontAwesomeIcon icon={faPlus}/>}</div>
                            </div>
                        </div>

                    )

                }
            case true:

                //TODO: create legend for demographics here
                return (
                    <div>
                        <p>HIII</p>
                    </div>
                )


        }

    }

    return (
        <>
            {getLegend()}
        </>
    );
}
