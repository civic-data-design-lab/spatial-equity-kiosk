import BoundaryToggle from './BoundaryToggle';
import CommunityNav from './CommunityNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faLinkedinIn,
  faSquareFacebook,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import _CDDL from '../img/cddl_logo_white.svg';
import _LCAU from '../img/Logo_LCAU logo_white.svg';
import _MIT from '../img/MIT-logo-white.svg';
import _TA from '../img/ta_logo_BW_icon.svg';
import { useRef } from 'react';

function Nav({
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
  setMoreIssues,
  setMoreIssuesLength,
  addCompare,
  setAddCompare,
  selectedCoord,
  setSelectedCoord,
  selectedCompareCoord,
  setselectedCompareCoord,
  badSearch,
  setBadSearch,
  setSearchSource,
  errorCode,
  setErrorCode,
  setUserPoints,
  setMapDemographics,
  info,
  userPoints,
  viewState,
  setViewState,
  setCollapseMap,
}) {
  const selectedChapterCache = useRef(null);
  const selectedCoordsCache = useRef(null);
  const selectedCommunitiesCache = useRef(null);
  const viewStateCache = useRef(null);

  return (
    <div className={'col-3 h-100 d-flex flex-column'} style={{ zIndex: 3 }}>
      <div
        className={`nav-chapters d-flex flex-column justify-content-between top-border
             ${
               !selectedChapter
                 ? ''
                 : selectedChapter === 1
                 ? 'expanded-nav'
                 : 'collapsed-nav'
             }
             ${selectedChapter === 2 ? 'bottom-highlight' : ''}`}
        onClick={() => {
          //setSelectedIssue(null)
          //setSelectedSpecificIssue(null)
          setMoreIssuesLength(0);
          setMoreIssues([]);
          setMapDemographics(false);
          if (selectedChapter === 3) {
            selectedCoordsCache.current = userPoints;
            selectedCommunitiesCache.current = [communitySearch, compareSearch];
            viewStateCache.current = viewState;
          }
          if (selectedChapter !== 1) {
            setSelectedChapter(1);
            setShowMap(false);
            setCollapseMap(false);
          } else {
            setSelectedChapter(null);
            setShowMap(false);
          }
        }}
      >
        <div>
          <div
            className={`nav-title ${
              selectedChapter && selectedChapter !== 1
                ? 'collapse-nav-title'
                : ''
            }`}
          >
            <h5 className="collapse-text">What is</h5>
          </div>

          <p
            className={`${
              selectedChapter && selectedChapter !== 1 ? 'h5 m-0' : 'h1'
            } transition-font`}
          >
            Spatial Equity NYC
          </p>
        </div>

        <div
          className={`${
            selectedChapter === 1 ? 'nav-chapters-content-expanded' : ''
          } nav-chapters-content `}
        >
          <div className={selectedChapter !== 1 ? 'no-pointer' : ''}>
            <h5>
              Spatial Equity NYC documents inequities in the ways that public
              space — including streets, sidewalks, and greenspaces — is
              designed, distributed, and accessed.
              <span>
                {' '}
                <a
                  className={'underline white-link'}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedChapter(2);
                  }}
                >
                  Browse citywide data{' '}
                </a>
              </span>{' '}
              or
              <span>
                {' '}
                <a
                  className={'underline white-link'}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedChapter(3);
                  }}
                >
                  search community profiles{' '}
                </a>
              </span>
              to learn how decisions about the use of public space lead to
              unequal outcomes and what you can do about it.{' '}
            </h5>
          </div>
        </div>
      </div>

      <div
        className={`nav-chapters d-flex flex-column
             ${
               !selectedChapter
                 ? ''
                 : selectedChapter === 2
                 ? 'expanded-nav'
                 : 'collapsed-nav'
             }
             ${selectedChapter === 3 ? 'bottom-highlight' : ''}`}
        onClick={() => {
          setMapDemographics(false);
          setMoreIssuesLength(0);
          setMoreIssues([]);
          if (selectedChapter === 3) {
            selectedCoordsCache.current = userPoints;
            selectedCommunitiesCache.current = [communitySearch, compareSearch];
            viewStateCache.current = viewState;
          }
          setCommunitySearch(null);
          setCompareSearch(null);
          setShowMap(false);
          if (selectedChapter !== 2) {
            setSelectedChapter(2);
            setCollapseMap(false);
            //setSearchSource(null);
            setUserPoints([], []);
            setBadSearch([0, 0]);
            if (selectedChapterCache.current)
              setSelectedSpecificIssue(selectedChapterCache.current);
          } else {
            setSelectedChapter(null);
          }
          setCollapseMap(false);
          setSearchSource(null);
          setUserPoints([], []);
          setBadSearch([0, 0]);
          setCommunitySearch(null);
          setCompareSearch(null);

          /*if (selectedSpecificIssue) {
                                  setSelectedIssue(issues.specific_issues_data[selectedSpecificIssue].issue_type_ID)
                              }*/
        }}
      >
        <div>
          <div
            className={`nav-title ${
              selectedChapter && selectedChapter !== 2
                ? 'collapse-nav-title'
                : ''
            }`}
          >
            <h5 className={'collapse-text'}>Explore Spatial Equity by</h5>
          </div>

          <p
            className={`${
              selectedChapter && selectedChapter !== 2 ? 'h5 m-0' : 'h1'
            } transition-font`}
          >
            Citywide Data
          </p>
        </div>

        <div
          className={`${
            selectedChapter === 2 && selectedIssue
              ? 'nav-chapters-content-expanded'
              : ''
          } h-100 nav-chapters-content d-flex flex-column justify-content-between`}
        >
          <div className={`${selectedChapter === 2 ? '' : 'no-pointer'}`}>
            <BoundaryToggle
              boundary={boundary}
              setBoundary={setBoundary}
              setCompareSearch={setCompareSearch}
              setCommunitySearch={setCommunitySearch}
              setSelectedCoord={setSelectedCoord}
              setselectedCompareCoord={setselectedCompareCoord}
              badSearch={badSearch}
              setBadSearch={setBadSearch}
            />
          </div>
        </div>
      </div>

      <div
        className={`nav-chapters d-flex flex-column
             ${
               !selectedChapter
                 ? ''
                 : selectedChapter === 3
                 ? 'expanded-nav'
                 : 'collapsed-nav'
             }
             ${selectedChapter === 4 ? 'bottom-highlight' : ''}`}
        onClick={() => {
          setMapDemographics(false);
          /*setCommunitySearch(null);
                    setCompareSearch(null);*/
          if (selectedChapter !== 3) {
            setSelectedChapter(3);
            setCollapseMap(false);
            //setSearchSource(null);
            setUserPoints([], []);
            setBadSearch([0, 0]);

            selectedChapterCache.current = selectedSpecificIssue;
            //setSelectedSpecificIssue(null);
            if (selectedCoordsCache?.current)
              setUserPoints(selectedCoordsCache.current);
            if (selectedCommunitiesCache?.current[0])
              setCommunitySearch(selectedCommunitiesCache?.current[0]);
            if (selectedCommunitiesCache?.current[1])
              setCompareSearch(selectedCommunitiesCache?.current[1]);
            if (viewStateCache?.current) setViewState(viewStateCache.current);
          } else {
            setSelectedChapter(null);
            selectedCoordsCache.current = userPoints;
            selectedCommunitiesCache.current = [communitySearch, compareSearch];
            viewStateCache.current = viewState;
          }
          setCollapseMap(false);
          setSearchSource(null);
          setUserPoints([], []);
          setCommunitySearch(null);
          setCompareSearch(null);
          setBadSearch([0, 0]);
          setAddCompare(false);
        }}
      >
        <div>
          <div
            className={`nav-title ${
              selectedChapter && selectedChapter !== 3
                ? 'collapse-nav-title'
                : ''
            }`}
          >
            <h5 className={'collapse-text'}>Explore Spatial Equity by</h5>
          </div>

          <p
            className={`${
              selectedChapter && selectedChapter !== 3 ? 'h5 m-0' : 'h1'
            } transition-font`}
          >
            {`Community ${
              selectedChapter && selectedChapter !== 3 ? '' : ''
            } Profiles`}
          </p>
        </div>

        <div
          className={`${
            selectedChapter === 3 ? 'nav-chapters-content-expanded' : ''
          } h-100 nav-chapters-content d-flex flex-column`}
        >
          <div className={`${selectedChapter === 3 ? '' : 'no-pointer'}`}>
            <BoundaryToggle
              boundary={boundary}
              setBoundary={setBoundary}
              setCompareSearch={setCompareSearch}
              setCommunitySearch={setCommunitySearch}
              setSelectedCoord={setSelectedCoord}
              setselectedCompareCoord={setselectedCompareCoord}
              badSearch={badSearch}
              setBadSearch={setBadSearch}
            />
          </div>
          <CommunityNav
            communities={communities}
            communitySearch={communitySearch}
            compareSearch={compareSearch}
            setCommunitySearch={setCommunitySearch}
            setCompareSearch={setCompareSearch}
            boundary={boundary}
            councils={councils}
            addCompare={addCompare}
            setAddCompare={setAddCompare}
            selectedCoord={selectedCoord}
            setSelectedCoord={setSelectedCoord}
            selectedCompareCoord={selectedCompareCoord}
            setselectedCompareCoord={setselectedCompareCoord}
            badSearch={badSearch}
            setBadSearch={setBadSearch}
            setSearchSource={setSearchSource}
            errorCode={errorCode}
            setErrorCode={setErrorCode}
            info={info}
            setUserPoints={setUserPoints}
            userPoints={userPoints}
            selectedChapter={selectedChapter}
          />
        </div>
      </div>

      <div
        className={`nav-chapters d-flex flex-column justify-content-between 
             ${
               !selectedChapter
                 ? 'flex-grow-0 '
                 : selectedChapter === 4
                 ? 'expanded-nav'
                 : 'collapsed-nav'
             }`}
        onClick={() => {
          //setSelectedIssue(null)
          //setSelectedSpecificIssue(null)
          setMapDemographics(false);
          setMoreIssuesLength(0);
          setMoreIssues([]);
          setShowMap(false);
          if (selectedChapter === 3) {
            selectedCoordsCache.current = userPoints;
            selectedCommunitiesCache.current = [communitySearch, compareSearch];
            viewStateCache.current = viewState;
          }
          if (selectedChapter !== 4) {
            setSelectedChapter(4);
            setCollapseMap(false);
            //setSearchSource(null);
            setUserPoints([], []);
            setCommunitySearch(null);
            setCompareSearch(null);
            setBadSearch([0, 0]);
          } else {
            setSelectedChapter(null);
          }
        }}
      >
        <div>
          <div className={`nav-title ${selectedChapter !== 4 ? '' : ''}`}>
            <h5 className={'mb-0'}>
              {selectedChapter !== 4
                ? 'Learn More & Take Action'
                : 'Learn More &'}
            </h5>
          </div>

          <p
            className={`${
              selectedChapter === 4 ? 'h1' : 'collapse-nav-title'
            } transition-font m-0`}
          >
            Take Action
          </p>
        </div>

        <div
          className={`${
            selectedChapter === 4 ? 'nav-chapters-content-expanded' : ''
          } nav-chapters-content d-flex flex-column justify-content-end`}
        >
          <div className={'no-pointer'}>
            <div
              className={`${
                selectedChapter !== 4 ? 'pe-none' : 'pe-auto'
              } mb-3 d-flex flex-row col-gap`}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <a target="_blank" href={`//www.twitter.com/transalt`}>
                  <FontAwesomeIcon icon={faSquareFacebook} />
                </a>
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <a
                  target="_blank"
                  href={`//www.instagram.com/transportationalternatives/`}
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <a target="_blank" href={`//www.twitter.com/transalt`}>
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <a
                  target="_blank"
                  href={`//www.linkedin.com/company/transportation-alternatives`}
                >
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
              </div>
            </div>
            <p>
              Spatial Equity NYC is a project of Transportation Alternatives and
              MIT.
            </p>
            <div
              className={`attributions ${
                selectedChapter === 4 ? 'pe-auto' : 'pe-none'
              }`}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <a href={`https://www.transalt.org/`} target={'_blank'}>
                <img src={_TA} height={40} />
              </a>
              <a target="_blank" href={'https://www.mit.edu/'}>
                <img src={_MIT} height={25} />
              </a>
              <a target="_blank" href={'https://lcau.mit.edu/'}>
                <img src={_LCAU} height={40} />
              </a>
              <a target="_blank" href={'civicdatadesignlab.mit.edu'}>
                <img src={_CDDL} height={25} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
