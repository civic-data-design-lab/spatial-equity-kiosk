import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedinIn,
  faSquareFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { default as _SHARE } from "../img/share.svg";

const SHARE_HASHTAGS = ["nyc", "spatialequity"];
const TWEET_INTENT_URL = "https://twitter.com/intent/tweet";
const FACEBOOK_SHARE_URL = "https://www.facebook.com/sharer/sharer.php";
const LINKEDIN_SHARE_URL = "https://linkedin.com/sharing/share-offsite";

export default function ShareButton({}) {
  const [clicked, setClicked] = useState(false);
  const [shareText, setShareText] = useState("Check out this site:");
  const [shareUrl, setShareUrl] = useState("https://nyc25x25.org/");

  const copyURL = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const pickColor = (e) => {
    const color = "rgb(127, 255, 0)";
    e.target.style.color = color;
  };

  const uploadTwitter = () => {
    const endpoint = "https://upload.twitter.com/1.1/media/upload.json";
    axios
      .post(
        endpoint,
        {
          Name: "Name",
          command: "INIT",
          total_bytes: "10240",
          body: "This is a new post.",
          media_type: "image/jpeg",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <>
      <div
        // className={"share"}
        className={"newShare"}
        onMouseEnter={() => {
          setClicked(true);
        }}
        onMouseLeave={() => {
          setClicked(false);
        }}
        // onClick={(e) => {
        //   e.preventDefault();
        // }}
      >
        {clicked && (
          <div className={"share-icons"}>
            <a
              target="_blank"
              rel="noreferrer"
              href={`${FACEBOOK_SHARE_URL}?u=${shareUrl}`}
            >
              <FontAwesomeIcon
                icon={faSquareFacebook}
                onClick={(e) => {
                  pickColor(e);
                }}
              />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href={`${TWEET_INTENT_URL}?text=${encodeURIComponent(
                shareText
              )}&url=${shareUrl}&hashtags=${SHARE_HASHTAGS.join(",")}`}
            >
              <FontAwesomeIcon
                icon={faTwitter}
                onClick={(e) => {
                  pickColor(e);
                }}
              />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href={`${LINKEDIN_SHARE_URL}?url=${shareUrl}`}
            >
              <FontAwesomeIcon
                icon={faLinkedinIn}
                onClick={(e) => {
                  pickColor(e);
                }}
              />
            </a>
            <FontAwesomeIcon
              icon={faCopy}
              onClick={(e) => {
                e.preventDefault();
                copyURL();
                pickColor(e);
              }}
            />
          </div>
        )}
        {!clicked && <small className={"m-0"}><strong>Share</strong></small>}
        <div className={"share-icon"}>
          <img src={_SHARE} />
        </div>
      </div>
    </>
  );
}
