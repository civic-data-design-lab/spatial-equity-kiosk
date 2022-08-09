import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";


export default function About({issues, selectedAbout}) {
    const [expand, setExpand] = useState(false)

    return (
        <div className={"h-100 overflow-auto"}>
            <div className={"thicker-padding d-flex flex-column w-100"}>
                {selectedAbout === 1 &&
                    <div>
                        <h3 className={"bold mb-3"}>NYC Spatial Equity Tool</h3>
                        <p>Text about the project. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation
                            ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate
                            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                            proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>
                            Ultricies tristique nulla aliquet enim tortor at auctor urna. Scelerisque in dictum non
                            consectetur a erat nam at lectus.
                            Integer feugiat scelerisque varius morbi. Neque sodales ut etiam sit amet. Pellentesque diam
                            volutpat commodo sed egestas egestas.
                            Neque sodales ut etiam sit amet nisl purus in mollis. Pretium viverra suspendisse potenti
                            nullam ac tortor vitae. Amet purus gravida
                            quis blandit turpis cursus in hac habitasse.
                        </p>
                    </div>}
                {selectedAbout === 2 &&
                    <div>
                        <h3 className={"bold mb-3"}>About the Data</h3>
                        <p>Methodology consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                            magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ornare
                            aenean euismod elementum nisi quis eleifend quam.
                            Nisl purus in mollis nunc sed id semper. Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Amet risus nullam eget felis. Viverra adipiscing at in tellus. Aliquet nibh praesent
                            tristique magna sit amet purus..</p>

                    </div>}
                {selectedAbout === 3 &&
                    <div className={"d-flex flex-column row-gap"}>
                        <h3 className={"bold mb-3"}>Take Action</h3>
                        <div>
                            <h5 className={"bold"}>See Solutions</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. Expand to see
                                solutions</p>

                            <div className={`${expand ? "issues-tile-ranking-vis" : "issues-tile-ranking-invis"}`}>
                                {issues.all_issues_id.map((ID) => {
                                    return (
                                        <div
                                            className={`${expand ? "issues-tile-ranking-vis" : "issues-tile-ranking-invis"}`}>
                                            <strong>{issues.specific_issues_data[ID].specific_issue_name}</strong>
                                            <p>{issues.specific_issues_data[ID].specific_issue_solutions}</p>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className={"d-flex flex-row justify-content-center ranking-button"}
                                 onClick={() => {
                                     setExpand(!expand)
                                 }}>
                                {expand ? <FontAwesomeIcon icon={faChevronUp}/> :
                                    <FontAwesomeIcon icon={faChevronDown}/>}
                            </div>
                        </div>

                        <div>
                            <h5 className={"bold"}>Join Transportation Alternatives</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat. </p>
                        </div>

                        <div>
                            <h5 className={"bold"}>NYC 25 x 25</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat. </p>
                        </div>

                        <div>
                            <h5 className={"bold"}>Read the Report</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat. </p>
                        </div>

                    </div>
                }
                {selectedAbout === 4 &&
                    <div className={"d-flex flex-column row-gap"}>
                        <h3 className={"bold mb-3"}>Credits</h3>
                        <p>NYC Spatial Equity Tool is initiated by Transportation Alternatives (TA). Lorem ipsum dolor sit amet,
                            consectetur adipiscing with MIT’s Civic Data Design Lab (CDDL). Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>


                        <div>
                            <h5 className={"bold"}>Transportation Alternatives</h5>
                            <p>Transportation Alternatives’ mission is to reclaim New York City’s streets from the automobile and to advocate for better walking,
                                biking and public transit for all New Yorkers. Transportation Alternatives’ mission is to reclaim New York City’s streets from the
                                automobile and to advocate for better walking, biking and public transit for all New Yorkers. </p>
                            <p> Transportation Alternatives Team: </p>
                        </div>

                        <div>
                            <h5 className={"bold"}>Civic Data Design Lab</h5>
                            <p> The MIT Civic Data Design Lab works with data to understand it for public good. We seek to develop alternative practices which
                                can make the work we do with data and images richer, smarter, more relevant, and more responsive to the needs and interests of
                                citizens traditionally on the margins of policy development. In this practice we experiment with and develop data visualization
                                and collection tools that allow us to highlight urban phenomena. Our methods borrow from the traditions of science and design by
                                using spatial analytics to expose patterns and communicating those results, through design, to new audiences. </p>

                            <p> Civic Data Design Lab Team: </p>
                        </div>


                    </div>}
                {/*<div className={"w-100 d-flex flex-row"}>
                    <div className={"col-4 standard-padding"}>
                        <h3>NYC Spatial Equity Tool</h3>
                    </div>
                    <div className={"col-8 standard-padding"}>
                        <p>
                            Text about the project. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                            mollit anim id est laborum.
                        </p>
                    </div>

                </div>

                <div className={"w-100 d-flex flex-row"}>
                    <div className={"col-4 standard-padding"}>
                        <h3>About the Data</h3>
                    </div>
                    <div className={"col-8 standard-padding"}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat. Ornare aenean euismod elementum nisi quis eleifend quam.
                            Nisl purus in mollis nunc sed id semper. Expand to see data sources and methodology.
                        </p>
                        <div>
                            <p><span><strong>Methodology: </strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</span>
                            </p>
                        </div>
                        <div className={`${expand ? "issues-tile-ranking-vis" : "issues-tile-ranking-invis"}`}>
                            {issues.all_issues_id.map((ID) => {
                                return (
                                    <div>
                                        <strong>{issues.specific_issues_data[ID].specific_issue_name}</strong>
                                        <p>{issues.specific_issues_data[ID].specific_issue_source}</p>
                                    </div>
                                )
                            })}
                        </div>

                        <div className={"d-flex flex-row justify-content-center ranking-button"}
                             onClick={() => {
                                 setExpand(!expand)
                             }}>
                            {expand ? <FontAwesomeIcon icon={faChevronUp}/> : <FontAwesomeIcon icon={faChevronDown}/>}
                        </div>
                    </div>


                </div>

                <div className={"w-100 d-flex flex-row"}>
                    <div className={"col-4 standard-padding"}>
                        <h3>Credits</h3>
                    </div>
                    <div className={"col-8 standard-padding d-flex flex-column"}>
                        <p>
                            Spatial Equity Tool is initiated by Transportation Alternatives (TA).
                            Lorem ipsum dolor sit amet, consectetur adipiscing with MIT’s Civic Data Design Lab (CDDL).
                        </p>


                        <div>
                            <strong>TA Researchers:</strong>
                            <br/>
                            <strong>CDDL Researchers:</strong>
                            <br/>
                            <strong>Website Design and Development by Civic Data Design Lab:</strong>
                        </div>

                        <div>
                        </div>
                    </div>
                </div>*/}
            </div>
        </div>
    )
}