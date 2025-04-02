console.log("Hi!")

function  run_in_new_window( ){


var callingparms = "?";

callingparms = callingparms + "cellauttype=" + document.getElementById("CellAutTypeSelector").value;
callingparms = callingparms + "&rounds=" + document.getElementById("NumberGenerations").value;
callingparms = callingparms + "&specificparameter=" + document.getElementById("Extra_Parameter").value;
callingparms = callingparms + "&initialization=" + document.getElementById("initialization").value;
callingparms = callingparms + "&collect=" + document.getElementById("collect").value;


    var w = window.open("./drawing.html" + callingparms);



}
