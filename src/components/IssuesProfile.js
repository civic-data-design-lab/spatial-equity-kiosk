import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import categories from '../texts/issue_categories.json';
import rankings from '../data/rankings.json';

export default function IssueProfile({
  issues,
  selectedSpecificIssue,
  rankingProse = false,
  boundary,
  setSelectedSpecificIssue,
  setCommunitySearch,
  setSelectedChapter,
  showMap,
  communitySearch,
  compareSearch,
}) {
  const [expand, setExpand] = useState(false);

  console.log('communitySearch ', communitySearch);

  const getIssueName = () => {
    return (
      issues.specific_issues_data[selectedSpecificIssue].specific_issue_name ||
      null
    );
  };

  const getImages = () => {
    const ids = issues.specific_issues_data[selectedSpecificIssue].image_ids;
    if (ids) {
      return (
        <div>
          {ids.map((id, index) => {
            return (
              <img
                className={`issue-tile-image ${index > 0 ? 'mt-2' : ''}`}
                src={`/${id}`}
                alt={'alt text'}
              />
            );
          })}
        </div>
      );
    }
  };

  const getIssueStatement = () => {
    if (selectedSpecificIssue) {
      let goodOrBad =
        issues.specific_issues_data[selectedSpecificIssue].good_or_bad;

      let attitude =
        issues.specific_issues_data[selectedSpecificIssue].issue_hi_low[
          Number(!goodOrBad)
        ];
      attitude = attitude[0].toUpperCase() + attitude.substr(1);

      const words =
        issues.specific_issues_data[
          selectedSpecificIssue
        ].specific_issue_units_sentence.split(' ');

      const ignoreCapitalization = ['the', 'of', 'an', 'a', 'by'];

      for (let i = 0; i < words.length; i++) {
        if (!ignoreCapitalization.includes(words[i].toLowerCase())) {
          words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        } else {
          words[i] = words[i];
        }
      }

      const sentence = `${attitude} ${words.join(' ')}`;
      return sentence || null;
    }
    return null;
  };

  const getHyperlinkText = (texts) => {
    return (
      <p>
        {texts.map((texts) => {
          return (
            <span className={texts.bolded ? 'bold' : ''}>
              {texts.text}
              {texts.hyperlink && (
                <span
                  className={`${
                    categories.labels[
                      issues.specific_issues_data[selectedSpecificIssue]
                        .issue_type_ID
                    ]
                  }`}
                >
                  <a
                    className={`hyperlink ${
                      categories.labels[
                        issues.specific_issues_data[selectedSpecificIssue]
                          .issue_type_ID
                      ]
                    }`}
                    href={texts.source}
                    target="_blank"
                  >
                    {texts.hyperlink}
                  </a>
                </span>
              )}
            </span>
          );
        })}
      </p>
    );
  };

  const getListSolution = () => {
    return issues.specific_issues_data[
      selectedSpecificIssue
    ].specific_issue_solutions.solutions_list.map((solution) => {
      return <li style={{ padding: '2rem' }}>{getHyperlinkText(solution)}</li>;
    });
  };

  return (
    <>
      {!showMap && (
        <div className={'issues-tile-text-container'}>
          <div className={'issues-tile-ranking issues-tile-text'}>
            <h5
              style={{
                background: 'white',
                position: 'sticky',
                top: '0em',
                borderBottom: '2px solid black',
                marginBottom: '0',
                padding: '0.75em 0',
                width: '100%',
              }}
            >
              {getIssueStatement()} by{' '}
              {boundary == 'council' ? 'Council District' : 'Community Board'}
            </h5>
            <div className={'small-font'}>
              <Table bordered>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>
                      {boundary == 'council'
                        ? 'City Council'
                        : 'Community Board'}
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
                  {/*TODO: populate chart with ranking data*/}
                  {issues.specific_issues_data[selectedSpecificIssue]
                    .good_or_bad === 1
                    ? rankings[boundary][
                        issues.specific_issues_data[selectedSpecificIssue]
                          ?.json_id
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
                        issues.specific_issues_data[selectedSpecificIssue]
                          ?.json_id
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
                  issues.specific_issues_data[selectedSpecificIssue]
                    .good_or_bad === 1
                    ? rankings[boundary][
                        issues.specific_issues_data[selectedSpecificIssue]
                          .json_id
                      ]
                        .map((entry, index) => {
                          return (
                            <tr
                              key={index}
                              className={`issues-profile-table-row
                                                      ${
                                                        entry.community_ID ===
                                                          communitySearch ||
                                                        entry.community_ID ===
                                                          compareSearch
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
                      issues.specific_issues_data[selectedSpecificIssue]
                        .good_or_bad === 0
                    ? rankings[boundary][
                        issues.specific_issues_data[selectedSpecificIssue]
                          .json_id
                      ]
                        .map((entry, index) => {
                          return (
                            <tr
                              key={index}
                              className={`issues-profile-table-row
                                                                                  ${
                                                                                    entry.community_ID ===
                                                                                      communitySearch ||
                                                                                    entry.community_ID ===
                                                                                      compareSearch
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
                className={
                  'd-flex flex-row justify-content-center ranking-button'
                }
                style={
                  expand
                    ? {
                        border: '2px solid black',
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
          </div>

          <div className={'issues-tile-description issues-tile-text'}>
            {/* <div>
                            {getHyperlinkText(
                                issues.specific_issues_data[selectedSpecificIssue]
                                    .specific_issue_description
                            )}
                        </div>
                        <div className={'fst-italic'}>Related: {getRelatedIssues()}</div> */}
          </div>
          <div className={'issues-tile-solutions issues-tile-text'}>
            <h5 className={'issues-tile-heading bold'}>Solutions</h5>
            <div>
              {getHyperlinkText(
                issues.specific_issues_data[selectedSpecificIssue]
                  .specific_issue_solutions.base_text
              )}
              <div>{getImages()}</div>

              <ol>{getListSolution()}</ol>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
