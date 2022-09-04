import React, {useState} from "react";
import Table from 'react-bootstrap/Table';
import {Scrollama, Step} from 'react-scrollama';
import _CDDL from '../img/cddl_logo.svg';
import _LCAU from '../img/Logo_LCAU logo .svg';
import _MIT from '../img/MIT-logo-black54x28.svg';


export default function About({issues, selectedAbout, setSelectedChapter}) {

    const [currentStepIndex, setCurrentStepIndex] = useState(null);
    const onStepEnter = ({data}) => {
        setCurrentStepIndex(data);
    };


    const toTop = () => {
        let div = document.getElementById('about-container');
        div.scrollBy({
            top: -div.scrollHeight,
            behavior: 'smooth'
        })
    }


    const localSolutions = () => {
        // Jump to CitiWide Data tab
        setSelectedChapter(2)
    }

    // TODO: reformat about page

    return (

        // TODO: new about page
        <div id={"about-container"}>

            <Scrollama offset={0.5} onStepEnter={onStepEnter}>
                <Step data={1} key={1}>
                    <div className={"scroll-body"}
                         style={{
                             opacity: currentStepIndex === 1 ? 1 : 0.2,
                         }}
                    >
                        <div className={"scroll-title"} id={"content-1"}>
                            <h4 className={"mb-0 bold"}></h4>
                        </div>
                        <div className={"scroll-content"}>
                            <p>
                                Are you a New Yorker ready to challenge spatial inequities in your community? Take
                                action now by sending a message to your City Council member, asking them to push for
                                policies that address the inequitable use of public space in your neighborhood and
                                citywide.
                                <span> <a style={{textDecorationLine: "underline"}}>Click here to send a message to your elected leader</a>.</span>
                            </p>
                        </div>
                    </div>
                </Step>

                <Step data={2} key={2}>
                    <div className={"scroll-body"}
                         style={{
                             opacity: currentStepIndex === 2 ? 1 : 0.2,
                         }}
                    >
                        <div className={"scroll-title"} id={"content-2"}>
                            <h4 className={"mb-0 bold"}></h4>
                        </div>
                        <div className={"scroll-content"}>
                            <p>
                                Does your City Council member or community board member know about the spatial
                                inequities in your community? Spread the word by sharing the community profile for your
                                City Council or community board district with local officials. Simply
                                <span> <a style={{textDecorationLine: "underline"}} onClick={() => {
                                    setSelectedChapter(3)
                                }}>navigate to your City Council or community board profile.</a> </span>
                                You can share this page
                                via email or by tagging them on social media. Be sure to note the issues where your
                                community needs the most improvement.
                            </p>
                        </div>
                    </div>
                </Step>

                <Step data={3} key={3}>
                    <div className={"scroll-body"}
                         style={{
                             opacity: currentStepIndex === 3 ? 1 : 0.2,
                         }}
                    >
                        <div className={"scroll-title"} id={"content-3"}>
                            <h4 className={"mb-0 bold"}></h4>
                        </div>
                        <div className={"scroll-content"}>
                            <p>
                                Achieving spatial equity is a local battle that starts with reshaping streets in
                                your own neighborhood. Transportation Alternatives provides resources, education,
                                and organizing power to activists in all five boroughs working to transform local
                                streets.
                                <span> <a style={{textDecorationLine: "underline"}}
                                          href={"https://www.google.com/url?q=https://www.transalt.org/committees&sa=D&source=docs&ust=1662266468853716&usg=AOvVaw2kd6M879VV3M8JNi-ZiMZ9"}>Join an activist committee where you live</a></span> or
                                <span> <a style={{textDecorationLine: "underline"}}
                                          href={"https://www.transalt.org/membership"}>becoming a TA member</a></span>.
                            </p>
                        </div>
                    </div>
                </Step>

                <Step data={4} key={4}>
                    <div className={"scroll-body"}
                         style={{
                             opacity: currentStepIndex === 4 ? 1 : 0.2,
                         }}
                    >
                        <div className={"scroll-title"} id={"content-4"}>
                            <h4 className={"mb-0 bold"}></h4>
                        </div>
                        <div className={"scroll-content"}>
                            <p>
                                Spatial equity is a way to understand how public space is distributed and restricted,
                                used and
                                made unusable,
                                and the different outcomes that result for different communities.
                            </p>

                            <p>
                                In New York City, streets and sidewalks make up the majority of public spaces — and it
                                matters how this space is used. The width of a street, the presence of a bench, or the
                                size of a park affects the health, accessibility, and resilience of any given community.
                                Where a wide street means more traffic fatalities and more pollution, a narrow road can
                                mean safer street crossings, cleaner air, and easier access to outdoor recreation — and
                                as a result, improved outcomes in health, education, economic opportunity, and quality
                                of
                                life. The way that public space is used is the result of policy decisions that too often
                                lead to inequities in public health, infrastructure access, and the environment.
                            </p>

                            <p>
                                In New York City, there is a direct correlation between who lives in a neighborhood and
                                how public space is used. Simply put, public space in wealthier, whiter communities is
                                less likely to be used for car and truck traffic, and more likely to be used for
                                benches,
                                street trees, bike lanes, and bus lanes. As a result, these communities see less asthma,
                                fewer heat deaths, and fewer traffic fatalities and benefit from shorter commutes, more
                                mobility choices, cleaner air, and a wealth of other positive outcomes. These
                                relationships
                                are reciprocal: Public space in low-income communities and communities of color is less
                                well
                                funded and more likely to serve people outside the community (such as a highway, as
                                compared
                                to a local bus or bike lane). As a result, the environment, health, and mobility of
                                these communities suffer.
                            </p>
                        </div>
                    </div>
                </Step>

                <Step data={5} id={5}>
                    <div className={"scroll-body"}
                         style={{
                             opacity: currentStepIndex === 5 ? 1 : 0.2,
                         }}
                    >
                        <div className={"spacer"}/>
                        <div className={"scroll-title"} id={"content-5"}>
                            <h4 className={"mb-0 bold"}></h4>
                        </div>
                        <div className={"scroll-content"}>
                            <p>
                                The goal of Spatial Equity NYC is to empower New Yorkers with data about local
                                disparities in
                                public health, environmental resilience, and transportation access that result from how
                                public
                                space is used — and to provide concrete solutions to these inequities that can be
                                implemented
                                quickly on a local level.
                                <span> <a style={{textDecorationLine: "underline"}} onClick={() => {
                                    localSolutions()
                                }}> You can see how neighborhoods differ citywide and explore local solutions here.</a></span>
                            </p>
                            <p>Spatial inequity is a systemic problem, the direct result of racist and classist policy
                                decisions. Small-scale, spatial solutions — which are the focus of Spatial Equity NYC —
                                cannot alone solve these systemic issues. However, small-scale, spatial solutions can
                                chip away at the harm caused by systemic racist and classist policies and make immediate
                                and meaningful improvements to the lives of New Yorkers. </p>
                            <p>
                                Are you a New Yorker concerned about spatial inequity in your neighborhood?
                                <span> <a style={{textDecorationLine: "underline"}}
                                          href={"#content-1"}>Take action here</a>.
                                </span>
                            </p>
                        </div>
                    </div>
                </Step>

                <Step data={6} id={6}>
                    <div className={"scroll-body"}
                         style={{
                             opacity: currentStepIndex === 6 ? 1 : 0.2,
                         }}
                    >
                        <div className={"spacer"}/>
                        <div className={"scroll-title"} id={"content-6"}>
                            <h4 className={"mb-0 bold"}></h4>
                        </div>
                        <div className={"scroll-content"}>
                            <p>In early 2021, Transportation Alternatives launched
                                <span> <a style={{textDecorationLine: "underline"}}
                                          href={"https://nyc25x25.org/25x25report.html"}>
                                    NYC 25x25: A Challenge to New York City’s Next Leaders to Give Streets Back to People.
                                    </a> </span>
                                The report and accompanying campaign proposed a radical reimagining of how public space
                                is allocated and used in New York City. The plan included a challenge to the next
                                leaders
                                of New York City: Convert 25 percent of current parking and driving space into space for
                                people by 2025. By giving a fraction of the street back to people, the City of New York
                                could save lives, improve air quality, build climate resilience into every roadbed, and
                                set the tone for the future of New York as a vibrant and fair city with accessible,
                                efficient transportation and robust, thriving street culture. NYC 25x25 is supported by
                                a coalition of more than 200 disability rights, economic, educational, environmental,
                                labor, and public health organizations across New York City.</p>

                            <p>
                                Spatial Equity NYC is a continuation of this work. The <span> <a
                                style={{textDecorationLine: "underline"}}
                                href={"#content-9"}>data analysis on this site</a></span>, which
                                relies on publicly available data from the City of New York and the U.S. Census,
                                provides
                                proof of the widespread and deeply inequitable harms created by devoting so much of New
                                York City’s finite public space to car traffic. Each of the local solutions prescribed
                                on this site would advance the City of New York toward NYC 25x25 — converting space for
                                cars into space for people to benefit our health, our environment, and the very
                                accessibility of our city.
                            </p>

                            <p>If you are an elected official or represent a community organization in New York City,
                                you can join the NYC 25x25 Coalition <span> <a style={{textDecorationLine: "underline"}}
                                                                               href={"https://nyc25x25.org/coalition.html"}>
                                    here</a></span>.</p>
                        </div>
                    </div>
                </Step>

                <Step data={7} id={7}>
                    <div className={"scroll-body"}
                         style={{
                             opacity: currentStepIndex === 7 ? 1 : 0.2,
                         }}
                    >
                        <div className={"spacer"}/>
                        <div className={"scroll-title"} id={"content-7"}>
                            <h4 className={"mb-0 bold"}></h4>
                        </div>
                        <div className={"scroll-content"}>
                            <h6 className={"bold"}> Request Additional Analysis </h6>
                            <p>
                                Local stakeholders can request additional and detailed analyses of any citywide or
                                community data on this site.
                                <span> <a style={{textDecorationLine: "underline"}}>Contact Transportation Alternatives’ director of research</a></span>.
                            </p>
                            <h6 className={"bold mt-4"}> Get Help Making Change </h6>
                            <p>
                                City Council members or community board members can request assistance in correcting
                                spatial inequities in their community.
                                <span> <a style={{textDecorationLine: "underline"}}>Contact Transportation Alternatives’ director of organizing</a></span>.
                            </p>
                            <h6 className={"bold mt-4"}> All Other Inquiries </h6>
                            <p>
                                To learn more about how to get involved with Transportation Alternatives, how to
                                advocate for spatial equity in your community, or how to replicate Spatial Equity NYC in
                                your city or town,
                                <span> <a
                                    style={{textDecorationLine: "underline"}}>contact Transportation Alternatives</a></span>.
                            </p>
                        </div>
                    </div>
                </Step>
                <Step id={8} data={8}>
                    <div className={"scroll-body"}
                         style={{
                             opacity: currentStepIndex === 8 ? 1 : 0.2,
                         }}
                    >
                        <div className={"spacer"}/>
                        <div className={"scroll-title"} id={"content-8"}>
                            <h4 className={"mb-0 bold"}></h4>
                        </div>
                        <div className={"scroll-content"}>
                            <h6 className={"bold"}>About Transportation Alternatives</h6>
                            <p>
                                Transportation Alternatives (TA) is a New York City-based 501(c)3 advocacy organization
                                whose mission is to reclaim New York City’s streets from the automobile and advocate for
                                better walking, biking, and public transit for all New Yorkers.
                            </p>
                            <p> For nearly 50 years, TA has led the movement for safe, equitable streets in New York
                                City.
                                TA believes that our streets belong to the people of New York City and works with New
                                Yorkers
                                in every borough to build a future that rises to the needs of our communities.
                                TA uses a combination of neighborhood-level grassroots organizing and citywide advocacy
                                to push for changes in public policy, street design, and resource allocation that
                                transform our city’s streets for the better.
                            </p>

                            <h6 className={"bold mt-4"}>About MIT Norman B. Leventhal Center for Advanced Urbanism</h6>
                            <p>The MIT Norman B. Leventhal Center for Advanced Urbanism is committed to fostering a
                                rigorous design culture for the large scale;
                                by focusing our disciplinary conversations about architecture, urban planning, landscape
                                architecture, and systems thinking,
                                not about the problems of yesterday, but of tomorrow. We are motivated by the radical
                                changes in our environment, and the role that
                                design and research can play in addressing these. We embrace conversations with the
                                world's top experts at MIT, to feed and foster our
                                innovations. We take pride in the fact that participants in the Center do not just talk
                                about things; they create projects, build things,
                                and actively change our society out in the real world; and then come together to learn
                                from each other's experiences, publish, and debate
                                about future directions. The MIT Norman B. Leventhal Center for Advanced Urbanism has
                                been established at the initiative of the Dean and department
                                Chairs of the School of Architecture and Planning and reflects a renewed drive to
                                excellence in urbanism.
                            </p>

                            <h6 className={"bold mt-4"}>About Civic Data Design Lab</h6>
                            <p>
                                The MIT Civic Data Design Lab works with data to understand it for public good. We seek
                                to develop alternative practices which can make the work we do with
                                data and images richer, smarter, more relevant, and more responsive to the needs and
                                interests of citizens traditionally on the margins of policy development.
                                In this practice we experiment with and develop data visualization and collection tools
                                that allow us to highlight urban phenomena. Our methods borrow from the
                                traditions of science and design by using spatial analytics to expose patterns and
                                communicating those results, through design, to new audiences.
                            </p>

                            <h6 className={"bold mt-4"}>About Buck Design</h6>
                            <p>
                                [Buck to write]
                            </p>
                        </div>
                    </div>
                </Step>

                <Step data={9} id={9}>
                    <div className={"scroll-body"}
                         style={{
                             opacity: currentStepIndex === 9 ? 1 : 0.2,
                         }}
                    >
                        <div className={"spacer"}/>
                        <div className={"scroll-title"} id={"content-9"}>
                            <h4 className={"mb-0 bold"}></h4>
                        </div>
                        <div className={"scroll-content"}>
                            <h6 className={"bold"}> Methodology and Data Sources </h6>
                            <p>
                                Methodology consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                                et
                                dolore
                                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                nisi ut
                                aliquip ex ea commodo consequat. Ornare aenean euismod elementum nisi quis eleifend
                                quam.
                                Nisl purus in mollis nunc sed id semper. Ut enim ad minim veniam, quis nostrud
                                exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo consequat. Amet risus nullam eget
                                felis.
                                Viverra
                                adipiscing at in tellus. Aliquet nibh praesent tristique magna sit amet purus.
                            </p>

                            <Table bordered>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Data Layers</th>
                                    <th>Source</th>
                                    <th>Year</th>
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

                            <div
                                className={"w-100 d-flex flex-row align-items-center big-col-gap justify-content-center pt-3 mb-3"}>
                                <svg width="126" height="34" viewBox="0 0 126 34" fill="none"
                                     xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                                    <rect y="0.203125" width="125.846" height="33.7919" fill="url(#pattern0)"/>
                                    <defs>
                                        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1"
                                                 height="1">
                                            <use href="#image0_2_491"
                                                 transform="translate(-0.0869565 -0.192708) scale(0.00267713 0.00962095)"/>
                                        </pattern>
                                        <image id="image0_2_491" width="432" height="144"
                                               href="data:image/png;base64,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"/>
                                    </defs>
                                </svg>


                                <img src={_MIT} height={30}/>
                                <img src={_LCAU} height={50}/>
                                <img src={_CDDL} height={30}/>

                            </div>

                        </div>
                    </div>
                </Step>

            </Scrollama>

            <div className={"scroll-title scroll-title-content"}>
                <h4 className={"bold"}>{currentStepIndex < 3 ? "Take Action" : "Learn More"}</h4>
            </div>


            <div className={"scroll-menu"}>
                <a className={"about-link"} href={"#content-1"}
                   style={{
                       opacity: currentStepIndex === 1 ? 1 : 0.2,
                   }}
                ><h6 className={"bold menu-item"} id={"menu-1"}>Contact
                    Your City Council Member</h6></a>
                <a className={"about-link"} href={"#content-2"}
                   style={{
                       opacity: currentStepIndex === 2 ? 1 : 0.2,
                   }}
                >
                    <h6 className={"bold menu-item"} id={"menu-2"}>Spread
                        the Word</h6></a>
                <a className={"about-link"} href={"#content-3"}
                   style={{
                       opacity: currentStepIndex === 3 ? 1 : 0.2,
                   }}
                >
                    <h6 className={"bold menu-item"} id={"menu-3"}>Get
                        Involved</h6></a>
                <a className={"about-link"} href={"#content-4"}
                   style={{
                       opacity: currentStepIndex === 4 ? 1 : 0.2,
                   }}
                ><h6 className={"bold menu-item"} id={"menu-4"}>What is
                    Spatial Equity?</h6></a>
                <a className={"about-link"} href={"#content-5"}
                   style={{
                       opacity: currentStepIndex === 5 ? 1 : 0.2,
                   }}
                ><h6 className={"bold menu-item"}
                     id={"menu-5"}>Solutions</h6></a>
                <a className={"about-link"} href={"#content-6"}
                   style={{
                       opacity: currentStepIndex === 6 ? 1 : 0.2,
                   }}
                ><h6 className={"bold menu-item"} id={"menu-6"}>About NYC
                    25x25</h6></a>
                <a className={"about-link"} href={"#content-7"}
                   style={{
                       opacity: currentStepIndex === 7 ? 1 : 0.2,
                   }}
                ><h6 className={"bold menu-item"} id={"menu-7"}>Contact
                    Us</h6></a>
                <a className={"about-link"} href={"#content-8"}
                   style={{
                       opacity: currentStepIndex === 8 ? 1 : 0.2,
                   }}
                ><h6 className={"bold menu-item"} id={"menu-8"}>About the
                    Site</h6></a>
                <a className={"about-link"} href={"#content-9"}
                   style={{
                       opacity: currentStepIndex === 9 ? 1 : 0.2,
                   }}
                ><h6 className={"bold menu-item"} id={"menu-9"}>About the
                    Data</h6></a>
            </div>
        </div>


    )
}