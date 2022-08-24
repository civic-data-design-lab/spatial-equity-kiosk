import React, {useState} from "react"
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInstagram, faLinkedinIn, faSquareFacebook, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faCopy} from "@fortawesome/free-solid-svg-icons";
import {default as _SHARE} from "../img/share.svg";

export default function ShareButton({}) {

    const [clicked, setClicked] = useState(false)

    const copyURL = () => {
        navigator.clipboard.writeText(window.location.href)
    }

    const uploadTwitter = () => {
        const endpoint = "https://upload.twitter.com/1.1/media/upload.json";
        axios
            .post(endpoint,
                {
                    Name: "Name",
                    command: "INIT",
                    total_bytes: "10240",
                    body: "This is a new post.",
                    media_type: "image/jpeg"
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                }
            )
            .then((res) => {
                console.log(res)
            })
    }


    return (
        <>
            <div className={"share"}>
                <small className={"m-0"}>Share</small>
                <div className={"share-icon"}>
                    <img src={_SHARE}
                                     onClick={(e) => {
                                         e.preventDefault()

                                         setClicked(!clicked)
                                     }}/>
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
                                         uploadTwitter()
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