import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { default as _GLOBE_WHITE } from '../../img/globe_white.svg';
import { default as _GLOBE_BLACK } from '../../img/globe_black.svg';
import { default as _TILE_WHITE } from '../../img/tile_white.svg';
import { default as _TILE_BLACK } from '../../img/tile_black.svg';

import IssueProfile from '../IssuesProfile';
import categories from '../../texts/issue_categories.json';
import Histogram from '../Histogram';
import IssuesGrid from '../IssuesGrid';
import RightColumnFooter from '../RightColumnFooter';
import MobileLegendTray from './MobileLegendTray';
import MobileDropdown from './MobileDropdown';

export default function CitywideData({
  selectedIssue,
  setSelectedIssue,
  selectedSpecificIssue,
  setSelectedSpecificIssue,
  setShowDemographics,
  issues,
  issue_categories,
  boundary,
  showMap,
  colorRamps,
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
  compareSearch,
  zoomToggle,
  handleLegend,
  dataScale,
  setdataScale,
  communityPinned,
  setCommunityPinned,
  councilPinned,
  setCouncilPinned,
  info,
  setToggleUnderperformers,
  binList,
  showDropDown,
  setShowDropDown,
  showSubDropDown,
  setShowSubDropDown,
  showLegend,
  setShowLegend,
  isTouchingMapMobile,
  toggleDisplayMode,
  setToggleDisplayMode,
}) {
  const [useBoroughColor, setUseBoroughColor] = useState(false);

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

  const getSelectionIssues = (category, cat_id, issueType) => {
    if (selectedIssue === cat_id) {
      if (!selectedSpecificIssue) {
        return (
          <IssuesGrid
            isMobile={true}
            items={issueType}
            currentValue={selectedSpecificIssue}
            setValue={setSelectedSpecificIssue}
            issues={issues}
            issue_categories={issue_categories}
            showDemographics={showDemographics}
          />
        );
      } else {
        return (
          <div
            style={{
              maxHeight:
                selectedIssue === cat_id && !selectedSpecificIssue
                  ? '50%'
                  : '0',
              transition: 'height 0.5s, opacity 0.5s',
              pointerEvents:
                selectedIssue === cat_id && !selectedSpecificIssue
                  ? ''
                  : 'none',
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
      }
    }
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
      {!showMap && !selectedSpecificIssue && (
        <div className="h-100">
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
            <p
              className={`mb-0 ${
                !selectedSpecificIssue ? 'big-text' : 'no-text'
              } mobile-transition-font`}
            >
              Health
            </p>
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

            {getSelectionIssues('health', 1, health_issues)}
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
            <p
              className={`mb-0 ${
                !selectedSpecificIssue ? 'big-text' : 'no-text'
              } mobile-transition-font`}
            >
              Environment
            </p>
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
            {getSelectionIssues('environment', 2, environment_issues)}
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
            <p
              className={`mb-0 ${
                !selectedSpecificIssue ? 'big-text' : 'no-text'
              } mobile-transition-font`}
            >
              Infrastructure
            </p>
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
            {getSelectionIssues('infrastructure', 3, infrastructure_issues)}
          </div>
        </div>
      )}

      {/* grid container for citywide data */}
      {(showMap || selectedSpecificIssue) && (
        <div
          className={'mobile-issues-profile-container'}
          style={{ zIndex: '1' }}
        >
          {/* first grid child - metric dropdown menu */}
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

          {/* second grid child - body, including histogram */}
          <div
            className="citywide-non-map-content"
            style={{
              // Hide the citywide non-map content if showing map
              opacity: showMap ? 0 : 1,
              pointerEvents: showMap ? 'none' : 'auto',
              transition: 'height 0.5s',
              overflow: 'auto',
              position: 'relative',
              height: '100%',
              backgroundColor: 'white',
            }}
            onTouchMove={() => {
              if (showDropDown) setShowDropDown(false);
              if (showSubDropDown) setShowSubDropDown(false);
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
                  style={{ flex: 1, height: toggleDisplayMode ? '' : '100%' }}
                  className={'histogram-responsive-box mobile-histogram'}
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
                    toggleDisplayMode={toggleDisplayMode}
                    setToggleDisplayMode={setToggleDisplayMode}
                    useBoroughColor={useBoroughColor}
                    setUseBoroughColor={setUseBoroughColor}
                    expanded={false}
                    // mobile
                    isMobile={true}
                    citywideTab={true}
                  />
                </div>
                {/* if non map mode */}
                {!showMap && !toggleDisplayMode && (
                  <RightColumnFooter
                    boundary={boundary}
                    issues={issues}
                    selectedSpecificIssue={selectedSpecificIssue}
                    setSelectedChapter={setSelectedChapter}
                    setSelectedSpecificIssue={setSelectedSpecificIssue}
                    useBoroughColor={useBoroughColor}
                    setUseBoroughColor={setUseBoroughColor}
                    councilPinned={councilPinned}
                    setCouncilPinned={setCouncilPinned}
                    communityPinned={communityPinned}
                    setCommunityPinned={setCommunityPinned}
                    toggleDisplayMode={toggleDisplayMode}
                    setToggleDisplayMode={setToggleDisplayMode}
                    isMobile={true}
                    citywideTab={true}
                  />
                )}
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

          {/* third child - legend tray */}
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
      )}
    </div>
  );
}
