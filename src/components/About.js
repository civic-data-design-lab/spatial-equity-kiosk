import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Scrollama, Step } from 'react-scrollama';
import _CDDL from '../img/cddl_logo.svg';
import _LCAU from '../img/Logo_LCAU logo .svg';
import _MIT from '../img/MIT-logo-black54x28.svg';

const subheadings = [
  'Contact Your City Council Member',
  'Spread the Word',
  'Get Involved',
  'What is Spatial Equity?',
  'Solutions',
  'About NYC 25x25',
  'Contact Us',
  'Credits',
  'About the Data',
];

export default function About({ issues, selectedAbout, setSelectedChapter }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(null);
  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
  };

  // console.log(dataLayers, issues.all_issues_id);

  const dataJson = issues.specific_issues_data;

  dataJson[16] = {
    specific_issue_name: 'Race & Ethnicity',
    specific_issue_ID: 16,
    link: 'https://www1.nyc.gov/site/planning/planning-level/nyc-population/american-community-survey.page.page',
    specific_issue_source: 'US Census American Comm Survey',
    year: '2016-2020',
  };
  dataJson[17] = {
    specific_issue_name: 'Poverty Level',
    specific_issue_ID: 17,
    link: 'href url here',
    specific_issue_source: "US Census American Comm Survey, Mayor's Office for Economic Opportunity",
    year: '2018',
  };
  dataJson[18] = {
    specific_issue_name: 'Vehicle Ownership',
    specific_issue_ID: 18,
    link: 'https://censusreporter.org/data/table/?table=B08201&geo_ids=16000US3651000,140|16000US3651000&primary_geo_id=16000US3651000',
    specific_issue_source: 'US Census American Comm Survey',
    year: ' 2016-2020',
  };
  dataJson[19] = {
    specific_issue_name: 'Drive Alone to Work',
    specific_issue_ID: 19,
    link: 'https://data.census.gov/cedsci/table?q=b08301&g=0100000US&tid=ACSDT5Y2020.B08301',
    specific_issue_source: 'US Census American Comm Survey',
    year: '2016-2020',
  };
  dataJson[20] = {
    specific_issue_name: 'Walk, Bike, or Ride Transit',
    specific_issue_ID: 20,
    link: 'https://data.census.gov/cedsci/table?q=b08301&g=0100000US&tid=ACSDT5Y2020.B08301',
    specific_issue_source: 'US Census American Comm Survey',
    year: '2016-2020',
  };
  dataJson[21] = {
    specific_issue_name: 'City Council Districts',
    specific_issue_ID: 21,
    link: 'https://www1.nyc.gov/site/planning/data-maps/open-data/districts-download-metadata.page',
    specific_issue_source: 'NYC Department of City Planning (DCP)',
    year: '2022',
  };
  dataJson[22] = {
    specific_issue_name: 'Community Districts',
    specific_issue_ID: 22,
    link: 'https://www1.nyc.gov/site/planning/data-maps/open-data/districts-download-metadata.page',
    specific_issue_source: 'NYC Department of City Planning (DCP)',
    year: '2022',
  };
  dataJson[23] = {
    specific_issue_name: 'Neighborhood Tabulation Areas',
    specific_issue_ID: 23,
    link: 'https://www1.nyc.gov/site/planning/data-maps/open-data/census-download-metadata.page',
    specific_issue_source: 'NYC Department of City Planning (DCP)',
    year: '2020',
  };


  const dataLayers = Object.keys(dataJson);

  const toTop = () => {
    let div = document.getElementById('about-container');
    div.scrollBy({
      top: -div.scrollHeight,
      behavior: 'smooth',
    });
  };

  const localSolutions = () => {
    // Jump to CitiWide Data tab
    setSelectedChapter(2);
  };

  useEffect(() => {
    if (selectedAbout) {
      let content = document.getElementById(`content-${selectedAbout}`);
      let topPos = content.offsetTop;

      /*
      document.getElementById('about-container').scrollTop = topPos;
*/
      document.getElementById('about-container').scroll({
        top: topPos,
        left: 0,
        behavior: 'smooth',
      });

      console.log('selectedAbout ', selectedAbout);
    }
  }, [selectedAbout]);

  // TODO: reformat about page

  return (
    // TODO: new about page
    <div id={'about-container'}>
      <Scrollama offset={0.5} onStepEnter={onStepEnter}>
        <Step data={1} key={1}>
          <div
            className={'scroll-body'}
            style={{
              opacity: currentStepIndex === 1 ? 1 : 0.2,
            }}
          >
            <div className={'scroll-title'} id={'content-1'}>
              <h4 className={'mb-0 bold'}></h4>
            </div>
            <div className={'scroll-content'}>
              <p>
                Are you a New Yorker ready to challenge spatial inequities in
                your community? Take action now by sending a message to your
                City Council member, asking them to push for policies that
                address the inequitable use of public space in your neighborhood
                and citywide.
                <span>
                  {' '}
                  <a style={{ textDecorationLine: 'underline' }}>
                    Click here to send a message to your elected leader
                  </a>
                  .
                </span>
              </p>
            </div>
          </div>
        </Step>

        <Step data={2} key={2}>
          <div
            className={'scroll-body'}
            style={{
              opacity: currentStepIndex === 2 ? 1 : 0.2,
            }}
          >
            <div className={'scroll-title'} id={'content-2'}>
              <h4 className={'mb-0 bold'}></h4>
            </div>
            <div className={'scroll-content'}>
              <p>
                Does your City Council member or community board member know
                about the spatial inequities in your community? Spread the word
                by sharing the community profile for your City Council or
                community board district with local officials. Simply
                <span>
                  {' '}
                  <a
                    style={{ textDecorationLine: 'underline' }}
                    onClick={() => {
                      setSelectedChapter(3);
                    }}
                  >
                    navigate to your City Council or community board profile.
                  </a>{' '}
                </span>
                You can share this page via email or by tagging them on social
                media. Be sure to note the issues where your community needs the
                most improvement.
              </p>
            </div>
          </div>
        </Step>

        <Step data={3} key={3}>
          <div
            className={'scroll-body'}
            style={{
              opacity: currentStepIndex === 3 ? 1 : 0.2,
            }}
          >
            <div className={'scroll-title'} id={'content-3'}>
              <h4 className={'mb-0 bold'}></h4>
            </div>
            <div className={'scroll-content'}>
              <p>
                Achieving spatial equity is a local battle that starts with
                reshaping streets in your own neighborhood. Transportation
                Alternatives provides resources, education, and organizing power
                to activists in all five boroughs working to transform local
                streets.
                <span>
                  {' '}
                  <a
                    style={{ textDecorationLine: 'underline' }}
                    href={'https://www.transalt.org/committees'}
                    target={'_blank'}
                  >
                    Join an activist committee where you live
                  </a>
                </span>{' '}
                or
                <span>
                  {' '}
                  <a
                    style={{ textDecorationLine: 'underline' }}
                    href={'https://www.transalt.org/membership'}
                    target={'_blank'}
                  >
                    become a TA member
                  </a>
                </span>
                .
              </p>
            </div>
          </div>
        </Step>

        <Step data={4} key={4}>
          <div
            className={'scroll-body'}
            style={{
              opacity: currentStepIndex === 4 ? 1 : 0.2,
            }}
          >
            <div className={'scroll-title'} id={'content-4'}>
              <h4 className={'mb-0 bold'}></h4>
            </div>
            <div className={'scroll-content'}>
              <p>
                Spatial equity is a way to understand how public space is
                distributed and restricted, used and made unusable, and the
                different outcomes that result for different communities.
              </p>

              <p>
                In New York City, streets and sidewalks make up the majority of
                public spaces — and it matters how this space is used. The width
                of a street, the presence of a bench, or the size of a park
                affects the health, accessibility, and resilience of any given
                community. Where a wide street means more traffic fatalities and
                more pollution, a narrow road can mean safer street crossings,
                cleaner air, and easier access to outdoor recreation — and as a
                result, improved outcomes in health, education, economic
                opportunity, and quality of life. The way that public space is
                used is the result of policy decisions that too often lead to
                inequities in public health, infrastructure access, and the
                environment.
              </p>

              <p>
                In New York City, there is a direct correlation between who
                lives in a neighborhood and how public space is used. Simply
                put, public space in wealthier, whiter communities is less
                likely to be used for car and truck traffic, and more likely to
                be used for benches, street trees, bike lanes, and bus lanes. As
                a result, these communities see less asthma, fewer heat deaths,
                and fewer traffic fatalities and benefit from shorter commutes,
                more mobility choices, cleaner air, and a wealth of other
                positive outcomes. These relationships are reciprocal: Public
                space in low-income communities and communities of color is less
                well funded and more likely to serve people outside the
                community (such as a highway, as compared to a local bus or bike
                lane). As a result, the environment, health, and mobility of
                these communities suffer.
              </p>
            </div>
          </div>
        </Step>

        <Step data={5} id={5}>
          <div
            className={'scroll-body'}
            style={{
              opacity: currentStepIndex === 5 ? 1 : 0.2,
            }}
          >
            <div className={'spacer'} />
            <div className={'scroll-title'} id={'content-5'}>
              <h4 className={'mb-0 bold'}></h4>
            </div>

            <div className={'scroll-content'}>
              <p>
                The goal of Spatial Equity NYC is to empower New Yorkers with
                data about local disparities in public health, environmental
                resilience, and transportation access that result from how
                public space is used — and to provide concrete solutions to
                these inequities that can be implemented quickly on a local
                level.
                <span>
                  {' '}
                  <a
                    style={{ textDecorationLine: 'underline' }}
                    onClick={() => {
                      localSolutions();
                    }}
                  >
                    {' '}
                    You can see how neighborhoods differ citywide and explore
                    local solutions here.
                  </a>
                </span>
              </p>
              <p>
                Spatial inequity is a systemic problem, the direct result of
                racist and classist policy decisions. Small-scale, spatial
                solutions — which are the focus of Spatial Equity NYC — cannot
                alone solve these systemic issues. However, small-scale, spatial
                solutions can chip away at the harm caused by systemic racist
                and classist policies and make immediate and meaningful
                improvements to the lives of New Yorkers.{' '}
              </p>
              <p>
                Are you a New Yorker concerned about spatial inequity in your
                neighborhood?
                <span>
                  {' '}
                  <a
                    style={{ textDecorationLine: 'underline' }}
                    href={'#content-1'}
                  >
                    Take action here
                  </a>
                  .
                </span>
              </p>
            </div>
          </div>
        </Step>

        <Step data={6} id={6}>
          <div
            className={'scroll-body'}
            style={{
              opacity: currentStepIndex === 6 ? 1 : 0.2,
            }}
          >
            <div className={'spacer'} />
            <div className={'scroll-title'} id={'content-6'}>
              <h4 className={'mb-0 bold'}></h4>
            </div>
            <div className={'scroll-content'}>
              <p>
                In early 2021, Transportation Alternatives launched
                <span>
                  {' '}
                  <a
                    style={{ textDecorationLine: 'underline' }}
                    href={'https://nyc25x25.org/25x25report.html'}
                    target={'_blank'}
                  >
                    NYC 25x25: A Challenge to New York City’s Next Leaders to
                    Give Streets Back to People.
                  </a>{' '}
                </span>
                The report and accompanying campaign proposed a radical
                reimagining of how public space is allocated and used in New
                York City. The plan included a challenge to the next leaders of
                New York City: Convert 25 percent of current parking and driving
                space into space for people by 2025. By giving a fraction of the
                street back to people, the City of New York could save lives,
                improve air quality, build climate resilience into every
                roadbed, and set the tone for the future of New York as a
                vibrant and fair city with accessible, efficient transportation
                and robust, thriving street culture. NYC 25x25 is supported by a
                coalition of more than 200 disability rights, economic,
                educational, environmental, labor, and public health
                organizations across New York City.
              </p>

              <p>
                Spatial Equity NYC is a continuation of this work. The{' '}
                <span>
                  {' '}
                  <a
                    style={{ textDecorationLine: 'underline' }}
                    href={'#content-9'}
                  >
                    data analysis on this site
                  </a>
                </span>
                , which relies on publicly available data from the City of New
                York and the U.S. Census, provides proof of the widespread and
                deeply inequitable harms created by devoting so much of New York
                City’s finite public space to car traffic. Each of the local
                solutions prescribed on this site would advance the City of New
                York toward NYC 25x25 — converting space for cars into space for
                people to benefit our health, our environment, and the very
                accessibility of our city.
              </p>

              <p>
                If you are an elected official or represent a community
                organization in New York City, you can join the NYC 25x25
                Coalition{' '}
                <span>
                  {' '}
                  <a
                    style={{ textDecorationLine: 'underline' }}
                    href={'https://nyc25x25.org/coalition.html'}
                    target={'_blank'}
                  >
                    here
                  </a>
                </span>
                .
              </p>
            </div>
          </div>
        </Step>

        <Step data={7} id={7}>
          <div
            className={'scroll-body'}
            style={{
              opacity: currentStepIndex === 7 ? 1 : 0.2,
            }}
          >
            <div className={'spacer'} />
            <div className={'scroll-title'} id={'content-7'}>
              <h4 className={'mb-0 bold'}></h4>
            </div>
            <div className={'scroll-content'}>
              <h6 className={'bold'}> Request Additional Analysis </h6>
              <p>
                Local stakeholders can request additional and detailed analyses
                of any citywide or community data on this site.
                <span>
                  {' '}
                  <a
                    style={{ textDecorationLine: 'underline' }}
                    href={'mailto:philip.miatkowski@transalt.org'}
                    target={'_blank'}
                  >
                    Contact Transportation Alternatives’ director of research
                  </a>
                </span>
                .
              </p>
              <h6 className={'bold mt-4'}> Get Help Making Change </h6>
              <p>
                City Council members or community board members can request
                assistance in correcting spatial inequities in their community.
                <span>
                  {' '}
                  <a
                    style={{ textDecorationLine: 'underline' }}
                    href={'mailto:elizabeth.adams@transalt.org'}
                    target={'_blank'}
                  >
                    Contact Transportation Alternatives’ director of organizing
                  </a>
                </span>
                .
              </p>
              <h6 className={'bold mt-4'}> All Other Inquiries </h6>
              <p>
                To learn more about how to get involved with Transportation
                Alternatives, how to advocate for spatial equity in your
                community, or how to replicate Spatial Equity NYC in your city
                or town,
                <span>
                  {' '}
                  <a
                    style={{ textDecorationLine: 'underline' }}
                    href={'mailto:info@transalt.org'}
                    target={'_blank'}
                  >
                    contact Transportation Alternatives
                  </a>
                </span>
                .
              </p>
            </div>
          </div>
        </Step>
        <Step id={8} data={8}>
          <div
            className={'scroll-body'}
            style={{
              opacity: currentStepIndex === 8 ? 1 : 0.2,
            }}
          >
            <div className={'spacer'} />
            <div className={'scroll-title'} id={'content-8'}>
              <h4 className={'mb-0 bold'}></h4>
            </div>
            <div className={'scroll-content'}>
              <h6 className={'bold'}>About Transportation Alternatives</h6>
              <p>
                Transportation Alternatives (TA) is a New York City-based
                501(c)3 advocacy organization whose mission is to reclaim New
                York City’s streets from the automobile and advocate for better
                walking, biking, and public transit for all New Yorkers.
              </p>
              <p>
                {' '}
                For nearly 50 years, TA has led the movement for safe, equitable
                streets in New York City. TA believes that our streets belong to
                the people of New York City and works with New Yorkers in every
                borough to build a future that rises to the needs of our
                communities. TA uses a combination of neighborhood-level
                grassroots organizing and citywide advocacy to push for changes
                in public policy, street design, and resource allocation that
                transform our city’s streets for the better.
              </p>

              <h6 className={'bold mt-4'}>
                About MIT Norman B. Leventhal Center for Advanced Urbanism
              </h6>
              <p>
                The MIT Norman B. Leventhal Center for Advanced Urbanism is
                committed to fostering a rigorous design culture for the large
                scale; by focusing our disciplinary conversations about
                architecture, urban planning, landscape architecture, and
                systems thinking, not about the problems of yesterday, but of
                tomorrow. We are motivated by the radical changes in our
                environment, and the role that design and research can play in
                addressing these. We embrace conversations with the world's top
                experts at MIT, to feed and foster our innovations. We take
                pride in the fact that participants in the Center do not just
                talk about things; they create projects, build things, and
                actively change our society out in the real world; and then come
                together to learn from each other's experiences, publish, and
                debate about future directions. The MIT Norman B. Leventhal
                Center for Advanced Urbanism has been established at the
                initiative of the Dean and department Chairs of the School of
                Architecture and Planning and reflects a renewed drive to
                excellence in urbanism.
              </p>

              <h6 className={'bold mt-4'}>About Civic Data Design Lab</h6>
              <p>
                The MIT Civic Data Design Lab works with data to understand it
                for public good. We seek to develop alternative practices which
                can make the work we do with data and images richer, smarter,
                more relevant, and more responsive to the needs and interests of
                citizens traditionally on the margins of policy development. In
                this practice we experiment with and develop data visualization
                and collection tools that allow us to highlight urban phenomena.
                Our methods borrow from the traditions of science and design by
                using spatial analytics to expose patterns and communicating
                those results, through design, to new audiences.
              </p>

              <h6 className={'bold mt-4'}>About Buck Design</h6>
              <p>
                <a href={'https://buck.co/'} target={'_blank'}>
                  BUCK
                </a>
                &nbsp;is a talent-driven, global, creative company with offices
                in New York, Los Angeles, Sydney and Amsterdam. Founded in 2004,
                BUCK has built a reputation for outstanding craftsmanship and
                innovation through collaboration with a wide range of clients
                across the cultural and technology spheres, including Apple,
                Instagram, IBM, Nike, Airbnb, Paypal, and Pepsi. Recognized as
                an industry leader, BUCK’s trophy case includes an Emmy,
                multiple gold Cannes Lions, Clios, pencils, cubes, and over 150
                other awards from the most prestigious competitions in the
                world.
              </p>
            </div>
          </div>
        </Step>

        <Step data={9} id={9}>
          <div
            className={'scroll-body'}
            style={{
              opacity: currentStepIndex === 9 ? 1 : 0.2,
            }}
          >
            <div className={'spacer'} />
            <div className={'scroll-title'} id={'content-9'}>
              <h4 className={'mb-0 bold'}></h4>
            </div>
            <div className={'scroll-content'}>
              <h6 className={'bold'}> Methodology and Data Sources </h6>
              <p>
                Methodology consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Ornare aenean euismod elementum
                nisi quis eleifend quam. Nisl purus in mollis nunc sed id
                semper. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Amet
                risus nullam eget felis. Viverra adipiscing at in tellus.
                Aliquet nibh praesent tristique magna sit amet purus.
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
                  {dataLayers.map((id, index) => {
                    return (
                      <tr key={index} className="about-table-row">
                        <td>
                          {issues.specific_issues_data[id]?.specific_issue_ID}
                        </td>
                        <td>
                          {issues.specific_issues_data[id]?.specific_issue_name}
                        </td>
                        <td>
                          <a
                            target={'_blank'}
                            href={issues.specific_issues_data[id]?.link}
                          >
                            {
                              issues.specific_issues_data[id]
                                ?.specific_issue_source
                            }
                          </a>
                        </td>
                        <td>{issues.specific_issues_data[id]?.year}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              <div
                className={
                  'w-100 d-flex flex-row align-items-center big-col-gap justify-content-center pt-3 mb-3'
                }
              ></div>
            </div>
          </div>
        </Step>
      </Scrollama>

      <div className={'scroll-title scroll-title-content'}>
        <h4 className={'bold'}>
          {currentStepIndex < 4
            ? `Take Action — ${subheadings[currentStepIndex - 1]}`
            : `Learn More — ${subheadings[currentStepIndex - 1]}`}
        </h4>
      </div>

      <div className={'scroll-menu'}>
        <a
          className={'about-link'}
          href={'#content-1'}
          style={{
            opacity: currentStepIndex === 1 ? 1 : 0.2,
          }}
        >
          <h5 className={'bold menu-item'} id={'menu-1'}>
            {subheadings[0]}
          </h5>
        </a>
        <a
          className={'about-link'}
          href={'#content-2'}
          style={{
            opacity: currentStepIndex === 2 ? 1 : 0.2,
          }}
        >
          <h5 className={'bold menu-item'} id={'menu-2'}>
            {subheadings[1]}
          </h5>
        </a>
        <a
          className={'about-link'}
          href={'#content-3'}
          style={{
            opacity: currentStepIndex === 3 ? 1 : 0.2,
          }}
        >
          <h5 className={'bold menu-item'} id={'menu-3'}>
            {subheadings[2]}
          </h5>
        </a>
        <a
          className={'about-link'}
          href={'#content-4'}
          style={{
            opacity: currentStepIndex === 4 ? 1 : 0.2,
          }}
        >
          <h5 className={'bold menu-item'} id={'menu-4'}>
            {subheadings[3]}
          </h5>
        </a>
        <a
          className={'about-link'}
          href={'#content-5'}
          style={{
            opacity: currentStepIndex === 5 ? 1 : 0.2,
          }}
        >
          <h5 className={'bold menu-item'} id={'menu-5'}>
            {subheadings[4]}
          </h5>
        </a>
        <a
          className={'about-link'}
          href={'#content-6'}
          style={{
            opacity: currentStepIndex === 6 ? 1 : 0.2,
          }}
        >
          <h5 className={'bold menu-item'} id={'menu-6'}>
            {subheadings[5]}
          </h5>
        </a>
        <a
          className={'about-link'}
          href={'#content-7'}
          style={{
            opacity: currentStepIndex === 7 ? 1 : 0.2,
          }}
        >
          <h5 className={'bold menu-item'} id={'menu-7'}>
            {subheadings[6]}
          </h5>
        </a>
        <a
          className={'about-link'}
          href={'#content-8'}
          style={{
            opacity: currentStepIndex === 8 ? 1 : 0.2,
          }}
        >
          <h5 className={'bold menu-item'} id={'menu-8'}>
            {subheadings[7]}
          </h5>
        </a>
        <a
          className={'about-link'}
          href={'#content-9'}
          style={{
            opacity: currentStepIndex === 9 ? 1 : 0.2,
          }}
        >
          <h5 className={'bold menu-item'} id={'menu-9'}>
            {subheadings[8]}
          </h5>
        </a>
      </div>
    </div>
  );
}
