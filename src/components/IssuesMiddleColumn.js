import React, { useEffect } from 'react';
import IssuesDropDown from './IssuesDropDown';
import Demographics from './Demographics';
import Legend from './Legend';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import _RANKINGS from '../data/rankings.json';
import _COUNCILDISTRICTS from '../texts/councildistricts.json';
import categories from '../texts/issue_categories.json';

export default function IssuesMiddleColumn({
  issues,
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
  communities,
  councils,
  colorRamps,
  toggleUnderperformers,
  setToggleUnderperformers, //legendBins,
  selectedChapter,
  issue_categories,
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
  demoLookup,
  showMap,
  binList,
  info,
  setSelectedChapter,
  setShowMap,
}) {
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

  // console.log("demoLegend in issuesmiddle ", demoLegendBins)

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

  useEffect(() => {
    if (!selectedIssue) {
      setShowDemographics(false);
      //setDemographic(null)
    }
  });

  /*    useEffect(() => {
                console.log("in use effect")
                if (!selectedSpecificIssue) {
                    setShowDemographics(false)
                    console.log(showDemographics)
                }
            }, [selectedSpecificIssue])*/

  return (
    <div
      className={'d-flex flex-column position-relative'}
      style={{ height: '100vh' }}
    >
      <div
        className={`${selectedIssue === 1 ? 'issues-chapters-active' : ''} ${
          selectedIssue || showDemographics ? 'collapse-issue' : ''
        } issues-chapters top-border`}
        onClick={() => {
          setSelectedSpecificIssue(null);
          if (selectedIssue !== 1) {
            setSelectedIssue(1);
            setColorRamps('health');
          } else {
            setSelectedIssue(null);
            setShowDemographics(null);
          }
        }}
      >
        <h5 className={`${selectedIssue ? 'mb-0' : ''}`}>Health</h5>
        <p className={`${selectedIssue ? 'invis' : 'vis'} mb-0`}>
          Policies about the use of public space in New York City affect the
          physical and mental health of New Yorkers. Health indicators of
          spatial equity include air pollution, asthma, noise pollution, traffic
          injuries, and traffic fatalities.
        </p>
      </div>

      <div
        className={`${
          selectedIssue === 1 ? 'expand-issue' : ''
        } accordion-body`}
      >
        <div className={'position-relative d-flex flex-column row-gap'}>
          <IssuesDropDown
            items={health_issues}
            currentValue={selectedSpecificIssue}
            setValue={setSelectedSpecificIssue}
            setShowDemographics={setShowDemographics}
            issues={issues}
            issue_categories={issue_categories}
            showDemographics={showDemographics}
          />

          {(!showMap || !showDemographics) && (
            <div className={''}>
              {!selectedSpecificIssue ? (
                <p>{issue_categories.descriptions[selectedIssue]}</p>
              ) : (
                <div>
                  <div>
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
            </div>
          )}

          {/*{!showDemographics && <p className={"small-font m-0"}></p>}*/}
          {showMap && (
            <Legend
              setShowMap={setShowMap}
              mapDemographics={mapDemographics}
              demoColorRamp={demoColorRamp}
              demoLegendBins={demoLegendBins}
              demoLookup={demoLookup}
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
              setSelectedSpecificIssue={setSelectedSpecificIssue}
              setSelectedChapter={setSelectedChapter}
            />
          )}
        </div>
      </div>

      <div
        className={`${
          selectedIssue === 2
            ? 'issues-chapters-active'
            : selectedIssue === 1
            ? 'top-border'
            : ''
        } ${
          selectedIssue || showDemographics ? 'collapse-issue' : ''
        } issues-chapters`}
        onClick={() => {
          //setShowDemographics(false)
          setSelectedSpecificIssue(null);
          //setCommunitySearch(null)
          //setCompareSearch(null)
          if (selectedIssue !== 2) {
            setSelectedIssue(2);
            setColorRamps('env');
          } else {
            setSelectedIssue(null);
            setShowDemographics(null);
          }
        }}
      >
        <h5 className={`${selectedIssue ? 'mb-0 pe-none' : ''}`}>
          Environment
        </h5>
        <p className={`${selectedIssue ? 'invis' : 'vis'} mb-0`}>
          Policies about the use of public space in New York City affect the
          resilience and sustainability of the physical environment.
          Environmental indicators of spatial equity include heat, parkland,
          permeable surfaces, and trees.
        </p>
      </div>
      <div
        className={`${
          selectedIssue === 2 ? 'expand-issue' : ''
        } accordion-body`}
      >
        <div className={'position-relative d-flex flex-column row-gap'}>
          <IssuesDropDown
            items={environment_issues}
            currentValue={selectedSpecificIssue}
            setValue={setSelectedSpecificIssue}
            setShowDemographics={setShowDemographics}
            issues={issues}
            issue_categories={issue_categories}
            showDemographics={showDemographics}
          />

          {(!showMap || !showDemographics) && (
            <div className={''}>
              {!selectedSpecificIssue ? (
                <p>{issue_categories.descriptions[selectedIssue]}</p>
              ) : (
                <div>
                  <div>
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
            </div>
          )}

          {/*{!showDemographics && <p className={"small-font m-0"}></p>}*/}
          {showMap && (
            <Legend
              setShowMap={setShowMap}
              mapDemographics={mapDemographics}
              demoColorRamp={demoColorRamp}
              demoLegendBins={demoLegendBins}
              demoLookup={demoLookup}
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
              setSelectedSpecificIssue={setSelectedSpecificIssue}
              setSelectedChapter={setSelectedChapter}
            />
          )}
        </div>
      </div>
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
          setSelectedSpecificIssue(null);
          //setShowDemographics(false)
          //setCommunitySearch(null)
          //setCompareSearch(null)
          if (selectedIssue !== 3) {
            setSelectedIssue(3);
            setColorRamps('infra');
          } else {
            setSelectedIssue(null);
            setShowDemographics(null);
          }
        }}
      >
        <h5 className={`${selectedIssue ? 'mb-0' : ''}`}>Mobility</h5>
        <p className={`${selectedIssue ? 'invis' : 'vis'} mb-0`}>
          Policies about the use of public space in New York City affect
          mobility and access to the built environment. Mobility indicators of
          spatial equity include bike parking, bus lanes and busways, bus
          speeds, protected bike lanes, seating, and traffic density.
        </p>
      </div>
      <div
        className={`${
          selectedIssue === 3 ? 'expand-issue' : ''
        } accordion-body`}
      >
        <div className={'position-relative d-flex flex-column row-gap'}>
          <IssuesDropDown
            items={infrastructure_issues}
            currentValue={selectedSpecificIssue}
            setValue={setSelectedSpecificIssue}
            setShowDemographics={setShowDemographics}
            issues={issues}
            issue_categories={issue_categories}
            showDemographics={showDemographics}
          />

          {(!showMap || !showDemographics) && (
            <div className={''}>
              {!selectedSpecificIssue ? (
                <p>{issue_categories.descriptions[selectedIssue]}</p>
              ) : (
                <div>
                  <div>
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
            </div>
          )}

          {/*{!showDemographics && <p className={"small-font m-0"}></p>}*/}
          {showMap && (
            <Legend
              setShowMap={setShowMap}
              mapDemographics={mapDemographics}
              demoColorRamp={demoColorRamp}
              demoLegendBins={demoLegendBins}
              demoLookup={demoLookup}
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
              setSelectedSpecificIssue={setSelectedSpecificIssue}
              setSelectedChapter={setSelectedChapter}
            />
          )}
        </div>
      </div>

      <div
        className={`collapse-issue transition-height
                ${selectedIssue ? 'some-height' : 'no-height'}
                ${
                  showDemographics ? 'bottom-border issues-chapters-active' : ''
                } ${selectedIssue === 3 ? 'top-border' : ''} issues-chapters`}
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
                transition-height ${selectedIssue ? 'some-height' : 'no-height'}
                `}
        >
          <h5 className={`${showDemographics ? 'mb-0' : 'mb-0'}`}>
            {showDemographics
              ? 'Hide U.S. Census Data'
              : 'Show U.S. Census Data'}
          </h5>
          {showDemographics ? (
            <FontAwesomeIcon icon={faMinus} />
          ) : (
            <FontAwesomeIcon icon={faPlus} />
          )}
        </div>
      </div>

      <div
        className={`${showDemographics ? 'expand-issue' : ''} accordion-body`}
      >
        <div className={'h-100 position-relative'}>
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
            colorRamps={colorRamps}
            demoColorRamp={demoColorRamp}
            demoLegendBins={demoLegendBins}
            setDemoColorRamp={setDemoColorRamp}
            setDemoLegendBins={setDemoLegendBins}
            demoLookup={demoLookup}
            showMap={showMap}
            info={info}
          />
        </div>
      </div>
    </div>
  );
}
