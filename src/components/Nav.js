import BoundaryToggle from "./BoundaryToggle";
import CommunityNav from "./CommunityNav";

function Nav({
                 selectedChapter,
                 setSelectedChapter,
                 selectedIssue,
                 issue_categories,
                 boundary,
                 setBoundary,
                 selectedSpecificIssue,
                 issues,
                 setSelectedIssue,
                 communities,
                 communitySearch,
                 compareSearch,
                 setCommunitySearch,
                 setCompareSearch

             }) {


    return (

        <div className={"col-3 h-100 d-flex flex-column black-border"}>
            <div className={`nav-chapters black-border d-flex flex-column justify-content-between
             ${!selectedChapter ? "" : (selectedChapter === 1 ? "expanded-nav" : "collapsed-nav")}`}
                 onClick={() => {
                     if (selectedChapter !== 1) {
                         setSelectedChapter(1)
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
                    <div className={"nav-chapters-text"}>
                        <p>Introduction text to issues in New York City. Elit at imperdiet dui accumsan sit amet.
                            Diam donec adipiscing tristique risus nec feugiat in. Vel turpis nunc eget lorem dolor sed
                            viverra.
                            Elit at imperdiet dui accumsan sit amet. Diam donec adipiscing tristique risus nec feugiat
                            in. </p>
                    </div>
                </div>
            </div>


            <div className={`nav-chapters black-border d-flex flex-column
             ${!selectedChapter ? "" : (selectedChapter === 2 ? "expanded-nav" : "collapsed-nav")}
             `}
                 onClick={() => {
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
                        <h5>Explore Spatial Equity by</h5>
                    </div>

                    <p className={`${selectedChapter && selectedChapter !== 2 ? "h5 m-0" : "h1"}`}>Issues in NYC</p>
                </div>


                <div
                    className={`${selectedChapter === 2 && selectedIssue ? "nav-chapters-content-expanded" : ""} h-100 nav-chapters-content d-flex flex-column justify-content-between`}>
                    <div className={`${selectedChapter === 2 ? "" : "nav-chapters-text"}`}>
                        <BoundaryToggle boundary={boundary} setBoundary={setBoundary}/>
                    </div>
                    <div className={"nav-chapters-text"}>
                        <p className={"bold"}>{issue_categories.labels[selectedIssue]}</p>
                        <p>{issue_categories.descriptions[selectedIssue]}</p>
                    </div>
                </div>
            </div>

            <div className={`nav-chapters black-border d-flex flex-column
             ${!selectedChapter ? "" : (selectedChapter === 3 ? "expanded-nav" : "collapsed-nav")}
             `}
                 onClick={() => {
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
                        <h5>Explore Spatial Equity by</h5>
                    </div>

                    <p className={`${selectedChapter && selectedChapter !== 3 ? "h5 m-0" : "h1"}`}>Community
                        Profiles</p>
                </div>


                <div
                    className={`${selectedChapter === 3 && selectedIssue ? "nav-chapters-content-expanded" : ""} h-100 nav-chapters-content d-flex flex-column`}>
                    <div className={`${selectedChapter === 3 ? "" : "nav-chapters-text"}`}>
                        <BoundaryToggle boundary={boundary} setBoundary={setBoundary}/>
                    </div>
                    <CommunityNav communities={communities} communitySearch={communitySearch}
                                  compareSearch={compareSearch} setCommunitySearch={setCommunitySearch}
                                  setCompareSearch={setCompareSearch}/>
                </div>
            </div>


        </div>


    )
}

export default Nav