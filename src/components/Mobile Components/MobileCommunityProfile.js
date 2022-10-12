import { useState, useEffect } from 'react';

import CommunitySearchBar from '../CommunitySearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faCaretDown,
  faCaretUp,
  faMinus,
  faPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { default as _TILE_BLACK } from '../../img/tile_black.svg';
import { default as _TILE_WHITE } from '../../img/tile_white.svg';
import { default as _GLOBE_WHITE } from '../../img/globe_white.svg';
import { default as _GLOBE_BLACK } from '../../img/globe_black.svg';
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
  setBoundary,
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
}) {
  const [searching, setSearching] = useState(false);
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
        <div className={''}>
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
                transition: 'width 0.5s',
                height: '100%',
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

            {/* {communitySearch && (
              <div
                style={{
                  backgroundColor: 'white',
                  position: 'relative',
                  flexGrow: 1,
                  transition: 'width 0.5s',
                  borderBottom: '1px solid black',
                }}
              >
                <div
                  className={'mobile-citywide-nav-dropdown'}
                  style={{
                    backgroundColor: 'white',
                    position: 'relative',
                    minWidth: '0',
                    borderLeft: resizeIssues ? '1px solid black' : 'none',
                  }}
                  onClick={() => {
                    setShowDropDown(!showDropDown);
                  }}
                >
                  <div className={'mobile-citywide-nav-text'}>
                    <div className={''}>
                      {selectedSpecificIssue &&
                        issues.specific_issues_data[selectedSpecificIssue]
                          .specific_issue_name}
                    </div>
                  </div>
                  <FontAwesomeIcon
                    icon={showDropDown ? faCaretUp : faCaretDown}
                  />
                </div>
                <div
                  style={{
                    width: '100%',
                    position: 'absolute',
                    flexGrow: 1,
                    zIndex: 3,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: 'white',
                      width: '100%',
                      height: '100%',
                      borderLeft: '1px solid black',
                      borderTop: '1px solid black',
                      zIndex: selectedSpecificIssue ? 50 : '',
                      position: 'relative',
                    }}
                  >
                    <div
                      className={`mobile-citywide-nav-dropdown-item
                        ${
                          showDropDown
                            ? 'mobile-citywide-nav-dropdown-item-grow'
                            : 'mobile-citywide-nav-dropdown-item-shrink'
                        }  
                        ${
                          showSubDropDown === 1
                            ? 'active-scheme'
                            : 'inactive-scheme'
                        }
                        `}
                      onClick={() => {
                        if (showSubDropDown !== 1) {
                          setShowSubDropDown(1);
                        } else {
                          setShowSubDropDown(null);
                        }
                      }}
                    >
                      <div>Health</div>
                      <FontAwesomeIcon
                        icon={showSubDropDown === 1 ? faCaretUp : faCaretDown}
                      />
                    </div>

                    {issues.issues_data.health.specific_issues_ID.map((id) => {
                      return (
                        <div
                          className={`mobile-citywide-nav-dropdown-item
                        ${
                          showDropDown && showSubDropDown === 1
                            ? 'mobile-citywide-nav-dropdown-item-grow'
                            : 'mobile-citywide-nav-dropdown-item-shrink'
                        }  
                        ${
                          selectedSpecificIssue === id
                            ? 'active-scheme'
                            : 'inactive-scheme'
                        }
                        `}
                          onClick={() => {
                            if (selectedSpecificIssue !== id) {
                              setSelectedSpecificIssue(id);
                              setSelectedIssue(1);
                            } else {
                              setSelectedSpecificIssue(null);
                            }
                          }}
                        >
                          <div>
                            <p
                              className={'mb-0'}
                              style={{
                                fontSize:
                                  showDropDown && showSubDropDown === 1
                                    ? '0.8em'
                                    : '0',
                                opacity:
                                  showDropDown && showSubDropDown === 1
                                    ? '1'
                                    : '0',
                                transition: 'font-size 0.2s, opacity 0.3s',
                              }}
                            >
                              {
                                issues.specific_issues_data[id]
                                  .specific_issue_name
                              }
                            </p>
                          </div>
                        </div>
                      );
                    })}

                    <div
                      className={`mobile-citywide-nav-dropdown-item
                        ${
                          showDropDown
                            ? 'mobile-citywide-nav-dropdown-item-grow'
                            : 'mobile-citywide-nav-dropdown-item-shrink'
                        }  
                        ${
                          showSubDropDown === 2
                            ? 'active-scheme'
                            : 'inactive-scheme'
                        }
                        `}
                      onClick={() => {
                        if (showSubDropDown !== 2) {
                          setShowSubDropDown(2);
                        } else {
                          setShowSubDropDown(null);
                        }
                      }}
                    >
                      <div>Environment</div>
                      <FontAwesomeIcon
                        icon={showSubDropDown === 2 ? faCaretUp : faCaretDown}
                      />
                    </div>

                    {issues.issues_data.environment.specific_issues_ID.map(
                      (id) => {
                        return (
                          <div
                            className={`mobile-citywide-nav-dropdown-item
                        ${
                          showDropDown && showSubDropDown === 2
                            ? 'mobile-citywide-nav-dropdown-item-grow'
                            : 'mobile-citywide-nav-dropdown-item-shrink'
                        }  
                        ${
                          selectedSpecificIssue === id
                            ? 'active-scheme'
                            : 'inactive-scheme'
                        }
                        `}
                            onClick={() => {
                              if (selectedSpecificIssue !== id) {
                                setSelectedSpecificIssue(id);
                                setSelectedIssue(2);
                              } else {
                                setSelectedSpecificIssue(null);
                              }
                            }}
                          >
                            <div>
                              <p
                                className={'mb-0 '}
                                style={{
                                  fontSize:
                                    showDropDown && showSubDropDown === 2
                                      ? '0.8em'
                                      : '0',
                                  opacity:
                                    showDropDown && showSubDropDown === 2
                                      ? '1'
                                      : '0',
                                  transition: 'font-size 0.2s, opacity 0.3s',
                                }}
                              >
                                {
                                  issues.specific_issues_data[id]
                                    .specific_issue_name
                                }
                              </p>
                            </div>
                          </div>
                        );
                      }
                    )}

                    <div
                      className={`mobile-citywide-nav-dropdown-item 
                        ${
                          showDropDown
                            ? 'mobile-citywide-nav-dropdown-item-grow'
                            : 'mobile-citywide-nav-dropdown-item-shrink'
                        }                      
                        ${
                          showSubDropDown === 3
                            ? 'active-scheme'
                            : 'inactive-scheme'
                        }
                        `}
                      onClick={() => {
                        if (showSubDropDown !== 3) {
                          setShowSubDropDown(3);
                        } else {
                          setShowSubDropDown(null);
                        }
                      }}
                    >
                      <div>Infrastructure</div>
                      <FontAwesomeIcon
                        icon={showSubDropDown === 3 ? faCaretUp : faCaretDown}
                      />
                    </div>

                    {issues.issues_data.infrastructure.specific_issues_ID.map(
                      (id) => {
                        return (
                          <div
                            className={`mobile-citywide-nav-dropdown-item
                        ${
                          showDropDown && showSubDropDown === 3
                            ? 'mobile-citywide-nav-dropdown-item-grow'
                            : 'mobile-citywide-nav-dropdown-item-shrink'
                        }  
                        ${
                          selectedSpecificIssue === id
                            ? 'active-scheme'
                            : 'inactive-scheme'
                        }
                        `}
                            onClick={() => {
                              if (selectedSpecificIssue !== id) {
                                setSelectedSpecificIssue(id);
                                setSelectedIssue(3);
                              } else {
                                setSelectedSpecificIssue(null);
                              }
                            }}
                          >
                            <div>
                              <p
                                className={'mb-0'}
                                style={{
                                  fontSize:
                                    showDropDown && showSubDropDown === 3
                                      ? '0.8em'
                                      : '0',
                                  opacity:
                                    showDropDown && showSubDropDown === 3
                                      ? '1'
                                      : '0',
                                  transition: 'font-size 0.s, opacity 0.3s',
                                }}
                              >
                                {
                                  issues.specific_issues_data[id]
                                    .specific_issue_name
                                }
                              </p>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            )} */}
          </div>
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
                />
              </div>
              {/* reinstate later */}
              {/* <div
                className={'selected-issue-card'}
                style={{
                  transition: 'height 0.5s, top 0.5s',
                  backgroundColor: 'white',
                  position: 'absolute',
                  zIndex: 2,
                  width: '100vw',
                  top: `${
                    !selectedSpecificIssue ? '100vh' : 'calc(.3vw + 5vh)'
                  }`,
                }}
              >
                <div
                  className={
                    'selected-issue-card-header d-flex flex-row align-items-center justify-content-between'
                  }
                  style={{
                    height: '5vh',
                    backgroundColor: 'black',
                    color: 'white',
                    padding: '0.5rem',
                  }}
                >
                  <p className={'mb-0 smaller-text'}>
                    {issues.specific_issues_data[selectedSpecificIssue]
                      ?.specific_issue_name || null}
                  </p>
                  <p className={'m-0'} style={{ fontSize: '0.6rem' }}>
                    (
                    {issues.specific_issues_data[selectedSpecificIssue]
                      ?.units || null}
                    )
                  </p>
                  <FontAwesomeIcon
                    icon={faXmark}
                    onClick={() => {
                      setSelectedSpecificIssue(null);
                    }}
                  />
                </div>
                <div
                  className={'selected-issue-card-body'}
                  style={{
                    height: `${
                      (!showMap && showDemographics) || (showMap && showLegend)
                        ? 'calc(50vh - 4.025rem - 0.3vw)'
                        : 'calc(83vh - 4.025rem - 0.3vw)'
                    }`,
                    backgroundColor: 'white',
                    color: 'black',
                    padding: '1rem',
                    overflow: 'auto',
                    transition: 'height 0.5s',
                  }}
                >
                  <div>
                    {
                      issues.specific_issues_data[selectedSpecificIssue]
                        ?.specific_issue_ranking_narrative
                    }
                  </div>
                  {selectedSpecificIssue && (
                    <>
                      <div
                        style={{ flex: 1, height: '80vh' }}
                        className={'histogram-responsive-box'}
                      >
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
                    </>
                  )}
                </div>

                {showMap && (
                  <div>
                    <div
                      className={`mobile-demographics-toggle ${
                        (!showMap && showDemographics) ||
                        (showMap && showLegend)
                          ? 'active-scheme'
                          : 'inactive-scheme'
                      }`}
                      onClick={() => {
                        if (!showMap) {
                          setShowDemographics(!showDemographics);
                        } else {
                          setShowDemographics(true);
                          setShowLegend(!showLegend);
                        }
                      }}
                    >
                      <div>
                        {!showMap && showDemographics
                          ? 'Show U.S. Census Data'
                          : !showMap && !showDemographics
                          ? 'Show U.S. Census Data'
                          : showMap && showLegend
                          ? 'Hide Legend'
                          : 'Show Legend'}
                      </div>

                      <FontAwesomeIcon
                        icon={
                          (!showMap && showDemographics) ||
                          (showMap && showLegend)
                            ? faMinus
                            : faPlus
                        }
                      />
                    </div>

                    <div
                      className={'mobile-demographics-container'}
                      style={{
                        padding:
                          (!showMap && showDemographics) ||
                          (showMap && showLegend)
                            ? '1rem'
                            : '0',
                        height:
                          (!showMap && showDemographics) ||
                          (showMap && showLegend)
                            ? 'calc(100vh - 19vh  - 48vh)'
                            : '0',
                      }}
                    >
                      {selectedSpecificIssue && !showMap && (
                        <Demographics
                          currentValue={demographic}
                          setValue={setDemographic}
                          selectedSpecificIssue={selectedSpecificIssue}
                          setShowDemographics={setShowDemographics}
                          showDemographics={showDemographics}
                          communitySearch={communitySearch}
                          compareSearch={compareSearch}
                          mapDemographics={mapDemographics}
                          setMapDemographics={setMapDemographics}
                          boundary={boundary}
                          communities={communities}
                          councils={councils}
                          selectedChapter={selectedChapter}
                          toggleTransit={toggleTransit}
                          setToggleTransit={setToggleTransit}
                          toggleBike={toggleBike}
                          setToggleBike={setToggleBike}
                          toggleWalk={toggleWalk}
                          setToggleWalk={setToggleWalk}
                          colorRamps={colorRamps} // legendBins={legendBins}
                          demoColorRamp={demoColorRamp}
                          demoLegendBins={demoLegendBins}
                          setDemoColorRamp={setDemoColorRamp}
                          setDemoLegendBins={setDemoLegendBins}
                          demoLookup={demoLookup[demographic]}
                          showMap={showMap}
                          info={info}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div> */}
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

      {/* {showMap && (
        <div className={'community-legend'}>
          <div
            className={`mobile-demographics-toggle ${
              (!showMap && showDemographics) || (showMap && showLegend)
                ? 'active-scheme'
                : 'inactive-scheme'
            }`}
            onClick={() => {
              if (!showMap) {
                setShowDemographics(!showDemographics);
              } else {
                setShowDemographics(true);
                setShowLegend(!showLegend);
              }
            }}
          >
            <div>
              {!showMap && showDemographics
                ? 'Show U.S. Census Data'
                : !showMap && !showDemographics
                ? 'Show U.S. Census Data'
                : showMap && showLegend
                ? 'Hide Legend'
                : 'Show Legend'}
            </div>

            <FontAwesomeIcon
              icon={
                (!showMap && showDemographics) || (showMap && showLegend)
                  ? faMinus
                  : faPlus
              }
            />
          </div>
          <div
            className={'mobile-demographics-container'}
            style={{
              padding:
                (!showMap && showDemographics) || (showMap && showLegend)
                  ? '1rem'
                  : '0',
              height:
                (!showMap && showDemographics) || (showMap && showLegend)
                  ? 'calc(100vh - 19vh  - 48vh)'
                  : '0',
            }}
          >
            {selectedSpecificIssue && showMap && (
              <Carousel>
                <div
                  className={'d-flex flex-column justify-content-between'}
                  style={{ height: 'calc(100vh - 19vh  - 48vh - 5rem)' }}
                >
                  <p className={'mb-0'}>Description</p>
                  <p className="mb-0">
                    {getHyperlinkText(
                      issues.specific_issues_data[selectedSpecificIssue]
                        .specific_issue_description
                    )}
                  </p>
                </div>

                <div
                  className={'d-flex flex-column justify-content-between'}
                  style={{ height: 'calc(100vh - 19vh  - 48vh - 5rem)' }}
                >
                  <p className={'mb-0'}>Data Legend</p>

                  <Legend
                    mapDemographics={mapDemographics}
                    demoColorRamp={demoColorRamp}
                    demoLegendBins={demoLegendBins}
                    demoLookup={demoLookup[demographic]}
                    demographic={demographic}
                    dataScale={dataScale}
                    setdataScale={setdataScale}
                    issues={issues}
                    selectedSpecificIssue={selectedSpecificIssue}
                    colorRamps={colorRamps}
                    toggleUnderperformers={toggleUnderperformers} //legendBins={legendBins}
                    setToggleUnderperformers={setToggleUnderperformers}
                    boundary={boundary}
                    handleLegend={handleLegend}
                    selectedIssue={selectedSpecificIssue}
                    zoomToggle={zoomToggle}
                    showMap={showMap}
                    binList={binList}
                    info={info}
                    selectedChapter={selectedChapter}
                  />
                </div>

                <div
                  className={'d-flex flex-column justify-content-between'}
                  style={{
                    transition: 'height 0.5s',
                    height: `${
                      showMap && showLegend
                        ? 'calc(100vh - 19vh  - 48vh - 5rem)'
                        : '0'
                    }`,
                  }}
                >
                  <p className={'mb-0'}>Demographics</p>

                  <div
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      height: '100%',
                    }}
                  >
                    <Demographics
                      currentValue={demographic}
                      setValue={setDemographic}
                      selectedSpecificIssue={selectedSpecificIssue}
                      setShowDemographics={setShowDemographics}
                      showDemographics={showDemographics}
                      communitySearch={communitySearch}
                      compareSearch={compareSearch}
                      mapDemographics={mapDemographics}
                      setMapDemographics={setMapDemographics}
                      boundary={boundary}
                      communities={communities}
                      councils={councils}
                      selectedChapter={selectedChapter}
                      toggleTransit={toggleTransit}
                      setToggleTransit={setToggleTransit}
                      toggleBike={toggleBike}
                      setToggleBike={setToggleBike}
                      toggleWalk={toggleWalk}
                      setToggleWalk={setToggleWalk}
                      colorRamps={colorRamps} // legendBins={legendBins}
                      demoColorRamp={demoColorRamp}
                      demoLegendBins={demoLegendBins}
                      setDemoColorRamp={setDemoColorRamp}
                      setDemoLegendBins={setDemoLegendBins}
                      demoLookup={demoLookup[demographic]}
                      showMap={showMap}
                      info={info}
                    />
                  </div>
                </div>
              </Carousel>
            )}
          </div>
        </div>
      )} */}
    </div>
  );
}
