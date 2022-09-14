import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import _CHAPTER_COLORS from "../data/chapter_colors.json";
import _RANKINGS from "../data/rankings.json";
import _COUNCILDISTRICTS from "../texts/councildistricts.json";
import { useResizeObserver } from "../utils/useResizeObserver"
import { getIssueType } from "../utils/getIssueType"


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

    rawIssueData.sort((a, b) => (a.rank - b.rank));

    for (let [index, value] of Object.entries(rawIssueData)) {
        valueArray.push(Number(Number(value.data).toFixed(3)))
        nameArray.push(value.community)
        lookupArray.push(value.community_ID)
    }

    // get the corresponding index of average value
    let sum = valueArray.reduce((a, b) => a + b, 0);
    let avg = Number((sum / valueArray.length)) >= 10 ? Number((sum / valueArray.length).toFixed(1)) : Number((sum / valueArray.length).toFixed(3));
    let avgIndex;



    for (let i = 0; i < valueArray.length - 1; i++) {
        if ((valueArray[i] < avg) && (valueArray[i + 1] > avg)) {
            avgIndex = i + (avg - valueArray[i]) / (valueArray[i + 1] - valueArray[i]);
            ascending = true;
            break;
        }

        if ((valueArray[i] > avg) && (valueArray[i + 1] < avg)) {
            avgIndex = i + 1 - (avg - valueArray[i + 1]) / (valueArray[i] - valueArray[i + 1]);
            ascending = false;
            break;
        }
    }

    return [valueArray, nameArray, avg, avgIndex, ascending, lookupArray]
}

