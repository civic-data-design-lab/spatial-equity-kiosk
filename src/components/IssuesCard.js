import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleInfo,
  faArrowsUpDownLeftRight,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import _RANKINGS from '../data/rankings.json';
import _COUNCILDISTRICTS from '../texts/councildistricts.json';
import IssueHistogram from './IssueHistogram';
import HistogramToggle from './HistogramToggle';
import SourceInfo from './SourceInfo';
import RightColumnHeader from './RightColumnHeader';

export default function IssuesCard({
  issues,
  selectedSpecificIssue,
  setSelectedSpecificIssue,
  specificIssue,
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
}) {
  const [showInfo, setShowInfo] = useState(false);
  const [toggleDisplayMode, setToggleDisplayMode] = useState(false);

  return (
    <div
      className={'issues-card-container'}
      onClick={() => {
        if (selectedSpecificIssue === specificIssue) {
        } else {
          setSelectedSpecificIssue(specificIssue);
        }
      }}
    >
      <RightColumnHeader
        type="card"
        specificIssue={specificIssue}
        target={target}
        toggleDisplayMode={toggleDisplayMode}
        setToggleDisplayMode={setToggleDisplayMode}
        issues={issues}
        selectedSpecificIssue={selectedSpecificIssue}
        setSelectedChapter={setSelectedChapter}
        forMoreIssues={forMoreIssues}
        moreIssues={moreIssues}
        setMoreIssues={setMoreIssues}
        setSelectedSpecificIssue={setSelectedSpecificIssue}
      />

      <div
        className={'issues-card-body'}
        style={toggleDisplayMode ? { padding: '0', border: '0' } : {}}
      >
        <IssueHistogram
          colorRampsyType={'health'}
          issues={issues}
          boundary={boundary}
          selectedSpecificIssue={specificIssue}
          selectedCommunity={selectedCommunity}
          setCommunitySearch={setCommunitySearch}
          setSelectedChapter={setSelectedChapter}
          communitySearch={communitySearch}
          compareSearch={compareSearch}
          toggleDisplayMode={toggleDisplayMode}
          specificIssue={specificIssue}
          addCompare={addCompare}
          setCompareSearch={setCompareSearch}
        />
      </div>
    </div>
  );
}
