/**
 * @param {string} input
 */
export function parse_input(input) {
  return input
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [cmd, val] = line.split(" ");
      return { cmd, val: Number(val) };
    });
}

const COMMAND_SWITCH = {
  jmp: "nop",
  nop: "jmp",
};

const COMMANDS_TO_SWITCH = Object.keys(COMMAND_SWITCH);

function execute_rec(
  programm,
  acc = 0,
  step = 0,
  visited = new Set(),
  switch_commands = true
) {
  while (step < programm.length) {
    const { cmd, val } = programm[step];

    if (visited.has(step)) {
      const err = new Error("Infinite loop");
      err.acc = acc;
      throw err;
    }

    if (switch_commands === true && COMMANDS_TO_SWITCH.includes(cmd)) {
      const forked_programm = [...programm];

      forked_programm.splice(step, 1, {
        cmd: COMMAND_SWITCH[cmd],
        val,
      });

      try {
        return execute_rec(forked_programm, acc, step, new Set(visited), false);
      } catch {
        // If we weren't able to return from the forked program, it means that
        // we stumbled on a loop, let's continue trying other branches
      }
    }

    visited.add(step);

    switch (cmd) {
      case "acc":
        acc += val;
        step++;
        break;
      case "jmp":
        step += val;
        break;
      case "nop":
        step++;
        break;
      default:
        throw Error(`Unknown instruction: ${cmd}`);
    }
  }

  return acc;
}

/**
 * @param {ReturnType<typeof parse_input>} input
 */
export function part1(input) {
  try {
    return execute_rec(input, 0, 0, new Set(), false);
  } catch (e) {
    return e.acc;
  }
}

/**
 * @param {ReturnType<typeof parse_input>} input
 */
export function part2(input) {
  return execute_rec(input);
}
