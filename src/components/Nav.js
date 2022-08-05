import BoundaryToggle from "./BoundaryToggle";
import CommunityNav from "./CommunityNav";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInstagram, faLinkedinIn, faSquareFacebook, faTwitter} from "@fortawesome/free-brands-svg-icons";

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

             }) {


    return (

        <div className={"col-3 h-100 d-flex flex-column"}>
            <div className={`nav-chapters d-flex flex-column justify-content-between top-border
             ${!selectedChapter ? "" : (selectedChapter === 1 ? "expanded-nav" : "collapsed-nav")}`}
                 onClick={() => {
                     setSelectedIssue(null)
                     setSelectedSpecificIssue(null)
                     if (selectedChapter !== 1) {
                         setSelectedChapter(1)
                         setShowMap(false)
                     } else {
                         setSelectedChapter(null)
                     }
                 }}
            >
                <div>
                    <div
                        className={`nav-title ${selectedChapter && selectedChapter !== 1 ? 'collapse-nav-title' : ''}`}>
                        <h5 className="collapse-text">What is</h5>
                    </div>

                    <p className={`${selectedChapter && selectedChapter !== 1 ? "h5 m-0" : "h1"} transition-font`}>Spatial
                        Equity</p>
                </div>


                <div
                    className={`${selectedChapter === 1 ? "nav-chapters-content-expanded" : ""} nav-chapters-content `}>
                    <div className={"no-pointer"}>
                        <p>Introduction text to issues in New York City. Elit at imperdiet dui accumsan sit amet.
                            Diam donec adipiscing tristique risus nec feugiat in. Vel turpis nunc eget lorem dolor sed
                            viverra.
                            Elit at imperdiet dui accumsan sit amet. Diam donec adipiscing tristique risus nec feugiat
                            in. </p>
                    </div>
                </div>
            </div>


            <div className={`nav-chapters d-flex flex-column
             ${!selectedChapter ? "" : (selectedChapter === 2 ? "expanded-nav" : "collapsed-nav")}
             `}
                 onClick={() => {
                     setShowMap(false)
                     setSelectedIssue(null)
                     setSelectedSpecificIssue(null)
                     if (selectedChapter !== 2) {
                         setSelectedChapter(2)
                     } else {
                         setSelectedChapter(null)
                     }

                     if (selectedSpecificIssue) {
                         setSelectedIssue(issues.specific_issues_data[selectedSpecificIssue].issue_type_ID)
                     }
                 }}
            >
                <div>
                    <div
                        className={`nav-title ${selectedChapter && selectedChapter !== 2 ? 'collapse-nav-title' : ''}`}>
                        <h5 className={"collapse-text"}>Explore Spatial Equity by</h5>
                    </div>

                    <p className={`${selectedChapter && selectedChapter !== 2 ? "h5 m-0" : "h1"} transition-font`}>Issues in NYC</p>
                </div>


                <div
                    className={`${selectedChapter === 2 && selectedIssue ? "nav-chapters-content-expanded" : ""} h-100 nav-chapters-content d-flex flex-column justify-content-between`}>
                    <div className={`${selectedChapter === 2 ? "" : "no-pointer"}`}>
                        <BoundaryToggle boundary={boundary} setBoundary={setBoundary}/>
                    </div>
                    <div className={"no-pointer"}>
                        <p className={"bold"}>{issue_categories.labels[selectedIssue]}</p>
                        <p>{issue_categories.descriptions[selectedIssue]}</p>
                    </div>
                </div>
            </div>

            <div className={`nav-chapters d-flex flex-column
             ${!selectedChapter ? "" : (selectedChapter === 3 ? "expanded-nav" : "collapsed-nav")}
             `}
                 onClick={() => {
                     setSelectedIssue(null)
                     setSelectedSpecificIssue(null)
                     if (selectedChapter !== 3) {
                         setSelectedChapter(3)
                     } else {
                         setSelectedChapter(null)
                     }
                 }}
            >
                <div>
                    <div
                        className={`nav-title ${selectedChapter && selectedChapter !== 3 ? 'collapse-nav-title' : ''}`}>
                        <h5 className={"collapse-text"}>Explore Spatial Equity by</h5>
                    </div>

                    <p className={`${selectedChapter && selectedChapter !== 3 ? "h5 m-0" : "h1"} transition-font`}>
                        {`Community ${selectedChapter && selectedChapter !== 3 ? "" : "\n"} Profiles`}
                    </p>
                </div>


                <div
                    className={`${selectedChapter === 3 ? "nav-chapters-content-expanded" : ""} h-100 nav-chapters-content d-flex flex-column`}>
                    <div className={`${selectedChapter === 3 ? "" : "no-pointer"}`}>
                        <BoundaryToggle boundary={boundary} setBoundary={setBoundary}/>
                    </div>
                    <CommunityNav communities={communities} communitySearch={communitySearch}
                                  compareSearch={compareSearch} setCommunitySearch={setCommunitySearch}
                                  setCompareSearch={setCompareSearch}/>
                </div>
            </div>


            <div className={`nav-chapters d-flex flex-column justify-content-between about-collapsed
             ${!selectedChapter ? "" : (selectedChapter === 4 ? "expanded-nav" : "collapsed-nav")}`}
                 onClick={() => {
                     setSelectedIssue(null)
                     setSelectedSpecificIssue(null)
                     if (selectedChapter !== 4) {
                         setSelectedChapter(4)
                         setShowMap(false)
                     } else {
                         setSelectedChapter(null)
                     }
                 }}
            >
                <div>
                    <div
                        className={`nav-title ${selectedChapter !== 4 ? '' : 'collapse-nav-title'}`}>
                        <h6 className="collapse-text">About / Contact</h6>
                    </div>

                    <p className={`${selectedChapter === 4 ? "h1" : "collapse-nav-title"} transition-font m-0`}>
                        NYC Spatial <br/> Equity Tool
                    </p>
                </div>


                <div
                    className={`${selectedChapter === 4 ? "nav-chapters-content-expanded" : ""} nav-chapters-content d-flex flex-column justify-content-end`}>
                    <div className={"no-pointer"}>
                        <h5>Contact</h5>
                        <p className={"mb-0"}>111 John Street, Suite 260</p>
                        <p>New York, NY 10038</p>
                        <p>(212) 629-8080</p>
                        <p>info@transalt.org</p>
                        <div
                            className={`${selectedChapter !== 4 ? "pe-none" : "pe-auto"} mb-3 d-flex flex-row col-gap`}>
                            <div onClick={(e) => {
                                e.stopPropagation()
                            }}><a target="_blank" href={`//www.twitter.com/transalt`}><FontAwesomeIcon
                                icon={faSquareFacebook}/></a></div>
                            <div onClick={(e) => {
                                e.stopPropagation()
                            }}><a target="_blank" href={`//www.twitter.com/transalt`}><FontAwesomeIcon
                                icon={faInstagram}/></a></div>
                            <div onClick={(e) => {
                                e.stopPropagation()
                            }}><a target="_blank"
                                  href={`//www.instagram.com/transportationalternatives/`}><FontAwesomeIcon
                                icon={faTwitter}/></a></div>
                            <div onClick={(e) => {
                                e.stopPropagation()
                            }}><a target="_blank"
                                  href={`//www.linkedin.com/company/transportation-alternatives`}><FontAwesomeIcon
                                icon={faLinkedinIn}/></a></div>
                        </div>
                        <button className={`${selectedChapter !== 4 ? "pe-none" : ""} about-button`}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    console.log("clicked")
                                }}
                        ><small>Stay Tuned</small></button>
                    </div>
                </div>
            </div>


        </div>


    )
}

export default Nav