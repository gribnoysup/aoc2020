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

const { solution_dir, input_type } = await inquirer.prompt([
  {
    type: "list",
    name: "solution_dir",
    message: "Choose a day to run:",
    choices,
    default: choices[choices.length - 1].value,
  },
  {
    type: "list",
    name: "input_type",
    message: "Do you want to run main input or a sample one?",
    choices: [
      { name: "Input", value: "input" },
      { name: "Sample", value: "sample" },
    ],
    default: "input",
  },
]);

console.log();

let solution;
let parser = (_) => _;
let input;

try {
  solution = await import(`./${solution_dir}/index.js`);
} catch (e) {
  if (e.code !== "ERR_MODULE_NOT_FOUND") {
    console.error(`⚠️  Error while loading solution:`);
    console.error();

    throw e;
  }
}

parser = solution?.parse_input ?? parser;

try {
  input = await fs.readFile(`./${solution_dir}/${input_type}.txt`, "utf8");
} catch (e) {
  const type = input === "input" ? "input" : "sample input";

  if (e.code === "ENOENT") {
    console.warn(`⚠️  No ${type} provided for the solution.`);
    console.warn();
  } else {
    console.error(`⚠️  Error while loading ${type}: `);
    console.error();

    throw e;
  }

  process.exitCode = 1;
  process.exit();
}

try {
  input = parser(input);
} catch (e) {
  console.error(`⚠️  Error while parsing input:`);
  console.error();

  throw e;
}

let part = 0;
let part_1, part_2;

try {
  const timeLabel = "Time".padStart("Part 1 Answer".length);

  if (solution?.part1) {
    part++;

    console.time(timeLabel);
    part_1 = await solution.part1(input);
    console.log("Part 1 Answer:", part_1);
    console.timeEnd(timeLabel);
  } else {
    console.warn("⚠️  Part 1 is not implemented.");
  }

  console.log();

  if (solution?.part2) {
    part++;

    console.time(timeLabel);
    part_2 = await solution.part2(input, part_1);
    console.log("Part 2 Answer:", part_2);
    console.timeEnd(timeLabel);
  } else {
    console.warn("⚠️  Part 2 is not implemented.");
  }

  console.log();
} catch (e) {
  if (part > 0) {
    console.error(`⚠️  Error while running solution for part ${part}:`);
  } else {
    console.error("⚠️  Something unexpected happened:");
  }
  console.error();

  throw e;
}
