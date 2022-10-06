import ISSUES_CATEGORIES from '../../texts/issue_categories.json';

export default function MobileNav({
  setShowMenu,
  showMenu,
  selectedChapter,
  setSelectedChapter,
}) {
  return (
    <>
      <div
        className={`mobile-nav`}
        style={{ height: showMenu ? 'calc(100vh - (4.025rem + .3vw))' : '0' }}
      >
        <div
          className={`mobile-nav-chapter
            ${
              showMenu
                ? 'grow big-padding regular-border'
                : 'shrink no-padding border-none'
            }
            ${selectedChapter === 1 ? 'active-scheme' : 'inactive-scheme'}
            `}
          onClick={() => {
            if (selectedChapter !== 1) {
              setSelectedChapter(1);
              setShowMenu(false);
            } else {
              setSelectedChapter(null);
            }
          }}
        >
          <p
            className={`mb-0 mobile-transition-font ${
              showMenu ? 'small-text opacity-100' : 'no-text opacity-0'
            }`}
          >
            {' '}
            What is{' '}
          </p>
          <p
            className={`mb-0 mobile-transition-font ${
              showMenu ? 'big-text opacity-100' : 'no-text opacity-0'
            }`}
          >
            {' '}
            Spatial Equity{' '}
          </p>
        </div>

        <div
          className={`mobile-nav-chapter
            ${
              showMenu
                ? 'grow big-padding regular-border'
                : 'shrink no-padding border-none'
            }
            ${selectedChapter === 2 ? 'active-scheme' : 'inactive-scheme'}`}
          onClick={() => {
            if (selectedChapter !== 2) {
              setSelectedChapter(2);
              setShowMenu(false);
            } else {
              setSelectedChapter(null);
            }
          }}
        >
          <p
            className={`mb-0 mobile-transition-font ${
              showMenu ? 'small-text opacity-100' : 'no-text opacity-0'
            }`}
          >
            {' '}
            Explore Spatial Equity by{' '}
          </p>
          <p
            className={`mb-0 mobile-transition-font ${
              showMenu ? 'big-text opacity-100' : 'no-text opacity-0'
            }`}
          >
            Citywide Data
          </p>
        </div>

        <div
          className={`mobile-nav-chapter
            ${
              showMenu
                ? 'grow big-padding regular-border'
                : 'shrink no-padding border-none'
            }
            ${selectedChapter === 3 ? 'active-scheme' : 'inactive-scheme'}`}
          onClick={() => {
            if (selectedChapter !== 3) {
              setSelectedChapter(3);
              setShowMenu(false);
            } else {
              setSelectedChapter(null);
            }
          }}
        >
          <p
            className={`mb-0 mobile-transition-font ${
              showMenu ? 'small-text opacity-100' : 'no-text opacity-0'
            }`}
          >
            {' '}
            Explore Spatial Equity by{' '}
          </p>
          <p
            className={`mb-0 mobile-transition-font ${
              showMenu ? 'big-text opacity-100' : 'no-text opacity-0'
            }`}
          >
            {' '}
            Community Profiles{' '}
          </p>
        </div>

        <div
          className={`mobile-nav-chapter
            ${
              showMenu
                ? 'grow big-padding regular-border'
                : 'shrink no-padding border-none'
            }
            ${selectedChapter === 4 ? 'active-scheme' : 'inactive-scheme'}`}
          onClick={() => {
            if (selectedChapter !== 4) {
              setSelectedChapter(4);
              setShowMenu(false);
            }
          }}
        >
          <p
            className={`mb-0 mobile-transition-font ${
              showMenu ? 'small-text opacity-100' : 'no-text opacity-0'
            }`}
          >
            {' '}
            Learn More &{' '}
          </p>
          <p
            className={`mb-0 mobile-transition-font ${
              showMenu ? 'big-text opacity-100' : 'no-text opacity-0'
            }`}
          >
            {' '}
            Take Action{' '}
          </p>
        </div>
      </div>
    </>

    /*<div className={"mobile-nav"}>
                <div className={`mobile-citywide-chapter
            ${showMenu ? "grow big-padding regular-border" : "shrink no-padding border-none"}
            ${selectedIssue === 1 ? "active-scheme" : "inactive-scheme"}
            `}
                     onClick={() => {
                         if (selectedIssue !== 1) {
                             setSelectedIssue(1)
                         }
                     }}
                >
                    <div className={`d-flex flex-row align-items-center justify-content-between`}>
                        <p className={`mb-0 mobile-transition-font ${showMenu ? "big-text" : "no-text"}`}>
                            Health
                        </p>
                    </div>
                    <p className={`mb-0 mobile-transition-font
                ${showMenu? "small-text" : "no-text"}`}>
                        {ISSUES_CATEGORIES.descriptions["1"]}
                    </p>
            </div>

                <div className={`mobile-citywide-chapter
            ${showMenu ? "grow big-padding regular-border" : "shrink no-padding border-none"}
            ${selectedIssue === 2 ? "active-scheme" : "inactive-scheme"}
            `}
                     onClick={() => {
                         if (selectedIssue !== 2) {
                             setSelectedIssue(2)
                         }
                     }}
                >
                    <div className={`d-flex flex-row align-items-center justify-content-between`}>
                        <p className={`mb-0 mobile-transition-font ${showMenu ? "big-text" : "no-text"}`}>
                            Health
                        </p>
                    </div>
                    <p className={`mb-0 mobile-transition-font
                ${showMenu? "small-text" : "no-text"}`}>
                        {ISSUES_CATEGORIES.descriptions["1"]}
                    </p>
            </div>

                <div className={`mobile-citywide-chapter
            ${showMenu ? "grow big-padding regular-border" : "shrink no-padding border-none"}
            ${selectedIssue === 3? "active-scheme" : "inactive-scheme"}
            `}
                     onClick={() => {
                         if (selectedIssue !== 3) {
                             setSelectedIssue(3)
                         }
                     }}
                >
                    <div className={`d-flex flex-row align-items-center justify-content-between`}>
                        <p className={`mb-0 mobile-transition-font ${showMenu ? "big-text" : "no-text"}`}>
                            Health
                        </p>
                    </div>
                    <p className={`mb-0 mobile-transition-font
                ${showMenu? "small-text" : "no-text"}`}>
                        {ISSUES_CATEGORIES.descriptions["1"]}
                    </p>
            </div>

            <div className={`mobile-nav-footer
            ${showMenu ? "big-padding" : "shrink no-padding no-border"}`}>
                <p className={`transition-font mb-0 ${showMenu ? "small-text" : "no-text"}`}> Go back to main
                    menu </p>
            </div>
        </div>*/

    /* <div className={"mobile-nav"}>
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
         </div>*/
  );
}
