const oriented_init = [
  0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0,
  0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1,
  1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0,
  0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0,
  0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
  1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1,
];

class TwoStates {
  // the specific parameter is a number from 0 .. 255, e.g. along Steven Wolfram's "New Kind of Science"
  // for faster evaluation, we create a lookup table of 8 entries
  transition_lookup = [];
  constructor() {
    var pof2 = 1;
    for (let i = 0; i < 8; i++) {
      this.transition_lookup.push(Math.round(specificparameter / pof2) % 2);
      pof2 = pof2 * 2;
    }
  }

  init_state = "random";
  compute_draw_ratio = 1;

  transition(position) {
    var s = state[position];
    var ln = 0;
    var rn = 0;
    if (position <= 0) {
      ln = 0;
    } else {
      ln = state[position - 1];
    }
    if (position >= state.length - 2) {
      rn = 0;
    } else {
      rn = state[position + 1];
    }
    // see Wikipedia Elementary Cellular Automata for common numbering scheme
    return this.transition_lookup[4 * ln + 2 * s + rn];
  }

  get_color(state) {
    if (state == 0) {
      return "#000000";
    } else {
      return "#FFFFFF";
    }
  }
  initial_state() {
    var state = [];
    var i = 0;
    switch (this.init_state) {
      case "random":
        for (i = 0; i < init_size; i++) {
          state.push(Math.round(Math.random(2)));
        }
      case "left":
        state = oriented_init;
        break;
    }
    return state;
  }
}
