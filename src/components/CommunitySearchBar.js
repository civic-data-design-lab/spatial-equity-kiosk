// import React and React hooks
import React, { useEffect, useState } from 'react';

// import fonts
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faXmark,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

// import packages
import axios from 'axios';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { point } from '@turf/helpers';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const NYC_BBOX = '-74.25,40.5,-73.7,40.9';


/**
 * CommunitySearchBar.js renders the community search bars which are used for the primary community search and the secondary community search 
 * when compare mode is active. Handles forward geocoding, displaying search options and behavior for when an option is selected
 * 
 * @constructor
 * @param {boolean} isMobile - whether to display the mobile or web version, based on inner width and inner height of screen.
 * @param {string} toggleValue - value inside the search bar
 * @param {Function} callBack - callback function for setting toggleValue state, changing what text is displayed in search bar
 * @param {string} communitySearch - user's query for community (primary)
 * @param {boolean} forSearch - whether the component is used for searching purposes
 * @param {Element[]} children - a list of children for dropdown list, elements ready to be displayed
 * @param {Function} setAddCompare - callback to update whether the app's addCompare state
 * @param {} selectedCoord - TODO
 * @param {Function} setSelectedCoord - TODO
 * @param {Function} setShowSearch - whether to display the dropdown items
 * @param {Function} setselectedCompareCoord - TODO
 * @param {boolean} primarySearch - if the search box is used for community search or compare search
 * @param {} badSearch - TODO
 * @param {Function} setSearchSource - update where the source is coming from (either from the map "click" or from the search bar "search")
 * @param {Object} info - contains information calculated in App.js (binList, mapScale, metricGoodorBad, seletedBoundary, selectedMetric, selectedMetricArray, sortedSelectedMetricArray, uniqueValueArray)
 * @param {string} boundary - string representing the toggled active boundary (either 'council' or 'community').
 * @param {Function} setCompareSearch - function to set the app's current (secondary) compare search 
 * @param {Array[]} userPoints - an array of two arrays, the first which represented the coordinates of the primary community lookup and the second which represents the coordinates of the secondary community lookup
 * @param {Function} setUserPoints - callback function which updates app's userPoints state
 */


