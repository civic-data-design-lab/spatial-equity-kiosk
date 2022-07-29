import React, {useEffect, useState} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareFacebook, faTwitter, faInstagram, faLinkedinIn} from "@fortawesome/free-brands-svg-icons";
import {faCopy, faSquareShareNodes} from "@fortawesome/free-solid-svg-icons";

export default function ShareButton({showMap}) {

    const [clicked, setClicked] = useState(false)

    useEffect(()=>{
        if (showMap) {
            setClicked(false)
        }
    })


    return(
        <>
            <div className={"share"}>
                <small className={"m-0"}>Share</small>
                <div
                    onClick={()=>{
                        setClicked(!clicked)
                    }}
                >
                    <FontAwesomeIcon icon={faSquareShareNodes} className={"fa-2x"}/>
                </div>
            </div>
            <div className={`${clicked ? "" : "d-none"} position-absolute share-icons`}>
                <FontAwesomeIcon icon={faSquareFacebook}/>
                <FontAwesomeIcon icon={faTwitter}/>
                <FontAwesomeIcon icon={faInstagram}/>
                <FontAwesomeIcon icon={faLinkedinIn}/>
                <FontAwesomeIcon icon={faCopy}/>
            </div>

        </>
    )
}