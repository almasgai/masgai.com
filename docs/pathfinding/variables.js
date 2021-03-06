function initialize_variables() {
  window.rows = 45;
  window.columns = 75;
  window.node = undefined;

  window.grid = new Array(window.rows).fill(0);
  for (let i = 0; i < window.rows; i++)
    window.grid[i] = new Array(window.columns).fill(0);

  window.current_square = undefined;
  window.previous_color = "white";
  window.square_color = "gray";
  window.draw = false;
  window.move = false;

  window.start_row = Math.floor(rows / 3);
  window.start_col = Math.floor(columns / 6);

  window.end_row = start_row;
  window.end_col = start_col + 15;

  window.start = undefined;
  window.end = undefined;

  window.time = 20;
}

export default initialize_variables;
