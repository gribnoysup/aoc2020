/**
 *
 * @param {string} input
 * @returns {number[]}
 */
function input_to_numbers_array(input) {
  return input.trim().split("\n").filter(Boolean).map(Number);
}

/**
 * O(n*logn)
 *
 * @param {number[]} arr
 * @param {number} val
 *
 * @returns {[number, number] | null}
 */
function find_by_sum_of_two(arr, val) {
  for (const i = 0; i < arr.length; i++) {
    const n1 = arr[i];
    for (const j = i + 1; j < arr.length; j++) {
      if (n1 + arr[j] === val) {
        return [n1, arr[j]];
      }
    }
  }
  return null;
}

/**
 * O(2n) (accessing keys on map should be O(1))
 *
 * @param {number[]} arr
 * @param {number} val
 *
 * @returns {[number, number] | null}
 */
function find_with_hash(arr, val) {
  /** @type {Map<number, number>} */
  const map = new Map();
  for (const n of arr) {
    map.set(n, val - n);
  }
  for (const n of arr) {
    if (map.has(map.get(n))) {
      return [n, map.get(n)];
    }
  }
  return null;
}

/**
 * @param {string} input
 */
export function parse_input(input) {
  return input_to_numbers_array(input);
}

/**
 * @param {ReturnType<typeof parse_input>} numbers
 */
export function part1(numbers) {
  const result = find_with_hash(numbers, 2020);
  return result ? result[0] * result[1] : null;
}

/**
 * @param {ReturnType<typeof parse_input>} numbers
 */
export function part2(numbers) {
  while (numbers.length) {
    const n1 = numbers.shift();
    const result = find_with_hash(numbers, 2020 - n1);
    if (result) {
      return n1 * result[0] * result[1];
    }
  }
  return null;
}
