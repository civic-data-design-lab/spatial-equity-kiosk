import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import IssueProfile from './IssuesProfile';
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
      <div className={'d-flex flex-column position-relative'}>
        <div
          className={`${'issues-chapters-active'} collapse-issue issues-chapters top-border transition-height`}
          style={{
            height: communitySearch ? 'auto' : '0',
          }}
        >
          <div
            className="position-relative d-grid "
            style={{
              gridTemplateColumns: '1fr auto',
              gridGap: '0.33rem',
              alignItems: 'center',
              borderLeft: '1px solid white',
            }}
          >
            <h5 className="mb-0">Solutions</h5>
          </div>
        </div>
      </div>

      {!selectedSpecificIssue && (
        <div className={'d-flex flex-row h-100 col-gap standard-padding'}>
          <div className={'d-flex flex-row col-gap prompt'}>
            <FontAwesomeIcon icon={faArrowLeft} className={'fa-lg'} />
            <h5 className={'m-0'}>
              Click on a card to learn more about the issue
            </h5>
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
