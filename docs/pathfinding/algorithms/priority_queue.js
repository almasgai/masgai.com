// Priority queue operations
export function add_node(priority_queue, node) {
  percolate_up(priority_queue, node);
}

export function percolate_up(queue, node) {
  // Add node to PQ
  queue.push(node);
  if (queue.length == 1) return;

  // Get the node's index as well as its parents
  let index = queue.length - 1;

  // Percolate the node up the heap while it is less than its parent
  // and while there is a parent node to compare it to.
  while (Math.floor((index - 1) / 2) >= 0) {
    let min_index = Math.floor((index - 1) / 2);
    if (queue[index].cost > queue[min_index].cost) return;

    let temp = queue[index];
    queue[index] = queue[min_index];
    queue[min_index] = temp;

    index = Math.floor((index - 1) / 2);
  }
}

export function get_min_child(queue, index) {
  // Since arrays are zero-indexed, to get left child it 2k + 1.
  // To get right, 2k + 2
  if (
    index * 2 + 2 >= queue.length ||
    queue[index * 2 + 1].cost <= queue[index * 2 + 2].cost
  ) {
    return index * 2 + 1;
  } else {
    return index * 2 + 2;
  }
}

export function percolate_down(queue) {
  let i = 0;

  while (i * 2 + 1 < queue.length) {
    let min_child = get_min_child(queue, i);

    if (queue[i].cost > queue[min_child].cost) {
      let temp = queue[i];
      queue[i] = queue[min_child];
      queue[min_child] = temp;
    }

    i = min_child;
  }
}

// Store the minimum value as a variable to be returned
// Take the largest variable, replace the minimum node,
// and percolate down until the node is in the right spot.
// Once done return minimum node.
export function pop_min(queue) {
  if (queue.length == 0) {
    console.log("Queue is empty");
    return;
  }

  let min_node = queue[0];
  queue[0] = queue[queue.length - 1];
  queue.pop();
  percolate_down(queue);
  return min_node;
}
