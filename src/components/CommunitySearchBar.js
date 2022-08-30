import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faMinus } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import { reduce, rgb } from 'd3';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

export default function CommunitySearchBar({
    toggleValue, callBack, communitySearch, forSearch = true,
    children, setAddCompare = null,
    selectedCoord, setSelectedCoord, showSearch, setShowSearch,
    setShowMap, selectedCompareCoord, setselectedCompareCoord, primarySearch, badSearch
}) {

    const [value, setValue] = useState('');
    const [focus, setFocus] = useState(false)
    const [searchItems, setSearchItems] = useState([]);
    const [loading, setloading] = useState(true);
    const [response, setResponse] = useState(null);
    // console.log('!!!c', communitySearch, )
    // console.log('!!!s', selectedCoord)
    const forwardGeocoding = (address) => {
        const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${MAPBOX_ACCESS_TOKEN}&autocomplete=false`;
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

    useEffect(() => {
        forwardGeocoding(value);
    }, [value]); // monitor at inputValues

    useEffect(() => {
        if (!response) return

        let resItems = []
        for (const v of response.data.features) {
            // console.log(v.center[0].toFixed(3) + " " + v.center[1].toFixed(3), v.place_name);
            resItems.push(
                <div key={v.id}
                    className={`${selectedCoord && (selectedCoord[0] == v.center[0].toFixed(3)) && (selectedCoord[1] == v.center[1].toFixed(3)) ? "search-item-active" : "search-item-inactive"} col search-item p-2`}
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                    onMouseDown={(e) => {
                        e.stopPropagation()

                        if (primarySearch){
                            setSelectedCoord([v.center[0].toFixed(3), v.center[1].toFixed(3)])
                            setShowSearch(false)
                        } else{
                            setselectedCompareCoord([v.center[0].toFixed(3), v.center[1].toFixed(3)])
                            setShowSearch(false)
                        }
                        
                        // console.log([v.center[0].toFixed(3), v.center[1].toFixed(3)])
                        // console.log(selectedCoord)
                    }}
                >
                    <div className={"row w-100 p-0 m-0"} >
                        <div className={"col-10 m-0 p-0"} >
                            <span
                                style={{ fontWeight: 'bold' }}>{v.center[0].toFixed(3) + " " + v.center[1].toFixed(3)}</span>  {v.place_name}
                        </div>
                        <div
                            className={`${selectedCoord && (selectedCoord[0] == v.center[0].toFixed(3)) && (selectedCoord[1] == v.center[1].toFixed(3)) ? "visible" : "invisible"} d-flex col-2 p-0 flex-row justify-content-center align-items-center`}>
                            <FontAwesomeIcon icon={faArrowRight} /></div>
                    </div>
                </div>
            )
        }
        setSearchItems(resItems);
    }, [response, selectedCoord]);  // monitor at response and selectedCoord updates


    const getSearchItems = () => {
        return React.Children.toArray(children).filter(
            (child) =>
                !value ||
                child.props.children.props.children[0].props.children[0].props.children.toLowerCase().includes(value.toLowerCase()) ||
                child.props.children.props.children[0].props.children[2].toLowerCase().includes(value.toLowerCase())
        )
    }

    return (
        <>
            <div className={"d-flex flex-row align-items-center mt-3 position-relative community-search-container"}
                id={`${!forSearch ? "remove-community" : ""}`}
            >
                <input type={"search"}
                    className={`community-search w-100`}
                    placeholder={forSearch ? "Search for a District, Neighborhood, or Address" : "Compare Communities"}
                    style={{borderColor: ((primarySearch && badSearch[0] || !primarySearch && badSearch[1]) ? rgb(255,0,0) : "")}}
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                    onFocus={(e) => {
                        setFocus(true)
                    }}
                    onBlur={(e) => {
                        setFocus(false)
                    }}
                    onKeyUp={(e) => {
                        if (e.keyCode == 13) forwardGeocoding(value);
                    }}
                    onChange={(e) => {
                        callBack("")
                        setShowSearch(true)
                        setValue(e.target.value)
                    }}
                    value={toggleValue || value}
                />
                <div className={`${!forSearch ? "position-absolute" : "d-none"} remove-community-btn`}
                    onClick={(e) => {
                        e.stopPropagation()
                        setAddCompare(false)
                        setselectedCompareCoord([])
                        callBack(null)
                    }}
                >
                    <FontAwesomeIcon icon={faMinus} width={32} />
                </div>
            </div>
            {/* {focus && getSearchItems().length > 0 && <div>
                <ul className={`list-unstyled community-dropdown`}>
                    {getSearchItems()}
                </ul>
            </div>} */}
            {/* {focus && searchItems.length > 0 && <div> */}
            {searchItems.length > 0 && showSearch && <div>
                <ul className={`list-unstyled community-dropdown w-100`}>
                    {searchItems}
                    {getSearchItems()}
                </ul>
            </div>}
        </>
    )
}
