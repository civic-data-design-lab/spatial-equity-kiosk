import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import _CHAPTER_COLORS from '../data/chapter_colors.json';
import _RANKINGS from '../data/rankings.json';
import _COUNCILDISTRICTS from '../texts/councildistricts.json';
import { useResizeObserver } from '../utils/useResizeObserver';
import { getIssueType } from '../utils/getIssueType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMinus,
  faPlus,
  faCaretDown,
  faCaretUp,
} from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';
import rankings from '../data/rankings.json';
import RankingTable from './RankingTable';
import { select } from 'd3';

const getRgb = (color) => {
  let [r, g, b] = Array.from(color);
  return {
    r,
    g,
    b,
  };
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

const getDataToVis = (rawIssueData) => {
  let valueArray = [];
  let nameArray = [];
  let ascending;
  let lookupArray = [];

  rawIssueData.sort((a, b) => a.rank - b.rank);

  for (let [index, value] of Object.entries(rawIssueData)) {
    valueArray.push(Number(Number(value.data).toFixed(3)));
    nameArray.push(value.community);
    lookupArray.push(value.community_ID);
  }

  // get the corresponding index of average value
  let sum = valueArray.reduce((a, b) => a + b, 0);
  let avg =
    Number(sum / valueArray.length) >= 10
      ? Number((sum / valueArray.length).toFixed(1))
      : Number((sum / valueArray.length).toFixed(3));
  let avgIndex;

  for (let i = 0; i < valueArray.length - 1; i++) {
    if (valueArray[i] < avg && valueArray[i + 1] > avg) {
      avgIndex =
        i + (avg - valueArray[i]) / (valueArray[i + 1] - valueArray[i]);
      ascending = true;
      break;
    }

    if (valueArray[i] > avg && valueArray[i + 1] < avg) {
      avgIndex =
        i + 1 - (avg - valueArray[i + 1]) / (valueArray[i] - valueArray[i + 1]);
      ascending = false;
      break;
    }
  }

  return [valueArray, nameArray, avg, avgIndex, ascending, lookupArray];
};

const IssueHistogram = ({
  colorRampsyType = 'health',
  issues,
  boundary,
  selectedSpecificIssue,
  selectedCommunity,
  setCommunitySearch,
  setSelectedChapter,
  communitySearch,
  compareSearch,
  toggleDisplayMode,
  specificIssue,
}) => {
  const ref = useRef();
  const containerRef = useRef();

  const getIssueStatement = () => {
    if (selectedSpecificIssue) {
      return `${
        issues.specific_issues_data[selectedSpecificIssue].issue_units_shorthand
          ? issues.specific_issues_data[selectedSpecificIssue]
              .issue_units_shorthand
          : issues.specific_issues_data[selectedSpecificIssue]
              .specific_issue_units
      }`;
    }
    return null;
  };

  const getRankingNarrative = (obj, average) => {
    if (selectedCommunity) {
      const suffix = {
        0: 'th',
        1: 'st',
        2: 'nd',
        3: 'rd',
        4: 'th',
        5: 'th',
        6: 'th',
        7: 'th',
        8: 'th',
        9: 'th',
      };

      // const communityData = boundary == 'council' ? selectedCommunity

      const subject = obj.json_id;
      const fullIssueName = obj.specific_issue_name;
      const problemTerm = obj.issue_hi_low[Number(!obj.good_or_bad)];

      const lastItem = boundary == 'council' ? '51' : '59';

      const sentenceStructure =
        boundary == 'council'
          ? {
              bounds: 'City Council districts',
              selectedObject: _RANKINGS.council[subject].find(
                (f) => f.community_ID == selectedCommunity.json_lookup
              ),
              boundaryGrammatical: `City Council ${selectedCommunity.name}`,
            }
          : {
              bounds: 'Community Boards',
              selectedObject: _RANKINGS.community[subject].find(
                (f) => f.community_ID == selectedCommunity.json_lookup
              ),
              boundaryGrammatical: `${selectedCommunity.name
                .split(' ')
                .slice(0, selectedCommunity.name.split(' ').length - 1)
                .join(' ')} Community Board ${selectedCommunity.name
                .split(' ')
                .slice(selectedCommunity.name.split(' ').length - 1)}`,
            };

      const rank = sentenceStructure.selectedObject.rank;
      let value = Number(sentenceStructure.selectedObject.data);

      value =
        value == 0
          ? 0
          : value > 10
          ? value.toFixed(0)
          : value > 1
          ? value.toFixed(1)
          : value.toFixed(2);
      const joiningWord =
        issues.specific_issues_data[selectedSpecificIssue].json_id ==
        'F27_BusSpe'
          ? 'at'
          : 'with';

      let sentenceEnd =
        issues.specific_issues_data[selectedSpecificIssue].json_id ==
        'F14_TmpDev'
          ? [
              value > average ? 'above' : value == average ? '' : 'below',
              obj.specific_issue_append,
            ]
              .join(' ')
              .toLowerCase()
          : obj.specific_issue_append;

      return (
        <p>
          {`${sentenceStructure.boundaryGrammatical} ranks `}
          <strong>{`${rank}${suffix[rank % 10]} out of ${lastItem}`}</strong>
          {` ${
            sentenceStructure.bounds
          } for ${problemTerm} ${fullIssueName.toLowerCase()} ${joiningWord} ${value}${
            obj.issue_units_symbol
          } ${sentenceEnd}.`}
        </p>
      );
    }
    return '';
  };

  const textWidth = 50;
  const margin = {
    top: 25,
    left: 20,
    bottom: 25,
    right: 15,
  };
  const [containerWidth, containerHeight] = useResizeObserver(containerRef);

  let colorRamps = _CHAPTER_COLORS[getIssueType(issues, selectedSpecificIssue)];
  let rawIssueData =
    _RANKINGS[boundary][
      issues.specific_issues_data[selectedSpecificIssue].json_id
    ];
  let [data, nameArray, avg, avgIndex, ascending, lookupArray] =
    getDataToVis(rawIssueData);
  let selectedIndex = selectedCommunity
    ? lookupArray.indexOf(selectedCommunity.json_lookup)
    : 0;

  let metricSymbol =
    issues.specific_issues_data[selectedSpecificIssue].issue_units_symbol !== ''
      ? issues.specific_issues_data[selectedSpecificIssue].issue_units_symbol
      : '';

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

    let [hiStatement, lowStatement] =
      issues.specific_issues_data[selectedSpecificIssue].issue_hi_low;
    hiStatement = hiStatement.charAt(0).toUpperCase() + hiStatement.slice(1);
    lowStatement = lowStatement.charAt(0).toUpperCase() + lowStatement.slice(1);
    // let [hiStatement, lowStatement] = ['Max', 'Min'];

    let xscale = d3
      .scaleLinear()
      .domain([0, data.length])
      .range([margin.left, width - margin.right - margin.left]);

    let yrange =
      height - longestBarPadding - margin.bottom - margin.top > 0
        ? height - longestBarPadding - margin.bottom - margin.top
        : 0;
    let yscale = d3
      .scaleLinear()
      .domain([
        d3.min(data) >= 0 ? d3.min(data) - minValueMargin : d3.min(data),
        d3.max(data),
      ])
      .range([0, yrange]);

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
      .attr('width', barWdith - barPadding >= 0 ? barWdith - barPadding : 0)
      .attr('height', (d) =>
        d3.min(data) >= 0
          ? yscale(d)
          : d > 0
          ? yscale(d) - yscale(0)
          : yscale(0) - yscale(d)
      )
      .attr('x', (d, i) => xscale(i + 0.5))
      .attr('y', (d) =>
        d3.min(data) >= 0
          ? height - yscale(d) - margin.bottom
          : d > 0
          ? margin.bottom + yscale(0)
          : margin.bottom + yscale(d)
      )
      .attr('fill', (d, i) =>
        d3.rgb(
          ...colorInterpolate(
            colorRamps[0],
            colorRamps[colorRamps.length - 1],
            !ascending
              ? 1 - i / (rawIssueData.length - 1)
              : i / (rawIssueData.length - 1)
          )
        )
      )
      .attr('value', (d) => d);

    svg.selectAll('rect').each(function (d, i) {
      d3.select(this).attr('y', (d) =>
        d3.min(data) >= 0
          ? height - d3.select(this).attr('height') - margin.bottom
          : d > 0
          ? height - d3.select(this).attr('height') - margin.bottom - yscale(0)
          : height - d3.select(this).attr('height') - margin.bottom - yscale(d)
      );
    });

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
      .attr('class', 'dataLine')
      .attr('y1', margin.top)
      .attr('x1', xscale(0.5))
      .attr('y2', height - margin.bottom)
      .attr('x2', xscale(0.5))
      .style('stroke', 'black')
      .style('stroke-width', 2)
      .attr('index', 0)
      .attr('visibility', 'hidden');

    svg
      .select('#maxLine')
      .attr('class', 'dataLine')
      .attr('y1', margin.top)
      .attr('x1', xscale(data.length + 0.5))
      .attr('y2', height - margin.bottom)
      .attr('x2', xscale(data.length + 0.5))
      .style('stroke', 'black')
      .style('stroke-width', 2)
      .attr('index', data.length - 1)
      .attr('visibility', 'hidden');

    // draw avg Lines
    svg
      .select('#avgLine')
      .attr('class', 'dataLine')
      .attr('y1', margin.top)
      .attr('x1', xscale(avgIndex + 1))
      .attr('y2', height - margin.bottom)
      .attr('x2', xscale(avgIndex + 1))
      .style('stroke', 'black')
      .style('stroke-width', 1)
      .attr('index', avgIndex);

    // draw selected Lines
    svg
      .select('#selectedLine')
      .attr('class', 'dataLine')
      .attr('y1', margin.top)
      .attr('x1', xscale(selectedIndex + 1))
      .attr('y2', height - margin.bottom)
      .attr('x2', xscale(selectedIndex + 1))
      .style('stroke', 'black')
      .style('stroke-width', 1)
      .attr('index', selectedIndex);

    // Align the line length with the bars
    svg.selectAll('.dataLine').each(function (d, i) {
      let index = Math.round(d3.select(this).attr('index'));
      let length =
        d3.min(data) >= 0
          ? yscale(data[index])
          : data[index] > 0
          ? yscale(data[index]) - yscale(0)
          : yscale(0) - yscale(data[index]);

      //   d3.select(this).attr(
      //     'y1',
      //     d3.min(data) >= 0
      //       ? height - length - margin.bottom
      //       : data[index] > 0
      //       ? height - length - margin.bottom - yscale(0)
      //       : height - length - margin.bottom - yscale(data[index])
      //   );
      //   d3.select(this).attr('y2', Number(d3.select(this).attr('y1')) + length);

      // svg.append('text')
      //     .attr('class', 'smaller-text')
      //     .attr('x', d3.select(this).attr('x1'))
      //     .attr('y', d3.select(this).attr('y1') - 5)
      //     .attr("style", "font-family:Inter")
      //     .attr("font-size", "14")
      //     .attr("fill", "#000000")
      //     .attr("text-anchor", "middle")
      //     .text(`${data[index]}`)
    });

    svg
      .select('#minTextDown')
      .attr('x', xscale(0.5) - 5)
      //   .attr('y', height - margin.bottom + 5)
      // .attr('y', svg.select('#maxLine').attr('y1') - 5)
      .attr('y', height - margin.bottom + 15)
      .attr('class', 'smaller-text')
      .attr('style', 'font-family:Inter')
      .attr('font-size', '14')
      .attr('fill', '#000000')
      //  .attr('text-anchor', 'end')
      .attr('text-anchor', 'start')
      //   .text((!ascending ? `${hiStatement} ${getIssueStatement()} ${d3.max(data)}` : `${lowStatement} ${getIssueStatement()} ${d3.min(data)} `));
      .text(
        !ascending
          ? `${hiStatement} ${getIssueStatement()}`
          : `${lowStatement} ${getIssueStatement()}`
      );
    //   .text(!ascending ? `${hiStatement} ` : `${lowStatement} `);

    svg
      .select('#maxTextDown')
      .attr('x', xscale(data.length + 0.5) + 5)
      //   .attr('y', height - margin.bottom + 5)
      // .attr('y', svg.select('#maxLine').attr('y1') - 5)
      .attr('y', height - margin.bottom + 15)
      .attr('class', 'smaller-text')
      .attr('style', 'font-family:Inter')
      .attr('font-size', '14')
      .attr('fill', '#000000')
      .attr('text-anchor', 'end')
      //   .text((ascending ? `${hiStatement} ${getIssueStatement()} ${d3.max(data)}` : `${lowStatement} ${getIssueStatement()} ${d3.min(data)} `));
      .text(
        ascending
          ? `${hiStatement} ${getIssueStatement()}`
          : `${lowStatement} ${getIssueStatement()}`
      );
    //   .text(ascending ? `${hiStatement} ` : `${lowStatement} `);

    svg
      .select('#avgTextDown')
      .attr('x', svg.select('#avgLine').attr('x1'))
      // .attr('y', height - margin.bottom + 15)
      .attr('y', svg.select('#avgLine').attr('y1') - 12)
      .attr('class', 'smaller-text')
      .attr('style', 'font-family:Inter')
      .attr('font-size', '14')
      .attr('fill', '#000000')
      .attr('text-anchor', 'end')
      .text('Citywide Average');

    svg
      .select('#selectedTextDown')
      .attr('x', svg.select('#selectedLine').attr('x1'))
      // .attr('y', height - margin.bottom + 15)
      .attr('y', svg.select('#selectedLine').attr('y1') - 12)
      .attr('class', 'smaller-text')
      .attr('style', 'font-family:Inter')
      .attr('font-size', '14')
      .attr('fill', '#000000')
      .attr('text-anchor', 'end')
      .text(`${selectedCommunity ? selectedCommunity.name : 0}`);

    let showMinText = !(Number(svg.select('#selectedLine').attr('index')) == 0);

    svg
      .select('#minTextUp')
      .attr('x', xscale(0.5))
      //   .attr('y', svg.select('#minLine').attr('y1') - 5)
      .attr('y', height - margin.bottom + 12)
      .attr('class', 'smaller-text')
      .attr('style', 'font-family:Inter')
      .attr('font-size', '14')
      .attr('fill', '#000000')
      //   .attr('text-anchor', !ascending ? 'start ' : 'end')
      .attr('text-anchor', 'middle')
      .text(`${data[0].toFixed(1)}${metricSymbol}`)
      // .attr('visibility', showMinText ? 'visible' : 'hidden');
      .attr('visibility', 'hidden');

    let showMaxText = !(
      Number(svg.select('#selectedLine').attr('index')) ==
      data.length - 1
    );

    svg
      .select('#maxTextUp')
      .attr('x', xscale(data.length + 0.5))
      //   .attr('y', svg.select('#maxLine').attr('y1') - 5)
      .attr('y', height - margin.bottom + 12)
      .attr('class', 'smaller-text')
      .attr('style', 'font-family:Inter')
      .attr('font-size', '14')
      .attr('fill', '#000000')
      //   .attr('text-anchor', !ascending ? 'start ' : 'end')
      .attr('text-anchor', 'middle')
      .text(`${data[data.length - 1].toFixed(1)}${metricSymbol}`)
      // .attr('visibility', showMaxText ? 'visible' : 'hidden');
      .attr('visibility', 'hidden');

    svg
      .select('#avgTextUp')
      .attr('x', svg.select('#avgLine').attr('x1'))
      // .attr('y', svg.select('#avgLine').attr('y1') - 5)
      // .attr('y', height - margin.bottom + 12)
      .attr('y', svg.select('#selectedLine').attr('y1'))
      .attr('class', 'smaller-text')
      .attr('style', 'font-family:Inter')
      .attr('font-size', '14')
      .attr('fill', '#000000')
      //   .attr('text-anchor', !ascending ? 'start ' : 'end')
      .attr('text-anchor', 'end')
      .text(
        `${
          Number(data[Math.round(svg.select('#avgLine').attr('index'))]) > 10
            ? Number(
                data[Math.round(svg.select('#avgLine').attr('index'))]
              ).toFixed(0)
            : Number(data[Math.round(svg.select('#avgLine').attr('index'))]) > 1
            ? Number(
                data[Math.round(svg.select('#avgLine').attr('index'))]
              ).toFixed(1)
            : Number(data[Math.round(svg.select('#avgLine').attr('index'))])
        }${metricSymbol}`
      );

    // let showSelectedText = !(
    //   Number(svg.select('#selectedLine').attr('index')) ==
    //   data.length - 1
    // );
    svg
      .select('#selectedTextUp')
      .attr('x', svg.select('#selectedLine').attr('x1'))
      .attr('y', svg.select('#selectedLine').attr('y1'))
      // .attr('y', height - margin.bottom + 12)
      .attr('class', 'smaller-text')
      .attr('style', 'font-family:Inter')
      .attr('font-size', '14')
      .attr('fill', '#000000')
      //   .attr('text-anchor', !ascending ? 'start ' : 'end')
      .attr('text-anchor', 'end')
      .text(
        `${
          data[Math.round(svg.select('#selectedLine').attr('index'))] > 10
            ? data[
                Math.round(svg.select('#selectedLine').attr('index'))
              ].toFixed(0)
            : data[Math.round(svg.select('#selectedLine').attr('index'))] > 1
            ? data[
                Math.round(svg.select('#selectedLine').attr('index'))
              ].toFixed(1)
            : data[Math.round(svg.select('#selectedLine').attr('index'))]
        }${metricSymbol}`
      );
    //   .text(
    //     `${
    //       showSelectedText
    //         ? data[Math.round(svg.select('#selectedLine').attr('index'))]
    //         : ``
    //     }`
    //   );

    // avoid overlapping between selected text and avg text

    // case1,2: about selectedTex
    svg.select('#selectedTextUp').attr('text-anchor', 'end');
    svg.select('#selectedTextDown').attr('text-anchor', 'end');

    // case1: selected on the right, avg left
    let textPadding = 2;
    let selectedTextWidth = svg
      .select('#selectedTextDown')
      .node()
      .getBoundingClientRect().width;
    let interval =
      Number(svg.select('#selectedLine').attr('x1')) -
      Number(svg.select('#avgLine').attr('x1'));

    if (interval > 0 && interval - selectedTextWidth < textPadding) {
      svg.select('#selectedTextUp').attr('text-anchor', 'start');
      svg.select('#selectedTextDown').attr('text-anchor', 'start');
    }

    // case2: selected on the left-end with the min text
    let selectedValueWidth = svg
      .select('#selectedTextUp')
      .node()
      .getBoundingClientRect().width;
    let minValueWidth = svg
      .select('#minTextUp')
      .node()
      .getBoundingClientRect().width;
    interval =
      Number(svg.select('#selectedLine').attr('x1')) -
      Number(svg.select('#minLine').attr('x1'));

    if (
      interval > 0 &&
      interval - (selectedValueWidth + minValueWidth * 0.5) < textPadding
    ) {
      svg.select('#selectedTextUp').attr('text-anchor', 'start');
      svg.select('#selectedTextDown').attr('text-anchor', 'start');
    }

    // case3: selected on the left, avg right
    let avgTextWidth = svg
      .select('#avgTextDown')
      .node()
      .getBoundingClientRect().width;
    interval =
      Number(svg.select('#avgLine').attr('x1')) -
      Number(svg.select('#selectedLine').attr('x1'));
    if (svg.select('#selectedTextUp').attr('text-anchor') == 'start')
      avgTextWidth += selectedValueWidth;
    if (interval > 0 && interval - avgTextWidth < textPadding) {
      svg.select('#avgTextUp').attr('text-anchor', 'start');
      svg.select('#avgTextDown').attr('text-anchor', 'start');
    } else {
      svg.select('#avgTextUp').attr('text-anchor', 'end');
      svg.select('#avgTextDown').attr('text-anchor', 'end');
    }
  }, [
    colorRamps,
    boundary,
    selectedSpecificIssue,
    selectedCommunity,
    containerWidth,
    containerHeight,
  ]);

  return (
    <div>
      <div
        style={{ display: toggleDisplayMode ? 'none' : '' }}
        className={'m-0 smaller-text'}
      >
        {getRankingNarrative(issues.specific_issues_data[specificIssue], avg)}{' '}
      </div>

      <div
        ref={containerRef}
        style={{
          height: '100%',
          width: '100%',
        }}
      >
        <svg style={{ display: toggleDisplayMode ? 'none' : '' }} ref={ref}>
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

        <RankingTable
          issues={issues}
          boundary={boundary}
          selectedSpecificIssue={selectedSpecificIssue}
          setCommunitySearch={setCommunitySearch}
          setSelectedChapter={setSelectedChapter}
          communitySearch={communitySearch}
          compareSearch={compareSearch}
          toggleDisplayMode={toggleDisplayMode}
        />
      </div>
    </div>
  );
};

export default IssueHistogram;
