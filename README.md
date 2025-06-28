** Teaching Modelling with One-Dimensional Cellular Autoama **
Self-Learning material for Kantonsschulen in German-Speaking Switzerland 
Part of Didaktik der Informatik 1.2 at FHNW (www.fhnw.ch) 
Summer Semester 2025

Cellular Automata are known models for various phenomena in science and nature. 
The students are exposed to the definition of cellular automata and investigate several models. 

The simulation code and visualization is written in Javascript, so the students can 
use any given browser.

Supported models: 
* "elementary", i.e. 2 states, 1D, direct neighbors
* Heat exchange, 256 values, new state is weighted average
* Double Red, turns blue cells into two red cells, 3 states, example for a non-trivial invariance
* various sea shell pattern following the book "The algorithmic beauty of sea shells" by Hans Meinhardt
    For the next two, the educational value is less clear.
* (Planned) reverse pattern
* (Planned) firing squad

* (Planned) Binary addition or comparison

It seems that the first four are already a lot of material. 
In particular for the last two, it is not clear, what extra assignments there are, and 
what the learning value would be.

For modularity the JS module system is not used, because it requires a web server. 
For ease of use it was intended that the whole project can be loaded locally from the file system.

I am thanful for for input on configurations for the Sea Shells. 