//(function (undefined) {

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


    /**
     * Converts seconds to "MM:SS"
     * @param {number} seconds - Takes seconds and returns it in string format of MM:SS for on screen timer
     */
    var secondsToTimeString = function secondsToTimeString(seconds) {

        var s = Math.floor(seconds % 60);
        var m = Math.floor((seconds * 1000 / (1000 * 60)) % 60);
        var strFormat = 'MM:SS';

        if (s < 10) s = '0' + s;
        if (m < 10) m = '0' + m;

        strFormat = strFormat.replace(/MM/, m);
        strFormat = strFormat.replace(/SS/, s);

        return strFormat;
    };


    /**
     * Formats the timestamp from the excel spreadsheet into a format the switch statement understands. 
     * USAGE: 1:15 from excel is entered as minSecToMin(1, 15) and returns 75.
     * @param   {number} minutes 
     * @param   {number} seconds 
     * @returns {number} conversion from min:sec to a number.  
     */
    var minSecToNum = function minSecToNum(minutes, seconds) {
        var min = minutes || 0;
        var sec = seconds || 0;

        return min * 60 + sec;
    };

//})();