import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { text, mouse } from "d3";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
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

const Histogram = ({ colorRampsyType,
    issues,
    boundary,
    selectedSpecificIssue,
    communityPinned,
    setCommunityPinned,
    councilPinned,
    setCouncilPinned,
    setCommunitySearch,
    setSelectedChapter
}) => {
    const ref = useRef();
    const containerRef = useRef();

    // console.log("colorRampsyType ", colorRampsyType)

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

    // console.log(issues.specific_issues_data[selectedSpecificIssue].specific_issue_units)


    // svg attr
    const textWidth = 50;

    const [dimensions, setDimensions] = useState({
        height: 0,
        width: 0,
    })

    // const [communityPinned, setCommunityPinned] = useState([])
    // const [councilPinned, setCouncilPinned] = useState([])
    const [currentHoveredCommunityID, setCurrentHoveredCommunityID] = useState('')

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
        left: 20,
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
        let svg = d3.select(ref.current)
        const height = dimensions.height ? dimensions.height : 0;
        const width = dimensions.width ? dimensions.width : 500;

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


    }, [colorRamps, boundary, selectedSpecificIssue, dimensions,])

    useEffect(() => {

        const height = dimensions.height ? dimensions.height : 0;
        const width = dimensions.width ? dimensions.width : 500;

        // histogram bars attr
        const barPadding = 0;
        const barHeight = height == 0 ? 0 : (height - margin.top - margin.bottom) / data.length;
        const minValueMargin = 0.05 * (d3.max(data) - d3.min(data));

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
            .attr('height', barHeight - barPadding)
            .attr('width', d => d3.min(data) >= 0 ? xscale(d) : (d > 0 ? xscale(d) - xscale(0) : xscale(0) - xscale(d)))
            .attr('y', (d, i) => yscale(i + 0.5))
            .attr('x', d => d3.min(data) >= 0 ? margin.left : (d > 0 ? margin.left + xscale(0) : margin.left + xscale(d)))
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

        // draw reset button
        d3.select('#resetButton')
            .attr('x', margin.left)
            .attr('y', yscale(data.length + 0.5) + 15)
            .attr("style", "font-family:Inter")
            .attr('visibility', 'hidden')
            // .style('font-weight', 'bold')
            .attr("font-size", "14")
            .on('click', (event, d) => {
                if (boundary == "council") {
                    setCouncilPinned([]);
                } else {
                    setCommunityPinned([]);
                }
            })

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

                let rectID = Math.floor(yscale.invert(ycood) - 0.5)
                setCurrentHoveredCommunityID(lookupArray[rectID])

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

                // Adjust text position
                // svg.select('#mouseTextUp')
                //     .attr('x', width - margin.right - svg.select('#mouseTextUp').node().getBoundingClientRect().width);

                // svg.select('#mouseTextDown')
                //     .attr('x', width - margin.right - svg.select('#mouseTextDown').node().getBoundingClientRect().width);

            })
            .on('click', (event, d) => {
                let pt = d3.pointer(event)

                let ycood = pt[1];
                ycood = Math.max(ycood, yscale(0.5));
                ycood = Math.min(ycood, yscale(data.length + 0.5));

                let rectID = Math.floor(yscale.invert(ycood) - 0.5)

                // console.log(lookupArray[rectID])
                if (boundary == "council") setCouncilPinned(unique([...councilPinned, lookupArray[rectID]]))
                else setCommunityPinned(unique([...communityPinned, lookupArray[rectID]]))
            })


        // Draw all the line and make them invisible
        svg.selectAll(".pinnedLine")
            .data(data)
            .enter()
            .append("line")
            .attr("class", "pinnedLine")
            .merge(svg.selectAll(".pinnedLine")
                .data(data))
            .attr('y1', (d, i) => yscale(i + 1))
            .attr('y2', (d, i) => yscale(i + 1))
            .attr('x1', margin.left)
            .attr('x2', width - margin.right)
            .attr('visibility', 'hidden')
            .attr('lookupID', (d, i) => lookupArray[i])
            .style('stroke', 'black')
            .style('stroke-width', 2);

        svg.selectAll(".pinnedLine")
            .data(data)
            .exit()
            .remove();

        // Draw all the pinnedTextUp and make them invisible
        svg.selectAll(".pinnedTextUp")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "pinnedTextUp")
            .merge(svg.selectAll(".pinnedTextUp")
                .data(data))
            .attr('y', (d, i) => yscale(i + 1) - 5)
            .attr('x', width - margin.right)
            .attr("text-anchor", "end")
            .attr('visibility', 'hidden')
            .attr('lookupID', (d, i) => lookupArray[i])
            .attr("style", "font-family:Inter")
            .attr("font-size", "14")
            .attr("fill", "#000000")
            .text((d, i) => `${boundary == "council" ? "Council" : ""} ${nameArray[i]}${boundary == "council" ? `, ${_COUNCILDISTRICTS[lookupArray[i]].borough.join("/ ")}` : ""}`)

        svg.selectAll(".pinnedTextUp")
            .data(data)
            .exit()
            .remove();

        // Draw all the pinnedTextDown and make them invisible
        svg.selectAll(".pinnedTextDown")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "pinnedTextDown")
            .merge(svg.selectAll(".pinnedTextDown")
                .data(data))
            .attr('y', (d, i) => yscale(i + 1) + 15)
            .attr('x', width - margin.right)
            .attr("text-anchor", "end")
            .attr('visibility', 'hidden')
            .attr('lookupID', (d, i) => lookupArray[i])
            .attr("style", "font-family:Inter")
            .attr("font-size", "14")
            .attr("fill", "#000000")
            .text((d, i) => `${data[i]} ${issues.specific_issues_data[selectedSpecificIssue].issue_units_shorthand != "" ? issues.specific_issues_data[selectedSpecificIssue].issue_units_shorthand : issues.specific_issues_data[selectedSpecificIssue].specific_issue_units}`)

        svg.selectAll(".pinnedTextDown")
            .data(data)
            .exit()
            .remove();

        // Draw all cancel button
        svg.selectAll(".cancelButton")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "cancelButton")
            .merge(svg.selectAll(".cancelButton")
                .data(data))
            .attr('y', (d, i) => yscale(i + 0.5))
            .attr('x', 0)
            .attr('width', margin.left)
            .attr('height', yUnit)
            .attr('visibility', 'hidden')
            .attr('lookupID', (d, i) => lookupArray[i])
            .attr("fill", "#FFFFFF")

        svg.selectAll(".cancelButton")
            .each(function (d, i) {
                d3.select(this)
                    .on('click', (e, d) => {
                        if (boundary == "council") setCouncilPinned(councilPinned.filter((d, _) => d !== d3.select(this).attr("lookupID")))
                        else setCommunityPinned(communityPinned.filter((d, _) => d !== d3.select(this).attr("lookupID")))
                    })
            })


        svg.selectAll(".cancelButton")
            .data(data)
            .exit()
            .remove();

        // Draw all cancel button text
        svg.selectAll(".cancelButtonText")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "cancelButtonText")
            .merge(svg.selectAll(".cancelButtonText")
                .data(data))
            .attr('y', (d, i) => yscale(i + 1) + 5)
            .attr('x', margin.left - 5)
            .attr("text-anchor", "end")
            .attr('visibility', 'hidden')
            .style('font-weight', 'bold')
            .attr("fill", "#000000")
            .attr("font-size", "14")
            .text('✕')
            .attr('lookupID', (d, i) => lookupArray[i])

        svg.selectAll(".cancelButtonText")
            .each(function (d, i) {
                d3.select(this)
                    .on('click', (e, d) => {
                        if (boundary == "council") setCouncilPinned(councilPinned.filter((d, _) => d !== d3.select(this).attr("lookupID")))
                        else setCommunityPinned(communityPinned.filter((d, _) => d !== d3.select(this).attr("lookupID")))
                    })
            })
            

        svg.selectAll(".cancelButtonText")
            .data(data)
            .exit()
            .remove();

        // draw goTo button
        svg.selectAll(".goToButton")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "goToButton")
        .merge(svg.selectAll(".goToButton")
            .data(data))
        .attr('y', (d, i) => yscale(i+1)+10)
        .attr('x', width-25)
        .attr("text-anchor", "end")
        .attr('visibility', 'hidden')
        .style('font-weight', 'bold')
        .attr("fill", "#000000")
        .attr("font-size", "32")
        // .text('▶')
        .text('🞂')
        .attr('lookupID', (d, i) => lookupArray[i])

    svg.selectAll(".goToButton")
        .each(function (d, i) {
            d3.select(this)
                .on('click', (e, d) => {
                    setSelectedChapter(3)
                    setCommunitySearch(d3.select(this).attr("lookupID"))
                    // if (boundary == "council") setCouncilPinned(councilPinned.filter((d, _) => d !== d3.select(this).attr("lookupID")))
                    // else setCommunityPinned(communityPinned.filter((d, _) => d !== d3.select(this).attr("lookupID")))
                })
        })

        // move the interaction layer to front
        d3.select('#histBg')
            .raise()
        d3.select('#resetButton')
            .raise()

    }, [colorRamps, boundary, selectedSpecificIssue, dimensions, councilPinned, communityPinned]);

    useEffect(() => {
        let svg = d3.select(ref.current);
        svg.selectAll("#mouseLine").each(function (d, i) {

            if (boundary == "council") {
                if ((councilPinned.includes(d3.select(this).attr("lookupID"))) || !d3.select(this).attr("lookupID")) d3.select(this).attr('visibility', "hidden")
                else d3.select(this).attr('visibility', "visible")
            } else {
                if ((communityPinned.includes(d3.select(this).attr("lookupID"))) || !d3.select(this).attr("lookupID")) d3.select(this).attr('visibility', "hidden")
                else d3.select(this).attr('visibility', "visible")
            }
        })

        svg.selectAll("#mouseTextUp").each(function (d, i) {
            if (boundary == "council") {
                if ((councilPinned.includes(d3.select(this).attr("lookupID"))) || !d3.select(this).attr("lookupID") ) d3.select(this).attr('visibility', "hidden")
                else d3.select(this).attr('visibility', "visible")
            } else {
                if ((communityPinned.includes(d3.select(this).attr("lookupID"))) || !d3.select(this).attr("lookupID") ) d3.select(this).attr('visibility', "hidden")
                else d3.select(this).attr('visibility', "visible")
            }
        })

        svg.selectAll("#mouseTextDown").each(function (d, i) {
            if (boundary == "council") {
                if ((councilPinned.includes(d3.select(this).attr("lookupID"))) || !d3.select(this).attr("lookupID")) d3.select(this).attr('visibility', "hidden")
                else d3.select(this).attr('visibility', "visible")
            } else {
                if ((communityPinned.includes(d3.select(this).attr("lookupID"))) || !d3.select(this).attr("lookupID")) d3.select(this).attr('visibility', "hidden")
                else d3.select(this).attr('visibility', "visible")
            }
        })

        svg.selectAll(".pinnedLine").each(function (d, i) {
            if (boundary == "council") {
                if ((councilPinned.includes(d3.select(this).attr("lookupID"))) && (d3.select(this).attr("lookupID"))) d3.select(this).attr('visibility', "visible")
                else d3.select(this).attr('visibility', "hidden")
            } else {
                if ((communityPinned.includes(d3.select(this).attr("lookupID"))) && (d3.select(this).attr("lookupID"))) d3.select(this).attr('visibility', "visible")
                else d3.select(this).attr('visibility', "hidden")
            }
        })

        svg.selectAll(".pinnedTextUp").each(function (d, i) {
            if (boundary == "council") {
                if ((councilPinned.includes(d3.select(this).attr("lookupID"))) && (d3.select(this).attr("lookupID"))) d3.select(this).attr('visibility', "visible")
                else d3.select(this).attr('visibility', "hidden")
            } else {
                if ((communityPinned.includes(d3.select(this).attr("lookupID"))) && (d3.select(this).attr("lookupID"))) d3.select(this).attr('visibility', "visible")
                else d3.select(this).attr('visibility', "hidden")
            }
        })

        svg.selectAll(".pinnedTextDown").each(function (d, i) {
            if (boundary == "council") {
                if ((councilPinned.includes(d3.select(this).attr("lookupID"))) && (d3.select(this).attr("lookupID"))) d3.select(this).attr('visibility', "visible")
                else d3.select(this).attr('visibility', "hidden")
            } else {
                if ((communityPinned.includes(d3.select(this).attr("lookupID"))) && (d3.select(this).attr("lookupID"))) d3.select(this).attr('visibility', "visible")
                else d3.select(this).attr('visibility', "hidden")
            }
        })

        svg.selectAll(".cancelButton").each(function (d, i) {
            if (boundary == "council") {
                if ((councilPinned.includes(d3.select(this).attr("lookupID")))) d3.select(this).attr('visibility', "visible")
                else d3.select(this).attr('visibility', "hidden")
            } else {
                if ((communityPinned.includes(d3.select(this).attr("lookupID")))) d3.select(this).attr('visibility', "visible")
                else d3.select(this).attr('visibility', "hidden")
            }
        })

        svg.selectAll(".cancelButtonText").each(function (d, i) {
            if (boundary == "council") {
                if ((councilPinned.includes(d3.select(this).attr("lookupID")))) d3.select(this).attr('visibility', "visible")
                else d3.select(this).attr('visibility', "hidden")
            } else {
                if ((communityPinned.includes(d3.select(this).attr("lookupID")))) d3.select(this).attr('visibility', "visible")
                else d3.select(this).attr('visibility', "hidden")
            }
        })

        svg.selectAll(".goToButton").each(function (d, i) {
            if (boundary == "council") {
                if ((councilPinned.includes(d3.select(this).attr("lookupID")))) d3.select(this).attr('visibility', "visible")
                else d3.select(this).attr('visibility', "hidden")
            } else {
                if ((communityPinned.includes(d3.select(this).attr("lookupID")))) d3.select(this).attr('visibility', "visible")
                else d3.select(this).attr('visibility', "hidden")
            }
        })

        svg.selectAll("#resetButton").each(function (d, i) {
            if (boundary == "council") {
                if (councilPinned.length > 0) d3.select(this).attr('visibility', "visible")
                else d3.select(this).attr('visibility', "hidden")
            } else {
                if (communityPinned.length > 0) d3.select(this).attr('visibility', "visible")
                else d3.select(this).attr('visibility', "hidden")
            }
        })


    }, [colorRamps, boundary, selectedSpecificIssue, dimensions, councilPinned, communityPinned, currentHoveredCommunityID]);

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

export default Histogram;
