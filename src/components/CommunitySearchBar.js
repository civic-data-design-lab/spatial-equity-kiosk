import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faMinus} from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import {point} from "@turf/helpers";

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const NYC_BBOX = '-74.25,40.5,-73.7,40.9'

export default function CommunitySearchBar({
                                               toggleValue,
                                               callBack,
                                               communitySearch,
                                               forSearch = true,
                                               children,
                                               setAddCompare = null,
                                               selectedCoord,
                                               setSelectedCoord,
                                               showSearch,
                                               setShowSearch,
                                               setShowMap,
                                               selectedCompareCoord,
                                               setselectedCompareCoord,
                                               primarySearch,
                                               badSearch,
                                               setBadSearch,
                                               setSearchSource,
                                               info,
                                               boundary,
                                               setCompareSearch,
                                               setCommunitySearch,
                                               setUserPoints,
                                               userPoints, changed, setChanged, getSearch
                                           }) {
    const [value, setValue] = useState("");
    const [focus, setFocus] = useState(false);
    const [searchItems, setSearchItems] = useState([]);
    const [loading, setloading] = useState(true);
    const [response, setResponse] = useState(null);
    const [firstMatchedRes, setFirstMatchedRes] = useState([]);
    const [defaultItems, setDefaultItems] = useState([])
    const [firstMatchedDefault, setFirstMatchedDefault] = useState(null)

    useEffect(()=>{
      if (!showSearch) {
          setFirstMatchedDefault(null)
          setFirstMatchedRes(null)
      }
    }, [showSearch])

    const forwardGeocoding = (address) => {
        const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${MAPBOX_ACCESS_TOKEN}&autocomplete=false&limit=5&bbox=${NYC_BBOX}`;
        axios
            .get(endpoint, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                // console.log(res.data.features);
                setResponse(res);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setloading(false);
            });
    };

    const getCommunitySearch = (coord, b) => {
        const searchItemFound = [];
        for (const [index, element,] of info.selectedBoundary.features.entries()) {
            if (
                element &&
                booleanPointInPolygon(point(coord), element) &&
                (b == "council" ||
                    (b == "community" && element.properties.Data_YN == "Y"))
            ) {
                const lookup =
                    b == "council"
                        ? String(element.properties.CounDist)
                        : b == "community" && element.properties.Data_YN == "Y"
                            ? element.properties.CDTA2020
                            : null;

                searchItemFound.push(lookup)
            }
        }

        return searchItemFound

    }

    useEffect(() => {
        forwardGeocoding(value);
    }, [value]); // monitor at inputValues

    useEffect(() => {
        if (!response) return;
        if (response.data.features.length == 0) return;

        let firstItem = true;
        let resItems = [];
        for (const v of response.data.features) {
            // console.log(v.center[0].toFixed(3) + " " + v.center[1].toFixed(3), v.place_name);
            if (firstItem) {
                setFirstMatchedRes([v.center[0].toFixed(3), v.center[1].toFixed(3)]);
                firstItem = false;
            }
            resItems.push(
                <div
                    key={v.id}
                    className={`${selectedCoord &&
                    selectedCoord[0] == v.center[0].toFixed(3) &&
                    selectedCoord[1] == v.center[1].toFixed(3)
                        ? "search-item-active"
                        : "search-item-inactive"
                    } col search-item p-2`}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    onMouseDown={(e) => {
                        e.stopPropagation();

                        if (primarySearch) {
                            setSearchSource("search");
                            setSelectedCoord([
                                parseFloat(v.center[0].toFixed(3)),
                                parseFloat(v.center[1].toFixed(3)),
                            ]);
                            setShowSearch(false);
                            const newCommunitySearch = getCommunitySearch([parseFloat(v.center[0].toFixed(3)), parseFloat(v.center[1].toFixed(3))], boundary)

                            e.target.blur();
                        } else {
                            setSearchSource("search");
                            setselectedCompareCoord([
                                parseFloat(v.center[0].toFixed(3)),
                                parseFloat(v.center[1].toFixed(3)),
                            ]);
                            setShowSearch(false);
                            const newCompareSearch = getCommunitySearch([parseFloat(v.center[0].toFixed(3)), parseFloat(v.center[1].toFixed(3))], boundary)
                            if (newCompareSearch.length > 0) {
                                setCompareSearch(newCompareSearch[0])
                            } else {
                                setCompareSearch(null)
                            }
                            e.target.blur();
                        }

                        // console.log([v.center[0].toFixed(3), v.center[1].toFixed(3)])
                        // console.log(selectedCoord)
                    }}
                >
                    <div className={"row w-100 p-0 m-0"}>
                        <div className={"col-10 m-0 p-0"}>
                            <span style={{fontWeight: "bold"}}>
                                {/* {v.center[0].toFixed(3) + " " + v.center[1].toFixed(3)} */}
                            </span>{" "}
                            {v.place_name}
                        </div>
                        <div
                            className={`${selectedCoord &&
                            selectedCoord[0] == v.center[0].toFixed(3) &&
                            selectedCoord[1] == v.center[1].toFixed(3)
                                ? "visible"
                                : "invisible"
                            } d-flex col-2 p-0 flex-row justify-content-center align-items-center`}
                        >
                            <FontAwesomeIcon icon={faArrowRight}/>
                        </div>
                    </div>
                </div>
            );
        }
        setSearchItems(resItems);
    }, [response, selectedCoord]); // monitor at response and selectedCoord updates


     const getSearchItems = () => {
        const matched = React.Children.toArray(children).filter(
            (child) =>
                (value.trim())
                &&
                (child.props.children.props.children[0].props.children[0].props.children
                        .toLowerCase()
                        .includes(value.trim().toLowerCase()) ||
                    child.props.children.props.children[0].props.children[2]
                        .toLowerCase()
                        .includes(value.trim().toLowerCase()))
        );

       if (matched) setFirstMatchedDefault([matched[0]?.props.lookup[boundary], matched[0]?.props.coords])
        return matched
    };

    useEffect(()=>{
       setDefaultItems(getSearchItems())
    }, [value, boundary])

    return (
        <>
            <div
                className={
                    "d-flex flex-row align-items-center mt-3 position-relative community-search-container"
                }
                onClick={(e)=>{e.stopPropagation()}}
                id={`${!forSearch ? "remove-community" : ""}`}
            >
                <input
                    type={"search"}
                    id={forSearch ? "community-search" : "compare-search"}
                    className={`community-search w-100`}
                    placeholder={
                        forSearch
                            ? "Search for a District, Neighborhood, or Address"
                            : "Compare Communities"
                    }
                    style={{
                        borderColor:
                            (badSearch[0] && primarySearch) ||
                            (badSearch[1] && !primarySearch)
                                ? "rgb(255,0,0)"
                                : "",
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        callBack(null)
                        getSearchItems()
                        if (forSearch) {
                            setUserPoints([[], userPoints[1]])
                        } else {
                            setUserPoints([userPoints[0], []])
                        }
                        setChanged(!setChanged)
                    }}
                    onFocus={(e) => {
                        e.stopPropagation()
                        setFocus(true);
                    }}
                    onBlur={(e) => {
                        e.stopPropagation()
                        setFocus(false);
                    }}
                    onKeyUp={(e) => {
                        // if (e.keyCode == 13) forwardGeocoding(value);
                        e.stopPropagation()
                        if (e.key === "Escape") setFocus(false);
                        if (e.key === "Enter" && focus && firstMatchedDefault && firstMatchedDefault[0] && firstMatchedDefault[1]) {
                             console.log("in conditional ", firstMatchedDefault);
                            if (primarySearch && firstMatchedDefault.length === 2) {
                                setShowSearch(false);
                                    setSearchSource("search")
                                setSelectedCoord(firstMatchedDefault[1]);
                                setUserPoints([firstMatchedDefault[1], userPoints[1]])
                                callBack(firstMatchedDefault[0])
                                setShowSearch(false);
                                e.target.blur();
                            } else if (firstMatchedDefault.length === 2) {
                                setSearchSource("search")
                                setselectedCompareCoord(firstMatchedDefault[1]);
                                setUserPoints([userPoints[0], firstMatchedDefault[1]])
                                setShowSearch(false);
                                callBack(firstMatchedDefault[0])
                                e.target.blur();
                            }
                        } else if (e.key === "Enter" && focus && firstMatchedRes) {
                            console.log("in firstMatchedRes ", firstMatchedRes)
                            if (primarySearch) {
                                setUserPoints([[parseFloat(firstMatchedRes[0]), parseFloat(firstMatchedRes[1])], userPoints[1]])
                                setSelectedCoord([parseFloat(firstMatchedRes[0]), parseFloat(firstMatchedRes[1])])
                                setShowSearch(false);
                                setSearchSource("search")
                                let newCommunitySearch =  getCommunitySearch([parseFloat(firstMatchedRes[0]), parseFloat(firstMatchedRes[1])], boundary)
                                callBack(newCommunitySearch[0])
                            } else {
                                setUserPoints([userPoints[0], [parseFloat(firstMatchedRes[0]), parseFloat(firstMatchedRes[1])]])
                                setselectedCompareCoord([parseFloat(firstMatchedRes[0]), parseFloat(firstMatchedRes[1])])
                                setShowSearch(false);
                                setSearchSource("search")
                                let newCompareSearch = getCommunitySearch([parseFloat(firstMatchedRes[0]), parseFloat(firstMatchedRes[1])], boundary)
                                callBack(newCompareSearch[0])
                            }
                        }
                    }}
                    onChange={(e) => {
                        e.stopPropagation()
                        callBack(null);
                        setShowSearch(true);
                        setValue(e.target.value);

                    }}
                    value={toggleValue || value}
                />
                <div
                    className={`${!forSearch ? "position-absolute" : "d-none"
                    } remove-community-btn`}
                    onClick={(e) => {
                        e.stopPropagation();
                        setAddCompare(false);
                        setselectedCompareCoord([]);
                        callBack(null);
                        setBadSearch([badSearch[0], 0]);
                    }}
                >
                    <FontAwesomeIcon icon={faMinus} width={32}/>
                </div>
            </div>
            {/* {focus && getSearchItems().length > 0 && <div>
                <ul className={`list-unstyled community-dropdown`}>
                    {getSearchItems()}
                </ul>
            </div>} */}
            {focus && searchItems.length > 0 && (
                <div>
                    {/* {searchItems.length > 0 && showSearch && <div> */}
                    <ul className={`list-unstyled community-dropdown`}>
                        {defaultItems}
                        {searchItems}
                    </ul>
                </div>
            )}
        </>
    );
}