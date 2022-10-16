import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faCaretUp,
  faCaretRight,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';

export default function MobileDropdown({
  selectedIssue,
  setSelectedIssue,
  selectedSpecificIssue,
  setSelectedSpecificIssue,
  issues,
  issue_categories,
  selectedChapter,
  showDropDown,
  setShowDropDown,
  showSubDropDown,
  setShowSubDropDown,
}) {
  return (
    <div className="position-relative">
      <div className={'mobile-citywide-nav'}>
        <div
          className={'mobile-citywide-nav-dropdown w-100'}
          onClick={() => setShowDropDown(!showDropDown)}
        >
          {selectedSpecificIssue ? (
            <div className={'mobile-citywide-nav-text'}>
              <div>
                {selectedChapter && issue_categories.labels[selectedIssue]}
              </div>
              <FontAwesomeIcon icon={faPlay} />
              <div className={'ellipses'}>
                {selectedSpecificIssue &&
                  issues.specific_issues_data[selectedSpecificIssue]
                    .specific_issue_name}
              </div>
            </div>
          ) : (
            <div className={'mobile-citywide-nav-text'}>Select</div>
          )}
          <FontAwesomeIcon icon={showDropDown ? faCaretUp : faCaretDown} />
        </div>
      </div>
      <div className={'position-absolute'}>
        <div
          className={`mobile-citywide-nav-dropdown-item
                    ${
                      showDropDown
                        ? 'mobile-citywide-nav-dropdown-item-grow'
                        : 'mobile-citywide-nav-dropdown-item-shrink'
                    }  
                    ${
                      showSubDropDown === 1
                        ? 'active-scheme'
                        : 'inactive-scheme'
                    }
                    `}
          style={{ width: '100vw' }}
          onClick={() => {
            if (showSubDropDown !== 1) {
              setShowSubDropDown(1);
            } else {
              setShowSubDropDown(null);
            }
          }}
        >
          <div>Health</div>
          <FontAwesomeIcon
            icon={showSubDropDown === 1 ? faCaretUp : faCaretDown}
          />
        </div>

        {issues.issues_data.health.specific_issues_ID.map((id) => {
          return (
            <div
              key={id}
              className={`mobile-citywide-nav-dropdown-item
                    ${
                      showDropDown && showSubDropDown === 1
                        ? 'mobile-citywide-nav-dropdown-item-grow'
                        : 'mobile-citywide-nav-dropdown-item-shrink'
                    }  
                    ${
                      selectedSpecificIssue === id
                        ? 'active-scheme'
                        : 'inactive-scheme'
                    }
                    `}
              style={{ width: '100vw' }}
              onClick={() => {
                if (selectedSpecificIssue !== id) {
                  setSelectedSpecificIssue(id);
                  setSelectedIssue(1);
                  setShowDropDown(false);
                  setShowSubDropDown(false);
                } else {
                  setSelectedSpecificIssue(null);
                  setShowDropDown(false);
                  setShowSubDropDown(false);
                }
              }}
            >
              <div>
                <p
                  className={'mb-0'}
                  style={{
                    fontSize:
                      showDropDown && showSubDropDown === 1 ? '0.8em' : '0',
                    opacity: showDropDown && showSubDropDown === 1 ? '1' : '0',
                    transition: 'font-size 0.2s, opacity 0.3s',
                  }}
                >
                  {issues.specific_issues_data[id].specific_issue_name}
                </p>
              </div>
            </div>
          );
        })}

        <div
          className={`mobile-citywide-nav-dropdown-item
                    ${
                      showDropDown
                        ? 'mobile-citywide-nav-dropdown-item-grow'
                        : 'mobile-citywide-nav-dropdown-item-shrink'
                    }  
                    ${
                      showSubDropDown === 2
                        ? 'active-scheme'
                        : 'inactive-scheme'
                    }
                    `}
          style={{ width: '100vw' }}
          onClick={() => {
            if (showSubDropDown !== 2) {
              setShowSubDropDown(2);
            } else {
              setShowSubDropDown(null);
            }
          }}
        >
          <div>Environment</div>
          <FontAwesomeIcon
            icon={showSubDropDown === 2 ? faCaretUp : faCaretDown}
          />
        </div>

        {issues.issues_data.environment.specific_issues_ID.map((id) => {
          return (
            <div
              key={id}
              className={`mobile-citywide-nav-dropdown-item
                    ${
                      showDropDown && showSubDropDown === 2
                        ? 'mobile-citywide-nav-dropdown-item-grow'
                        : 'mobile-citywide-nav-dropdown-item-shrink'
                    }  
                    ${
                      selectedSpecificIssue === id
                        ? 'active-scheme'
                        : 'inactive-scheme'
                    }
                    `}
              style={{ width: '100vw' }}
              onClick={() => {
                if (selectedSpecificIssue !== id) {
                  setSelectedSpecificIssue(id);
                  setSelectedIssue(2);
                  setShowDropDown(false);
                  setShowSubDropDown(false);
                } else {
                  setSelectedSpecificIssue(null);
                  setShowDropDown(false);
                  setShowSubDropDown(false);
                }
              }}
            >
              <div>
                <p
                  className={'mb-0'}
                  style={{
                    fontSize:
                      showDropDown && showSubDropDown === 2 ? '0.8em' : '0',
                    opacity: showDropDown && showSubDropDown === 2 ? '1' : '0',
                    transition: 'font-size 0.2s, opacity 0.3s',
                  }}
                >
                  {issues.specific_issues_data[id].specific_issue_name}
                </p>
              </div>
            </div>
          );
        })}

        <div
          className={`mobile-citywide-nav-dropdown-item 
                    ${
                      showDropDown
                        ? 'mobile-citywide-nav-dropdown-item-grow'
                        : 'mobile-citywide-nav-dropdown-item-shrink'
                    }                      
                    ${
                      showSubDropDown === 3
                        ? 'active-scheme'
                        : 'inactive-scheme'
                    }
                    `}
          style={{ width: '100vw' }}
          onClick={() => {
            if (showSubDropDown !== 3) {
              setShowSubDropDown(3);
            } else {
              setShowSubDropDown(null);
            }
          }}
        >
          <div>Mobility</div>
          <FontAwesomeIcon
            icon={showSubDropDown === 3 ? faCaretUp : faCaretDown}
          />
        </div>

        {issues.issues_data.infrastructure.specific_issues_ID.map((id) => {
          return (
            <div
              className={`mobile-citywide-nav-dropdown-item
                    ${
                      showDropDown && showSubDropDown === 3
                        ? 'mobile-citywide-nav-dropdown-item-grow'
                        : 'mobile-citywide-nav-dropdown-item-shrink'
                    }  
                    ${
                      selectedSpecificIssue === id
                        ? 'active-scheme'
                        : 'inactive-scheme'
                    }
                    `}
              style={{ width: '100vw' }}
              onClick={() => {
                if (selectedSpecificIssue !== id) {
                  setSelectedSpecificIssue(id);
                  setSelectedIssue(3);
                  setShowDropDown(false);
                  setShowSubDropDown(false);
                } else {
                  setSelectedSpecificIssue(null);
                  setShowDropDown(false);
                  setShowSubDropDown(false);
                }
              }}
            >
              <div>
                <p
                  className={'mb-0'}
                  style={{
                    fontSize:
                      showDropDown && showSubDropDown === 3 ? '0.8em' : '0',
                    opacity: showDropDown && showSubDropDown === 3 ? '1' : '0',
                    transition: 'font-size 0.s, opacity 0.3s',
                  }}
                >
                  {issues.specific_issues_data[id].specific_issue_name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
