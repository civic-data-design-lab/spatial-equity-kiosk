import React, {useEffect, useState} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInstagram, faLinkedinIn, faSquareFacebook, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faCopy, faSquareShareNodes} from "@fortawesome/free-solid-svg-icons";

export default function ShareButton({
                                        showMap,
                                        communitySearch,
                                        compareSearch,
                                        selectedSpecificIssue,
                                        issues,
                                        setShowMap,
                                        showToggle,
                                        selectedIssue, selectedChapter,
                                        boundary, demographic,
                                        showDemographics,
                                        moreIssues
                                    }) {

    const [clicked, setClicked] = useState(false)

    /*    const props = [showMap, showToggle, communitySearch, compareSearch,
             selectedChapter, selectedIssue, selectedSpecificIssue, boundary, demographic].filter((prop)=>prop!==null)
        console.log("props ", props)*/


    const copyURL = () => {


        navigator.clipboard.writeText(window.location.href)

        // let elt = document.getElementById("copy-url")
        // elt.textContent = path;
    }




    return (
        <>
            <div className={"share"}>
                <small className={"m-0"}>Share</small>
                <div>
                    <FontAwesomeIcon icon={faSquareShareNodes} color={"black"} className={"fa-2x"}
                                     onClick={(e)=>{
                                         e.preventDefault()
                                         console.log("clicked share")

                                         setClicked(!clicked)}}/>
                </div>
            </div>
            <div className={`${clicked ? "" : "d-none"} position-absolute share-icons`}>
                <FontAwesomeIcon icon={faSquareFacebook}
                                 onClick={
                                     () => {
                                         setClicked(false)
                                     }
                                 }
                />
                <FontAwesomeIcon icon={faTwitter}
                                 onClick={
                                     () => {
                                         setClicked(false)
                                     }
                                 }
                />
                <FontAwesomeIcon icon={faInstagram}
                                 onClick={
                                     () => {
                                         setClicked(false)
                                     }
                                 }
                />
                <FontAwesomeIcon icon={faLinkedinIn}
                                 onClick={
                                     () => {
                                         setClicked(false)
                                     }
                                 }
                />
                <FontAwesomeIcon icon={faCopy} onClick={
                    (e) => {
                        e.preventDefault()
                        setClicked(false)
                        copyURL()
                    }
                }/>
            </div>

            {/*<div className={"d-none pe-none position-absolute"} id={"copy-url"}/>*/}

        </>
    )
}