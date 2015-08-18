(function() {
    'use strict';

    /**
     * TODO: Probably need a trigger timespawn for settings traps
     * Obj to get / set current values for the each room.
     * @property {string} stillUrl    - Background image when room is empty.
     * @property {bool}   bCanCatch   - Is there a character who can be caught in the scene?
     * @property {float}  time        - Current time stamp when curUrl is being set.
     * @property {float}  catchTime   - When can the user catch an auger? 
     * @property {sting}  curUrl      - Url should be set as video.src() right now.
     * @property {string} nextUrl     - NextUrl to be set as video.src() when curUrl finishes.
     * @property {string} trapUrl     - If a character can be trapped in the scene, have it trigger this Url. 
     */
    var room = {
        hallOne: {
            stillUrl: 'img/stills/HALL-ONE_1.JPG',

            bCanCatch: true,
            getCanCatch () {
                return this.bCanCatch;
            },
            setCanCatch (val) {
                this.bCanCatch = val;
            },

            time: 0,
            getTime: function() {
                return this.time;
            },
            setTime: function(val) {
                this.time      = val;
            },

            catchTime: 0,
            getCatchTime () {
                return this.catchTime;
            },
            setCatchTime (val) {
                this.catchTime = val;
            },

            curUrl: '',
            getCurUrl () {
                return this.curUrl;
            },
            setCurUrl (val) {
                this.curUrl    = val;
            },

            nextUrl: '',
            getNextUrl() {
                return this.nextUrl;
            },
            setNextUrl (val) {
                this.nextUrl   = val;
            },

            trapUrl: '',
            getTrapUrl () {
                return this.trapUrl;
            },
            setTrapUrl (val) {
                this.trapUrl   = val;
            }
        },
        kitchen: {
            stillUrl: 'img/stills/KITCHEN_1.JPG',

            bCanCatch: true,
            getCanCatch () {
                return this.bCanCatch;
            },
            setCanCatch (val) {
                this.bCanCatch = val;
            },

            time: 0,
            getTime: function() {
                return this.time;
            },
            setTime: function(val) {
                this.time      = val;
            },

            catchTime: 0,
            getCatchTime () {
                return this.catchTime;
            },
            setCatchTime (val) {
                this.catchTime = val;
            },

            curUrl: '',
            getCurUrl () {
                return this.curUrl;
            },
            setCurUrl (val) {
                this.curUrl    = val;
            },

            nextUrl: '',
            getNextUrl() {
                return this.nextUrl;
            },
            setNextUrl (val) {
                this.nextUrl   = val;
            },

            trapUrl: '',
            getTrapUrl () {
                return this.trapUrl;
            },
            setTrapUrl (val) {
                this.trapUrl   = val;
            }
        },
        entryway: {
            stillUrl: 'img/stills/Entry-Way-1.JPG',

            bCanCatch: true,
            getCanCatch () {
                return this.bCanCatch;
            },
            setCanCatch (val) {
                this.bCanCatch = val;
            },

            time: 0,
            getTime: function() {
                return this.time;
            },
            setTime: function(val) {
                this.time      = val;
            },

            catchTime: 0,
            getCatchTime () {
                return this.catchTime;
            },
            setCatchTime (val) {
                this.catchTime = val;
            },

            curUrl: '',
            getCurUrl () {
                return this.curUrl;
            },
            setCurUrl (val) {
                this.curUrl    = val;
            },

            nextUrl: '',
            getNextUrl() {
                return this.nextUrl;
            },
            setNextUrl (val) {
                this.nextUrl   = val;
            },

            trapUrl: '',
            getTrapUrl () {
                return this.trapUrl;
            },
            setTrapUrl (val) {
                this.trapUrl   = val;
            }
        },
        livingRoom: {
            stillUrl: 'img/stills/Living-Room_1.JPG',

            bCanCatch: true,
            getCanCatch () {
                return this.bCanCatch;
            },
            setCanCatch (val) {
                this.bCanCatch = val;
            },

            time: 0,
            getTime: function() {
                return this.time;
            },
            setTime: function(val) {
                this.time      = val;
            },

            catchTime: 0,
            getCatchTime () {
                return this.catchTime;
            },
            setCatchTime (val) {
                this.catchTime = val;
            },

            curUrl: '',
            getCurUrl () {
                return this.curUrl;
            },
            setCurUrl (val) {
                this.curUrl    = val;
            },

            nextUrl: '',
            getNextUrl() {
                return this.nextUrl;
            },
            setNextUrl (val) {
                this.nextUrl   = val;
            },

            trapUrl: '',
            getTrapUrl () {
                return this.trapUrl;
            },
            setTrapUrl (val) {
                this.trapUrl   = val;
            }
        },
        bathroom: {
            stillUrl: 'img/stills/HALL-ONE_1.JPG',

            bCanCatch: true,
            getCanCatch () {
                return this.bCanCatch;
            },
            setCanCatch (val) {
                this.bCanCatch = val;
            },

            time: 0,
            getTime: function() {
                return this.time;
            },
            setTime: function(val) {
                this.time      = val;
            },

            catchTime: 0,
            getCatchTime () {
                return this.catchTime;
            },
            setCatchTime (val) {
                this.catchTime = val;
            },

            curUrl: '',
            getCurUrl () {
                return this.curUrl;
            },
            setCurUrl (val) {
                this.curUrl    = val;
            },

            nextUrl: '',
            getNextUrl() {
                return this.nextUrl;
            },
            setNextUrl (val) {
                this.nextUrl   = val;
            },

            trapUrl: '',
            getTrapUrl () {
                return this.trapUrl;
            },
            setTrapUrl (val) {
                this.trapUrl   = val;
            }
        },
        bedroom: {
            stillUrl: 'img/stills/BEDROOM_1.JPG',

            bCanCatch: true,
            getCanCatch () {
                return this.bCanCatch;
            },
            setCanCatch (val) {
                this.bCanCatch = val;
            },

            time: 0,
            getTime: function() {
                return this.time;
            },
            setTime: function(val) {
                this.time      = val;
            },

            catchTime: 0,
            getCatchTime () {
                return this.catchTime;
            },
            setCatchTime (val) {
                this.catchTime = val;
            },

            curUrl: '',
            getCurUrl () {
                return this.curUrl;
            },
            setCurUrl (val) {
                this.curUrl    = val;
            },

            nextUrl: '',
            getNextUrl() {
                return this.nextUrl;
            },
            setNextUrl (val) {
                this.nextUrl   = val;
            },

            trapUrl: '',
            getTrapUrl () {
                return this.trapUrl;
            },
            setTrapUrl (val) {
                this.trapUrl   = val;
            }
        },
        hallTwo: {
            stillUrl: 'img/stills/HALL-TWO_1.JPG',

            bCanCatch: true,
            getCanCatch () {
                return this.bCanCatch;
            },
            setCanCatch (val) {
                this.bCanCatch = val;
            },

            time: 0,
            getTime: function() {
                return this.time;
            },
            setTime: function(val) {
                this.time      = val;
            },

            catchTime: 0,
            getCatchTime () {
                return this.catchTime;
            },
            setCatchTime (val) {
                this.catchTime = val;
            },

            curUrl: '',
            getCurUrl () {
                return this.curUrl;
            },
            setCurUrl (val) {
                this.curUrl    = val;
            },

            nextUrl: '',
            getNextUrl() {
                return this.nextUrl;
            },
            setNextUrl (val) {
                this.nextUrl   = val;
            },

            trapUrl: '',
            getTrapUrl () {
                return this.trapUrl;
            },
            setTrapUrl (val) {
                this.trapUrl   = val;
            }
         },
        driveway: {
            stillUrl: 'img/stills/Driveway_1.JPG',

            bCanCatch: true,
            getCanCatch () {
                return this.bCanCatch;
            },
            setCanCatch (val) {
                this.bCanCatch = val;
            },

            time: 0,
            getTime: function() {
                return this.time;
            },
            setTime: function(val) {
                this.time      = val;
            },

            catchTime: 0,
            getCatchTime () {
                return this.catchTime;
            },
            setCatchTime (val) {
                this.catchTime = val;
            },

            curUrl: '',
            getCurUrl () {
                return this.curUrl;
            },
            setCurUrl (val) {
                this.curUrl    = val;
            },

            nextUrl: '',
            getNextUrl() {
                return this.nextUrl;
            },
            setNextUrl (val) {
                this.nextUrl   = val;
            },

            trapUrl: '',
            getTrapUrl () {
                return this.trapUrl;
            },
            setTrapUrl (val) {
                this.trapUrl   = val;
            }
        }
    };

    /**
     * Obj to get / set current values for the game.
     * @property {string} stillUrl      - Background image when room is empty.
     * @property {bool}   bCanCatch     - Is there a character who can be caught in the scene?
     * @property {float}  urlChangeTime - Time into the game should curUrl should be set.  
     * @property {float}  time          - Current time stamp when curUrl is being set. 
     * @property {float}  catchTime     - When can the user catch an auger?
     * @property {sting}  curUrl        - Url should be set as video.src() right now.
     * @property {string} nextUrl       - NextUrl to be set as video.src() when curUrl finishes.
     * @property {string} trapUrl       - If a character can be trapped in the scene, have it trigger this Url. 
     */
    var current = {
        stillUrl: '',
        getStillUrl () {
            return this.stillUrl;
        },
        setStillUrl (val) {
            this.stillUrl = val;
        },

        bCanCatch: true,
        getCanCatch () {
            return this.bCanCatch;
        },
        setCanCatch (val) {
            this.bCanCatch = val;
        },

        time: 0,
        getTime () {
            return this.time;
        },
        setTime (val) {
            this.time = val;
        },

        urlChangeTime: 0,
        getUrlChangeTime: function() {
            return this.urlChangeTime;
        },
        setUrlChangeTime: function(val) {
            this.urlChangeTime = val;
        },

        catchTime: 0,
        getCatchTime () {
            return this.catchTime;
        },
        setCatchTime (val) {
            this.catchTime = val;
        },

        curUrl: '',
        getCurUrl () {
            return this.curUrl;
        },
        setCurUrl (val) {
            this.curUrl = val;
        },

        nextUrl: '',
        getNextUrl() {
            return this.nextUrl;
        },
        setNextUrl (val) {
            this.nextUrl = val;
        },

        trapUrl: '',
        getTrapUrl () {
            return this.trapUrl;
        },
        setTrapUrl (val) {
            this.trapUrl = val;
        }
    };

    // Can we hit the switch cam button again?
    var bCanListen             = {
        bool: true,
        get () {
            return this.bool;
        },
        set (val) {
            this.bool          = val;
        }
    };

    /**
     * How many augers has the user caught?
     */
    var nTotalCaught           = {
        caught: 0,
        get () {
            return this.caught;
        },
        set (val) {
            this.caught        = val;
        },
        increment () {
            this.caught ++;
        }
    };

    /**
     * How many augers has the user missed?
     */
    var nTotalMissed           = {
        missed: 0,
        get () {
            return this.missed;
        },
        set (val) {
            this.missed        = val;
        },
        increment () {
            this.missed ++;
        }
    };

    // Timer to keep track of user's time spent in-game
    var nTimeStart             = new Date();
    // Audio element for SFX, passwords, and noises during stills
    var audioElem              = null;
    // Are we in Debug mode?
    var bDebug                 = true;
    var timerElem              = document.getElementById('timer');
    var video                  = null;   

    /**
     * @property {string}   passwords       - List of potential passwords
     * @property {string}   sCurUserPass    - Which password does the user currently have?
     * @property {string}   sCurPass        - Password which is currently correct.
     * @property {function} generateRanPass - Creates a random password from the password list
     */
    var password = {
        passwords: {
            Purple: 'Purple',
            Blue:   'Blue  ',
            Red:    'Red   ',
            Green:  'Green ',
            Yellow: 'Yellow',
            Orange: 'Orange'
        },

        sCurUserPass: {
            pass: 'Blue',
            get () {
                return this.pass;
            },
            set (val) {
                this.pass = val;
            }
        },

        curPass: 'Blue',
        generateRanPass () {
            //TODO: Fill this in
        }
    };

 // Path to SFX
    var aAudioClips            = {
          change   : 'sfx/CHANGE.mp3'
        , crickets : 'sfx/CRICK2.mp3'
        , frogs    : 'sfx/FROG2.mp3 '
        , denied   : 'sfx/DENIED.mp3'
    };

    /* Temp videos for testing playback */
    var aTempLocal             = [
        'video/00180291.mp4',
        'video/00352291.mp4',
        'video/00431292.mp4'
    ];

    /* 0 | 1 Opening & General */
    var camMisc                = {
        DPWORLDD: '',
        // Intro briefing
        c11: 'https://nighttrap.blob.core.windows.net/vid/intro/00000011-Intro.mp4'
    };

    /* 2 - Hall-1 */
    var camHallOne             = {
         // Augers enter through back door, walk to basement
          c21:      'https://nighttrap.blob.core.windows.net/vid/hallone/00000021.mp4'
        // TRAP: Augers caught in hall
        , c130422:  'https://nighttrap.blob.core.windows.net/vid/hallone/00130422.mp4'
        // Tony, Jeff, & Dad enter from basement
        , c1152221: 'https://nighttrap.blob.core.windows.net/vid/hallone/02500221.mp4'
    };

    /* 3 - Kitchen */
    var camKitchen             = {
         // 1 Auger walks in from Entry. Can catch at 4 Sec
          c1200431: 'https://nighttrap.blob.core.windows.net/vid/kitchen/01200431.mp4'
        // 1 Auger caught in kitchen when trying to access fridge
        , c1240632: 'https://nighttrap.blob.core.windows.net/vid/kitchen/01240632.mp4'
        // Tony, Jeff, & Dad enter from Hall-1, talk to parents
        , c1481231: 'https://nighttrap.blob.core.windows.net/vid/kitchen/01481231.mp4'
    };

    /* 4- Living-Room */
    var camLivingRoom          = {
         // Augers enter from outside
          c232241:  'https://nighttrap.blob.core.windows.net/vid/livingroom/00232241.mp4'
        // TRAP: Augers caught on bookshelf
        , c271442:  'https://nighttrap.blob.core.windows.net/vid/livingroom/00271442.mp4'
        // Augers Escape
        , c271641:  'https://nighttrap.blob.core.windows.net/vid/livingroom/00271641.mp4'
        // TRAP: Auger caught on library 
        , c554164a: 'https://nighttrap.blob.core.windows.net/vid/livingroom/0554164a.mp4'
        // 2 Augers enter from outside
        , c1001241 :'https://nighttrap.blob.core.windows.net/vid/livingroom/01001241.mp4'
        // TRAP: Augers caught on right side of living room
        , c1071042: 'https://nighttrap.blob.core.windows.net/vid/livingroom/01071042.mp4'
        // Mom enters from bookshelf
        , c1572241: 'https://nighttrap.blob.core.windows.net/vid/livingroom/01572241.mp4'
    };

    /* 5 - Driveway */
    var camDriveway            = {
        //  Girls enter the driveway, meet eddy, walk in. Can catch at ~6 Sec.
          c1440451: 'https://nighttrap.blob.core.windows.net/vid/driveway/01440451.mp4'
        // TRAP: Launching auger from roof
        , c1502452: 'https://nighttrap.blob.core.windows.net/vid/driveway/01502452.mp4'
    };

    /* 6 - Entryway */
    var camEntryway            = {
        // 1 Auger walks in from beneath stairs. Looks outside. Can be caught
          c1320261: 'https://nighttrap.blob.core.windows.net/vid/entryway/01320261.mp4'
        // 1 Auger caught in �entryway
        , c1391862: 'https://nighttrap.blob.core.windows.net/vid/entryway/01391862.mp4'
        // Sarah enters from closet, parents enter, augers can be trapped on stairs
        , c2122461: 'https://nighttrap.blob.core.windows.net/vid/entryway/02122461.mp4'
        // 
        , c2500221: 'https://medianighttrap.blob.core.windows.net/asset-e41e435d-1500-80c4-3ba5-f1e52dbb97ae/02500221.mp4?sv=2012-02-12&sr=c&si=f34e6bd8-dbe4-464f-b0f8-2b16c61fcecd&sig=DretusvijWM7WVsXbipYK6W%2FBjEHDn9jXwsxg8%2F3zyE%3D&st=2015-07-19T02%3A18%3A59Z&se=2115-06-25T02%3A18%3A59Z'
    };

    /* 7 - Hall-2 */
    var camHallTwo             = {
        // Auger enters hall 2 from bedroom
          c310471: 'https://nighttrap.blob.core.windows.net/vid/halltwo/00310471.mp4'
        // Auger walks in from Bathroom.
        , c500271: 'https://nighttrap.blob.core.windows.net/vid/halltwo/00500271.mp4'
        // Auger caught in hall trap
        , c542272: 'https://nighttrap.blob.core.windows.net/vid/halltwo/00542272.mp4'
        // Augers enters from bedroom, goes down stairs
        , c2390671: 'https://nighttrap.blob.core.windows.net/vid/halltwo/02390671.mp4'
    };

    /* 8 - Bedroom */
    var camBedroom             = {
        //Sarah staring at mirror, 3 augers enter two go to bathroom one to hall-2
           c81:    'https://nighttrap.blob.core.windows.net/vid/bedroom/00000081.mp4'
        // TRAP: Augers caught�
        , c130422: 'https://medianighttrap.blob.core.windows.net/asset-e41e435d-1500-80c4-a05f-f1e52dbb857e/00130422.mp4?sv=2012-02-12&sr=c&si=681815ff-ed6f-4acf-861c-3886316945ee&sig=vUMKUifi5f3Pcj7WlVQqy4R0FYJ6AF9%2BjPQXbdMaONc%3D&st=2015-07-19T02%3A18%3A44Z&se=2115-06-25T02%3A18%3A44Z'
        // TRAP: 1 Auger is caught, other walks into bathroom
        , c352482: 'https://nighttrap.blob.core.windows.net/vid/bedroom/00352482.mp4'
        // Auger walks in from Bathroom, goes out window
        , c540281: 'https://nighttrap.blob.core.windows.net/vid/bedroom/00540281.mp4'
    };

    /* 9 - Bathroom */
    var camBathroom            = {
        // Sarah enters bathroom from bedroom. Enters mirror
          c180291:   'https://nighttrap.blob.core.windows.net/vid/bathroom/00180291.mp4'
        // 2 Augers enter bathroom from bedroom, 1 catchable
        , c352291:   'https://nighttrap.blob.core.windows.net/vid/bathroom/00352291.mp4'
        // TRAP: 1 Auger is caught, other walks into mirror
        , c430249b: 'https://nighttrap.blob.core.windows.net/vid/bathroom/0430249b.mp4'
        // TRAP: Auger caught on scale trap
        , c431292:   'https://nighttrap.blob.core.windows.net/vid/bathroom/00431292.mp4'
        // Auger walks in from Hall-2, walks toward bedroom
        , c480291:   'https://nighttrap.blob.core.windows.net/vid/bathroom/00480291.mp4'
        // TRAP: Auger caught in floor trap
        , c500291:   'https://nighttrap.blob.core.windows.net/vid/bathroom/00500291.mp4'
    };

    /**
     * Wires up event handlers for buttons.
     * Sets src property for video player and sets reference to audio tag
     */
    var init                   = function () {
        toggleRoomButton();
        initializeAudio();
        initializeVideoStream();
        MainLoop.setUpdate(update).setDraw(draw).start();
    };


    /**
     * Room buttons now changeVideoStream() when clicked.
     */
    var toggleRoomButton      = function () {

        if (bCanListen.get()  === true) { 
            document.getElementById('Hall-1'     ).addEventListener(   'click', changeVideoStream, false);
            document.getElementById('Kitchen'    ).addEventListener(   'click', changeVideoStream, false);
            document.getElementById('Entry-Way'  ).addEventListener(   'click', changeVideoStream, false);
            document.getElementById('Living-Room').addEventListener(   'click', changeVideoStream, false);
            document.getElementById('Bathroom'   ).addEventListener(   'click', changeVideoStream, false);
            document.getElementById('Bedroom'    ).addEventListener(   'click', changeVideoStream, false);
            document.getElementById('Hall-2'     ).addEventListener(   'click', changeVideoStream, false);
            document.getElementById('Driveway'   ).addEventListener(   'click', changeVideoStream, false);
        } else {
            document.getElementById('Hall-1'     ).removeEventListener('click', changeVideoStream, false);
            document.getElementById('Kitchen'    ).removeEventListener('click', changeVideoStream, false);
            document.getElementById('Entry-Way'  ).removeEventListener('click', changeVideoStream, false);
            document.getElementById('Living-Room').removeEventListener('click', changeVideoStream, false);
            document.getElementById('Bathroom'   ).removeEventListener('click', changeVideoStream, false);
            document.getElementById('Bedroom'    ).removeEventListener('click', changeVideoStream, false);
            document.getElementById('Hall-2'     ).removeEventListener('click', changeVideoStream, false);
            document.getElementById('Driveway'   ).removeEventListener('click', changeVideoStream, false);
        }
    };


    /**
     * Converts seconds to "MM:SS"
     * @param {float} seconds - Takes seconds and returns it in string format of MM:SS for on screen timer
     */
    var secondsToTimeString   = function (seconds) {

        var s                 = Math.floor(seconds % 60);
        var m                 = Math.floor((seconds * 1000 / (1000 * 60)) % 60);
        var strFormat         = 'MM:SS';

        if (s < 10) s         = '0' + s;
        if (m < 10) m         = '0' + m;

        strFormat             = strFormat.replace(/MM/, m);
        strFormat             = strFormat.replace(/SS/, s);

        return strFormat;
    };


    /**
     * Place in update() to get total time since user has started game.
     */
    var elapsedTime           = function () {
        var end               = new Date();
        var elapsedMS         = end.getTime() - nTimeStart.getTime();
        var seconds           = Math.round(elapsedMS / 1000);
        var minutes           = Math.round(seconds   /   60);

        current.setTime(seconds);
    };


    /**
     * Draws current time on screen at 'timer' element.
     */
    var updateTimeOnScreen    = function () {
        timerElem.innerHTML = secondsToTimeString(current.getTime());
    };


    /**
     * Update loop for checking when to change video scenes 
     * @param {float} delta - The amount of time since the last update, in seconds
     */
    var update                = function (delta) {
        elapsedTime();
        updateTimeOnScreen();
        eventsHallOne();
        calcCatchTime(current.getCatchTime()); // TODO: Does this need to happen each frame?
    };


    /**
     * Check if browser supports audio -- if not, create a new window & tell user to update
     */
    var initializeAudio       = function () {
        audioElem             = document.getElementById('audio-tag');
        if (!Modernizr.audio) {
            window.open('http://outdatedbrowser.com/en', '_blank');
        }
    };


    /**
     * Check if browser supports audio -- if not, tell user to update
     * Loads video as soon as page loads for Video.js player.
     * Disable right-click controls for video player. Cannot reference videoJs directly, event listener
     * does not work.
     */
    var initializeVideoStream = function () {
        video                 = videojs('video-player');
        if (!Modernizr.video) {
            window.open('http://outdatedbrowser.com/en', '_blank');
        }
        if (bDebug) {
            //video.src([{ type: 'video/mp4', src: camMisc.c11 }]);
            video.src([{ type: 'video/mp4', src: aTempLocal[0]}]);
            video.load();
            video.play();
        } else {
            video.src([{ type: 'video/mp4', src: camMisc.c11 }]);
            video.load();
            video.play();
        }

        document.getElementById('video-player').addEventListener('contextmenu', function(e) {
            e.preventDefault();
        }, false);
    };
   
    /**
     * Draws the GUI to the screen
     * @param {float} interpolationPercentage - How much to interpolate between frames.
     */
    var draw                  = function (interpolatePercentage) {
        // Do I really need this? 
    };


    /**
     * When user selects a room, this takes the current values from the room and applies them to the current object.
     * createVideoSeries is called after properties have been set.
     */
    var changeVideoStream     = function () {
            bCanListen.set(false); //TODO: May need to set this to true somewhere else...
            toggleRoomButton();

            switch (this.id) {
                case 'Hall-1':
                    current.setCurUrl       (room.hallOne.getCurUrl     ());
                    current.setNextUrl      (room.hallOne.getNextUrl    ());
                    current.setTrapUrl      (room.hallOne.getTrapUrl    ());
                    current.setCatchTime    (room.hallOne.getCatchTime  ());
                    current.setCanCatch     (room.hallOne.getCanCatch   ());
                    current.setUrlChangeTime(room.hallOne.getTime       ());
                    current.setStillUrl     (room.hallOne.stillUrl        );
                    break;
                case 'Kitchen':
                    current.setCurUrl       (room.kitchen.getCurUrl     ());
                    current.setNextUrl      (room.kitchen.getNextUrl    ());
                    current.setTrapUrl      (room.kitchen.getTrapUrl    ());
                    current.setCanCatch     (room.kitchen.getCanCatch   ());
                    current.setUrlChangeTime(room.kitchen.getTime       ());
                    current.setStillUrl     (room.kitchen.stillUrl        );
                    break;
                case 'Entry-Way':
                    current.setCurUrl       (room.entryway.getCurUrl    ());
                    current.setNextUrl      (room.entryway.getNextUrl   ());
                    current.setTrapUrl      (room.entryway.getTrapUrl   ());
                    current.setCanCatch     (room.entryway.getCanCatch  ());
                    current.setUrlChangeTime(room.entryway.getTime      ());
                    current.setStillUrl     (room.entryway.stillUrl       );
                    break;
                case 'Living-Room':
                    current.setCurUrl       (room.livingRoom.getCurUrl  ());
                    current.setNextUrl      (room.livingRoom.getNextUrl ());
                    current.setTrapUrl      (room.livingRoom.getTrapUrl ());
                    current.setCanCatch     (room.livingRoom.getCanCatch());
                    current.setUrlChangeTime(room.livingRoom.getTime    ());
                    current.setStillUrl     (room.livingRoom.stillUrl     );
                    break;
                case 'Bathroom':
                    current.setCurUrl       (room.bathroom.getCurUrl    ());
                    current.setNextUrl      (room.bathroom.getNextUrl   ());
                    current.setTrapUrl      (room.bathroom.getTrapUrl   ());
                    current.setCanCatch     (room.bathroom.getCanCatch  ());
                    current.setUrlChangeTime(room.bathroom.getTime      ());
                    current.setStillUrl     (room.bathroom.stillUrl       );
                    break;
                case 'Bedroom':
                    current.setCurUrl       (room.bedroom.getCurUrl     ());
                    current.setNextUrl      (room.bedroom.getNextUrl    ());
                    current.setTrapUrl      (room.bedroom.getTrapUrl    ());
                    current.setCanCatch     (room.bedroom.getCanCatch   ());
                    current.setUrlChangeTime(room.bedroom.getTime       ());
                    current.setStillUrl     (room.bedroom.stillUrl        );
                    break;
                case 'Hall-2':
                    current.setCurUrl       (room.hallTwo.getCurUrl     ());
                    current.setNextUrl      (room.hallTwo.getNextUrl    ());
                    current.setTrapUrl      (room.hallTwo.getTrapUrl    ());
                    current.setCanCatch     (room.hallTwo.getCanCatch   ());
                    current.setUrlChangeTime(room.hallTwo.getTime       ());
                    current.setStillUrl     (room.hallTwo.stillUrl        );
                    break;
                case 'Driveway':
                    current.setCurUrl       (room.driveway.getCurUrl    ());
                    current.setNextUrl      (room.driveway.getNextUrl   ());
                    current.setTrapUrl      (room.driveway.getTrapUrl   ());
                    current.setCanCatch     (room.driveway.getCanCatch  ());
                    current.setUrlChangeTime(room.driveway.getTime      ());
                    current.setStillUrl     (room.driveway.stillUrl       );
                    break;
            }
        createVideoSeries(current.getCurUrl(), current.getNextUrl(), current.getTrapUrl(), current.getCanCatch(), current.getCatchTime(), current.getStillUrl());
    };


    /**
     * Sets values of this particular room each time current.getTime() matches the case value.
     * Case is equal to the current number of seconds into the game.
     */
    var eventsHallOne         = function () {
          switch (current.getTime()) {
            case 1: 
//                room.hallOne.setCurUrl   (aTempLocal[2]);
//                room.hallOne.setNextUrl  (aTempLocal[0]);
//                room.hallOne.setTrapUrl  (aTempLocal[1]);
//                room.hallOne.setCanCatch (true);
//                room.hallOne.setCatchTime(4);
//                console.log(room.hallOne.getCatchTime());
//                room.hallOne.setTime     (current.getTime());

                room.hallOne.setCurUrl(camHallOne.c21);
                room.hallOne.setNextUrl(null);
                room.hallOne.setTrapUrl(camHallOne.c130422);
                room.hallOne.setCanCatch(true);
                room.hallOne.setCatchTime(13);
                room.hallOne.setTime(current.getTime());
                break;
            case 30:
            
                break;
            default:
            }
    };


    /**
     * Sets values of this particular room each time current.getTime() matches the case value.
     * Case is equal to the current number of seconds into the game.
     */
    var eventsBedroom         = function () {
        switch (current.getTime()) {
            case 1: 
                room.bedroom.setCurUrl  (aTempLocal[2]);   
                room.bedroom.setNextUrl (aTempLocal[0]);   
                room.bedroom.setTrapUrl (aTempLocal[1]);  
                room.bedroom.setCanCatch(true);
                room.bedroom.setTime    (current.getTime());
                break;
            case 30:
            
                break;
            default:
            }
    };



    /**
     * Sets the poster (background) between clips to the room you are currently viewing
     * hasPlayed variable prevents the footage from looping.
     * Second 'ended' event draws poster to screen when 2nd clip has completed
     * @param {string} curVidUrl - Clip with the trap sequence.
     * @param {string} [nextVid] - Trap clips are often have a clip that appears next.
     */
    var createVideoSeries = function (sCurVidUrl, sNextVidUrl, sTrapUrl, bCanCatch, nCatchTime, sStillUrl) {

      console.log(arguments);
        var hasPlayed           = false;
        toggleTrapListener(false);        //TOOD: May be temorarily placed here
        video.poster(sStillUrl);
        playVideo(sCurVidUrl);

      //TODO: CalcCatch Time may handle this in update for us. May be able to delete this and the param
        // Attach event handler so that user can TRY to catch
        if (bCanCatch === true) {
            //calcCatchTime(nCatchTime); //NOTE: May not work here b/c this is only called once, not in update
//            toggleTrapListener(true);
        }

        // Did not catch / no change to catch.....so play next video
        video.on('ended', function() {
            if (hasPlayed       === false) {
                if (sNextVidUrl) {
                    playVideo(sNextVidUrl);

                // Use a still if nextVidUrl does not exist
                } else { 
                    hasPlayed   = true;
                    displayStill();
                }
            };

            // Video has already played, so use a still
            hasPlayed           = true;
            video.on('ended', function () {
                displayStill();
            });
        });
    }; 


    /**
     * Change clips when user hits 'Trap' button
     * Make it unusable again right after you trigger the video
     */
    var trap                  = function () {
        createVideoSeries(current.getTrapUrl(), current.getNextUrl());  
        toggleTrapListener(false);
    };


    /**
     * Have a buffer 1 second before / after catchTime to allow users to try to catch a character.
     * If current.getTime() is between this buffer, then allow user to set the trap.
     * @param {float} nCatchTime - When can the user trigger the trap?
     */
    var calcCatchTime         = function(nCatchTime) {
        var before = nCatchTime - 1;
        var after  = nCatchTime + 1;
  
        if (current.getTime() > before && current.getTime() < after) {
            console.log('can trigger trap');
            toggleTrapListener(true);
        }

    };


    /**
     * Toggles event listener for the trap button on / off
     * @param {bool} bShouldListen - If true, adds listener. If false, removes listener
     */
    var toggleTrapListener    = function (bShouldListen) {
        bShouldListen = typeof 'undefined' ? bShouldListen : false;
        console.log(bShouldListen);     //TODO: Works fine when this is here. When I remove it, stops working. WTH?
        if (bShouldListen       === true) {
            document.getElementById('Trap').addEventListener   ('click', trap);
        } else {
            document.getElementById('Trap').removeEventListener('click', trap);
        }
    };


    /**
     * Still to play when no action occurs. Sets video.src to src so that the still image can be dispayed as a poster
     */
    var displayStill          = function () { 
        video.src(video.src);
        audioElem.src           = aAudioClips.crickets;
        audioElem.play();
        //TODO: Needed to make this audio repeatable again
    };


    /**
     * Useful when viewer enters a room after a video was supposed to have started.
     * Need to apply Math.floor, otherwise Blink throws an error regarding non-finite numbers.
     * Result is then used to set the currentTime on video player. 
     * @param   {float} - caseTime
     * @param   {float} - currentTime
     * @returns {float} - Result Diff b/t nCaseTime, which is set in the Update() method of each room, & nCurrentTime.get().
     */
    var nTimeDiff             = function (caseTime, currentTime) {
        var floorCurrentTime    = Math.floor(currentTime);
        var floorCaseTime       = Math.floor(caseTime   );
        var result              = floorCurrentTime - floorCaseTime;

        return result;
    };


    /**
     * Pauses audio played during stills, sets new video source, & begins to play.
     * @param {string} clipUrl - Address of clip to play.
     */
    var playVideo             = function (urlClip) {
        audioElem.pause();
        video.src(urlClip);
        // TODO: Change param so that it is not ONLY hall one
          var diff                = nTimeDiff(current.getUrlChangeTime(), current.getTime()); 
        video.play();
        video.currentTime(diff);
    };


    /**
     * Plays a sound effect during gameplay. Used for traps, passwords
     * @param {string} clipUrl - Address of clip to play.
     */
    var playSfx               = function (urlClip) {
        audioElem.src           = urlClip;
        audioElem.play();
    };


    init();

})();