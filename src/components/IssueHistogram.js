import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import _CHAPTER_COLORS from "../data/chapter_colors.json";
import _RANKINGS from "../data/rankings.json";
import _COUNCILDISTRICTS from "../texts/councildistricts.json";
import { useResizeObserver } from "../utils/useResizeObserver"


const getRgb = (color) => {
    let [r, g, b] = Array.from(color);
    return {
        r,
        g,
        b
    }
}

const unique = (arr) => {
    return Array.from(new Set(arr))
}

const colorInterpolate = (colorA, colorB, intval) => {
    const rgbA = getRgb(colorA);
    const rgbB = getRgb(colorB);
    const colorVal = (prop) =>
        Math.round(rgbA[prop] * (1 - intval) + rgbB[prop] * intval);
    return [
        colorVal('r'),
        colorVal('g'),
        colorVal('b'),
    ]
}

const getDataToVis = (rawIssueData) => {
    let valueArray = [];
    let nameArray = [];
    let ascending;
    let lookupArray = []

    rawIssueData.sort((a, b) => (a.rank > b.rank));

    for (let [index, value] of Object.entries(rawIssueData)) {
        valueArray.push(Number(Number(value.data).toFixed(3)))
        nameArray.push(value.community)
        lookupArray.push(value.community_ID)
    }

    // get the corresponding index of average value
    let sum = valueArray.reduce((a, b) => a + b, 0);
    let avg = Number((sum / valueArray.length).toFixed(3));
    let avgIndex;

    for (let i = 0; i < valueArray.length - 1; i++) {
        if ((valueArray[i] < avg) && (valueArray[i + 1] > avg)) {
            avgIndex = i + (avg - valueArray[i]) / (valueArray[i + 1] - valueArray[i])
            ascending = true;
            break;
        }

        if ((valueArray[i] > avg) && (valueArray[i + 1] < avg)) {
            avgIndex = i + (avg - valueArray[i + 1]) / (valueArray[i] - valueArray[i = 1])
            ascending = false;
            break;
        }
    }

    return [valueArray, nameArray, avg, avgIndex, ascending, lookupArray]
}

