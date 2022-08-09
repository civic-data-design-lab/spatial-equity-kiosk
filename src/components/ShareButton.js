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
                                        boundary, demographic
                                    }) {

    const [clicked, setClicked] = useState(false)

    /*    const props = [showMap, showToggle, communitySearch, compareSearch,
             selectedChapter, selectedIssue, selectedSpecificIssue, boundary, demographic].filter((prop)=>prop!==null)
        console.log("props ", props)*/


    const copyURL = () => {
        const params = []

        if (showMap !== null) params.push(`showMap=${showMap.toString()}`)
        if (showToggle !== null) params.push(`showToggle=${showToggle.toString()}`)
        if (communitySearch !== null) params.push(`communitySearch=${communitySearch}`)
        if (compareSearch !== null) params.push(`compareSearch=${compareSearch}`)
        if (selectedChapter !== null) params.push(`selectedChapter=${selectedChapter.toString()}`)
        if (selectedIssue !== null) params.push(`selectedIssue=${selectedIssue.toString()}`)
        if (selectedSpecificIssue !== null) params.push(`selectedSpecificIssue=${selectedSpecificIssue.toString()}`)
        if (boundary !== null) params.push(`boundary=${boundary.toString()}`)
        if (demographic !== null) params.push(`demographic=${demographic.toString()}`)

        let path = window.location.href.split('?')[0]
        path = path.concat("?")
        params.map((param) => {
            path = path.concat("&", param)
        })
        console.log(path)

        navigator.clipboard.writeText(path)

        // let elt = document.getElementById("copy-url")
        // elt.textContent = path;
    }


    useEffect(() => {
        if (showMap) {
            setClicked(false)
        }
    })


    return (
        <>
            <div className={"share"}>
                <small className={"m-0"}>Share</small>
                <div
                    onClick={() => {
                        setClicked(!clicked)
                    }}
                >
                    <FontAwesomeIcon icon={faSquareShareNodes} className={"fa-2x"}/>
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