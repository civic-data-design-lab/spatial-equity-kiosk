import { useState, useEffect } from 'react';
import _ISSUES from '../texts/issues.json';

export default function MapNotableIndicators({
  selectedCommunity,
  communitySearch,
  councilData,
  communityData,
  setSelectedSpecificIssue,
  boundary,
  selectedSpecificIssue,
  isMobile = false,
  showNotableTray,
}) {
  const [notableIndicators, setNotableIndicators] = useState(['', '', '']);

  useEffect(() => {
    // get least performing indicies
    if (selectedCommunity) {
      const issueIndex =
        boundary === 'council'
          ? councilData?.least_performing_issues
          : communityData?.least_performing_issues;

      if (!issueIndex) {
        setNotableIndicators(['', '', '']);
        return;
      }

      const uniqueIssues = [...new Set(issueIndex.flat())];
      setNotableIndicators(uniqueIssues);
    }
  }, [selectedCommunity]);

  const getBoundaryName = () => {
    const bounds =
      boundary === 'council'
        ? councilData?.name || ''
        : communityData?.name || '';
    return `${bounds}`;
  };

  return (
    <div
      className="height-transition overflow-hidden"
      style={
        isMobile
          ? {
              maxHeight: showNotableTray && communitySearch ? '20vh' : '0vh',
              paddingBottom: '0.5rem',
            }
          : { paddingBottom: '0.5rem' }
      }
    >
      <div
        className={isMobile ? 'small-font' : ''}
        style={{
          backgroundColor: isMobile ? 'white' : 'black',
          color: isMobile ? 'black' : 'white',
          padding: isMobile ? '0.25rem 1rem' : '0.25rem 0.5rem',
        }}
      >
        {!isMobile ? getBoundaryName() : ''} {!isMobile ? <br></br> : ''}Notable
        Indicators
      </div>
      <div
        className="map-notable-indicators"
        style={{ margin: isMobile ? '0 1rem' : '0' }}
      >
        {notableIndicators.map((indicatorIndex, index) => (
          <div
            key={index}
            style={
              selectedSpecificIssue == indicatorIndex
                ? {
                    backgroundColor: 'black',
                    color: 'white',
                  }
                : {}
            }
            onClick={() => setSelectedSpecificIssue(indicatorIndex)}
          >
            {
              _ISSUES.specific_issues_data[String(indicatorIndex)]
                ?.specific_issue_name
            }
          </div>
        ))}
      </div>
    </div>
  );
}
