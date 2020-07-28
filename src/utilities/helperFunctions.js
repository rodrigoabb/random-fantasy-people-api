import { STRING_PARAMS, NUMBER_PARAMS, BOOLEAN_PARAMS } from './constants';

export const generateRandom = ([min, max]) => {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(Math.random() * (newMax - newMin + 1)) + newMin;
};

export const capitalizeFirstLetter = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

/**
 * Retrieves Query String as object. Parses provided queries object using provided accepted params, and formats each value from the accepted queries.
 * @function
 * @param {Object} queriesObj - Queries received as object
 * @param {Array} acceptedParams - Array of accepted params
 * @returns {Object} Object with accepted queries provided
 */
export const getQueryStrings = (queriesObj, acceptedParams) => {
  const filterQuery = {};
  const queryStrings = Object.keys(queriesObj);
  for (let i = 0; i < queryStrings.length; i += 1) {
    if (queriesObj[queryStrings[i]]) {
      if (acceptedParams.includes(queryStrings[i])) {
        let formattedValueToAdd;
        if (STRING_PARAMS.includes(queryStrings[i])) { // string
          // formattedValueToAdd = queriesObj[queryStrings[i]].toLowerCase();
          formattedValueToAdd = queriesObj[queryStrings[i]];
        } else if (NUMBER_PARAMS.includes(queryStrings[i])) { // number
          formattedValueToAdd = Number(queriesObj[queryStrings[i]]);
        } else if (BOOLEAN_PARAMS.includes(queryStrings[i])) {
          if (queriesObj[queryStrings[i]].toLowerCase() === 'true') {
            formattedValueToAdd = true;
          } else if (queriesObj[queryStrings[i]].toLowerCase() === 'false') {
            formattedValueToAdd = false;
          } else {
            // Do not add this property since it's not a valid boolean value
            continue;
          }
        }
        filterQuery[queryStrings[i]] = formattedValueToAdd;
      }
    }
  }
  return filterQuery;
};

export const checkIfExistInArray = (value, array) => {
  const idx = array.findIndex((item) => item.toLowerCase() === value.toLowerCase());
  return idx >= 0;
};
