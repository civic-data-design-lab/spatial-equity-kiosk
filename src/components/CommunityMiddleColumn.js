import React, { useState } from 'react';
import CommunityProfile from './CommunityProfile';
import MapToggle from './MapToggle';

import _COMMUNITIES from '../texts/communities.json';
import _COUNCILS from '../texts/councildistricts.json';

export default function CommunityMiddleColumn({
  communitySearch,
  compareSearch,
  selectedSpecificIssue,
  setSelectedSpecificIssue,
  moreIssuesLength,
  setMoreIssues,
  moreIssues,
  setMoreIssuesLength,
  boundary,
  setSelectedChapter,
  setSelectedAbout,
  setCommunitySearch,
  addCompare,
  setCompareSearch,
  showMap,
  setShowMap,
  displayModes,
  setDisplayModes,
}) {
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
            selectedSpecificIssue={selectedSpecificIssue}
            communitySearch={communitySearch}
            setSelectedSpecificIssue={setSelectedSpecificIssue}
            compareSearch={compareSearch}
            moreIssues={moreIssues}
            setMoreIssues={setMoreIssues}
            moreIssuesLength={moreIssuesLength}
            setMoreIssuesLength={setMoreIssuesLength}
            boundary={boundary}
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