const IssueHistogram = ({
    colorRampsyType = 'health',
    issues,
    boundary,
    selectedSpecificIssue,
    selectedCommunity
}) => {
    const ref = useRef();
    const containerRef = useRef();

    const getIssueStatement = () => {

        if (selectedSpecificIssue) {
            let words = issues.specific_issues_data[selectedSpecificIssue].specific_issue_units_sentence.split(" ")
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
        left: 25,
        bottom: 20,
        right: 20,
    }
    const [containerWidth, containerHeight] = useResizeObserver(containerRef);

    let colorRamps = _CHAPTER_COLORS[getIssueType(issues, selectedSpecificIssue)]
    let rawIssueData = _RANKINGS[boundary][issues.specific_issues_data[selectedSpecificIssue].json_id];
    let [data, nameArray, avg, avgIndex, ascending, lookupArray] = getDataToVis(rawIssueData);
    let selectedIndex = selectedCommunity ? lookupArray.indexOf(selectedCommunity.json_lookup) : 0;

    // console.log('------')
    // console.log('specificIssue', selectedSpecificIssue)
    // console.log('issues', issues)
    // console.log('issues', issues.issues_data['environment'].specific_issues_ID)
    // console.log('issues type', getIssueType(issues, selectedSpecificIssue))
    // console.log('boundary', boundary)
    // console.log('json_id', issues.specific_issues_data[selectedSpecificIssue].json_id)
    // console.log('_RANKINGS', _RANKINGS[boundary])
    // console.log('selectedCommunity', selectedCommunity)
    // console.log('selectedCommunity.json_lookup', selectedCommunity.json_lookup)
    // console.log('rank', selectedIndex)
    // console.log('------')

    useEffect(() => {

        const height = containerHeight ? containerHeight : 0;
        const width = containerWidth ? containerWidth : 500;

        // histogram bars attr
        let barPadding = 0;
        let barWdith = (width - margin.right - margin.left) / data.length;
        let minValueMargin = 0.05 * (d3.max(data) - d3.min(data));
        let longestBarPadding = 0;


        // let [hiStatement, lowStatement] = issues.specific_issues_data[selectedSpecificIssue].issue_hi_low
        // hiStatement = hiStatement.charAt(0).toUpperCase() + hiStatement.slice(1);
        // lowStatement = lowStatement.charAt(0).toUpperCase() + lowStatement.slice(1);
        let [hiStatement, lowStatement] = ['Max', 'Min']

        let xscale = d3.scaleLinear()
            .domain([0, data.length])
            .range([margin.left, width - margin.right - margin.left])

        let yrange = (height - longestBarPadding - margin.bottom - margin.top > 0) ? (height - longestBarPadding - margin.bottom - margin.top) : 0
        let yscale = d3.scaleLinear()
            .domain([d3.min(data) >= 0 ? d3.min(data) - minValueMargin : d3.min(data), d3.max(data)])
            .range([0, yrange])


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
            .attr('width', (barWdith - barPadding) >= 0 ? (barWdith - barPadding) : 0)
            .attr('height', d => d3.min(data) >= 0 ? yscale(d) : (d > 0 ? yscale(d) - yscale(0) : yscale(0) - yscale(d)))
            .attr('x', (d, i) => xscale(i + 0.5))
            .attr('y', d => d3.min(data) >= 0 ? height - yscale(d) - margin.top : (d > 0 ? margin.top + yscale(0) : margin.top + yscale(d)))
            .attr("fill", (d, i) => d3.rgb(...colorInterpolate(colorRamps[0], colorRamps[colorRamps.length - 1], i / data.length)))
            .attr('value', d => d)

        svg.selectAll("rect")
            .each(function (d, i) {
                d3.select(this)
                    .attr('y', d => d3.min(data) >= 0 ? height - d3.select(this).attr("height") - margin.top : (d > 0 ? height - d3.select(this).attr("height") - margin.top - yscale(0) : height - d3.select(this).attr("height") - margin.top - yscale(d)))
            })

        // clear Chart
        svg.select('g')
            .attr('class', 'rect')
            .selectAll('rect')
            .data(data)
            .exit()
            .remove();

        // draw Lines
        svg.select('#minLine')
            .attr('class', 'dataLine')
            .attr('y1', margin.top)
            .attr('x1', xscale(0.5))
            .attr('y2', height - margin.bottom)
            .attr('x2', xscale(0.5))
            .style('stroke', 'black')
            .style('stroke-width', 2)
            .attr('index', 0);

        svg.select('#maxLine')
            .attr('class', 'dataLine')
            .attr('y1', margin.top)
            .attr('x1', xscale(data.length + 0.5))
            .attr('y2', height - margin.bottom)
            .attr('x2', xscale(data.length + 0.5))
            .style('stroke', 'black')
            .style('stroke-width', 2)
            .attr('index', data.length - 1);

        // draw avg Lines
        svg.select('#avgLine')
            .attr('class', 'dataLine')
            .attr('y1', margin.top)
            .attr('x1', xscale(avgIndex + 1))
            .attr('y2', height - margin.bottom)
            .attr('x2', xscale(avgIndex + 1))
            .style('stroke', 'black')
            .style('stroke-width', 2)
            .attr('index', avgIndex);

        // draw selected Lines
        svg.select('#selectedLine')
            .attr('class', 'dataLine')
            .attr('y1', margin.top)
            .attr('x1', xscale(selectedIndex + 1))
            .attr('y2', height - margin.bottom)
            .attr('x2', xscale(selectedIndex + 1))
            .style('stroke', 'black')
            .style('stroke-width', 4)
            .attr('index', selectedIndex);

        svg.selectAll(".dataLine")
            .each(function (d, i) {
                let index = Math.round(d3.select(this).attr('index'))
                let length = d3.min(data) >= 0 ? yscale(data[index]) : (data[index] > 0 ? yscale(data[index]) - yscale(0) : yscale(0) - yscale(data[index]))
                d3.select(this)
                    .attr('y1', d3.min(data) >= 0 ? height - length - margin.top : (data[index] > 0 ? height - length - margin.top - yscale(0) : height - length - margin.top - yscale(data[index])))
                d3.select(this)
                    .attr('y2', Number(d3.select(this).attr('y1')) + length)

                // svg.append('text')
                //     .attr('class', 'smaller-text')
                //     .attr('x', d3.select(this).attr('x1'))
                //     .attr('y', d3.select(this).attr('y1') - 5)
                //     .attr("style", "font-family:Inter")
                //     .attr("font-size", "14")
                //     .attr("fill", "#000000")
                //     .attr("text-anchor", "middle")
                //     .text(`${data[index]}`)
            })

        svg.select('#minTextDown')
            .attr('x', xscale(0.5) - 5)
            .attr('y', height - margin.bottom + 5)
            .attr('class', 'smaller-text')
            .attr("style", "font-family:Inter")
            .attr("font-size", "14")
            .attr("fill", "#000000")
            .attr("text-anchor", "end")
            // .text((!ascending ? `${hiStatement} ${getIssueStatement()} ${d3.max(data)}` : `${lowStatement} ${getIssueStatement()} ${d3.min(data)} `));
            .text((!ascending ? `${hiStatement} ` : `${lowStatement} `));

        svg.select('#maxTextDown')
            .attr('x', xscale(data.length + 0.5) + 5)
            .attr('y', height - margin.bottom + 5)
            .attr('class', 'smaller-text')
            .attr("style", "font-family:Inter")
            .attr("font-size", "14")
            .attr("fill", "#000000")
            // .text((ascending ? `${hiStatement} ${getIssueStatement()} ${d3.max(data)}` : `${lowStatement} ${getIssueStatement()} ${d3.min(data)} `));
            .text((ascending ? `${hiStatement} ` : `${lowStatement} `));

        svg.select('#avgTextDown')
            .attr('x', svg.select('#avgLine').attr('x1'))
            .attr('y', height - margin.bottom + 15)
            .attr('class', 'smaller-text')
            .attr("style", "font-family:Inter")
            .attr("font-size", "14")
            .attr("fill", "#000000")
            .attr("text-anchor", "middle")
            .text('NYC');

        svg.select('#selectedTextDown')
            .attr('x', svg.select('#selectedLine').attr('x1'))
            .attr('y', height - margin.bottom + 15)
            .attr('class', 'smaller-text')
            .attr("style", "font-family:Inter")
            .attr("font-size", "14")
            .attr("fill", "#000000")
            .attr("text-anchor", "middle")
            .text(`${selectedCommunity ? selectedCommunity.name : 0}`);


        svg.select('#minTextUp')
            .attr('x', xscale(0.5))
            .attr('y', svg.select('#minLine').attr('y1') - 5)
            .attr('class', 'smaller-text')
            .attr("style", "font-family:Inter")
            .attr("font-size", "14")
            .attr("fill", "#000000")
            .attr("text-anchor", ((!ascending) ? "start " : "end"))
            .text(`${data[0]}`);

        svg.select('#maxTextUp')
            .attr('x', xscale(data.length + 0.5))
            .attr('y', svg.select('#maxLine').attr('y1') - 5)
            .attr('class', 'smaller-text')
            .attr("style", "font-family:Inter")
            .attr("font-size", "14")
            .attr("fill", "#000000")
            .attr("text-anchor", ((!ascending) ? "start " : "end"))
            .text(`${data[data.length - 1]}`);

        svg.select('#avgTextUp')
            .attr('x', svg.select('#avgLine').attr('x1'))
            .attr('y', svg.select('#avgLine').attr('y1') - 5)
            .attr('class', 'smaller-text')
            .attr("style", "font-family:Inter")
            .attr("font-size", "14")
            .attr("fill", "#000000")
            .attr("text-anchor", ((!ascending) ? "start " : "end"))
            .text(`${data[Math.round(svg.select('#avgLine').attr('index'))]}`);

        let showSelectedText = (!(Number(svg.select('#selectedLine').attr('index')) == data.length - 1));
        svg.select('#selectedTextUp')
            .attr('x', svg.select('#selectedLine').attr('x1'))
            .attr('y', svg.select('#selectedLine').attr('y1') - 5)
            .attr('class', 'smaller-text')
            .attr("style", "font-family:Inter")
            .attr("font-size", "14")
            .attr("fill", "#000000")
            .attr("text-anchor", ((!ascending) ? "start " : "end"))
            .text(`${showSelectedText ? data[Math.round(svg.select('#selectedLine').attr('index'))] : ``}`);





    }, [colorRamps, boundary, selectedSpecificIssue, selectedCommunity, containerWidth, containerHeight,]);

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

                {/* Selected Line */}
                <line id="selectedLine" />
                <text id="selectedTextUp" />
                <text id="selectedTextDown" />

                {/* Min/Max Line */}
                <line id="maxLine" />
                <line id="minLine" />
                <text id="maxTextUp" />
                <text id="minTextUp" />
                <text id="maxTextDown" />
                <text id="minTextDown" />
            </svg>
        </div>
    );
};

export default IssueHistogram;
