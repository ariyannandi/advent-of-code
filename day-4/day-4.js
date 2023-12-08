import fs from "fs";

const calculatePoints = (cards) => {
  // initialize the total points to 0
  let totalPoints = 0;

  // iterate through all the cards
  for (const card of cards) {
    // get all the numbers from the cards
    const numbers = card.split(": ")[1];
    const [winningNumbers, myNumbers] = numbers.split(" | ");

    // extract all the winning numbers and my numbers from the cards and store them in an array
    const winningNums = winningNumbers
      .split(" ")
      .filter((num) => num !== "")
      .map((num) => parseInt(num));
    const myNums = myNumbers
      .split(" ")
      .filter((num) => num !== "")
      .map((num) => parseInt(num));

    // track the number of matches for the current card
    let points = 0;

    // check how many times my numbers match the winning card numbers
    for (const number of myNums) {
      if (winningNums.includes(number)) {
        points++;
      }
    }
    // if there are matches, calculate the total points
    if (points > 0) {
      totalPoints += Math.pow(2, points - 1);
    }
  }

  return totalPoints;
};

const totalScratchCards = (cards) => {
  // Initialize an array to track the number of copies won for each card
  const cardCopyTracker = new Array(cards.length).fill(1);

  // to check if more scratch cards are won in the current loop
  let wonMore = true;

  // iterate through all the cards
  for (let cardIndex = 0; cardIndex < cards.length && wonMore; cardIndex++) {
    // get the numbers from the current card
    const card = cards[cardIndex];
    const numbers = card.split(": ")[1];
    const [winningNumbers, myNumbers] = numbers.split(" | ").map((numStr) =>
      numStr
        .split(" ")
        .filter((numStr) => numStr !== "")
        .map((num) => parseInt(num))
    );

    // track the number of matches for the current card
    let matches = 0;

    // check how many numbers match the winning numbers
    for (const number of myNumbers) {
      if (winningNumbers.includes(number)) {
        matches++;
      }
    }

    // check if the any scratch cards are won
    if (matches > 0) {
      // get the current card's copy count
      const currentCardCopies = cardCopyTracker[cardIndex];

      // get the indexes of the cards for which we need to increase the count
      const startIdx = cardIndex + 1;
      const endIdx = Math.min(cards.length - 1, cardIndex + matches);

      // add the copy counts
      for (let i = startIdx; i <= endIdx; i++) {
        cardCopyTracker[i] += currentCardCopies;
      }

      // update the flag to continue the loop
      wonMore = true;
    }
  }
  // track the total count of copies won
  const totalCards = cardCopyTracker.reduce(
    (total, copies) => total + copies,
    0
  );
  return totalCards;
};

fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (data) {
    const input = data.split("\n");
    const totalPoints = calculatePoints(input);
    console.log(totalPoints);
    const totalCardsWon = totalScratchCards(input);
    console.log(totalCardsWon);
  }
});
