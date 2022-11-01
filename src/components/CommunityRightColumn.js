import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import IssueProfile from './IssueProfile';
import RightColumnHeader from './RightColumnHeader';
import { useEffect } from 'react';

import _ISSUES from '../texts/issues.json';

export default function CommunityRightColumn({
  communitySearch,
  selectedSpecificIssue,
  showMap,
}) {
  useEffect(() => {
    if (selectedSpecificIssue) {
      let div = document.getElementById('issue-container');
      if (div) {
        div.scrollBy({
          top: -div.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  }, [selectedSpecificIssue]);

  return (
    <>
      <RightColumnHeader type="solutions" />
      {!selectedSpecificIssue && (
        <div className={'d-flex flex-row h-100 col-gap standard-padding'}>
          <div className={'d-flex flex-row col-gap prompt'}>
            <FontAwesomeIcon icon={faArrowLeft} className={'fa-lg'} />
            <h6 className={'m-0'}>
              Click on a card to learn more about the issue
            </h6>
          </div>
        </div>
      )}

      {selectedSpecificIssue && (
        <div
          className={'issue-container d-flex flex-column'}
          id={'issue-container'}
        >
          {communitySearch && (
            <div className={'issue-writeup'}>
              <IssueProfile
                issue={_ISSUES.specific_issues_data[selectedSpecificIssue]}
                showMap={showMap}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
