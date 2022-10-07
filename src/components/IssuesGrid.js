import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

export default function IssuesDropDown({
  currentValue = null,
  items,
  setValue = null,
  issues,
  issue_categories,
  showDemographics,
}) {
  const [showDropdownItems, setShowDropdownItems] = useState(true);
  const [toggleText, setToggleText] = useState(
    'Select an indicator to explore'
  );
  const [included, setIncluded] = useState(false);

  useEffect(() => {
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
      <div>
        <div
          className={`d-flex flex-wrap`}
          style={{
            textAlign: 'center',
            gap: '1rem',
            boxSizing: 'border-box',
            alignItems: 'center',
          }}
        >
          {items.map((item, index) => {
            return (
              <div
                key={index}
                className={`p-2 grid-item ${
                  currentValue === item.specific_issue_ID
                    ? 'grid-item-active'
                    : ''
                }`}
                style={{
                  border: '2px solid black',
                  flexGrow: '1',
                  minHeight: '60px',
                  justifyContent: 'space-between',
                }}
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
                <p className={'small-font-vh mb-0'}>
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
