import React from "react";
import Toggle from "./Toggle";
import { max, min } from "d3-array";

export default function Legend({
  issues,
  selectedSpecificIssue,
  legendBins,
  colorRamps,
  toggleUnderperformers,
  setToggleUnderperformers,
  boundary,
}) {
  // toggle areas in need
  const handleClick = (event) => {
    setToggleUnderperformers(!toggleUnderperformers);
  };

  const administrativeBoundary =
    boundary === "council" ? "Council Districts" : "Community Boards";

  const impactStatement = issues.specific_issues_data[selectedSpecificIssue]
    ? issues.specific_issues_data[selectedSpecificIssue].highlight_statement
    : "";

  // button statement
  const buttonStatement = `Highlight ${administrativeBoundary} with the ${impactStatement}.`;

  let cleanNumbers = isNaN(legendBins[0])
    ? ""
    : min(legendBins) >= 10
    ? legendBins.map((d) => Math.round(d))
    : legendBins;

  return (
    <>
      {!selectedSpecificIssue ? (
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
      ) : (
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
                color: `rgb(${colorRamps[0].toString()})`,
                fontFamily: "Arial",
              }}
            >
              ■
            </div>
            <div className={"m-0"}>
              {cleanNumbers[0] < 0 ? cleanNumbers[0] : 0}
            </div>
            <div>→</div>
            <div className={"m-0"}>{cleanNumbers[1]}</div>
            <div
              style={{
                color: `rgb(${colorRamps[1].toString()})`,
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
                color: `rgb(${colorRamps[2].toString()})`,
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
                color: `rgb(${colorRamps[3].toString()})`,
                fontFamily: "Arial",
              }}
            >
              ■
            </div>
            <div className={"m-0"}>{cleanNumbers[3]}</div>
            <div>→</div>
            <div className={"m-0"}>{cleanNumbers[4]}</div>
            <div
              style={{
                color: `rgb(${colorRamps[4].toString()})`,
                fontFamily: "Arial",
              }}
            >
              ■
            </div>
            <div className={"m-0"}>{cleanNumbers[4]}+</div>
          </div>

          <Toggle textOff={buttonStatement} textOn={buttonStatement} value={toggleUnderperformers} callback={setToggleUnderperformers}/>


          {/* <div
            className={
              toggleUnderperformers
                ? "boundary-toggle-item-active"
                : "boundary-toggle-item-inactive"
            }
            onClick={handleClick}
          ></div> */}
        </div>
      )}
    </>
  );
}
