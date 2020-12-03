import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import inquirer from "inquirer";

const js_template = `
/**
 * @param {string} input
 */
export function parse_input(input) {
  return input;
}

/**
 * @param {ReturnType<typeof parse_input>} input
 */
export function part1(input) {

}

/**
 * @param {ReturnType<typeof parse_input>} input
 */
export function part2(input) {

}`;

console.log();
console.log("Advent of Code 2020 Solution Template Creator");
console.log();

const { day, sample_data, input_data } = await inquirer.prompt([
  {
    type: "number",
    name: "day",
    message: "Enter day number",
  },
  {
    type: "editor",
    name: "sample_data",
    message: "Enter sample data",
  },
  {
    type: "editor",
    name: "input_data",
    message: "Enter puzzle input",
  },
]);

const folder = `day${String(day)}`;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const solution_folder = path.resolve(__dirname, folder);

try {
  await fs.mkdir(solution_folder);
  await fs.writeFile(path.join(solution_folder, "sample.txt"), sample_data);
  await fs.writeFile(path.join(solution_folder, "input.txt"), input_data);
  await fs.writeFile(path.join(solution_folder, "index.js"), js_template);

  console.log();
  console.log("All done. Enjoy!");
  console.log();
} catch (err) {
  console.warn();
  console.warn(`⚠️  Solution for day ${day} already exists!`);
  console.warn();

  process.exitCode = 1;
}
