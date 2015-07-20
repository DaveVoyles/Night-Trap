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



    // http://stackoverflow.com/questions/16573974/ended-event-videojs-not-working
    //var duration_time = Math.floor(this.duration());

    //    this.on('timeupdate', function() {
    //      var current_time = Math.floor(this.currentTime());

    //      // End of video
    //      if (current_time > 0 && (current_time == duration_time)) {
    //        // Do something
    //      }
    //    });

})();