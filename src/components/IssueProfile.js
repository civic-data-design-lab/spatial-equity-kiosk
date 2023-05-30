// import React and React hooks
import React, { useState } from 'react';

// import text and/or data
import categories from '../texts/issue_categories.json';

/**
 * IssueProfile.js correctly formats and displays media and text associated with each indicator.
 * @param {Object} issue - entry from issues.json for the current selected indicator; with media and text info
 * @param {boolean} showMap - if the user is on map view
 */

export default function IssueProfile({ issue, showMap }) {
  // get image
  const getImages = () => {
    const ids = issue.image_ids;
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

  // function for correctly formatting and color-coding text with hyperlinks
  const getHyperlinkText = (texts) => {
    return (
      <p>
        {texts.map((texts, index) => {
          return (
            <span key={index} className={texts.bolded ? 'bold' : ''}>
              {texts.text}
              {texts.hyperlink && (
                <span className={`${categories.labels[issue.issue_type_ID]}`}>
                  <a
                    className={`hyperlink ${
                      categories.labels[issue.issue_type_ID]
                    }`}
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

  // get list of solutions for issue
  const getListSolution = () => {
    return issue.specific_issue_solutions.solutions_list.map(
      (solution, index) => {
        return (
          <div key={index} style={{ paddingTop: '1rem' }}>
            {getHyperlinkText(solution)}
          </div>
        );
      }
    );
  };

  return (
    <>
      {!showMap && (
        <div className={'issues-tile-text-container'}>
          <div className={'issues-tile-solutions issues-tile-text'}>
            <div className="">
              {getHyperlinkText(issue.specific_issue_solutions.base_text)}
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
