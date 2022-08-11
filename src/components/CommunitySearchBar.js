import React, {useState, useEffect } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
// axios.defaults.baseURL = process.env.APP_SERVER_BASE_URL;


export default function CommunitySearchBar({
                                               toggleValue, callBack, communitySearch, forSearch = true,
                                               children
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
                console.log(res.data.features);
                let resItems = []
                for (const v of res.data.features) {
                    // console.log(v.center[0].toFixed(3) + " " + v.center[1].toFixed(3), v.place_name);
                    resItems.push(
                        <div key={v}
                             className={`${false ? "search-item-active" : "search-item-inactive"} col search-item p-2`}
                        >
                            <div className={"row w-100 p-0 m-0"}>
                                <div className={"col-10 m-0 p-0"}>
                                    <span
                                        style={{fontWeight: 'bold'}}>{v.center[0].toFixed(3) + " " + v.center[1].toFixed(3)}</span>  {v.place_name}
                                </div>
                                <div
                                    className={`${false ? "visible" : "invisible"} d-flex col-2 p-0 flex-row justify-content-center align-items-center`}>
                                    <FontAwesomeIcon icon={faArrowRight}/></div>
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
        console.log(React.Children.toArray(children).filter(
            (child) =>
                !value ||
                child.props.children.props.children[0].props.children[0].props.children.toLowerCase().includes(value.toLowerCase()) ||
                child.props.children.props.children[0].props.children[2].toLowerCase().includes(value.toLowerCase())
        ));
        

        return React.Children.toArray(children).filter(
            (child) =>
                !value ||
                child.props.children.props.children[0].props.children[0].props.children.toLowerCase().includes(value.toLowerCase()) ||
                child.props.children.props.children[0].props.children[2].toLowerCase().includes(value.toLowerCase())
        )
    }

    return (
        <>
            <div className={"d-flex flex-row align-items-center mt-3 position-relative community-search-container"}>
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
                            console.log(e.keyCode)
                            if (e.keyCode == 13) forwardGeocoding(value);
                        }}
                       onChange={(e) => {
                           callBack("")
                           setValue(e.target.value)
                       }}
                       value={toggleValue || value}
                />
                <div className={`${!focus ? "d-flex" : "d-none"} valid-search-container flex-row align-items-center`}>
                    <FontAwesomeIcon icon={faArrowRight} className={"valid-search"}/>
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
