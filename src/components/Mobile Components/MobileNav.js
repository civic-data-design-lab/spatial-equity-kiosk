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


  );
}
