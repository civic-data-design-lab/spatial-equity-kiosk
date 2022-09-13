import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleInfo,
  faArrowsUpDownLeftRight,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import _RANKINGS from '../data/rankings.json';
import _COUNCILDISTRICTS from '../texts/councildistricts.json';

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
  selectedCommunity,
}) {
  const [showInfo, setShowInfo] = useState(false);

  const getIssueName = () => {
    return (
      issues.specific_issues_data[specificIssue].specific_issue_name || null
    );
  };

  const health_issues = issues.issues_data['health'].specific_issues_ID.map(
    (id_) => {
      return issues.specific_issues_data[id_];
    }
  );

  const environment_issues = issues.issues_data[
    'environment'
  ].specific_issues_ID.map((id_) => {
    return issues.specific_issues_data[id_];
  });

  const infrastructure_issues = issues.issues_data[
    'infrastructure'
  ].specific_issues_ID.map((id_) => {
    return issues.specific_issues_data[id_];
  });

  const getRankingNarrative = (items, obj) => {
    if (selectedCommunity) {
      const subject = obj.json_id;
      const fullIssueName = obj.specific_issue_name;
      const possible_keys = items.map((item) => {
        return item.specific_issue_ID;
      });

      const lastItem = selectedSpecificIssue
        ? boundary == 'council'
          ? _RANKINGS.council[
              issues.specific_issues_data[selectedSpecificIssue].json_id
            ].length
          : _RANKINGS.community[
              issues.specific_issues_data[selectedSpecificIssue].json_id
            ].length
        : null;

      const metricRanking = selectedSpecificIssue
        ? boundary == 'council'
          ? _RANKINGS.council[subject].find(
              (f) => f.community_ID == selectedCommunity.json_lookup
            ).rank
          : _RANKINGS.community[subject].find(
              (f) => f.community_ID == selectedCommunity.json_lookup
            ).rank
        : '';

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
      return (
        <p className={'mb-3 small-font'}>
          {selectedCommunity.name} ranks {metricRanking}
          {`out of ${boundary == 'council' ? '51' : '59'} `}
          {`districts citywide for `}
          <strong>
            {issues.specific_issues_data[selectedSpecificIssue]
              .issue_hi_low[0] || ''}
            {` ${issues.specific_issues_data[
              selectedSpecificIssue
            ].specific_issue_name.toLowerCase()} 
                ${
                  issues.specific_issues_data[selectedSpecificIssue]
                    .issue_units_shorthand != ''
                    ? issues.specific_issues_data[
                        selectedSpecificIssue
                      ].issue_units_shorthand.toLowerCase()
                    : issues.specific_issues_data[
                        selectedSpecificIssue
                      ].specific_issue_units.toLowerCase()
                }.`}
          </strong>
        </p>
      );
    }
    return null;
  };

  return (
    <div
      className={'issues-card-container'}
      onClick={() => {
        if (selectedSpecificIssue === specificIssue) {
          setSelectedSpecificIssue(null);
        } else {
          setSelectedSpecificIssue(specificIssue);
        }
      }}
    >
      <div className={'issues-card-header'}>
        <div className={'issues-card-title-container col-gap'}>
          <p className={'m-0'}>{getIssueName()}</p>
          <p className={'m-0 smaller-text'}>
            {issues.specific_issues_data[specificIssue].specific_issue_units}
          </p>
        </div>
        <div className={'issues-card-button-container col-gap'}>
          <div
            onMouseEnter={() => {
              setShowInfo(true);
            }}
            onMouseLeave={() => {
              setShowInfo(false);
            }}
          >
            <FontAwesomeIcon icon={faCircleInfo} />
            <div
              className={`${
                showInfo ? '' : 'd-none'
              } position-absolute info-tooltip`}
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
      <div className={'issues-card-body'}>
        <div>VISUALIZATION</div>
        <div className={'m-0 small-text'}>
          {getRankingNarrative(
            infrastructure_issues,
            issues.specific_issues_data[specificIssue]
          )}{' '}
        </div>
      </div>
    </div>
  );
}
