import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import _CHAPTER_COLORS from '../data/chapter_colors.json';
import _BOROUGH_COLORS from '../data/borough_colors.json';
import _RANKINGS from '../data/rankings.json';
import _COUNCILDISTRICTS_TEXTS from '../texts/councildistricts.json';
import { useResizeObserver } from '../utils/useResizeObserver';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import RankingTable from './RankingTable';
import _COUNCILDISTRICTS from '../data/council_districts.json';
import _COMMUNITYBOARDS from '../data/community_boards.json';

import { getNumber } from '../utils/functions';

const getRgb = (color) => {
  let [r, g, b] = Array.from(color);
  return {
    r,
    g,
    b,
  };
};

const getBbox = (selection) => {
  selection.each(function (d) {
    d.bbox = this.getBBox();
  });
};

const unique = (arr) => {
  return Array.from(new Set(arr));
};

const colorInterpolate = (colorA, colorB, intval) => {
  const rgbA = getRgb(colorA);
  const rgbB = getRgb(colorB);
  const colorVal = (prop) =>
    Math.round(rgbA[prop] * (1 - intval) + rgbB[prop] * intval);
  return [colorVal('r'), colorVal('g'), colorVal('b')];
};

const getDataToVis = (rawIssueData, selectedSpecificIssue, issues) => {
  let valueArray = [];
  let nameArray = [];
  let ascending;
  let lookupArray = [];

  if (issues.specific_issues_data[selectedSpecificIssue].good_or_bad > 0) {
    rawIssueData.sort((a, b) => a.rank - b.rank);
  } else {
    rawIssueData.sort((a, b) => b.rank - a.rank);
  }

  for (let [index, value] of Object.entries(rawIssueData)) {
    valueArray.push(Number(Number(value.data).toFixed(3)));
    nameArray.push(value.community);
    lookupArray.push(value.community_ID);
  }

  // get the corresponding index of average value
  let sum = valueArray.reduce((a, b) => a + b, 0);
  let avg = Number(sum / valueArray.length);
  let avgIndex;
  let avgRectID;

  for (let i = 0; i < valueArray.length - 1; i++) {
    if (valueArray[i] < avg && valueArray[i + 1] > avg) {
      avgIndex =
        i + (avg - valueArray[i]) / (valueArray[i + 1] - valueArray[i]);
      avgRectID = Math.round(avgIndex);
      ascending = true;
      break;
    }

    if (valueArray[i] > avg && valueArray[i + 1] < avg) {
      avgIndex =
        i + 1 - (avg - valueArray[i + 1]) / (valueArray[i] - valueArray[i + 1]);
      avgRectID = Math.round(avgIndex);
      ascending = false;
      break;
    }
  }

  return [
    valueArray,
    nameArray,
    avg,
    avgIndex,
    avgRectID,
    ascending,
    lookupArray,
  ];
};

