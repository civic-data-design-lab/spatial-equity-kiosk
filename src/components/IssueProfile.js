import React, { useState } from 'react';
import categories from '../texts/issue_categories.json';

export default function IssueProfile({ issue, showMap }) {
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
