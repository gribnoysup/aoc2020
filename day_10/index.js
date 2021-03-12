/**
 * @param {string} input
 */
export function parse_input(input) {
  return input
    .trim()
    .split("\n")
    .map(Number)
    .sort((a, b) => a - b);
}

/**
 * @param {ReturnType<typeof parse_input>} input
 */
export function part1(input) {
  const diff_counts = { 1: 0, 2: 0, 3: 1 };

  let curr_joltage = 0;

  input.forEach((adapter) => {
    const diff = adapter - curr_joltage;
    diff_counts[diff]++;
    curr_joltage = adapter;
  });

  return diff_counts[1] * diff_counts[3];
}

/**
 * @param {ReturnType<typeof parse_input>} input
 * @param {ReturnType<typeof part1>} first_result
 */
export function part2(input, first_result) {}
