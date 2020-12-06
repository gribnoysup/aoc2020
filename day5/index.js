/**
 * @param {string} input
 */
export function parse_input(input) {
  const regex = /^(?<row>\w{7})(?<column>\w{3})$/;
  return input
    .trim()
    .split("\n")
    .map((line) => {
      const { row, column } = regex.exec(line).groups;
      return { row: row.split(""), column: column.split("") };
    });
}

/**
 *
 * @param {number[]} range_arr
 * @param {string} l
 * @param {string} r
 */
function create_binary_tree_from_range(range_arr, l = "L", r = "R") {
  if (range_arr.length === 1) {
    return {
      value: range_arr[0],
      [l]: null,
      [r]: null,
    };
  } else if (range_arr.length > 1) {
    const middle = range_arr.length / 2;

    return {
      value: range_arr,
      [l]: create_binary_tree_from_range(range_arr.slice(0, middle), l, r),
      [r]: create_binary_tree_from_range(range_arr.slice(middle), l, r),
    };
  }
}

const range_8 = Array.from({ length: 8 }, (_, i) => i);
const range_128 = Array.from({ length: 128 }, (_, i) => i);

const row_binary_tree = create_binary_tree_from_range(range_128, "F", "B");
const column_binary_tree = create_binary_tree_from_range(range_8, "L", "R");

/**
 *
 * @param {string[]} instructions
 * @param {ReturnType<typeof create_binary_tree_from_range>} tree
 */
function get_from_tree(instructions, tree) {
  const step = instructions.shift();

  if (instructions.length === 0) {
    return tree[step].value;
  } else {
    return get_from_tree(instructions, tree[step]);
  }
}

const get_row = (instructions) =>
  get_from_tree(instructions.slice(), row_binary_tree);

const get_column = (instructions) =>
  get_from_tree(instructions.slice(), column_binary_tree);

/**
 * @param {ReturnType<typeof parse_input>} input
 */
export function part1(input) {
  return input.reduce((acc, { row, column }) => {
    const id = get_row(row) * 8 + get_column(column);
    return Math.max(id, acc);
  }, -Infinity);
}

/**
 * @param {ReturnType<typeof parse_input>} input
 */
export function part2(input) {
  return (
    input
      .map(({ row, column }) => get_row(row) * 8 + get_column(column))
      .sort((a, b) => a - b)
      .find((val, i, arr) => {
        return arr[i + 1] === val + 2;
      }) + 1 || null
  );
}
