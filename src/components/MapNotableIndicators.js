import { useState, useEffect } from 'react';

export default function MapNotableIndicators({
  selectedCommunity,
  councils,
  communitySearch,
  communities,
  setSelectedSpecificIssue,
  issues,
  boundary,
  comparison = false,
  selectedSpecificIssue,
}) {
  const [notableIndicators, setNotableIndicators] = useState(['', '', '']);

  useEffect(() => {
    // get least performing indicies
    if (selectedCommunity) {
      const issueIndex =
        boundary === 'council'
          ? councils[communitySearch]?.least_performing_issues
          : communities[communitySearch]?.least_performing_issues;

      const uniqueIssues = [...new Set(issueIndex.flat())];
      setNotableIndicators(uniqueIssues);
    }
  }, [selectedCommunity]);

  const getBoundaryName = () => {
    const bounds =
      boundary === 'council'
        ? councils[communitySearch]?.name || ''
        : communities[communitySearch]?.name || '';
    return `${bounds}`;
  };

  return (
    <div className="map-notable-indicators">
      <div>
        {getBoundaryName()}
        <br></br>Notable Indicators
      </div>
      {notableIndicators.map((indicatorIndex, index) => (
        <div
          key={index}
          style={
            selectedSpecificIssue == indicatorIndex
              ? { backgroundColor: 'black', color: 'white' }
              : {}
          }
          onClick={() => setSelectedSpecificIssue(indicatorIndex)}
        >
          <span key={indicatorIndex}>
            {
              issues.specific_issues_data[String(indicatorIndex)]
                ?.specific_issue_name
            }
          </span>
          <span style={{ marginLeft: '0.25rem', float: 'right' }}>+</span>
        </div>
      ))}
    </div>
  );
}
