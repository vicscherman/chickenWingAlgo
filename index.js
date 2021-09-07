const fs = require('fs');

const wingsList = fs.readFileSync('wings.txt', 'UTF-8');

//defining our function
function getBestPrice(wingsList) {
  //initial processing. This will turn the list above into something like['4 Chicken Wings', '4.55','5 Chicken Wings','5.70','6 Chicke Wings','6.80'....]
  //a good start, but we need to further split it and get rid of the words chicken wings as we can't perform a math operation on a word!
  let wingsArr = wingsList.split('\n');

  //we're gonna break up the big list into groups of two
  let chunkedArr = [];

  for (let element of wingsArr) {
    let subChunk = chunkedArr[chunkedArr.length - 1];
    if (!subChunk || subChunk.length === 2) {
      chunkedArr.push([element]);
    } else {
      subChunk.push(element);
    }
  }
  //after this it'll be like [[4chicken wings, 4.55], [5 chicken wings, 5.7]......]

  //initialize what our lowest price is(first price to start)
  let lowestPrice = chunkedArr[0][1];
  let lowestWingAmount = null;
  for (let element of chunkedArr) {
    //go through and divide the price by number of wings
    if (element[1] / element[0].slice(0, 2) < lowestPrice) {
      //if you find a lower amount, up date it
      lowestPrice = (element[1] / element[0].slice(0, 2)).toFixed(2);
      lowestWingAmount = element[0].slice(0, 2);
    }
  }

  return `best value is ${lowestWingAmount} wings at $${lowestPrice} per wing`;
}

getBestPrice(wingsList);
