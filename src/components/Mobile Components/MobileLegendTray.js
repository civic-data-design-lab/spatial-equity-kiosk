import Legend from '../Legend';
import Demographics from '../Demographics';
import MapNotableIndicators from '../MapNotableIndicators';

export default function MobileLegendTray({
  showMap,
  boundary,
  issues,
  selectedSpecificIssue,
  setShowDemographics,
  showDemographics,
  showLegend,
  isTouchingMapMobile,
  mapDemographics,
  demoLookup,
  setShowLegend,
  demoLegendBins,
  demographic,
  dataScale,
  setdataScale,
  colorRamps,
  toggleUnderperformers,
  setToggleUnderperformers,
  demoColorRamp,
  handleLegend,
  zoomToggle,
  binList,
  info,
  selectedChapter,
  setDemographic,
  communitySearch,
  compareSearch,
  setMapDemographics,
  communities,
  councils,
  toggleTransit,
  setToggleTransit,
  toggleBike,
  setToggleBike,
  toggleWalk,
  setToggleWalk,
  setDemoColorRamp,
  setDemoLegendBins,
  selectedCommunity,
  setSelectedSpecificIssue,
  showNotableTray,
  setShowNotableTray,
}) {
  return (
    <div style={{ backgroundColor: 'white', pointerEvents: 'auto' }}>
      <div>
        <div
          className={`mobile-demographics-toggle inactive-scheme`}
          onClick={() => {
            if (!showMap) {
              setShowDemographics(!showDemographics);
            } else {
              setShowDemographics(true);
              setShowLegend(!showLegend);
              isTouchingMapMobile.current = false;
            }
          }}
        >
          <div className="w-100 d-flex flex-column align-items-center">
            <div
              style={{
                transition: '0.5s ease-in-out',
                backgroundColor: 'black',
                width: '8%',
                height: '6px',
                borderRadius: '1rem',
                marginBottom: '0.5rem',
              }}
            ></div>

            <Legend
              isMobile={true}
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
              toggleUnderperformers={toggleUnderperformers}
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
        </div>
        {!mapDemographics && (
          <MapNotableIndicators
            isMobile={true}
            selectedCommunity={selectedCommunity}
            communitySearch={communitySearch}
            councilData={communitySearch ? councils[communitySearch] : null}
            communities={communitySearch ? communities[communitySearch] : null}
            setSelectedSpecificIssue={setSelectedSpecificIssue}
            issues={issues}
            boundary={boundary}
            selectedSpecificIssue={selectedSpecificIssue}
            isTouchingMapMobile={isTouchingMapMobile}
            showLegend={showLegend}
            showNotableTray={showNotableTray}
            setShowNotableTray={setShowNotableTray}
          />
        )}

        {/*map mode - bottom tray details fourth child */}
        <div
          className={'mobile-demographics-container'}
          style={{
            transition: '0.5s',
            overflow: 'hidden',
            maxHeight: showLegend || mapDemographics ? '100vh' : '0',
          }}
        >
          <div
            className={'d-flex flex-column justify-content-between'}
            style={{
              padding: '1rem',
            }}
          >
            {(showLegend || !mapDemographics) && (
              <p className={'small-font mb-1'}>Compare Demographics</p>
            )}

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
                colorRamps={colorRamps}
                demoColorRamp={demoColorRamp}
                demoLegendBins={demoLegendBins}
                setDemoColorRamp={setDemoColorRamp}
                setDemoLegendBins={setDemoLegendBins}
                demoLookup={demoLookup[demographic]}
                showMap={showMap}
                info={info}
                // mobile only
                isMobile={true}
                showLegend={showLegend}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
