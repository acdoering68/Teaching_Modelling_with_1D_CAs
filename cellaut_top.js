console.log("Hi!")

function  run_in_new_window(cellauttype,specificparameter ){

    var w = window.open("./drawing.html");
w.cellauttype = cellauttype;
w.specificparameter = specificparameter;


}
