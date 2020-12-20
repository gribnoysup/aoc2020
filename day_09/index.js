/**
 * @param {string} input
 */
export function parse_input(input) {
  const [preamble, numbers] = input.trim().split("\n\n");
  return {
    preamble: Number(preamble),
    numbers: numbers.trim().split("\n").map(Number),
  };
}

/**
 *
 * @param {number} num
 * @param {ReturnType<typeof parse_input>} arr
 * @returns {boolean}
 */
function if_sum_exist(num, arr) {
  arr = [...arr];

  while (arr.length) {
    const a = arr.shift();
    const i = arr.indexOf(num - a);

    if (i !== -1) {
      return true;
    }
  }

  return false;
}

/**
 * @param {ReturnType<typeof parse_input>} input
 */
export function part1({ preamble, numbers }) {
  return numbers.slice(preamble).find((n, i) => {
    return !if_sum_exist(n, numbers.slice(i, i + preamble));
  });
}

/**
 *
 * @param {number} num
 * @param {number[]} array
 * @param {number} set_start
 * @param {number} set_end
 * @returns {number[]}
 */
function find_contiguous_set_for_number(
  num,
  array,
  set_start = 0,
  set_end = 0
) {
  const set = array.slice(set_start, set_end + 1);
  const sum = set.reduce((a, b) => a + b, 0);

  if (sum === num) {
    return set;
  }

  if (sum < num) {
    return find_contiguous_set_for_number(num, array, set_start, set_end + 1);
  }

  if (sum > num) {
    return find_contiguous_set_for_number(num, array, set_start + 1, set_end);
  }
}

/**
 * @param {ReturnType<typeof parse_input>} input
 * @param {ReturnType<typeof part1>} first_result
 */
export function part2({ numbers }, first_result) {
  const set = find_contiguous_set_for_number(first_result, numbers);
  const min = Math.min(...set);
  const max = Math.max(...set);

  return min + max;
}
