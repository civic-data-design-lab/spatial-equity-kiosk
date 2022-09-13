import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleInfo,
    faArrowsUpDownLeftRight,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import _RANKINGS from '../data/rankings.json';
import _COUNCILDISTRICTS from '../texts/councildistricts.json';
import IssueHistogram from "./IssueHistogram"

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
                        <FontAwesomeIcon
                            style={{ cursor: 'pointer' }}
                            icon={faCircleInfo}
                        />
                        <div
                            className={`${showInfo ? '' : 'd-none'
                                } position-absolute info-tooltip smaller-text`}
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
            <div className={'issues-card-body'}>
                <div>VISUALIZATION</div>
                <IssueHistogram
                    colorRampsyType={'health'}
                    issues={issues}
                    boundary={boundary}
                    selectedSpecificIssue={specificIssue}
                />
                <div className={'m-0 small-text'}>
                    {getRankingNarrative(issues.specific_issues_data[specificIssue])}{' '}
                </div>
            </div>
        </div>
    );
}
