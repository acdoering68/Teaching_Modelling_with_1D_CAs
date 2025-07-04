/*

The code in this file corresponds to the Book "The Algorithmic Beauty of Sea Shells" by Hans Meinhardt, 
Springer 1995.
The book contains a floppy disk (later editions a CD-ROM) with Visual Basic source code 

Only two equations related to pattern formation are used here. 

The original code uses multiple floating point variables per cell.
To emphasize the character of a cellular automaton, fixed point is used in the following, i.e. the resolution of the state is defined.


Furthermore the original code has a large amount of settings and configurations, that could confuse a student. 
That's why only few species fith given parameters are selected

*/

// parameter sets for initialization

// drb must at least 7* dra
// db > da

// wrt  decay: the equation in the book has a minus, but the equations from basic source don't so we make the factors negative

const seashelldefault_constants = {
  random_a_low: 0,
  random_a_high: 255,
  random_b_low: 1,
  random_b_high: 1,
  dra: 0.0,
  drb: 0.0,
  da: -1.0, // decay activator
  db: -1.0, // decay inhibitor
  ba: 0.0, // base activator production
  bb: 0.0, // base inhibitor production
  sa: 0, // activator saturation factor
  equation: "i21",
};

// horizontal stripes
const seashell21_constants = {
  random_a_low: 0.5,
  random_a_high: 3.5,
  random_b_low: 1.0,
  random_b_high: 2.0,
  dra: 0.02,
  drb: 0.4,
  da: -0.05,
  db: -0.1,
  ba: 0.3,
  bb: 0.05,
  sa: 0,
  equation: "i21",
};

// vertical pattern
const seashell21_constants_vertical = {
  random_a_low: 0.5,
  random_a_high: 3.5,
  random_b_low: 1.0,
  random_b_high: 2.0,
  dra: 0.1,
  drb: 1.2,
  da: -0.01,
  db: -0.5,
  ba: 0.3,
  bb: 0.6,
  sa: 0,
  equation: "i21",
};




const seashell23_constants = {
  random_a_low: 0.5,
  random_a_high: 3.5,
  random_b_low: 1.0,
  random_b_high: 2.0,
  dra: 0.015,
  drb: 0.2,
  da: -0.01,
  db: -0.5,
  ba: 0.3,
  bb: 0.6,
  sa: 0.2,
  equation: "i23",
};

// Modify this!
const seashell23_constants_student = {
  random_a_low: 0.5,
  random_a_high: 3.5,
  random_b_low: 1.0,
  random_b_high: 2.0,
  dra: 0.05,
  drb: 0.4,
  da: -0.01,
  db: -0.6,
  ba: 0.3,
  bb: 0.6,
  sa: 7,
  equation: "i23",
};


class SeaShells {
  random_a_low = 1;
  random_a_high = 100;
  random_b_low = 1;
  random_b_high = 1;
  dra = 0.1;
  drb = 0.1;
  da = 1.0;
  db = 1.0;

  ba = 0.0;
  bb = 0.0;

  sa = 0.0;

  s = 1.0; // base density factor

  equation = "i21";

  constructor() {
    this.dra = 0.1;
    this.drb = 0.1;
    this.da = 1.0;
    this.db = 1.0;
  }

  init_state = "random";
  compute_draw_ratio = 1;

  // the following members reflect the names of the original Basic source code

  transition(position) {
    // common for  all equations:
    // state state is an array of multiple numbers, for now floats, but I would like to limit the resolution eventually to make the state finite

    var ln = state[position];
    var rn = state[position];
    var a = state[position][0];
    var b = state[position][1];

    // var s = state[position][2]; // the code from the book has cases with more than two substances which would require more fields
    var res = [0.0, 0.0];

    var olddecaydiffA;
    var olddecaydiffB;
    // handling edges
    if (position > 0) {
      ln = state[position - 1];
    }
    if (position < state.length - 2) {
      rn = state[position + 1];
    }

    olddecaydiffA = this.dra * a + this.da * (ln[0] + rn[0]);
    olddecaydiffB = this.drb * b + this.db * (ln[1] + rn[1]);
    switch (this.equation) {
      case "i21":
        res[0] = Math.max(0, olddecaydiffA + this.s * ((a * a) / b + this.ba));
        res[1] = Math.max(1.0, olddecaydiffB + this.s * a * a + this.bb); // division by b in next generation, so != 0
        break;
      case "i23":
        res[0] = Math.max(
          0,
          olddecaydiffA + this.s * ((a * a) / (b + this.sa * a * a) + this.ba)
        );
        res[1] = Math.max(1.0, olddecaydiffB + this.s * a * a + this.bb);
    }
    return res;
  }

  initial_state() {
    var i = 0;
    var initc = seashelldefault_constants;
    switch (this.init_state) {
      case "i21":
        initc = seashell21_constants;
        break;
      case "i21v":
        initc = seashell21_constants_vertical;
        break;
      case "i23":
        initc = seashell23_constants;
        break;
      case "student":
        initc = seashell23_constants_student; 
        break;
    }
    this.random_a_low = initc.random_a_low;
    this.random_a_high = initc.random_a_high;
    this.random_b_low = initc.random_b_low;
    this.random_b_high = initc.random_b_high;
    this.dra = initc.dra;
    this.drb = initc.drb;
    this.da = initc.da;
    this.db = initc.db;
    this.ba = initc.ba;
    this.bb = initc.bb;
    this.sa = initc.sa;

    var state = [];
    var rndn;
    var inita;
    var initb;

    var i = 0;
    for (i = 0; i < init_size; i++) {
      rndn = Math.random();
      inita =
        this.random_a_low + (this.random_a_high - this.random_a_low) * rndn;
      rndn = Math.random();
      initb =
        this.random_b_low + (this.random_b_high - this.random_b_low) * rndn;
      state.push([inita, initb]);
    }
    return state;
  }

  get_color(state) {
    // for a start, only transform the activator to red
    // return  "#" + ('00' + (Math.round(state[0]*200)).toString(16)).slice(-2) + "0000"
    // at least scale between white/ivory to brown
    var scaled_state = Math.max(0, Math.min(2.0, state[0]));
    return (
      "#" +
      (256 - Math.round(scaled_state * 40)).toString(16).slice(-2) +
      (256 - Math.round(scaled_state * 70)).toString(16).slice(-2) +
      (256 - Math.round(scaled_state * 60)).toString(16).slice(-2)
    );
  }
}
