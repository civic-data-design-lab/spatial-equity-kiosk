import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { default as _GLOBE_WHITE } from '../../img/globe_white.svg';
import { default as _GLOBE_BLACK } from '../../img/globe_black.svg';
import { default as _TILE_WHITE } from '../../img/tile_white.svg';
import { default as _TILE_BLACK } from '../../img/tile_black.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faCaretUp,
  faChevronRight,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import Demographics from '../Demographics';
import IssueProfile from '../IssuesProfile';
import ShareButton from '../ShareButton';
import Carousel from '../Carousel';
import categories from '../../texts/issue_categories.json';
import Legend from '../Legend';
import Histogram from '../Histogram';

export default function CitywideData({
  selectedIssue,
  setSelectedIssue,
  selectedSpecificIssue,
  setSelectedSpecificIssue,
  setShowDemographics,
  issues,
  issue_categories,
  boundary,
  setBoundary,
  showToggle,
  showMap,
  setShowMap,
  colorRamps,
  setColorRamps,
  setShowToggle,
  showDemographics,

  demographic,
  setDemographic,
  mapDemographics,
  setMapDemographics,
  communities,
  councils,
  selectedChapter,
  toggleTransit,
  setToggleTransit,
  toggleBike,
  setToggleBike,
  toggleWalk,
  setToggleWalk,
  demoColorRamp,
  demoLegendBins,
  setDemoColorRamp,
  setDemoLegendBins,
  demoLookup,
  toggleUnderperformers,
  setSelectedChapter,
  communitySearch,
  setCommunitySearch,
  addCompare,
  setAddCompare,
  compareSearch,
  setCompareSearch,
  viewState,
  setViewState,
  mapSelection,
  setMapSelection,
  zoomToggle,
  setzoomToggle,
  handleLegend,
  sethandleLegend,
  coordinateLookup,
  setCoordinateLookup,
  dataScale,
  setdataScale,
  highlightFeature,
  sethighlightFeature,
  selectedCoord,
  selectedCompareCoord,
  setSelectedCoord,
  setSelectedCompareCoord,
  badSearch,
  setBadSearch,
  mainMap,
  communityPinned,
  setCommunityPinned,
  councilPinned,
  setCouncilPinned,
  info,
  setToggleUnderperformers,
  binList,
}) {
  const [showDropDown, setShowDropDown] = useState(false);
  const [showSubDropDown, setShowSubDropDown] = useState(false);
  const [showLegend, setShowLegend] = useState(false);

  const health_issues = issues.issues_data['health'].specific_issues_ID.map(
    (id_) => {
      return issues.specific_issues_data[id_];
    }
  );

  const environment_issues = issues.issues_data[
    'environment'
  ].specific_issues_ID.map((id_) => {
    return issues.specific_issues_data[id_];
  });

  const infrastructure_issues = issues.issues_data[
    'infrastructure'
  ].specific_issues_ID.map((id_) => {
    return issues.specific_issues_data[id_];
  });

  const getHyperlinkText = (texts) => {
    return (
      <p className={'mb-0'}>
        {texts.map((texts) => {
          return (
            <span className={texts.bolded ? 'bold' : ''}>
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

  const getRelatedIssues = () => {
    return issues.specific_issues_data[selectedSpecificIssue].related.map(
      (issue, index) => {
        return (
          <span key={index}>
            {' '}
            <a
              style={{ textDecoration: 'underline' }}
              onClick={() => {
                setSelectedSpecificIssue(issue);
              }}
            >
              {issues.specific_issues_data[issue].specific_issue_name}
            </a>
            {index === 2 ? '.' : ','}
          </span>
        );
      }
    );
  };

  const getSelectionIssues = (category, cat_id) => {
    return (
      <div
        style={{
          maxHeight:
            selectedIssue === cat_id && !selectedSpecificIssue ? '50%' : '0',
          transition: 'height 0.5s, opacity 0.5s',
          pointerEvents:
            selectedIssue === cat_id && !selectedSpecificIssue ? '' : 'none',
          opacity:
            selectedIssue === cat_id && !selectedSpecificIssue ? '1' : '0',
          overflow: 'auto',
          border:
            selectedIssue === cat_id && !selectedSpecificIssue
              ? '1px solid black'
              : 'none',
        }}
        onClick={(e) => {
          console.log('fired onClick');
          e.stopPropagation();
        }}
      >
        <Table
          className={`mobile-issue-dropdown ${
            selectedIssue === cat_id
              ? 'mobile-issue-dropdown-grow'
              : 'mobile-issue-dropdown-shrink'
          }`}
        >
          <tbody>
            {issues.issues_data[category].specific_issues_ID.map((id_) => {
              return (
                <tr
                  className={`${
                    selectedSpecificIssue === id_
                      ? 'active-scheme'
                      : 'inactive-scheme'
                  } transition-color`}
                  onClick={(e) => {
                    if (selectedSpecificIssue !== id_) {
                      setSelectedSpecificIssue(id_);
                    } else {
                      setSelectedSpecificIssue(null);
                    }
                  }}
                >
                  <td
                    className={`${
                      selectedIssue === cat_id && !selectedSpecificIssue
                        ? 'small-text opacity-100'
                        : 'no-text no-padding opacity-0'
                    } mobile-issue-dropdown-item`}
                  >
                    {issues.specific_issues_data[id_].specific_issue_name}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  };

  const [showCategories, setShowCategories] = useState(false);
  const [showIssues, setShowIssues] = useState(null);

  const getIssueItems = () => {
    let specific_issues =
      selectedIssue === 1
        ? health_issues
        : selectedIssue === 2
        ? environment_issues
        : infrastructure_issues;
    console.log(specific_issues);
    return specific_issues.map((issue, index) => {
      return (
        <div
          key={index}
          style={{ zIndex: 3 }}
          className={`mobile-dropdown-item ${
            selectedSpecificIssue === issue.specific_issue_ID
              ? 'active-scheme'
              : 'inactive-scheme'
          }`}
          onClick={() => {
            setShowIssues(false);
            if (selectedSpecificIssue !== issue.specific_issue_ID) {
              setSelectedSpecificIssue(issue.specific_issue_ID);
            } else {
              setSelectedSpecificIssue(null);
            }
          }}
        >
          <p className={'m-0 small-font'}>{issue.specific_issue_name}</p>
        </div>
      );
    });
  };

  return (
    <div className={'mobile-citywide'}>
      <div
        className={`mobile-citywide-chapter
            ${
              !selectedSpecificIssue
                ? 'big-padding regular-border'
                : 'no-border'
            }
            row-gap
            `}
        style={{
          height:
            selectedIssue && selectedIssue !== 1 && !selectedSpecificIssue
              ? 'calc(1.375rem + 1.5vw + 3rem)'
              : selectedSpecificIssue
              ? '0vh'
              : !selectedIssue
              ? 'calc((100vh - 4.025rem - 0.3vw) / 3)'
              : 'calc((100vh - 4.025rem - 0.3vw) - 2 * (1.375rem + 1.5vw + 3rem)',
        }}
        onClick={() => {
          if (selectedIssue !== 1) {
            setSelectedIssue(1);
          } else {
            setSelectedIssue(null);
          }
        }}
      >
        <div
          className={`d-flex flex-row align-items-center justify-content-between`}
        >
          <p
            className={`mb-0 ${
              !selectedSpecificIssue ? 'big-text' : 'no-text'
            } mobile-transition-font`}
          >
            Health
          </p>
        </div>
        <p
          className={`mb-0 mobile-transition-font
                ${
                  (selectedIssue === 1 || !selectedIssue) &&
                  !selectedSpecificIssue
                    ? 'small-text'
                    : 'no-text'
                }`}
        >
          {issue_categories.descriptions['1']}
        </p>

        {getSelectionIssues('health', 1)}
      </div>

      <div
        className={`mobile-citywide-chapter
            ${
              !selectedSpecificIssue
                ? 'big-padding regular-border'
                : 'border-none'
            }
                       row-gap`}
        style={{
          height:
            selectedIssue && selectedIssue !== 2 && !selectedSpecificIssue
              ? 'calc(1.375rem + 1.5vw + 3rem)'
              : selectedSpecificIssue
              ? '0vh'
              : !selectedIssue
              ? 'calc((100vh - 4.025rem - 0.3vw) / 3)'
              : 'calc((100vh - 4.025rem - 0.3vw) - 2 * (1.375rem + 1.5vw + 3rem)',
        }}
        onClick={() => {
          if (selectedIssue !== 2) {
            setSelectedIssue(2);
          } else {
            setSelectedIssue(null);
          }
        }}
      >
        <div
          className={`d-flex flex-row align-items-center justify-content-between`}
        >
          <p
            className={`mb-0 ${
              !selectedSpecificIssue ? 'big-text' : 'no-text'
            } mobile-transition-font`}
          >
            Environment
          </p>
        </div>
        <p
          className={`mb-0 mobile-transition-font
                ${
                  (selectedIssue === 2 || !selectedIssue) &&
                  !selectedSpecificIssue
                    ? 'small-text'
                    : 'no-text'
                }`}
        >
          {issue_categories.descriptions['2']}
        </p>
        {getSelectionIssues('environment', 2)}
      </div>

      <div
        className={`mobile-citywide-chapter
            ${
              !selectedSpecificIssue
                ? 'big-padding regular-border'
                : 'border-none'
            }
             row-gap`}
        style={{
          height:
            selectedIssue && selectedIssue !== 3 && !selectedSpecificIssue
              ? 'calc(1.375rem + 1.5vw + 3rem)'
              : selectedSpecificIssue
              ? '0vh'
              : !selectedIssue
              ? 'calc((100vh - 4.025rem - 0.3vw) / 3)'
              : 'calc((100vh - 4.025rem - 0.3vw) - 2 * (1.375rem + 1.5vw + 3rem)',
        }}
        onClick={() => {
          if (selectedIssue !== 3) {
            setSelectedIssue(3);
          } else {
            setSelectedIssue(null);
          }
        }}
      >
        <div
          className={`d-flex flex-row align-items-center justify-content-between`}
        >
          <p
            className={`mb-0 ${
              !selectedSpecificIssue ? 'big-text' : 'no-text'
            } mobile-transition-font`}
          >
            Infrastructure
          </p>
        </div>
        <p
          className={`mb-0 mobile-transition-font
                ${
                  (selectedIssue === 3 || !selectedIssue) &&
                  !selectedSpecificIssue
                    ? 'small-text'
                    : 'no-text'
                }`}
        >
          {issue_categories.descriptions['3']}
        </p>
        {getSelectionIssues('infrastructure', 3)}
      </div>

      <div
        className={'mobile-issues-profile-container'}
        style={{
          height: selectedSpecificIssue
            ? 'calc(100vh - 4.025rem - 0.3vw)'
            : '0vh',
        }}
      >
        <div className={'mobile-citywide-nav'}>
          <div
            className={'mobile-citywide-nav-dropdown'}
            onClick={() => setShowDropDown(!showDropDown)}
          >
            <div className={'mobile-citywide-nav-text'}>
              <div>
                {selectedChapter && issue_categories.labels[selectedIssue]}
              </div>
              <FontAwesomeIcon icon={faChevronRight} />
              <div className={'ellipses'}>
                {selectedSpecificIssue &&
                  issues.specific_issues_data[selectedSpecificIssue]
                    .specific_issue_name}
              </div>
            </div>
            <FontAwesomeIcon icon={showDropDown ? faCaretUp : faCaretDown} />
          </div>
          <div
            onClick={() => {
              setShowMap(false);
            }}
            className={`mobile-map-toggle ${
              showMap ? 'inactive-scheme' : 'active-scheme'
            }`}
          >
            {showMap ? <img src={_TILE_BLACK} /> : <img src={_TILE_WHITE} />}
          </div>
          <div
            onClick={() => {
              setShowMap(true);
            }}
            className={`mobile-map-toggle ${
              !showMap ? 'inactive-scheme' : 'active-scheme'
            }`}
          >
            {showMap ? <img src={_GLOBE_WHITE} /> : <img src={_GLOBE_BLACK} />}
          </div>
        </div>
        {/* Nav dropdown content (increase z-index for visibility) */}
        <div className={'position-absolute'} style={{ zIndex: 50 }}>
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
                <div>{issues.specific_issues_data[id].specific_issue_name}</div>
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

          {issues.issues_data.environment.specific_issues_ID.map((id) => {
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
                <div>{issues.specific_issues_data[id].specific_issue_name}</div>
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

          {issues.issues_data.infrastructure.specific_issues_ID.map((id) => {
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
                <div>{issues.specific_issues_data[id].specific_issue_name}</div>
              </div>
            );
          })}
        </div>

        {/* put this in the nav menu */}
        <div className={'mobile-boundary-nav'}>
          <div className={'d-flex flex-row col-gap align-items-center'}>
            <p
              className={'small-font mb-0'}
              style={{
                textDecorationLine: boundary !== 'council' ? 'underline' : '',
              }}
            >
              Community <br /> Board
            </p>
            <div
              className={`d-flex switch-container flex-row justify-content-between`}
            >
              <label className="switch">
                <input
                  type="checkbox"
                  checked={boundary === 'council'}
                  onChange={(e) => {
                    let b = e.target.checked ? 'council' : 'community';
                    setBoundary(b);
                  }}
                />
                <span className="slider round"></span>
              </label>
            </div>
            <p
              className={`small-font mb-0`}
              style={{
                textDecorationLine: boundary === 'council' ? 'underline' : '',
              }}
            >
              Council <br /> District
            </p>
          </div>
          <ShareButton isMobile={true} />
        </div>
        {/* put this in the nav menu */}

        <div
          className="citywide-non-map-content"
          style={{
            // Hide the citywide non-map content if showing map
            opacity: showMap ? 0 : 1,
            pointerEvents: showMap ? 'none' : 'auto',
            height:
              (!showMap && !showDemographics) || (showMap && !showLegend)
                ? 'calc(100vh - 19vh - (4.025rem + .3vw))'
                : 'calc(100vh - 52vh - (4.025rem + .3vw))',
            transition: 'height 0.5s',
            padding: '1rem',
            overflow: 'auto',
            position: 'relative',
            backgroundColor: 'white',
          }}
        >
          {selectedSpecificIssue && (
            <>
              {(!showMap || !showDemographics) && (
                <div>
                  <div className={'pb-3'}>
                    {getHyperlinkText(
                      issues.specific_issues_data[selectedSpecificIssue]
                        .specific_issue_description
                    )}
                  </div>
                  <div className={'link-underline'}>
                    <strong>Related:</strong> {getRelatedIssues()}
                  </div>
                </div>
              )}
              <div
                style={{ flex: 1, height: '70vh' }}
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
              ? 'Hide U.S. Census Data'
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
            height:
              (!showMap && showDemographics) || (showMap && showLegend)
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

          {selectedSpecificIssue && showMap && (
            <Carousel>
              <div
                className={'d-flex flex-column justify-content-between'}
                style={{ height: 'calc(100vh - 19vh  - 48vh - 5rem)' }}
              >
                <p className={'mb-0'}>Description</p>
                {getHyperlinkText(
                  issues.specific_issues_data[selectedSpecificIssue]
                    .specific_issue_description
                )}
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
                  style={{ position: 'relative', zIndex: 1, height: '100%' }}
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
    </div>
  );
}
