import React, { useEffect, useState } from 'react';
import IssuesCard from './IssuesCard';
import IssuesTags from './IssuesTags';

export default function CommunityProfile({
  selectedSpecificIssue,
  issues,
  communities,
  communitySearch,
  setSelectedSpecificIssue,
  compareSearch,
  setMoreIssues,
  moreIssuesLength,
  moreIssues,
  setMoreIssuesLength,
  boundary,
  councils,
  setSelectedChapter,
  setSelectedAbout,
  setCommunitySearch,
}) {
  useEffect(() => {
    if (moreIssues && communitySearch  && !compareSearch) {
      let leastPerfIssues =
        councils[communitySearch]?.least_performing_issues ||
        communities[communitySearch]?.least_performing_issues;

      let newMoreIssues = moreIssues.filter(
        (issue) => !leastPerfIssues.includes(issue)
      );
      setMoreIssues(newMoreIssues);
      setMoreIssuesLength(newMoreIssues.length);
    }

    if (selectedSpecificIssue && communitySearch) {
      if (moreIssues) {
        let leastPerfIssues =
          councils[communitySearch]?.least_performing_issues ||
          communities[communitySearch]?.least_performing_issues;
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
      ? councils[communitySearch]
      : communities[communitySearch]
    : null;

  return (
    <div className={'community-profile-container'}>
      {!compareSearch ? (
        <>
          <div>
            {
              <h5
                className={'bold'}
                // style={{
                //   padding: '0.75em 0',
                // }}
              >
                Notable Indicators—{' '}
                {communitySearch
                  ? boundary == 'council'
                    ? councils[communitySearch]
                      ? `City Council ${councils[communitySearch].name}`
                      : ''
                    : communities[communitySearch]
                    ? `${communities[communitySearch].name
                        .split(' ')
                        .slice(0, -1)
                        .join(' ')} Community Board ${communities[
                        communitySearch
                      ].name
                        .split(' ')
                        .slice(-1)}`
                    : ''
                  : ''}
              </h5>
            }
            <p className={''}>
              {communitySearch
                ? ` Below are the three worst spatial equity indicators in this 
                ${boundary === 'council' ? 'district' : 'community board'}.`
                : ``}
            </p>
            <div className={'d-flex flex-column row-gap'}>
              {(communities[communitySearch] &&
                communities[communitySearch].least_performing_issues.map(
                  (issue, index) => {
                    return (
                      <div
                        key={index}
                        className={
                          selectedSpecificIssue &&
                          selectedSpecificIssue !== issue
                            ? 'opacity-50'
                            : ''
                        }
                      >
                        <IssuesCard
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
                          issues={issues}
                          specificIssue={issue}
                          setModal={setModal}
                          setSelectedChapter={setSelectedChapter}
                          setSelectedAbout={setSelectedAbout}
                        />
                      </div>
                    );
                  }
                )) ||
                (councils[communitySearch] &&
                  councils[communitySearch].least_performing_issues.map(
                    (issue, index) => {
                      return (
                        <div
                          key={index}
                          className={
                            selectedSpecificIssue &&
                            selectedSpecificIssue !== issue
                              ? 'opacity-50'
                              : ''
                          }
                        >
                          <IssuesCard
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
                            issues={issues}
                            specificIssue={issue}
                            setModal={setModal}
                            setSelectedChapter={setSelectedChapter}
                            setSelectedAbout={setSelectedAbout}
                          />
                        </div>
                      );
                    }
                  ))}
            </div>
          </div>

          <div className={''}>
            <h5
              className={'bold mt-3'}
              // style={{
              //   padding: '0.75em 0',
              // }}
            >
              More Indicators
            </h5>
            <IssuesTags
              issues={issues}
              leastPerforming={
                (communities[communitySearch] &&
                  communities[communitySearch].least_performing_issues) ||
                (councils[communitySearch] &&
                  councils[communitySearch].least_performing_issues)
              }
              setSelectedSpecificIssue={setSelectedSpecificIssue}
              selectedSpecificIssue={selectedSpecificIssue}
              councils={councils}
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
            />
          </div>
        </>
      ) : (
        <>
          <div className={'standard-padding'}>
            {
              <h5 className={'mb-3'}>
                Compare Indicators in{' '}
                {(communities[communitySearch] &&
                  communities[communitySearch].name) ||
                  (councils[communitySearch] &&
                    councils[communitySearch].name)}{' '}
                &{' '}
                {(communities[compareSearch] &&
                  communities[compareSearch].name) ||
                  (councils[compareSearch] && councils[compareSearch].name)}
              </h5>
            }
            <p className={'mt-3'}>
              Choose one or more indicators to compare spatial equity in these{' '}
              {boundary === 'council' ? 'districts' : 'community boards'}.
            </p>

            <IssuesTags
              issues={issues}
              leastPerforming={
                (communities[communitySearch] &&
                  communities[communitySearch].least_performing_issues) ||
                (councils[communitySearch] &&
                  councils[communitySearch].least_performing_issues)
              }
              communities={communities}
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
            />
          </div>
        </>
      )}

      {modal && (
        <div className="modal-background">
          <div className={'modal-card'}>
            <IssuesCard
              target={true}
              setCommunitySearch={setCommunitySearch}
              setSelectedChapter={setSelectedChapter}
              compareSearch={compareSearch}
              selectedCommunity={selectedCommunity}
              boundary={boundary}
              selectedSpecificIssue={selectedSpecificIssue}
              setSelectedSpecificIssue={setSelectedSpecificIssue}
              issues={issues}
              specificIssue={modal}
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
