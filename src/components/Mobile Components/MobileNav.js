import {useEffect, useState} from "react";


export default function MobileNav({
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
    setselectedCompareCoord
}) {


    return (
        <div className={"mobile-nav"}>
            <div className={"mobile-nav-header"}>
                <h5 className={"m-0"}>Spatial Equity NYC</h5>
                <button>menu button</button>
            </div>

            <div className={"mobile-nav-chapter"}>
                <p className={"mb-0"}> What is </p>
                <h1 className={"mb-0"}> Spatial Equity </h1>
            </div>

            <div className={"mobile-nav-chapter"}>
                <p className={"mb-0"}> Explore Spatial Equity by </p>
                <h1 className={"mb-0"}> Citywide Data </h1>
            </div>

            <div className={"mobile-nav-chapter"}>
                <p className={"mb-0"}>  Explore Spatial Equity by </p>
                <h1 className={"mb-0"}> Community Profiles </h1>
            </div>

            <div className={"mobile-nav-chapter"}>
                <p className={"mb-0"}> Learn More </p>
                <h1 className={"mb-0"}> Take Action </h1>
            </div>
        </div>
    )
}