var cellauttype = "TwoStates";
var specificparameter = 64;
var rounds = 200;
var init_size = 200;
var  init_state = "hot_spot";

var state = [];

var save_state_history;  // for export as csv file 

const heat_transfer_scaling = [[1.0,1.0],[1.0,1.5]]


class TwoStates {

   // the specific parameter is a number from 0 .. 255, e.g. along Steven Wolfram's "New Kind of Science"
   // for faster evaluation, we create a lookup table of 8 entries
   transition_lookup = [];
   constructor(){
      var pof2 = 1;
      for (let i = 0; i< 8; i++)
      {
         this.transition_lookup.push(Math.round((specificparameter/pof2) %2) );
         pof2 = pof2 *2;
      }
   };

   transition(position){

      var s = state[position];
      var ln = 0;
      var rn = 0; 
      if (position <= 0) 
         {
            ln = 0; 
         }
    else 
         {
            ln = state[position-1];
         }
         if (position >= state.length-2) 
            {
               rn = 0; 
            }
         else 
            {
               rn = state[position+1];
            }

      return this.transition_lookup [4*ln+2*rn+s];
   };

   get_color(state) {
      if (state == 0)
         {
            return "#000000";
         } else
         {
            return "#FFFFFF";
         }  
      }
   initial_state() {
      var i=0;
      for ( i = 0; i < init_size; i++) {state.push(Math.round(Math.random(2)));}
   };

};

class heat_transfer {

   constructor(){}

transition(position){

var s = state[position];
var ln = s;
if (position <= 0) 
     {
        ln = 0; 
     }
else 
     {
        ln = state[position-1];
     }
var rn = s;
if (position >= state.length-2) 
   {
      rn = 0; 
   }
else 
   {
      rn = state[position+1];
   }
var scaling = heat_transfer_scaling[specificparameter%2];

return Math.round(Math.min(255,Math.max(0,(ln + rn)*scaling[0] + s*scaling[1]) / (2*scaling[0] + scaling[1]))); 
}

// to illustrate heat we use blue to red, in rgb. If the state range is changed, scaling might be needed here.
get_color(state) {
  return  "#" + ('00' + state.toString(16)).slice(-2) + "00" +  ('00' + (255-state).toString(16)).slice(-2);
}


initial_state() {
   
   var i=0;
   for ( i = 0; i < init_size; i++) {state.push(0);}
   var hostspot_width = Math.round(specificparameter/2);
   var hotspot_middle = Math.round(init_size/2)
   for (i= Math.max(0,hotspot_middle  - hostspot_width );i<Math.min(init_size-1,hotspot_middle  + hostspot_width);i++)
       {state[i] = 255; }  
}
}

class TimesTwo {

   constructor() {}

   transition(position){
      var s = state[position];
      var ln = s;
      var rn = s;
      var res = s; // default: state unchanged
      ln =  (position <= 0)             ? 0:  state[position-1];
      rn =  (position >= state.length-2)?0:rn = state[position+1];
      
      if (ln==2 && s ==1) { res = 2;}
      if (s==2  && rn==1) { res = 1;}

      if (s==2 && rn==0)  { res = 1;}
      if (s==0 && ln==2)  { res = 1;}

      return  res;
   }  
   
   get_color(state) {
        if (state <= 0) { return "#ffffff";}
        if (state == 1) { return "#0000ff";}
        if (state >= 2) { return "#00ff00";}
        // when adding states change to == 2, and add new colors here
       
   }

   initial_state() {
      // check here for init_state, TBD several pattern  
      var i=0;
      for ( i = 0; i < init_size; i++) {state.push(Math.round(Math.random(3)));}
   }
      
}

function draw_generation(theca,gen){
   var bounding_frame = document.getElementById("frame_rectangle")
   var newdot = null;
   for (let i=0;i<init_size;i++)
      {
         newdot = document.createElementNS("http://www.w3.org/2000/svg","rect");
         newdot.setAttribute("width","1")
         newdot.setAttribute("height","1")
         newdot.setAttribute("x",i)
         newdot.setAttribute("y",gen)
         newdot.setAttribute("style","stroke-width:0;fill:"+theca.get_color(state[i]));
         bounding_frame.appendChild(newdot)
      }
   


}

function run_and_draw(){
   const mySearchParams = new URLSearchParams(window.location.search);

   for (const [key,value] of mySearchParams ) {

      switch (key) {
         case "cellauttype":        cellauttype       = value; break;
         case "rounds":             rounds            = value; break;
         case "specificparameter":  specificparameter = value; break;
         case "initialization":     init_state        = value; break;
      }
   }


   bounding_frame = document.getElementById("frame_rectangle")

   var current_round = 0;
   
   var my_cellular_automaton = null;

   switch(cellauttype) {
      case "Heat": 
      my_cellular_automaton = new heat_transfer();
      break;
      case "TwoStates":
         my_cellular_automaton = new TwoStates();
         break;
      case "DoubleRed": 
      my_cellular_automaton = new TimesTwo();
      break;
   }

   // set initial state, that could be made way more flexible.
   my_cellular_automaton.initial_state();
   draw_generation(my_cellular_automaton,0);
   
   for (current_round = 0; current_round < rounds; current_round++)
       {
         let new_state = [];
         for (let i=0; i< init_size;i++)
         {
            new_state.push(my_cellular_automaton.transition(i));
         }
         state = new_state;
         draw_generation(my_cellular_automaton,current_round);

       }


}