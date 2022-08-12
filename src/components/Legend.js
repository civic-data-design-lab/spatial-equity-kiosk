import React from "react";

export default function Legend({ issues, selectedSpecificIssue, legendBins }) {
  // console.log(issues);
  console.log(legendBins);
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
            <div style={{ color: "rgb(248, 198, 220)" }}>■</div>
            <div>0-66</div>
            <div style={{ color: "rgb(244, 151, 192)" }}>■</div>
            <div>66-133</div>
            <div style={{ color: "rgb(237, 109, 159)" }}>■</div>
            <div>133-199</div>
            <div style={{ color: "rgb(230, 87, 149)" }}>■</div>
            <div>199-265</div>
            <div style={{ color: "rgb(233, 50, 128)" }}>■</div>
            <div>265-332</div>
          </div>
        </div>
      )}
    </>
  );
}

{
  /* <div style={{ color: "rgb(248, 198, 220)" }}>■</div>
<div>0-{legendBins[0]}</div>
<div style={{ color: "rgb(244, 151, 192)" }}>■</div>
<div>{legendBins[0]}-{legendBins[1]}</div>
<div style={{ color: "rgb(237, 109, 159)" }}>■</div>
<div>{legendBins[1]}-{legendBins[2]}</div>
<div style={{ color: "rgb(230, 87, 149)" }}>■</div>
<div>{legendBins[2]}-{legendBins[3]}</div>
<div style={{ color: "rgb(233, 50, 128)" }}>■</div>
<div>{legendBins[3]}-{legendBins[4]}</div> */
}
