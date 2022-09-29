import _RANKINGS from '../data/rankings.json';
import {
  getBoroughName,
  getTooltipBounds,
  getTransportationModes,
} from '../utils/functions';

export const TOOLTIP_STYLE = {
  border: '1px solid black',
  background: 'white',
  color: 'black',
  padding: '0px',
  maxWidth: '250px',
};

const MapTooltip = ({
  // v Passed from App.js v
  boundary,
  selectedChapter,
  selectedCoord,
  issues,
  selectedDemographic,
  toggleTransit,
  demographic,
  toggleBike,
  toggleWalk,
  selectedSpecificIssue,
  demoLookup,
  infoTransfer,
  // v State from Map.js v
  transportationModesArray,
  selectedDemoArray,
  ethnicityColors,
  // v Specific props for tooltip v
  pickingInfo,
  tooltipProperties,
}) => {
  const getMetricCheck = () => {
    return _RANKINGS[boundary][infoTransfer.selectedMetric];
  };

  const getBoundaryName = () => {
    if (boundary === 'community') {
      return tooltipProperties.CDTA2020;
    }
    return tooltipProperties.CounDist;
  };

  const getTooltipHeader = () => {
    return (
      <>
        {getTooltipBounds(boundary)} <strong>{getBoundaryName()}</strong>
      </>
    );
  };

  const getRankingTooltip = () => {
    const metricCheck = getMetricCheck();

    if (!metricCheck) {
      return <></>;
    }

    // No need to show ranking if no issue is selected
    if (selectedSpecificIssue === null) {
      return <></>;
    }

    const boundaryName = getBoundaryName();
    const tooltipBounds = getTooltipBounds(boundary);

    const accessor = tooltipProperties
      ? tooltipProperties
      : pickingInfo?.object;
    if (!accessor) {
      console.error('Could not get data accessor for tooltip');
      return;
    }

    // boundary name grammatically correct
    let boroughData = {
      boroughID: '',
      boundaryNumber: boundaryName,
    };
    if (boundary === 'community') {
      boroughData = {
        boroughID: boundaryName.slice(0, 2),
        boundaryNumber: Number(boundaryName.slice(2)),
      };
    }

    const boroughName = getBoroughName(boroughData.boroughID);

    //value for specific metric and boundary
    const value = accessor[infoTransfer.selectedMetric]
      ? accessor[infoTransfer.selectedMetric] >= 10
        ? accessor[infoTransfer.selectedMetric].toFixed(0)
        : accessor[infoTransfer.selectedMetric] >= 1
        ? accessor[infoTransfer.selectedMetric].toFixed(1)
        : accessor[infoTransfer.selectedMetric].toFixed(2)
      : '';

    //get boundary ranking
    const ranking = metricCheck.find(
      // Allow string 'x' equal number x
      (t) => t.community_ID == boundaryName
    ).rank;

    const suffix = {
      0: 'th',
      1: 'st',
      2: 'nd',
      3: 'rd',
      4: 'th',
      5: 'th',
      6: 'th',
      7: 'th',
      8: 'th',
      9: 'th',
    };

    //get total number of boundaries
    const maxRanking = metricCheck.length;

    const selectedIssue = issues.specific_issues_data[selectedSpecificIssue];

    //get term to describe bad condition
    const hiLowWord = selectedIssue.good_or_bad
      ? selectedIssue.issue_hi_low[0]
      : selectedIssue.issue_hi_low[1];

    // join sentence with either "at" or "with"
    const joiningWord = selectedIssue.json_id === 'F27_BusSpe' ? 'at' : 'with';

    // get unit of particular metric
    let sentenceEnd = null;

    if (selectedIssue.json_id === 'F14_TmpDev') {
      sentenceEnd = [
        value > 0 ? 'above' : value === 0 ? '' : 'below',
        selectedIssue.specific_issue_append,
      ]
        .join(' ')
        .toLowerCase();
    } else {
      sentenceEnd = selectedIssue.specific_issue_append;
    }

    return (
      <>
        {boroughName} {tooltipBounds} {boroughData.boundaryNumber} Ranks{' '}
        <strong>
          {ranking}
          {suffix[ranking % 10]} out of {maxRanking}
        </strong>{' '}
        {boundary === 'council' ? 'City Council districts' : 'community boards'}{' '}
        for {hiLowWord}{' '}
        {typeof selectedSpecificIssue === 'number'
          ? selectedIssue.specific_issue_name
          : ''}{' '}
        {joiningWord} {value}
        {selectedIssue.issue_units_symbol !== ''
          ? selectedIssue.issue_units_symbol
          : ''}{' '}
        {sentenceEnd}
      </>
    );
  };

  const getDemographicTooltip = () => {
    if (selectedDemographic === null) {
      return <></>;
    }

    const transportationModes = getTransportationModes(
      transportationModesArray
    );
    return (
      <div className="map-tooltip-info">
        {demographic !== '5'
          ? `${demoLookup[demographic].name}—`
          : toggleTransit || toggleBike || toggleWalk
          ? `Citywide Commuters Who ${transportationModes}—`
          : `Check off one of the transportation options above the demographics legend to see how people are getting around.`}{' '}
        {demographic !== '1' ? (
          demographic !== '5' ? (
            `${tooltipProperties[selectedDemographic].toFixed(0)}%`
          ) : toggleTransit || toggleBike || toggleWalk ? (
            `${selectedDemoArray[pickingInfo.index].toFixed(0)}%`
          ) : (
            ''
          )
        ) : (
          <div className="tooltip-grid">
            <div style={{ color: ethnicityColors.Latino.htmlFormat }}>■</div>
            <div>{Math.round(tooltipProperties.P_Hispanic * 100)}%</div>
            <div>Latino</div>
            <div style={{ color: ethnicityColors.White.htmlFormat }}>■</div>
            <div>{Math.round(tooltipProperties.P_White * 100)}%</div>
            <div>White</div>
            <div style={{ color: ethnicityColors.Black.htmlFormat }}>■</div>
            <div>{Math.round(tooltipProperties.P_Black * 100)}%</div>
            <div>Black</div>
            <div style={{ color: ethnicityColors.Asian.htmlFormat }}>■</div>
            <div>{Math.round(tooltipProperties.P_Asian * 100)}%</div>
            <div>Asian</div>
            <div style={{ color: ethnicityColors.Other.htmlFormat }}>■</div>
            <div>{Math.round(tooltipProperties.P_Other * 100)}%</div>
            <div>Other</div>
          </div>
        )}
      </div>
    );
  };

  const getTooltipJSX = () => {
    if (!tooltipProperties) {
      return <></>;
    }

    if (
      boundary !== 'council' &&
      !(boundary === 'community' && tooltipProperties?.Data_YN === 'Y')
    ) {
      return <></>;
    }

    if (boundary !== 'council' && boundary !== 'community') {
      return <></>;
    }

    return (
      <>
        <div className="map-tooltip-header">{getTooltipHeader()}</div>
        {selectedChapter === 3 &&
        selectedCoord.length === 2 &&
        getMetricCheck() ? (
          <div className="map-tooltip-info">{getRankingTooltip()}.</div>
        ) : null}

        {selectedChapter === 3 &&
        selectedCoord.length === 2 &&
        selectedDemographic != null
          ? getDemographicTooltip()
          : null}
      </>
    );
  };

  return getTooltipJSX();
};

export default MapTooltip;
