import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { text, mouse } from "d3";

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

const DonutChart = (colorRamps) => {
    const ref = useRef();
    useEffect(() => {
        const data = ([
            42358, 98745, 36186, 20817, 68199, 57303, 27330, 21467, 23958, 86923,
            20881, 32462, 47504, 76660, 111284, 10824, 19879, 28216, 26133, 66290,
            23684, 11035, 25084, 130028, 22654, 69009, 49598, 11765, 14387, 13512,
            15558, 24364, 11138, 22206, 18541, 20679, 64235, 114357, 111314, 36500,
            26879, 23008, 21960, 89437, 31784, 49608, 20314, 81281, 32459, 102158,
            124121,
        ]).sort(d3.ascending);
        // console.log(data);

        // svg attr
        const width = 500;
        const height = 1200;
        const widthChart = 400;
        const textWidth = 50;


        const margin = {
            top: 30,
            left: 30,
            bottom: 30,
            right: 30,
        }

        // histogram bars attr
        const barPadding = 0;
        const barHeight = (height - margin.top - margin.bottom) / data.length;

        // scales of chart
        let xscale = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, widthChart - margin.right - margin.left])

        let yscale = d3.scaleLinear()
            .domain([0, data.length])
            .range([margin.top, height - margin.bottom])

        // build SVG
        let svg = d3.select(ref.current)
            .attr('height', height)
            .attr('width', width)

        // draw Chart
        svg.select('g')
            .attr('class', 'rect')
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('height', barHeight - barPadding)
            //.attr('value', d => { console.log(xscale(d)) })
            .attr('width', d => xscale(d))
            .attr('y', (d, i) => yscale(i + 0.5))
            .attr('x', margin.left)
            // .attr("fill", (d, i) => d3.rgb(...colorRamps.colorRamps[Math.floor(colorRamps.colorRamps.length * i / data.length)]))
            .attr("fill", (d, i) => d3.rgb(...colorInterpolate(colorRamps.colorRamps[0], colorRamps.colorRamps[colorRamps.colorRamps.length - 1], i / data.length)))
            .attr('value', d => d)

        // draw Lines
        svg.append('line')
            .attr('x1', margin.left)
            .attr('y1', yscale(0.5))
            .attr('x2', width - margin.right)
            .attr('y2', yscale(0.5))
            .style('stroke', 'black')
            .style('stroke-width', 2);

        svg.append('line')
            .attr('x1', margin.left)
            .attr('y1', yscale(data.length + 0.5))
            .attr('x2', width - margin.right)
            .attr('y2', yscale(data.length + 0.5))
            .style('stroke', 'black')
            .style('stroke-width', 2);

        svg.select('#mouseLine')
            .attr('x1', margin.left)
            .attr('y1', yscale(data.length / 2 + 0.5))
            .attr('x2', width - margin.right)
            .attr('y2', yscale(data.length / 2 + 0.5))
            .style('stroke', 'black')
            .style('stroke-width', 4);

        svg.select('#minText')
            .attr('x', width - margin.right - textWidth)
            .attr('y', yscale(0.5) + 15)
            .attr("style", "font-family:Inter")
            .attr("font-size", "14")
            .attr("fill", "#000000")
            .text('Min ' + d3.min(data));

        svg.select('#maxText')
            .attr('x', width - margin.right - textWidth)
            .attr('y', yscale(data.length + 0.5) - 5)
            .attr("style", "font-family:Inter")
            .attr("font-size", "14")
            .attr("fill", "#000000")
            .text('Max ' + d3.max(data));

        svg.select('#mouseTextUp')
            .attr('x', width - margin.right - textWidth)
            .attr('y', yscale(data.length / 2 + 0.5) - 5)
            .attr("style", "font-family:Inter")
            .attr("font-size", "14")
            .attr("fill", "#000000")
            .text('AA');

        svg.select('#mouseTextDown')
            .attr('x', width - margin.right - textWidth)
            .attr('y', yscale(data.length / 2 + 0.5) + 15)
            .attr("style", "font-family:Inter")
            .attr("font-size", "14")
            .attr("fill", "#000000")
            .text('BB');


        svg.select('#maxText')
            .attr('x', width - margin.right - svg.select('#maxText').node().getBoundingClientRect().width);

        svg.select('#minText')
            .attr('x', width - margin.right - svg.select('#minText').node().getBoundingClientRect().width);


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
                //console.log(Math.floor(yscale.invert(ycood) - 0.5));

                d3.select("#mouseLine")
                    // .transition()
                    // .duration(10)
                    // .ease('linear') 
                    .attr('y1', ycood)
                    .attr('y2', ycood)

                d3.select("#mouseTextUp")
                    .attr('y', ycood - 5)
                    .text(Math.floor(yscale.invert(ycood) - 0.5))

                d3.select("#mouseTextDown")
                    .attr('y', ycood + 15)
                    .text(data[Math.floor(yscale.invert(ycood) - 0.5)])
            })


    }, []);
    return (
        <svg ref={ref}>
            <g />
            <text id="maxText" />
            <text id="minText" />

            <line id="mouseLine" />
            <text id="mouseTextUp" />
            <text id="mouseTextDown" />
            <rect id="histBg" />
        </svg>
    );
};

export default DonutChart;
