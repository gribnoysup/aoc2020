import path from "path";
import fs from "fs/promises";
import inquirer from "inquirer";
import { fileURLToPath } from "url";

console.log();
console.log("Advent of Code 2020 Solutions Sandbox");
console.log();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dirs = (await fs.readdir(__dirname)).filter((dirName) =>
  /^day/.test(dirName)
);

const choices = dirs.map((dir_name) => {
  return { name: `Day ${dir_name.replace("day", "")}`, value: dir_name };
});

const { solution_dir } = await inquirer.prompt([
  {
    type: "list",
    name: "solution_dir",
    message: "Choose a day to run",
    choices,
    default: choices[choices.length - 1].value,
  },
]);

console.log();

let solution;
let parser = (_) => _;
let input;

try {
  solution = await import(`./${solution_dir}/index.js`);
  parser = solution?.parse_input ?? parser;
  input = parser(await fs.readFile(`./${solution_dir}/input.txt`, "utf8"));
} catch {}

if (!input) {
  console.warn("⚠️  No input provided for the solutions");
  console.log();
}

const timeLabel = "Time".padStart("Part 1 Answer".length);

if (solution?.part1) {
  console.time(timeLabel);
  console.log("Part 1 Answer:", await solution.part1(input));
  console.timeEnd(timeLabel);
} else {
  console.warn("⚠️  Part 1 is not implemented");
}

console.log();

if (solution?.part2) {
  console.time(timeLabel);
  console.log("Part 2 Answer:", await solution.part2(input));
  console.timeEnd(timeLabel);
} else {
  console.warn("⚠️  Part 2 is not implemented");
}

console.log();