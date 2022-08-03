import "./App.css";
import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Container from 'react-bootstrap/Container';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";


import Nav from "./components/Nav";
import Content from "./components/Content";
import Map from "./components/Map"


import _ISSUE_CATEGORIES from "./texts/issue_categories.json"
import _ISSUES from "./texts/issues.json";
import _COMMUNITIES from "./texts/communities.json";


const issue_categories = _ISSUE_CATEGORIES
const issues = _ISSUES;
const communities = _COMMUNITIES


function App() {

    const [open, setOpen] = useState(true);
    const [whichOnTop, setWhichOnTop] = useState(2)
    const [showMap, setShowMap] = useState(false)
    const [showToggle, setShowToggle] = useState(false)
    const [selectedChapter, setSelectedChapter] = useState(null)
    const [selectedIssue, setSelectedIssue] = useState(null)
    const [selectedSpecificIssue, setSelectedSpecificIssue] = useState(null)
    const [communitySearch, setCommunitySearch] = useState(null);
    const [compareSearch, setCompareSearch] = useState(null);
    const [boundary, setBoundary] = useState("community");


    useEffect(() => {
        console.log("selectedChapter ", selectedChapter)
        console.log("selectedIssue ", selectedIssue)
        console.log("selectedSpecficIssue ", selectedSpecificIssue)
        console.log("showMap ", showMap)
        console.log("show toggle ", showToggle)
        console.log("community search ", communitySearch)
        console.log("compare search ", compareSearch)
        console.log("boundary ", boundary)
        console.log("-------------------------------------------")

        /*if (!selectedSpecificIssue) {
            setSelectedIssue(1)
            setSelectedSpecificIssue(1)
        }

        if (!selectedSpecificIssue) {
            setSelectedSpecificIssue(1)
        }*/

        if (selectedSpecificIssue && selectedChapter > 1) {
            setShowToggle(true)
        }

        if (!communitySearch) {
            setCompareSearch(null)
        }

    })





    return (

        <Container fluid className={"h-100 p-0 m-0 d-flex flex-row"}>
            <Nav selectedChapter={selectedChapter} setSelectedChapter={setSelectedChapter}
                 selectedIssue={selectedIssue} issue_categories={issue_categories}
                 boundary={boundary} setBoundary={setBoundary}
                 selectedSpecificIssue={selectedSpecificIssue}
                 issues={issues}
                 setSelectedIssue={setSelectedIssue}
                 communities={communities}
                 communitySearch={communitySearch}
                 compareSearch={compareSearch}
                 setCommunitySearch={setCommunitySearch}
                 setCompareSearch={setCompareSearch}
                 setShowMap={setShowMap}
                 setSelectedSpecificIssue={setSelectedSpecificIssue}
            />
            <Content selectedChapter={selectedChapter} issues={issues}
                     selectedIssue={selectedIssue} setSelectedIssue={setSelectedIssue}
                     selectedSpecificIssue={selectedSpecificIssue} setSelectedSpecificIssue={setSelectedSpecificIssue}
                     boundary={boundary}
                     showToggle={showToggle} showMap={showMap} setShowMap={setShowMap}
                     communitySearch={communitySearch}
                     compareSearch={compareSearch}
                     communities={communities}
            />

            <div className={`${showMap ? 'show-map' : 'hide-map'} map-container`}>
                <Map/>
            </div>

        </Container>



        /*<Container fluid className={"h-100 p-0"}>
            <Row className={"h-100 no-padding no-margin"}>
                <Col className={"col-6 h-100 no-padding no-margin"}>


                        <div
                            className={`${whichOnTop === 2 ? "" : "d-none"} col-3 position-absolute d-flex flex-column h-100`}
                            id={"issues-column"}>
                            <div
                                className={`${selectedIssue === 1 ? 'issues-health-active' : ''} ${selectedIssue ? "collapse-issue" : ""} issues-health issues-chapters`}
                                onClick={() => {
                                    setShowMap(true)
                                    setShowToggle(false)
                                    if (selectedIssue !== 1) {
                                        setSelectedIssue(1)
                                    } else {
                                        setSelectedIssue(null)
                                    }
                                }}>
                                <h5 className={`${selectedIssue ? 'mb-0' : ''}`}>Health</h5>
                                <h5 className={`${selectedIssue ? "invis" : "vis"}`}>Text explanation about “health”.
                                    Felis donec et
                                    odio pellentesque.
                                    Elit at imperdiet dui accumsan sit amet. Diam donec adipiscing tristique risus nec
                                    feugiat in.
                                </h5>
                            </div>

                            <div className={`${selectedIssue === 1 ? 'vis' : 'invis'} accordion-content flex-grow-1`}>
                                <h5 className="collapse-text mb-3">Text explanation about “health”. Felis donec et odio
                                    pellentesque.
                                    Elit at imperdiet dui accumsan sit amet. Diam donec adipiscing tristique risus nec
                                    feugiat in.
                                    Vel turpis nunc eget lorem dolor sed viverra. </h5>
                                <div>
                                    <h5>Select an issue to explore</h5>
                                    <div className={"col"}>
                                        {getIssues("health")}
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`${selectedIssue === 2 ? 'issues-environment-active' : ''} ${selectedIssue ? "collapse-issue" : ""} issues-environment issues-chapters`}
                                onClick={() => {
                                    if (selectedIssue !== 2) {
                                        setSelectedIssue(2)
                                    } else {
                                        setSelectedIssue(null)
                                    }
                                }}>
                                <h5 className={`${selectedIssue ? 'mb-0' : ''}`}>Environment</h5>
                                <h5 className={`${selectedIssue ? "invis" : "vis"}`}>Text explanation about
                                    “environment”. Turpis
                                    egestas pretium aenean pharetra magna.
                                    Sed odio morbi quis commodo odio aenean sed adipiscing.</h5>
                            </div>
                            <div className={`${selectedIssue === 2 ? 'vis' : 'invis'} accordion-content flex-grow-1`}>
                                <h5 className="collapse-text mb-3">Text explanation about “health”. Felis donec et odio
                                    pellentesque.
                                    Elit at imperdiet dui accumsan sit amet. Diam donec adipiscing tristique risus nec
                                    feugiat in.
                                    Vel turpis nunc eget lorem dolor sed viverra. </h5>
                                <div>
                                    <h5>Select an issue to explore</h5>
                                    <div className={"col"}>
                                        {getIssues("environment")}
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`${selectedIssue === 3 ? 'issues-infrastructure-active' : ''} ${selectedIssue ? "collapse-issue" : ""} issues-infrastructure issues-chapters`}
                                onClick={() => {
                                    if (selectedIssue !== 3) {
                                        setSelectedIssue(3)
                                    } else {
                                        setSelectedIssue(null)
                                    }
                                }}>
                                <h5 className={`${selectedIssue ? 'mb-0' : ''}`}>Infrastructure</h5>
                                <h5 className={`${selectedIssue ? "invis" : "vis"}`}>Text explanation about
                                    “infrastructure”
                                    Excepteur sint occaecat cupidatat non proident,
                                    sunt in culpa qui officia deserunt mollit anim id est laborum.</h5>
                            </div>
                            <div className={`${selectedIssue === 3 ? 'vis' : 'invis'} accordion-content flex-grow-1`}>
                                <h5 className="collapse-text mb-3">Text explanation about “health”. Felis donec et odio
                                    pellentesque.
                                    Elit at imperdiet dui accumsan sit amet. Diam donec adipiscing tristique risus nec
                                    feugiat in.
                                    Vel turpis nunc eget lorem dolor sed viverra. </h5>
                                <div>
                                    <h5>Select an issue to explore</h5>
                                    <div className={"col"}>
                                        {getIssues("infrastructure")}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`${whichOnTop === 3 ? "" : "d-none"} col-3 position-absolute d-flex flex-column h-100`}
                            id={"community-column"}>
                            <div
                                className={`${communitySearch ? "community-height" : "full-height"} flex-grow-1 community-padding black-border`}>
                                <h5>Explore Community</h5>
                                <CommunitySearchBar toggleValue={communitySearch}
                                                    communitySearch={communitySearch}
                                                    callBack={setCommunitySearch}>
                                    {getSearchItems(communities, true)}
                                </CommunitySearchBar>

                                {communitySearch && <CommunitySearchBar toggleValue={compareSearch}
                                                                        communitySearch={communitySearch}
                                                                        callBack={setCompareSearch}
                                                                        forSearch={false}
                                >
                                    {getSearchItems(communities, false)}
                                </CommunitySearchBar>}


                            </div>
                            <div
                                className={`${communitySearch ? "community-height community-padding  flex-grow-1 black-border" : "no-height border-none"} `}>
                                <div className={`${communitySearch ? "" : "d-none"}`}>
                                    <IssueDropDown issues={issues} setSelectedIssue={setSelectedIssue}
                                                   setSelectedSpecificIssue={setSelectedSpecificIssue}
                                                   communitySearch={communitySearch}
                                                   selectedSpecificIssue={selectedSpecificIssue}
                                    />
                                </div>

                            </div>
                            <div
                                className={`${communitySearch ? "community-height community-padding  flex-grow-1 black-border" : "no-height border-none"} `}>

                            </div>
                        </div>
                    </div>
                </Col>
                <Col className={"d-flex flex-column col-6 h-100 p-0 black-border"}>
                    {selectedChapter === 1 && <HomeCarousel/>}
                    {selectedChapter === 2 && (selectedSpecificIssue ?
                        <IssueSection
                            selectedSpecificIssueName={issues.specific_issues_data[selectedSpecificIssue].specific_issue_name}
                            selectedSpecificIssueDescription={issues.specific_issues_data[selectedSpecificIssue].specific_issue_description}/>
                        : null)}
                    {selectedChapter === 3 && <CommunitiesSection communitySearch={communitySearch}/>}

                    <div
                        className={`${showMap ? 'raise-map visible' : 'invisible'} map-container`}>
                        <Map/>
                    </div>
                    <MapToggle showToggle={showToggle} showMap={showMap} setShowMap={setShowMap}/>
                </Col>
            </Row>
        </Container>*/
    );
}

export default App;
