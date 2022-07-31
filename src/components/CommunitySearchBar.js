import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";


export default function CommunitySearchBar({toggleValue, callBack, communitySearch, forSearch=true,
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
            <div className={"d-flex flex-row align-items-center mt-3 position-relative community-search-container"}>
                <input type={"search"}
                   className={`community-search w-100`}
                   placeholder={forSearch ? "Search for a District, Neighborhood, or Address" : "Compare Communities"}
                   onClick={(e)=>{e.stopPropagation()}}
                   onFocus={(e)=>{setFocus(true)}}
                   onBlur={(e)=>{setFocus(false)}}
                   onChange={(e) =>{
                       callBack("")
                       setValue(e.target.value)}}
                   value={toggleValue || value}
            />
            <div className={`${!focus ? "d-flex" : "d-none"} valid-search-container flex-row align-items-center`}>
                <FontAwesomeIcon icon={faArrowRight} className={"valid-search"}/>
            </div>
            </div>
            {focus && getSearchItems().length>0 && <div>
                <ul className={`list-unstyled community-dropdown`}>
                { getSearchItems() }
            </ul>
            </div>}
        </>
    )
}
