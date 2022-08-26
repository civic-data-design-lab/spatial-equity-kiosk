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
                 councils,
                 setMoreIssues, setMoreIssuesLength, addCompare, setAddCompare,
                 selectedCoord,
                 setSelectedCoord, selectedCompareCoord,
                 setselectedCompareCoord, isMobile
             }) {


    return (

        <>
            {!isMobile ?
                <div className={"col-3 h-100 d-flex flex-column"}>
                    <div className={`nav-chapters d-flex flex-column justify-content-between top-border nav-padding
             ${!selectedChapter ? "" : (selectedChapter === 1 ? "expanded-nav" : "collapsed-nav")}
             ${selectedChapter === 2 ? "bottom-highlight" : ""}`}
                         onClick={() => {
                             setMoreIssuesLength(0)
                             setMoreIssues([])
                             if (selectedChapter !== 1) {
                                 setSelectedChapter(1)
                                 setShowMap(false)
                             } else {
                                 setSelectedChapter(null)
                                 setShowMap(false)
                             }
                             setCommunitySearch(null)
                             setCompareSearch(null)
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
                                <h5> Introduction text to issues in New York City. Elit at imperdiet dui accumsan sit
                                    amet.
                                    Diam donec adipiscing tristique risus nec feugiat in. Vel turpis nunc eget lorem
                                    dolor sed
                                    viverra. Elit at imperdiet dui accumsan sit amet. Diam donec adipiscing tristique
                                    risus nec
                                    feugiat in.
                                </h5>
                            </div>
                        </div>
                    </div>


                    <div className={`nav-chapters d-flex flex-column nav-padding
             ${!selectedChapter ? "" : (selectedChapter === 2 ? "expanded-nav" : "collapsed-nav")}
             ${selectedChapter === 3 ? "bottom-highlight" : ""}`}
                         onClick={() => {
                             setMoreIssuesLength(0)
                             setMoreIssues([])
                             if (selectedChapter !== 2) {
                                 setSelectedChapter(2)
                             } else {
                                 setSelectedChapter(null)
                                 setShowMap(false)
                             }
                             setCommunitySearch(null)
                             setCompareSearch(null)
                         }}>
                        <div>
                            <div
                                className={`nav-title ${selectedChapter && selectedChapter !== 2 ? 'collapse-nav-title' : ''}`}>
                                <h5 className={"collapse-text"}>Explore Spatial Equity by</h5>
                            </div>

                            <p className={`${selectedChapter && selectedChapter !== 2 ? "h5 m-0" : "h1"} transition-font`}>Citywide
                                Data</p>
                        </div>

                        <div
                            className={`${selectedChapter === 2 && selectedIssue ? "nav-chapters-content-expanded" : ""} h-100 nav-chapters-content d-flex flex-column justify-content-between`}>
                            <div className={`${selectedChapter === 2 ? "" : "no-pointer"}`}>
                                <BoundaryToggle boundary={boundary} setBoundary={setBoundary}
                                                setCompareSearch={setCompareSearch}
                                                setCommunitySearch={setCommunitySearch}/>
                            </div>
                            <div className={"no-pointer"}>
                                <p className={"bold"}>{issue_categories.labels[selectedIssue]}</p>
                                <p>{issue_categories.descriptions[selectedIssue]}</p>
                            </div>
                        </div>
                    </div>

                    <div className={`nav-chapters d-flex flex-column nav-padding
             ${!selectedChapter ? "" : (selectedChapter === 3 ? "expanded-nav" : "collapsed-nav")}
             ${selectedChapter === 4 ? "bottom-highlight" : ""}`}
                         onClick={() => {
                             if (selectedChapter !== 3) {
                                 setSelectedChapter(3)
                             } else {
                                 setSelectedChapter(null)
                                 setShowMap(false)
                             }
                             setCommunitySearch(null)
                             setCompareSearch(null)
                         }}
                    >
                        <div>
                            <div
                                className={`nav-title ${selectedChapter && selectedChapter !== 3 ? 'collapse-nav-title' : ''}`}>
                                <h5 className={"collapse-text"}>Explore Spatial Equity by</h5>
                            </div>

                            <p className={`${selectedChapter && selectedChapter !== 3 ? "h5 m-0" : "h1"} transition-font`}>
                                {`Community ${selectedChapter && selectedChapter !== 3 ? "" : ""} Profiles`}
                            </p>
                        </div>


                        <div
                            className={`${selectedChapter === 3 ? "nav-chapters-content-expanded" : ""} h-100 nav-chapters-content d-flex flex-column`}>
                            <div className={`${selectedChapter === 3 ? "" : "no-pointer"}`}>
                                <BoundaryToggle boundary={boundary} setBoundary={setBoundary}
                                                setCompareSearch={setCompareSearch}
                                                setCommunitySearch={setCommunitySearch}/>
                            </div>
                            <CommunityNav communities={communities} communitySearch={communitySearch}
                                          compareSearch={compareSearch} setCommunitySearch={setCommunitySearch}
                                          setCompareSearch={setCompareSearch} boundary={boundary} councils={councils}
                                          addCompare={addCompare} setAddCompare={setAddCompare}
                                          selectedCoord={selectedCoord} setSelectedCoord={setSelectedCoord} selectedCompareCoord={selectedCompareCoord}
                                            setselectedCompareCoord={setselectedCompareCoord}
                            />
                        </div>
                    </div>


                    <div className={`nav-chapters d-flex flex-column justify-content-between no-bottom-border nav-padding
             ${!selectedChapter ? "flex-grow-0 " : (selectedChapter === 4 ? "expanded-nav" : "collapsed-nav")}`}
                         onClick={() => {
                             //setSelectedIssue(null)
                             //setSelectedSpecificIssue(null)
                             setMoreIssuesLength(0)
                             setMoreIssues([])
                             if (selectedChapter !== 4) {
                                 setSelectedChapter(4)
                                 setShowMap(false)
                             } else {
                                 setSelectedChapter(null)
                                 setShowMap(false)
                             }
                             setCommunitySearch(null)
                             setCompareSearch(null)
                         }}
                    >
                        <div>
                            <div
                                className={`nav-title ${selectedChapter !== 4 ? '' : ''}`}>
                                <h5 className={"mb-0"}>{selectedChapter !== 4 ? 'Learn More & Take Action' : 'Learn More &'}</h5>
                            </div>
                            <p className={`${selectedChapter === 4 ? "h1" : "collapse-nav-title"} transition-font m-0`}>
                                Take Action
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
                            </div>
                        </div>
                    </div>
                </div>
                :

                //TODO: MOBILE VERSION OF NAV

                <>
                    <div className={"mobile-header"}>
                        <h5 className={"mb-0"}> Spatial Equity NYC </h5>
                    </div>
                    <div className={"h-100 d-flex flex-column"}>
                        <div className={`nav-chapters d-flex flex-column justify-content-center top-border 
                        ${!selectedChapter ? "nav-padding" : (selectedChapter === 1 ? "expanded-nav nav-padding" : "mobile-collapsed-nav p-0")}
                        ${selectedChapter === 2 ? "bottom-highlight" : ""}`}
                             onClick={() => {
                                 setMoreIssuesLength(0)
                                 setMoreIssues([])
                                 if (selectedChapter !== 1) {
                                     setSelectedChapter(1)
                                     setShowMap(false)
                                 } else {
                                     setSelectedChapter(null)
                                     setShowMap(false)
                                 }
                                 setCommunitySearch(null)
                                 setCompareSearch(null)
                             }}
                        >
                            <div>
                                <div
                                    className={`nav-title ${selectedChapter && selectedChapter !== 1 ? 'collapse-nav-title' : ''}`}>
                                    <h5 className="collapse-text">What is</h5>
                                </div>
                                <p className={`${selectedChapter && selectedChapter !== 1 ? "no-font-size mb-0" : "h1"} transition-font`}>Spatial Equity</p>
                            </div>

                            <div
                                className={`${selectedChapter === 1 ? "nav-chapters-content-expanded" : ""} nav-chapters-content `}>
                                <div className={"no-pointer"}>
                                    <h5> Introduction text to issues in New York City. Elit at imperdiet dui accumsan sit
                                        amet. Diam donec adipiscing tristique risus nec feugiat in. Vel turpis nunc eget lorem dolor sed
                                        viverra. Elit at imperdiet dui accumsan sit amet. Diam donec adipiscing ristique risus nec feugiat in.
                                    </h5>
                                </div>
                            </div>
                        </div>


                        <div className={`nav-chapters d-flex flex-column justify-content-center
                        ${!selectedChapter ? "nav-padding" : (selectedChapter === 2 ? "expanded-nav nav-padding" : "mobile-collapsed-nav p-0")}
                        ${selectedChapter === 3 ? "bottom-highlight" : ""}`}
                             onClick={() => {
                                 setMoreIssuesLength(0)
                                 setMoreIssues([])
                                 if (selectedChapter !== 2) {
                                     setSelectedChapter(2)
                                 } else {
                                     setSelectedChapter(null)
                                     setShowMap(false)
                                 }
                                 setCommunitySearch(null)
                                 setCompareSearch(null)
                             }}>
                            <div>
                                <div
                                    className={`nav-title ${selectedChapter && selectedChapter !== 2 ? 'collapse-nav-title' : ''}`}>
                                    <h5 className={"collapse-text"}>Explore Spatial Equity by</h5>
                                </div>

                                <p className={`${selectedChapter && selectedChapter !== 2 ? "h5 m-0" : "h1"} transition-font`}>Citywide
                                    Data</p>
                            </div>

                            <div
                                className={`${selectedChapter === 2 && selectedIssue ? "nav-chapters-content-expanded" : ""} h-100 nav-chapters-content d-flex flex-column justify-content-between`}>
                                <div className={`${selectedChapter === 2 ? "" : "no-pointer"}`}>
                                    <BoundaryToggle boundary={boundary} setBoundary={setBoundary}
                                                    setCompareSearch={setCompareSearch}
                                                    setCommunitySearch={setCommunitySearch}/>
                                </div>
                                <div className={"no-pointer"}>
                                    <p className={"bold"}>{issue_categories.labels[selectedIssue]}</p>
                                    <p>{issue_categories.descriptions[selectedIssue]}</p>
                                </div>
                            </div>
                        </div>

                        <div className={`nav-chapters d-flex flex-column justify-content-center
             ${!selectedChapter ? "nav-padding" : (selectedChapter === 3 ? "expanded-nav nav-padding" : "mobile-collapsed-nav p-0")}
             ${selectedChapter === 4 ? "bottom-highlight" : ""}`}
                             onClick={() => {
                                 if (selectedChapter !== 3) {
                                     setSelectedChapter(3)
                                 } else {
                                     setSelectedChapter(null)
                                     setShowMap(false)
                                 }
                                 setCommunitySearch(null)
                                 setCompareSearch(null)
                             }}
                        >
                            <div>
                                <div
                                    className={`nav-title ${selectedChapter && selectedChapter !== 3 ? 'collapse-nav-title' : ''}`}>
                                    <h5 className={"collapse-text"}>Explore Spatial Equity by</h5>
                                </div>

                                <p className={`${selectedChapter && selectedChapter !== 3 ? "h5 m-0" : "h1"} transition-font`}>
                                    {`Community ${selectedChapter && selectedChapter !== 3 ? "" : ""} Profiles`}
                                </p>
                            </div>


                            <div
                                className={`${selectedChapter === 3 ? "nav-chapters-content-expanded" : ""} h-100 nav-chapters-content d-flex flex-column`}>
                                <div className={`${selectedChapter === 3 ? "" : "no-pointer"}`}>
                                    <BoundaryToggle boundary={boundary} setBoundary={setBoundary}
                                                    setCompareSearch={setCompareSearch}
                                                    setCommunitySearch={setCommunitySearch}/>
                                </div>
                                <CommunityNav communities={communities} communitySearch={communitySearch}
                                              compareSearch={compareSearch} setCommunitySearch={setCommunitySearch}
                                              setCompareSearch={setCompareSearch} boundary={boundary}
                                              councils={councils}
                                              addCompare={addCompare} setAddCompare={setAddCompare}
                                              selectedCoord={selectedCoord} setSelectedCoord={setSelectedCoord} 
                                              selectedCompareCoord={selectedCompareCoord} setselectedCompareCoord={setselectedCompareCoord}
                                />
                            </div>
                        </div>


                        <div className={`nav-chapters d-flex flex-column justify-content-center no-bottom-border
             ${!selectedChapter ? "flex-grow-1 nav-padding" : (selectedChapter === 4 ? "expanded-nav no-padding" : "collapsed-nav nav-padding")}`}
                             onClick={() => {
                                 //setSelectedIssue(null)
                                 //setSelectedSpecificIssue(null)
                                 setMoreIssuesLength(0)
                                 setMoreIssues([])
                                 if (selectedChapter !== 4) {
                                     setSelectedChapter(4)
                                     setShowMap(false)
                                 } else {
                                     setSelectedChapter(null)
                                     setShowMap(false)
                                 }
                                 setCommunitySearch(null)
                                 setCompareSearch(null)
                             }}
                        >
                            <div>
                                <div
                                    className={`nav-title ${selectedChapter !== 4 ? '' : ''}`}>
                                    <h5 className={"mb-0"}>{selectedChapter !== 4 ? 'Learn More &' : 'Learn More & Take Action'}</h5>
                                </div>
                                <p className={`${selectedChapter === 4 ? "h1" : "h1"} transition-font m-0`}>
                                    Take Action
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
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>

    )
}

export default Nav