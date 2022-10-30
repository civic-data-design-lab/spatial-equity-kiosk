import React, { useState } from 'react';
import _RANKINGS from '../data/rankings.json';
import _COUNCILDISTRICTS from '../texts/councildistricts.json';
import IssueHistogram from './IssueHistogram';
import RightColumnHeader from './RightColumnHeader';

import _ISSUES from '../texts/issues.json';

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

  console.debug("ISSUES CARD:", issueIdx);

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

      <div
        className={'issues-card-body'}
        // style={toggleDisplayMode ? { padding: '0', border: '0' } : {}}
      >
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
