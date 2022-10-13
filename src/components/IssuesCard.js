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

export default function IssuesCard({
  issues,
  selectedSpecificIssue,
  setSelectedSpecificIssue,
  specificIssue,
  setModal,
  moreIssues,
  modalVersion = false,
  forMoreIssues = false,
  setMoreIssues = null,
  boundary,
  setSelectedChapter,
  setSelectedAbout,
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

  const getIssueName = () => {
    return (
      issues.specific_issues_data[specificIssue].specific_issue_name || null
    );
  };

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
      <div
        className={'issues-card-header'}
        style={
          target && toggleDisplayMode
            ? { position: 'sticky', top: '0' }
            : { position: 'relative' }
        }
      >
        <div className={'issues-card-title-container small-col-gap'}>
          <p className={'m-0'}>{getIssueName()}</p>

          <p className={'m-0 smaller-text'} style={{ paddingRight: '0.5rem' }}>
            {issues.specific_issues_data[specificIssue].units}
          </p>
          <SourceInfo
            issues={issues}
            selectedSpecificIssue={selectedSpecificIssue}
            setSelectedChapter={setSelectedChapter}
          />
        </div>
        <HistogramToggle
          target={target}
          toggleDisplayMode={toggleDisplayMode}
          setToggleDisplayMode={setToggleDisplayMode}
        />

        <div className={'issues-card-button-container small-col-gap x-mark'}>
          {forMoreIssues && (
            <FontAwesomeIcon
              style={{ cursor: 'pointer' }}
              icon={faXmark}
              onClick={(e) => {
                e.stopPropagation();
                if (selectedSpecificIssue === specificIssue) {
                  setSelectedSpecificIssue(null);
                }
                let newMoreIssues = moreIssues.filter(
                  (issue) => issue !== specificIssue
                );
                console.log('newMoreIssues ', newMoreIssues);
                setMoreIssues(newMoreIssues);
              }}
            />
          )}
        </div>
      </div>
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
