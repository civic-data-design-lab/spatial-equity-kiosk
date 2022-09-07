import React, {useState} from "react"
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInstagram, faLinkedinIn, faSquareFacebook, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {faCopy} from "@fortawesome/free-solid-svg-icons";
import {default as _SHARE} from "../img/share.svg";


const SHARE_HASHTAGS = ["nyc", "spatialequity"]
const TWEET_INTENT_URL = "https://twitter.com/intent/tweet"
const FACEBOOK_SHARE_URL = "https://www.facebook.com/sharer/sharer.php"
const LINKEDIN_SHARE_URL = "https://linkedin.com/sharing/share-offsite"

export default function ShareButton({}) {

    const [clicked, setClicked] = useState(false)
    const [shareText, setShareText] = useState("Check out this site:")
    const [shareUrl, setShareUrl] = useState("https://nyc25x25.org/")


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
                {/* https://developers.facebook.com/docs/plugins/share-button/ */}
                <a
                    target="_blank"
                    rel="noreferrer"
                    href={`${FACEBOOK_SHARE_URL}?u=${shareUrl}`}
                    onClick={() => setClicked(false)}
                >
                    <FontAwesomeIcon icon={faSquareFacebook}/>
                </a>
                {/* https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview */}
                <a
                    target="_blank"
                    rel="noreferrer"
                    href={`${TWEET_INTENT_URL}?text=${encodeURIComponent(shareText)}&url=${shareUrl}&hashtags=${SHARE_HASHTAGS.join(",")}`}
                    onClick={() => setClicked(false)}
                >
                    <FontAwesomeIcon icon={faTwitter}/>
                </a>
                {/* TODO:
                    Instagram sharing doesn't seem to be supported via web API,
                    only by mobile apps https://stackoverflow.com/a/17682403. 
                */}
                <a onClick={() => setClicked(false)}>
                    <FontAwesomeIcon icon={faInstagram}/>
                </a>
                {/* https://github.com/bradvin/social-share-urls */}
                 <a
                    target="_blank"
                    rel="noreferrer"
                    href={`${LINKEDIN_SHARE_URL}?url=${shareUrl}`}
                    onClick={() => setClicked(false)}
                >
                    <FontAwesomeIcon icon={faLinkedinIn}/>
                </a>
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