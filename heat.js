var tau = 0.2; // 0 < tau < 0.5
const heat_transfer_scaling = [[1.0,1.0],[1.0,1.5]];

class heat_transfer {

    constructor(){
      tau = specificparameter;
      
    }
 
 init_state = "random";
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
 var scaling =   [tau,(1-2.0*tau)];      //  heat_transfer_scaling[specificparameter%2];
 
 return Math.round(Math.min(255,Math.max(0,(ln + rn)*scaling[0] + s*scaling[1]) / (2*scaling[0] + scaling[1]))); 
 }
 
 // to illustrate heat we use blue to red, in rgb. If the state range is changed, scaling might be needed here.
 get_color(state) {
   return  "#" + ('00' + state.toString(16)).slice(-2) + "00" +  ('00' + (255-state).toString(16)).slice(-2);
 }
 
 
 initial_state() {
    var state = [];
    var i=0;
    for ( i = 0; i < init_size; i++) {state.push(0);}
    var hostspot_width = Math.round(init_size/4);
    var hotspot_middle = Math.round(init_size/2)
    for (i= Math.max(0,hotspot_middle  - hostspot_width );i<Math.min(init_size-1,hotspot_middle  + hostspot_width);i++)
        {state[i] = 255; }  
    return state;
 }
 }

