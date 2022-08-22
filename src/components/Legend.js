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
  dataScale,
  setdataScale,
}) {
  // toggle areas in need

  console.log(legendBins[1]);

  const administrativeBoundary =
    boundary === "council" ? "Council Districts" : "Community Boards";

  const impactStatement = issues.specific_issues_data[selectedSpecificIssue]
    ? issues.specific_issues_data[selectedSpecificIssue].highlight_statement
    : "";

  // button statement
  const buttonStatement = `Highlight ${administrativeBoundary} with the ${impactStatement}.`;
  const buttonStatement2 = dataScale ? `Equal Bins` : "Equal Counts";

  let cleanNumbers = isNaN(legendBins[1][0])
    ? ""
    : min(legendBins[1]) >= 10
    ? legendBins[1].map((d) => Math.round(d))
    : legendBins[1];

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
            <div className={"m-0"}>{legendBins[0] < 0 ? legendBins[0] : 0}</div>
            <div>→</div>
            <div className={"m-0"}>{cleanNumbers[0]}</div>
            <div
              style={{
                color: `rgb(${colorRamps[1].toString()})`,
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
                color: `rgb(${colorRamps[2].toString()})`,
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
                color: `rgb(${colorRamps[3].toString()})`,
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
                color: `rgb(${colorRamps[4].toString()})`,
                fontFamily: "Arial",
              }}
            >
              ■
            </div>
            <div className={"m-0"}>{cleanNumbers[3]}+</div>
          </div>

          <Toggle
            textOff={buttonStatement}
            textOn={buttonStatement}
            value={toggleUnderperformers}
            callback={setToggleUnderperformers}
          />

          {/* <Toggle
            textOff={buttonStatement2}
            textOn={buttonStatement2}
            value={dataScale}
            callback={setdataScale}
          /> */}

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
