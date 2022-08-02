import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";


export default function About({issues}) {
    const [expand, setExpand] = useState(false)

    return (
        <div className={"h-100 overflow-auto"}>
            <div className={"thicker-padding d-flex flex-column w-100"}>
                <div className={"w-100 d-flex flex-row"}>
                    <div className={"col-4 standard-padding"}>
                        <h3>NYC SPATIAL EQUITY TOOL</h3>
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
                            <p><span><strong>Methodology: </strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</span></p>
                        </div>
                        <div className={`${expand ? "issues-tile-ranking-vis" : "issues-tile-ranking-invis"}`}>
                            {issues.all_issues_id.map((ID)=>{
                                return(
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

                </div>


            </div>
        </div>
    )
}