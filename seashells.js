/*

The code in this file corresponds to the Book "The Algorithmic Beauty of Sea Shells" by Hans Meinhardt, 
Springer 1995.
The book contains a floppy disk (later editions a CD-ROM) with Visual Basic source code 

Only two cases are used here. 

The original code uses multiple floating point variables per cell.
To emphasize the character of a cellular automaton, fixed point is used in the following, i.e. the resolution of the state is defined.

*/

// the basic program used a data statement and read commands
const ixinitlist = [10,22,55,75,115,180,195,240,310,352,375,425,455,555,585,595,630]

class sea_shells {

    constructor(){ 
    }

    init_state = "random";

    // the following members reflect the names of the original Basic source code
    imxl = 641;
    imxl2 = imxl / 2;
    ianzmax = 9; 
    msiluetmax = 500;

    transition(position){
      // common for  all equations:
      // state state is an array of multiple numbers, for now floats, but I would like to limit the resolution eventually to make the state finite
      var a = state[position][0];  
      var b = state[position][0] 
      
      olddecaydiffA = dra * a + da * (al + a(1, i + 1))
      olddecaydiffB = drb * b + db * (bl + a(2, i + 1)
      // equation 2.1 
          a(1, i) = olddecaydiffA + s * (a * a / b + ba)
     a(2, i) = olddecaydiffB + s * a * a + bb
    }

     initial_state() {

      a = []; // will be a two-dimensional array 
      ja = kx;
      js = ky
  
      imxnew = imxl2;
      if (ky > imxnew) 
         {imxnew = imxl}

      for  (i = 1;  i <= imxnew; i++)
         {
         if (pcontrol$ != "II")  {  // II maintains random numbers
                               //'RND: random numbers between 0.0 and 1.0 lead to ?R% fluctuations
                               //  the exclamation mark in numerical constants in the original code force single precision
      a(0, i) = ra * (1.0 + 2 * kr / 100 * (RND - .5)) // 'source density s
      a(8, i) = 1
      a(9, i) = 1 + 2 * kr / 100 * (RND - .5)
      if (ca > 0) {a(0, i) = ca * (1 + 2 * kr / 100 * (RND - .5))}
      }
    a(1, i) = ga //-- initial condition: A is set to GA in all cells
    a(2, i) = gb //-- B to GB etc.
    a(3, i) = gc
    a(4, i) = gd
    a(5, i) = ge
    a(6, i) = gf
    a(7, i) = gg
         }


  switch (this.init_state) {
  
  case "i1": a(1, ja) = aa;
             a(3, ja) = ac; 
             a(5, ja) = ae;
             break;   //left cell
  case "i2": a(1, ja) = aa; 
             a(3, ja) = ac; 
             a(1, js) = aa; 
             a(3, js) = ac;
             a(5, ja) = ae; 
             a(5, js) = ae;
             break;
  case "i3":
     jx = js / 2;
     a(1, jx) = aa;
     a(3, jx) = ac;
      a(5, jx) = ae;  //cell in the centre
      break;
  case "i4":
    while (i > 0) //particular cells are initiated during run-time
       {
        mess = "# of cell to be initially active (A(#) = aa), <return>=stop"
          zeingabe(igt, 0, 1, i, dummy, dummy$, mess$)
        a(1, i) = aa
       } 
  break;     
  case "i5":
  case  "i15":
    for  (i = 1; i <=  17; i++)
       {
        ix =  ixinitlist[i];
    if (ix > js) 
       {break;
       }
    a(1, ix) = aa; 
    a(3, ix) = ac; 
    a(5, ix) = ae;
       }
       if (this.init_state == "i15")
         {
          steppattern();
         }
       break;
  case "i6":  // Random cells are activated at maximum 50 cells distance
    ix = RND * 30
    for (i = 1; i <= 20; i++)
    {
     a(1, ix) = aa; 
     a(3, ix) = ac;
     ix = ix + RND * 40 + 10;
     if (ix > js) {break;}
    }
    break;
  case "i7": //sinusoidal prepattern, used for space-dependent
    amax7 = 0; // '                    substrate production
    for (i = 1; i <=  ky; i++)
    {
      a(8, i) = 1 + dy * (COS((i - k2) * 3.14 / K1)) ^ 2 + i * ab / ky
      if (a(8, i) > amax7) {amax7 = a(8, i)}
    }
    for (i = 1; i <= ky;i++)
      { a(8, i) = a(8, i) / amax7;}
       // Normalization
       //    artificial spatial periodic, stable in time, dy determines
       //     the difference between maxima and minima, K1 the spatial wavelength.
       //    K2 is the phase; AB adds a linear gradient (for Nautilus Pompilius)
       break;
  case "i8": // Exponential gradient in the source density
    for( ix = 1; ix  <=  ky; ix ++) {  a(0, ix) = a(0, ix) * EXP(-ab * (ix - 1));} 
    break;
  case "i9": // a more step-like distribution
   a = steppattern();
  break;
  case 10:  // 'particular cell may function as pace-makers
    a(8, ja) = ab  // 'left cell
    break;
  case "i11":
    a(8, ja) = ab  // left and right cell
    a(8, js) = ab
    break;

        }
        itot = 0; igrowth = 0;
        return a;
      }

  steppattern(){
    a = [];
    i=0;
    for  (i = k2; i <= k4; i++) { a(8, i) = 1 + dy}
    for  (i = K1 + 1; i <= ky; i++){ a(8, i) = a(8, i - K1)} // Repetition after K1 cells
    for  (i = 1; i <= ky; i++)  {a(8, i) = a(8, i) + i * ab / ky}
    for  (ji = 1; ji <= dz; ji++) {
      al = a(8, kx) // smoothing
      for (i = kx; i <=  ky - 1; i++) {a(8, i) = (a(8, i) + a(8, i + 1)) / 2}
      for (i = ky; i >= kx + 1; i--)  {a(8, i) = (a(8, i) + a(8, i - 1)) / 2}
    }
    amax7 = 0 // normalization
    for (i = 1;  i <= ky; i++) {if (a(8, i) > amax7)  {amax7 = a(8, i)}}
    for (i = 1;  i <= ky; i++) {a(8, i) = a(8, i) / amax7} // normalization
  
     }


}