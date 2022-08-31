import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { text, mouse } from "d3";


const GridGraph = ({ colorRamps, percList, textList }) => {
    const ref = useRef();
    const containerRef = useRef();

    useEffect(() => {

        let numHeight = 5;
        let numWidth = 20;
        let intervalPx = 5;
        let squareWidth = 15;


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

        let gridData = getGridData();
        // console.log(currentDemographics)
        // console.log(gridData)

        // build SVG
        let svg = d3.select(ref.current)
            .attr('height', '100%')
            .attr('width', '100%')

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

        // clear Chart
        svg.selectAll(".gridSquare")
            .data(gridData)
            .exit()
            .remove();

    }, []);

    return (
        <div ref={containerRef} style={{
            height: "100%",
            width: "100%"
        }}>
            <svg ref={ref}>

            </svg>
        </div>
    );
};

export default GridGraph;
