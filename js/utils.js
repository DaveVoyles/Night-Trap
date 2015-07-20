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

})();