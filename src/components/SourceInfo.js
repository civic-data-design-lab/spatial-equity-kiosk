import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

export default function MapTooltip({
  issues,
  selectedSpecificIssue,
  setSelectedChapter,
  setShowMap,
  verticalHistogram = false,
}) {
  const [showInfo, setShowInfo] = useState(false);
  const [coords, setCoords] = useState(null);
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
        setShowMap(false);
      }}
      className={'d-inline-block'}
    >
      <FontAwesomeIcon
        style={
          showInfo
            ? {
                fontSize: '1rem',
                cursor: 'pointer',
                transform: 'scale(1.1)',
              }
            : { fontSize: '1rem', cursor: 'pointer' }
        }
        icon={faCircleInfo}
      />
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
    </div>
  );
}
