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
                case "swM":
                    setShowMap(pair[1] === "true")
                    break;
                case "swT":
                    setShowToggle(pair[1] === "true")
                    break;
                case "sdC":
                    setSelectedChapter(parseInt(pair[1]))
                    break;
                case "sdI":
                    setSelectedIssue(parseInt(pair[1]))
                    break;
                case "sdS":
                    setSelectedSpecificIssue(parseInt(pair[1]))
                    break;
                case "ctS":
                    setCommunitySearch(pair[1])
                    break;
                case "cpS":
                    setCompareSearch(pair[1])
                    break;
                case "b":
                    setBoundary(pair[1])
                    break;
                case "d":
                    setDemographic(pair[1])
                    break;
                case "swD":
                    setShowDemographics(pair[1] === "true")
                    break;
                case "mI":
                    setMoreIssues(JSON.parse(pair[1]).map((item) => {
                        return parseInt(item)
                    }))
                    setMoreIssuesLength(JSON.parse(pair[1]).map((item) => {
                        return parseInt(item)
                    }).length)
                case "mD":
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

        if (showMap !== null) params.push(`swM=${showMap.toString()}`)
        if (showToggle !== null) params.push(`swT=${showToggle.toString()}`)
        if (communitySearch !== null) params.push(`ctS=${communitySearch}`)
        if (compareSearch !== null) params.push(`cpS=${compareSearch}`)
        if (selectedChapter !== null) params.push(`sdC=${selectedChapter.toString()}`)
        if (selectedIssue !== null) params.push(`sdI=${selectedIssue.toString()}`)
        if (selectedSpecificIssue !== null) params.push(`sdS=${selectedSpecificIssue.toString()}`)
        if (boundary !== null) params.push(`b=${boundary.toString()}`)
        if (demographic !== null) params.push(`d=${demographic.toString()}`)
        if (moreIssues.length>0) params.push(`mI=[${moreIssues.toString()}]`)
        if (showDemographics !== null) params.push(`swD=${showDemographics.toString()}`)
        if (mapDemographics !== null) params.push(`mD=${mapDemographics.toString()}`)

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
                <Map
                selectedIssue={selectedIssue}
                selectedSpecificIssue={selectedSpecificIssue}
                boundary={boundary}
                showDemographics={showDemographics}
                mapDemographics={mapDemographics}
                demographic={demographic}
                />
            </div>

        </Container>
    );
}

export default App;
