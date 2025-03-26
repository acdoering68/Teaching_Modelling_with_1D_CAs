var cellauttype = "OneDTwostates";
var specificparameter = 64;
var rounds = 200;
var init_size = 200;
var  init_state = "hot_spot";

var state = [];


const heat_transfer_scaling = [[1.0,1.0],[1.0,1.5]]

function heat_transfer_transition(position){

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
function heat_transfer_color(state) {
  return  "#" + ('00' + state.toString(16)).slice(-2) + "00" +  ('00' + (255-state).toString(16)).slice(-2);
}


function heat_transfer_initial_state() {
   
   var i=0;
   for ( i = 0; i < init_size; i++) {state.push(0);}
   var hostspot_width = Math.round(specificparameter/2);
   var hotspot_middle = Math.round(init_size/2)
   for (i= Math.max(0,hotspot_middle  - hostspot_width );i<Math.min(init_size-1,hotspot_middle  + hostspot_width);i++)
       {state[i] = 255; }  
}

function draw_generation(gen){
   var bounding_frame = document.getElementById("frame_rectangle")
   var newdot = null;
   for (let i=0;i<init_size;i++)
      {
         newdot = document.createElementNS("http://www.w3.org/2000/svg","rect");
         newdot.setAttribute("width","1")
         newdot.setAttribute("height","1")
         newdot.setAttribute("x",i)
         newdot.setAttribute("y",gen)
         newdot.setAttribute("style","stroke-width:0;fill:"+heat_transfer_color(state[i]));
         bounding_frame.appendChild(newdot)
      }
   


}

function run_and_draw(){

   bounding_frame = document.getElementById("frame_rectangle")

   var current_round = 0;
   

   // set initial state, that could be made way more flexible.
   heat_transfer_initial_state();
   draw_generation(0)
   
   for (current_round = 0; current_round < rounds; current_round++)
       {
         let new_state = [];
         for (let i=0; i< init_size;i++)
         {
            new_state.push(heat_transfer_transition(i));
         }
         state = new_state;
         draw_generation(current_round);

       }


}