import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { text, mouse } from "d3";


const GridGraph = ({ currentDemographics, issues, boundary, selectedSpecificIssue }) => {
    const ref = useRef();
    const containerRef = useRef();

    useEffect(() => {

        let numHeight = 5;
        let numWidth = 20;
        let intervalPx = 5;
        let squareWidth = 15;

        let getGridData = () => {
            var data = new Array();
            var xpos = 0; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
            var ypos = 0;
            var width = squareWidth;
            var height = squareWidth;

            for (var row = 0; row < numHeight; row++) {
                for (var column = 0; column < numWidth; column++) {
                    data.push({
                        x: xpos,
                        y: ypos,
                        width: width,
                        height: height
                    })
                    xpos += width + intervalPx;
                }
                xpos = 0;
                ypos += height + intervalPx;
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
            .attr("x", function (d) { return d.x; })
            .attr("y", function (d) { return d.y; })
            .attr("width", function (d) { return d.width; })
            .attr("height", function (d) { return d.height; })
            .style("fill", "#fff")
            .style("stroke", "#222")

        // clear Chart
        svg.selectAll(".gridSquare")
            .data(gridData)
            .exit()
            .remove();

    }, [currentDemographics]);

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
