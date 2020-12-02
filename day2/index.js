/**
 * @param {string} input
 */
export function parse_input(input) {
  const regex = /^(?<p1>\d+)-(?<p2>\d+) (?<letter>[a-z]): (?<password>.+)$/;

  return input
    .trim()
    .split("\n")
    .map((line) => {
      const { p1, p2, letter, password } = regex.exec(line).groups;
      return { p1: Number(p1), p2: Number(p2), letter, password };
    });
}

function is_password_valid_p1(min, max, letter, password) {
  const len = password.replace(new RegExp(`[^${letter}]`, "g"), "").length;
  return len >= min && len <= max;
}

/**
 * @param {ReturnType<typeof parse_input>} parsed_input
 */
export function part1(parsed_input) {
  return parsed_input.reduce((acc, { p1, p2, letter, password }) => {
    return acc + Number(is_password_valid_p1(p1, p2, letter, password));
  }, 0);
}

/**
 *
 * @param {number} pos1
 * @param {number} pos2
 * @param {string} letter
 * @param {string} password
 */
function is_password_valid_p2(pos1, pos2, letter, password) {
  return (
    Number(password.charAt(pos1 - 1) === letter) +
      Number(password.charAt(pos2 - 1) === letter) ===
    1
  );
}

/**
 * @param {ReturnType<typeof parse_input>} parsed_input
 */
export function part2(parsed_input) {
  return parsed_input.reduce((acc, { p1, p2, letter, password }) => {
    return is_password_valid_p2(p1, p2, letter, password) ? acc + 1 : acc;
  }, 0);
}
