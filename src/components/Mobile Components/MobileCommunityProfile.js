import { useState, useEffect } from 'react';

import CommunitySearchBar from '../CommunitySearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import ShareButton from '../ShareButton';
import CommunityProfile from '../CommunityProfile';
import Histogram from '../Histogram';
import categories from '../../texts/issue_categories.json';
import IssueProfile from '../IssuesProfile';
import Demographics from '../Demographics';
import Carousel from '../Carousel';
import Legend from '../Legend';
import BoundaryToggle from '../BoundaryToggle';
import Typewriter from 'typewriter-effect';
import MobileLegendTray from './MobileLegendTray';
import MobileDropdown from './MobileDropdown';

export default function MobileCommunityProfile({
  selectedChapter,
  setSelectedChapter,
  selectedIssue,
  issue_categories,
  boundary,
  selectedSpecificIssue,
  setSelectedSpecificIssue,
  issues,
  setSelectedIssue,
  communities,
  communitySearch,
  compareSearch,
  setCommunitySearch,
  setCompareSearch,
  setShowMap,
  councils,
  setMoreIssues,
  setMoreIssuesLength,
  addCompare,
  setAddCompare,
  selectedCoord,
  setSelectedCoord,
  selectedCompareCoord,
  setselectedCompareCoord,
  badSearch,
  setBadSearch,
  setSearchSource,
  errorCode,
  setErrorCode,
  setUserPoints,
  setMapDemographics,
  info,
  userPoints,
  viewState,
  setViewState,
  demographic,
  setDemographic,
  setShowDemographics,
  showDemographics,
  mapDemographics,
  toggleTransit,
  setToggleTransit,
  toggleBike,
  setToggleBike,
  toggleWalk,
  setToggleWalk,
  demoLookup,
  demoColorRamp,
  demoLegendBins,
  setDemoColorRamp,
  setDemoLegendBins,
  zoomToggle,
  binList,
  setToggleUnderperformers,
  toggleUnderperformers,
  handleLegend,
  dataScale,
  setdataScale,
  showMap,
  moreIssues,
  setSelectedAbout,
  moreIssuesLength,
  colorRamps,
  communityPinned,
  setCommunityPinned,
  councilPinned,
  setCouncilPinned,
  isTouchingMapMobile,
  showLegend,
  setShowLegend,
  displayModes,
  setDisplayModes,
}) {
  const [showCompareSearch, setShowCompareSearch] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showSubDropDown, setShowSubDropDown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [resize, setResize] = useState(true);
  const [resizeIssues, setResizeIssues] = useState(false);

  useEffect(() => {
    if (!communitySearch) {
      setResize(true);
    }
  }, [communitySearch]);

  const getHyperlinkText = (texts) => {
    return (
      <p className={'mb-0 small-font'}>
        {texts.map((texts) => {
          return (
            <span key={texts.text} className={texts.bolded ? 'bold' : ''}>
              {texts.text}
              {texts.hyperlink && (
                <span
                  className={`${
                    categories.labels[
                      issues.specific_issues_data[selectedSpecificIssue]
                        .issue_type_ID
                    ]
                  }`}
                >
                  <a
                    className={`hyperlink ${
                      categories.labels[
                        issues.specific_issues_data[selectedSpecificIssue]
                          .issue_type_ID
                      ]
                    }`}
                    href={texts.source}
                    target="_blank"
                  >
                    {texts.hyperlink}
                  </a>
                </span>
              )}
            </span>
          );
        })}
      </p>
    );
  };

  const getSearchItems = (forSearch, boundary) => {
    let searchItems = [];
    let boundaryData;
    if (boundary === 'community') {
      boundaryData = communities;
    } else {
      boundaryData = councils;
    }
    switch (forSearch) {
      case true:
        for (let [key, value] of Object.entries(boundaryData)) {
          if (key !== compareSearch) {
            searchItems.push(
              <div
                key={key}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className={`${
                  communitySearch && communitySearch.startsWith(key)
                    ? 'search-item-active'
                    : 'search-item-inactive'
                } col search-item p-2`}
                onMouseDown={(e) => {
                  e.stopPropagation(e);
                  setCommunitySearch(key);
                  setShowSearch(false);
                  setSearchSource('search');
                  for (const [
                    index,
                    element,
                  ] of info.selectedBoundary.features.entries()) {
                    if (
                      element.properties.CDTA2020?.toString() === key ||
                      element.properties.CounDist?.toString() === key
                    ) {
                      setSelectedCoord([
                        element.properties.X_Cent,
                        element.properties.Y_Cent,
                      ]);
                      break;
                    }
                  }
                  e.target.blur();
                }}
              >
                <div className={'row w-100 p-0 m-0'}>
                  <div className={'col-10 m-0 p-0'}>
                    <span style={{ fontWeight: 'bold' }}>{value.name}</span>{' '}
                    {value.neighborhoods}
                  </div>
                  <div
                    className={`${
                      communitySearch && communitySearch.startsWith(key)
                        ? 'visible'
                        : 'invisible'
                    } d-flex col-2 p-0 flex-row justify-content-center align-items-center`}
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </div>
                </div>
              </div>
            );
          }
        }
        break;
      case false:
        for (let [key, value] of Object.entries(boundaryData)) {
          if (key !== communitySearch) {
            searchItems.push(
              <div
                key={key}
                className={`${
                  compareSearch && compareSearch.startsWith(key)
                    ? 'search-item-active'
                    : 'search-item-inactive'
                } col search-item p-2`}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setCompareSearch(key);
                  setShowCompareSearch(false);
                  setSearchSource('search');
                  for (const [
                    index,
                    element,
                  ] of info.selectedBoundary.features.entries()) {
                    if (
                      element.properties.CDTA2020?.toString() === key ||
                      element.properties.CounDist?.toString() === key
                    ) {
                      setselectedCompareCoord([
                        element.properties.X_Cent,
                        element.properties.Y_Cent,
                      ]);
                      break;
                    }
                  }
                  e.target.blur();
                }}
              >
                <div className={'row w-100 p-0 m-0'}>
                  <div className={'col-10 m-0 p-0'}>
                    <span style={{ fontWeight: 'bold' }}>{value.name}</span>{' '}
                    {value.neighborhoods}
                  </div>
                  <div
                    className={`${
                      compareSearch && compareSearch.startsWith(key)
                        ? 'visible'
                        : 'invisible'
                    } d-flex col-2 p-0 flex-row justify-content-center align-items-center`}
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </div>
                </div>
              </div>
            );
          }
        }
    }

    return searchItems;
  };

  useEffect(() => {
    if (resize) {
      setShowDropDown(false);
      setShowSubDropDown(false);
    }
  }, [resize]);

  return (
    <div className={'mobile-community'}>
      {/* grid access - assign 3 children */}
      <div
        className={'mobile-community-search-screen'}
        style={{
          zIndex: '1',
        }}
      >
        {/* child 1 - search bar and metric bar */}

        <div
          style={{
            pointerEvents: 'auto',
            width: '100%',
            position: 'relative',
          }}
        >
          {/* district title here- put up in top bar later*/}
          <div
            style={{
              position: 'relative',
              width: '100%',
            }}
            onClick={(e) => {
              setShowDropDown(false);
              setShowSubDropDown(false);
            }}
          >
            <CommunitySearchBar
              setResize={setResize}
              setResizeIssues={setResizeIssues}
              selectedCompareCoord={selectedCompareCoord}
              setselectedCompareCoord={setselectedCompareCoord}
              toggleValue={
                communitySearch
                  ? (communities[communitySearch] &&
                      communities[communitySearch].name) ||
                    (councils[communitySearch] &&
                      councils[communitySearch].name)
                  : null
              }
              communitySearch={communitySearch}
              callBack={setCommunitySearch}
              selectedCoord={selectedCoord}
              setSelectedCoord={setSelectedCoord}
              setShowSearch={setShowSearch}
              showSearch={showSearch}
              setShowMap={setShowMap}
              primarySearch={true}
              badSearch={badSearch}
              setBadSearch={setBadSearch}
              setSearchSource={setSearchSource}
              boundary={boundary}
              info={info}
              setCommunitySearch={setCommunitySearch}
              setCompareSearch={setCompareSearch}
              setAddCompare={setAddCompare}
              setUserPoints={setUserPoints}
              userPoints={userPoints}
              // mobile only
              isMobile={true}
            >
              {getSearchItems(true, boundary)}
            </CommunitySearchBar>
          </div>

          {/* metric dropdown menu */}
          {communitySearch && showMap && (
            <MobileDropdown
              selectedIssue={selectedIssue}
              setSelectedIssue={setSelectedIssue}
              selectedSpecificIssue={selectedSpecificIssue}
              setSelectedSpecificIssue={setSelectedSpecificIssue}
              issues={issues}
              issue_categories={issue_categories}
              selectedChapter={selectedChapter}
              showDropDown={showDropDown}
              setShowDropDown={setShowDropDown}
              showSubDropDown={showSubDropDown}
              setShowSubDropDown={setShowSubDropDown}
            />
          )}
        </div>

        {/* main body of the page and grid */}
        <main className="h-100 overflow-hidden">
          {/* typewriter gif */}
          {/* {!communitySearch && (
            <div
              className={'d-flex flex-column align-items-start w-100 p-1 mt-2'}
              style={{
                backgroundColor: 'white',
                width: '100%',
                border: '2px solid  black',
              }}
            >
              <p
                className={'m-0 p-2 lh-sm'}
                style={{
                  fontSize: '1.75rem',
                }}
              >
                Try searching for
              </p>

              <div
                className={'typewriter-container'}
                style={{
                  pointerEvents: 'none',
                }}
              >
                <Typewriter
                  options={{
                    strings:
                      boundary === 'community'
                        ? [
                            'your address',
                            'Hamilton Heights',
                            '111 John Street',
                            'Bronx 9',
                            'Bedford Stuyvesant',
                            '350 5th Avenue',
                          ]
                        : [
                            'your address',
                            'Washington Heights',
                            '350 5th Avenue',
                            'District 5',
                            '111 John Street',
                            'Bensonhurst',
                          ],
                    autoStart: true,
                    loop: true,
                    pauseFor: 2000,
                  }}
                />
              </div>
            </div>
          )} */}

          {/* main body of page when no map */}
          {!showMap && communitySearch && (
            <>
              <div
                className="h-100"
                style={{
                  pointerEvents: 'auto',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <CommunityProfile
                  issues={issues}
                  selectedSpecificIssue={selectedSpecificIssue}
                  communities={communities}
                  communitySearch={communitySearch}
                  setSelectedSpecificIssue={setSelectedSpecificIssue}
                  compareSearch={compareSearch}
                  moreIssues={moreIssues}
                  setMoreIssues={setMoreIssues}
                  moreIssuesLength={moreIssuesLength}
                  setMoreIssuesLength={setMoreIssuesLength}
                  boundary={boundary}
                  councils={councils}
                  setSelectedChapter={setSelectedChapter}
                  setSelectedAbout={setSelectedAbout}
                  displayModes={displayModes}
                  setDisplayModes={setDisplayModes}
                  // mobile only
                  isMobile={true}
                />
              </div>
            </>
          )}
        </main>
        {/* bottom legend */}

        {showMap && (
          <MobileLegendTray
            showMap={showMap}
            boundary={boundary}
            issues={issues}
            selectedSpecificIssue={selectedSpecificIssue}
            setShowDemographics={setShowDemographics}
            showDemographics={showDemographics}
            showLegend={showLegend}
            isTouchingMapMobile={isTouchingMapMobile}
            mapDemographics={mapDemographics}
            demoLookup={demoLookup}
            setShowLegend={setShowLegend}
            demoLegendBins={demoLegendBins}
            demographic={demographic}
            dataScale={dataScale}
            setdataScale={setdataScale}
            colorRamps={colorRamps}
            toggleUnderperformers={toggleUnderperformers}
            setToggleUnderperformers={setToggleUnderperformers}
            demoColorRamp={demoColorRamp}
            handleLegend={handleLegend}
            zoomToggle={zoomToggle}
            binList={binList}
            info={info}
            selectedChapter={selectedChapter}
            setDemographic={setDemographic}
            communitySearch={communitySearch}
            compareSearch={compareSearch}
            setMapDemographics={setMapDemographics}
            communities={communities}
            councils={councils}
            toggleTransit={toggleTransit}
            setToggleTransit={setToggleTransit}
            toggleBike={toggleBike}
            setToggleBike={setToggleBike}
            toggleWalk={toggleWalk}
            setToggleWalk={setToggleWalk}
            setDemoColorRamp={setDemoColorRamp}
            setDemoLegendBins={setDemoLegendBins}
          />
        )}
      </div>
    </div>
  );
}
