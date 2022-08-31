import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { text, mouse } from "d3";


const GridGraph = ({ colorRampsyType, issues, boundary, selectedSpecificIssue }) => {
    const ref = useRef();
    const containerRef = useRef();

    let numHeight = 5;
    let numWidth = 20;
    let intervalPx = 15;
    let squareWidth = 5;

    let getGridData = () => {
        var data = new Array();
        var xpos = 0; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
        var ypos = 0;
        var width = squareWidth;
        var height = squareWidth;

        // iterate for rows 
        for (var row = 0; row < numHeight; row++) {
            data.push(new Array());

            // iterate for cells/columns inside rows
            for (var column = 0; column < numWidth; column++) {
                data[row].push({
                    x: xpos,
                    y: ypos,
                    width: width,
                    height: height
                })
                // increment the x position. I.e. move it over by 50 (width variable)
                xpos += width + intervalPx;
            }
            // reset the x position after a row is complete
            xpos = 0;
            // increment the y position for the next row. Move it down 50 (height variable)
            ypos += height + intervalPx;
        }
        return data;
    }

    let gridData = getGridData();

    // build SVG
    let svg = d3.select(ref.current)
        .attr('height', '100%')
        .attr('width', '100%')

    let gridRow = svg.selectAll(".gridRow")
        .data(gridData)
        .enter().append("g")
        .attr("class", "gridRow")
        .merge(svg.selectAll(".gridRow")
            .data(gridData));

    let gridColumn = gridRow.selectAll(".gridSquare")
        .data(function (d) { return d; })
        .enter().append("rect")
        .attr("class", "gridSquare")
        .attr("x", function (d) { return d.x; })
        .attr("y", function (d) { return d.y; })
        .attr("width", function (d) { return d.width; })
        .attr("height", function (d) { return d.height; })
        .style("fill", "#fff")
        .style("stroke", "#222")
        .merge(gridRow.selectAll(".gridSquare")
            .data(function (d) { return d; }));

    // clear Chart
    svg.selectAll(".gridRow")
        .data(gridData)
        .exit()
        .remove();

    gridRow.selectAll(".gridSquare")
        .data(function (d) { return d; })
        .exit()
        .remove();

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
