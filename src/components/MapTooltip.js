import _RANKINGS from '../data/rankings.json';
import {
  getBoroughName,
  getTooltipBounds,
  getTransportationModes,
  getNumber,
  ordinalSuffixOf,
} from '../utils/functions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

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
  exit = false,
  toggleTooltip,
}) => {
  const closePopup = () => {
    toggleTooltip(null);
  };

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
        {exit && (
          <FontAwesomeIcon
            icon={faXmark}
            className={'close-icon'}
            style={{
              display: 'inline-block',
              float: 'right',
              padding: '0 0rem 0 1rem',
              fontSize: '1.5rem',
            }}
            onClick={closePopup}
          />
        )}
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
    const value =
      typeof accessor[infoTransfer.selectedMetric] == 'number'
        ? getNumber(accessor[infoTransfer.selectedMetric])
        : '';

    //get boundary ranking
    const ranking = metricCheck.find(
      // Allow string 'x' equal number x
      (t) => t.community_ID == boundaryName
    )?.rank;

    if (!ranking) {
      console.log('Could not find a ranking with this boundary');
      return;
    }

    //get total number of boundaries
    const maxRanking = metricCheck.length;

    const selectedIssue = issues.specific_issues_data[selectedSpecificIssue];

    if (!selectedIssue) {
      console.log('User unselected the issue.');
      return;
    }

    //get term to describe bad condition
    // const hiLowWord = selectedIssue.good_or_bad
    //   ? selectedIssue.issue_hi_low[0]
    //   : selectedIssue.issue_hi_low[1];

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
          {ordinalSuffixOf(ranking)} out of {maxRanking}
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
        {sentenceEnd}.
        {selectedIssue.methodology_warning != '' && (
          <div className="text-secondary fst-italic fw-light">
            {`* `}
            {selectedIssue.methodology_warning}.
          </div>
        )}
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
            boundaryNumber: obj.properties.CounDist,
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

    const transportationModes = getTransportationModes(
      transportationModesArray
    );

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
      const value = [
        toggleTransit ? obj.properties[['F8_PubTran']] : 0,
        toggleBike ? obj.properties[['F6_bike']] : 0,
        toggleWalk ? obj.properties[['F11_Walk']] : 0,
      ].reduce((a, b) => a + b, 0);
      return (
        <div className="map-tooltip-info">
          {toggleTransit || toggleBike || toggleWalk
            ? `${getNumber(
                value
              )}% of ${midSentence} ${transportationModes.toLowerCase()}.`
            : `Check off one of the transportation options to see how people are getting around.`}
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
          <div className="map-tooltip-info">{getRankingTooltip()}</div>
        ) : null}

        {selectedDemographic != null ? getDemographicTooltip() : null}
      </>
    );
  };

  return getTooltipJSX();
};

export default MapTooltip;
