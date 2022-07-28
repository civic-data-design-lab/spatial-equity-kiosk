function Nav({
                 selectedChapter,
                 setSelectedChapter
             }) {


    return (


        <div className={"col-3 h-100 position-absolute d-flex flex-column black-border"}>

            <div className={`nav-chapters black-border d-flex flex-column justify-content-between
             ${!selectedChapter ? "" : (selectedChapter === 1? "expanded-nav" : "collapsed-nav")}
             `}
                 onClick={() => {
                     if (selectedChapter !== 1) {
                         setSelectedChapter(1)
                     } else {
                         setSelectedChapter(null)
                     }
                 }}
            >
                <div>
                    <div
                        className={`nav-title ${selectedChapter && selectedChapter !== 1 ? 'collapse-nav-title' : ''}`}>
                        <h5 className="collapse-text">What is</h5>
                    </div>

                    <p className={`${selectedChapter && selectedChapter !== 1 ? "h5 m-0" : "h1"}`}>Spatial Equity</p>
                </div>


                <div className={`${selectedChapter === 1 ? "" : "d-none"}`}>
                    <p>Introduction text to issues in New York City. Elit at imperdiet dui accumsan sit amet.
                        Diam donec adipiscing tristique risus nec feugiat in. Vel turpis nunc eget lorem dolor sed
                        viverra.
                        Elit at imperdiet dui accumsan sit amet. Diam donec adipiscing tristique risus nec feugiat
                        in. </p>
                </div>
            </div>


            <div className={`nav-chapters black-border d-flex flex-column justify-content-between
             ${!selectedChapter ? "" : (selectedChapter === 2? "expanded-nav" : "collapsed-nav")}
             `}
                 onClick={() => {
                     if (selectedChapter !== 2) {
                         setSelectedChapter(2)
                     } else {
                         setSelectedChapter(null)
                     }
                 }}
            >
                <div>
                    <div
                        className={`nav-title ${selectedChapter && selectedChapter !== 2 ? 'collapse-nav-title' : ''}`}>
                        <h5>What is</h5>
                    </div>

                    <p className={`${selectedChapter && selectedChapter !== 2 ? "h5 m-0" : "h1"}`}>Spatial Equity</p>
                </div>


                <div className={`${selectedChapter === 2 ? "" : "d-none"}`}>
                    <p>Introduction text to issues in New York City. Elit at imperdiet dui accumsan sit amet.
                        Diam donec adipiscing tristique risus nec feugiat in. Vel turpis nunc eget lorem dolor sed
                        viverra.
                        Elit at imperdiet dui accumsan sit amet. Diam donec adipiscing tristique risus nec feugiat
                        in. </p>
                </div>
            </div>


            <div className={`nav-chapters black-border d-flex flex-column justify-content-between
             ${!selectedChapter ? "" : (selectedChapter === 3? "expanded-nav" : "collapsed-nav")}
             `}
                 onClick={() => {
                     if (selectedChapter !== 3) {
                         setSelectedChapter(3)
                     } else {
                         setSelectedChapter(null)
                     }
                 }}
            >
                <div>
                    <div
                        className={`nav-title ${selectedChapter && selectedChapter !== 3 ? 'collapse-nav-title' : ''}`}>
                        <h5>What is</h5>
                    </div>

                    <p className={`${selectedChapter && selectedChapter !== 3 ? "h5 m-0" : "h1"}`}>Spatial Equity</p>
                </div>


                <div className={`${selectedChapter === 3 ? "" : "d-none"}`}>
                    <p>Introduction text to issues in New York City. Elit at imperdiet dui accumsan sit amet.
                        Diam donec adipiscing tristique risus nec feugiat in. Vel turpis nunc eget lorem dolor sed
                        viverra.
                        Elit at imperdiet dui accumsan sit amet. Diam donec adipiscing tristique risus nec feugiat
                        in. </p>
                </div>
            </div>


        </div>


    )
}

export default Nav