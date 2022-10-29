import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import IssuesCard from './IssuesCard';

import _ISSUES from '../texts/issues.json';

export default function IssuesTags({
  leastPerforming,
  setSelectedSpecificIssue,
  selectedSpecificIssue,
  setModal,
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
  // TODO: all tags when communitySearch && compareSearch

  /*useEffect(() => {
        if (selectedSpecificIssue && !leastPerforming.includes(selectedSpecificIssue)) {
            setMoreIssues([selectedSpecificIssue])
            setMoreIssuesLength(1)
        }
    }, [])*/

  return (
    <div className={'more-issues-container cards-column'}>
      {moreIssues.length > 0 && (
        <div className={'d-flex flex-column'}>
          {moreIssues.map((issue, index) => {
            return (
              <div
                key={index}
                // className={
                //   selectedSpecificIssue && selectedSpecificIssue !== issue
                //     ? 'opacity-50'
                //     : ''
                // }
              >
                <IssuesCard
                  isMobile={isMobile}
                  target={
                    selectedSpecificIssue && selectedSpecificIssue !== issue
                      ? false
                      : true
                  }
                  selectedSpecificIssue={selectedSpecificIssue}
                  specificIssue={issue}
                  setSelectedSpecificIssue={setSelectedSpecificIssue}
                  setModal={setModal}
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
