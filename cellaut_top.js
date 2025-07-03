console.log("Hi!");

function run_in_new_window() {
  var callingparms = "?";

  callingparms =
    callingparms +
    "cellauttype=" +
    document.getElementById("CellAutTypeSelector").value;
  callingparms =
    callingparms +
    "&rounds=" +
    document.getElementById("NumberGenerations").value;
  callingparms =
    callingparms +
    "&specificparameter=" +
    document.getElementById("Extra_Parameter").value;
  callingparms =
    callingparms +
    "&initialization=" +
    document.getElementById("initialization").value;
  callingparms =
    callingparms + "&collect=" + document.getElementById("collect").checked;
  console.log("Invoking with" + callingparms);

  var w = window.open("./drawing.html" + callingparms);
}

function set_init_selection(){
  selected_cellauttype = document.getElementById("CellAutTypeSelector").value;
   init_options = ["random"]; // default, random is always supported
   switch (selected_cellauttype) {
      case "DoubleRed":
      case  "TripleRed":      init_options = ["random","block"];   break;
      case "TwoStates":      init_options = ["random","left"];    break;
      case "Heat":           init_options = [];                   break; // initialization parameter not used
      case "SeaShell":      init_options = ["i21","i21v","i23","student"]; break;
   }
   var input_initialization_list = document.getElementById("initvalues");
   input_initialization_list.innerHTML = '';
   for (initop of init_options) {
      var opt = document.createElement('option');
      opt.value = initop;
      opt.innerHTML = initop;
      input_initialization_list.appendChild(opt);   
   }

}