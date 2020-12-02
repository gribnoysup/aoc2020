import fs from "fs/promises";
import inquirer from "inquirer";

console.log("Advent of Code 2020 Solutions Sandbox");

console.log();

const dirs = (await fs.readdir(process.cwd())).filter((dirName) =>
  /^day/.test(dirName)
);

const { solution_dir } = await inquirer.prompt([
  {
    type: "list",
    name: "solution_dir",
    message: "Choose a day to run",
    choices: dirs.map((dir_name) => {
      return { name: `Day ${dir_name.replace("day", "")}`, value: dir_name };
    }),
  },
]);

console.log();

let solution;
let input;

try {
  solution = await import(`./${solution_dir}/index.js`);
  input = await fs.readFile(`./${solution_dir}/input.txt`, "utf8");
} catch {}

const timeLabel = "Time".padStart("Part 1 Answer".length);

if (solution && solution.part1) {
  console.time(timeLabel);
  console.log("Part 1 Answer:", await solution.part1(input));
  console.timeEnd(timeLabel);
} else {
  console.warn("⚠️  Part 1 is not implemented");
}

console.log();

if (solution && solution.part2) {
  console.time(timeLabel);
  console.log("Part 2 Answer:", await solution.part2(input));
  console.timeEnd(timeLabel);
} else {
  console.warn("⚠️  Part 2 is not implemented");
}

console.log();
