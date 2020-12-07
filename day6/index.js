/**
 * @param {string} input
 */
export function parse_input(input) {
  return input.trim().split("\n\n");
}

/**
 * @param {ReturnType<typeof parse_input>} input
 */
export function part1(input) {
  return input.reduce(
    (acc, answers) => acc + new Set(answers.replace(/\W/g, "")).size,
    0
  );
}

const ASCII_EN_ALPHABET_START = "a".charCodeAt(0);

/**
 *
 * @param {string} char
 */
function to_mask(char) {
  return 1 * 2 ** (char.charCodeAt(0) - ASCII_EN_ALPHABET_START);
}

/**
 *
 * @param {number} n
 */
function count_bits(n) {
  return n.toString(2).replace(/0/g, "").length;
}

/**
 *
 * @param {string} answers_str
 */
function sum_answers(answers_str) {
  return answers_str.split("").reduce((a, b) => a + to_mask(b), 0);
}

/**
 *
 * @param {string} group
 */
function count_group_answers(group) {
  const [head, ...tail] = group.split("\n").map(sum_answers);
  return tail.reduce((a, b) => a & b, head);
}

/**
 * @param {ReturnType<typeof parse_input>} input
 */
export function part2(input) {
  return input.reduce((acc, group) => {
    return acc + count_bits(count_group_answers(group));
  }, 0);
}
