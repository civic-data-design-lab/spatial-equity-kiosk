import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { text, mouse } from "d3";

import _DEMOGRAPHICS from "../texts/demographics.json";
import _RANKINGS from "../data/rankings.json";

const GridGraph = ({ colorRampsyType, issues, boundary, selectedSpecificIssue }) => {
    

    return (
        <div ref={containerRef} style={{
            height: "100%",
            width: "100%"
        }}>
            <svg ref={ref}>
                {/* Main Chart */}
                <g />

                {/* Avg Line */}
                <line id="avgLine" />
                <text id="avgTextUp" />
                <text id="avgTextDown" />

                {/* Interactive Line */}
                <line id="mouseLine" />
                <text id="mouseTextUp" />
                <text id="mouseTextDown" />
                <rect id="histBg" />

                {/* Pinned Line */}
                <line id="pinnedLine" />
                <text id="pinnedTextUp" />
                <text id="pinnedTextDown" />

                {/* Min/Max Line */}
                <line id="maxLine" />
                <line id="minLine" />
                <text id="maxText" />
                <text id="minText" />
            </svg>
        </div>
    );
};

export default GridGraph;
