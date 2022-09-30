import React, { useState } from 'react';
import categories from '../texts/issue_categories.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      return <li style={{ padding: '0.5rem', paddingRight: '0rem', paddingBottom: '0rem' }}>{getHyperlinkText(solution)}</li>;
    });
  };

  return (
    <>
      {!showMap && (
        <div className={'issues-tile-text-container'}>
          <div className={'issues-tile-solutions issues-tile-text'}>
            <h5 className={'d-inline-block bold py-3'}>Solutions</h5>
            <div className="">
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
