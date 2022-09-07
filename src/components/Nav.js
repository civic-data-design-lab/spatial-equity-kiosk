import BoundaryToggle from "./BoundaryToggle";
import CommunityNav from "./CommunityNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedinIn,
  faSquareFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import _CDDL from "../img/cddl_logo_white.svg";
import _LCAU from "../img/Logo_LCAU logo_white.svg";
import _MIT from "../img/MIT-logo-white.svg";
import _TA from "../img/ta_logo_BW_icon.svg";

function Nav({
  selectedChapter,
  setSelectedChapter,
  selectedIssue,
  issue_categories,
  boundary,
  setBoundary,
  selectedSpecificIssue,
  setSelectedSpecificIssue,
  issues,
  setSelectedIssue,
  communities,
  communitySearch,
  compareSearch,
  setCommunitySearch,
  setCompareSearch,
  setShowMap,
  councils,
  setMoreIssues,
  setMoreIssuesLength,
  addCompare,
  setAddCompare,
  selectedCoord,
  setSelectedCoord,
  selectedCompareCoord,
  setselectedCompareCoord,
  badSearch,
  setBadSearch,
  setSearchSource,
  errorCode,
  setErrorCode,
}) {
  return (
    <div className={"col-3 h-100 d-flex flex-column"}>
      <div
        className={`nav-chapters d-flex flex-column justify-content-between top-border
             ${
               !selectedChapter
                 ? ""
                 : selectedChapter === 1
                 ? "expanded-nav"
                 : "collapsed-nav"
             }
             ${selectedChapter === 2 ? "bottom-highlight" : ""}`}
        onClick={() => {
          //setSelectedIssue(null)
          //setSelectedSpecificIssue(null)
          setMoreIssuesLength(0);
          setMoreIssues([]);
          if (selectedChapter !== 1) {
            setSelectedChapter(1);
            setShowMap(false);
          } else {
            setSelectedChapter(null);
            setShowMap(false);
          }
          setCommunitySearch(null);
          setCompareSearch(null);
        }}
      >
        <div>
          <div
            className={`nav-title ${
              selectedChapter && selectedChapter !== 1
                ? "collapse-nav-title"
                : ""
            }`}
          >
            <h5 className="collapse-text">What is</h5>
          </div>

          <p
            className={`${
              selectedChapter && selectedChapter !== 1 ? "h5 m-0" : "h1"
            } transition-font`}
          >
            Spatial Equity NYC
          </p>
        </div>

        <div
          className={`${
            selectedChapter === 1 ? "nav-chapters-content-expanded" : ""
          } nav-chapters-content `}
        >
          <div className={selectedChapter !== 1 ? "no-pointer" : ""}>
            <h5>
              Spatial Equity NYC documents inequities in the ways that public
              space — including streets, sidewalks, and greenspaces — is
              designed, distributed, and accessed.
              <span>
                {" "}
                <a
                  className={"underline white-link"}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedChapter(2);
                  }}
                >
                  Browse citywide data{" "}
                </a>
              </span>{" "}
              or
              <span>
                {" "}
                <a
                  className={"underline white-link"}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedChapter(3);
                  }}
                >
                  search community profiles{" "}
                </a>
              </span>
              to learn how decisions about the use of public space lead to
              unequal outcomes and what you can do about it.{" "}
            </h5>
          </div>
        </div>
      </div>

      <div
        className={`nav-chapters d-flex flex-column
             ${
               !selectedChapter
                 ? ""
                 : selectedChapter === 2
                 ? "expanded-nav"
                 : "collapsed-nav"
             }
             ${selectedChapter === 3 ? "bottom-highlight" : ""}`}
        onClick={() => {
          //setCompareSearch(null)
          //setCommunitySearch(null)
          //setShowMap(false)
          //setSelectedIssue(null)
          //setSelectedSpecificIssue(null)
          setMoreIssuesLength(0);
          setMoreIssues([]);
          if (selectedChapter !== 2) {
            setSelectedChapter(2);
          } else {
            setSelectedChapter(null);
            setShowMap(false);
          }
          setCommunitySearch(null);
          setCompareSearch(null);

          /*if (selectedSpecificIssue) {
                        setSelectedIssue(issues.specific_issues_data[selectedSpecificIssue].issue_type_ID)
                    }*/
        }}
      >
        <div>
          <div
            className={`nav-title ${
              selectedChapter && selectedChapter !== 2
                ? "collapse-nav-title"
                : ""
            }`}
          >
            <h5 className={"collapse-text"}>Explore Spatial Equity by</h5>
          </div>

          <p
            className={`${
              selectedChapter && selectedChapter !== 2 ? "h5 m-0" : "h1"
            } transition-font`}
          >
            Citywide Data
          </p>
        </div>

        <div
          className={`${
            selectedChapter === 2 && selectedIssue
              ? "nav-chapters-content-expanded"
              : ""
          } h-100 nav-chapters-content d-flex flex-column justify-content-between`}
        >
          <div className={`${selectedChapter === 2 ? "" : "no-pointer"}`}>
            <BoundaryToggle
              boundary={boundary}
              setBoundary={setBoundary}
              setCompareSearch={setCompareSearch}
              setCommunitySearch={setCommunitySearch}
              setSelectedCoord={setSelectedCoord}
              setselectedCompareCoord={setselectedCompareCoord}
              badSearch={badSearch}
              setBadSearch={setBadSearch}
            />
          </div>
        </div>
      </div>

      <div
        className={`nav-chapters d-flex flex-column
             ${
               !selectedChapter
                 ? ""
                 : selectedChapter === 3
                 ? "expanded-nav"
                 : "collapsed-nav"
             }
             ${selectedChapter === 4 ? "bottom-highlight" : ""}`}
        onClick={() => {
          //setSelectedIssue(null)
          //setSelectedSpecificIssue(null)
          if (selectedChapter !== 3) {
            setSelectedChapter(3);
          } else {
            setSelectedChapter(null);
            setShowMap(false);
          }
          setCommunitySearch(null);
          setCompareSearch(null);
        }}
      >
        <div>
          <div
            className={`nav-title ${
              selectedChapter && selectedChapter !== 3
                ? "collapse-nav-title"
                : ""
            }`}
          >
            <h5 className={"collapse-text"}>Explore Spatial Equity by</h5>
          </div>

          <p
            className={`${
              selectedChapter && selectedChapter !== 3 ? "h5 m-0" : "h1"
            } transition-font`}
          >
            {`Community ${
              selectedChapter && selectedChapter !== 3 ? "" : ""
            } Profiles`}
          </p>
        </div>

        <div
          className={`${
            selectedChapter === 3 ? "nav-chapters-content-expanded" : ""
          } h-100 nav-chapters-content d-flex flex-column`}
        >
          <div className={`${selectedChapter === 3 ? "" : "no-pointer"}`}>
            <BoundaryToggle
              boundary={boundary}
              setBoundary={setBoundary}
              setCompareSearch={setCompareSearch}
              setCommunitySearch={setCommunitySearch}
              setSelectedCoord={setSelectedCoord}
              setselectedCompareCoord={setselectedCompareCoord}
              badSearch={badSearch}
              setBadSearch={setBadSearch}
            />
          </div>
          <CommunityNav
            communities={communities}
            communitySearch={communitySearch}
            compareSearch={compareSearch}
            setCommunitySearch={setCommunitySearch}
            setCompareSearch={setCompareSearch}
            boundary={boundary}
            councils={councils}
            addCompare={addCompare}
            setAddCompare={setAddCompare}
            selectedCoord={selectedCoord}
            setSelectedCoord={setSelectedCoord}
            selectedCompareCoord={selectedCompareCoord}
            setselectedCompareCoord={setselectedCompareCoord}
            badSearch={badSearch}
            setBadSearch={setBadSearch}
            setSearchSource={setSearchSource}
            errorCode={errorCode}
            setErrorCode={setErrorCode}
          />
        </div>
      </div>

      <div
        className={`nav-chapters d-flex flex-column justify-content-between no-bottom-border
             ${
               !selectedChapter
                 ? "flex-grow-0 "
                 : selectedChapter === 4
                 ? "expanded-nav"
                 : "collapsed-nav"
             }`}
        onClick={() => {
          //setSelectedIssue(null)
          //setSelectedSpecificIssue(null)
          setMoreIssuesLength(0);
          setMoreIssues([]);
          if (selectedChapter !== 4) {
            setSelectedChapter(4);
            setShowMap(false);
          } else {
            setSelectedChapter(null);
            setShowMap(false);
          }
          setCommunitySearch(null);
          setCompareSearch(null);
        }}
      >
        <div>
          <div className={`nav-title ${selectedChapter !== 4 ? "" : ""}`}>
            <h5 className={"mb-0"}>
              {selectedChapter !== 4
                ? "Learn More & Take Action"
                : "Learn More &"}
            </h5>
          </div>

          <p
            className={`${
              selectedChapter === 4 ? "h1" : "collapse-nav-title"
            } transition-font m-0`}
          >
            Take Action
          </p>
        </div>

        <div
          className={`${
            selectedChapter === 4 ? "nav-chapters-content-expanded" : ""
          } nav-chapters-content d-flex flex-column justify-content-end`}
        >
          <div className={"no-pointer"}>
            {/* <h5>Contact</h5> */}
            {/* <p className={"mb-0"}>111 John Street, Suite 260</p> */}
            {/* <p>New York, NY 10038</p>
            <p>(212) 629-8080</p>
            <p>info@transalt.org</p> */}
            <div
              className={`${
                selectedChapter !== 4 ? "pe-none" : "pe-auto"
              } mb-3 d-flex flex-row col-gap`}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <a target="_blank" href={`//www.twitter.com/transalt`}>
                  <FontAwesomeIcon icon={faSquareFacebook} />
                </a>
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <a target="_blank" href={`//www.twitter.com/transalt`}>
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <a
                  target="_blank"
                  href={`//www.instagram.com/transportationalternatives/`}
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <a
                  target="_blank"
                  href={`//www.linkedin.com/company/transportation-alternatives`}
                >
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
              </div>
            </div>
            {/*<button className={`${selectedChapter !== 4 ? "pe-none" : ""} about-button`}
                                onClick={(e) => {
                                    e.stopPropagation()
                                }}
                        ><small>Stay Tuned</small></button>*/}
            <p>
              Spatial Equity NYC is a project of Transportation Alternatives and
              MIT.
            </p>
            <div className="attributions">
              {/* <svg
                width="126"
                height="34"
                viewBox="0 0 126 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xlink="http://www.w3.org/1999/xlink"
                href="https://www.transalt.org/"
              >
                <rect
                  y="0.203125"
                  width="125.846"
                  height="33.7919"
                  fill="url(#pattern0)"
                  color="red"
                />
                <defs>
                  <pattern
                    id="pattern0"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      href="#image0_2_491"
                      transform="translate(-0.0869565 -0.192708) scale(0.00267713 0.00962095)"
                    />
                  </pattern>
                  <image
                    id="image0_2_491"
                    width="432"
                    height="144"
                    href="data:image/png;base64,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"
                  />
                </defs>
              </svg> */}

              <a target="_blank" href={`https://www.transalt.org/`}>
                <img src={_TA} height={40} />
              </a>
              <a target="_blank" href={"https://www.mit.edu/"}>
                <img src={_MIT} height={25} />
              </a>
              <a target="_blank" href={"https://lcau.mit.edu/"}>
                <img src={_LCAU} height={40} />
              </a>
              <a target="_blank" href={"civicdatadesignlab.mit.edu"}>
                <img src={_CDDL} height={25} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
