import "./App.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


// import Sidebar from "./components/Sidebar";
import HomeCarousel from "./components/HomeCarousel";

import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import IssueSection from "./components/IssueSection";
import Map from "react-map-gl";


function App() {

    const [open, setOpen] = useState(true);
    const [whichOnTop, setWhichOnTop] = useState(2)
    const [selectedChapter, setSelectedChapter] = useState(1)
    const [selectedIssue, setSelectedIssue] = useState(null)
    const [selectedSpecificIssue, setSelectedSpecificIssue] = useState(null)


    return (
        <Container fluid className={"h-100 p-0"}>
            <Row className={"h-100 no-padding no-margin"}>
                <Col className={"col-6 h-100 no-padding no-margin"}>
                    <div className="d-flex flex-row sidebar h-100">
                        <div className="sidebar-header d-flex flex-column justify-content-between">
                            <h3>NYC Spatial Equity Tool</h3>
                            <p>
                                Introduction text. Text on what Spatial Equity is.
                                Text about the tool. What are the purposes? For whom is it made for?
                                Introduction text. Text on what Spatial Equity is. Text about the tool.
                                What are the purposes? For whom is it made for?Introduction text.
                                Text on what Spatial Equity is. Text about the tool. What are the purposes?
                                For whom is it made for?
                            </p>
                        </div>
                        <div className={`${open ? "" : "collapsed"} sidebar-body d-flex flex-column col-6`}>
                            <div
                                className={`${selectedChapter === 1 ? "chapters-selected" : "chapters-unselected"} chapters thirds`}
                                onClick={() => {
                                    setOpen(true)
                                    setSelectedChapter(1)
                                    setSelectedIssue(null)
                                }}>
                                <h5>What is</h5>
                                <h1>Spatial Equity</h1>
                            </div>
                            <div
                                className={`${selectedChapter === 2 ? "chapters-selected" : "chapters-unselected"} chapters thirds`}
                                onClick={() => {
                                    setOpen(false)
                                    setWhichOnTop(2)
                                    setSelectedChapter(2)
                                }}>
                                <h5>Explore Spatial Equity by</h5>
                                <h1>Issues in NYC</h1>
                            </div>
                            <div
                                className={`${selectedChapter === 3 ? "chapters-selected" : "chapters-unselected"} chapters thirds`}
                                onClick={() => {
                                    setOpen(false)
                                    setWhichOnTop(3)
                                    setSelectedChapter(3)
                                    setSelectedIssue(null)
                                }}>
                                <h5>Explore Spatial Equity by</h5>
                                <h1>Community Profiles</h1>
                            </div>
                        </div>

                        <div
                            className={`${whichOnTop === 2 ? "" : "d-none"} col-3 position-absolute d-flex flex-column h-100`}
                            id={"issues-column"}>
                            <div
                                className={`${selectedIssue === 1 ? 'issues-health-active' : ''} ${selectedIssue ? "collapse-issue" : ""} issues-health issues-chapters`}
                                onClick={() => {
                                    setSelectedSpecificIssue(null)
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
                                        <div className={"row issues-arrow-row"}
                                             onClick={()=>{
                                                 if (selectedSpecificIssue !== 1) {
                                                     setSelectedSpecificIssue(1)
                                                 } else {
                                                     setSelectedSpecificIssue(null)
                                                 }
                                             }}>
                                            <div className={`${selectedSpecificIssue === 1 ? 'issues-arrow-active' : ''} col-2 issues-arrow health`}><FontAwesomeIcon
                                                icon={faArrowRight}/>
                                            </div>
                                            <div className={"col-10 no-padding"}><p className={"mb-2"}>Issue #1</p>
                                            </div>
                                        </div>
                                        <div className={"row issues-arrow-row"}>
                                            <div className={"col-2 issues-arrow health"}><FontAwesomeIcon
                                                icon={faArrowRight}/>
                                            </div>
                                            <div className={"col-10 no-padding"}><p className={"mb-2"}>Issue #2</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className={`${selectedIssue === 2 ? 'issues-environment-active' : ''} ${selectedIssue ? "collapse-issue" : ""} issues-environment issues-chapters`}
                                onClick={() => {
                                    setSelectedSpecificIssue(null)
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
                                        <div className={"row issues-arrow-row"}>
                                            <div className={"col-2 issues-arrow environment"}><FontAwesomeIcon
                                                icon={faArrowRight}/>
                                            </div>
                                            <div className={"col-10 no-padding"}><p>Issue #1</p></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`${selectedIssue === 3 ? 'issues-infrastructure-active' : ''} ${selectedIssue ? "collapse-issue" : ""} issues-infrastructure issues-chapters`}
                                onClick={() => {
                                    setSelectedSpecificIssue(null)
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
                                        <div className={"row issues-arrow-row"}>
                                            <div className={"col-2 issues-arrow infrastructure"}><FontAwesomeIcon
                                                icon={faArrowRight}/></div>
                                            <div className={"col-10 no-padding"}><p>Issue #1</p></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div
                            className={`${whichOnTop === 3 ? "" : "d-none"} col-3 position-absolute d-flex flex-column h-100`}
                            id={"community-column"}>
                            <h5>Explore Community</h5>
                            <input type={"search"} className={"community-search"}
                                   placeholder={"Search for a District, Neighborhood, or Address"}/>

                        </div>
                    </div>
                </Col>
                <Col className={"d-flex flex-column col-6 h-100 p-0 black-border"}>
                    {selectedChapter === 1 && <HomeCarousel/>}
                    {selectedChapter !== 1  && (selectedSpecificIssue ? <IssueSection selectedSpecificIssue={selectedSpecificIssue}/> : <p>MAP</p>)}

                </Col>
            </Row>
        </Container>
    );
}

export default App;
