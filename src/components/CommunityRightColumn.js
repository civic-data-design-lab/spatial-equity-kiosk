import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import IssueProfile from './IssuesProfile';
import ShareButton from './ShareButton';
import MapToggle from './MapToggle';
import Typewriter from 'typewriter-effect';
import {useEffect} from 'react';

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

    useEffect(()=>{
    if (selectedSpecificIssue) {
        let div = document.getElementById('issue-container');
        if (div) {
            div.scrollBy({
            top: -div.scrollHeight,
            behavior: 'smooth'
        })
        }
    }
  }, [selectedSpecificIssue])


  return (
    <>
      {/* {!communitySearch && <div className={"d-flex flex-row align-items-center h-100 p-5 col-gap w-100"}>

                    <FontAwesomeIcon icon={faArrowLeft} className={"fa-lg"}/>
                <h2 className={"m-0"}>Try searching for</h2>

                <div className={"typewriter-container"}>
                    <Typewriter
                    options={{
                        strings: (boundary === "community" ? ['your address', 'Hamilton Heights', '111 John Street',
                            "Bronx 9", 'Bedford Stuyvesant', '350 5th Avenue'] : ["your address", "Washington Heights", "350 5th Avenue", "District 5", "111 John Street",
                            "Bensonhurst"]),
                        autoStart: true,
                        loop: true,
                        pauseFor: 2000,
                    }}
                />
                </div>


            </div>} */}

      {communitySearch && !selectedSpecificIssue && (
        <div className={'d-flex flex-row h-100 col-gap standard-padding'}>
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
          <div className={'d-flex flex-row col-gap prompt'}>
            <FontAwesomeIcon icon={faArrowLeft} className={'fa-lg'} />
            <h5 className={'m-0'}>
              Click on a card to learn more about the issue
            </h5>
          </div>
        </div>
      )}

      {communitySearch && selectedSpecificIssue && (
        <div className={'issue-container d-flex flex-column'} id={"issue-container"}>
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
            />
          </div>
        </div>
      )}
    </>
  );
}
