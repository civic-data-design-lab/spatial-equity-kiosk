// import React and React hooks
import React, { useMemo, useState } from 'react';

// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

// import components
import CommunitySearchBar from './CommunitySearchBar';

// import npm packages
import Typewriter from 'typewriter-effect';

// import text and/or data
import _COMMUNITIES from '../texts/communities.json';
import _COUNCILS from '../texts/councildistricts.json';

/**
 * CommunityNav.js renders the Community Profiles section of the navigation 
 * which includes the community and compare search box as well as the typewriter effect
 * @constructor
 * @param {string} communitySearch - user's query for community (primary)
 * @param {string} compareSearch - user's query for community they want to compare the primary search with
 * @param {Function} setCommunitySearch - callback function to set the community search query of the app.
 * @param {Function} setCompareSearch - callback function to set the compare search query of the app.
 * @param {string} boundary - string representing the toggled active boundary (either 'council' or 'community').
 * @param {boolean} addCompare - whether or not the user has compare mode on
 * @param {Function} setAddCompare - callback to update whether the app's addCompare state
 * @param {Function} setShowMap - update the app's showMap state
 * @param {} selectedCoord - TODO
 * @param {Function} setSelectedCoord - TODO
 * @param {} selectedCompareCoord - TODO
 * @param {Function} setselectedCompareCoord - TODO
 * @param {} badSearch - TODO
 * @param {Function} setBadSearch - TODO
 * @param {Function} setSearchSource - update where the source is coming from (either from the map "click" or from the search bar "search")
 * @param {} errorCode - TODO
 * @param {Object} info - contains information calculated in App.js (binList, mapScale, metricGoodorBad, seletedBoundary, selectedMetric, selectedMetricArray, sortedSelectedMetricArray, uniqueValueArray)
 * @param {Function} setUserPoints - updates the app's userPoints state of coordinates for the primary and secondary community lookups
 * @param {Array[]} userPoints - an array of two arrays, the first which represented the coordinates of the primary community lookup and the second which represents the coordinates of the secondary community lookup
 * @param {Function} setSelectedChapter -function to set the current active chapter of the web app (either 1, 2, 3, or 4).
  * 
 */

