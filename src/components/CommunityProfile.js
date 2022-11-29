// import React and React Hooks
import React, { useEffect, useState } from 'react';

// Import components
import IssuesCard from './IssuesCard';
import IssuesTags from './IssuesTags';
import RightColumnHeader from './RightColumnHeader';

// import text and/or data
import _COUNCILS from '../texts/councildistricts.json';
import _COMMUNITIES from '../texts/communities.json';


/**
 * CommunityProfile.js renders the Community Profiles section of the navigation 
 * which includes the community and compare search box as well as the typewriter effect
 * @constructor
 * @param {int} selectedSpecificIssue - integer representing the current actively toggled metric
 * @param {Function} setSelectedSpecificIssue - callback function that updates the app's selectedSpecificIssue state, changes the current actively toggled metric
 * @param {string} communitySearch - user's query for community (primary)
 * @param {Function} setCommunitySearch - function to set the app's current (primary) community search
 * @param {string} compareSearch - user's query for community they want to compare the primary search with
 * @param {Function} setCompareSearch - function to set the app's current (secondary) compare search 
 * @param {number} moreIssuesLength - how many items are in the moreIssues state
 * @param {Function} setMoreIssues - update the app's more issues state
 * @param {int[]} moreIssues - list of integers which represent the non-notable indicators user has toggled for display 
 * @param {Function} moreIssuesLength - update the app's more issues length state
 * @param {string} boundary - string representing the toggled active boundary (either 'council' or 'community').
 * @param {Function} setSelectedChapter -function to set the current active chapter of the web app (either 1, 2, 3, or 4).
 * @param {Function} setSelectedAbout - function to set the section of the About page which to scroll to when navigating there 
 * @param {} displayModes - TODO;
 * @param {} setDisplayModes - TODO;
 * @param {boolean} isMobile - whether to display the mobile or web version, based on inner width and inner height of screen.
  * 
 */

