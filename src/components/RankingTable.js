import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import rankings from '../data/rankings.json';
import { getNumber } from '../utils/functions';
import RightColumnHeader from './RightColumnHeader';

const RankingTable = ({
  issues,
  boundary,
  specificIssue,
  selectedSpecificIssue,
  setCommunitySearch,
  setCompareSearch,
  setSelectedChapter,
  communitySearch,
  compareSearch,
  expanded = false,
  citywideTab = false,
  addCompare = false,
  displayModes = null,
  target = null,
  isMobile = false,
}) => {
  const [expand, setExpand] = useState(expanded);

  return (
    <div
      style={{
        display:
          displayModes && displayModes[selectedSpecificIssue] == true
            ? ''
            : 'none',
      }}
      className={'small-font'}
    >
      <Table bordered>
        <thead>
          <tr>
            <th>Rank</th>
            <th>
              {boundary == 'council' ? 'City Council' : 'Community Board'}
            </th>
            <th>{specificIssue.units}</th>
          </tr>
        </thead>
        <tbody>
          {/* 01 - JUST FIRST 5 ITEMS */}
          {specificIssue.good_or_bad === 0 && !citywideTab
            ? rankings[boundary][specificIssue?.json_id]
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
                          if (!addCompare) {
                            setCommunitySearch(entry.community_ID);
                          } else {
                            setCompareSearch(entry.community_ID);
                          }
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
                .reverse()
                .slice(0, 5)
            : rankings[boundary][specificIssue?.json_id]

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
                          if (!addCompare) {
                            setCommunitySearch(entry.community_ID);
                          } else {
                            setCompareSearch(entry.community_ID);
                          }
                          setSelectedChapter(3);
                        }}
                        className={'issues-profile-community-jump'}
                      >
                        {entry.community}
                      </td>
                      <td>
                        {getNumber(Number(entry.data))}
                        {specificIssue.json_id === 'F28_Trf_De'
                          ? ' milion'
                          : ''}
                      </td>
                    </tr>
                  );
                })
                .slice(0, 5)}

          {/* 02 - FULL MENU ITEMS */}
          {expand && target && specificIssue.good_or_bad === 0 && !citywideTab
            ? rankings[boundary][specificIssue.json_id]
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
                          if (!addCompare) {
                            setCommunitySearch(entry.community_ID);
                          } else {
                            setCompareSearch(entry.community_ID);
                          }
                          setSelectedChapter(3);
                        }}
                        className={'issues-profile-community-jump'}
                      >
                        {entry.community}
                      </td>
                      <td>
                        {getNumber(Number(entry.data))}
                        {specificIssue.json_id === 'F28_Trf_De'
                          ? ' milion'
                          : ''}
                      </td>
                    </tr>
                  );
                })
                .reverse()
                .slice(5)
            : expand && (specificIssue.good_or_bad === 1 || citywideTab)
            ? rankings[boundary][specificIssue.json_id]
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
                        {specificIssue.json_id === 'F28_Trf_De'
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

      {(!citywideTab || isMobile) && (
        <div
          style={
            expand
              ? {
                  borderTop: '2px solid black',
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
          {(target || (citywideTab && isMobile)) && (
            <RightColumnHeader
              type={'collapse'}
              expand={expand}
              isMobile={isMobile}
              citywideTab={citywideTab}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default RankingTable;