const IssueHistogram = ({ 
    colorRampsyType='health',
    issues,
    boundary,
    selectedSpecificIssue,
}) => {
    const ref = useRef();
    const containerRef = useRef();

    const getIssueStatement = () => {

        if (selectedSpecificIssue) {
            let words = issues.specific_issues_data[selectedSpecificIssue].highlight_statement.split(" ")
            words.shift()
            const ignoreCapitalization = ["the", "of", "an", "a", "by"]

            for (let i = 0; i < words.length; i++) {

                if (!ignoreCapitalization.includes(words[i].toLowerCase())) {
                    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
                } else {
                    words[i] = words[i]
                }
            }
            const sentence = words.join(" ");
            return sentence || null
        }
        return null
    }


    const textWidth = 50;
    const margin = {
        top: 20,
        left: 20,
        bottom: 40,
        right: 50,
    }
    const [containerWidth, containerHeight] = useResizeObserver(containerRef);

    let colorRamps = _CHAPTER_COLORS[colorRampsyType]
    let rawIssueData = _RANKINGS[boundary][issues.specific_issues_data[selectedSpecificIssue].json_id];
    let [data, nameArray, avg, avgIndex, ascending, lookupArray] = getDataToVis(rawIssueData);

    useEffect(() => {
        let svg = d3.select(ref.current)
        const height = containerHeight ? containerHeight : 0;
        const width = containerWidth ? containerWidth : 500;

        //  Init mouse line
        svg.select('#mouseLine')
            .style('stroke-width', 0);

        svg.select('#mouseTextUp')
            .attr('text-anchor', 'end')
            .attr('x', width - margin.right)
            .attr("style", "font-family:Inter")
            .attr("font-size", "14")
            .attr("fill", "#000000")
            .text('');

        svg.select('#mouseTextDown')
            .attr('text-anchor', 'end')
            .attr('x', width - margin.right)
            .attr("style", "font-family:Inter")
            .attr("font-size", "14")
            .attr("fill", "#000000")
            .text('');


    }, [colorRamps, boundary, selectedSpecificIssue, containerWidth, containerHeight,])

    useEffect(() => {

        const height = containerHeight ? containerHeight : 0;
        const width = containerWidth ? containerWidth : 500;

        // histogram bars attr
        let barPadding = 0;
        let barHeight = (height - margin.top - margin.bottom) / data.length;
        let minValueMargin = 0.05 * (d3.max(data) - d3.min(data));

        // let highlight_statement = issues.specific_issues_data[selectedSpecificIssue].highlight_statement;
        // highlight_statement = removeFirstWord(highlight_statement);
        // highlight_statement = highlight_statement.charAt(0).toUpperCase() + highlight_statement.slice(1);

        let [hiStatement, lowStatement] = issues.specific_issues_data[selectedSpecificIssue].issue_hi_low
        hiStatement = hiStatement.charAt(0).toUpperCase() + hiStatement.slice(1);;
        lowStatement = lowStatement.charAt(0).toUpperCase() + lowStatement.slice(1);;

        let xscale = d3.scaleLinear()
            // .domain([0, d3.max(data)])
            .domain([d3.min(data) - minValueMargin, d3.max(data)])
            .range([0, width - 100 - margin.right - margin.left])

        let yscale = d3.scaleLinear()
            .domain([0, data.length])
            .range([margin.top, height - margin.bottom])

        let yUnit = yscale(1) - yscale(0)

        // build SVG
        let svg = d3.select(ref.current)
            .attr('height', '100%')
            .attr('width', '100%')

        // create Chart
        svg.select('g')
            .attr('class', 'rect')
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .merge(svg.select('g')
                .attr('class', 'rect')
                .selectAll('rect')
                .data(data))
            .attr('height', (barHeight - barPadding) >= 0 ? (barHeight - barPadding) : 0)
            .attr('width', d => d3.min(data) >= 0 ? xscale(d) : (d > 0 ? xscale(d) - xscale(0) : xscale(0) - xscale(d)))
            .attr('y', (d, i) => yscale(i + 0.5))
            .attr('x', d => d3.min(data) >= 0 ? margin.left : (d > 0 ? margin.left + xscale(0) : margin.left + xscale(d)))
            .attr("fill", (d, i) => d3.rgb(...colorInterpolate(colorRamps[0], colorRamps[colorRamps.length - 1], i / data.length)))
            .attr('value', d => d)


        // clear Chart
        svg.select('g')
            .attr('class', 'rect')
            .selectAll('rect')
            .data(data)
            .exit()
            .remove();

        // draw Lines
        svg.select('#minLine')
            .attr('x1', margin.left)
            .attr('y1', yscale(0.5))
            .attr('x2', width - margin.right)
            .attr('y2', yscale(0.5))
            .style('stroke', 'black')
            .style('stroke-width', 2);

        svg.select('#maxLine')
            .attr('x1', margin.left)
            .attr('y1', yscale(data.length + 0.5))
            .attr('x2', width - margin.right)
            .attr('y2', yscale(data.length + 0.5))
            .style('stroke', 'black')
            .style('stroke-width', 2);

        svg.select('#minText')
            .attr('x', width - margin.right - textWidth)
            .attr('y', yscale(0.5) - 5)
            .attr("style", "font-family:Inter")
            .attr("font-size", "14")
            .attr("fill", "#000000")
            .text((!ascending ? `${hiStatement} ${getIssueStatement()} ${d3.max(data)}` : `${lowStatement} ${getIssueStatement()} ${d3.min(data)} `));

        svg.select('#maxText')
            .attr('x', width - margin.right - textWidth)
            .attr('y', yscale(data.length + 0.5) + 15)
            .attr("style", "font-family:Inter")
            .attr("font-size", "14")
            .attr("fill", "#000000")
            .text((ascending ? `${hiStatement} ${getIssueStatement()} ${d3.max(data)}` : `${lowStatement} ${getIssueStatement()} ${d3.min(data)} `));

       

        // Adjust text position
        svg.select('#maxText')
            .attr('x', width - margin.right - svg.select('#maxText').node().getBoundingClientRect().width);

        svg.select('#minText')
            .attr('x', width - margin.right - svg.select('#minText').node().getBoundingClientRect().width);

        svg.select('#avgLine')
            .attr('x1', margin.left)
            .attr('y1', yscale(avgIndex + 0.5))
            .attr('x2', width - margin.right)
            .attr('y2', yscale(avgIndex + 0.5))
            .style('stroke', 'black')
            .style('stroke-width', 2);

        svg.select('#avgTextUp')
            .attr('x', width - margin.right - textWidth)
            .attr('y', yscale(avgIndex + 0.5) - 5)
            .attr("style", "font-family:Inter")
            .attr("font-size", "14")
            .attr("fill", "#000000")
            .text('Citywide Average');

        svg.select('#avgTextDown')
            .attr('x', width - margin.right - textWidth)
            .attr('y', yscale(avgIndex + 0.5) + 15)
            .attr("style", "font-family:Inter")
            .attr("font-size", "14")
            .attr("fill", "#000000")
            .text(avg);

        // Adjust text position
        svg.select('#avgTextUp')
            .attr('x', width - margin.right - svg.select('#avgTextUp').node().getBoundingClientRect().width);

        svg.select('#avgTextDown')
            .attr('x', width - margin.right - svg.select('#avgTextDown').node().getBoundingClientRect().width);

        d3.select('#histBg')
            .attr('height', (height >= 0) ? height : 0)
            .attr('width', width - margin.left - margin.right)
            .attr('y', 0)
            .attr('x', margin.left)
            .attr("fill", d3.rgb(0, 0, 0, 0))
            .on('mousemove', function (event, d) {
                let pt = d3.pointer(event)

                let ycood = pt[1];
                ycood = Math.max(ycood, yscale(0.5));
                ycood = Math.min(ycood, yscale(data.length + 0.5));

                let rectID = Math.floor(yscale.invert(ycood) - 0.5)

                d3.select("#mouseLine")
                    // .transition()
                    // .duration(10)
                    // .ease('linear') 
                    .attr('y1', ycood)
                    .attr('y2', ycood)
                    .attr('x1', margin.left)
                    .attr('x2', width - margin.right)
                    .attr('lookupID', lookupArray[rectID])
                    .style('stroke', 'black')
                    .style('stroke-width', 2);

                d3.select("#mouseTextUp")
                    .attr('y', ycood - 5)
                    .attr('lookupID', lookupArray[rectID])
                    .text(`${boundary == "council" ? "Council" : ""} ${nameArray[rectID]}${boundary == "council" ? `, ${_COUNCILDISTRICTS[lookupArray[rectID]].borough.join("/ ")}` : ""}`)

                d3.select("#mouseTextDown")
                    .attr('y', ycood + 15)
                    .attr('lookupID', lookupArray[rectID])
                    .text(`${data[rectID]} ${issues.specific_issues_data[selectedSpecificIssue].issue_units_shorthand !== "" ? issues.specific_issues_data[selectedSpecificIssue].issue_units_shorthand : issues.specific_issues_data[selectedSpecificIssue].specific_issue_units}`)

            })


        // move the interaction layer to front
        d3.select('#histBg')
            .raise()

    }, [colorRamps, boundary, selectedSpecificIssue, containerWidth, containerHeight, ]);

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

                {/* Min/Max Line */}
                <line id="maxLine" />
                <line id="minLine" />
                <text id="maxText" />
                <text id="minText" />

                {/* Reset Button */}
                <text id="resetButton" >
                    Clear All
                </text>
            </svg>
        </div>
    );
};

export default IssueHistogram;