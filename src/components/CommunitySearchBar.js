import React, {useState} from 'react';


export default function CommunitySearchBar({communitySearch, setCommunitySearch,
                                               children}) {
    const [value, setValue] = useState('');
    const [focus, setFocus] = useState(false)


    return (
        <>
            <input type={"search"} className={"community-search"}
                   placeholder={"Search for a District, Neighborhood, or Address"}
                   onFocus={(e)=>{
                       setFocus(true)
                   }}
                   onChange={(e) =>{
                       setCommunitySearch("")
                       setValue(e.target.value)
                   }}
                   value={communitySearch || value}
            />
            {focus && <ul className="list-unstyled community-dropdown">
                { React.Children.toArray(children).filter(
                    (child) =>
                        !value ||
                        child.props.children.props.children[0].props.children[0].props.children.toLowerCase().includes(value.toLowerCase()) ||
                        child.props.children.props.children[0].props.children[2].toLowerCase().includes(value.toLowerCase())
                )}
            </ul>}
        </>
    )
}