export default function CommunityProfile({
  selectedSpecificIssue,
  communitySearch,
  setSelectedSpecificIssue,
  compareSearch,
  setMoreIssues,
  moreIssuesLength,
  moreIssues,
  setMoreIssuesLength,
  boundary,
  setSelectedChapter,
  setSelectedAbout,
  setCommunitySearch,
  addCompare,
  setCompareSearch,
  displayModes,
  setDisplayModes,
  isMobile = false,
}) {


  const selectedCommunity = communitySearch
    ? boundary == 'council'
      ? _COUNCILS[communitySearch]
      : _COMMUNITIES[communitySearch]
    : null;

  
  useEffect(() => {
    // make sure moreIssues never contains the noteable indicators 
    // avoid noteable indicators from showing up in the more issues section
    if (moreIssues && communitySearch && !compareSearch) {
      let leastPerfIssues =
        _COUNCILS[communitySearch]?.least_performing_issues ||
        _COMMUNITIES[communitySearch]?.least_performing_issues;

      let newMoreIssues = moreIssues.filter(
        (issue) => !leastPerfIssues.includes(issue)
      );
      setMoreIssues(newMoreIssues);
      setMoreIssuesLength(newMoreIssues.length);
    }

    if (selectedSpecificIssue && communitySearch) {

      // make sure issue card for selected specific issue is showing
      // if it is not part of noteable indicators or in more issues, add it to more issues

      if (moreIssues) {
        let leastPerfIssues =
          _COUNCILS[communitySearch]?.least_performing_issues ||
          _COMMUNITIES[communitySearch]?.least_performing_issues;
        if (
          !leastPerfIssues.includes(selectedSpecificIssue) &&
          moreIssues &&
          !moreIssues.includes(selectedSpecificIssue)
        ) {
          let newMoreIssues = moreIssues;
          newMoreIssues.push(selectedSpecificIssue);
          setMoreIssues(newMoreIssues);
          setMoreIssuesLength(newMoreIssues.length);
        }
      } else {
        setMoreIssues([selectedSpecificIssue]);
        setMoreIssuesLength(1);
      }
    }
  }, [selectedSpecificIssue, communitySearch, compareSearch, compareSearch]);


  return (
    <div className={'community-profile-container'}>
      {!compareSearch ? (
        <>
          <RightColumnHeader
            type="notable"
            displayModes={displayModes}
            isMobile={isMobile}
          />

          <div className={'d-flex flex-column cards-column'}>
            {(_COMMUNITIES[communitySearch] &&
              _COMMUNITIES[communitySearch].least_performing_issues.map(
                (issue, index) => {
                  return (
                    <div key={index}>
                      <IssuesCard
                        issueIdx={issue}
                        isMobile={isMobile}
                        displayModes={displayModes}
                        setDisplayModes={setDisplayModes}
                        setCompareSearch={setCompareSearch}
                        addCompare={addCompare}
                        target={
                          selectedSpecificIssue &&
                          selectedSpecificIssue !== issue
                            ? false
                            : true
                        }
                        setCommunitySearch={setCommunitySearch}
                        communitySearch={communitySearch}
                        compareSearch={compareSearch}
                        selectedCommunity={selectedCommunity}
                        boundary={boundary}
                        selectedSpecificIssue={selectedSpecificIssue}
                        setSelectedSpecificIssue={setSelectedSpecificIssue}
                        setSelectedChapter={setSelectedChapter}
                        setSelectedAbout={setSelectedAbout}
                      />
                    </div>
                  );
                }
              )) ||
              (_COUNCILS[communitySearch] &&
                _COUNCILS[communitySearch].least_performing_issues.map(
                  (issue, index) => {
                    return (
                      <div key={index}>
                        <IssuesCard
                          issueIdx={issue}
                          isMobile={isMobile}
                          displayModes={displayModes}
                          setDisplayModes={setDisplayModes}
                          setCompareSearch={setCompareSearch}
                          addCompare={addCompare}
                          target={
                            selectedSpecificIssue &&
                            selectedSpecificIssue !== issue
                              ? false
                              : true
                          }
                          setCommunitySearch={setCommunitySearch}
                          communitySearch={communitySearch}
                          compareSearch={compareSearch}
                          selectedCommunity={selectedCommunity}
                          boundary={boundary}
                          selectedSpecificIssue={selectedSpecificIssue}
                          setSelectedSpecificIssue={setSelectedSpecificIssue}
                          setSelectedChapter={setSelectedChapter}
                          setSelectedAbout={setSelectedAbout}
                        />
                      </div>
                    );
                  }
                ))}
          </div>

          <RightColumnHeader type="more issues" isMobile={isMobile} />

          <div className={'cards-column'}>
            <IssuesTags
              isMobile={isMobile}
              displayModes={displayModes}
              setDisplayModes={setDisplayModes}
              setCompareSearch={setCompareSearch}
              addCompare={addCompare}
              leastPerforming={
                (_COMMUNITIES[communitySearch] &&
                  _COMMUNITIES[communitySearch].least_performing_issues) ||
                (_COUNCILS[communitySearch] &&
                  _COUNCILS[communitySearch].least_performing_issues)
              }
              setSelectedSpecificIssue={setSelectedSpecificIssue}
              selectedSpecificIssue={selectedSpecificIssue}
              moreIssues={moreIssues}
              setMoreIssues={setMoreIssues}
              moreIssuesLength={moreIssuesLength}
              setMoreIssuesLength={setMoreIssuesLength}
              compareSearch={compareSearch}
              communitySearch={communitySearch}
              boundary={boundary}
              selectedCommunity={selectedCommunity}
              setSelectedChapter={setSelectedChapter}
              setSelectedAbout={setSelectedAbout}
              setCommunitySearch={setCommunitySearch}
            />
          </div>
        </>
      ) : (
        <>
          <div className={'cards-column'}>
            <IssuesTags
              isMobile={isMobile}
              displayModes={displayModes}
              setDisplayModes={setDisplayModes}
              setCompareSearch={setCompareSearch}
              addCompare={addCompare}
              leastPerforming={
                (_COMMUNITIES[communitySearch] &&
                  _COMMUNITIES[communitySearch].least_performing_issues) ||
                (_COUNCILS[communitySearch] &&
                  _COUNCILS[communitySearch].least_performing_issues)
              }
              setSelectedSpecificIssue={setSelectedSpecificIssue}
              selectedSpecificIssue={selectedSpecificIssue}
              moreIssues={moreIssues}
              setMoreIssues={setMoreIssues}
              moreIssuesLength={moreIssuesLength}
              setMoreIssuesLength={setMoreIssuesLength}
              compareSearch={compareSearch}
              communitySearch={communitySearch}
              boundary={boundary}
              selectedCommunity={selectedCommunity}
              setSelectedChapter={setSelectedChapter}
              setSelectedAbout={setSelectedAbout}
              setCommunitySearch={setCommunitySearch}
            />
          </div>
        </>
      )}
    </div>
  );
}
