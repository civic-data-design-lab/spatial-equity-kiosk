import React, { useState } from 'react';
import IssueProfile from './IssuesProfile';
import Histogram from './Histogram';
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
  showMap,
  selectedIssue,
  selectedChapter,
  communitySearch,
  compareSearch,
  boundary,
  setMoreIssues,
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
  toggleDisplayMode,
  setToggleDisplayMode,
  displayModes,
  setDisplayModes,
}) {
  const [imageIndex, setImageIndex] = useState(0);
  const [useBoroughColor, setUseBoroughColor] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let index = getRandomInt(0, backgroundImages.length);
    let counter = 0;
    while (index === imageIndex && counter <= 5) {
      counter++;
      index = getRandomInt(0, backgroundImages.length);
    }
    setImageIndex(index);
  }, [selectedChapter, selectedIssue]);

    useEffect(() => {
    if (selectedSpecificIssue) {
      let div = document.getElementsByClassName('issues-tile-text-container')[0];
      if (div) {
        div.scrollBy({
          top: -div.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  }, [selectedSpecificIssue]);

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
                    // toggleDisplayMode={toggleDisplayMode}
                    // setToggleDisplayMode={setToggleDisplayMode}
                    expanded={true}
                    displayModes={displayModes}
                    setDisplayModes={setDisplayModes}
                    citywideTab={true}
                  />
                )}
              </div>
              {!showMap && !displayModes[selectedSpecificIssue] && (
                <RightColumnFooter
                  boundary={boundary}
                  issues={issues}
                  selectedSpecificIssue={selectedSpecificIssue}
                  setSelectedChapter={setSelectedChapter}
                  setSelectedSpecificIssue={setSelectedSpecificIssue}
                  useBoroughColor={useBoroughColor}
                  setUseBoroughColor={setUseBoroughColor}
                  setIsHovering={setIsHovering}
                  councilPinned={councilPinned}
                  setCouncilPinned={setCouncilPinned}
                  communityPinned={communityPinned}
                  setCommunityPinned={setCommunityPinned}
                  // setToggleDisplayMode={setToggleDisplayMode}
                />
              )}
            </div>

            <div
              className={'d-flex flex-column col-6 w-50'}
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
