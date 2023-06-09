import { min } from 'd3-array';

/**
 * TODO:
 *
 * @param {number} value
 * @param {number} low1
 * @param {number} high1
 * @param {number} low2
 * @param {number} high2
 * @returns
 */
export function mapRange(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

/**
 * Stringifies the transportation modes.
 *
 * @param {string[]} transportationModesArray
 * @returns {string}
 */
export function getTransportationModes(transportationModesArray) {
  if (transportationModesArray.length > 2) {
    const last = transportationModesArray[2];
    return `${[...transportationModesArray.slice(0, 2)].join(
      ', '
    )}, or ${last}`;
  } else if (transportationModesArray.length > 0) {
    return `${transportationModesArray.join(' or ') || ''}`;
  } else {
    return '...';
  }
}

/**
 * Gets the NYC borough name given its ID.
 *
 * @param {string} boroughId
 * @returns {string}
 */
export function getBoroughName(boroughId) {
  switch (boroughId) {
    case 'MN':
      return 'Manhattan';
    case 'BX':
      return 'Bronx';
    case 'BK':
      return 'Brooklyn';
    case 'QN':
      return 'Queens';
    case 'SI':
      return 'Staten Island';
    default:
      return '';
  }
}

/**
 * Returns a title string of the tooltip's bounds given the boundary type.
 *
 * @param {string} boundary
 * @returns {string}
 */
export function getTooltipBounds(boundary) {
  if (boundary === 'community') {
    return 'Community Board';
  }
  return 'City Council District';
}

export function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, ms);
  };
}

/**
 * Returns a title string of the tooltip's bounds given the boundary type.
 *
 * @param {number} value
 * @returns {number}
 */

export function getNumber(value) {
  if (typeof value === 'number') {
    const num = Number(value);
    const string = value.toString();
    const wholeNumber = String(num.toFixed(2).split('.'))[1];

    // console.log(num);

    return Math.abs(num) == 0
      ? Math.abs(num)
      : wholeNumber == '00'
      ? Number(num.toFixed(0))
      : Math.abs(num) > 10
      ? Number(num.toFixed(1))
      : Math.abs(num) > 1
      ? Number(num.toFixed(2))
      : Number(num.toFixed(2));
  }
  if (typeof value === 'object') {
    const minVal = Math.abs(min(value));
    const stringMinVal = minVal.toString();
    return minVal > 10 ||
      (stringMinVal[stringMinVal.length - 1] == 0 && stringMinVal[0] != 0)
      ? value.map((d) => d.toFixed(0))
      : min(value) >= 1
      ? value.map((d) => d.toFixed(1))
      : value.map((d) => d.toFixed(2));
  }
}

/**
 * Returns the ranking with the orginal suffix.
 *
 * @param {number} value
 * @returns {number}
 */

export function ordinalSuffixOf(i) {
  const j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + 'st';
  }
  if (j == 2 && k != 12) {
    return i + 'nd';
  }
  if (j == 3 && k != 13) {
    return i + 'rd';
  }
  return i + 'th';
}

/**
 * Splits the given string at the hyphens and rejoins it with spaces.
 *
 * Example:
 *    `splitHyphens("hello-world") -> "hello - world"`
 *
 * @param {string} str - The string to split.
 */
export function splitHyphens(str) {
  return str.split('-').join(' - ');
}
