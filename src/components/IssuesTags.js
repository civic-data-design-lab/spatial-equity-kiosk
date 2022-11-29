// import React and React hooks
import React from 'react';

// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// import components
import IssuesCard from './IssuesCard';

// import data and / or text
import _ISSUES from '../texts/issues.json';


/**
 * IssuesTags.js renders the section of tags.
 * @constructor
 * @param {int[]} leastPerforming - list of integers representing the least performing issues of the current selected community
 * @param {Function} setSelectedSpecificIssue - callback function that updates app's selectedSpecificIssue state
 * @param {int} selectedSpecificIssue - integer representing the current actively toggled metric
 * @param {number} moreIssuesLength - how many items are in the moreIssues state
 * @param {Function} setMoreIssues - update the app's more issues state
 * @param {int[]} moreIssues - list of integers which represent the non-notable indicators user has toggled for display 
 * @param {Function} moreIssuesLength - update the app's more issues length state
 * @param {string} compareSearch - user's query for community they want to compare the primary search with
 * @param {string} communitySearch - user's query for community (primary)
 * @param {string} boundary - string representing the toggled active boundary (either 'council' or 'community').
 * @param {Object} selectedCommunity - Object of info for current community search
 * @param {Function} setSelectedChapter - function to set the current active chapter of the web app (either 1, 2, 3, or 4).
 * @param {Function} setSelectedAbout - function to set the section of the About page which to scroll to when navigating there 
 * @param {Function} setCommunitySearch - function to set the app's current (primary) community search
 * @param {boolean} addCompare - whether or not the user has compare mode on
 * @param {Function} setCompareSearch - function to set the app's current (secondary) compare search 
 * 
 */


export default function IssuesTags({
  leastPerforming,
  setSelectedSpecificIssue,
  selectedSpecificIssue,
  moreIssues,
  setMoreIssues,
  setMoreIssuesLength,
  compareSearch,
  communitySearch,
  boundary,
  selectedCommunity,
  setSelectedChapter,
  setSelectedAbout,
  setCommunitySearch,
  addCompare,
  setCompareSearch,
  displayModes,
  setDisplayModes,

  // mobile only
  isMobile = false,
}) {


  return (
    <div className={'more-issues-container cards-column'}>

      {/* selected tags become cards */}

      {moreIssues.length > 0 && (
        <div className={'d-flex flex-column'}>
          {moreIssues.map((issue, index) => {
            return (
              <div
                key={index}
              >
                <IssuesCard
                  issueIdx={issue}
                  isMobile={isMobile}
                  target={
                    selectedSpecificIssue && selectedSpecificIssue !== issue
                      ? false
                      : true
                  }
                  selectedSpecificIssue={selectedSpecificIssue}
                  specificIssue={issue}
                  setSelectedSpecificIssue={setSelectedSpecificIssue}
                  forMoreIssues={true}
                  setMoreIssues={setMoreIssues}
                  moreIssues={moreIssues}
                  boundary={boundary}
                  selectedCommunity={selectedCommunity}
                  setSelectedChapter={setSelectedChapter}
                  setSelectedAbout={setSelectedAbout}
                  compareSearch={compareSearch}
                  communitySearch={communitySearch}
                  setCommunitySearch={setCommunitySearch}
                  addCompare={addCompare}
                  setCompareSearch={setCompareSearch}
                  displayModes={displayModes}
                  setDisplayModes={setDisplayModes}
                />
              </div>
            );
          })}
        </div>
      )}

      {!compareSearch ? (
        <div className={'issue-tags-container'}>
          {_ISSUES.all_issues_id
            .filter(
              (id) =>
                leastPerforming &&
                !leastPerforming.includes(id) &&
                moreIssues &&
                !moreIssues.includes(id)
            )
            .map((id, index) => {
              return (
                <div
                  key={index}
                  className={`${
                    moreIssues && !moreIssues.includes(id)
                      ? 'inactive-tag'
                      : 'active-tag'
                  } issues-tag small-col-gap`}
                  onClick={() => {
                    if (moreIssues && !moreIssues.includes(id)) {
                      let newMoreIssues = moreIssues;
                      newMoreIssues.push(id);
                      setMoreIssues(newMoreIssues);
                      setMoreIssuesLength(moreIssues + 1);
                    } else {
                      let newMoreIssues = moreIssues;
                      newMoreIssues = newMoreIssues.filter(
                        (issue) => issue !== id
                      );
                      setMoreIssues(newMoreIssues);
                      setMoreIssuesLength(moreIssues - 1);
                    }
                  }}
                >
                  <p className={'m-0 small-font'}>
                    {id !== 6 && id !== 5
                      ? _ISSUES.specific_issues_data[id].specific_issue_name
                      : _ISSUES.specific_issues_data[id].specific_issue_ID === 6
                      ? 'Permeable Surface Area'
                      : 'Surface Temperature'}
                  </p>
                  {moreIssues && !moreIssues.includes(id) ? (
                    <FontAwesomeIcon icon={faPlus} />
                  ) : (
                    <FontAwesomeIcon icon={faPlus} />
                  )}
                </div>
              );
            })}
        </div>
      ) : (
        <div className={'issue-tags-container'}>
          {_ISSUES.all_issues_id
            .filter((id) => moreIssues && !moreIssues.includes(id))
            .map((id, index) => {
              return (
                <div
                  key={index}
                  className={`${
                    moreIssues && !moreIssues.includes(id)
                      ? 'inactive-tag'
                      : 'active-tag'
                  } issues-tag small-col-gap`}
                  onClick={() => {
                    if (moreIssues && !moreIssues.includes(id)) {
                      let newMoreIssues = moreIssues;
                      newMoreIssues.push(id);
                      setMoreIssues(newMoreIssues);
                      setMoreIssuesLength(moreIssues + 1);
                    } else {
                      let newMoreIssues = moreIssues;
                      newMoreIssues = newMoreIssues.filter(
                        (issue) => issue !== id
                      );
                      setMoreIssues(newMoreIssues);
                      setMoreIssuesLength(moreIssues - 1);
                    }
                  }}
                >
                  <p className={'m-0 small-font'}>
                    {id !== 6 && id !== 5
                      ? _ISSUES.specific_issues_data[id].specific_issue_name
                      : _ISSUES.specific_issues_data[id].specific_issue_ID === 6
                      ? 'Permeable Surface Area'
                      : 'Surface Temperature'}
                  </p>
                  {moreIssues && !moreIssues.includes(id) ? (
                    <FontAwesomeIcon icon={faPlus} />
                  ) : (
                    <FontAwesomeIcon icon={faPlus} />
                  )}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
