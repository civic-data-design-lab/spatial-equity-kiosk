import {faBars, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import ISSUES_CATEGORIES from "../../texts/issue_categories.json";
import CHAPTER_COLORS from "../../data/chapter_colors.json"
import IssuesDropDown from "../IssuesDropDown";
import MobileBoundary from "./MobileBoundary";
import MapToggle from "../MapToggle";
import Histogram from "../Histogram";

export default function CitywideData({
                                         selectedIssue, setSelectedIssue,
                                         selectedSpecificIssue, setSelectedSpecificIssue, setShowDemographics,
                                         issues, issue_categories,
                                         boundary, setBoundary, showToggle, showMap, setShowMap,
                                         colorRamps, setColorRamps
                                     }) {

    const health_issues = issues.issues_data["health"].specific_issues_ID.map(
        (id_) => {
            return issues.specific_issues_data[id_];
        }
    );

    const environment_issues = issues.issues_data[
        "environment"
        ].specific_issues_ID.map((id_) => {
        return issues.specific_issues_data[id_];
    });

    const infrastructure_issues = issues.issues_data[
        "infrastructure"
        ].specific_issues_ID.map((id_) => {
        return issues.specific_issues_data[id_];
    });

    return (
        <div className={"mobile-citywide"}>
            <div className={"mobile-nav-header"}>
                <div>
                    <small className={"m-0"}>Spatial Equity NYC</small>
                    <h4 className={"m-0"}>Citywide Data</h4>
                </div>
                <FontAwesomeIcon icon={faBars} className={"fa-lg"}/>
            </div>

            <div className={`position-relative ${selectedIssue === 1 ? "bottom-border-small" : ""}`}>
                <div className={`mobile-citywide-chapter
            ${!selectedIssue ? "grow big-padding inactive-scheme regular-border" : selectedIssue === 1 ? "shrink small-padding active-scheme border-top " : "shrink no-padding inactive-scheme border-none"}`}
                /*style={{borderRightWidth:selectedIssue===1?0:1}}*/
                 onClick={() => {
                     if (selectedIssue !== 1) {
                         setSelectedIssue(1)
                     }
                 }}
            >
                <div className={`d-flex flex-row align-items-center justify-content-between`}>
                    <div className={"d-flex flex-row align-items-center small-col-gap"}>
                        <p className={`mb-0 mobile-transition-font 
                    ${!selectedIssue ? "big-text" : selectedIssue === 1 ? "small-text" : "no-text"}
                    ${!selectedSpecificIssue ? "underline" : ""}`}
                           onClick={()=>{
                               setSelectedSpecificIssue(null)
                           }}
                        >
                        Health
                    </p>
                        {selectedIssue === 1 && selectedSpecificIssue &&
                            <>
                                <FontAwesomeIcon icon={faAngleRight}/>
                                <p className={"small-text m-0 underline"}>{issues.specific_issues_data[selectedSpecificIssue].specific_issue_name}</p>
                            </>
                        }
                    </div>

                    {selectedIssue === 1 && selectedSpecificIssue &&
                       <div className={"mobile-map-toggle"}>
                            <MapToggle showToggle={showToggle} showMap={showMap} setShowMap={setShowMap}/>
                       </div>
                    }
                </div>
                <p className={`mb-0 mobile-transition-font 
                ${!selectedIssue ? "small-text" : "no-text"}`}>
                    {ISSUES_CATEGORIES.descriptions["1"]}
                </p>
            </div>
            </div>

            <div className={`mobile-citywide-chapter
            ${!selectedIssue ? "grow big-padding inactive-scheme regular-border" : selectedIssue === 2 ? "shrink small-padding active-scheme border-top" : "shrink no-padding inactive-scheme border-none"}`}
                 onClick={() => {
                     if (selectedIssue !== 2) {
                         setSelectedIssue(2)
                     }
                 }}
            >
                <p className={`mb-0 mobile-transition-font 
                ${!selectedIssue ? "big-text" : selectedIssue === 2 ? "small-text underline" : "no-text"}`}>
                    Environment
                </p>
                <p className={`mb-0 mobile-transition-font 
                ${!selectedIssue ? "small-text" : "no-text"}`}>
                    {ISSUES_CATEGORIES.descriptions["2"]}
                </p>
            </div>

            <div className={`mobile-citywide-chapter 
            ${!selectedIssue ? "grow big-padding inactive-scheme regular-border" : selectedIssue === 3 ? "shrink small-padding active-scheme border-top" : "shrink no-padding inactive-scheme border-none"}`}
                 onClick={() => {
                     if (selectedIssue !== 3) {
                         setSelectedIssue(3)
                     }
                 }}
            >
                <p className={`mb-0 mobile-transition-font 
                ${!selectedIssue ? "big-text" : selectedIssue === 3 ? "small-text underline" : "no-text"}`}>
                    Infrastructure
                </p>
                <p className={`mb-0 mobile-transition-font 
                ${!selectedIssue ? "small-text" : "no-text"}`}>
                    {ISSUES_CATEGORIES.descriptions["3"]}
                </p>
            </div>

            <div className={`mobile-nav-footer 
            ${!selectedIssue ? "big-padding" : "shrink no-padding no-border"}`}>
                <p className={`transition-font mb-0 ${!selectedIssue ? "small-text" : "no-text"}`}> Go back to main
                    menu </p>
            </div>

            <div
                className={`mobile-citywide-content ${selectedIssue ? "grow big-padding inactive-scheme regular-border" : "shrink no-padding inactive-scheme border-none"}`}>

                {selectedIssue && !selectedSpecificIssue &&
                    <div>
                        <MobileBoundary boundary={boundary} setBoundary={setBoundary}/>
                        <IssuesDropDown
                            items={selectedIssue === 1 ? health_issues : selectedIssue === 2 ? environment_issues : infrastructure_issues}
                            currentValue={selectedSpecificIssue}
                            setValue={setSelectedSpecificIssue}
                            setShowDemographics={setShowDemographics}
                            issues={issues}
                            issue_categories={issue_categories}
                        />

                        <div className={"mt-3"}>
                            <small>{`This is where you will hear about the topic that you select. Topics include a range of ${issue_categories.labels[selectedIssue].toLowerCase()} metrics.`}</small>
                        </div>
                    </div>
                }

                {selectedIssue && selectedSpecificIssue &&
                    <div>
                        <p>{issues.specific_issues_data[selectedSpecificIssue].specific_issue_ranking_narrative}</p>
                        <p className={"small-font mb-0"}>{issues.specific_issues_data[selectedSpecificIssue].specific_issue_source}</p>
                        <Histogram
                            colorRampsyType={"health"}
                            issues={issues}
                            boundary={boundary}
                            selectedSpecificIssue={selectedSpecificIssue}
                        />
                    </div>
                }


            </div>


        </div>
    )
}