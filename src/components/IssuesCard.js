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
}) {
  const [showInfo, setShowInfo] = useState(false);
  const [toggleDisplayMode, setToggleDisplayMode] = useState(false);

  const getIssueName = () => {
    return (
      issues.specific_issues_data[specificIssue].specific_issue_name || null
    );
  };

  const getRankingNarrative = (obj) => {
    if (selectedCommunity) {
      const subject = obj.json_id;
      const fullIssueName = obj.specific_issue_name;

      const lastItem = boundary == 'council' ? '51' : '59';

      const metricRanking =
        boundary == 'council'
          ? _RANKINGS.council[subject].find(
              (f) => f.community_ID == selectedCommunity.json_lookup
            ).rank
          : _RANKINGS.community[subject].find(
              (f) => f.community_ID == selectedCommunity.json_lookup
            ).rank;

      const boundaryGrammatical =
        boundary == 'council'
          ? `City Council ${selectedCommunity.name}`
          : `${selectedCommunity.name
              .split(' ')
              .slice(0, -1)} Community Board ${selectedCommunity.name
              .split(' ')
              .slice(1)}`;

      return (
        <p>
          {` ${boundaryGrammatical} ranks ${metricRanking} out of ${lastItem} citywide in ${fullIssueName}.`}
        </p>
      );
    }
    return null;
  };

  return (
    <div
      className={'issues-card-container pb-3'}
      onClick={() => {
        if (selectedSpecificIssue === specificIssue) {
          setSelectedSpecificIssue(null);
        } else {
          setSelectedSpecificIssue(specificIssue);
        }
      }}
    >
      <div className={'m-0 lh-1'}>
        {getRankingNarrative(issues.specific_issues_data[specificIssue])}{' '}
      </div>
      <div className={'issues-card-header'}>
        <div className={'issues-card-title-container col-gap'}>
          <p className={'m-0'}>{getIssueName()}</p>
          <p className={'m-0 smaller-text'}>
            {issues.specific_issues_data[specificIssue].specific_issue_units}
          </p>
          <div
            style={{
              margin: '1rem 1rem 0 0',
              display: 'grid',
              gridTemplateColumns: 'auto auto',
              alignContent: 'start',
              width: '100%',
            }}
          >
            <div className={`d-flex switch-container flex-row `}>
              <label className="switch">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setToggleDisplayMode(!toggleDisplayMode);
                  }}
                />
                <span className="slider round"></span>
              </label>

              <p className={'small-font d-inline-block big-button border-0'}>
                {toggleDisplayMode ? `Show Chart` : `Show Rankings`}
              </p>
            </div>
          </div>
        </div>
        <div className={'issues-card-button-container col-gap'}>
          <div
            onMouseEnter={() => {
              setShowInfo(true);
            }}
            onMouseLeave={() => {
              setShowInfo(false);
            }}
            onClick={(e) => {
              e.stopPropagation();
              console.log('here');
              setSelectedAbout(9);
              setSelectedChapter(4);
            }}
          >
            <FontAwesomeIcon
              style={{ cursor: 'pointer' }}
              icon={faCircleInfo}
            />
            <div
              className={`${
                showInfo ? '' : 'd-none'
              } position-absolute info-tooltip smaller-text end-0`}
            >
              <p className={'m-0'}>
                {
                  issues.specific_issues_data[specificIssue]
                    .specific_issue_source
                }
              </p>
            </div>
          </div>
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
          setToggleDisplayMode={setToggleDisplayMode}
        />
      </div>
    </div>
  );
}
