import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

import CommunitySearchBar from './CommunitySearchBar';
import Typewriter from 'typewriter-effect';

export default function CommunityNav({
  communities,
  communitySearch,
  compareSearch,
  setCommunitySearch,
  setCompareSearch,
  boundary,
  councils,
  addCompare,
  setAddCompare,
  selectedCoord,
  setSelectedCoord,
  showMap,
  setShowMap,
  selectedCompareCoord,
  setselectedCompareCoord,
  badSearch,
  setBadSearch,
  setSearchSource,
  errorCode,
  setErrorCode,
  info,
  setUserPoints,
  userPoints,
  selectedChapter,
}) {
  const [showSearch, setShowSearch] = useState(false);
  const [showCompareSearch, setShowCompareSearch] = useState(false);
  const [notClickable, setNotClickable] = useState(false);

  const getSearchItems = (forSearch, boundary) => {
    let searchItems = [];
    let boundaryData;
    if (boundary === 'community') {
      boundaryData = communities;
    } else {
      boundaryData = councils;
    }
    switch (forSearch) {
      case true:
        for (let [key, value] of Object.entries(boundaryData)) {
          if (key !== compareSearch) {
            searchItems.push(
              <div
                key={key}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className={`${
                  communitySearch && communitySearch.startsWith(key)
                    ? 'search-item-active'
                    : 'search-item-inactive'
                } col search-item p-2`}
                onMouseDown={(e) => {
                  e.stopPropagation(e);
                  /*setCommunitySearch(key);*/
                  setShowSearch(false);
                  setSearchSource('search');
                  for (const [
                    index,
                    element,
                  ] of info.selectedBoundary.features.entries()) {
                    if (
                      element.properties.CDTA2020?.toString() === key ||
                      element.properties.CounDist?.toString() === key
                    ) {
                      setSelectedCoord([
                        element.properties.X_Cent,
                        element.properties.Y_Cent,
                      ]);
                      break;
                    }
                  }
                  e.target.blur();
                }}
              >
                <div className={'row w-100 p-0 m-0'}>
                  <div className={'col-10 m-0 p-0'}>
                    <span style={{ fontWeight: 'bold' }}>{value.name}</span>{' '}
                    {value.neighborhoods}
                  </div>
                  <div
                    className={`${
                      communitySearch && communitySearch.startsWith(key)
                        ? 'visible'
                        : 'invisible'
                    } d-flex col-2 p-0 flex-row justify-content-center align-items-center`}
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </div>
                </div>
              </div>
            );
          }
        }
        break;
      case false:
        for (let [key, value] of Object.entries(boundaryData)) {
          if (key !== communitySearch) {
            searchItems.push(
              <div
                key={key}
                className={`${
                  compareSearch && compareSearch.startsWith(key)
                    ? 'search-item-active'
                    : 'search-item-inactive'
                } col search-item p-2`}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setCompareSearch(key);
                  setShowCompareSearch(false);
                  setSearchSource('search');
                  for (const [
                    index,
                    element,
                  ] of info.selectedBoundary.features.entries()) {
                    if (
                      element.properties.CDTA2020?.toString() === key ||
                      element.properties.CounDist?.toString() === key
                    ) {
                      setselectedCompareCoord([
                        element.properties.X_Cent,
                        element.properties.Y_Cent,
                      ]);
                      break;
                    }
                  }
                  e.target.blur();
                }}
              >
                <div className={'row w-100 p-0 m-0'}>
                  <div className={'col-10 m-0 p-0'}>
                    <span style={{ fontWeight: 'bold' }}>{value.name}</span>{' '}
                    {value.neighborhoods}
                  </div>
                  <div
                    className={`${
                      compareSearch && compareSearch.startsWith(key)
                        ? 'visible'
                        : 'invisible'
                    } d-flex col-2 p-0 flex-row justify-content-center align-items-center`}
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </div>
                </div>
              </div>
            );
          }
        }
    }

    return searchItems;
  };

  return (
    <div
      className={
        'community-nav-container d-flex flex-column justify-content-between h-100'
      }
    >
      <div
        className={`position-relative`}
        style={{ pointerEvents: selectedChapter === 3 ? '' : 'none' }}
      >
        <CommunitySearchBar
          selectedCompareCoord={selectedCompareCoord}
          setselectedCompareCoord={setselectedCompareCoord}
          toggleValue={
            communitySearch
              ? (communities[communitySearch] &&
                  communities[communitySearch].name) ||
                (councils[communitySearch] && councils[communitySearch].name)
              : null
          }
          communitySearch={communitySearch}
          callBack={setCommunitySearch}
          selectedCoord={selectedCoord}
          setSelectedCoord={setSelectedCoord}
          setShowSearch={setShowSearch}
          showSearch={showSearch}
          setShowMap={setShowMap}
          primarySearch={true}
          badSearch={badSearch}
          setBadSearch={setBadSearch}
          setSearchSource={setSearchSource}
          boundary={boundary}
          info={info}
          setCommunitySearch={setCommunitySearch}
          setCompareSearch={setCompareSearch}
          setAddCompare={setAddCompare}
          setUserPoints={setUserPoints}
          userPoints={userPoints}
        >
          {getSearchItems(true, boundary)}
        </CommunitySearchBar>

        <div className={'community-nav-text'}>
          {communitySearch && (
            <>
              {boundary == 'council' && (
                <p className={'m-0 community-description'}>
                  <span>
                    {(communities[communitySearch] &&
                      communities[communitySearch].name) ||
                      (councils[communitySearch] &&
                        councils[communitySearch].text)}

                    <a
                      className={'underline'}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      href={`mailto:${
                        (councils[communitySearch] &&
                          councils[communitySearch].councilmember_email) ||
                        null
                      }`}
                    >
                      {(councils[communitySearch] &&
                        councils[communitySearch].councilmember_name) ||
                        null}
                    </a>
                  </span>
                  {councils[communitySearch] && '.'}{' '}
                  {(communities[communitySearch] &&
                    communities[communitySearch].description) ||
                    (councils[communitySearch] &&
                      councils[communitySearch].description)}
                </p>
              )}

              <p className={'m-0 small-font pt-3'}>
                {(communities[communitySearch] &&
                  communities[communitySearch].neighborhoods) ||
                  (councils[communitySearch] &&
                    councils[communitySearch].neighborhoods)}
              </p>
            </>
          )}
        </div>

        {(communitySearch || compareSearch) && addCompare && (
          <CommunitySearchBar
            selectedCompareCoord={selectedCompareCoord}
            setselectedCompareCoord={setselectedCompareCoord}
            toggleValue={
              compareSearch
                ? (communities[compareSearch] &&
                    communities[compareSearch].name) ||
                  (councils[compareSearch] && councils[compareSearch].name)
                : null
            }
            communitySearch={communitySearch}
            forSearch={false}
            setAddCompare={setAddCompare}
            callBack={setCompareSearch}
            selectedCoord={selectedCoord}
            setSelectedCoord={setSelectedCoord}
            setShowSearch={setShowCompareSearch}
            showSearch={showCompareSearch}
            setShowMap={setShowMap}
            primarySearch={false}
            badSearch={badSearch}
            setBadSearch={setBadSearch}
            setSearchSource={setSearchSource}
            boundary={boundary}
            info={info}
            setUserPoints={setUserPoints}
            userPoints={userPoints}
            setCompareSearch={setCompareSearch}
          >
            {getSearchItems(false, boundary)}
          </CommunitySearchBar>
        )}

        {(badSearch[0] == 1 || badSearch[1] == 1) && (
          <div className={'m-0 small-font'}>
            {errorCode == 1
              ? `${
                  communitySearch
                    ? boundary === 'council'
                      ? councils[communitySearch]
                        ? councils[communitySearch].name
                        : ''
                      : communities[communitySearch]
                      ? communities[communitySearch].name
                      : ''
                    : ''
                } is already selected!`
              : `Nothing found. Try searching for something else.`}
          </div>
        )}

        {!communitySearch && (
          <div
            className={'d-flex flex-column align-items-start w-100 mt-3 mb-3'}
          >
            <p className={'m-0'} style={{ fontSize: '1.75rem' }}>
              Try searching for &thinsp;
            </p>

            <div className={'typewriter-container'}>
              <Typewriter
                options={{
                  strings:
                    boundary === 'community'
                      ? [
                          'your address',
                          'Hamilton Heights',
                          '111 John Street',
                          'Bronx 9',
                          'Bedford Stuyvesant',
                          '350 5th Avenue',
                        ]
                      : [
                          'your address',
                          'Washington Heights',
                          '350 5th Avenue',
                          'District 5',
                          '111 John Street',
                          'Bensonhurst',
                        ],
                  autoStart: true,
                  loop: true,
                  pauseFor: 2000,
                }}
              />
            </div>
          </div>
        )}

        {communitySearch && !addCompare && (
          <div
            className={`${
              communitySearch ? '' : 'd-none'
            } mt-3 add-community-btn d-flex flex-row align-items-center justify-content-between`}
            onClick={(e) => {
              e.stopPropagation();
              setCompareSearch(null);
              setAddCompare(!addCompare);
            }}
          >
            {!addCompare ? (
              <p className={'m-0 small-font'}>Compare Communities</p>
            ) : (
              <p className={'m-0 small-font'}>Remove Community</p>
            )}
            {!addCompare ? (
              <FontAwesomeIcon icon={faPlus} width={32} />
            ) : (
              <FontAwesomeIcon icon={faMinus} width={32} />
            )}
          </div>
        )}

        <div>
          <p className={'m-0 community-description'}>
            <span>
              {(communities[compareSearch] &&
                communities[compareSearch].name) ||
                (councils[compareSearch] && councils[compareSearch].text)}

              <a
                className={'underline'}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                href={`mailto:${
                  (councils[compareSearch] &&
                    councils[compareSearch].councilmember_email) ||
                  null
                }`}
              >
                {(councils[compareSearch] &&
                  councils[compareSearch].councilmember_name) ||
                  null}
              </a>
            </span>{' '}
            {(communities[compareSearch] &&
              communities[compareSearch].description) ||
              (councils[compareSearch] && councils[compareSearch].description)}
          </p>

          <p className={'m-0 small-font pt-3'}>
            {(communities[compareSearch] &&
              communities[compareSearch].neighborhoods) ||
              (councils[compareSearch] &&
                councils[compareSearch].neighborhoods)}
          </p>
        </div>
      </div>

      {/* {compareSearch && communitySearch && (
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Slider>
              <div>
                <p className={"m-0 community-description"}>
                  <span>
                    {(communities[communitySearch] &&
                      communities[communitySearch].name) ||
                      (councils[communitySearch] &&
                        councils[communitySearch].text)}

                    <a
                      className={"underline"}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      href={`mailto:${
                        (councils[communitySearch] &&
                          councils[communitySearch].councilmember_email) ||
                        null
                      }`}
                    >
                      {(councils[communitySearch] &&
                        councils[communitySearch].councilmember_name) ||
                        null}
                    </a>
                  </span>{" "}
                  {(communities[communitySearch] &&
                    communities[communitySearch].description) ||
                    (councils[communitySearch] &&
                      councils[communitySearch].description)}
                </p>

                <p className={"m-0 small-font"}>
                  {(communities[communitySearch] &&
                    communities[communitySearch].neighborhoods) ||
                    (councils[communitySearch] &&
                      councils[communitySearch].neighborhoods)}
                </p>
              </div>

              <div>
                <p className={"m-0 community-description"}>
                  <span>
                    {(communities[compareSearch] &&
                      communities[compareSearch].name) ||
                      (councils[compareSearch] && councils[compareSearch].text)}

                    <a
                      className={"underline"}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      href={`mailto:${
                        (councils[compareSearch] &&
                          councils[compareSearch].councilmember_email) ||
                        null
                      }`}
                    >
                      {(councils[compareSearch] &&
                        councils[compareSearch].councilmember_name) ||
                        null}
                    </a>
                  </span>{" "}
                  {(communities[compareSearch] &&
                    communities[compareSearch].description) ||
                    (councils[compareSearch] &&
                      councils[compareSearch].description)}
                </p>

                <p className={"m-0 small-font"}>
                  {(communities[compareSearch] &&
                    communities[compareSearch].neighborhoods) ||
                    (councils[compareSearch] &&
                      councils[compareSearch].neighborhoods)}
                </p>
              </div>
            </Slider>
          </div>
        )}*/}
    </div>
  );
}
