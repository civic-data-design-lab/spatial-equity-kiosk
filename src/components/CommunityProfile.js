import React, { useEffect, useState } from 'react';
import IssuesCard from './IssuesCard';
import IssuesTags from './IssuesTags';
import RightColumnHeader from './RightColumnHeader';

import _COUNCILS from '../texts/councildistricts.json';
import _COMMUNITIES from '../texts/communities.json';

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

  // mobile only
  isMobile = false,
}) {
  useEffect(() => {
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

  const [modal, setModal] = useState(null);

  const selectedCommunity = communitySearch
    ? boundary == 'council'
      ? _COUNCILS[communitySearch]
      : _COMMUNITIES[communitySearch]
    : null;

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
                        setModal={setModal}
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
                          setModal={setModal}
                          setSelectedChapter={setSelectedChapter}
                          setSelectedAbout={setSelectedAbout}
                        />
                      </div>
                    );
                  }
                ))}
          </div>

          <RightColumnHeader type="more issues" isMobile={isMobile} />

          {/* <h6 className={'bold mt-3'}>More Indicators</h6> */}
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
              setModal={setModal}
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
              setModal={setModal}
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

      {modal && (
        <div className="modal-background">
          <div className={'modal-card'}>
            <IssuesCard
              issueIdx={modal}
              isMobile={isMobile}
              displayModes={displayModes}
              setDisplayModes={setDisplayModes}
              setCompareSearch={setCompareSearch}
              addCompare={addCompare}
              target={true}
              setCommunitySearch={setCommunitySearch}
              setSelectedChapter={setSelectedChapter}
              compareSearch={compareSearch}
              selectedCommunity={selectedCommunity}
              boundary={boundary}
              selectedSpecificIssue={selectedSpecificIssue}
              setSelectedSpecificIssue={setSelectedSpecificIssue}
              setModal={setModal}
              modalVersion={true}
              setSelectedAbout={setSelectedAbout}
            />
          </div>
        </div>
      )}
    </div>
  );
}
