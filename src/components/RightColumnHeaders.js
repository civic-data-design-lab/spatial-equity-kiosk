import { useState } from 'react';
import SourceInfo from './SourceInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import HistogramToggle from './HistogramToggle';

export default function RightColumnHeaders({
  boundary,
  type = 'solutions',
  issues = null,
  target = true,
  selectedSpecificIssue = null,
  setSelectedChapter = null,
  setSelectedSpecificIssue = null,
  setMoreIssues = null,

  //   not sure
  forMoreIssues = false,
  moreIssues = null,
}) {
  const [toggleDisplayMode, setToggleDisplayMode] = useState(false);

  //   console.log(issues.specific_issues_data[selectedSpecificIssue] || null);

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

  if (type === 'solutions') {
    return (
      <div className={'d-flex flex-column position-relative'}>
        <div
          className={`${'issues-chapters-active'} collapse-issue issues-chapters top-border transition-height`}
          style={
            {
              // borderLeft: '2px solid white',
            }
          }
        >
          <div
            className="position-relative d-grid "
            style={{
              gridTemplateColumns: '1fr auto',
              gridGap: '0.33rem',
              alignItems: 'center',
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
          className={`${'issues-chapters-active'} collapse-issue issues-chapters top-border transition-height`}
          style={
            {
              // borderLeft: '2px solid white',
            }
          }
        >
          <div
            className="position-relative d-grid "
            style={{
              gridTemplateColumns: '1fr auto',
              gridGap: '0.33rem',
              alignItems: 'center',
            }}
          >
            <h6
              className={'mb-0'}
              //   style={{ gridColumn: '1 / span 2', paddingBottom: '0rem' }}
            >
              {getIssueName()}
            </h6>

            {/* <div
              className={'m-0 smaller-text'}
              style={{
                paddingRight: '0.5rem',
                padding: '0 1.5rem',
              }}
            >
              {issues.specific_issues_data[selectedSpecificIssue]?.units}{' '}
              <SourceInfo
                issues={issues}
                selectedSpecificIssue={selectedSpecificIssue}
                setSelectedChapter={setSelectedChapter}
              />

            </div> */}
            {/* <div>
              <div
                className={`${
                  target && selectedSpecificIssue ? `d-flex` : `d-none`
                } switch-container flex-row`}
                style={{
                  alignContent: 'start',
                  padding: '0 1.5rem',
                }}
              >
                <p className={'m-0 d-inline-block smaller-text'}>
                  {toggleDisplayMode ? `Show Histogram` : `Show List`}
                </p>
                <label className="m-0 switch">
                  <input
                    checked={toggleDisplayMode}
                    type="checkbox"
                    onChange={(e) => {
                      setToggleDisplayMode(!toggleDisplayMode);
                    }}
                  />
                  <span className="slider round m-0"></span>
                </label>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}
