import React, { useEffect, useRef, useState } from 'react';
import _CHAPTER_COLORS from '../data/chapter_colors.json';
import _BOROUGH_COLORS from '../data/borough_colors.json';
import _RANKINGS from '../data/rankings.json';
import _COUNCILDISTRICTS from '../texts/councildistricts.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import rankings from '../data/rankings.json';

const RankingTable = ({
  issues,
  boundary,
  selectedSpecificIssue,
  setCommunitySearch,
  setSelectedChapter,
  communitySearch,
  compareSearch,
  toggleDisplayMode,
}) => {
  const [expand, setExpand] = useState(false);


  return (
    <div
      style={{ display: !toggleDisplayMode ? 'none' : '' }}
      className={'small-font'}
    >
      <Table bordered>
        <thead>
          <tr>
            <th>Rank</th>
            <th>
              {boundary == 'council' ? 'City Council' : 'Community Board'}
            </th>
            <th>
              {issues.specific_issues_data[selectedSpecificIssue]
                ?.issue_units_shorthand != ''
                ? issues.specific_issues_data[selectedSpecificIssue]
                    ?.issue_units_shorthand
                : issues.specific_issues_data[selectedSpecificIssue]
                    ?.specific_issue_units}{' '}
              {
                issues.specific_issues_data[selectedSpecificIssue]
                  ?.issue_units_symbol
              }
            </th>
          </tr>
        </thead>
        <tbody>
          {issues.specific_issues_data[selectedSpecificIssue].good_or_bad === 1
            ? rankings[boundary][
                issues.specific_issues_data[selectedSpecificIssue]?.json_id
              ]
                .map((entry, index) => {
                  return (
                    <tr
                      key={index}
                      className={`issues-profile-table-row 
   ${
     entry.community_ID === communitySearch ||
     entry.community_ID === compareSearch
       ? 'active-scheme'
       : ''
   }`}
                    >
                      <td>{entry.rank}</td>
                      <td
                        onClick={() => {
                          setCommunitySearch(entry.community_ID);
                          setSelectedChapter(3);
                        }}
                        className={'issues-profile-community-jump'}
                      >
                        {entry.community}
                      </td>
                      <td>{entry.data}</td>
                    </tr>
                  );
                })
                .reverse()
                .slice(0, 5)
            : rankings[boundary][
                issues.specific_issues_data[selectedSpecificIssue]?.json_id
              ]

                .map((entry, index) => {
                  return (
                    <tr
                      key={index}
                      className={`issues-profile-table-row
     ${
       entry.community_ID === communitySearch ||
       entry.community_ID === compareSearch
         ? 'active-scheme'
         : ''
     }}>
`}
                    >
                      <td>{entry.rank}</td>
                      <td
                        onClick={() => {
                          setCommunitySearch(entry.community_ID);
                          setSelectedChapter(3);
                        }}
                        className={'issues-profile-community-jump'}
                      >
                        {entry.community}
                      </td>
                      <td>{entry.data}</td>
                    </tr>
                  );
                })
                .slice(0, 5)}

          {expand &&
          issues.specific_issues_data[selectedSpecificIssue].good_or_bad === 1
            ? rankings[boundary][
                issues.specific_issues_data[selectedSpecificIssue].json_id
              ]
                .map((entry, index) => {
                  return (
                    <tr
                      key={index}
                      className={`issues-profile-table-row
${
  entry.community_ID === communitySearch || entry.community_ID === compareSearch
    ? 'active-scheme'
    : ''
}

`}
                    >
                      <td>{entry.rank}</td>
                      <td
                        onClick={() => {
                          setCommunitySearch(entry.community_ID);
                          setSelectedChapter(3);
                        }}
                        className={'issues-profile-community-jump'}
                      >
                        {entry.community}
                      </td>
                      <td>{entry.data}</td>
                    </tr>
                  );
                })
                .reverse()
                .slice(5)
            : expand &&
              issues.specific_issues_data[selectedSpecificIssue].good_or_bad ===
                0
            ? rankings[boundary][
                issues.specific_issues_data[selectedSpecificIssue].json_id
              ]
                .map((entry, index) => {
                  return (
                    <tr
                      key={index}
                      className={`issues-profile-table-row
    ${
      entry.community_ID === communitySearch ||
      entry.community_ID === compareSearch
        ? 'active-scheme'
        : ''
    }

`}
                    >
                      <td>{entry.rank}</td>
                      <td
                        onClick={() => {
                          setCommunitySearch(entry.community_ID);
                          setSelectedChapter(3);
                        }}
                        className={'issues-profile-community-jump'}
                      >
                        {entry.community}
                      </td>
                      <td>{entry.data}</td>
                    </tr>
                  );
                })
                .slice(5)
            : null}
        </tbody>
      </Table>
      <div
        className={'d-flex flex-row justify-content-center ranking-button'}
        style={
          expand
            ? {
                borderTop: '1px solid black',
                background: 'white',
                position: 'sticky',
                bottom: '0em',
              }
            : { borderTop: '1px solid black' }
        }
        onClick={() => {
          setExpand(!expand);
        }}
      >
        {expand ? (
          <FontAwesomeIcon icon={faCaretUp} />
        ) : (
          <FontAwesomeIcon icon={faCaretDown} />
        )}
      </div>
    </div>
  );
};

export default RankingTable;
