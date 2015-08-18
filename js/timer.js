;(function(name, definition, global){
	if (typeof define === 'function'){
		define(definition);
	} else {
		global[name] = definition();
	}
})('Timer', function(){

  /**
   * Simple Timer to use in combination with a render loop. Provides timeout
   * and interval methods as found on window (except for default execution
   * context, see NOTE II).
   *
   * Source: https://raw.githubusercontent.com/jensarps/game-timer/master/timer.js
   * 
   * For games, the built-in timers are not suitable, mainly because of the
   * following two reasons:
   * 1) If you pause the game, the built-in timer won't pause as well.
   * 2) You will want to fire callbacks within your render loop, not somewhere
   *    else.
   * This timer does not maintain it's own clock, so you need to call `update()`
   * in your render loop.
   *
   * NOTE: If you use it w/ Three.js, keep in mind that the delta obtained
   *    by Three.js' clock.getDelta() is in seconds, not milliseconds!
   *
   * NOTE II: This timer, by default, does not modify the execution context of
   *    the callbacks. You can, however pass a context to the set* methods. If
   *    you don't provide a context object, or don't bind the callbacks
   *    yourself, the execution context will be the timer instance!
   *
   * @example
   *    var timer = new Timer();
   *
   *    // setting an interval works like window.setInterval:
   *    var intervalId = timer.setInterval(someFunc, 100);
   *
   *    // to set the execution context, pass a context object:
   *    var intervalId = timer.setInterval(someFunc, 100, someObj);
   *
   *    // or bind your function:
   *    var intervalId = timer.setInterval(someFunc.bind(somObj), 100);
   *
   *    // then, in your render loop:
   *    function render(){
   *
   *      //...
   *
   *      timer.update(delta); // delta needs to be in ms!
   *    }
   *
   *    // clearing also works as expected:
   *    timer.clearInterval(intervalId);
   *
   * @constructor
   */
  var Timer = function(){
    this.id = 0;
    this.map = {};
  };

  Timer.prototype = {

    /**
     * Clears a previously set interval.
     *
     * @param {Number} id The id obtained by `setInterval`
     * @return {Boolean} Whether deletion was successful
     */
    clearInterval: function(id){
      return delete this.map[id];
    },

    /**
     * Clears a previously set timeout.
     *
     * @param {Number} id The id obtained by `setTimeout`
     * @return {Boolean} Whether the deletion was successful
     */
    clearTimeout: function(id){
      return delete this.map[id];
    },

    /**
     * Sets an interval for a function to be executed.
     *
     * @param {Function} callback The function to be called every interval
     * @param {Number} interval The interval, in ms
     * @param {Object} [context] The execution context, optional
     * @return {Number} The id to use for `clearInterval`
     */
    setInterval: function(callback, interval, context){
      context && (callback = callback.bind(context));
      this.map[++this.id] = [callback, interval, 0, true];
      return this.id;
    },

    /**
     * Sets a timeout for a function to be executed.
     *
     * @param {Function} callback The function to be called after timeout
     * @param {Number} timeout The timeout, in ms
     * @param {Object} [context] The execution context, optional
     * @return {Number} The id to use for `clearTimeout`
     */
    setTimeout: function(callback, timeout, context){
      context && (callback = callback.bind(context));
      this.map[++this.id] = [callback, timeout, 0];
      return this.id;
    },

    /**
     * Updates the timer and checks if a function call is due. Call this method
     * in your render loop and pass the delta in ms to it.
     *
     * @param {Number} delta The elapsed delta, in ms
     */
    update: function(delta) {
      var func,id, entry;
      for(id in this.map) {
        entry = this.map[id];
        entry[2] += delta;
        if(entry[2] >= entry[1]) {
          func = entry[0];
          if(entry[3]) {
            entry[2] -= entry[1];
          } else {
            delete this.map[id];
          }
          func();
        }
      }
    }
  };

  return Timer;

}, this);