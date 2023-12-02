import fs from "fs";

const inputArr = "input.txt";

const isPossible = (inputArr) => {
  const maxLimits = {
    red: 12,
    green: 13,
    blue: 14,
  };

  let sumOfIDs = 0;

  inputArr.forEach((input) => {
    let [gString, subsetStr] = input.split(": ");

    const [gameName, currentGameId] = gString.split(" ");
    const gameId = parseInt(currentGameId);

    const subset = subsetStr.split("; ");

    let redCubes = 0;
    let greenCubes = 0;
    let blueCubes = 0;

    subset.forEach((group) => {
      const colors = group.split(", ");
      colors.forEach((color) => {
        const [number, colorName] = color.split(" ");

        if (colorName === "red") {
          redCubes = Math.max(redCubes, parseInt(number));
        } else if (colorName === "green") {
          greenCubes = Math.max(greenCubes, parseInt(number));
        } else if (colorName === "blue") {
          blueCubes = Math.max(blueCubes, parseInt(number));
        }
      });
    });

    console.log(
      `Game ${gameId} - Red: ${redCubes}, Green: ${greenCubes}, Blue: ${blueCubes}`
    );

    if (
      redCubes <= maxLimits.red &&
      greenCubes <= maxLimits.green &&
      blueCubes <= maxLimits.blue
    ) {
      console.log(`game ${gameId} is possible`);
      sumOfIDs += gameId;
      console.log(sumOfIDs);
    } else {
      console.log(
        `game ${gameId} not possible due to color limit being exceeded`
      );
    }
  });
};

fs.readFile(inputArr, "utf-8", (err, data) => {
  if (data) {
    const input = data.split("\n");
    isPossible(input);
  } else {
    console.log("Error reading data", err);
    return;
  }
});
