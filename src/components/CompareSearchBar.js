import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";


export default function CommunitySearchBar({communitySearch, setCommunitySearch,
                                               children}) {
    const [value, setValue] = useState('');
    const [focus, setFocus] = useState(false)

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
            <div className={"d-flex flex-row align-items-center mt-2 position-relative community-search-container"}>
                <input type={"search"}
                       className={`${communitySearch ? "community-search-active" : ""} community-search w-100`}
                   placeholder={"Search for a District, Neighborhood, or Address"}
                   onFocus={(e)=>{setFocus(true)}}
                   onBlur={(e)=>{setFocus(false)}}
                   onChange={(e) =>{
                       setCommunitySearch("")
                       setValue(e.target.value)}}
                   value={communitySearch || value}
            />
            <div className={`${!focus ? "d-flex" : "d-none"} valid-search-container flex-row align-items-center`}>
                <FontAwesomeIcon icon={faArrowRight} className={"valid-search"}/>
            </div>
            </div>
            {focus && getSearchItems().length>0 && <div className={"position-relative h-100"}>
                <ul className="list-unstyled community-dropdown">
                { getSearchItems() }
            </ul>
            </div>}
        </>
    )
}
