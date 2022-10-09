import React, { useState } from 'react';
import MapToggle from './MapToggle';
import ShareButton from './ShareButton';
import IssueProfile from './IssuesProfile';
import Histogram from './Histogram';
import SourceInfo from './SourceInfo';
import RightColumnHeader from './RightColumnHeader';
import RightColumnFooter from './RightColumnFooter';

import Typewriter from 'typewriter-effect';
import { useEffect } from 'react';

const backgroundImages = [
  'access-square.jpg',
  'bikepath-square.jpg',
  'city-square.jpg',
  'crosswalk-square.jpg',
  'traffic-square.jpg',
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

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
  const [imageIndex, setImageIndex] = useState(0);
  const [useBoroughColor, setUseBoroughColor] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [toggleDisplayMode, setToggleDisplayMode] = useState(false);

  useEffect(() => {
    let index = getRandomInt(0, backgroundImages.length);
    let counter = 0;
    while (index === imageIndex && counter <= 5) {
      counter++;
      index = getRandomInt(0, backgroundImages.length);
      console.log(counter);
    }
    setImageIndex(index);
  }, [selectedChapter, selectedIssue]);

  const getBackgroundImage = () => {
    const randomImage = backgroundImages[imageIndex];

    return (
      <div>
        <img
          className={`backsplash-image`}
          src={`/stills/${randomImage}`}
          alt={''}
        />
      </div>
    );
  };

  const getIssueName = () => {
    const bounds =
      boundary == 'council' ? 'Council Districts' : 'Community Boards';

    const sentence = [
      bounds,
      'Ranked by',
      issues.specific_issues_data[selectedSpecificIssue].specific_issue_title,
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
      {!selectedSpecificIssue && !showMap && (
        <div>
          <div className={'pb-3'}>{getBackgroundImage()}</div>

          <div
            className={'typewriter-container p-5'}
            style={{
              position: 'absolute',
              zIndex: '100',
              top: '0',
            }}
          >
            <div>Try choosing...</div>
            <Typewriter
              options={{
                strings: [
                  'Health to learn about asthma, pollution, and traffic violence',
                  'Environment to learn about heat, flooding, and trees',
                  'Mobility to learn about traffic, infrastructure, and transportation',
                ],
                autoStart: true,
                loop: true,
                pauseFor: 2000,
              }}
            />
          </div>
        </div>
      )}
      {selectedSpecificIssue && (
        <div className={'col-12 h-100 issues-tile-container p-0'}>
          <div className={'issues-tile-body h-100'}>
            <div
              className={'issue-tile-viz position-relative'}
              style={{ outline: '1px solid black' }}
            >
              <RightColumnHeader
                type={'histogram header'}
                boundary={boundary}
                issues={issues}
                selectedSpecificIssue={selectedSpecificIssue}
                setSelectedChapter={setSelectedChapter}
                setSelectedSpecificIssue={setSelectedSpecificIssue}
                setMoreIssues={setMoreIssues}
              />
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
                    useBoroughColor={useBoroughColor}
                    setUseBoroughColor={setUseBoroughColor}
                    isHovering={isHovering}
                    setIsHovering={setIsHovering}
                    toggleDisplayMode={toggleDisplayMode}
                    setToggleDisplayMode={setToggleDisplayMode}
                  />
                )}
              </div>
              <RightColumnFooter
                boundary={boundary}
                issues={issues}
                selectedSpecificIssue={selectedSpecificIssue}
                setSelectedChapter={setSelectedChapter}
                setSelectedSpecificIssue={setSelectedSpecificIssue}
                setMoreIssues={setMoreIssues}
                useBoroughColor={useBoroughColor}
                setUseBoroughColor={setUseBoroughColor}
                isHovering={isHovering}
                setIsHovering={setIsHovering}
                councilPinned={councilPinned}
                setCouncilPinned={setCouncilPinned}
                communityPinned={communityPinned}
                setCommunityPinned={setCommunityPinned}
                toggleDisplayMode={toggleDisplayMode}
                setToggleDisplayMode={setToggleDisplayMode}
              />
            </div>

            <div
              className={'col-6 w-50'}
              style={{ outline: '1px solid black' }}
            >
              {!collapseMap && (
                <>
                  <RightColumnHeader />
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
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
