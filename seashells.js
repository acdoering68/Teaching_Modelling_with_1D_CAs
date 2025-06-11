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

// parameter sets for initialization and 

const seashell21_constants = {
random_a_low : 5,
random_a_high :25,
dra : 0.1,
drb : 0.1,
da : 0.95, // decay activator
db : 0.9 // decay inhibitor

}

const seashelldefault_constants = {

  random_a_low : 0,
random_a_high :255,
dra : 0.0,
drb : 0.0,
da : 1.0, // decay activator
db : 1.0 // decay inhibitor

}


class SeaShells {


    dra = 0.1;
    drb = 0.1;
    da = 1.0;
    db = 1.0;


    constructor(){ 
    this.dra = 0.1;
    this.drb = 0.1;
    this.da = 1.0;
    this.db = 1.0;
    }

    init_state = "random";
    compute_draw_ratio = 100 ;

    equation = "21"

    // the following members reflect the names of the original Basic source code
    

    transition(position){
      // common for  all equations:
      // state state is an array of multiple numbers, for now floats, but I would like to limit the resolution eventually to make the state finite
     
      var ln = state[position];
      var rn = state[position];
      var a = state[position][0];  
      var b = state[position][1];
      var s = state[position][2]; // the code from the book has cases with more than two substances which would require more fields
      var res = [0.0,0.0,0.0];

      // handling edges
      if (position > 0) 
      {
         ln = state[position-1];
      }
      if (position >= state.length-2) 
        {
          rn = state[position+1];
        }
 


      olddecaydiffA = this.dra * a + this.da * (al + state[position+1]);
      olddecaydiffB = this.drb * b + this.db * (bl + a[2, i + 1]);
      switch (equation) {
          case "21":
            res[0] = olddecaydiffA + s * (a * a / b + ba);
            res[1] = olddecaydiffB + s * a * a + bb;
          break;
      }  
      return res;
    }

     initial_state() {
       var i = 0;
       var initc = seashelldefault_constants;
        switch (this.init_state) {
            case "i21":
                initc = seashell21_constants ;
        }
        this.dra = initc.dra;
        this.drb = initc.drb;
        this.da = initc.da;
        this.db = initc.db;
     }


get_color(state) {
       // for a start, only transform the activator to red
       return  "#" + ('00' + (Math.round(state[0]*100)).toString(16)).slice(-2) + "0000"
    }


}