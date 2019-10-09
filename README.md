# typer.js
Small typewriter effect with timing functions and reverse option.

```
var options = {
  element: null,
  //REQUIRED. The HTMLElement with text content to recieve the typing effect
  
  speed : 200,
  //speed in ms for which text is typed
  
  delayStart : 300,
  //delay in ms before step 1 starts
  
  delayEnd : 300,
  //delay in ms before continuing with step 2
  
  erase : false,
  //erases instead of typing as step 1
  
  reverse : false,
  //writes or erases text as step 2 depending on if step 1 writes or erases
  
  eraseSpeed : 100,
  //speed in ms for which text is erased
  
  markerStyle : 'none',
  //appends text with character. available styles: 'none', 'line', 'underscore'
  
  freezeText : false,
  //not yet implemented
}
  
var myTyper = new Typer({element: document.querySelector('#myelement')});
myTyper.init();
 ```
