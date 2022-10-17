import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

export default function SourceInfo({
  issues,
  selectedSpecificIssue,
  setSelectedChapter,
  setShowMap,
  verticalHistogram = false,
  type,
}) {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <div
      onMouseEnter={() => {
        setShowInfo(true);
      }}
      onMouseLeave={() => {
        setShowInfo(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        // setSelectedAbout(9);
        setSelectedChapter(4);
        setShowMap && setShowMap(false);
      }}
      className={'d-inline-block'}
    >
      <FontAwesomeIcon
        style={
          showInfo
            ? {
                display: 'inline-block',
                fontSize: '1rem',
                cursor: 'pointer',
                transform: 'scale(1.1)',
              }
            : { fontSize: '1rem', cursor: 'pointer' }
        }
        icon={faCircleInfo}
      />
      {type == 'demographic' && (
        <div
          className={`${
            showInfo ? '' : 'd-none'
          } position-absolute info-tooltip smaller-text`}
        >
          <p className={'m-0'}>Click to learn more about U.S Census Data.</p>
        </div>
      )}

      {type !== 'demographic' && (
        <div
          className={`${
            showInfo ? '' : 'd-none'
          } position-absolute info-tooltip smaller-text ${
            verticalHistogram ? '' : 'end-0'
          }`}
        >
          <p className={'m-0'}>
            {`Source: ${issues.specific_issues_data[selectedSpecificIssue]?.specific_issue_source}. ${issues.specific_issues_data[selectedSpecificIssue]?.year}.
            `}
          </p>
          <span className="text-secondary fst-italic fw-light">
            {issues.specific_issues_data[selectedSpecificIssue]
              ?.methodology_warning
              ? `*
           ${issues.specific_issues_data[selectedSpecificIssue]?.methodology_warning}.
           Click to learn more.`
              : 'Click to learn more.'}
          </span>
        </div>
      )}
    </div>
  );
}
