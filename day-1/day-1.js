import fs from "fs";

const inputText = "input.txt";

const wordDigits = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const getRowDigit = (string) => {
  const digitsArr = [];

  for (let i = 0; i < string.length - 1; i++) {
    const word = string
      .slice(i)
      .match(/(\d|one|two|three|four|five|six|seven|eight|nine)/g);
    if (word) {
      digitsArr.push(...word);
    }
  }

  const digits = digitsArr.map((matchedDigit) => {
    const digit = wordDigits[matchedDigit] || parseInt(matchedDigit, 10);
    return isNaN(digit) ? null : digit;
  });

  return digits.filter((digit) => digit !== null);
};

const sumOfValues = (input) => {
  let sum = 0;

  for (let i of input) {
    const digitsArr = getRowDigit(i);

    if (digitsArr && digitsArr.length >= 1) {
      const firstDigit = digitsArr[0];
      const lastDigit = digitsArr[digitsArr.length - 1];

      const digit1 = parseInt(firstDigit);
      const digit2 = parseInt(lastDigit);
      const lineValue = digit1 * 10 + digit2;
      sum += lineValue;
    }
  }

  return sum;
};

fs.readFile(inputText, "utf-8", (err, data) => {
  if (data) {
    const input = data.split("\n");
    const totalSum = sumOfValues(input);
    console.log(totalSum);
  } else {
    console.log("Error reading input file", err);
    return;
  }
});
