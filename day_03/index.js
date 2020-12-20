/**
 * @param {string} input
 */
export function parse_input(input) {
  return {
    length: input.indexOf("\n"),
    arr: input
      .trim()
      .replaceAll(".", "0")
      .replaceAll("#", "1")
      .replaceAll("\n", "")
      .split("")
      .map(Number),
  };
}

/**
 * @deprecated
 * @param {string} input
 */
function to_2d_array(input) {
  return input
    .trim()
    .replaceAll(".", "0")
    .replaceAll("#", "1")
    .split("\n")
    .map((line) => {
      return line.split("").map(Number);
    });
}

/**
 *
 * @param {number[]} arr
 * @param {number} x
 * @param {number} y
 */
function get_steps_for_path({ arr, length }, x, y) {
  x = x * length;
  let curr_pos = 0;
  const max_step = x + length;
  const step = x + y;
  const steps = [curr_pos];

  while (true) {
    const next_pos =
      curr_pos + step - Number((curr_pos % length) + step >= max_step) * length;

    if (next_pos >= arr.length) {
      break;
    }

    steps.push(next_pos);
    curr_pos = next_pos;
  }

  return steps;
}

function count_trees_on_path({ arr }, steps) {
  return steps.reduce((acc, step) => {
    return acc + arr[step];
  }, 0);
}

/**
 * @deprecated
 * @param {number[][]} arr 2d array representing the "trees"
 * @param {number} x "vertical" move distance
 * @param {number} y "horizontal" move distance
 * @returns {number}
 */
function count_with_a_step(arr, x, y) {
  const line_length = arr[0].length;
  let res = 0;
  let j = 0;
  for (let i = 0; i < arr.length; i += x) {
    res += arr[i][j];
    j = (j + y) % line_length;
  }
  return res;
}

/**
 * @param {ReturnType<typeof parse_input>} forest_map
 */
export function part1(forest) {
  return count_trees_on_path(forest, get_steps_for_path(forest, 1, 3));
}

/**
 * @deprecated
 * @param {number[][]} arr 2d array representing the "trees"
 * @param {[number, number][]} steps array of step variants that we are checking
 * @returns {number[]}
 */
function one_pass_count(arr, steps) {
  const line_length = arr[0].length;
  const results = Array(steps.length).fill(0);
  const curr_step_y = Array(steps.length).fill(0);
  for (let i = 0; i < arr.length; i++) {
    steps.forEach(([x, y], s) => {
      if (s % x === 0) {
        results[s] += arr[i][curr_step_y[s]];
        curr_step_y[s] = (curr_step_y[s] + y) % line_length;
      }
    });
  }
  return results;
}

/**
 * @param {ReturnType<typeof parse_input>} forest_map
 */
export function part2(forest) {
  const steps = [
    [1, 1],
    [1, 3],
    [1, 5],
    [1, 7],
    [2, 1],
  ];

  return steps
    .map(([x, y]) => {
      return count_trees_on_path(forest, get_steps_for_path(forest, x, y));
    })
    .reduce((a, b) => a * b, 1);
}
