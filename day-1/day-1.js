import fs from "fs";

const inputText = "input.txt";

const sumOfValues = (input) => {
  let sum = 0;

  for (let i of input) {
    const digitsArr = i.match(/\d/g);
    console.log(digitsArr);

    if (digitsArr && digitsArr.length >= 1) {
      const digits = digitsArr.map((digit) => parseInt(digit));
      const digit1 = digits[0];
      console.log("first digit", digit1);
      const digit2 = digits.length === 1 ? digit1 : digits[digits.length - 1];
      console.log("last digit", digit2);

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
