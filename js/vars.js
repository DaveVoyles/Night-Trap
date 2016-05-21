    'use strict';

    /**
     * Allows you to replace console.log(message) in your code with c(message)
     */
    var c = console.log.bind(console);


    /**
     * How many augers has the user captured?
     * How many were possible?
     */
    var traps = {
        nTotalCaptured: {
            captured: 0,
            get: function () {
                return this.captured;
            },
            set: function (val) {
                this.captured        = val;
            },
            increment: function () {
                this.captured += 1;
            }
        },

        nTotalPossible: {
            possible: 0,
            get: function () {
                return this.possible;
            },
            increment: function (val) {
                this.possible        += val;
            }
        }
    };


    var nTotalCaptured           = {
        captured: 0,
        get: function () {
            return this.captured;
        },
        set: function (val) {
            this.captured        = val;
        },
        increment: function () {
            this.captured += 1;
        }
    };

    /**
     * How many augers has the user missed?
     */
    var nTotalMissed = function nTotalMissed () {
        this._missed = 0;
        
        var nTotalMissedPrototype = {
            get: function () {
                return this._missed;
            },
            increment: function (val) {
                this._missed += val;
            }
        };
        return nTotalMissedPrototype;
    };

    /**
     *  Timer to keep track of user's time spent in-game
     */
    var nTimeStart = 0;
    /**
     * Audio element for SFX, passwords, and noises during stills
     */
    var audioElem              = null;
    var bDebug                 = true;
    var timerElem              = document.getElementById('timer'   );
    var passElem               = document.getElementById('pass'    );
    var possibleElem           = document.getElementById('possible');
    var capturedElem           = document.getElementById('captured');
    var video                  = videojs('video-player');

    /**
     * @property {string}   passwords       - List of potential passwords.
     * @property {string}   sCurUserPass    - Which password does the user currently have?
     * @property {string}   sCurPass        - Password which is currently correct.
     * @function            generateRanPass - Creates a random password from the password list.
     * @function            setStyleColor   - Sets the style color on the HTML element 'pass'.
     */
    var password = {
        passwords: {
            Purple: 'PURPLE',
            Blue:   'BLUE  ',
            Red:    'RED   ',
            Green:  'GREEN ',
            Yellow: 'YELLOW',
            Orange: 'ORANGE'
        },
        sfxPath: {
            Purple: 'sfx/',
            Blue:   'sfx/',
            Red:    'sfx/',
            Green:  'sfx/',
            Yellow: 'sfx/',
            Orange: 'sfx/'
        },
        sCurUserPass: {
            pass: 'BLUE',
            get: function () {
                password.setStyleColor();   //TODO:  Should probably move this to set
                return this.pass;
            },
            set: function (val) {
                this.pass = val;
            }
        },
        curPass: 'BLUE',
        generateRanPass:  function () {
            var result;
            var count     = 0;
            var passwords = this.passwords;
            for (var prop in passwords)
                if (passwords.hasOwnProperty(prop))
                    if (Math.random() < 1 / ++count) {
                        result = prop;
                        switch (result) {
                            case Purple:
                                playSfx(sfxPath.Purple);
                                break;
                            case Blue:
                                playSfx(sfxPath.Blue);
                                break;
                            case Red:
                                playSfx(sfxPath.Red);
                                break;
                            case Green:
                                playSfx(sfxPath.Green);
                                break;
                            case Yellow:
                                playSfx(sfxPath.Yellow);
                                break;
                            case Orange:
                                playSfx(sfxPath.Orange);
                                break;
                        }
                    }
            return result;
        },
        setStyleColor: function () {
            switch(this.pass){
                case 'BLUE':
                    passElem.style.color = 'Blue'  ;
                    break;
                case 'PURPLE':
                    passElem.style.color = 'Purple';
                    break;
                case 'RED':
                    passElem.style.color = 'Red'   ;
                    break;
                case 'GREEN':
                    passElem.style.color = 'Green' ;
                    break;
                case 'YELLOW':
                    passElem.style.color = 'Yellow';
                    break;
                case 'ORANGE':
                    passElem.style.color = 'Orange';
                    break;
                default:
                    passElem.style.color = 'Blue'  ;
            }
        }
    };

    /**
     * Without this, the clips will ONLY work with a trap OR update the room when the user is viewing a camera but not doing anything.
     * A check for this bool is done each time we observe the room.
     */
    var bUserSetTrap = false;

    /**
     * Path to SFX
     */ 
    var aAudioClips            = {
          change   : 'sfx/CHANGE.mp3'
        , crickets : 'sfx/CRICK2.mp3'
        , frogs    : 'sfx/FROG2.mp3 '
        , denied   : 'sfx/DENIED.mp3'
    };

    /**
     *  Temp videos for testing playback 
     */
    var aTempLocal = [
        'video/00180291.mp4',
        'video/00352291.mp4',
        'video/00431292.mp4'
    ];
