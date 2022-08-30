import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";


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
                <h4 className={"m-0"}>Spatial Equity NYC</h4>
                <FontAwesomeIcon icon={faBars} className={"fa-lg"}/>
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