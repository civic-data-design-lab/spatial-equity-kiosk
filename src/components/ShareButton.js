import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedinIn,
  faSquareFacebook,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { default as _SHARE } from '../img/share.svg';

const SHARE_HASHTAGS = [];
const TWEET_INTENT_URL = 'https://twitter.com/intent/tweet';
const FACEBOOK_SHARE_URL = 'https://www.facebook.com/sharer/sharer.php';
const LINKEDIN_SHARE_URL = 'https://linkedin.com/sharing/share-offsite';

export default function ShareButton({ isMobile, invert }) {
  const [clicked, setClicked] = useState(false);
  const [shareText, setShareText] = useState(
    `Not all streets are created equal.
Public health, mobility, and the environment are affected by local policies about the use of public space. Check out where your community ranks with #SpatialEquityNYC — a new tool from @transalt and @MITLCAU. `
  );
  const [shareUrl, setShareUrl] = useState('http://www.spatialequity.nyc/');

  const [linkCopied, setLinkCopied] = useState(false);

  const copyURL = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const pickColor = (e) => {
    const color = 'rgb(127, 255, 0)';
    e.target.style.color = color;
  };

  return (
    <div
      // className={"share"}
      className={'share-button-container noselect'}
      onMouseEnter={() => {
        setClicked(true);
      }}
      onMouseLeave={() => {
        setClicked(false);
        setLinkCopied(false);
      }}
      // Allow click to activate, deactivate share dropdown on mobile
      onClick={() => isMobile && setClicked(!clicked)}
      style={invert && { backgroundColor: 'black' }}
      // onClick={(e) => {
      //   e.preventDefault();
      // }}
    >
      {clicked && (
        <div className={'share-icons'}>
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
            )}&url=${shareUrl}&hashtags=${SHARE_HASHTAGS.join(',')}`}
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
          <a>
            <FontAwesomeIcon
              icon={faCopy}
              onClick={(e) => {
                e.preventDefault();
                copyURL();
                pickColor(e);
                setLinkCopied(true);
              }}
            />
          </a>
          {linkCopied && (
            <div className={'position-absolute map-toggle-url-copy'} style={{}}>
              Link copied!
            </div>
          )}
        </div>
      )}
      <div className="share-icon-container">
        {((!isMobile && !clicked) || (isMobile && clicked)) && (
          <small className={'small-font'} style={invert && { color: 'white' }}>
            <strong>Share</strong>
          </small>
        )}
        <div className={'share-icon'}>
          <img style={invert && { filter: 'invert(1)' }} src={_SHARE} />
        </div>
      </div>
    </div>
  );
}
