import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faMinus} from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import Typewriter from "typewriter-effect";

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
                                               boundary
                                           }) {
    const [value, setValue] = useState("");
    const [focus, setFocus] = useState(false);
    const [searchItems, setSearchItems] = useState([]);
    const [loading, setloading] = useState(true);
    const [response, setResponse] = useState(null);
    const [firstMatchedRes, setFirstMatchedRes] = useState([]);

    const [searching, setSearching] = useState(toggleValue);


    // console.log('!!!c', communitySearch, )
    // console.log('!!!s', selectedCoord)
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

    useEffect(()=>{
        if (toggleValue) {
            setSearching(true)
        }
    }, [])

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
                    className={`${
                        selectedCoord &&
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
                            setFocus(false);
                        } else {
                            setSearchSource("search");
                            setselectedCompareCoord([
                                parseFloat(v.center[0].toFixed(3)),
                                parseFloat(v.center[1].toFixed(3)),
                            ]);
                            setFocus(false);
                        }

                        // console.log([v.center[0].toFixed(3), v.center[1].toFixed(3)])
                        // console.log(selectedCoord)
                    }}
                >
                    <div className={"row w-100 p-0 m-0"}>
                        <div className={"col-10 m-0 p-0"}>
              <span style={{fontWeight: "bold"}}>
                {v.center[0].toFixed(3) + " " + v.center[1].toFixed(3)}
              </span>{" "}
                            {v.place_name}
                        </div>
                        <div
                            className={`${
                                selectedCoord &&
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
        return React.Children.toArray(children).filter(
            (child) =>
                !value ||
                child.props.children.props.children[0].props.children[0].props.children
                    .toLowerCase()
                    .includes(value.toLowerCase()) ||
                child.props.children.props.children[0].props.children[2]
                    .toLowerCase()
                    .includes(value.toLowerCase())
        );
    };

    return (
        <>
            <div
                className={
                    "d-flex flex-row align-items-center mt-3 position-relative community-search-container"
                }
                id={`${!forSearch ? "remove-community" : ""}`}
            >

                {forSearch && <>
                    <div
                        style={{
                            maxWidth: searching || toggleValue ? "0vw" : "25vw",
                            transition: "max-width 0.5s, padding 0.4s, border 0.4s, opacity 0.3s",
                            opacity: searching ? 0 : 1
                        }}

                    ><p className={"m-0"}
                        style={{fontSize: searching ? "0" : "0.75rem", opacity:searching?0:1, transition: "all 0.4s"}}
                    >Try searching for &thinsp;</p></div>

                    <div className={"typewriter-container"}
                         style={{
                             maxWidth: searching || toggleValue ? "0vw" : "25vw",
                             transition: "max-width 0.5s, padding 0.4s, border 0.4s, opacity 0.3s",
                             opacity: searching || toggleValue ? 0 : 1
                         }}
                         onClick={(e) => {
                             e.stopPropagation()
                             setSearching(true)
                         }}
                    >
                        {!searching && <Typewriter
                            options={{
                                strings: (boundary === "community" ? ['your address', 'Hamilton Heights', '111 John Street',
                                    "Bronx 9", 'Bedford Stuyvesant', '350 5th Avenue'] : ["your address", "Washington Heights", "350 5th Avenue", "District 5", "111 John Street",
                                    "Bensonhurst"]),
                                autoStart: true,
                                loop: true,
                                pauseFor: 2000,
                            }}
                        />}
                    </div>
                    <input
                        type={"search"}
                        className={`community-search w-100 ${searching && !toggleValue ? "underline" : ""}`}
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
                            maxWidth: searching || toggleValue ? "25vw" : "0vw",
                            padding: searching || toggleValue ? "8px" : "0",
                            border: toggleValue ? "2px solid white" : "none",
                            borderBottom: (searching || toggleValue) && "2px solid white",
                            transition: "max-width 0.5s, padding 0.4s, border 0.4s, opacity 0.3s",
                            opacity: searching || toggleValue ? 1 : 0,
                            flexGrow: searching ||toggleValue ? 2 : 0
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        onFocus={(e) => {
                            setFocus(true);
                        }}
                        onBlur={(e) => {
                            setFocus(false);
                        }}
                        onKeyUp={(e) => {
                            // if (e.keyCode == 13) forwardGeocoding(value);

                            if (e.key === "Escape") setFocus(false);

                            if (e.key === "Enter" && focus && searchItems.length > 0) {
                                // console.log(firstMatchedRes);

                                if (primarySearch) {
                                    setSelectedCoord(firstMatchedRes);
                                    setFocus(false);
                                    e.target.blur();
                                    
                                } else {
                                    setselectedCompareCoord(firstMatchedRes);
                                    setFocus(false);
                                    e.target.blur();
                                }
                            }
                        }}
                        onChange={(e) => {
                            if (!focus) {
                                setFocus(true);
                            }
                            callBack("");
                            // setShowSearch(true);
                            setValue(e.target.value);
                        }}
                        value={toggleValue || value}
                    /></>}

                {!forSearch &&
                    <input
                        type={"search"}
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
                            padding: "8px",
                            border: "2px solid white",
                        }}

                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        onFocus={(e) => {
                            setFocus(true);
                        }}
                        onBlur={(e) => {
                            setFocus(false);
                        }}
                        onKeyUp={(e) => {
                            // if (e.keyCode == 13) forwardGeocoding(value);

                            if (e.key === "Escape") setFocus(false);

                            if (e.key === "Enter" && focus && searchItems.length > 0) {
                                // console.log(firstMatchedRes);

                                if (primarySearch) {
                                    setSelectedCoord(firstMatchedRes);
                                    setFocus(false);
                                    e.target.blur();
                                } else {
                                    setselectedCompareCoord(firstMatchedRes);
                                    setFocus(false);
                                    e.target.blur();
                                }
                            }
                        }}
                        onChange={(e) => {
                            if (!focus) {
                                setFocus(true);
                            }
                            callBack("");
                            // setFocus(true);
                            setValue(e.target.value);
                        }}
                        value={toggleValue || value}
                    />
                }
                <div
                    className={`${
                        !forSearch ? "position-absolute" : "d-none"
                    } remove-community-btn`}
                    style={{color:"white"}}
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
                    <ul className={`list-unstyled community-dropdown w-100`}>
                        {searchItems}
                        {getSearchItems()}
                    </ul>
                </div>
            )}
        </>
    );
}
