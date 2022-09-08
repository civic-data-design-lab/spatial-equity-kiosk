import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { text, mouse } from "d3";

const GridGraph = ({ colorRamps, percList, textList }) => {
    const svgRef = useRef();
    const textRef = useRef();
    const containerRef = useRef();

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
    }, [colorRamps, percList, textList])

    useEffect(() => {


        let width = dimensions.width ? dimensions.width : 0;
        // let height = dimensions.height ? dimensions.height : 150;
        let height = 1.5 / 5 * width;

        let numHeight = 5;
        let numWidth = 20;

        let vertUnit = (height / 6);
        let horiUnit = (width / 20);
        let intervalPx = horiUnit * 0.25;
        let squareWidth = horiUnit * 0.75;


        let percRamp = percList.reduce((a, b) => { a.push(a[a.length - 1] + b); return a }, [0,]);
        let colorIndex = 0;

        let getGridData = () => {
            var data = new Array();
            var xpos = 0; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
            var ypos = 0;
            var width = squareWidth;
            var height = squareWidth;

            for (var column = 0; column < numWidth; column++) {
                for (var row = 0; row < numHeight; row++) {
                    if ((data.length) >= percRamp[colorIndex]) colorIndex++;
                    data.push({
                        x: xpos,
                        y: ypos,
                        width: width,
                        height: height,
                        color: colorRamps[colorIndex - 1]
                    })
                    ypos += height + intervalPx;
                }
                ypos = 0;
                xpos += width + intervalPx;
            }
            return data;
        }

        let getGridText = () => {
            var text = new Array();
            for (var i = 0; i < textList.length; i++) {
                if (textList[i] !== "") {
                    text.push({
                        text: textList[i] + " " + percList[i] + "%",
                        color: colorRamps[i],
                        // x: width / textList.length * i,
                        y: (squareWidth + intervalPx) * (numHeight + 0.5),
                    })
                }
            }
            return text;
        }

        let gridData = getGridData();
        let gridText = getGridText();
        // console.log(currentDemographics)
        // console.log(gridData)

        // build SVG
        let svg = d3.select(svgRef.current)
            .attr('height', height)
            .attr('width', width)

        svg.selectAll(".gridSquare")
            .data(gridData)
            .enter()
            .append("rect")
            .attr("class", "gridSquare")
            .merge(svg.selectAll(".gridSquare")
                .data(gridData))
            .attr("x", (d) => (d.x))
            .attr("y", (d) => (d.y))
            .attr("width", (d) => (d.width))
            .attr("height", (d) => (d.height))
            .style("fill", (d) => (d.color))
            .style("stroke", (d) => (d.color));

        d3.select(textRef.current)
            .attr("style", "display: flex; justify-content: space-between")
            .selectAll(".gridText")
            .data(gridText)
            .enter()
            .append("text")
            .attr("class", "small-font gridText")
            .merge(d3.selectAll(".gridText")
                .data(gridText))
            // .attr("x", (d) => (d.x))
            // .attr("y", (d) => (d.y))
            .attr("style", "font-family:Inter")
            .attr("style", "font-weight:bold")
            .style("color", (d) => (d.color))
            .text((d) => (d.text));


        // clear Chart
        svg.selectAll(".gridSquare")
            .data(gridData)
            .exit()
            .remove();

        // clear Chart
        d3.selectAll(".gridText")
            .data(gridText)
            .exit()
            .remove();

    }, [colorRamps, percList, textList, dimensions]);

    return (
        <div ref={containerRef} style={{
            height: "100%",
            width: "100%"
        }}>
            <svg ref={svgRef} />
            <div ref={textRef} />
        </div>
    );
};

export default GridGraph;
