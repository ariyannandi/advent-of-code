import fs from "fs";

const input = "input.txt";

//regular expression to get numbers and symbols

//for numbers
const regExNum = /\d+/g;
// for symbols
const regExSym = /[^\d\.]/;

const sumOfAdjacentNumbers = (lines) => {
  // to store the sum of the numbers adjacent to symbols
  let sumOfnumbers = 0;

  // to store pair of part numbers adjacent to "*" symbol
  const gears = {};

  // iterate through all lines to get the numbers and line indexes
  lines.forEach((line, lineIndex) => {
    // grab all the numbers
    const numbers = [...line.matchAll(regExNum)];

    numbers.forEach((number) => {
      const num = parseInt(number[0]);
      const matchStart = number.index;
      const matchEnd = matchStart + number[0].length - 1;

      let isPart = false;

      // check the left of the number
      if (matchStart - 1 >= 0) {
        const char = line[matchStart - 1];
        const isSymbol = !!regExSym.exec(char);

        if (isSymbol) {
          isPart = true;

          if (char === "*") {
            // get the gear coordinates and add the adjacent number to an array in the gears object
            const x = matchStart - 1;
            const y = lineIndex;
            const coordinates = `x:${x},y: ${y}`;
            const currentValue = gears[coordinates] || [];
            gears[coordinates] = [...currentValue, num];
          }
        }
      }

      // check the right of the number
      if (matchEnd + 1 < line.length) {
        const char = line[matchEnd + 1];
        const isSymbol = !!regExSym.exec(char);

        if (isSymbol) {
          isPart = true;

          if (char === "*") {
            // get the gear coordinates and add the adjacent number to an array in the gears object
            const x = matchEnd + 1;
            const y = lineIndex;
            const coordinates = `x:${x},y: ${y}`;
            const currentValue = gears[coordinates] || [];
            gears[coordinates] = [...currentValue, num];
          }
        }
      }

      // check top row and top diagonals

      if (lineIndex != 0) {
        const topLine = lines[lineIndex - 1];
        const topStart = Math.max(0, matchStart - 1);
        const topEnd = Math.min(topLine.length - 1, matchEnd + 1);

        for (let topIndex = topStart; topIndex <= topEnd; topIndex++) {
          const char = topLine[topIndex];
          const isSymbol = !!regExSym.exec(char);

          if (isSymbol) {
            isPart = true;
            if (char === "*") {
              //  get the gear coordinates and add the adjacent number to an array in the gears object
              const x = topIndex;
              const y = lineIndex - 1;
              const coordinates = `x:${x},y: ${y}`;
              const currentValue = gears[coordinates] || [];
              gears[coordinates] = [...currentValue, num];
            }
          }
        }
      }

      // check bottom row and bottom diagonals
      if (lineIndex !== lines.length - 1) {
        const bottomLine = lines[lineIndex + 1];
        const bottomStart = Math.max(0, matchStart - 1);
        const bottomEnd = Math.min(bottomLine.length - 1, matchEnd + 1);

        for (
          let bottomIndex = bottomStart;
          bottomIndex <= bottomEnd;
          bottomIndex++
        ) {
          const char = bottomLine[bottomIndex];
          const isSymbol = !!regExSym.exec(char);

          if (isSymbol) {
            isPart = true;
            if (char === "*") {
              //  get the gear coordinates and add the adjacent number to an array in the gears object
              const x = bottomIndex;
              const y = lineIndex + 1;
              const coordinates = `x:${x},y: ${y}`;
              const currentValue = gears[coordinates] || [];
              gears[coordinates] = [...currentValue, num];
            }
          }
        }
      }

      // if it has a symbol near it add it to the sum of the number adjacent to the symbols
      if (isPart) {
        sumOfnumbers += num;
      }
    });
  });

  let sumOfGears = 0;
  let gearPairs = [];

  for (let coordinate in gears) {
    const numbers = gears[coordinate];
    if (numbers.length === 2) {
      gearPairs.push(numbers); // filter the gears object to keep only number pairs
    }
  }
  for (let i = 0; i < gearPairs.length; i++) {
    const pair = gearPairs[i];
    const num1 = pair[0];
    const num2 = pair[1];

    const gearRatio = num1 * num2;

    sumOfGears += gearRatio;
  }

  console.log(sumOfGears);
};

fs.readFile(input, "utf-8", (err, data) => {
  if (data) {
    const lines = data.split("\n");
    sumOfAdjacentNumbers(lines);
  } else {
    console.log("Error loading data", err);
    return;
  }
});
