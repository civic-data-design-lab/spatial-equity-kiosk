// import React and React hooks
import React from 'react';

// import components
import IssuesMiddleColumn from './IssuesMiddleColumn';
import IssuesTileView from './IssuesTileView';
import CommunityRightColumn from './CommunityRightColumn';
import CommunityMiddleColumn from './CommunityMiddleColumn';
import About from './About';

/**
 * Content.js renders the right-2 columns of the spatial equity web app
 */

export default function Content({
  selectedChapter,
  selectedIssue,
  setSelectedIssue,
  issues,
  selectedSpecificIssue,
  setSelectedSpecificIssue,
  showToggle,
  showMap,
  setShowMap,
  communitySearch,
  compareSearch,
  communities,
  demographic,
  setDemographic,
  selectedAbout,
  setSelectedAbout,
  setSelectedChapter,
  boundary,
  setCommunitySearch,
  setCompareSearch,
  showDemographics,
  setShowDemographics,
  moreIssues,
  setMoreIssues,
  moreIssuesLength,
  setMoreIssuesLength,
  councils,
  mapDemographics,
  setMapDemographics,
  colorRamps,
  toggleUnderperformers,
  setToggleUnderperformers,
  toggleTransit,
  toggleBike,
  toggleWalk,
  setToggleTransit,
  setToggleBike,
  setToggleWalk,
  dataScale,
  setdataScale,
  demoColorRamp,
  demoLegendBins,
  setDemoColorRamp,
  setDemoLegendBins,
  setColorRamps,
  handleLegend,
  zoomToggle,
  info,
  communityPinned,
  setCommunityPinned,
  councilPinned,
  setCouncilPinned,
  setCollapseMap,
  collapseMap,
  userPoints,
  setUserPoints,
  selectedCoord,
  setSelectedCoord,
  setSearchSource,
  addCompare,
  toggleDisplayMode,
  setToggleDisplayMode,
  displayModes,
  setDisplayModes,
}) {
  return (
    <div className={`d-flex flex-row col-9`}>
      <div
        className={`${!showMap ? `d-flex flex-column` : ''} middle-column
        h-100 ${
          selectedChapter === 1 || selectedChapter === 4 || !selectedChapter
            ? 'collapsed-middle-column'
            : selectedChapter === 2
            ? showMap && collapseMap
              ? 'collapsed-middle-column'
              : 'col-4 no-top-border'
            : !communitySearch && !compareSearch
            ? 'collapsed-middle-column'
            : !showMap
            ? 'col-6'
            : collapseMap
            ? 'collapsed-middle-column'
            : 'col-4 no-top-border'
        }
        ${
          selectedChapter === 3 && showMap
            ? 'middle-transition-community'
            : 'middle-transition'
        }
        `}
      >
        {(selectedChapter === 2 ||
          (selectedChapter === 3 &&
            (communitySearch || compareSearch) &&
            showMap)) && (
          <IssuesMiddleColumn
            selectedIssue={selectedIssue}
            setSelectedIssue={setSelectedIssue}
            selectedSpecificIssue={selectedSpecificIssue}
            setSelectedSpecificIssue={setSelectedSpecificIssue}
            demographic={demographic}
            setDemographic={setDemographic}
            communitySearch={communitySearch}
            compareSearch={compareSearch}
            showDemographics={showDemographics}
            setShowDemographics={setShowDemographics}
            mapDemographics={mapDemographics}
            setMapDemographics={setMapDemographics}
            boundary={boundary}
            colorRamps={colorRamps}
            toggleUnderperformers={toggleUnderperformers}
            setToggleUnderperformers={setToggleUnderperformers}
            selectedChapter={selectedChapter}
            toggleTransit={toggleTransit}
            setToggleTransit={setToggleTransit}
            toggleWalk={toggleWalk}
            setToggleWalk={setToggleWalk}
            toggleBike={toggleBike}
            setToggleBike={setToggleBike}
            dataScale={dataScale}
            setdataScale={setdataScale}
            demoColorRamp={demoColorRamp}
            demoLegendBins={demoLegendBins}
            setDemoColorRamp={setDemoColorRamp}
            setDemoLegendBins={setDemoLegendBins}
            setColorRamps={setColorRamps}
            handleLegend={handleLegend}
            zoomToggle={zoomToggle}
            showMap={showMap}
            info={info}
            setCollapseMap={setCollapseMap}
            collapseMap={collapseMap}
            userPoints={userPoints}
            setUserPoints={setUserPoints}
            setSelectedChapter={setSelectedChapter}
            setShowMap={setShowMap}
            toggleDisplayMode={toggleDisplayMode}
            setToggleDisplayMode={setToggleDisplayMode}
            displayModes={displayModes}
            setDisplayModes={setDisplayModes}
          />
        )}

        {selectedChapter === 3 && (
          <CommunityMiddleColumn
            communitySearch={communitySearch}
            compareSearch={compareSearch}
            selectedSpecificIssue={selectedSpecificIssue}
            issues={issues}
            communities={communities}
            setSelectedSpecificIssue={setSelectedSpecificIssue}
            moreIssues={moreIssues}
            setMoreIssues={setMoreIssues}
            moreIssuesLength={moreIssuesLength}
            setMoreIssuesLength={setMoreIssuesLength}
            boundary={boundary}
            councils={councils}
            info={info}
            setSelectedChapter={setSelectedChapter}
            setSelectedAbout={setSelectedAbout}
            setCommunitySearch={setCommunitySearch}
            addCompare={addCompare}
            setCompareSearch={setCompareSearch}
            showMap={showMap}
            setShowMap={setShowMap}
            displayModes={displayModes}
            setDisplayModes={setDisplayModes}
          />
        )}
      </div>

      <div
        className={`d-flex flex-column h-100 flex-grow-1 ${
          !selectedChapter || selectedChapter === 1 ? 'no-left-border' : ''
        } ${
          selectedChapter === 3 && communitySearch && !selectedSpecificIssue
            ? 'transparent-bg'
            : 'white-bg'
        }`}
        id="right-column"
        style={{ border: '2px solid black' }}
      >
        {(!selectedChapter || selectedChapter === 1) && (
          <iframe
            className={'video'}
            src="https://player.vimeo.com/video/764327090?h=daa89e38e4&color=ffffff&title=0&byline=0&portrait=0"
            height="100%"
            frameborder="0"
            controls="0"
            background="true"
          ></iframe>
        )}

        {selectedChapter === 2 && (
          <IssuesTileView
            selectedSpecificIssue={selectedSpecificIssue}
            specificIssue={issues.specific_issues_data[selectedSpecificIssue]}
            showToggle={showToggle}
            showMap={showMap}
            setShowMap={setShowMap}
            selectedIssue={selectedIssue}
            selectedChapter={selectedChapter}
            communitySearch={communitySearch}
            compareSearch={compareSearch}
            boundary={boundary}
            demographic={demographic}
            showDemographics={showDemographics}
            moreIssues={moreIssues}
            setMoreIssues={setMoreIssues}
            moreIssuesLength={moreIssuesLength}
            setMoreIssuesLength={setMoreIssuesLength}
            setSelectedSpecificIssue={setSelectedSpecificIssue}
            colorRamps={colorRamps}
            setSelectedChapter={setSelectedChapter}
            setCommunitySearch={setCommunitySearch}
            communities={communities}
            councils={councils}
            communityPinned={communityPinned}
            setCommunityPinned={setCommunityPinned}
            councilPinned={councilPinned}
            setCouncilPinned={setCouncilPinned}
            collapseMap={collapseMap}
            userPoints={userPoints}
            setUserPoints={setUserPoints}
            selectedCoord={selectedCoord}
            setSelectedCoord={setSelectedCoord}
            setSearchSource={setSearchSource}
            toggleDisplayMode={toggleDisplayMode}
            setToggleDisplayMode={setToggleDisplayMode}
            displayModes={displayModes}
            setDisplayModes={setDisplayModes}
          />
        )}

        {selectedChapter === 3 && (
          <CommunityRightColumn
            communitySearch={communitySearch}
            compareSearch={compareSearch}
            selectedSpecificIssue={selectedSpecificIssue}
            showMap={showMap}
            setShowMap={setShowMap}
            showToggle={showToggle}
            selectedIssue={selectedIssue}
            selectedChapter={selectedChapter}
            boundary={boundary}
            demographic={demographic}
            showDemographics={showDemographics}
            setSelectedSpecificIssue={setSelectedSpecificIssue}
            moreIssues={moreIssues}
            setMoreIssues={setMoreIssues}
            moreIssuesLength={moreIssuesLength}
            setMoreIssuesLength={setMoreIssuesLength}
            setSelectedChapter={setSelectedChapter}
            setCommunitySearch={setCommunitySearch}
          />
        )}

        {selectedChapter === 4 && (
          <About
            issues={issues}
            selectedAbout={selectedAbout}
            setSelectedChapter={setSelectedChapter}
          />
        )}
      </div>
    </div>
  );
}
