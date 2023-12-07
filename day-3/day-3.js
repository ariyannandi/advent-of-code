import fs from "fs";

const input = "input.txt";

//regular expression to get numbers and symbols

//for numbers
const regExNum = /\d+/g;
// for symbols
const regExSym = /[^\d\.]/;

const sumOfAdjacentNumbers = (lines) => {
  let sumOfAdjacentNumbers = 0;

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
        }
      }

      // check the right of the number
      if (matchEnd + 1 < line.length) {
        const char = line[matchEnd + 1];
        const isSymbol = !!regExSym.exec(char);

        if (isSymbol) {
          isPart = true;
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
          }
        }
      }

      // if it has a symbol near it add it to the sum of the number adjacent to the symbols
      if (isPart) {
        sumOfAdjacentNumbers += num;
      }
    });
  });
  
  console.log(sumOfAdjacentNumbers);
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
