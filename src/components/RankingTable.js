import React, { useState } from 'react';
import _CHAPTER_COLORS from '../data/chapter_colors.json';
import _BOROUGH_COLORS from '../data/borough_colors.json';
import _RANKINGS from '../data/rankings.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import rankings from '../data/rankings.json';
import { getNumber } from '../utils/functions';

import _COUNCILDISTRICTS from '../data/council_districts.json';
import _COMMUNITYBOARDS from '../data/community_boards.json';

const RankingTable = ({
  issues,
  boundary,
  selectedSpecificIssue,
  setCommunitySearch,
  setSelectedChapter,
  communitySearch,
  compareSearch,
  toggleDisplayMode,
  defaultOpen = false,
  citywideTab = false,
}) => {
  const [expand, setExpand] = useState(defaultOpen);

  return (
    <div
      style={{ display: !toggleDisplayMode ? 'none' : '' }}
      className={'small-font'}
    >
      <Table bordered>
        <thead style={citywideTab ? { position: 'sticky', top: '-1px' } : {}}>
          <tr>
            <th>Rank</th>
            <th>
              {boundary == 'council' ? 'City Council' : 'Community Board'}
            </th>
            <th>{issues.specific_issues_data[selectedSpecificIssue].units}</th>
          </tr>
        </thead>
        <tbody>
          {/* 01 - JUST FIRST 5 ITEMS */}
          {issues.specific_issues_data[selectedSpecificIssue].good_or_bad === 0
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
                      <td>{getNumber(Number(entry.data))}</td>
                    </tr>
                  );
                })
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
                      <td>
                        {getNumber(Number(entry.data))}
                        {issues.specific_issues_data[selectedSpecificIssue]
                          .json_id === 'F28_Trf_De'
                          ? ' milion'
                          : ''}
                      </td>
                    </tr>
                  );
                })
                .slice(0, 5)}

          {/* 02 - FULL MENU ITEMS */}
          {expand &&
          issues.specific_issues_data[selectedSpecificIssue].good_or_bad === 0
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
                      <td>
                        {getNumber(Number(entry.data))}
                        {issues.specific_issues_data[selectedSpecificIssue]
                          .json_id === 'F28_Trf_De'
                          ? ' milion'
                          : ''}
                      </td>
                    </tr>
                  );
                })
                .slice(5)
            : expand &&
              issues.specific_issues_data[selectedSpecificIssue].good_or_bad ===
                1
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
                      <td>
                        {getNumber(Number(entry.data))}
                        {issues.specific_issues_data[selectedSpecificIssue]
                          .json_id === 'F28_Trf_De'
                          ? ' milion'
                          : ''}
                      </td>
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
