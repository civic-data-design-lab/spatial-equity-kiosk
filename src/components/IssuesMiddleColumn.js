// import React and React hooks
import React, { useEffect } from 'react';

// import components
import IssuesDropDown from './IssuesDropDown';
import IssuesGrid from './IssuesGrid';
import Demographics from './Demographics';
import Legend from './Legend';
import MapToggle from './MapToggle';

// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

// import data and text
import _RANKINGS from '../data/rankings.json';
import _COUNCILDISTRICTS from '../texts/councildistricts.json';
import categories from '../texts/issue_categories.json';
import _ISSUE_CATEGORIES from '../texts/issue_categories.json';
import _ISSUES from '../texts/issues.json';
import _COMMUNITIES from '../texts/communities.json';
import _COUNCILS from '../texts/councildistricts.json';
import _DEMOGRAPHICS from '../texts/demographics.json';

/**
 * IssuesMiddleColumn.js renders the middle column in the Citywide data section
 * and the middle column in the Community Profiles section when the map view is toggled.
 * Refer to App.js for info on props
 */

export default function IssuesMiddleColumn({
  selectedIssue,
  setSelectedIssue,
  selectedSpecificIssue,
  setSelectedSpecificIssue,
  demographic,
  setDemographic,
  communitySearch,
  compareSearch,
  showDemographics,
  setShowDemographics,
  mapDemographics,
  setMapDemographics,
  boundary,
  colorRamps,
  toggleUnderperformers,
  setToggleUnderperformers,
  selectedChapter,
  toggleWalk,
  setToggleWalk,
  toggleTransit,
  setToggleTransit,
  toggleBike,
  setToggleBike,
  dataScale,
  setdataScale,
  setDemoColorRamp,
  setDemoLegendBins,
  demoColorRamp,
  demoLegendBins,
  handleLegend,
  zoomToggle,
  setColorRamps,
  showMap,
  binList,
  info,
  setSelectedChapter,
  setShowMap,
  displayModes,
  setDisplayModes,
}) {
  // function for correctly formatting text and hyperlinks
  const getHyperlinkText = (texts) => {
    return (
      <p>
        {texts.map((texts, index) => {
          return (
            <span key={index} className={texts.bolded ? 'bold' : ''}>
              {texts.text}
              {texts.hyperlink && (
                <span
                  className={`${
                    categories.labels[
                      _ISSUES.specific_issues_data[selectedSpecificIssue]
                        .issue_type_ID
                    ]
                  }`}
                >
                  <a
                    className={`hyperlink ${
                      categories.labels[
                        _ISSUES.specific_issues_data[selectedSpecificIssue]
                          .issue_type_ID
                      ]
                    }`}
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

  // get top three related issues
  const getRelatedIssues = () => {
    return _ISSUES.specific_issues_data[selectedSpecificIssue].related.map(
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
              {_ISSUES.specific_issues_data[issue].specific_issue_name}
            </a>
            {index === 2 ? '.' : ','}
          </span>
        );
      }
    );
  };

  const handleIssueTransition = (issue) => {
    setSelectedSpecificIssue(null);
    if (selectedIssue !== issue) {
      setSelectedIssue(issue);
      setColorRamps(issue == 1 ? 'health' : issue == 2 ? 'env' : 'infra');
    } else {
      setSelectedIssue(null);
      setShowDemographics(null);
    }
  };

  // items for health dropdown
  const health_issues = _ISSUES.issues_data['health'].specific_issues_ID.map(
    (id_) => {
      return _ISSUES.specific_issues_data[id_];
    }
  );

  // items for environment dropdown
  const environment_issues = _ISSUES.issues_data[
    'environment'
  ].specific_issues_ID.map((id_) => {
    return _ISSUES.specific_issues_data[id_];
  });

  // items for mobility dropdown
  const infrastructure_issues = _ISSUES.issues_data[
    'infrastructure'
  ].specific_issues_ID.map((id_) => {
    return _ISSUES.specific_issues_data[id_];
  });

  // if none of the categories are opened, close demographics tab
  useEffect(() => {
    if (!selectedIssue) {
      setShowDemographics(false);
    }
  });

  return (
    <div
      className={'d-flex flex-column position-relative'}
      style={{ height: '100%' }}
    >
      {/* SELECTED NEIGHBORHOOD BAR */}
      <div
        className={`${'issues-chapters-active'} collapse-issue issues-chapters top-border transition-height`}
        style={{
          height: communitySearch ? 'auto' : '0',
          display: communitySearch ? '' : 'none',
        }}
      >
        <div
          className="position-relative d-grid "
          style={{
            gridTemplateColumns: '1fr auto',
            gridGap: '0.33rem',
            alignItems: 'center',
          }}
        >
          <h6 className="mb-0">
            {compareSearch ? 'Compare ' : ''}
            {communitySearch
              ? boundary == 'council'
                ? _COUNCILS[communitySearch]
                  ? `City Council ${_COUNCILS[communitySearch].name}`
                  : ''
                : _COMMUNITIES[communitySearch]
                ? !compareSearch
                  ? `${_COMMUNITIES[communitySearch].name
                      .split(' ')
                      .slice(0, -1)
                      .join(' ')} Community Board ${_COMMUNITIES[
                      communitySearch
                    ].name
                      .split(' ')
                      .slice(-1)}`
                  : `${_COMMUNITIES[communitySearch].name}`
                : ''
              : ''}
            {compareSearch ? ' & ' : ''}
            {compareSearch
              ? boundary == 'council'
                ? _COUNCILS[compareSearch]
                  ? `${_COUNCILS[compareSearch].name}`
                  : ''
                : _COMMUNITIES[compareSearch]
                ? `${_COMMUNITIES[compareSearch].name}`
                : ''
              : ''}
          </h6>
          <MapToggle
            displayModes={displayModes}
            setDisplayModes={setDisplayModes}
            selectedSpecificIssue={selectedSpecificIssue}
            selectedChapter={selectedChapter}
            showToggle={true}
            showMap={showMap}
            setShowMap={setShowMap}
            boundary={boundary}
          />
        </div>
      </div>
      {/* ADD COMPARE COMMUNITY BAR - COPY FROM ABOVE */}

      {/* HEALTH BAR COLLAPSED */}
      <div
        className={`${selectedIssue === 1 ? 'issues-chapters-active' : ''} ${
          selectedIssue || showDemographics ? 'collapse-issue' : ''
        } issues-chapters bottom-border ${
          !communitySearch ? 'top-border' : ''
        }`}
        onClick={() => {
          return selectedIssue !== 1 ? handleIssueTransition(1) : null;
        }}
      >
        <div
          className="position-relative d-grid "
          style={{
            gridTemplateColumns: '1fr auto',
            gridGap: '0.33rem',
            alignItems: 'center',
          }}
        >
          <h6
            className={`${selectedIssue ? 'mb-0' : ''} `}
            onClick={() => {
              return selectedIssue == 1 ? handleIssueTransition(1) : null;
            }}
          >
            Health
          </h6>
          <MapToggle
            displayModes={displayModes}
            setDisplayModes={setDisplayModes}
            selectedSpecificIssue={selectedSpecificIssue}
            selectedChapter={selectedChapter}
            showToggle={selectedIssue === 1 && !communitySearch ? true : false}
            showMap={showMap}
            setShowMap={setShowMap}
            boundary={boundary}
          />
        </div>
        <p
          className={` ${selectedIssue ? 'invis' : 'vis'} mb-0 small-font-vh`}
          style={{ padding: !selectedIssue ? '1rem' : '0rem' }}
        >
          {_ISSUE_CATEGORIES.descriptions[selectedIssue]}
        </p>
      </div>

      {/* HEALTH BAR EXPANDED */}
      <div
        className={`${
          selectedIssue === 1 ? 'expand-issue' : ''
        } accordion-body`}
      >
        <div className={'position-relative d-flex flex-column row-gap'}>
          {!selectedSpecificIssue && (
            <IssuesGrid
              items={health_issues}
              currentValue={selectedSpecificIssue}
              setValue={setSelectedSpecificIssue}
              showDemographics={showDemographics}
            />
          )}
          {selectedSpecificIssue && (
            <IssuesDropDown
              items={health_issues}
              currentValue={selectedSpecificIssue}
              setValue={setSelectedSpecificIssue}
              setShowDemographics={setShowDemographics}
              showDemographics={showDemographics}
            />
          )}
          {(!showMap || !showDemographics) && (
            <div>
              {!selectedSpecificIssue ? (
                <p className="small-font-vh">
                  {_ISSUE_CATEGORIES.descriptions[selectedIssue]}
                </p>
              ) : (
                <div>
                  <div>
                    {getHyperlinkText(
                      _ISSUES.specific_issues_data[selectedSpecificIssue]
                        .specific_issue_description
                    )}
                  </div>
                  <div className={'link-underline'}>
                    <strong>Related:</strong> {getRelatedIssues()}
                  </div>
                </div>
              )}
            </div>
          )}

          {/*{!showDemographics && <p className={"small-font m-0"}></p>}*/}
          {showMap && (
            <Legend
              setShowMap={setShowMap}
              mapDemographics={mapDemographics}
              demoColorRamp={demoColorRamp}
              demoLegendBins={demoLegendBins}
              demographic={demographic}
              dataScale={dataScale}
              setdataScale={setdataScale}
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
              setSelectedSpecificIssue={setSelectedSpecificIssue}
              setSelectedChapter={setSelectedChapter}
            />
          )}
        </div>
      </div>

      {/* ENVIRO BAR COLLAPSED */}
      <div
        className={`${
          selectedIssue === 2
            ? 'issues-chapters-active'
            : selectedIssue === 1
            ? 'top-border'
            : ''
        } bottom-border ${
          selectedIssue || showDemographics ? 'collapse-issue' : ''
        } issues-chapters`}
        onClick={() => {
          return selectedIssue !== 2 ? handleIssueTransition(2) : null;
        }}
      >
        <div
          className="position-relative d-grid"
          style={{
            gridTemplateColumns: '1fr auto',
            gridGap: '0.33rem',
            alignItems: 'center',
          }}
        >
          <h6
            className={`${selectedIssue ? 'mb-0' : ''} `}
            onClick={() => {
              return selectedIssue == 2 ? handleIssueTransition(2) : null;
            }}
          >
            Environment
          </h6>
          <MapToggle
            displayModes={displayModes}
            setDisplayModes={setDisplayModes}
            selectedSpecificIssue={selectedSpecificIssue}
            selectedChapter={selectedChapter}
            showToggle={selectedIssue === 2 && !communitySearch ? true : false}
            showMap={showMap}
            setShowMap={setShowMap}
            boundary={boundary}
          />
        </div>

        <p
          className={`${selectedIssue ? 'invis' : 'vis'} mb-0 small-font-vh`}
          style={{ padding: !selectedIssue ? '1rem' : '0rem' }}
        >
          {_ISSUE_CATEGORIES.descriptions[selectedIssue]}
        </p>
      </div>
      {/* ENVIRO BAR EXPANDED */}
      <div
        className={`${
          selectedIssue === 2 ? 'expand-issue' : ''
        } accordion-body`}
      >
        <div className={'position-relative d-flex flex-column row-gap'}>
          {!selectedSpecificIssue && (
            <IssuesGrid
              items={environment_issues}
              currentValue={selectedSpecificIssue}
              setValue={setSelectedSpecificIssue}
              showDemographics={showDemographics}
            />
          )}
          {selectedSpecificIssue && (
            <IssuesDropDown
              items={environment_issues}
              currentValue={selectedSpecificIssue}
              setValue={setSelectedSpecificIssue}
              setShowDemographics={setShowDemographics}
              showDemographics={showDemographics}
            />
          )}

          {(!showMap || !showDemographics) && (
            <div className={''}>
              {!selectedSpecificIssue ? (
                <p className="small-font-vh">
                  {_ISSUE_CATEGORIES.descriptions[selectedIssue]}
                </p>
              ) : (
                <div>
                  <div>
                    {getHyperlinkText(
                      _ISSUES.specific_issues_data[selectedSpecificIssue]
                        .specific_issue_description
                    )}
                  </div>
                  <div className={'link-underline'}>
                    <strong>Related:</strong> {getRelatedIssues()}
                  </div>
                </div>
              )}
            </div>
          )}

          {/*{!showDemographics && <p className={"small-font m-0"}></p>}*/}
          {showMap && (
            <Legend
              setShowMap={setShowMap}
              mapDemographics={mapDemographics}
              demoColorRamp={demoColorRamp}
              demoLegendBins={demoLegendBins}
              demographic={demographic}
              dataScale={dataScale}
              setdataScale={setdataScale}
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
              setSelectedSpecificIssue={setSelectedSpecificIssue}
              setSelectedChapter={setSelectedChapter}
            />
          )}
        </div>
      </div>
      {/* MOBILITY BAR COLLAPSED */}
      <div
        className={`${
          selectedIssue === 3
            ? 'issues-chapters-active'
            : selectedIssue === 2
            ? 'top-border'
            : ''
        } ${
          selectedIssue || showDemographics ? 'collapse-issue' : ''
        } issues-chapters`}
        onClick={() => {
          return selectedIssue !== 3 ? handleIssueTransition(3) : null;
        }}
      >
        <div
          className="position-relative d-grid"
          style={{
            gridTemplateColumns: '1fr auto',
            gridGap: '0.33rem',
            alignItems: 'center',
          }}
        >
          <h6
            className={`${selectedIssue ? 'mb-0' : ''} `}
            onClick={() => {
              return selectedIssue == 3 ? handleIssueTransition(3) : null;
            }}
          >
            Mobility
          </h6>
          <MapToggle
            displayModes={displayModes}
            setDisplayModes={setDisplayModes}
            selectedSpecificIssue={selectedSpecificIssue}
            selectedChapter={selectedChapter}
            showToggle={selectedIssue === 3 && !communitySearch ? true : false}
            showMap={showMap}
            setShowMap={setShowMap}
            boundary={boundary}
          />
        </div>
        <p
          className={`${selectedIssue ? 'invis' : 'vis'} mb-0 small-font-vh `}
          style={{ padding: !selectedIssue ? '1rem' : '0rem' }}
        >
          {_ISSUE_CATEGORIES.descriptions[selectedIssue]}
        </p>
      </div>
      {/* MOBILITY BAR EXPANDED */}
      <div
        className={`${
          selectedIssue === 3 ? 'expand-issue' : ''
        } accordion-body`}
      >
        <div className={'position-relative d-flex flex-column row-gap'}>
          {!selectedSpecificIssue && (
            <IssuesGrid
              items={infrastructure_issues}
              currentValue={selectedSpecificIssue}
              setValue={setSelectedSpecificIssue}
              showDemographics={showDemographics}
            />
          )}
          {selectedSpecificIssue && (
            <IssuesDropDown
              items={infrastructure_issues}
              currentValue={selectedSpecificIssue}
              setValue={setSelectedSpecificIssue}
              setShowDemographics={setShowDemographics}
              showDemographics={showDemographics}
            />
          )}

          {(!showMap || !showDemographics) && (
            <div className={''}>
              {!selectedSpecificIssue ? (
                <p className="small-font-vh">
                  {_ISSUE_CATEGORIES.descriptions[selectedIssue]}
                </p>
              ) : (
                <div>
                  <div>
                    {getHyperlinkText(
                      _ISSUES.specific_issues_data[selectedSpecificIssue]
                        .specific_issue_description
                    )}
                  </div>
                  <div className={'link-underline'}>
                    <strong>Related:</strong> {getRelatedIssues()}
                  </div>
                </div>
              )}
            </div>
          )}

          {showMap && (
            <Legend
              setShowMap={setShowMap}
              mapDemographics={mapDemographics}
              demoColorRamp={demoColorRamp}
              demoLegendBins={demoLegendBins}
              demographic={demographic}
              dataScale={dataScale}
              setdataScale={setdataScale}
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
              setSelectedSpecificIssue={setSelectedSpecificIssue}
              setSelectedChapter={setSelectedChapter}
            />
          )}
        </div>
      </div>

      {/* DEMOGRAPHICS TAB COLLAPSED */}
      <div
        className={`collapse-issue transition-height
                ${selectedIssue ? '' : 'no-height'}
                ${
                  showDemographics ? 'bottom-border issues-chapters-active' : ''
                } ${
          selectedIssue === 3 ? 'top-border' : ''
        } issues-chapters no-bottom-border`}
        onClick={() => {
          if (selectedIssue) setShowDemographics(!showDemographics);
          if (showDemographics) {
            setMapDemographics(false);
          }
        }}
        id="bottom-chapter"
      >
        <div
          className={`d-flex flex-row justify-content-between align-items-center
                transition-height ${selectedIssue ? '' : 'no-height'}
                `}
        >
          <h6 className="mb-0">
            {showDemographics
              ? 'Hide U.S. Census Data'
              : 'Show U.S. Census Data'}
          </h6>
          {showDemographics ? (
            <FontAwesomeIcon icon={faMinus} style={{ marginRight: '1.5rem' }} />
          ) : (
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: '1.5rem' }} />
          )}
        </div>
      </div>

      {/* DEMOGRAPHICS TAB EXPANDED */}
      <div
        className={`${showDemographics ? 'expand-issue' : ''} accordion-body`}
      >
        <div className={'d-flex position-relative'}>
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
            selectedChapter={selectedChapter}
            toggleTransit={toggleTransit}
            setToggleTransit={setToggleTransit}
            toggleBike={toggleBike}
            setToggleBike={setToggleBike}
            toggleWalk={toggleWalk}
            setToggleWalk={setToggleWalk}
            colorRamps={colorRamps}
            demoColorRamp={demoColorRamp}
            demoLegendBins={demoLegendBins}
            setDemoColorRamp={setDemoColorRamp}
            setDemoLegendBins={setDemoLegendBins}
            showMap={showMap}
            info={info}
            setSelectedChapter={setSelectedChapter}
            setShowMap={setShowMap}
          />
        </div>
      </div>
    </div>
  );
}
