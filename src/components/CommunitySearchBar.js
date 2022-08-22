import React, {useState, useEffect } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faMinus} from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

export default function CommunitySearchBar({
                                               toggleValue, callBack, communitySearch, forSearch = true,
                                               children, setAddCompare=null,
                                           }) {
    const [value, setValue] = useState('');
    const [focus, setFocus] = useState(false)
    const [searchItems, setSearchItems] = useState([]);
    const [loading, setloading] = useState(true);

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
                let resItems = []
                for (const v of res.data.features) {
                    // console.log(v.center[0].toFixed(3) + " " + v.center[1].toFixed(3), v.place_name);
                    resItems.push(
                        <div key={v.id}
                             className={`${false ? "search-item-active" : "search-item-inactive"} col search-item p-2`}
                        >
                            <div className={"row w-100 p-0 m-0"}>
                                <div className={"col-10 m-0 p-0"}>
                                    <span
                                        style={{fontWeight: 'bold'}}>{v.center[0].toFixed(3) + " " + v.center[1].toFixed(3)}</span>  {v.place_name}
                                </div>
                            </div>
                        </div>
                    )
                }
                setSearchItems(resItems);
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
                       onClick={(e) => {
                           e.stopPropagation()
                       }}
                       onFocus={(e) => {
                           setFocus(true)
                       }}
                       onBlur={(e) => {
                           setFocus(false)
                       }}
                       onKeyUp={(e)=>{
                            if (e.keyCode == 13) forwardGeocoding(value);
                        }}
                       onChange={(e) => {
                           callBack("")
                           setValue(e.target.value)
                       }}
                       value={toggleValue || value}
                />
                <div className={`${!forSearch ? "position-absolute" : "d-none"} remove-community-btn`}
                     onClick={(e)=>{
                         e.stopPropagation()
                         setAddCompare(false)
                         callBack(null)
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
             {focus && searchItems.length > 0 && <div>
                <ul className={`list-unstyled community-dropdown`}>
                    {searchItems}
                    {getSearchItems()}
                </ul>
            </div>}
        </>
    )
}
