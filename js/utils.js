(function (undefined) {

    /**
     * Countdown timer.
     * 
     * @example // creating a coundown, at stage start.
     * var currentCountDown = createCountDown(30000); 
     * // returns  30 seconds countdown.
     * During the game, use with :
     * var countDownValue = currentCountDown(); 
     * // rerturns  in ms.
     */
    var createCountDown = function (timeRemaining) {
        var startTime = Date.now();
 
        return function() {
           return timeRemaining - ( Date.now() - startTime );
        }
    }


    /**
     * Self-adjusting timer
     * EX: Anim an objet over 5 seconds at 20 frames/second
     * @usage: doTimer(5000, 20, function(steps) {
     *       opacity           = opacity - (1 / steps);
     *       img.style.opacity = opacity;
     *   }
     * http://www.sitepoint.com/creating-accurate-timers-in-javascript/
     */ 
    
    var doTimer = function (length, resolution, oninstance, oncomplete) {
        var steps = (length / 100) * (resolution / 10),
            speed = length / steps,
            count = 0,
            start = new Date().getTime();

        function instance() {
            if (count++ == steps) {
                oncomplete(steps, count);
            }
            else {
                oninstance(steps, count);

                var diff = (new Date().getTime() - start) - (count * speed);
                window.setTimeout(instance, (speed - diff));
            }
        }
        window.setTimeout(instance, speed);
    }

})();