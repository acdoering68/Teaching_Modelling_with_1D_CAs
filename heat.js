var tau = 0.4; // 0 < tau < 0.5
var oneminustwotau = 0.2;

class heat_transfer {
  constructor() {
    tau = Math.min(specificparameter, 0.5);
    oneminustwotau = 1.0 - 2.0* tau;
  }

  init_state = "random";
  compute_draw_ratio = 50;

  transition(position) {
    var s = state[position];
    var ln = s;

    if (position <= 0) {
      ln = 0;
    } else {
      ln = state[position - 1];
    }
    var rn = s;
    if (position >= state.length - 2) {
      rn = 0;
    } else {
      rn = state[position + 1];
    }
    var scaling = [tau, 1 - 2.0 * tau]; //  heat_transfer_scaling[specificparameter%2];

    // return Math.round(Math.min(255,Math.max(0,(ln + rn)*scaling[0] + s*scaling[1]) )); // / (2*scaling[0] + scaling[1]))
    return Math.round(100*Math.min(255, Math.max(0, (ln + rn) * tau + s * oneminustwotau)))/100.0;
  }

  // to illustrate heat we use blue to red, in rgb. If the state range is changed, scaling might be needed here.
  get_color(state) {
    var roundedstate = Math.round(state)
    return (
      "#" +
      ("00" + roundedstate.toString(16)).slice(-2) +
      "00" +
      ("00" + (255 - roundedstate).toString(16)).slice(-2)
    );
  }

  initial_state() {
    var state = [];
    var i = 0;
    for (i = 0; i < init_size; i++) {
      state.push(0);
    }
    var hostspot_width = Math.round(init_size / 4);
    var hotspot_middle = Math.round(init_size / 2);
    if (this.init_state == "random")
      { // from a physical standpoint, random init does not make much sense
        for (i = 0; i < init_size; i++) 
          {state[i] = Math.round(Math.random(255));} 
        hotspot_width = 0; // avoid overwrite
        
      }else if (this.init_state[0] == "h" ) {
        var hotspot_width_as_as_string = this.init_state.substring(1);
        hostspot_width = Number(hotspot_width_as_as_string);
      }
    for (
      i = Math.max(0, hotspot_middle - hostspot_width);
      i < Math.min(init_size - 1, hotspot_middle + hostspot_width-1);
      i++
    ) {
      state[i] = 255;
    }
    return state;
  }
}
