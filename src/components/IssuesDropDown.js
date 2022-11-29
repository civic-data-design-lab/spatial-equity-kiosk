import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import _ISSUES from '../texts/issues.json';
import _ISSUE_CATEGORIES from '../texts/issue_categories.json';

/**
 * IssuesDropdown.js renders the dropdown component from which the user can toggle the current active indicator
 * @param {int} currentValue - integer representing the current active indicator
 * @param {Object[]} items - list of objects representing indicators of the same category (Health, Environment, Mobility) to display within the dropdown
 * @param {boolean} showDemographics - whether to expand demographics tab or not
 */

export default function IssuesDropDown({
  currentValue = null,
  items,
  setValue = null,
  showDemographics,
}) {
  // display dropdown items or not
  const [showDropdownItems, setShowDropdownItems] = useState(false);

  // value in dropdown toggle
  const [toggleText, setToggleText] = useState(
    'Select an indicator to explore'
  );

  // if the selected specific issue is within this dropdown
  const [included, setIncluded] = useState(false);

  useEffect(() => {
    // check if selected specific issue is within this dropdown
    let changed = false;
    items.map((item) => {
      if (item.specific_issue_ID === currentValue) {
        setToggleText(item.specific_issue_name);
        changed = true;
        setIncluded(true);
      }
    });
    if (!changed) {
      setToggleText('Select an indicator to explore');
      setIncluded(false);
    }
  });

  return (
    <>
      <div className={'dropdown-container'}>
        <div
          className={`${
            included && currentValue
              ? `dropdown-bar-${
                  _ISSUE_CATEGORIES.labels[
                    _ISSUES.specific_issues_data[currentValue].issue_type_ID
                  ]
                }`
              : 'dropdown-bar-black'
          } dropdown-bar d-flex flex-row justify-content-between align-items-center mb-0`}
          onMouseDown={() => {
            setShowDropdownItems(!showDropdownItems);
          }}
        >
          <p className={'mb-0 small-font'}>{toggleText}</p>

          {!showDropdownItems && <FontAwesomeIcon icon={faCaretDown} />}
          {showDropdownItems && <FontAwesomeIcon icon={faCaretUp} />}
        </div>

        <div
          className={`${showDropdownItems ? 'd-block' : 'd-none'} ${
            showDemographics ? 'short-dropdown' : 'long-dropdown'
          }
          dropdown-body position-absolute`}
        >
          {items.map((item, index) => {
            return (
              <div
                key={index}
                className={`dropdown-item 
                ${
                  currentValue === item.specific_issue_ID
                    ? 'dropdown-item-active'
                    : ''
                }`}
                onMouseDown={() => {
                  setShowDropdownItems(false);
                  setToggleText(item.specific_issue_name);
                  if (currentValue === item.specific_issue_ID) {
                    setValue(false);
                    setToggleText('Select an indicator to explore');
                  } else {
                    setValue(item.specific_issue_ID);
                  }
                }}
              >
                <p className={'small-font mb-0 ellipses'}>
                  {item.specific_issue_name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
