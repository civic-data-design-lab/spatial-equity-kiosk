// import React and React Hooks
import React, { useState } from 'react';

// import components
import IssueHistogram from './IssueHistogram';
import RightColumnHeader from './RightColumnHeader';

// import data and / or text
import _RANKINGS from '../data/rankings.json';
import _COUNCILDISTRICTS from '../texts/councildistricts.json';
import _ISSUES from '../texts/issues.json';


/**
 * IssuesCard.js renders the individual issue cards in the Community Profiles section
 */

export default function IssuesCard({
  selectedSpecificIssue,
  setSelectedSpecificIssue,
  issueIdx,
  moreIssues,
  forMoreIssues = false,
  setMoreIssues = null,
  boundary,
  setSelectedChapter,
  selectedCommunity,
  setCommunitySearch,
  communitySearch,
  compareSearch,
  target = false,
  addCompare,
  setCompareSearch,
  displayModes,
  setDisplayModes,
  isMobile = false,
}) {
  const [toggleDisplayMode, setToggleDisplayMode] = useState(false);

  return (
    <div
      className={'issues-card-container'}
      onClick={() => {
        if (selectedSpecificIssue === issueIdx) {
        } else {
          setSelectedSpecificIssue(issueIdx);
        }
      }}
    >
      <RightColumnHeader
        type="card"
        issue={_ISSUES.specific_issues_data[issueIdx]}
        selectedIssueIdx={selectedSpecificIssue}
        issueIdx={issueIdx}
        target={target}
        toggleDisplayMode={toggleDisplayMode}
        setToggleDisplayMode={setToggleDisplayMode}
        selectedSpecificIssue={selectedSpecificIssue}
        setSelectedChapter={setSelectedChapter}
        forMoreIssues={forMoreIssues}
        moreIssues={moreIssues}
        setMoreIssues={setMoreIssues}
        setSelectedSpecificIssue={setSelectedSpecificIssue}
        isMobile={isMobile}
      />

      <div className={'issues-card-body'}>
        <IssueHistogram
          colorRampsyType={'health'}
          boundary={boundary}
          selectedSpecificIssue={issueIdx}
          selectedCommunity={selectedCommunity}
          setCommunitySearch={setCommunitySearch}
          setSelectedChapter={setSelectedChapter}
          communitySearch={communitySearch}
          compareSearch={compareSearch}
          toggleDisplayMode={toggleDisplayMode}
          issue={issueIdx}
          addCompare={addCompare}
          setCompareSearch={setCompareSearch}
          displayModes={displayModes}
          setDisplayModes={setDisplayModes}
          target={target}
        />
      </div>
    </div>
  );
}
