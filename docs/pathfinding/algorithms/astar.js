import { get_node_no_set, pause, all_neighbors_visited } from "./util.js";
import * as pq from "./priority_queue.js";
import Node from "./node.js";

async function AStar() {
  let priority_queue = [];
  let done = false;
  let visited = new Set();

  // Create grid of nodes and calculate all their distances:
  // from_start == g(n): Manhatten distance from starting point
  // to_end == h(n): Manhatten distance to end point
  let distances = [];

  for (let row = 0; row < rows; row++) {
    let temp = [];
    for (let col = 0; col < columns; col++) {
      let color = document.getElementById(`${row} ${col}`).style
        .backgroundColor;
      temp.push(new Node(row, col, color));
    }
    distances.push(temp);
  }

  pq.add_node(
    priority_queue,
    distances[start_row][start_col],
    "manhatten_distance"
  );

  // Queue is not empty. Or break after end node has be dequeued
  while (!done && priority_queue.length) {
    // Get the next viable node. Using this node, get it's neighbors
    let node = pq.pop_min(priority_queue, "manhatten_distance");
    let row = node.x;
    let col = node.y;

    let up = get_node_no_set(row - 1, col);
    let right = get_node_no_set(row, col + 1);
    let down = get_node_no_set(row + 1, col);
    let left = get_node_no_set(row, col - 1);

    // First check to see if one of the neighbors neighbors is the end node
    for (let neighbor of [up, right, down, left]) {
      if (!neighbor) {
        continue;
      }

      let i = neighbor[0];
      let j = neighbor[1];

      // If neighbor is already visited or lightblue, continue. The node has either
      // been completely visited or in the priority queue to be visited.
      if (
        visited.has([i, j].toString()) ||
        document.getElementById(`${i} ${j}`).style.backgroundColor ==
          "lightblue"
      ) {
        continue;
      }

      // If neighbor is destination node
      if (
        document.getElementById(`${i} ${j}`).style.backgroundColor == "green"
      ) {
        done = true;
        distances[end_row][end_col].previous_node = node;
        break;
      }

      if (!(i == start_row && j == start_col)) {
        document.getElementById(`${i} ${j}`).style.backgroundColor =
          "lightgreen";

        await pause(time);

        document.getElementById(`${i} ${j}`).style.backgroundColor =
          "lightblue";
      }

      // Add neighbor to priority queue to be visited.
      pq.add_node(priority_queue, distances[i][j], "manhatten_distance");
      distances[i][j].previous_node = node;
      if (all_neighbors_visited(i, j)) {
        visited.add([i, j].toString());
      }
    }
  }

  /*
  if (!done) {
    // Unable to reach end goal. Just stop the algorithm from running.
    return;
  }
  */

  let pointer = distances[end_row][end_col];
  let traversal = [];

  while (!pointer.to_start()) {
    pointer = pointer.previous_node;
    traversal.push([pointer.x, pointer.y]);
  }

  traversal = traversal.reverse();
  for (let i = 1; i < traversal.length; i++) {
    let row = traversal[i][0];
    let col = traversal[i][1];
    document.getElementById(`${row} ${col}`).style.backgroundColor = "yellow";
    await pause(time);
  }
}

export default AStar;
