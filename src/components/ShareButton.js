import React, {useEffect, useState} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInstagram, faLinkedinIn, faSquareFacebook, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faCopy, faSquareShareNodes} from "@fortawesome/free-solid-svg-icons";

export default function ShareButton({}) {

    const [clicked, setClicked] = useState(false)

    const copyURL = () => {
        navigator.clipboard.writeText(window.location.href)
    }




    return (
        <>
            <div className={"share"}>
                <small className={"m-0"}>Share</small>
                <div>
                    <FontAwesomeIcon icon={faSquareShareNodes} color={"black"} className={"fa-2x"}
                                     onClick={(e)=>{
                                         e.preventDefault()

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
                                         const currentURL = window.location.href;
                                         window.open(`https://twitter.com/intent/tweet?text=@twitter look at this:&url=${currentURL}`)
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
        </>
    )
}