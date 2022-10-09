import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import IssueProfile from './IssuesProfile';
import RightColumnHeader from './RightColumnHeader';
import { useEffect } from 'react';

export default function CommunityRightColumn({
  communitySearch,
  compareSearch,
  selectedSpecificIssue,
  issues,
  showMap,
  setShowMap,
  showToggle,
  selectedIssue,
  selectedChapter,
  boundary,
  demographic,
  showDemographics,
  setMoreIssues,
  moreIssuesLength,
  moreIssues,
  setMoreIssuesLength,
  setSelectedSpecificIssue,
  setSelectedChapter,
  setCommunitySearch,
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
                issues={issues}
                selectedSpecificIssue={selectedSpecificIssue}
                rankingProse={true}
                boundary={boundary}
                setSelectedSpecificIssue={setSelectedSpecificIssue}
                setSelectedChapter={setSelectedChapter}
                setCommunitySearch={setCommunitySearch}
                showMap={showMap}
                compareSearch={compareSearch}
                communitySearch={communitySearch}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
