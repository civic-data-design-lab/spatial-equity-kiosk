import {faAngleRight, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import ISSUES_CATEGORIES from "../../texts/issue_categories.json";
import IssuesDropDown from "../IssuesDropDown";
import MobileBoundary from "./MobileBoundary";
import MapToggle from "../MapToggle";
import Histogram from "../Histogram";
import IssueProfile from "../IssuesProfile";

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


            {selectedIssue && <div className={`position-relative ${selectedIssue ? "bottom-border-small" : ""}`}>
                <div className={`mobile-citywide-chapter
            ${!selectedIssue ? "shrink no-padding inactive-scheme no-border" : "shrink small-padding active-scheme border-top "}`}
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
                               onClick={() => {
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
            </div>}

            <div
                className={`${selectedSpecificIssue ? "overflow-scroll" : ""} ${selectedIssue ? "grow inactive-scheme big-padding regular-border" : "shrink no-padding inactive-scheme border-none"}`}>

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
                    <div className={"h-100"}>
                        <p>{issues.specific_issues_data[selectedSpecificIssue].specific_issue_ranking_narrative}</p>
                        <p className={"small-font mb-0"}>Source: {issues.specific_issues_data[selectedSpecificIssue].specific_issue_source}</p>
                        <Histogram
                            colorRampsyType={"health"}
                            issues={issues}
                            boundary={boundary}
                            selectedSpecificIssue={selectedSpecificIssue}
                        />

                        <br/>

                        <IssueProfile issues={issues}
                                      selectedSpecificIssue={selectedSpecificIssue}
                                      boundary={boundary}
                                      setSelectedSpecificIssue={setSelectedSpecificIssue}/>
                    </div>
                }


            </div>

            {selectedSpecificIssue && <div>
                <div className={"mobile-demographics-toggle"}>
                    <p className={"mb-0"}>See Demographics</p>
                    <FontAwesomeIcon icon={faPlus}/>
                </div>
            </div>}


        </div>
    )
}