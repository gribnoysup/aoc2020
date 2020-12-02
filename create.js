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
 * @param {ReturnType<typeof parse_input>} parsed_input
 */
export function part1(parsed_input) {

}

/**
 * @param {ReturnType<typeof parse_input>} parsed_input
 */
export function part2(parsed_input) {

}`;

console.log();
console.log("Advent of Code 2020 Solution Template Creator");
console.log();

const { day, input_data } = await inquirer.prompt([
  {
    type: "number",
    name: "day",
    message: "Enter day number",
  },
  {
    type: "editor",
    name: "input_data",
    message: "Enter puzzle input",
  },
]);

const folder = `day${String(day)}`;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

try {
  await fs.mkdir(path.resolve(__dirname, folder));
  await fs.writeFile(path.resolve(__dirname, folder, "input.txt"), input_data);
  await fs.writeFile(path.resolve(__dirname, folder, "index.js"), js_template);
  
  console.log();
  console.log("All done. Enjoy!");
  console.log();
} catch (err) {
  console.warn();
  console.warn(`⚠️  Solution for day ${day} already exists!`);
  console.warn();

  process.exitCode = 1;
}
