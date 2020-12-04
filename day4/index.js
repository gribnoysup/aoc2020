function in_range(val, min, max) {
  return val >= min && val <= max;
}

const validation = {
  byr: (val) => {
    val = Number(val);
    return !isNaN(val) && in_range(val, 1920, 2002);
  },
  iyr: (val) => {
    val = Number(val);
    return !isNaN(val) && in_range(val, 2010, 2020);
  },
  eyr: (val) => {
    val = Number(val);
    return !isNaN(val) && in_range(val, 2020, 2030);
  },
  hgt: (val) => {
    let [, n, type] = /^(\d+?)(cm|in)$/.exec(val) || [];
    n = Number(n);
    return type && !isNaN(n) && type === "cm"
      ? in_range(n, 150, 193)
      : in_range(n, 59, 76);
  },
  hcl: (val) => {
    return /^#[a-f0-9]{6}$/.test(val);
  },
  ecl: (val) => {
    return /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(val);
  },
  pid: (val) => {
    return /^\d{9}$/.test(val);
  },
};

const important_keys = Object.keys(validation);

/**
 * @param {string} input
 */
export function parse_input(input) {
  const res = input
    .trim()
    .split("\n\n")
    .map((passport) =>
      passport
        .replace(/(\s|\n)+/g, " ")
        .split(" ")
        .reduce((acc, str) => {
          const [key, val] = str.split(":");
          acc[key] = val;
          return acc;
        }, {})
    );

  return res;
}

function has_keys(obj, keys) {
  const set = new Set(Object.keys(obj));
  return keys.every((key) => set.has(key));
}

function is_valid_passport(obj) {
  return important_keys.every((key) => {
    return validation[key](obj[key]);
  });
}

/**
 * @param {ReturnType<typeof parse_input>} input
 */
export function part1(input) {
  return input.reduce((a, b) => {
    return a + Number(has_keys(b, important_keys));
  }, 0);
}

/**
 * @param {ReturnType<typeof parse_input>} input
 */
export function part2(input) {
  return input.reduce((a, b) => {
    return a + Number(is_valid_passport(b));
  }, 0);
}
