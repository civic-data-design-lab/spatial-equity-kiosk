import React, { useState } from 'react';
import categories from '../texts/issue_categories.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function IssueProfile({
  issues,
  selectedSpecificIssue,
  showMap,
}) {
  const getImages = () => {
    const ids = issues.specific_issues_data[selectedSpecificIssue].image_ids;
    if (ids) {
      return (
        <div>
          {ids.map((id, index) => {
            return (
              <img
                key={index}
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
        {texts.map((texts, index) => {
          return (
            <span key={index} className={texts.bolded ? 'bold' : ''}>
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
    ].specific_issue_solutions.solutions_list.map((solution, index) => {
      return (
        <p key={index} style={{ paddingTop: '1rem' }}>
          {getHyperlinkText(solution)}
        </p>
      );
    });
  };

  return (
    <>
      {!showMap && (
        <div className={'issues-tile-text-container'}>
          <div className={'issues-tile-solutions issues-tile-text'}>
            <div className="">
              {getHyperlinkText(
                issues.specific_issues_data[selectedSpecificIssue]
                  .specific_issue_solutions.base_text
              )}
              <div className={''}>{getImages()}</div>
              <div className={'smaller-font'}>
                Image: National Association of City Transportation Officials
              </div>

              <div>{getListSolution()}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
