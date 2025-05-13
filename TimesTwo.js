const testdata1 = [0, 0, 1, 2, 2, 2, 2, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 0, 0, 1, 0, 2, 0, 1, 0, 1, 0, 1, 2, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 2, 0, 0, 1, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 0, 1, 1, 1, 0, 0, 1, 2, 0, 0, 2, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 2, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 2, 2, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 2, 2, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 2, 0, 0, 0, 0, 0, 1, 1, 1, 0, 2, 2, 0, 1, 1];

class TimesTwo {

    constructor() { }

    transition(position) {
        var s = state[position];
        var ln = s;
        var rn = s;
        var res = s; // default: state unchanged
        ln = (position <= 0) ? 0 : state[position - 1];
        rn = (position >= state.length - 2) ? 0 : rn = state[position + 1];

        if (ln == 2 && s == 1) { res = 2; }
        else if (s == 2 && rn == 1) { res = 1; }

        else if (s == 2 && rn == 0) { res = 1; }
        else if (s == 0 && ln == 2) { res = 1; }

        return res;
    }

    get_color(state) {
        if (state <= 0) { return "#ffffff"; }
        if (state == 1) { return "#ff0000"; }
        if (state >= 2) { return "#0000ff"; }
        // when adding states change to == 2, and add new colors here

    }

    initial_state() {
        var i = 0;
        switch (init_state) {
            case "random":
                for (i = 0; i < init_size; i++) { state.push(Math.round(3.0 * Math.random() - 0.5)); }
                break;
            case "test1":
                state = testdata1;
                break;
            case "blocks":
                for (i = 0; i < init_size; i++) { state.push((i < init_size / 4) ? 2 : ((i < init_size / 2) ? 1 : 0)); }
        };

    }
}