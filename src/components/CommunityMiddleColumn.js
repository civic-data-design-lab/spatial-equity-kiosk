import React, { useState } from 'react';
import CommunityProfile from './CommunityProfile';
import MapToggle from './MapToggle';

import _COMMUNITIES from '../texts/communities.json';
import _COUNCILS from '../texts/councildistricts.json';

/**
 * CommunityMiddleColumn.js renders the middle column that appears when a user
 * has put in a community search. The column displays the queried community's name, map toggle and the query's community's profile
 * 
 * @constructor
 * @param {string} communitySearch - user's query for community (primary)
 * @param {string} compareSearch - user's query for community they want to compare the primary search with
 * @param {number} selectedSpecificIssue - user's actively selected metric
 * @param {Function} setSelectedSpecificIssue - callback to update app's metric state
 * @param {number} moreIssuesLength - how many items are in the moreIssues state
 * @param {Function} setMoreIssues - update the app's more issues state
 * @param {int[]} moreIssues - list of integers which represent the non-notable indicators user has toggled for display 
 * @param {Function} moreIssuesLength - update the app's more issues length state
 * @param {string} boundary - string representing the toggled active boundary (either 'council' or 'community').
 * @param {Function} setSelectedChapter - function to set the current active chapter of the web app (either 1, 2, 3, or 4).
 * @param {Function} setSelectedAbout - function to set the section of the About page which to scroll to when navigating there 
 * @param {Function} setCommunitySearch - function to set the app's current (primary) community search
 * @param {boolean} addCompare - whether or not the user has compare mode on
 * @param {Function} setCompareSearch - function to set the app's current (secondary) compare search 
 * @param {boolean} showMap - if the user is on map view
 * @param {Function} setShowMap - update the app's showMap state
 * @param {} displayModes - TODO;
 * @param {} setDisplayModes - TODO;
 */

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
