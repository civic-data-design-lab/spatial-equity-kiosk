// import React and React hooks
import React, { useState, useEffect } from 'react';

//import components
import IssueProfile from './IssueProfile';
import Histogram from './Histogram';
import RightColumnHeader from './RightColumnHeader';
import RightColumnFooter from './RightColumnFooter';

// import packages
import Typewriter from 'typewriter-effect';

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

/**
 * IssuesTileView.js renders the rightmost column of the dataview of the Citywide data section 
 * Selected props
 * @property {int} selectedSpecificIssue - integer representing the current actively toggled metric
 * @property {Object} specificIssue - Object of info relating to the current actively toggled metric
 * @property {boolean} showMap - if the user is on map view
 * @property {int} selectedIssue - integer representing the chosen category of indicators (either 1, 2 or 3)
 * @property {int} selectedChapter - integer representing the current actively toggled section of the app (either 1, 2, 3 or 4)
 * @param {string} communitySearch - user's query for community (primary)
 * @param {string} compareSearch - user's query for community they want to compare the primary search with
 * @param {string} boundary - string representing the toggled active boundary (either 'council' or 'community').
 * @param {Function} setMoreIssues - update the app's more issues state
 * @param {Function} setSelectedSpecificIssue - callback function updates the app's state of what indicator is currently actively toggled
 * @param {} colorRamps -
 * @param {Function} setCommunitySearch - function to set the app's current (primary) community search
 * @param {Function} setSelectedChapter -function to set the current active chapter of the web app (either 1, 2, 3, or 4).
 * @param {} communityPinned - 
 * @param {} setCommunityPinned -
 * @param {} councilPinned - 
 * @param {} setCouncilPinned -
 * @param {boolean} collapseMap - whether the map is expanded to fill entire 2/3rd of screen
 * @param {Array[]} userPoints - an array of two arrays, the first which represented the coordinates of the primary community lookup and the second which represents the coordinates of the secondary community lookup
 * @param {Function} setUserPoints - callback function which updates app's userPoints state
 * @param {} selectedCoord
 * @param {Function} setSelectedCoord - 
 * @param {Function} setSearchSource - update where the source is coming from (either from the map "click" or from the search bar "search")
 * @param {} displayModes - 
 * @param {} setDisplayModes -
 * 
 */

export default function IssuesTileView({
  selectedSpecificIssue,
  specificIssue,
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
  displayModes,
  setDisplayModes,
}) {


  // current background image
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
      let div = document.getElementsByClassName(
        'issues-tile-text-container'
      )[0];
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
                pauseFor: 1500,
                delay: 40,
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
                issue={specificIssue}
                type={'histogram header'}
                boundary={boundary}
                selectedSpecificIssue={selectedSpecificIssue}
                setSelectedChapter={setSelectedChapter}
                setSelectedSpecificIssue={setSelectedSpecificIssue}
                setMoreIssues={setMoreIssues}
              />
              <div style={{ flex: 1 }} className={'histogram-responsive-box'}>
                {!collapseMap && (
                  <Histogram
                    colorRampsyType={colorRamps}
                    specificIssue={specificIssue}
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
                  <IssueProfile issue={specificIssue} />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
