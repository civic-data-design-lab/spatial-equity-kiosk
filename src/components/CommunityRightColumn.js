// import React and React Hooks
import React, { useEffect } from 'react';

// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// import components
import IssueProfile from './IssueProfile';
import RightColumnHeader from './RightColumnHeader';

// import data and/or text
import _ISSUES from '../texts/issues.json';

/**
 * CommunityRightColumn.js is responsible for rendering the issue profile if a indicator is selected
 * @constructor
 * @param {string} communitySearch - user's query for community (primary)
 * @param {int} selectedSpecificIssue - integer representing the current actively toggled metric
 * @param {boolean} showMap - if the user is on map view
 *
 */

export default function CommunityRightColumn({
  communitySearch,
  selectedSpecificIssue,
  showMap,
}) {
  // scroll the issue profile back up every time a new one is selected
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

      {/* if there is no indicator selected, prompt the user to select one */}

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

      {/* if there is an indicator selected, render the issue profile */}

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
