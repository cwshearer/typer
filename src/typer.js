/**
 * ----Typer----
 * ----by cw----
 * 
 * ABOUT
 * 
 * Types and/or erases text as a typewriter would.
 * Can perform 2 steps.
 * Ignores HTML content such as <span> or <br>, only returns text
 * Targetable by css or js for each state via classes:
 *      init : 'typer-init'         (only briefy applied on init)
        typing : 'typer-typing'     (applied when typing)
        erasing : 'typer-erasing'   (applied when erasing)
        ended : 'typer-ended'       (applied when ended and remains)
        stage1 : 'typer-one'        (applied when performing stage1 regardless if erasing or typing)
        stage2 : 'typer-two'        (applied when performing stage2 regardless if erasing or typing)
 * 
 * 
 * IMPLEMENTATION
 * 
 * 1. prepare options. element is required. rest is optional. default values are:
 *      element: null           (element that holds the text to type)
        speed : 200             (speed in ms for which text is typed)
        delayStart : 300        (delay in ms before step 1 starts)
        delayEnd : 300          (delay in ms before continuing with step 2)
        reverse : false         (re-writes or re-erases text as step 2)
        erase : false           (erases instead of typing as step 1)
        eraseSpeed : 100        (speed in ms for which text is erased)
        markerStyle : 'none'    (appends text with character. available styles: 'none', 'line', 'underscore')
        freezeText : false      (not yet implemented)
 * 2. init and assign options in constructor
 *      var myTyper = new Typer({element: document.querySelector('#myelement'), markerStyle: 'line'});
 *      myTyper.init();
 * 
 *
 */

(function() {
    
    this.Typer = function() {
        
        var typeChars = null;
        var eraseChars = null;
        var typedString = '';
        var eraseString = '';

        var states = {
            init : 'typer-init',
            typing : 'typer-typing',
            erasing : 'typer-erasing',
            ended : 'typer-ended',
            stage1 : 'typer-one',
            stage2 : 'typer-two',
        }

        
        var defaults = {
            element : null,
            speed : 200,
            delayStart : 300,
            delayEnd : 300,
            reverse : false,
            erase : false,
            eraseSpeed : 100,
            markerStyle : 'none',
            freezeText : false
        }

        
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        }

        Typer.prototype.init = function(){
            if(defaults.element){
                typeChars = defaults.element.textContent.split('');
                if(!defaults.erase){
                    defaults.element.innerHTML = "";
                    defaults.element.style.visibility = "visible";
                }
                initSequence();
            }
        }

        var initSequence = function(){
            defaults.element.classList.add(states.init);
            if(defaults.erase){
                if(defaults.markerStyle == 'line'){
                    defaults.element.textContent = (defaults.element.textContent + "|");
                }else if(defaults.markerStyle == 'underscore'){
                    defaults.element.textContent = (defaults.element.textContent + "_");
                }
            }else{
                if(defaults.markerStyle == 'line'){
                    defaults.element.textContent = (typedString + "|");
                }else if(defaults.markerStyle == 'underscore'){
                    defaults.element.textContent = (typedString + "_");
                }
            }
            window.setTimeout(function(){
                if(defaults.erase){
                    initErase();
                }else{
                    initTyping();
                }
                defaults.element.classList.remove(states.init);
                defaults.element.classList.add(states.stage1);
            }, defaults.delayStart);
        }

        var initTyping = function(){
            defaults.element.classList.add(states.typing);
            defaults.element.classList.remove(states.erasing);
            [].forEach.call(typeChars, function(letter, index) {
                setTimeout(function(){
                    typedString = typedString + letter;
                    if(defaults.markerStyle == 'line'){
                        defaults.element.textContent = (typedString + "|");
                    }else if(defaults.markerStyle == 'underscore'){
                        defaults.element.textContent = (typedString + "_");
                    }else{
                        defaults.element.textContent = typedString;
                    }
                    if(typedString.length == typeChars.length){
                        endSequence();
                    }
                }, defaults.speed * index);
            });
        }

        var initErase = function(){
            defaults.element.classList.add(states.erasing)
            defaults.element.classList.remove(states.typing);
            eraseChars = typeChars.reverse();
            typedString = defaults.element.textContent;
            [].forEach.call(typeChars, function(letter, index) {
                setTimeout(function(){
                    eraseChars.shift();
                    eraseString = eraseChars.join('');
                    typedString = eraseString.split("").reverse().join("");
                    if(defaults.markerStyle == 'line'){
                        defaults.element.textContent = (typedString + "|");
                    }else if(defaults.markerStyle == 'underscore'){
                        defaults.element.textContent = (typedString + "_");
                    }else{
                        defaults.element.textContent = typedString;
                    }
                    if(typedString.length < 1){
                        defaults.reverse = false;
                        endSequence();
                    }
                }, defaults.eraseSpeed * index);
            });
        }

        var endSequence = function(){
            defaults.element.classList.remove(states.stage1);
            defaults.element.classList.remove(states.typing);
            defaults.element.classList.remove(states.erasing);
            window.setTimeout(function(){
                if(defaults.reverse && !defaults.erase){
                    initErase();
                    defaults.element.classList.add(states.stage2);
                }else{
                    console.log('ended');
                    defaults.element.classList.remove(states.stage2);
                    defaults.element.classList.add(states.ended);
                }
            }, defaults.delayEnd);
        }

    }

    var extendDefaults = function(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }

    var reverseString = function(s){
        return s.split("").reverse().join("");
    }

}());