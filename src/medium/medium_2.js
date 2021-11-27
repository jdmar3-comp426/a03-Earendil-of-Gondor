import mpg_data from "./data/mpg_data.js";
import { getStatistics, getSum } from "./medium_1.js";


var cityMpgArray = [];
var highwayMpgArray = [];
var yearArray = [];
var hybridNumber = 0;
var makerHybridObj = {};
var makerHybridArr = [];
var avgMpgByYearAndHybrid = {};
mpg_data.forEach(car => {
    cityMpgArray.push(car.city_mpg);
    highwayMpgArray.push(car.highway_mpg);
    yearArray.push(car.year);

    var avgMpgByYearAndHybridKey = 'notHybrid';
    if (car.hybrid) {
        hybridNumber++;

        if (typeof makerHybridObj[car.make] === 'undefined') {
            makerHybridObj[car.make] = [];
        }
        makerHybridObj[car.make].push(car.id);

        avgMpgByYearAndHybridKey = 'hybrid';
    }

    if (typeof avgMpgByYearAndHybrid[car.year] === 'undefined') {
        avgMpgByYearAndHybrid[car.year] = {};
    }
    if (typeof avgMpgByYearAndHybrid[car.year][avgMpgByYearAndHybridKey] === 'undefined') {
        avgMpgByYearAndHybrid[car.year][avgMpgByYearAndHybridKey] = { city: [], highway: [] };
    }
    avgMpgByYearAndHybrid[car.year][avgMpgByYearAndHybridKey].city.push(car.city_mpg);
    avgMpgByYearAndHybrid[car.year][avgMpgByYearAndHybridKey].highway.push(car.highway_mpg);
});

Object.keys(makerHybridObj).forEach((key, index) => {
    makerHybridObj[key].sort();
    makerHybridArr.push({
        make: key,
        hybrids: makerHybridObj[key],
    })
});

Object.keys(avgMpgByYearAndHybrid).forEach((yearKey, index) => {
    Object.keys(avgMpgByYearAndHybrid[yearKey]).forEach((hybridKey, index) => {
        const city = getSum(avgMpgByYearAndHybrid[yearKey][hybridKey].city) / avgMpgByYearAndHybrid[yearKey][hybridKey].city.length;
        const highway = getSum(avgMpgByYearAndHybrid[yearKey][hybridKey].highway) / avgMpgByYearAndHybrid[yearKey][hybridKey].highway.length;
        avgMpgByYearAndHybrid[yearKey][hybridKey].city = city;
        avgMpgByYearAndHybrid[yearKey][hybridKey].highway = highway;
    })
})


const mpg_data_length = mpg_data.length;
/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: { city: getSum(cityMpgArray) / mpg_data_length, highway: getSum(highwayMpgArray) / mpg_data_length },
    allYearStats: getStatistics(yearArray),
    ratioHybrids: hybridNumber / mpg_data_length,
};


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: makerHybridArr,
    avgMpgByYearAndHybrid: avgMpgByYearAndHybrid
};
