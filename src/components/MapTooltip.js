import _RANKINGS from '../data/rankings.json';
import {
  getBoroughName,
  getTooltipBounds,
  getTransportationModes,
  getNumber,
} from '../utils/functions';

export const TOOLTIP_STYLE = {
  border: '1px solid black',
  background: 'white',
  color: 'black',
  padding: '0px',
  width: '250px',
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
  pickingInfoIndex,
  pickingInfoObject,
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

    const accessor = tooltipProperties ? tooltipProperties : pickingInfoObject;
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
      ? getNumber(accessor[infoTransfer.selectedMetric])
      : '';

    //get boundary ranking
    const ranking = metricCheck.find(
      // Allow string 'x' equal number x
      (t) => t.community_ID == boundaryName
    )?.rank;

    if (!ranking) {
      console.error('Could not find a ranking with this boundary');
      return;
    }

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
        selectedIssue.tooltip_fragment,
      ]
        .join(' ')
        .toLowerCase();
    } else {
      sentenceEnd = selectedIssue.tooltip_fragment;
    }

    return (
      <>
        {boroughName} {tooltipBounds} {boroughData.boundaryNumber} Ranks{' '}
        <strong>
          {ranking}
          {suffix[ranking % 10]} out of {maxRanking}
        </strong>{' '}
        {boundary === 'council' ? 'City Council districts' : 'community boards'}{' '}
        for{' '}
        {typeof selectedSpecificIssue === 'number'
          ? selectedIssue.specific_issue_name
          : ''}{' '}
        {joiningWord} {value}
        {selectedIssue.issue_units_symbol !== ''
          ? selectedIssue.issue_units_symbol
          : ''}
        {selectedIssue.tooltip_fragment == '' ? '' : ' '}
        {sentenceEnd}
      </>
    );
  };

  const getDemographicTooltip = () => {
    const obj = pickingInfoObject;
    const accessor = obj.properties ? obj.properties : obj;

    // boundary name grammatically correct
    const boroughData =
      boundary == 'community'
        ? {
            tooltipBounds: 'Community Board',
            boundaryName: obj.properties.CDTA2020,
            boroughID: obj.properties.CDTA2020.slice(0, 2),
            boundaryNumber: Number(obj.properties.CDTA2020.slice(2)),
          }
        : {
            tooltipBounds: 'City Council District',
            boundaryName: obj.properties.CounDist,
            boroughID: '',
            boundaryNumber: obj.properties.CDTA2020,
          };

    const boroughName =
      boroughData.boroughID == 'MN'
        ? `Manhattan Community Board`
        : boroughData.boroughID == 'BX'
        ? `Bronx Community Board`
        : boroughData.boroughID == 'BK'
        ? `Brooklyn Community Board`
        : boroughData.boroughID == 'QN'
        ? `Queens Community Board`
        : boroughData.boroughID == 'SI'
        ? `Staten Island Community Board`
        : 'City Council District';

    const locationSentence = `${boroughName} ${boroughData.boundaryNumber} `;

    //value for specific metric and boundary
    // const value = accessor[infoTransfer.selectedMetric]
    //   ? getNumber(accessor[infoTransfer.selectedMetric])
    //   : '';

    // const metricCheck = _RANKINGS[boundary][infoTransfer.selectedMetric]
    //   ? true
    //   : false;

    const transportationModes = getTransportationModes(
      transportationModesArray
    );
    // //get boundary ranking
    // const ranking = metricCheck
    //   ? _RANKINGS[boundary][infoTransfer.selectedMetric].find(
    //       (t) => t.community_ID == boroughData.boundaryName
    //     ).rank
    //   : '';

    // //get total number of boundaries
    // const maxRanking = metricCheck
    //   ? _RANKINGS[boundary][infoTransfer.selectedMetric].length
    //   : '';

    // //get term to describe bad condition
    // const hiLowWord = issues.specific_issues_data[selectedSpecificIssue]
    //   .good_or_bad
    //   ? issues.specific_issues_data[selectedSpecificIssue].issue_hi_low[0]
    //   : issues.specific_issues_data[selectedSpecificIssue].issue_hi_low[1];

    // // join sentence with either "at" or "with"
    // const joiningWord =
    //   issues.specific_issues_data[selectedSpecificIssue].json_id == 'F27_BusSpe'
    //     ? 'at'
    //     : 'with';

    const householdsOrCommuters = ['1', '4', '5'].includes(demographic)
      ? 'commuters'
      : 'households';

    const midSentence = `${householdsOrCommuters} in ${locationSentence}`;

    let sentenceEnd = [
      '',
      'Race & Ethnicity',
      'live below the poverty line',
      'do not own a car',
      'drive alone to work',
      '',
    ];

    // return if not (bike walk or transit) or (race and ethnicity)
    if (demographic !== '1' && demographic !== '5') {
      return (
        <div className="map-tooltip-info">
          {getNumber(obj.properties[selectedDemographic])}% of {midSentence}{' '}
          {sentenceEnd[Number(demographic)]}.
        </div>
      );
    }

    // return if (bike walk or transit)
    if (demographic == '5') {
      return (
        <div className="map-tooltip-info">
          {toggleTransit || toggleBike || toggleWalk
            ? `${getNumber(
                obj.properties[selectedDemographic]
              )}% of ${midSentence} ${transportationModes}.`
            : `Check off one of the transportation options above the demographics legend to see how people are getting around.`}
        </div>
      );
    }

    // return if (race and ethnicity)
    if (demographic == '1') {
      return (
        <div className="map-tooltip-info">
          {locationSentence} is—
          <div className="tooltip-grid">
            <div style={{ color: ethnicityColors.Latino.htmlFormat }}>■</div>
            <div>{Math.round(obj.properties.P_Hispanic * 100)}%</div>
            <div>Latino</div>
            <div style={{ color: ethnicityColors.White.htmlFormat }}>■</div>
            <div>{Math.round(obj.properties.P_White * 100)}%</div>
            <div>White</div>
            <div style={{ color: ethnicityColors.Black.htmlFormat }}>■</div>
            <div>{Math.round(obj.properties.P_Black * 100)}%</div>
            <div>Black</div>
            <div style={{ color: ethnicityColors.Asian.htmlFormat }}>■</div>
            <div>{Math.round(obj.properties.P_Asian * 100)}%</div>
            <div>Asian</div>
            <div style={{ color: ethnicityColors.Other.htmlFormat }}>■</div>
            <div>{Math.round(obj.properties.P_Other * 100)}%</div>
            <div>Other</div>
          </div>
        </div>
      );
    }
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
        {getMetricCheck() ? (
          <div className="map-tooltip-info">{getRankingTooltip()}.</div>
        ) : null}

        {selectedDemographic != null ? getDemographicTooltip() : null}
      </>
    );
  };

  return getTooltipJSX();
};

export default MapTooltip;
