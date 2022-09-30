import React, { useState } from 'react';
import MapToggle from './MapToggle';
import ShareButton from './ShareButton';
import IssueProfile from './IssuesProfile';
import Histogram from './Histogram';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import Typewriter from 'typewriter-effect';

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
  collapseMap,
  userPoints,
  setUserPoints,
  selectedCoord,
  setSelectedCoord,
  setSearchSource,
}) {
  const [expand, setExpand] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const getIssueName = () => {
    const bounds =
      boundary == 'council' ? 'Council Districts' : 'Community Boards';

    const sentence = [
      bounds,
      'Ranked by',
      issues.specific_issues_data[selectedSpecificIssue]
        .specific_issue_title_sentence,
    ].join(' ');

    return sentence || null;
  };

  const getIssueSolutions = () => {
    return (
      issues.specific_issues_data[selectedSpecificIssue]
        .specific_issue_solutions || null
    );
  };

  return (
    <>
      {!selectedSpecificIssue && (
        <div className={'typewriter-container p-5'} style={{ color: 'black' }}>
          <div>Click Health</div>
          <Typewriter
            options={{
              strings: [
                'to see how people are living',
                'to find nature in New York City',
                'to see how people are getting around',
              ],
              autoStart: true,
              loop: true,
              pauseFor: 2000,
            }}
          />
        </div>
      )}
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

          <div className={'issues-tile-body h-100'}>
            <div className={'issue-tile-viz'}>
              <div>
                <h5 className={'d-inline-block bold py-3'}>
                  {getIssueName()}{' '}
                  <div
                    onMouseEnter={() => {
                      setShowInfo(true);
                    }}
                    onMouseLeave={() => {
                      setShowInfo(false);
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      // setSelectedAbout(9);
                      setSelectedChapter(4);
                    }}
                    className={'d-inline-block'}
                  >
                    <FontAwesomeIcon
                      style={
                        showInfo
                          ? {
                              fontSize: '1rem',
                              cursor: 'pointer',
                              transform: 'scale(1.1)',
                            }
                          : { fontSize: '1rem', cursor: 'pointer' }
                      }
                      icon={faCircleInfo}
                    />
                    <div
                      className={`${
                        showInfo ? '' : 'd-none'
                      } position-absolute info-tooltip smaller-text`}
                    >
                      <p className={'m-0'}>
                        {`Source: ${issues.specific_issues_data[selectedSpecificIssue].specific_issue_source}`}
                      </p>
                    </div>
                  </div>
                </h5>

                <div className={'m-0 small-font'}>
                  {`${issues.specific_issues_data[selectedSpecificIssue].specific_issue_units} `}
                </div>
              </div>
              <div style={{ flex: 1 }} className={'histogram-responsive-box'}>
                {!collapseMap && (
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
                    communitySearch={communitySearch}
                    compareSearch={compareSearch}
                    userPoints={userPoints}
                    setUserPoints={setUserPoints}
                    selectedCoord={selectedCoord}
                    setSelectedCoord={setSelectedCoord}
                    setSearchSource={setSearchSource}
                  />
                )}
              </div>
              {/* <p className={'m-0 small-font'}>
                Source:{' '}
                {
                  issues.specific_issues_data[selectedSpecificIssue]
                    .specific_issue_source
                }
              </p> */}
            </div>

            <div
              className={'col-6 w-50 overflow-auto'}
              //style={{ paddingRight: '2.5em' }}
            >
              {!collapseMap && (
                <IssueProfile
                  issues={issues}
                  selectedSpecificIssue={selectedSpecificIssue}
                  boundary={boundary}
                  setSelectedSpecificIssue={setSelectedSpecificIssue}
                  setCommunitySearch={setCommunitySearch}
                  setSelectedChapter={setSelectedChapter}
                  councils={councils}
                  communities={communities}
                  communitySearch={communitySearch}
                  compareSearch={compareSearch}
                />
              )}
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
