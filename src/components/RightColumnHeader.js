import SourceInfo from './SourceInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faCaretUp,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';

const mobilePadding = {
  paddingLeft: '0.5rem',
};

export default function RightColumnHeader({
  boundary,
  type = 'solutions',
  issues = null,
  specificIssue,
  target,
  selectedSpecificIssue = null,
  setSelectedChapter,
  forMoreIssues,
  moreIssues,
  setMoreIssues,
  setSelectedSpecificIssue,
  displayModes = null,
  expand,

  // mobile
  isMobile = false,
  citywideTab = false,
}) {
  const getIssueName = () => {
    const bounds =
      boundary == 'council' ? 'Council Districts' : 'Community Boards';

    const sentence = [
      bounds,
      'Ranked by',
      issues.specific_issues_data[selectedSpecificIssue].specific_issue_title,
    ].join(' ');

    return sentence || null;
  };

  const getMetricDescription = () => {
    return (
      issues.specific_issues_data[specificIssue].specific_issue_name || null
    );
  };

  if (type === 'solutions') {
    return (
      <div className={'d-flex flex-column position-relative'}>
        <div
          className={`${'issues-chapters-active'} collapse-issue issues-chapters top-border transition-height`}
        >
          <div
            className="position-relative d-grid "
            style={{
              gridTemplateColumns: '1fr auto',
              gridGap: '0.33rem',
              alignItems: 'center',
              cursor: 'default',
            }}
          >
            <h6 className="mb-0">Solutions</h6>
          </div>
        </div>
      </div>
    );
  } else if (type === 'histogram header') {
    return (
      <div className={'d-flex flex-column position-relative'}>
        <div
          className={`issues-chapters-active collapse-issue issues-chapters top-border transition-height`}
        >
          <div
            className="position-relative d-grid "
            style={{
              gridTemplateColumns: '1fr auto',
              gridGap: '0.33rem',
              alignItems: 'center',
              cursor: 'default',
            }}
          >
            <h6 className={'mb-0'}>{getIssueName()}</h6>
          </div>
        </div>
      </div>
    );
  } else if (type === 'card') {
    return (
      <div
        className={'d-flex flex-column'}
        style={
          target &&
          displayModes != null &&
          displayModes[selectedSpecificIssue] == true
            ? { position: 'sticky', top: '0', zIndex: '2' }
            : { position: 'relative' }
        }
      >
        <div
          className={`${
            target ? 'issues-chapters-active' : 'issues-chapters-inactive'
          } issues-chapters top-border transition-height`}
        >
          <div
            className="position-relative issues-card-header"
            style={{
              gridGap: '0.33rem',
              alignItems: 'center',
            }}
          >
            <div
              className="issues-card-title-container"
              style={{
                display: 'inline-grid',
                gridTemplateColumns: isMobile ? 'auto' : 'auto 1fr',
                gap: '0.5rem',
                paddingLeft: isMobile ? mobilePadding.paddingLeft : '',
              }}
            >
              <h6 className="mb-0">{getMetricDescription()}</h6>
              <div>
                <span className={'m-0 smaller-text position-relative'}>
                  {issues.specific_issues_data[specificIssue].units}{' '}
                  <SourceInfo
                    issues={issues}
                    selectedSpecificIssue={selectedSpecificIssue}
                    setSelectedChapter={setSelectedChapter}
                  />
                </span>
              </div>
            </div>

            <div
              className={'issues-card-button-container small-col-gap x-mark'}
            >
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
                    setMoreIssues(newMoreIssues);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else if (type === 'notable') {
    return (
      <div
        className={'heading-block d-flex flex-column'}
        style={{ position: isMobile ? '' : 'sticky', top: '0', zIndex: '1' }}
      >
        <div
          className={`issues-chapters-active collapse-issue issues-chapters top-border transition-height`}
        >
          <div
            className="position-relative d-grid justify-content-start"
            style={{
              gridTemplateColumns: isMobile ? 'auto' : 'auto auto',
              gridGap: '0.33rem',
              alignItems: 'center',
              cursor: 'default',
              border: isMobile ? 'none' : '',
              backgroundColor: isMobile ? 'white' : '',
              color: isMobile ? 'black' : '',
            }}
          >
            <h6 className="mb-0" style={isMobile ? mobilePadding : {}}>
              Notable Indicators
            </h6>
            <p
              className={'m-0 smaller-text'}
              style={
                isMobile ? { ...mobilePadding, paddingBottom: '1.5rem' } : {}
              }
            >
              Below are the three worst spatial equity indicators in this{' '}
              {boundary == 'council' ? 'district' : 'community board'}.
            </p>
          </div>
        </div>
      </div>
    );
  } else if (type === 'more issues') {
    return (
      <div
        className={'heading-block d-flex flex-column'}
        style={{ position: isMobile ? '' : 'sticky', top: '0', zIndex: '1' }}
      >
        <div
          className={`issues-chapters-active collapse-issue issues-chapters top-border transition-height`}
        >
          <div
            className="position-relative d-grid "
            style={{
              gridTemplateColumns: '1fr auto',
              gridGap: '0.33rem',
              alignItems: 'center',
              cursor: 'default',
              backgroundColor: isMobile ? 'white' : '',
              color: isMobile ? 'black' : '',
            }}
          >
            <h6 className="mb-0" style={isMobile ? mobilePadding : {}}>
              More Issues
            </h6>
          </div>
        </div>
      </div>
    );
  } else if (type === 'collapse') {
    return (
      <div className={'d-flex flex-column position-relative'}>
        <div
          className={`${
            isMobile && citywideTab
              ? 'issues-chapters-inactive'
              : 'issues-chapters-active'
          } issues-chapters transition-height expand-toggle`}
        >
          <div
            className="position-relative d-grid "
            style={{
              gridGap: '0.33rem',
              alignItems: 'center',
              textAlign: 'center',
              border: 'none',
              padding: '0',
            }}
          >
            <h6 style={{ paddingLeft: '0' }}>
              <FontAwesomeIcon icon={!expand ? faCaretDown : faCaretUp} />
            </h6>
          </div>
        </div>
      </div>
    );
  }
}
