import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import categories from '../texts/issue_categories.json';

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

  // console.log('communitySearch ', communitySearch);

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
                alt={''}
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
      return <li style={{ padding: '1rem' }}>{getHyperlinkText(solution)}</li>;
    });
  };

  return (
    <>
      {!showMap && (
        <div className={'issues-tile-text-container'}>
          <div className={'issues-tile-solutions issues-tile-text'}>
            <h5 className={'d-inline-block bold py-3'}>Solutions</h5>
            <div className="small-font">
              {getHyperlinkText(
                issues.specific_issues_data[selectedSpecificIssue]
                  .specific_issue_solutions.base_text
              )}
              <div className={'pb-3'}>{getImages()}</div>

              <ol>{getListSolution()}</ol>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