const Histogram = ({
  colorRampsyType,
  issues,
  boundary,
  selectedSpecificIssue,
  communityPinned,
  setCommunityPinned,
  councilPinned,
  setCouncilPinned,
  setCommunitySearch,
  setSelectedChapter,
  communitySearch,
  compareSearch,
  userPoints,
  setUserPoints,
  selectedCoord,
  setSelectedCoord,
  setSearchSource,
}) => {
  const ref = useRef();
  const containerRef = useRef();
  // let useBoroughColor = false;
  // console.log("colorRampsyType ", colorRampsyType)

  const getIssueStatement = (value, average) => {
    if (selectedSpecificIssue) {
      let words =
        issues.specific_issues_data[selectedSpecificIssue].units_shorthand != ''
          ? issues.specific_issues_data[
              selectedSpecificIssue
            ].units_shorthand.split(' ')
          : issues.specific_issues_data[
              selectedSpecificIssue
            ].histogram_item.split(' ');

      const ignoreCapitalization = ['the', 'of', 'an', 'a', 'by'];

      for (let i = 0; i < words.length; i++) {
        if (!ignoreCapitalization.includes(words[i].toLowerCase())) {
          words[i] = words[i][0].toUpperCase() + words[i].substr(1);

          if (words[i].toLowerCase() === 'and') {
            words[i] = '&';
          }
        } else {
          words[i] = words[i];
        }
      }

      let sentence = words.join(' ');

      // special case where just the symbol is sufficient
      if (
        ['F16_TreCan', 'F27_BusSpe'].includes(
          issues.specific_issues_data[selectedSpecificIssue].json_id
        )
      ) {
        return '';
      }

      if (
        issues.specific_issues_data[selectedSpecificIssue].json_id ==
        'F14_TmpDev'
      ) {
        sentence = `${
          value > average ? 'Above' : value == average ? '' : 'Below'
        } ${sentence}`;
      }

      return sentence || null;
    }
    return null;
  };

  const getBoundingStatement = (minMax) => {
    const bounds =
      issues.specific_issues_data[selectedSpecificIssue].histogram_bounds;

    const lookup = Number(
      issues.specific_issues_data[selectedSpecificIssue].good_or_bad
    );

    if (minMax == 'max') {
      return `${bounds[Number(!lookup)]}`;
    } else {
      return `${bounds[lookup]}`;
    }
  };

  // console.log(issues.specific_issues_data[selectedSpecificIssue].units)

  // svg attr
  const textWidth = 50;

  // const [communityPinned, setCommunityPinned] = useState([])
  // const [councilPinned, setCouncilPinned] = useState([])
  const [currentHoveredCommunityID, setCurrentHoveredCommunityID] =
    useState('');
  const [useBoroughColor, setUseBoroughColor] = useState(false);

  const [toggleDisplayMode, setToggleDisplayMode] = useState(false);

  const [containerWidth, containerHeight] = useResizeObserver(containerRef);

  const margin = {
    top: 20,
    left: 2,
    bottom: 40,
    right: 50,
  };

  let colorRamps = _CHAPTER_COLORS[colorRampsyType];
  let rawIssueData =
    _RANKINGS[boundary][
      issues.specific_issues_data[selectedSpecificIssue]?.json_id
    ];
  let [data, nameArray, avg, avgIndex, avgRectID, ascending, lookupArray] =
    getDataToVis(rawIssueData, selectedSpecificIssue, issues);
  let colorArray = [];

  for (let i = 0; i < data.length; i++) {
    let boroughName =
      boundary == 'council'
        ? _COUNCILDISTRICTS_TEXTS[lookupArray[i]].borough[0].split(' ')[0]
        : nameArray[i].split(' ')[0];
    // console.log(boroughName)
    if (useBoroughColor) {
      colorArray.push(
        d3.rgb(
          ...colorInterpolate(
            _BOROUGH_COLORS[boroughName].deckFormat,
            _BOROUGH_COLORS[boroughName].deckFormat,
            0
          )
        )
      );
    } else {
      colorArray.push(
        d3.rgb(
          ...colorInterpolate(
            colorRamps[colorRamps.length - 1],
            colorRamps[0],
            ascending
              ? 1 - i / (rawIssueData.length - 1)
              : i / (rawIssueData.length - 1)
          )
        )
      );
    }
  }

  // console.log(avg)

  // console.log(lookupArray)
  // console.log(rawIssueData)
  // console.log(avgIndex);
  // console.log(data);

  // console.log(rawIssueData);
  // console.log("colorRamps", colorRamps)
  // console.log("issues", issues)
  // console.log("boundary", boundary)
  // console.log("selectedSpecificIssue", selectedSpecificIssue)

  useEffect(() => {
    let svg = d3.select(ref.current);
    const height = containerHeight ? containerHeight : 0;
    const width = containerWidth ? containerWidth : 500;

    //  Init mouse line
    svg.select('#mouseLine').style('stroke-width', 0);

    svg
      .select('#mouseTextUp')
      .attr('text-anchor', 'end')
      .attr('x', width - margin.right)
      .attr(
        'style',
        'font-family:Inter; text-shadow:rgb(255 255 255) -1px -1px 0px, rgb(255 255 255) -1px 1px 0px, rgb(255 255 255) 1px -1px 0px, rgb(255 255 255) 1px 1px 0px'
      )
      .attr('font-size', '12')
      .attr('fill', '#000000')
      .text('');

    svg
      .select('#mouseTextDown')
      .attr('text-anchor', 'end')
      .attr('x', width - margin.right)
      .attr(
        'style',
        'font-family:Inter; text-shadow:rgb(255 255 255) -1px -1px 0px, rgb(255 255 255) -1px 1px 0px, rgb(255 255 255) 1px -1px 0px, rgb(255 255 255) 1px 1px 0px'
      )
      .attr('font-size', '12')
      .attr('fill', '#000000')
      .text('');
  }, [
    colorRamps,
    boundary,
    selectedSpecificIssue,
    containerWidth,
    containerHeight,
  ]);

  useEffect(() => {
    const height = containerHeight ? containerHeight : 0;
    const width = containerWidth ? containerWidth : 500;

    // histogram bars attr
    let barPadding = 0;
    let barHeight = (height - margin.top - margin.bottom) / data.length;
    let minValueMargin = 0.05 * (d3.max(data) - d3.min(data));
    let longestBarPadding = 100;

    let [hiStatement, lowStatement] =
      issues.specific_issues_data[selectedSpecificIssue].issue_hi_low;
    hiStatement = hiStatement.charAt(0).toUpperCase() + hiStatement.slice(1);
    lowStatement = lowStatement.charAt(0).toUpperCase() + lowStatement.slice(1);

    const metricSymbol =
      issues.specific_issues_data[selectedSpecificIssue].issue_units_symbol !==
      ''
        ? issues.specific_issues_data[selectedSpecificIssue].issue_units_symbol
        : '';

    let xscale = d3
      .scaleLinear()
      // .domain([0, d3.max(data)])
      .domain([
        d3.min(data) >= 0 ? d3.min(data) - minValueMargin : d3.min(data),
        d3.max(data),
      ])
      .range([0, width - longestBarPadding - margin.right - margin.left]);

    let yscale = d3
      .scaleLinear()
      .domain([0, data.length])
      .range([margin.top, height - margin.bottom]);

    let yUnit = yscale(1) - yscale(0);

    // build SVG
    let svg = d3
      .select(ref.current)
      .attr('height', '100%')
      .attr('width', '100%');

    // create Chart
    svg
      .select('g')
      .attr('class', 'rect')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .merge(svg.select('g').attr('class', 'rect').selectAll('rect').data(data))
      .attr('height', barHeight - barPadding >= 0 ? barHeight - barPadding : 0)
      .attr('width', (d) =>
        d3.min(data) >= 0
          ? xscale(d)
          : d > 0
          ? xscale(d) - xscale(0)
          : xscale(0) - xscale(d)
      )
      .attr('y', (d, i) => yscale(i + 0.5))
      .attr('x', (d) =>
        d3.min(data) >= 0
          ? margin.left
          : d > 0
          ? margin.left + xscale(0)
          : margin.left + xscale(d)
      )
      .attr('initColor', (d, i) => colorArray[i])
      .style('fill', (d, i) => colorArray[i])
      .attr('value', (d) => d)
      .attr('lookupID', (d, i) => lookupArray[i]);

    // clear Chart
    svg
      .select('g')
      .attr('class', 'rect')
      .selectAll('rect')
      .data(data)
      .exit()
      .remove();

    // draw Lines
    svg
      .select('#minLine')
      .attr('x1', margin.left)
      .attr('y1', yscale(0.5))
      .attr('x2', width - margin.right)
      .attr('y2', yscale(0.5))
      .style('stroke', 'black')
      .style('stroke-width', 1);

    svg
      .select('#maxLine')
      .attr('x1', margin.left)
      .attr('y1', yscale(data.length + 0.5))
      .attr('x2', width - margin.right)
      .attr('y2', yscale(data.length + 0.5))
      .style('stroke', 'black')
      .style('stroke-width', 1);

    svg
      .select('#minText')
      .attr('x', width - margin.right - textWidth)
      .attr('y', yscale(0.5) - 5)
      .attr('style', 'font-family:Inter')
      .attr('font-size', '12')
      .attr('fill', '#000000')
      .text(
        !ascending
          ? `${getBoundingStatement('max')}`
          : `${getBoundingStatement('min')}`
      );

    svg
      .select('#maxText')
      .attr('x', width - margin.right - textWidth)
      .attr('y', yscale(data.length + 0.5) + 15)
      .attr('style', 'font-family:Inter')
      .attr('font-size', '12')
      .attr('fill', '#000000')
      .text(
        ascending
          ? `${getBoundingStatement('max')}`
          : `${getBoundingStatement('min')}`
      );

    // draw reset button
    svg
      .select('#resetButton')
      .attr('x', margin.left)
      .attr('y', yscale(data.length + 0.5) + 15)
      .attr('style', 'font-family:Inter')
      .attr('visibility', 'hidden')
      // .style('font-weight', 'bold')
      .attr('font-size', '12')
      .on('click', (event, d) => {
        if (boundary == 'council') {
          setCouncilPinned([]);
        } else {
          setCommunityPinned([]);
        }
      });

    svg
      .select('#resetBg')
      .attr('x', margin.left)
      .attr('y', yscale(data.length + 0.5) + 1)
      .attr('visibility', 'hidden')
      .attr(
        'width',
        svg.select('#resetButton').node().getBoundingClientRect().width + 5
      )
      .attr(
        'height',
        svg.select('#resetButton').node().getBoundingClientRect().height
      )
      //   .attr('fill', '#000000');
      .attr('fill', '#FFFFFF');

    // Adjust text position
    svg
      .select('#maxText')
      .attr(
        'x',
        width -
          margin.right -
          svg.select('#maxText').node().getBoundingClientRect().width
      );

    svg
      .select('#minText')
      .attr(
        'x',
        width -
          margin.right -
          svg.select('#minText').node().getBoundingClientRect().width
      );

    svg
      .select('#avgLine')
      .attr('x1', margin.left)
      .attr('y1', yscale(avgIndex + 1))
      .attr('x2', width - margin.right)
      .attr('y2', yscale(avgIndex + 1))
      .style('stroke', 'black')
      .style('stroke-dasharray', '3, 3')
      .style('stroke-width', 1);

    svg
      .select('#avgTextUp')
      .attr('x', width - margin.right - textWidth)
      .attr('y', yscale(avgIndex + 1) - 5)
      .attr('style', 'font-family:Inter')
      .attr('font-size', '12')
      .attr('fill', '#000000')
      .text('Citywide Average');

    svg
      .select('#avgTextDown')
      .attr('x', width - margin.right - textWidth)
      .attr('y', yscale(avgIndex + 1) + 15)
      .attr('style', 'font-family:Inter')
      .attr('font-size', '12')
      .attr('fill', '#000000')
      .text(`${getNumber(avg)}${metricSymbol} ${getIssueStatement()}`);

    // Adjust text position
    svg
      .select('#avgTextUp')
      .attr(
        'x',
        width -
          margin.right -
          svg.select('#avgTextUp').node().getBoundingClientRect().width
      );

    svg
      .select('#avgTextDown')
      .attr(
        'x',
        width -
          margin.right -
          svg.select('#avgTextDown').node().getBoundingClientRect().width
      );

    svg
      .select('#histBg')
      .attr('height', height >= 0 ? height : 0)
      .attr('width', width - margin.left - margin.right)
      .attr('y', 0)
      .attr('x', margin.left)
      .attr('fill', d3.rgb(0, 0, 0, 0))
      .on('mousemove', function (event, d) {
        let pt = d3.pointer(event);

        let ycood = pt[1];
        if (ycood < yscale(0.5)) return;
        if (ycood > yscale(data.length + 0.5)) return;

        let rectID = Math.floor(yscale.invert(ycood) - 0.5);
        if (!lookupArray[rectID]) return;

        setCurrentHoveredCommunityID(lookupArray[rectID]);

        svg
          .select('#mouseLine')
          // .transition()
          // .duration(10)
          // .ease('linear')
          .attr('y1', ycood)
          .attr('y2', ycood)
          //   .attr('x1', margin.left)
          .attr('x2', width - margin.right)
          .attr('lookupID', lookupArray[rectID])
          .style('stroke', 'black')
          .style('stroke-width', 1);

        svg
          .select('#mouseTextUp')
          .attr('y', ycood - 5)
          .attr('lookupID', lookupArray[rectID])
          .text(
            `${boundary == 'council' ? 'Council' : ''} ${nameArray[rectID]}`
          );

        svg
          .select('#mouseTextDown')
          .attr('y', ycood + 15)
          .attr('lookupID', lookupArray[rectID])
          .text(
            `${getNumber(data[rectID])}${metricSymbol} ${getIssueStatement(
              data[rectID],
              avg
            )}`
          );
      })
      .on('click', (event, d) => {
        let pt = d3.pointer(event);

        let ycood = pt[1];
        if (ycood < yscale(0.5)) return;
        if (ycood > yscale(data.length + 0.5)) return;

        let rectID = Math.floor(yscale.invert(ycood) - 0.5);
        if (!lookupArray[rectID]) return;

        if (boundary == 'council')
          setCouncilPinned(unique([...councilPinned, lookupArray[rectID]]));
        else
          setCommunityPinned(unique([...communityPinned, lookupArray[rectID]]));
      });

    // Draw all the line and make them invisible
    svg
      .selectAll('.pinnedLine')
      .data(data)
      .enter()
      .append('line')
      .attr('class', 'pinnedLine')
      .merge(svg.selectAll('.pinnedLine').data(data))
      .attr('y1', (d, i) => yscale(i + 1))
      .attr('y2', (d, i) => yscale(i + 1))
      .attr('x1', margin.left)
      .attr('x2', width - margin.right)
      .attr('visibility', 'hidden')
      .attr('lookupID', (d, i) => lookupArray[i])
      .style('stroke', 'black')
      .style('stroke-width', 1);

    svg.selectAll('.pinnedLine').data(data).exit().remove();

    // Draw all the pinnedTextUp and make them invisible
    svg
      .selectAll('.pinnedTextUp')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'pinnedTextUp')
      .merge(svg.selectAll('.pinnedTextUp').data(data))
      .attr('y', (d, i) => yscale(i + 1) - 5)
      .attr('x', width - margin.right)
      .attr('text-anchor', 'end')
      .attr('visibility', 'hidden')
      .attr('lookupID', (d, i) => lookupArray[i])
      .attr('style', 'font-family:Inter')
      .attr('font-size', '12')
      .attr('fill', '#000000')
      .text(
        (d, i) => `${boundary == 'council' ? 'Council' : ''} ${nameArray[i]}`
      );

    svg.selectAll('.pinnedTextUp').data(data).exit().remove();

    // Draw all the pinnedTextDown and make them invisible
    svg
      .selectAll('.pinnedTextDown')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'pinnedTextDown')
      .merge(svg.selectAll('.pinnedTextDown').data(data))
      .attr('y', (d, i) => yscale(i + 1) + 15)
      .attr('x', width - margin.right)
      .attr('text-anchor', 'end')
      .attr('visibility', 'hidden')
      .attr('lookupID', (d, i) => lookupArray[i])
      .attr('style', 'font-family:Inter')
      .attr('font-size', '12')
      .attr('fill', '#000000')
      .text(
        (d, i) =>
          `${getNumber(data[i])}${metricSymbol} ${getIssueStatement(
            data[i],
            avg
          )}`
      );

    svg.selectAll('.pinnedTextDown').data(data).exit().remove();

    // Add goto function on pinnedTextUp
    svg.selectAll('.pinnedTextUp').each(function (d, i) {
      d3.select(this).on('click', (e, d) => {
        setSelectedChapter(3);
        setCommunitySearch(d3.select(this).attr('lookupID'));

        const boundInfo =
          boundary == 'council'
            ? {
                bound: _COUNCILDISTRICTS.features,
                query: 'CounDist',
                id: Number(d3.select(this).attr('lookupID')),
              }
            : {
                bound: _COMMUNITYBOARDS.features,
                query: 'CDTA2020',
                id: d3.select(this).attr('lookupID'),
              };

        const community = boundInfo.bound.find(
          (d) => d.properties[boundInfo.query] === boundInfo.id
        ).properties;

        const coords = [community.X_Cent, community.Y_Cent];

        setUserPoints([coords, userPoints.length == 2 ? userPoints[1] : []]);
        setSelectedCoord(coords);
        setSearchSource('search');
      });
    });

    // Draw all cancel button
    // svg
    //   .selectAll('.cancelButton')
    //   .data(data)
    //   .enter()
    //   .append('rect')
    //   .attr('class', 'cancelButton')
    //   .merge(svg.selectAll('.cancelButton').data(data))
    //   .attr('y', (d, i) => yscale(i + 0.5))
    //   .attr('x', width - margin.right)
    //   .attr('width', margin.right)
    //   .attr('height', yUnit >= 0 ? yUnit : 0)
    //   .attr('visibility', 'hidden')
    //   .attr('lookupID', (d, i) => lookupArray[i])
    //   .attr('fill', '#FFFFFF');

    // svg.selectAll('.cancelButton').each(function (d, i) {
    //   d3.select(this).on('click', (e, d) => {
    //     if (boundary == 'council')
    //       setCouncilPinned(
    //         councilPinned.filter(
    // (d, _) => d !== d3.select(this).attr('lookupID')
    //         )
    //       );
    //     else
    //       setCommunityPinned(
    //         communityPinned.filter(
    // (d, _) => d !== d3.select(this).attr('lookupID')
    //         )
    //       );
    //   });
    // });

    // svg.selectAll('.cancelButton').data(data).exit().remove();

    // Draw all cancel button text
    svg
      .selectAll('.cancelButtonText')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'cancelButtonText')
      .merge(svg.selectAll('.cancelButtonText').data(data))
      .attr('y', (d, i) => yscale(i + 1) + 5)
      //   .attr('x', margin.left - 5)
      .attr('x', width - 25)
      .attr('text-anchor', 'end')
      .attr('visibility', 'hidden')
      .style('font-weight', 'bold')
      .attr('fill', '#000000')
      .attr('font-size', '20')
      .text('✕')
      .attr('lookupID', (d, i) => lookupArray[i]);

    svg.selectAll('.cancelButtonText').each(function (d, i) {
      d3.select(this).on('click', (e, d) => {
        if (boundary == 'council')
          setCouncilPinned(
            councilPinned.filter(
              (d, _) => d !== d3.select(this).attr('lookupID')
            )
          );
        else
          setCommunityPinned(
            communityPinned.filter(
              (d, _) => d !== d3.select(this).attr('lookupID')
            )
          );
      });
    });

    svg.selectAll('.cancelButtonText').data(data).exit().remove();

    // draw goTo button
    // svg
    //   .selectAll('.goToButton')
    //   .data(data)
    //   .enter()
    //   .append('text')
    //   .attr('class', 'goToButton')
    //   .merge(svg.selectAll('.goToButton').data(data))
    //   .attr('y', (d, i) => yscale(i + 1) + 10)
    //   .attr('x', width - 25)
    //   .attr('text-anchor', 'end')
    //   .attr('visibility', 'hidden')
    //   .style('font-weight', 'bold')
    //   .attr('fill', '#000000')
    //   .attr('font-size', '32')
    //   .attr('stroke-width', '0.5px')
    //   .text('🞂')
    //   .attr('lookupID', (d, i) => lookupArray[i]);

    // svg.selectAll('.goToButton').each(function (d, i) {
    //   d3.select(this).on('click', (e, d) => {
    //     setSelectedChapter(3);
    //     setCommunitySearch(d3.select(this).attr('lookupID'));
    //   });
    //   d3.select(this).on('mouseover', (e, d) => {
    //     d3.select(this)
    //       .attr('fill', 'rgb(255,255,255,0)')
    //       .attr('stroke', '#000000');
    //   });
    //   d3.select(this).on('mouseout', (e, d) => {
    //     d3.select(this).attr('fill', '#000000');
    //   });
    // });

    // svg.selectAll('.goToButton').data(data).exit().remove();

    // move the interaction layer to front
    svg.select('#histBg').raise();
    svg.select('#resetBg').raise();
    svg.select('#resetButton').raise();
    svg.selectAll('.pinnedTextUp').raise();
    svg.selectAll('.pinnedLine').lower();
    svg.select('#mouseLine').lower();
  }, [
    colorRamps,
    boundary,
    selectedSpecificIssue,
    containerWidth,
    containerHeight,
    councilPinned,
    communityPinned,
    useBoroughColor,
  ]);

  useEffect(() => {
    let svg = d3.select(ref.current);

    for (let element of ['#mouseLine', '#mouseTextUp', '#mouseTextDown']) {
      svg.selectAll(element).each(function (d, i) {
        if (boundary == 'council') {
          if (
            councilPinned.includes(d3.select(this).attr('lookupID')) ||
            !d3.select(this).attr('lookupID')
          )
            d3.select(this).attr('visibility', 'hidden');
          else d3.select(this).attr('visibility', 'visible');
        } else {
          if (
            communityPinned.includes(d3.select(this).attr('lookupID')) ||
            !d3.select(this).attr('lookupID')
          )
            d3.select(this).attr('visibility', 'hidden');
          else d3.select(this).attr('visibility', 'visible');
        }
      });
    }

    // mouse text white bg
    svg
      .select('#mouseTextUp')
      .attr(
        'width',
        svg.select('#mouseTextUp').node().getBoundingClientRect().width
      )
      .attr(
        'height',
        svg.select('#mouseTextUp').node().getBoundingClientRect().height
      );

    svg
      .select('#mouseTextDown')
      .attr(
        'width',
        svg.select('#mouseTextDown').node().getBoundingClientRect().width
      )
      .attr(
        'height',
        svg.select('#mouseTextDown').node().getBoundingClientRect().height
      );

    for (let element of [
      '.pinnedLine',
      '.pinnedTextUp',
      '.pinnedTextDown',
      //   '.goToButton',
    ]) {
      svg.selectAll(element).each(function (d, i) {
        if (boundary == 'council') {
          if (
            councilPinned.includes(d3.select(this).attr('lookupID')) &&
            d3.select(this).attr('lookupID')
          )
            d3.select(this).attr('visibility', 'visible');
          else d3.select(this).attr('visibility', 'hidden');
        } else {
          if (
            communityPinned.includes(d3.select(this).attr('lookupID')) &&
            d3.select(this).attr('lookupID')
          )
            d3.select(this).attr('visibility', 'visible');
          else d3.select(this).attr('visibility', 'hidden');
        }
      });
    }

    for (let element of ['.cancelButton', '.cancelButtonText']) {
      svg.selectAll(element).each(function (d, i) {
        if (boundary == 'council') {
          if (councilPinned.includes(d3.select(this).attr('lookupID')))
            d3.select(this).attr('visibility', 'visible');
          else d3.select(this).attr('visibility', 'hidden');
        } else {
          if (communityPinned.includes(d3.select(this).attr('lookupID')))
            d3.select(this).attr('visibility', 'visible');
          else d3.select(this).attr('visibility', 'hidden');
        }
      });
    }
    for (let element of ['#resetButton', '#resetBg']) {
      svg.selectAll(element).each(function (d, i) {
        if (boundary == 'council') {
          if (councilPinned.length > 0)
            d3.select(this).attr('visibility', 'visible');
          else d3.select(this).attr('visibility', 'hidden');
        } else {
          if (communityPinned.length > 0)
            d3.select(this).attr('visibility', 'visible');
          else d3.select(this).attr('visibility', 'hidden');
        }
      });
    }

    // when avgline is close to mouseline or is overlapped with another pinned line, hide the avgline
    let hideAvgLine = false;
    if (Math.abs(avgIndex - lookupArray.indexOf(currentHoveredCommunityID)) < 3)
      hideAvgLine = true;
    if (boundary == 'council' && councilPinned.includes(lookupArray[avgRectID]))
      hideAvgLine = true;
    if (
      boundary != 'council' &&
      communityPinned.includes(lookupArray[avgRectID])
    )
      hideAvgLine = true;
    if (
      boundary == 'council' &&
      councilPinned.includes(lookupArray[avgRectID - 1])
    )
      hideAvgLine = true;
    if (
      boundary != 'council' &&
      communityPinned.includes(lookupArray[avgRectID - 1])
    )
      hideAvgLine = true;
    if (
      boundary == 'council' &&
      councilPinned.includes(lookupArray[avgRectID + 1])
    )
      hideAvgLine = true;
    if (
      boundary != 'council' &&
      communityPinned.includes(lookupArray[avgRectID + 1])
    )
      hideAvgLine = true;
    if (hideAvgLine) {
      svg.select('#avgLine').attr('visibility', 'hidden');
      svg.select('#avgTextUp').attr('visibility', 'hidden');
      svg.select('#avgTextDown').attr('visibility', 'hidden');
    } else {
      svg.select('#avgLine').attr('visibility', 'visible');
      svg.select('#avgTextUp').attr('visibility', 'visible');
      svg.select('#avgTextDown').attr('visibility', 'visible');
    }

    // when maxline is close to mouseline or is overlapped with another pinned line, hide the maxline
    let hideMaxLine = false;
    if (lookupArray.indexOf(currentHoveredCommunityID) == data.length - 1)
      hideMaxLine = true;
    if (
      boundary == 'council' &&
      councilPinned.includes(lookupArray[data.length - 1])
    )
      hideMaxLine = true;
    if (
      boundary != 'council' &&
      communityPinned.includes(lookupArray[data.length - 1])
    )
      hideMaxLine = true;
    if (hideMaxLine) {
      svg.select('#maxLine').attr('visibility', 'hidden');
      svg.select('#maxText').attr('visibility', 'hidden');
    } else {
      svg.select('#maxLine').attr('visibility', 'visible');
      svg.select('#maxText').attr('visibility', 'visible');
    }

    // when minline is close to mouseline or is overlapped with another pinned line, hide the minline
    let hideMinLine = false;
    if (lookupArray.indexOf(currentHoveredCommunityID) == 0) hideMinLine = true;
    if (boundary == 'council' && councilPinned.includes(lookupArray[0]))
      hideMinLine = true;
    if (boundary != 'council' && communityPinned.includes(lookupArray[0]))
      hideMinLine = true;
    if (hideMinLine) {
      svg.select('#minLine').attr('visibility', 'hidden');
      svg.select('#minText').attr('visibility', 'hidden');
    } else {
      svg.select('#minLine').attr('visibility', 'visible');
      svg.select('#minText').attr('visibility', 'visible');
    }

    svg
      .select('g')
      .selectAll('rect')
      .each(function (d, i) {
        if (
          d3.select(this).attr('lookupID') == currentHoveredCommunityID ||
          (boundary == 'council' &&
            councilPinned.includes(d3.select(this).attr('lookupID'))) ||
          (boundary == 'community' &&
            communityPinned.includes(d3.select(this).attr('lookupID')))
        ) {
          // d3.select(this).style("fill", d3.rgb(d3.select(this).attr("initColor")).brighter(0.5))

          //   if (
          //     (boundary == 'council' &&
          //       councilPinned.includes(currentHoveredCommunityID)) ||
          //     (boundary == 'community' &&
          //       communityPinned.includes(currentHoveredCommunityID)) ||
          //     !d3.select(this).attr('lookupID')
          //   )
          //     return;

          // dark filter
          //   d3.select(this).style(
          //     'fill',
          //     d3.rgb(d3.select(this).attr('initColor')).darker(0.5)
          //   );

          // border + move back lines
          d3.select(this)
            .attr('stroke', '#000000')
            .style('stroke-width', '2px');
          d3.select(this).raise();
          svg.select('#mouseLine').attr('x1', d3.select(this).attr('x'));
          svg.select('#avgLine').attr('x1', d3.select(this).attr('x'));
        } else {
          d3.select(this).style('stroke-width', '0px');
          d3.select(this).style(
            'fill',
            d3.rgb(d3.select(this).attr('initColor'))
          );
        }
      });
  }, [
    colorRamps,
    boundary,
    selectedSpecificIssue,
    containerWidth,
    containerHeight,
    councilPinned,
    communityPinned,
    currentHoveredCommunityID,
    useBoroughColor,
  ]);

  return (
    <div
      className={'d-flex histogram-responsive-box'}
      style={{
        width: '100%',
        flexGrow: '1',
      }}
    >
      <div
        className={'d-flex flex-row position-relative'}
        style={{
          //   height: '25px',
          width: '100%',
          top: '10px',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto auto',
            alignContent: 'start',
            width: '100%',
          }}
        >
          <div className={`d-flex switch-container flex-row `}>
            <label className="switch">
              <input
                type="checkbox"
                checked={toggleDisplayMode}
                onChange={(e) => {
                  setToggleDisplayMode(!toggleDisplayMode);
                }}
              />
              <span className="slider round"></span>
            </label>

            <p className={'small-font d-inline-block big-button border-0'}>
              {toggleDisplayMode ? `Show Histogram` : `Show List`}
            </p>
          </div>

          {!toggleDisplayMode && (
            <div>
              <div
                className={`big-button ${
                  useBoroughColor ? 'big-button-active' : 'big-button-inactive'
                } small-font`}
                style={{
                  display: 'inline-block',
                  justifyContent: '',
                  width: 'auto',
                }}
                onClick={() => {
                  setUseBoroughColor(!useBoroughColor);
                }}
              >
                {useBoroughColor ? `Hide Borough ` : `Show Borough `}
                {useBoroughColor ? (
                  <FontAwesomeIcon
                    className={'mb-0 small-font'}
                    icon={faMinus}
                  />
                ) : (
                  <FontAwesomeIcon
                    className={'mb-0 small-font'}
                    icon={faPlus}
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {!toggleDisplayMode ? (
          <div
            className={`${
              useBoroughColor ? '' : 'invisible'
            } d-flex flex-row osition-relativ`}
            style={{
              justifyContent: 'start',
              flexGrow: '1',
              marginLeft: '3px',
              marginEight: '30px',
              flexWrap: 'wrap',
            }}
          >
            <div className={'d-flex flex-row'}>
              <div
                className={'mb-0 small-font'}
                style={{
                  color: _BOROUGH_COLORS['Bronx'].htmlFormat,
                  marginRight: '2px',
                }}
              >
                ■
              </div>
              <p
                className={'mb-0 small-font'}
                style={{
                  marginRight: '8px',
                }}
              >
                Bronx
              </p>
            </div>
            <div className={'d-flex flex-row'}>
              <div
                className={'mb-0 small-font'}
                style={{
                  color: _BOROUGH_COLORS['Brooklyn'].htmlFormat,
                  marginRight: '2px',
                }}
              >
                ■
              </div>
              <p
                className={'mb-0 small-font'}
                style={{
                  marginRight: '8px',
                }}
              >
                Brooklyn
              </p>
            </div>
            <div className={'d-flex flex-row'}>
              <div
                className={'mb-0 small-font'}
                style={{
                  color: _BOROUGH_COLORS['Manhattan'].htmlFormat,
                  marginRight: '2px',
                }}
              >
                ■
              </div>
              <p
                className={'mb-0 small-font'}
                style={{
                  marginRight: '8px',
                }}
              >
                Manhattan
              </p>
            </div>
            <div className={'d-flex flex-row'}>
              <div
                className={'mb-0 small-font'}
                style={{
                  color: _BOROUGH_COLORS['Queens'].htmlFormat,
                  marginRight: '2px',
                }}
              >
                ■
              </div>
              <p
                className={'mb-0 small-font'}
                style={{
                  marginRight: '8px',
                }}
              >
                Queens
              </p>
            </div>
            <div className={'d-flex flex-row'}>
              <div
                className={'mb-0 small-font'}
                style={{
                  color: _BOROUGH_COLORS['Staten'].htmlFormat,
                  marginRight: '2px',
                }}
              >
                ■
              </div>
              <p className={'mb-0 small-font'}>Staten Island</p>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>

      <div
        ref={containerRef}
        style={
          !toggleDisplayMode
            ? {
                width: '100%',
                flexGrow: 1,
                padding: '0.5rem 0 0 0',
              }
            : { width: '100%', flexGrow: 1, padding: '1rem 0' }
        }
        className={'position-relative'}
      >
        <svg display={toggleDisplayMode ? 'none' : ''} ref={ref}>
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
          <text id="resetButton">Clear All</text>
          <rect id="resetBg" />
        </svg>

        <RankingTable
          issues={issues}
          boundary={boundary}
          selectedSpecificIssue={selectedSpecificIssue}
          setCommunitySearch={setCommunitySearch}
          setSelectedChapter={setSelectedChapter}
          communitySearch={communitySearch}
          compareSearch={compareSearch}
          toggleDisplayMode={toggleDisplayMode}
          defaultOpen={true}
          citywideTab={true}
        />
      </div>
    </div>
  );
};

export default Histogram;
