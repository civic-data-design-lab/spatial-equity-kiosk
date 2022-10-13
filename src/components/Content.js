import React from 'react';
import IssuesMiddleColumn from './IssuesMiddleColumn';
import IssuesTileView from './IssuesTileView';
import CommunityRightColumn from './CommunityRightColumn';
import CommunityMiddleColumn from './CommunityMiddleColumn';
import About from './About';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

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
  issue_categories,
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
  demoLookup,
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
}) {
  return (
    <div className={`d-flex flex-row col-9`}>
      <div
        className={`${!showMap ? `d-flex flex-column` : ''} middle-column
        middle-transition
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
        }`}
      >
        {(selectedChapter === 2 ||
          (selectedChapter === 3 &&
            (communitySearch || compareSearch) &&
            showMap)) && (
          <IssuesMiddleColumn
            selectedIssue={selectedIssue}
            setSelectedIssue={setSelectedIssue}
            issues={issues}
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
            communities={communities}
            councils={councils}
            colorRamps={colorRamps}
            toggleUnderperformers={toggleUnderperformers}
            setToggleUnderperformers={setToggleUnderperformers}
            selectedChapter={selectedChapter}
            issue_categories={issue_categories}
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
            demoLookup={demoLookup}
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
      >
        {(!selectedChapter || selectedChapter === 1) && (
          <iframe
            className={'video'}
            src="https://www.youtube.com/embed/tSGOYpNTc8k"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}

        {selectedChapter === 2 && (
          <IssuesTileView
            selectedSpecificIssue={selectedSpecificIssue}
            issues={issues}
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
          />
        )}

        {selectedChapter === 3 && (
          <CommunityRightColumn
            communitySearch={communitySearch}
            compareSearch={compareSearch}
            selectedSpecificIssue={selectedSpecificIssue}
            issues={issues}
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
