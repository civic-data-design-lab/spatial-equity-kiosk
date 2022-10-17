import React, { useEffect, useState } from 'react';

export default function IssuesGrid({
  isMobile = false,
  type = 'metric',
  currentValue = null,
  items,
  setValue = null,
  setDemoToggleText = false,
  setMapDemographics,
}) {
  // const [showDropdownItems, setShowDropdownItems] = useState(true);
  // const [toggleText, setToggleText] = useState(
  //   'Select an indicator to explore'
  // );

  // useEffect(() => {
  //   let changed = false;
  //   items.map((item) => {
  //     if (item.specific_issue_ID === currentValue) {
  //       changed = true;
  //     }
  //   });
  //   if (!changed) {
  //     setToggleText('Select an indicator to explore');
  //   }
  // });

  return (
    <>
      <div>
        <div
          className={`d-flex flex-wrap issues-grid`}
          style={{
            textAlign: 'center',
            gap: '1rem',
            boxSizing: 'border-box',
            alignItems: 'center',
          }}
        >
          {items.map((item, index) => {
            if (type == 'metric') {
              return (
                <div
                  key={index}
                  className={`p grid-item ${
                    currentValue === item.specific_issue_ID
                      ? 'grid-item-active'
                      : ''
                  }`}
                  style={{
                    border: '2px solid black',
                    flexGrow: '1',
                    minHeight: isMobile ? '6px' : '6px',
                    justifyContent: 'space-between',
                    // padding: '0.25rem 0.5rem',
                  }}
                  onMouseDown={() => {
                    // setShowDropdownItems(false);
                    // setToggleText(item.specific_issue_name);
                    if (currentValue === item.specific_issue_ID) {
                      setValue(false);
                      // setToggleText('Select an indicator to explore');
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
            } else if (type == 'demographics') {
              return (
                <div
                  key={index}
                  className={`p grid-item ${
                    currentValue === item.specific_issue_ID
                      ? 'grid-item-active'
                      : ''
                  }`}
                  style={{
                    border: '2px solid black',
                    flexGrow: '1',
                    minHeight: '6px',
                    justifyContent: 'space-between',
                    // padding: '0.25rem 0.5rem',
                  }}
                  onMouseDown={() => {
                    // setShowDropdownItems(false);
                    setDemoToggleText(item);
                    setValue(String(index + 1));
                    setMapDemographics(true);
                  }}
                >
                  <p className={'small-font-vh mb-0'}>{item}</p>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}
