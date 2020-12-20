import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import inquirer from "inquirer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function get_folder_name(day) {
  return `day${String(day)}`;
}

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
 * @param {ReturnType<typeof part1>} first_result
 */
export function part2(input, first_result) {

}`;

console.log();
console.log("Advent of Code 2020 Solution Template Creator");
console.log();

const { day } = await inquirer.prompt([
  {
    type: "number",
    name: "day",
    message: "Enter day number",
  },
]);

const folder = get_folder_name(day);
const solution_dir = path.resolve(__dirname, folder);

try {
  await fs.stat(solution_dir);

  console.warn();
  console.warn(`⚠️  Solution for day ${day} already exists!`);
  console.warn();

  process.exitCode = 1;
} catch {
  // ENOENT, so all good, continue!

  const { sample_data, input_data } = await inquirer.prompt([
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

  await fs.mkdir(solution_dir);
  await fs.writeFile(path.join(solution_dir, "sample.txt"), sample_data);
  await fs.writeFile(path.join(solution_dir, "input.txt"), input_data);
  await fs.writeFile(path.join(solution_dir, "index.js"), js_template);

  console.log();
  console.log("All done. Enjoy!");
  console.log();
}
