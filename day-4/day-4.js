import fs from "fs";

const calculatePoints = (cards) => {
  let totalPoints = 0;

  for (const card of cards) {
    const numbers = card.split(": ")[1];
    const [winningNumbers, myNumbers] = numbers.split(" | ");

    const winningNums = winningNumbers
      .split(" ")
      .filter((num) => num !== "")
      .map((num) => parseInt(num));
    const myNums = myNumbers
      .split(" ")
      .filter((num) => num !== "")
      .map((num) => parseInt(num));

    let points = 0;

    for (const number of myNums) {
      if (winningNums.includes(number)) {
        points++;
      }
    }

    if (points > 0) {
      totalPoints += Math.pow(2, points - 1);
    }
  }

  return totalPoints;
};

fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (data) {
    const input = data.split("\n");
    const totalPoints = calculatePoints(input);
    console.log(totalPoints);
  }
});