export default function CommunitySearchBar({
  isMobile = false,
  toggleValue,
  callBack,
  communitySearch,
  forSearch = true,
  children,
  setAddCompare = null,
  selectedCoord,
  setSelectedCoord,
  setShowSearch,
  setselectedCompareCoord,
  primarySearch,
  badSearch,
  setBadSearch,
  setSearchSource,
  info,
  boundary,
  setCompareSearch,
  setResize = null,
  setResizeIssues = null,
  setUserPoints,
  userPoints,
}) {

  // value of input (searchbar)
  const [value, setValue] = useState(''); 
  // whether to show dropdown items or not
  const [focus, setFocus] = useState(false);
  // list of objects of search items from forward geocoding transformed into divs
  const [searchItems, setSearchItems] = useState([]);
  // loader
  const [loading, setloading] = useState(true);
  // response from forward geocoding
  const [response, setResponse] = useState(null);
  const [firstMatchedRes, setFirstMatchedRes] = useState([]);
  const [hover, setHover] = useState(false);


  useEffect(() => {
    if (toggleValue) {
      setValue(toggleValue);
    } else {
      setValue('');
    }
  }, [toggleValue]);


  useEffect(() => {
    forwardGeocoding(value);
  }, [value]); // monitor at inputValues

  
  // forward geocoding to get address lookups using mapbox API
  const forwardGeocoding = () => {
    const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${MAPBOX_ACCESS_TOKEN}&autocomplete=false&limit=5&bbox=${NYC_BBOX}`;
    axios
      .get(endpoint, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        setResponse(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setloading(false);
      });
  };


  // function takes a pair of coordinates and a boundary and returns a list of names that match
  const getCommunitySearch = (coord, b) => {
    const searchItemFound = [];
    for (const [index, element] of info.selectedBoundary.features.entries()) {
      if (
        element &&
        booleanPointInPolygon(point(coord), element) &&
        (b == 'council' ||
          (b == 'community' && element.properties.Data_YN == 'Y'))
      ) {
        const lookup =
          b == 'council'
            ? String(element.properties.CounDist)
            : b == 'community' && element.properties.Data_YN == 'Y'
            ? element.properties.CDTA2020
            : null;

        searchItemFound.push(lookup);
      }
    }

    return searchItemFound;
  };


  useEffect(() => {
    if (!response) return;
    if (response.data.features.length == 0) return;

    // take results from geocoding and get elements to display in dropdown
    let firstItem = true;
    let resItems = [];
    for (const v of response.data.features) {
      if (firstItem) {
        setFirstMatchedRes([v.center[0].toFixed(3), v.center[1].toFixed(3)]);
        firstItem = false;
      }
      resItems.push(
        <div
          key={v.id}
          className={`${
            selectedCoord &&
            selectedCoord[0] == v.center[0].toFixed(3) &&
            selectedCoord[1] == v.center[1].toFixed(3)
              ? 'search-item-active'
              : 'search-item-inactive'
          } col search-item p-2`}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onMouseDown={(e) => {
            e.stopPropagation();

            if (primarySearch) {
              setSearchSource('search');
              setSelectedCoord([
                parseFloat(v.center[0].toFixed(3)),
                parseFloat(v.center[1].toFixed(3)),
              ]);
              setShowSearch(false);
              const newCommunitySearch = getCommunitySearch(
                [
                  parseFloat(v.center[0].toFixed(3)),
                  parseFloat(v.center[1].toFixed(3)),
                ],
                boundary
              );

              e.target.blur();
            } else {
              setSearchSource('search');
              setselectedCompareCoord([
                parseFloat(v.center[0].toFixed(3)),
                parseFloat(v.center[1].toFixed(3)),
              ]);
              setShowSearch(false);
              const newCompareSearch = getCommunitySearch(
                [
                  parseFloat(v.center[0].toFixed(3)),
                  parseFloat(v.center[1].toFixed(3)),
                ],
                boundary
              );
              if (newCompareSearch.length > 0) {
                setCompareSearch(newCompareSearch[0]);
              } else {
                setCompareSearch(null);
              }
              e.target.blur();
            }
          }}
        >
          <div className={'row w-100 p-0 m-0'}>
            <div className={'col-10 m-0 p-0'}>
              <span style={{ fontWeight: 'bold' }}></span> {v.place_name}
            </div>
            <div
              className={`${
                selectedCoord &&
                selectedCoord[0] == v.center[0].toFixed(3) &&
                selectedCoord[1] == v.center[1].toFixed(3)
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
    setSearchItems(resItems);
  }, [response, selectedCoord]); // monitor at response and selectedCoord updates



  // function that gets prebaked search and filters appropriately based on query
  const getSearchItems = () => {
    return React.Children.toArray(children).filter(
      (child) =>
        value.trim() &&
        (child.props.children.props.children[0].props.children[0].props.children
          .toLowerCase()
          .includes(value.trim().toLowerCase()) ||
          child.props.children.props.children[0].props.children[2]
            .toLowerCase()
            .includes(value.trim().toLowerCase()))
    );
  };

  return (
    <>
      <div
        className={`d-flex flex-row align-items-center mt-3 position-relative community-search-container ${
          isMobile ? 'h-100' : ''
        }`}
        id={`${!forSearch ? 'remove-community' : ''}`}
        onMouseEnter={() => {
          if (communitySearch) {
            setHover(true);
          }
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
      >
        <input
          type={'search'}
          id={forSearch ? 'community-search' : 'compare-search'}
          className={`community-search w-100 transition-color`}
          placeholder={`Search for a District, Neighborhood, or Address`}
          style={{
            color: 'white',
            backgroundColor: 'black',
            border:
              (badSearch[0] && primarySearch) ||
              (badSearch[1] && !primarySearch)
                ? '2px solid yellow'
                : isMobile
                ? '2px solid black'
                : '2px solid white',
          }}
          onClick={(e) => {
            e.stopPropagation();
            setResize && setResize(true);
            setResizeIssues && setResizeIssues(false);
            //callBack(null); // naughty function
          }}
          onFocus={(e) => {
            e.stopPropagation();
            setFocus(true);
          }}
          onBlur={(e) => {
            e.stopPropagation();
            setFocus(false);
          }}
          onChange={(e) => {
            e.stopPropagation();
            //callBack(null);
            setShowSearch(true);
            setValue(e.target.value);
          }}
          value={value}
        />
        {(!hover || (forSearch && !communitySearch)) && (
          <FontAwesomeIcon
            style={{
              position: 'absolute',
              right: '0.5rem',
              pointerEvents: 'none',
              color: 'white',
            }}
            icon={faSearch}
            width={32}
          />
        )}
        <div
          className={`${
            hover && ((forSearch && communitySearch) || !forSearch)
              ? 'position-absolute'
              : 'd-none'
          } remove-community-btn`}
          onClick={(e) => {
            e.stopPropagation();
            setselectedCompareCoord([]);
            callBack(null);
            setBadSearch([badSearch[0], 0]);
            setAddCompare(false);

            if (forSearch) {
              setUserPoints([[], []]);
            } else {
              setUserPoints([
                userPoints[0] ? userPoints[0].toFixed(6) : userPoints[0],
                [],
              ]);
            }
          }}
        >
          <FontAwesomeIcon
            style={{ padding: '0.25em 0.5em' }}
            icon={faXmark}
            width={32}
          />
        </div>
      </div>
      {focus && searchItems.length > 0 && (
        <div>
          <ul className={`list-unstyled community-dropdown`}>
            {getSearchItems()}
            {searchItems}
          </ul>
        </div>
      )}
    </>
  );
}