export default function CommunityNav({
  communitySearch,
  compareSearch,
  setCommunitySearch,
  setCompareSearch,
  boundary,
  addCompare,
  setAddCompare,
  setShowMap,
  selectedCoord,
  setSelectedCoord,
  selectedCompareCoord,
  setselectedCompareCoord,
  badSearch,
  setBadSearch,
  setSearchSource,
  errorCode,
  info,
  setUserPoints,
  userPoints,
  selectedChapter,
}) {
  const [showSearch, setShowSearch] = useState(false);
  const [showCompareSearch, setShowCompareSearch] = useState(false);


  // pre-baked search using imported geojson data 
  const getSearchItems = (forSearch) => {
    let searchItems = [];
    let boundaryData;
    if (boundary === 'community') {
      boundaryData = _COMMUNITIES;
    } else {
      boundaryData = _COUNCILS;
    }

    if (forSearch) {
      for (let [key, value] of Object.entries(boundaryData)) {
        if (key === compareSearch) {
          continue;
        }
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

              // match council district or community board search to data and get centroid
              e.stopPropagation(e);
              setShowSearch(false);
              setSearchSource('search');
              setCommunitySearch(key);

              const targetElement = info.selectedBoundary.features.find(
                (element) =>
                  element.properties.CDTA2020?.toString() === key ||
                  element.properties.CounDist?.toString() === key
              );

              if (targetElement) {
                setSelectedCoord([
                  targetElement.properties.X_Cent,
                  targetElement.properties.Y_Cent,
                ]);
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
      return searchItems;
    }

    for (let [key, value] of Object.entries(boundaryData)) {
      if (key === communitySearch) {
        continue;
      }
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

            const targetElement = info.selectedBoundary.features.find(
              (element) =>
                element.properties.CDTA2020?.toString() === key ||
                element.properties.CounDist?.toString() === key
            );

            if (targetElement) {
              setselectedCompareCoord([
                targetElement.properties.X_Cent,
                targetElement.properties.Y_Cent,
              ]);
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

    return searchItems;
  };

  const searchItems = useMemo(
    () => getSearchItems(true),
    [boundary, communitySearch, compareSearch]
  );
  const compareSearchItems = useMemo(
    () => getSearchItems(false),
    [boundary, communitySearch, compareSearch]
  );

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
              ? (_COMMUNITIES[communitySearch] &&
                  _COMMUNITIES[communitySearch].name) ||
                (_COUNCILS[communitySearch] && _COUNCILS[communitySearch].name)
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
          {searchItems}
        </CommunitySearchBar>

        <div className={'community-nav-text'}>
          {communitySearch && (
            <>
              {boundary == 'council' && (
                <p className={'m-0 community-description'}>
                  <span>
                    {(_COMMUNITIES[communitySearch] &&
                      _COMMUNITIES[communitySearch].name) ||
                      (_COUNCILS[communitySearch] &&
                        _COUNCILS[communitySearch].text)}

                    <a
                      className={'underline'}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      href={`mailto:${
                        (_COUNCILS[communitySearch] &&
                          _COUNCILS[communitySearch].councilmember_email) ||
                        null
                      }`}
                    >
                      {(_COUNCILS[communitySearch] &&
                        _COUNCILS[communitySearch].councilmember_name) ||
                        null}
                    </a>
                  </span>
                  {_COUNCILS[communitySearch] && '.'}{' '}
                  {(_COMMUNITIES[communitySearch] &&
                    _COMMUNITIES[communitySearch].description) ||
                    (_COUNCILS[communitySearch] &&
                      _COUNCILS[communitySearch].description)}
                </p>
              )}

              <p className={'m-0 small-font pt-3'}>
                {(_COMMUNITIES[communitySearch] &&
                  _COMMUNITIES[communitySearch].neighborhoods) ||
                  (_COUNCILS[communitySearch] &&
                    _COUNCILS[communitySearch].neighborhoods)}
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
                ? (_COMMUNITIES[compareSearch] &&
                    _COMMUNITIES[compareSearch].name) ||
                  (_COUNCILS[compareSearch] && _COUNCILS[compareSearch].name)
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
            {compareSearchItems}
          </CommunitySearchBar>
        )}

        {(badSearch[0] == 1 || badSearch[1] == 1) && (
          <div className={'m-0 small-font'}>
            {errorCode == 1
              ? `${
                  communitySearch
                    ? boundary === 'council'
                      ? _COUNCILS[communitySearch]
                        ? _COUNCILS[communitySearch].name
                        : ''
                      : _COMMUNITIES[communitySearch]
                      ? _COMMUNITIES[communitySearch].name
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
          <p
            className={'m-0 community-description'}
            style={{ padding: boundary == 'council' ? '' : '0' }}
          >
            <span>
              {_COUNCILS[compareSearch] && _COUNCILS[compareSearch].text}

              <a
                className={'underline'}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                href={`mailto:${
                  (_COUNCILS[compareSearch] &&
                    _COUNCILS[compareSearch].councilmember_email) ||
                  null
                }`}
              >
                {(_COUNCILS[compareSearch] &&
                  _COUNCILS[compareSearch].councilmember_name) ||
                  null}
              </a>
            </span>{' '}
            {(_COMMUNITIES[compareSearch] &&
              _COMMUNITIES[compareSearch].description) ||
              (_COUNCILS[compareSearch] &&
                _COUNCILS[compareSearch].description)}
          </p>

          <p className={'m-0 small-font pt-3'}>
            {(_COMMUNITIES[compareSearch] &&
              _COMMUNITIES[compareSearch].neighborhoods) ||
              (_COUNCILS[compareSearch] &&
                _COUNCILS[compareSearch].neighborhoods)}
          </p>
        </div>
      </div>
    </div>
  );
}
