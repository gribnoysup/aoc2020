/**
 * @param {string} input
 * @returns {Record<string, { name: string, count: number }[]>}
 */
export function parse_input(input) {
  const line_regex = /(?<bag>\w+\s\w+) bags? contain (?<contents>.+)/;
  const contents_regex = /(?<count>\d) (?<bag>\w+\s\w+) bags?(, )?/g;

  return input
    .trim()
    .split("\n")
    .filter(Boolean)
    .reduce((acc, line) => {
      const { bag, contents } = line_regex.exec(line).groups;

      let exec;
      let children = [];

      while ((exec = contents_regex.exec(contents))) {
        const { bag: curr, count } = exec.groups;
        if (!acc[curr]) acc[curr] = [];
        children.push({ name: curr, count: Number(count) });
      }

      contents_regex.lastIndex = 0;

      return {
        ...acc,
        [bag]: acc[bag] ? acc[bag].concat(children) : children,
      };
    }, {});
}

/**
 *
 * @param {ReturnType<typeof parse_input>} graph
 */
function reverse_graph(graph) {
  return Object.keys(graph).reduce((acc, node) => {
    if (!acc[node]) acc[node] = [];

    graph[node].forEach(({ name }) => {
      acc[name] = acc[name] ? acc[name].concat(node) : [node];
    });

    return acc;
  }, {});
}

function get_all_connections(start_point, graph) {
  let start = graph[start_point];

  return new Set(
    start.concat(
      ...start.map((connection) => [...get_all_connections(connection, graph)])
    )
  );
}

/**
 * @param {ReturnType<typeof parse_input>} input
 */
export function part1(input) {
  const start_bag = "shiny gold";
  return get_all_connections(start_bag, reverse_graph(input)).size;
}

function count_all_bags(start_point, graph) {
  return graph[start_point].reduce((acc, node) => {
    return acc + node.count + node.count * count_all_bags(node.name, graph);
  }, 0);
}

/**
 * @param {ReturnType<typeof parse_input>} input
 */
export function part2(input) {
  const start_bag = "shiny gold";
  return count_all_bags(start_bag, input);
}
