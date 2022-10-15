import React, { useState } from 'react';
import CommunityProfile from './CommunityProfile';
import MapToggle from './MapToggle';

export default function CommunityMiddleColumn({
  communitySearch,
  compareSearch,
  issues,
  selectedSpecificIssue,
  communities,
  setSelectedSpecificIssue,
  moreIssuesLength,
  setMoreIssues,
  moreIssues,
  setMoreIssuesLength,
  boundary,
  councils,
  setSelectedChapter,
  setSelectedAbout,
  setCommunitySearch,
  addCompare,
  setCompareSearch,
  showMap,
  setShowMap,
}) {
  const [displayModes, setDisplayModes] = useState({});
  return (
    <>
      {communitySearch && (
        <>
          <div className={'d-flex flex-column position-relative'}>
            <div
              className={`${'issues-chapters-active'} collapse-issue issues-chapters top-border transition-height`}
              style={{
                height: communitySearch ? 'auto' : '0',
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
                <h6 className="mb-0" style={{ cursor: 'default' }}>
                  {compareSearch ? 'Compare ' : ''}
                  {communitySearch
                    ? boundary == 'council'
                      ? councils[communitySearch]
                        ? `City Council ${councils[communitySearch].name}`
                        : ''
                      : communities[communitySearch]
                      ? !compareSearch
                        ? `${communities[communitySearch].name
                            .split(' ')
                            .slice(0, -1)
                            .join(' ')} Community Board ${communities[
                            communitySearch
                          ].name
                            .split(' ')
                            .slice(-1)}`
                        : `${communities[communitySearch].name}`
                      : ''
                    : ''}
                  {compareSearch ? ' & ' : ''}
                  {compareSearch
                    ? boundary == 'council'
                      ? councils[compareSearch]
                        ? `${councils[compareSearch].name}`
                        : ''
                      : communities[compareSearch]
                      ? `${communities[compareSearch].name}`
                      : ''
                    : ''}
                </h6>
                <MapToggle
                  showToggle={true}
                  showMap={showMap}
                  setShowMap={setShowMap}
                  boundary={boundary}
                  selectedSpecificIssue={selectedSpecificIssue}
                  displayModes={displayModes}
                  setDisplayModes={setDisplayModes}
                  isCommunityProfile={true}
                />
              </div>
            </div>
          </div>

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
            selectedCommunity={communitySearch}
            setCommunitySearch={setCommunitySearch}
            addCompare={addCompare}
            setCompareSearch={setCompareSearch}
            displayModes={displayModes}
            setDisplayModes={setDisplayModes}
          />
        </>
      )}
    </>
  );
}
