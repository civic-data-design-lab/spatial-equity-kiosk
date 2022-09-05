import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Slider from "./Carousel";

import CommunitySearchBar from "./CommunitySearchBar";

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
}) {
  useEffect(() => {
    if (!communitySearch) {
      setCompareSearch(null);
    }
  });

  const [showSearch, setShowSearch] = useState(false);
  const [showCompareSearch, setShowCompareSearch] = useState(false);

  const getSearchItems = (forSearch, boundary) => {
    let searchItems = [];
    let boundaryData;
    if (boundary === "community") {
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
                    ? "search-item-active"
                    : "search-item-inactive"
                } col search-item p-2`}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setCommunitySearch(key);
                  setShowSearch(false);
                }}
              >
                <div className={"row w-100 p-0 m-0"}>
                  <div className={"col-10 m-0 p-0"}>
                    <span style={{ fontWeight: "bold" }}>{value.name}</span>{" "}
                    {value.neighborhoods}
                  </div>
                  <div
                    className={`${
                      communitySearch && communitySearch.startsWith(key)
                        ? "visible"
                        : "invisible"
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
                    ? "search-item-active"
                    : "search-item-inactive"
                } col search-item p-2`}
                onMouseDown={() => {
                  setCompareSearch(key);
                  setShowCompareSearch(false);
                }}
              >
                <div className={"row w-100 p-0 m-0"}>
                  <div className={"col-10 m-0 p-0"}>
                    <span style={{ fontWeight: "bold" }}>{value.name}</span>{" "}
                    {value.neighborhoods}
                  </div>
                  <div
                    className={`${
                      compareSearch && compareSearch.startsWith(key)
                        ? "visible"
                        : "invisible"
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

  // console.log("communitySearch", communitySearch);
  return (
    <div
      className={
        "community-nav-container d-flex flex-column justify-content-between h-100"
      }
    >
      <div className={"position-relative"}>
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
        >
          {getSearchItems(true, boundary)}
        </CommunitySearchBar>

        {communitySearch && addCompare && (
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
          >
            {getSearchItems(false, boundary)}
          </CommunitySearchBar>
        )}

        {(badSearch[0] == 1 || badSearch[1] == 1) && (
          <div className={"small-font"}>
            {errorCode == 1
              ? `${
                  communitySearch
                    ? boundary === "council"
                      ? councils[communitySearch]
                        ? councils[communitySearch].name
                        : ""
                      : communities[communitySearch]
                      ? communities[communitySearch].name
                      : ""
                    : ""
                } is already selected!`
              : `Nothing found. Try searching for something else.`}
          </div>
        )}

        {communitySearch && !addCompare && (
          <div
            className={`${
              communitySearch ? "" : "d-none"
            } mt-3 add-community-btn d-flex flex-row align-items-center justify-content-between`}
            onClick={(e) => {
              e.stopPropagation();
              setCompareSearch(null);
              setAddCompare(!addCompare);
            }}
          >
            {!addCompare ? (
              <p className={"m-0"}>Compare Communities</p>
            ) : (
              <p className={"m-0"}>Remove Community</p>
            )}
            {!addCompare ? (
              <FontAwesomeIcon icon={faPlus} width={32} />
            ) : (
              <FontAwesomeIcon icon={faMinus} width={32} />
            )}
          </div>
        )}
      </div>

      <div className={"community-nav-text"}>
        {communitySearch && !compareSearch && (
          <>
            <p className={"m-0 community-description"}>
              <span>
                {(communities[communitySearch] &&
                  communities[communitySearch].name) ||
                  (councils[communitySearch] && councils[communitySearch].text)}

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
          </>
        )}

        {compareSearch && communitySearch && (
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
        )}
      </div>
    </div>
  );
}
