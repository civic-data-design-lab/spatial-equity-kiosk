import React from "react";

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

  // button statement
  const buttonStatement = toggleUnderperformers
    ? "Hide " + administrativeBoundary + " in need"
    : "Show " + administrativeBoundary + " in need";

  return (
    <>
      {!selectedSpecificIssue ? (
        <div className={"placeholder-legend"}>
          <div>■</div>
          <div>Bin 1</div>
          <div>■</div>
          <div>Bin 2</div>
          <div>■</div>
          <div>Bin 3</div>
          <div>■</div>
          <div>Bin 4</div>
          <div>■</div>
          <div>Bin 5</div>
        </div>
      ) : (
        <div>
          {
            issues.specific_issues_data[selectedSpecificIssue]
              .specific_issue_units
          }
          <div className={"placeholder-legend"}>
            <div style={{ color: "rgb(" + colorRamps[0].toString() + ")" }}>
              ■
            </div>
            <div>0 - {legendBins[0]}</div>
            <div style={{ color: "rgb(" + colorRamps[1].toString() + ")" }}>
              ■
            </div>
            <div>
              {legendBins[0]} - {legendBins[1]}
            </div>
            <div style={{ color: "rgb(" + colorRamps[2].toString() + ")" }}>
              ■
            </div>
            <div>
              {legendBins[1]} - {legendBins[2]}
            </div>
            <div style={{ color: "rgb(" + colorRamps[3].toString() + ")" }}>
              ■
            </div>
            <div>
              {legendBins[2]} - {legendBins[3]}
            </div>
            <div style={{ color: "rgb(" + colorRamps[4].toString() + ")" }}>
              ■
            </div>
            <div>
              {legendBins[3]} - {legendBins[4]}
            </div>
          </div>
          <input
            type="checkbox"
            className="form-check-input"
            onClick={handleClick}
          ></input>
          <a>{buttonStatement}</a>
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
