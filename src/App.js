import "./App.css";
import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {useLocation} from 'react-router-dom';

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

    const [showMap, setShowMap] = useState(false)
    const [showToggle, setShowToggle] = useState(false)
    const [selectedChapter, setSelectedChapter] = useState(null)
    const [selectedIssue, setSelectedIssue] = useState(null)
    const [selectedSpecificIssue, setSelectedSpecificIssue] = useState(null)
    const [communitySearch, setCommunitySearch] = useState(null);
    const [compareSearch, setCompareSearch] = useState(null);
    const [boundary, setBoundary] = useState("community");
    const [demographic, setDemographic] = useState(null);

    const location = useLocation();

    useEffect(()=>{
        const queryParams = new URLSearchParams(location.search);
        for (let pair of queryParams.entries()) {
            console.log("pairs ", pair)
            switch (pair[0]) {
                case "showMap":
                    setShowMap(pair[1] === "true")
                    break;
                case "showToggle":
                    setShowToggle(pair[1] === "true")
                    break;
                case "selectedChapter":
                    setSelectedChapter(parseInt(pair[1]))
                    break;
                case "selectedIssue":
                    setSelectedIssue(parseInt(pair[1]))
                    break;
                case "selectedSpecificIssue":
                    setSelectedSpecificIssue(parseInt(pair[1]))
                    break;
                case "communitySearch":
                    setCommunitySearch(pair[1])
                    break
                case "compareSearch":
                    setCompareSearch(pair[1])
                    break
                case "boundary":
                    setBoundary(pair[1])
                    break
                case "demographic":
                    setDemographic(pair[1])
                    break
            }

        }

        console.log("byee")
        console.log("set compareSearch ", compareSearch)
    }, [])



    useEffect(() => {
        /*console.log("selectedChapter ", selectedChapter)
        console.log("selectedIssue ", selectedIssue)
        console.log("selectedSpecficIssue ", selectedSpecificIssue)
        console.log("showMap ", showMap)
        console.log("show toggle ", showToggle)
        console.log("community search ", communitySearch)
        console.log("compare search ", compareSearch)
        console.log("boundary ", boundary)
        console.log("-------------------------------------------")

       /!* if (!selectedSpecificIssue) {
            setSelectedIssue(1)
            setSelectedSpecificIssue(1)
        }

        if (!selectedSpecificIssue) {
            setSelectedSpecificIssue(1)
        }*!/

        console.log("hiii")*/

        if (selectedSpecificIssue && selectedChapter > 1) {
            setShowToggle(true)
        }




    })


    useEffect(()=>{
        if (selectedSpecificIssue) {
            setSelectedIssue(issues.specific_issues_data[selectedSpecificIssue].issue_type_ID)
            console.log("open tihs ", issues.specific_issues_data[selectedSpecificIssue].issue_type_ID)
        }
    }, [selectedSpecificIssue])






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
                     demographic={demographic}
                     setDemographic={setDemographic} setCommunitySearch={setCommunitySearch} setCompareSearch={setCompareSearch}
            />

            <div className={`${showMap ? 'show-map' : 'hide-map'} map-container`}>
                <Map/>
            </div>

        </Container>
    );
}

export default App;
