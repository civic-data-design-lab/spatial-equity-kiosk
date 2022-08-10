import "./App.css";
import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {useLocation} from 'react-router-dom';

import Container from 'react-bootstrap/Container';


import Nav from "./components/Nav";
import Content from "./components/Content";
import Map from "./components/Map"


import _ISSUE_CATEGORIES from "./texts/issue_categories.json";
import _ISSUES from "./texts/issues.json";
import _COMMUNITIES from "./texts/communities.json";
import _COUNCILS from "./texts/councildistricts.json";


const issue_categories = _ISSUE_CATEGORIES;
const issues = _ISSUES;
const communities = _COMMUNITIES;
const councils = _COUNCILS;


function App() {

    const [showMap, setShowMap] = useState(false)
    const [showToggle, setShowToggle] = useState(false)
    const [selectedChapter, setSelectedChapter] = useState(null)
    const [selectedIssue, setSelectedIssue] = useState(null)
    const [selectedSpecificIssue, setSelectedSpecificIssue] = useState(null)
    const [communitySearch, setCommunitySearch] = useState(null);
    const [compareSearch, setCompareSearch] = useState(null);
    const [boundary, setBoundary] = useState("council");
    const [demographic, setDemographic] = useState(null);
    const [selectedAbout, setSelectedAbout] = useState(null)
    const [showDemographics, setShowDemographics] = useState(null);
    const [moreIssues, setMoreIssues] = useState([]);
    const [moreIssuesLength, setMoreIssuesLength] = useState(0);
    const [mapDemographics, setMapDemographics] = useState(false)

    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        for (let pair of queryParams.entries()) {
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
                    break;
                case "compareSearch":
                    setCompareSearch(pair[1])
                    break;
                case "boundary":
                    setBoundary(pair[1])
                    break;
                case "demographic":
                    setDemographic(pair[1])
                    break;
                case "showDemographics":
                    setShowDemographics(pair[1] === "true")
                    break;
                case "moreIssues":
                    setMoreIssues(JSON.parse(pair[1]).map((item) => {
                        return parseInt(item)
                    }))
                    setMoreIssuesLength(JSON.parse(pair[1]).map((item) => {
                        return parseInt(item)
                    }).length)
                case "mapDemographics":
                    setMapDemographics(pair[1] === "true")
            }
        }
    }, [])


    useEffect(() => {
        /*console.log("HERE ARE THE STATES")
        console.log("selectedChapter ", selectedChapter)
        console.log("selectedIssue ", selectedIssue)
        console.log("selectedSpecficIssue ", selectedSpecificIssue)
        console.log("showMap ", showMap)
        console.log("show toggle ", showToggle)
        console.log("community search ", communitySearch)
        console.log("compare search ", compareSearch)
        console.log("boundary ", boundary)
        console.log("selectedAbout ", selectedAbout)
        console.log("-------------------------------------------")*/

        /* if (!selectedSpecificIssue) {
             setSelectedIssue(1)
             setSelectedSpecificIssue(1)
         }

         if (!selectedSpecificIssue) {
             setSelectedSpecificIssue(1)
         }*/

        const params = []

        if (showMap !== null) params.push(`showMap=${showMap.toString()}`)
        if (showToggle !== null) params.push(`showToggle=${showToggle.toString()}`)
        if (communitySearch !== null) params.push(`communitySearch=${communitySearch}`)
        if (compareSearch !== null) params.push(`compareSearch=${compareSearch}`)
        if (selectedChapter !== null) params.push(`selectedChapter=${selectedChapter.toString()}`)
        if (selectedIssue !== null) params.push(`selectedIssue=${selectedIssue.toString()}`)
        if (selectedSpecificIssue !== null) params.push(`selectedSpecificIssue=${selectedSpecificIssue.toString()}`)
        if (boundary !== null) params.push(`boundary=${boundary.toString()}`)
        if (demographic !== null) params.push(`demographic=${demographic.toString()}`)
        if (moreIssues.length>0) params.push(`moreIssues=[${moreIssues.toString()}]`)
        if (showDemographics !== null) params.push(`showDemographics=${showDemographics.toString()}`)
        if (mapDemographics !== null) params.push(`mapDemographics=${mapDemographics.toString()}`)

        let path = window.location.href.split('?')[0]
        path = path.concat("?")
        params.map((param) => {
            path = path.concat("&", param)
        })


        if ("undefined" !== typeof window.history.pushState) {
            window.history.replaceState(null, "", path);
        } else {
            window.location.assign(path);
        }

        if (selectedSpecificIssue && selectedChapter > 1) {
            setShowToggle(true)
        }

        if (selectedChapter === 3 && !communitySearch) {
            setShowMap(false)
        }
    })



    useEffect(() => {
        if (selectedSpecificIssue) {
            setSelectedIssue(issues.specific_issues_data[selectedSpecificIssue].issue_type_ID)
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
                 councils={councils}
                 setMoreIssues={setMoreIssues}
                 setMoreIssuesLength={setMoreIssuesLength}

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
                     setDemographic={setDemographic} setCommunitySearch={setCommunitySearch}
                     setCompareSearch={setCompareSearch}
                     selectedAbout={selectedAbout} setSelectedAbout={setSelectedAbout}
                     showDemographics={showDemographics} setShowDemographics={setShowDemographics}
                     moreIssues={moreIssues} setMoreIssues={setMoreIssues} moreIssuesLength={moreIssuesLength}
                     setMoreIssuesLength={setMoreIssuesLength}
                     councils={councils} mapDemographics={mapDemographics} setMapDemographics={setMapDemographics}
            />

            <div className={`${showMap ? 'show-map' : 'hide-map'} map-container`}>
                <Map/>
            </div>

        </Container>
    );
}

export default App;
