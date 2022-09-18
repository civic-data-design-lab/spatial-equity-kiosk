import React, { useState } from 'react';
import MapToggle from './MapToggle';
import ShareButton from './ShareButton';
import IssueProfile from './IssuesProfile';
import Histogram from './Histogram';

export default function IssuesTileView({
  selectedSpecificIssue,
  issues,
  showToggle,
  showMap,
  setShowMap,
  selectedIssue,
  selectedChapter,
  communitySearch,
  compareSearch,
  boundary,
  demographic,
  showDemographics,
  moreIssues,
  setMoreIssues,
  moreIssuesLength,
  setMoreIssuesLength,
  setSelectedSpecificIssue,
  colorRamps,
  setCommunitySearch,
  setSelectedChapter,
  communities,
  councils,
  communityPinned,
  setCommunityPinned,
  councilPinned,
  setCouncilPinned,
}) {
  const [expand, setExpand] = useState(false);

  const getIssueName = () => {
    return (
      issues.specific_issues_data[selectedSpecificIssue].specific_issue_name ||
      null
    );
  };

  const getIssueSolutions = () => {
    return (
      issues.specific_issues_data[selectedSpecificIssue]
        .specific_issue_solutions || null
    );
  };

  return (
    <>
      {selectedSpecificIssue && (
        <div className={'col-12 h-100 issues-tile-container p-0'}>
          <div className={'issues-tile-header floating-share'}>
            <div className={'toggle-share-container'}>
              <div id={'share-container'}>
                <ShareButton
                  showMap={showMap}
                  communitySearch={communitySearch}
                  compareSearch={compareSearch}
                  selectedSpecificIssue={selectedSpecificIssue}
                  issues={issues}
                  setShowMap={setShowMap}
                  showToggle={showToggle}
                  selectedIssue={selectedIssue}
                  selectedChapter={selectedChapter}
                  boundary={boundary}
                  demographic={demographic}
                  showDemographics={showDemographics}
                  moreIssues={moreIssues}
                  setMoreIssues={setMoreIssues}
                  moreIssuesLength={moreIssuesLength}
                  setMoreIssuesLength={setMoreIssuesLength}
                />
              </div>
              <div id={'toggle-container'}>
                <MapToggle
                  showToggle={showToggle}
                  showMap={showMap}
                  setShowMap={setShowMap}
                  boundary={boundary}
                />
              </div>
            </div>
          </div>

          <div className={'issues-tile-body h-100 m-0 pt-0'}>
            <div className={'issue-tile-viz'}>
              <div>
                <h5
                  className={'m-0'}
                  style={{
                    top: '0em',
                    // marginBottom: '0',
                    padding: '0.75em 0',
                  }}
                >
                  {getIssueName()}
                </h5>
                <p className={'m-0 small-font'}>
                  {
                    issues.specific_issues_data[selectedSpecificIssue]
                      .specific_issue_units
                  }
                </p>
              </div>
              <div style={{ flex: 1 }} className={'histogram-responsive-box'}>
                <Histogram
                  colorRampsyType={colorRamps}
                  issues={issues}
                  boundary={boundary}
                  selectedSpecificIssue={selectedSpecificIssue}
                  communityPinned={communityPinned}
                  setCommunityPinned={setCommunityPinned}
                  councilPinned={councilPinned}
                  setCouncilPinned={setCouncilPinned}
                  setCommunitySearch={setCommunitySearch}
                  setSelectedChapter={setSelectedChapter}
                />
              </div>
              <p className={'m-0 small-font'}>
                Source: {
                  issues.specific_issues_data[selectedSpecificIssue]
                    .specific_issue_source
                }
              </p>
            </div>

            <div
              className={'col-6 w-50 overflow-scroll'}
              //style={{ paddingRight: '2.5em' }}
            >
              <IssueProfile
                issues={issues}
                selectedSpecificIssue={selectedSpecificIssue}
                boundary={boundary}
                setSelectedSpecificIssue={setSelectedSpecificIssue}
                setCommunitySearch={setCommunitySearch}
                setSelectedChapter={setSelectedChapter}
                councils={councils}
                communities={communities}
              />
            </div>
          </div>
        </div>
      )}

      {!selectedSpecificIssue && (
        <div className={'col-12 h-100 issues-tile-container'}>
          <div className={'issues-tile-header floating-share'}>
            <div className={'toggle-share-container'}>
              <div id={'share-container'}>
                <ShareButton
                  showMap={showMap}
                  communitySearch={communitySearch}
                  compareSearch={compareSearch}
                  selectedSpecificIssue={selectedSpecificIssue}
                  issues={issues}
                  setShowMap={setShowMap}
                  showToggle={showToggle}
                  selectedIssue={selectedIssue}
                  selectedChapter={selectedChapter}
                  boundary={boundary}
                  demographic={demographic}
                  showDemographics={showDemographics}
                  moreIssues={moreIssues}
                  setMoreIssues={setMoreIssues}
                  moreIssuesLength={moreIssuesLength}
                  setMoreIssuesLength={setMoreIssuesLength}
                />
              </div>
              <div id={'toggle-container'}>
                <MapToggle
                  showToggle={showToggle}
                  showMap={showMap}
                  setShowMap={setShowMap}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
