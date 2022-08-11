import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretRight} from "@fortawesome/free-solid-svg-icons";
import Table from 'react-bootstrap/Table';


export default function About({issues, selectedAbout}) {

    const [expandSolution, setExpandSolution] = useState(null);
    const toTop = () => {
        let div = document.getElementById('about-container');
        div.scrollBy({
            top: -div.scrollHeight,
            behavior: 'smooth'
        })
    }

    // TODO: reformat about page

    return (
        <div className={"h-100 overflow-auto"} id={"about-container"}>
            <div className={"thicker-padding d-flex flex-column w-100"}>
                <div className={"w-100 d-flex flex-column"}>
                    <div className={"col-4 standard-padding"}>
                        <h4 className={"bold"}>NYC Spatial Equity Tool</h4>
                    </div>
                    <div className={"indent"}>
                        <div className={"col-8 standard-padding w-100"}>
                            <p>
                                Text about the project. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                deserunt
                                mollit anim id est laborum.
                            </p>
                        </div>
                    </div>

                </div>

                <div className={"w-100 d-flex flex-column"}>
                    <div className={"col-4 standard-padding"}>
                        <h4 className={"bold"}>About the Data</h4>
                    </div>
                    <div className={"indent"}>
                        <div className={"col-8 standard-padding w-100"}>
                            <p>
                                Methodology consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                dolore
                                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Ornare aenean euismod elementum nisi quis eleifend
                                quam.
                                Nisl purus in mollis nunc sed id semper. Ut enim ad minim veniam, quis nostrud
                                exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo consequat. Amet risus nullam eget felis.
                                Viverra
                                adipiscing at in tellus. Aliquet nibh praesent tristique magna sit amet purus.
                            </p>

                            <Table bordered>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Data Layers</th>
                                    <th>Source</th>
                                    <th>Download</th>
                                </tr>
                                </thead>
                                <tbody>
                                {issues.all_issues_id.map((id, index) => {
                                    return <tr key={index}>
                                        <td>{issues.specific_issues_data[id].specific_issue_ID}</td>
                                        <td>{issues.specific_issues_data[id].specific_issue_name}</td>
                                        <td>{issues.specific_issues_data[id].specific_issue_source}</td>
                                        <td>Link</td>
                                    </tr>
                                })}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>

                <div className={"w-100 d-flex flex-column"}>
                    <div className={"col-4 standard-padding"}>
                        <h4 className={"bold"}>Take Action</h4>
                    </div>
                    <div className={"col-8 standard-padding d-flex flex-column row-gap w-100"}>

                        <div className={"indent"}>
                            <div>
                                <h5 className={"bold"}>See Solutions</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt
                                    ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi. Expand to
                                    see
                                    solutions</p>

                                <div className={`indent mb-3`}>
                                    {issues.all_issues_id.map((ID, index) => {
                                        return (
                                            <>
                                                <div
                                                    key={index}
                                                    className={`solution-dropdown col-gap`}>
                                                    <div
                                                        className={`${expandSolution === ID ? 'rotate-right' : ''} transform-transition`}>
                                                        <FontAwesomeIcon icon={faCaretRight}
                                                                         onClick={() => {
                                                                             if (expandSolution === ID) {
                                                                                 setExpandSolution(null)
                                                                             } else {
                                                                                 setExpandSolution(ID)
                                                                             }
                                                                         }}
                                                        />

                                                    </div>
                                                    <div>
                                                        <p className={"mb-0"}>{issues.specific_issues_data[ID].specific_issue_name}</p>
                                                    </div>
                                                </div>
                                                <div
                                                    className={`${expandSolution === ID ? "issues-tile-ranking-vis" : "issues-tile-ranking-invis"} mb-0 solution-dropdown col-gap`}>
                                                    <FontAwesomeIcon icon={faCaretRight}
                                                                     className={"opacity-0 pe-none"}/>
                                                    <p className={`mb-0`}>{issues.specific_issues_data[ID].specific_issue_solutions}</p>

                                                </div>


                                            </>
                                        )
                                    })}
                                </div>
                            </div>

                            <div>
                                <h5 className={"bold"}>Join Transportation Alternatives</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt
                                    ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                                    ex ea
                                    commodo consequat. </p>
                            </div>

                            <div>
                                <h5 className={"bold"}>NYC 25 x 25</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt
                                    ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                                    ex ea
                                    commodo consequat. </p>
                            </div>

                            <div>
                                <h5 className={"bold"}>Read the Report</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt
                                    ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                                    ex ea
                                    commodo consequat. </p>
                            </div>
                        </div>
                    </div>


                </div>

                <div className={"w-100 d-flex flex-column"}>
                    <div className={"col-4 standard-padding"}>
                        <h3>Credits</h3>
                    </div>
                    <div className={"indent"}>
                        <div className={"col-8 standard-padding d-flex flex-column row-gap w-100"}>
                            <p>
                                NYC Spatial Equity Tool is initiated by Transportation Alternatives (TA).
                                Lorem ipsum dolor sit amet, consectetur adipiscing with MIT’s Civic Data Design Lab
                                (CDDL).
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt
                                ut labore et dolore magna aliqua.
                            </p>


                            <div>
                                <h5 className={"bold"}>Transportation Alternatives</h5>
                                <p>Transportation Alternatives’ mission is to reclaim New York City’s streets from the
                                    automobile and to advocate for better walking,
                                    biking and public transit for all New Yorkers. Transportation Alternatives’ mission
                                    is
                                    to reclaim New York City’s streets from the
                                    automobile and to advocate for better walking, biking and public transit for all New
                                    Yorkers. </p>
                                <p> Transportation Alternatives Team: </p>
                            </div>


                            <div>
                                <h5 className={"bold"}>MIT Norman B. Leventhal Center for Advanced Urbanism</h5>
                                <p> The MIT Norman B. Leventhal Center for Advanced Urbanism is committed to fostering a
                                    rigorous
                                    design culture for the large scale; by focusing our disciplinary conversations about
                                    architecture,
                                    urban planning, landscape architecture, and systems thinking, not about the problems
                                    of
                                    yesterday,
                                    but of tomorrow. We are motivated by the radical changes in our environment, and the
                                    role that design
                                    and research can play in addressing these. We embrace conversations with the world's
                                    top
                                    experts at MIT,
                                    to feed and foster our innovations. We take pride in the fact that participants in
                                    the
                                    Center
                                    do not just talk about things; they create projects, build things, and actively
                                    change
                                    our society
                                    out in the real world; and then come together to learn from each other's
                                    experiences,
                                    publish, and
                                    debate about future directions. The MIT Norman B. Leventhal Center for Advanced
                                    Urbanism
                                    has been
                                    established at the initiative of the Dean and department Chairs of the School of
                                    Architecture and Planning
                                    and reflects a renewed drive to excellence in urbanism.. </p>

                                <p> MIT Norman B. Leventhal Center for Advanced Urbanism Team: Names</p>
                            </div>

                            <div>
                                <h5 className={"bold"}>Civic Data Design Lab</h5>
                                <p> The MIT Civic Data Design Lab works with data to understand it for public good. We
                                    seek
                                    to develop alternative practices which
                                    can make the work we do with data and images richer, smarter, more relevant, and
                                    more
                                    responsive to the needs and interests of
                                    citizens traditionally on the margins of policy development. In this practice we
                                    experiment with and develop data visualization
                                    and collection tools that allow us to highlight urban phenomena. Our methods borrow
                                    from
                                    the traditions of science and design by
                                    using spatial analytics to expose patterns and communicating those results, through
                                    design, to new audiences. </p>

                                <p> Civic Data Design Lab Team: </p>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

            <p className={"w-100 d-flex flex-row justify-content-center text-decoration-underline"}
               onClick={() => {
                   toTop()
               }}
            >Back to top</p>
        </div>
    )
}