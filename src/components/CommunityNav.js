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
}) {
  useEffect(() => {
    if (!communitySearch) {
      setCompareSearch(null);
    }
  });

  const [showSearch, setShowSearch] = useState(false);

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
                    <span style={{ fontWeight: "bold" }}>
                      {value.bolded_text}
                    </span>{" "}
                    {value.remaining_text}
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
                  setShowSearch(false);
                }}
              >
                <div className={"row w-100 p-0 m-0"}>
                  <div className={"col-10 m-0 p-0"}>
                    <span style={{ fontWeight: "bold" }}>
                      {value.bolded_text}
                    </span>{" "}
                    {value.remaining_text}
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
                  communities[communitySearch].bolded_text) ||
                (councils[communitySearch] &&
                  councils[communitySearch].bolded_text)
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
                    communities[compareSearch].bolded_text) ||
                  (councils[compareSearch] &&
                    councils[compareSearch].bolded_text)
                : null
            }
            communitySearch={communitySearch}
            forSearch={false}
            setAddCompare={setAddCompare}
            callBack={setCompareSearch}
            selectedCoord={selectedCoord}
            setSelectedCoord={setSelectedCoord}
            setShowSearch={setShowSearch}
            showSearch={showSearch}
            setShowMap={setShowMap}
            primarySearch={false}
          >
            {getSearchItems(false, boundary)}
          </CommunitySearchBar>
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
              <span className={"underline"}>
                {(communities[communitySearch] &&
                  communities[communitySearch].bolded_text) ||
                  (councils[communitySearch] &&
                    councils[communitySearch].bolded_text)}
              </span>{" "}
              {(communities[communitySearch] &&
                communities[communitySearch].description) ||
                (councils[communitySearch] &&
                  councils[communitySearch].description)}
            </p>

            <p className={"m-0 small-font"}>
              Neighborhoods:{" "}
              {(communities[communitySearch] &&
                communities[communitySearch].remaining_text) ||
                (councils[communitySearch] &&
                  councils[communitySearch].remaining_text)}
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
                  <span className={"underline"}>
                    {(communities[communitySearch] &&
                      communities[communitySearch].bolded_text) ||
                      (councils[communitySearch] &&
                        councils[communitySearch].bolded_text)}
                  </span>{" "}
                  {(communities[communitySearch] &&
                    communities[communitySearch].description) ||
                    (councils[communitySearch] &&
                      councils[communitySearch].description)}
                </p>
                <p className={"m-0 small-font"}>
                  Neighborhoods:{" "}
                  {(communities[communitySearch] &&
                    communities[communitySearch].remaining_text) ||
                    (councils[communitySearch] &&
                      councils[communitySearch].remaining_text)}
                </p>
              </div>

              <div>
                <p className={"m-0 community-description"}>
                  <span className={"underline"}>
                    {(communities[compareSearch] &&
                      communities[compareSearch].bolded_text) ||
                      (councils[compareSearch] &&
                        councils[compareSearch].bolded_text)}
                  </span>{" "}
                  {(communities[compareSearch] &&
                    communities[compareSearch].description) ||
                    (councils[compareSearch] &&
                      councils[compareSearch].description)}
                </p>
                <p className={"m-0 small-font"}>
                  Neighborhoods:{" "}
                  {(communities[compareSearch] &&
                    communities[compareSearch].remaining_text) ||
                    (councils[compareSearch] &&
                      councils[compareSearch].remaining_text)}
                </p>
              </div>
            </Slider>
          </div>
        )}

        {/*{communitySearch &&
                    <p className={"m-0 community-description"}><span
                        className={"underline"}>{communities[communitySearch].bolded_text}</span> {communities[communitySearch].description}
                    </p>}
                {compareSearch &&
                    <p className={"m-0 community-description"}>{communities[compareSearch].bolded_text} {communities[compareSearch].description}</p>}
*/}
        {/*<div
                    className={`${communitySearch ? "" : "d-none"} add-community-btn d-flex flex-row align-items-center`}
                    onClick={(e) => {
                        e.stopPropagation()
                        setCompareSearch(null)
                        setAddCompare(!addCompare)
                    }}
                >
                    {!addCompare ? <FontAwesomeIcon icon={faPlus} width={32}/> :

                    <p className={"m-0"}>Compare Communities</p>
                </div>*/}
      </div>
    </div>
  );
}
