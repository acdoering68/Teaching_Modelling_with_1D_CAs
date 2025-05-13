 
var cellauttype = "TwoStates";
var specificparameter = 64;
var rounds = 200;
var init_size = 200;
var  init_state = "hot_spot";
var collect = false;

var state = [];
var collected_states = [];

var save_state_history;  // for export as csv file 


var count_transitions = 0;







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


// from luk2302 on stackoverflow 
function exportToCsv(filename, rows) {
   var processRow = function (row) {
       var finalVal = '';
       for (var j = 0; j < row.length; j++) {
           var innerValue = row[j] === null ? '' : row[j].toString();
           if (row[j] instanceof Date) {
               innerValue = row[j].toLocaleString();
           };
           var result = innerValue.replace(/"/g, '""');
           if (result.search(/("|,|\n)/g) >= 0)
               result = '"' + result + '"';
           if (j > 0)
               finalVal += ',';
           finalVal += result;
       }
       return finalVal + '\n';
   };

   var csvFile = '';
   for (var i = 0; i < rows.length; i++) {
       csvFile += processRow(rows[i]);
   }

   var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
   if (navigator.msSaveBlob) { // IE 10+
       navigator.msSaveBlob(blob, filename);
   } else {
       var link = document.createElement("a");
       if (link.download !== undefined) { // feature detection
           // Browsers that support HTML5 download attribute
           var url = URL.createObjectURL(blob);
           link.setAttribute("href", url);
           link.setAttribute("download", filename);
           link.style.visibility = 'hidden';
           document.body.appendChild(link);
           link.click();
           document.body.removeChild(link);
       }
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
         case "collect":            collect           = value == "true"; break; 
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
   count_transitions = 0;  
   for (current_round = 0; current_round < rounds; current_round++)
       {
         let new_state = [];
         for (let i=0; i< init_size;i++)
         {
            new_state.push(my_cellular_automaton.transition(i));
            count_transitions = count_transitions + 1;
         }
         if (collect)
         {
            collected_states.push(state);
         }
         state = new_state.slice();
         draw_generation(my_cellular_automaton,current_round);
         console.log(count_transitions + " transitions calculated by round" + current_round)

       }
       if (collect)
         {
            collected_states.push(state);
            exportToCsv("run" + cellauttype + ".csv", collected_states)
            
         }



}