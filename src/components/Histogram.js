import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { text, mouse } from "d3";

import _CHAPTER_COLORS from "../data/chapter_colors.json";
import _RANKINGS from "../data/rankings.json";
import _COUNCILDISTRICTS from "../texts/councildistricts.json";
// import _ISSUES from "../texts/issues.json"


const getRgb = (color) => {
    let [r, g, b] = Array.from(color);
    return {
        r,
        g,
        b
    }
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

    for (let [_, value] of Object.entries(rawIssueData)) {
        valueArray.push(Number(Number(value.data).toFixed(3)))
        nameArray.push(value.community)
        lookupArray.push(value.community_ID)
    }

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

const Histogram = ({ colorRampsyType, issues, boundary, selectedSpecificIssue }) => {
    const ref = useRef();
    const containerRef = useRef();

    console.log("colorRampsyType ", colorRampsyType)

    const getIssueStatement = () => {

        if (selectedSpecificIssue) {
            let words = issues.specific_issues_data[selectedSpecificIssue].highlight_statement.split(" ")
            words.shift()
            const ignoreCapitalization = ["the", "of", "an", "a", "by"]

            for (let i = 0; i < words.length; i++) {
                
                if (!ignoreCapitalization.includes(words[i].toLowerCase())) {
                    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
                } else{
                    words[i] = words[i]
                } 
            }
            const sentence = words.join(" ");
            return sentence || null
        }
        return null
    }

    // console.log(issues.specific_issues_data[selectedSpecificIssue].specific_issue_units)

    
    // svg attr
    // const width = 500;
    // const height = 1200;
    // const widthChart = 400;
    const textWidth = 50;

    const [dimensions, setDimensions] = useState({
        height: 0,
        width: 0,
    })

    useEffect(() => {
        let handleResize = () => {
            
            if (containerRef.current) {
                setDimensions({
                    height: containerRef.current.clientHeight,
                    width: containerRef.current.clientWidth,
                })
            }
        }
        handleResize();

        window.addEventListener('resize', handleResize);
    }, [boundary, selectedSpecificIssue])

    const margin = {
        top: 20,
        left: 0,
        bottom: 40,
        right: 50,
    }



    let colorRamps = _CHAPTER_COLORS[colorRampsyType]
    let rawIssueData = _RANKINGS[boundary][issues.specific_issues_data[selectedSpecificIssue].json_id];
    let [data, nameArray, avg, avgIndex, ascending, lookupArray] = getDataToVis(rawIssueData);
    
    // console.log(lookupArray)
    // console.log(rawIssueData)
    // console.log(avg);
    // console.log(data);

    // console.log(rawIssueData);
    // console.log("colorRamps", colorRamps)
    // console.log("issues", issues)
    // console.log("boundary", boundary)
    // console.log("selectedSpecificIssue", selectedSpecificIssue)

    useEffect(() => {

        const height = dimensions.height ? dimensions.height : 0;
        const width = dimensions.width ? dimensions.width : 500;

        // histogram bars attr
        const barPadding = 0;
        const barHeight = height == 0 ? 0 : (height - margin.top - margin.bottom) / data.length;
        const minValueMargin = 0.05 * (d3.max(data) - d3.min(data));

        const removeFirstWord = (str) => {
            const indexOfSpace = str.indexOf(' ');
            if (indexOfSpace === -1) {
                return '';
            }
            return str.substring(indexOfSpace + 1);
        }
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
            .attr('height', barHeight - barPadding)
            //.attr('value', d => { console.log(xscale(d)) })
            .attr('width', d => xscale(d))
            .attr('y', (d, i) => yscale(i + 0.5))
            .attr('x', margin.left)
            // .attr("fill", (d, i) => d3.rgb(...colorRamps.colorRamps[Math.floor(colorRamps.colorRamps.length * i / data.length)]))
            .attr("fill", (d, i) => d3.rgb(...colorInterpolate(colorRamps[0], colorRamps[colorRamps.length - 1], i / data.length)))
            .attr('value', d => d);


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

        //  Init mouse line
        svg.select('#mouseLine')
            .style('stroke-width', 0);

        //  Init pinned line
        svg.select('#pinnedLine')
            .style('stroke-width', 0);

        d3.select("#pinnedTextUp")
            .text('')

        d3.select("#pinnedTextDown")
            .text('')


        svg.select('#minText')
            .attr('x', width - margin.right - textWidth)
            .attr('y', yscale(0.5) + 15)
            .attr("style", "font-family:Inter")
            .attr("font-size", "14")
            .attr("fill", "#000000")
            // .text((ascending ? 'Min ' + d3.min(data) : 'Max ' + d3.max(data)));
            // .text((ascending ? highlight_statement + ' ' + d3.min(data) : 'Max ' + d3.max(data)));
            .text((!ascending ? `${hiStatement} ${getIssueStatement()} ${d3.max(data)}` : `${lowStatement} ${getIssueStatement()} ${d3.min(data)} `));

        svg.select('#maxText')
            .attr('x', width - margin.right - textWidth)
            .attr('y', yscale(data.length + 0.5) - 5)
            .attr("style", "font-family:Inter")
            .attr("font-size", "14")
            .attr("fill", "#000000")
            // .text((!ascending ? 'Min ' + d3.min(data) : 'Max ' + d3.max(data)));
            // .text((!ascending ? highlight_statement + ' ' + d3.min(data) : 'Max ' + d3.max(data)));
            .text((ascending ? `${hiStatement} ${getIssueStatement()} ${d3.max(data)}` : `${lowStatement} ${getIssueStatement()} ${d3.min(data)} `));

        svg.select('#mouseTextUp')
            .attr('x', width - margin.right - textWidth)
            .attr('y', yscale(data.length / 2 + 0.5) - 5)
            .attr("style", "font-family:Inter")
            .attr("font-size", "14")
            .attr("fill", "#000000")
            .text('');

        svg.select('#mouseTextDown')
            .attr('x', width - margin.right - textWidth)
            .attr('y', yscale(data.length / 2 + 0.5) + 15)
            .attr("style", "font-family:Inter")
            .attr("font-size", "14")
            .attr("fill", "#000000")
            .text('');

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
            .attr('height', height)
            .attr('width', width - margin.left - margin.right)
            .attr('y', 0)
            .attr('x', margin.left)
            .attr("fill", d3.rgb(0, 0, 0, 0))
            .on('mousemove', function (event, d) {
                let pt = d3.pointer(event)

                let ycood = pt[1];
                ycood = Math.max(ycood, yscale(0.5));
                ycood = Math.min(ycood, yscale(data.length + 0.5));

                // console.log(pt);
                // console.log(Math.floor(yscale.invert(ycood) - 0.5));

                d3.select("#mouseLine")
                    // .transition()
                    // .duration(10)
                    // .ease('linear') 
                    .attr('y1', ycood)
                    .attr('y2', ycood)
                    .attr('x1', margin.left)
                    .attr('x2', width - margin.right)
                    .style('stroke', 'black')
                    .style('stroke-width', 4);

                d3.select("#mouseTextUp")
                    .attr('y', ycood - 5)
                    .text(`${boundary == "council" ? "Council" : ""} ${nameArray[Math.floor(yscale.invert(ycood) - 0.5)]}${boundary == "council" ? `, ${_COUNCILDISTRICTS[lookupArray[Math.floor(yscale.invert(ycood) - 0.5)]].borough.join("/ ")}` : ""}`)

                d3.select("#mouseTextDown")
                    .attr('y', ycood + 15)
                    .text(`${data[Math.floor(yscale.invert(ycood) - 0.5)]} ${issues.specific_issues_data[selectedSpecificIssue].specific_issue_units}`)

                // Adjust text position
                svg.select('#mouseTextUp')
                    .attr('x', width - margin.right - svg.select('#mouseTextUp').node().getBoundingClientRect().width);

                svg.select('#mouseTextDown')
                    .attr('x', width - margin.right - svg.select('#mouseTextDown').node().getBoundingClientRect().width);

            })
            .on('click', function (event, d) {
                let pt = d3.pointer(event)

                let ycood = pt[1];
                ycood = Math.max(ycood, yscale(0.5));
                ycood = Math.min(ycood, yscale(data.length + 0.5));

                // console.log(pt);
                //console.log(Math.floor(yscale.invert(ycood) - 0.5));

                d3.select("#pinnedLine")
                    // .transition()
                    // .duration(10)
                    // .ease('linear') 
                    .attr('y1', ycood)
                    .attr('y2', ycood)
                    .attr('x1', margin.left)
                    .attr('x2', width - margin.right)
                    .style('stroke', 'black')
                    .style('stroke-width', 4)
                    .exit()
                    .remove();


                d3.select("#pinnedTextUp")
                    .attr('y', ycood - 5)
                    .text(`${boundary == "council" ? "Council" : ""} ${nameArray[Math.floor(yscale.invert(ycood) - 0.5)]}${boundary == "council" ? `, ${_COUNCILDISTRICTS[lookupArray[Math.floor(yscale.invert(ycood) - 0.5)]].borough.join("/ ")}` : ""}`)

                d3.select("#pinnedTextDown")
                    .attr('y', ycood + 15)
                    .text(`${data[Math.floor(yscale.invert(ycood) - 0.5)]} ${issues.specific_issues_data[selectedSpecificIssue].specific_issue_units}`)

                // Adjust text position
                svg.select('#pinnedTextUp')
                    .attr('x', width - margin.right - svg.select('#mouseTextUp').node().getBoundingClientRect().width);

                svg.select('#pinnedTextDown')
                    .attr('x', width - margin.right - svg.select('#mouseTextDown').node().getBoundingClientRect().width);

            })


    }, [colorRamps, boundary, selectedSpecificIssue, dimensions]);

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

                {/* Pinned Line */}
                <line id="pinnedLine" />
                <text id="pinnedTextUp" />
                <text id="pinnedTextDown" />

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
            </svg>
        </div>
    );
};

export default Histogram;
