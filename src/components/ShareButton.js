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

export default function ShareButton({
  isMobile,
  invert,
  setShareExpanded = null,
}) {
  const [clicked, setClicked] = useState(isMobile ? true : false);
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
    const color = 'rgb(255, 0, 0)';
    e.target.style.color = color;
  };

  return (
    <div
      className={'issues-tile-header floating-share'}
      style={{ justifyContent: isMobile ? 'flex-start' : '' }}
    >
      <div
        className={'share-button-container noselect'}
        onMouseEnter={() => {
          if (!isMobile) setClicked(true);
          setShareExpanded && setShareExpanded(true);
        }}
        onMouseLeave={() => {
          if (!isMobile) setClicked(false);
          setLinkCopied(false);
          setShareExpanded && setShareExpanded(false);
        }}
        // Allow click to activate, deactivate share dropdown on mobile
        // onClick={() => isMobile && setClicked(!clicked)}
        style={invert && { backgroundColor: 'black' }}
      >
        {clicked && (
          <div className={'share-icons'}>
            {isMobile && <a>+Share</a>}
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
              <div
                className={'position-absolute url-copied'}
                style={{ color: isMobile ? 'black' : 'white' }}
              >
                Link copied!
              </div>
            )}
          </div>
        )}

        {!isMobile && (
          <div className="share-icon-container share-icons float-right">
            {((!isMobile && !clicked) || (isMobile && clicked)) && (
              <a>+ Share</a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
