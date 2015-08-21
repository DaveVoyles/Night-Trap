(function() {
    'use strict';

    /**
     * Obj to get / set current values for the each room.
     * @property {string} stillUrl    - Background image when room is empty.
     * @property {bool}   bCanCatch   - Is there a character who can be caught in the scene?
     * @property {float}  time        - Current time stamp when curUrl is being set.
     * @property {float}  catchTime   - When can the user catch an auger? 
     * @property {sting}  curUrl      - Url should be set as video.src() right now.
     * @property {string} nextUrl     - NextUrl to be set as video.src() when curUrl finishes.
     * @property {string} trapUrl     - If a character can be trapped in the scene, have it trigger this Url.
     * @property {bool}   bTrapSpring - Has the user set the trap in this current scene yet?
     */
    var room = {
        hallOne: {
            stillUrl: 'img/stills/HALL-ONE_1.JPG',

            bCanCatch: true,
            getCanCatch: function () {
                return this.bCanCatch;
            },
            setCanCatch: function (val) {
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
            getCatchTime: function () {
                return this.catchTime;
            },
            setCatchTime: function (val) {
                this.catchTime = val;
            },

            curUrl: '',
            getCurUrl: function () {
                return this.curUrl;
            },
            setCurUrl: function (val) {
                this.curUrl    = val;
            },

            nextUrl: '',
            getNextUrl: function () {
                return this.nextUrl;
            },
            setNextUrl: function (val) {
                this.nextUrl   = val;
            },

            trapUrl: '',
            getTrapUrl: function () {
                return this.trapUrl;
            },
            setTrapUrl: function (val) {
                this.trapUrl   = val;
            },

            bTrapSprung: false,
            getTrapSprung: function () {
              return this.bTrapSprung;
            },
            setTrapSprung: function (val){
              this.bTrapSprung = val;
            }
        },
        kitchen: {
            stillUrl: 'img/stills/KITCHEN_1.JPG',

            bCanCatch: true,
            getCanCatch: function () {
              return this.bCanCatch;
            },
            setCanCatch: function (val) {
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
            getCatchTime: function () {
              return this.catchTime;
            },
            setCatchTime: function (val) {
              this.catchTime = val;
            },

            curUrl: '',
            getCurUrl: function () {
              return this.curUrl;
            },
            setCurUrl: function (val) {
              this.curUrl    = val;
            },

            nextUrl: '',
            getNextUrl: function () {
              return this.nextUrl;
            },
            setNextUrl: function (val) {
              this.nextUrl   = val;
            },

            trapUrl: '',
            getTrapUrl: function () {
              return this.trapUrl;
            },
            setTrapUrl: function (val) {
              this.trapUrl   = val;
            },

            bTrapSprung: false,
            getTrapSprung: function () {
              return this.bTrapSprung;
            },
            setTrapSprung: function (val){
              this.bTrapSprung = val;
            }
        },
        entryway: {
            stillUrl: 'img/stills/Entry-Way-1.JPG',

            bCanCatch: true,
            getCanCatch: function () {
              return this.bCanCatch;
            },
            setCanCatch: function (val) {
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
            getCatchTime: function () {
              return this.catchTime;
            },
            setCatchTime: function (val) {
              this.catchTime = val;
            },

            curUrl: '',
            getCurUrl: function () {
              return this.curUrl;
            },
            setCurUrl: function (val) {
              this.curUrl    = val;
            },

            nextUrl: '',
            getNextUrl: function () {
              return this.nextUrl;
            },
            setNextUrl: function (val) {
              this.nextUrl   = val;
            },

            trapUrl: '',
            getTrapUrl: function () {
              return this.trapUrl;
            },
            setTrapUrl: function (val) {
              this.trapUrl   = val;
            },

            bTrapSprung: false,
            getTrapSprung: function () {
              return this.bTrapSprung;
            },
            setTrapSprung: function (val){
              this.bTrapSprung = val;
            }
        },
        livingRoom: {
            stillUrl: 'img/stills/Living-Room_1.JPG',

            bCanCatch: true,
            getCanCatch: function () {
              return this.bCanCatch;
            },
            setCanCatch: function (val) {
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
            getCatchTime: function () {
              return this.catchTime;
            },
            setCatchTime: function (val) {
              this.catchTime = val;
            },

            curUrl: '',
            getCurUrl: function () {
              return this.curUrl;
            },
            setCurUrl: function (val) {
              this.curUrl    = val;
            },

            nextUrl: '',
            getNextUrl: function () {
              return this.nextUrl;
            },
            setNextUrl: function (val) {
              this.nextUrl   = val;
            },

            trapUrl: '',
            getTrapUrl: function () {
              return this.trapUrl;
            },
            setTrapUrl: function (val) {
              this.trapUrl   = val;
            },

            bTrapSprung: false,
            getTrapSprung: function () {
              return this.bTrapSprung;
            },
            setTrapSprung: function (val){
              this.bTrapSprung = val;
            }
        },
        bathroom: {
            stillUrl: 'img/stills/BATHROOM_1.JPG',

            bCanCatch: true,
            getCanCatch: function () {
              return this.bCanCatch;
            },
            setCanCatch: function (val) {
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
            getCatchTime: function () {
              return this.catchTime;
            },
            setCatchTime: function (val) {
              this.catchTime = val;
            },

            curUrl: '',
            getCurUrl: function () {
              return this.curUrl;
            },
            setCurUrl: function (val) {
              this.curUrl    = val;
            },

            nextUrl: '',
            getNextUrl: function () {
              return this.nextUrl;
            },
            setNextUrl: function (val) {
              this.nextUrl   = val;
            },

            trapUrl: '',
            getTrapUrl: function () {
              return this.trapUrl;
            },
            setTrapUrl: function (val) {
              this.trapUrl   = val;
            },

            bTrapSprung: false,
            getTrapSprung: function () {
              return this.bTrapSprung;
            },
            setTrapSprung: function (val){
              this.bTrapSprung = val;
            }
        },
        bedroom: {
            stillUrl: 'img/stills/BEDROOM_1.JPG',

            bCanCatch: true,
            getCanCatch: function () {
              return this.bCanCatch;
            },
            setCanCatch: function (val) {
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
            getCatchTime: function () {
              return this.catchTime;
            },
            setCatchTime: function (val) {
              this.catchTime = val;
            },

            curUrl: '',
            getCurUrl: function () {
              return this.curUrl;
            },
            setCurUrl: function (val) {
              this.curUrl    = val;
            },

            nextUrl: '',
            getNextUrl: function () {
              return this.nextUrl;
            },
            setNextUrl: function (val) {
              this.nextUrl   = val;
            },

            trapUrl: '',
            getTrapUrl: function () {
              return this.trapUrl;
            },
            setTrapUrl: function (val) {
              this.trapUrl   = val;
            },

            bTrapSprung: false,
            getTrapSprung: function () {
              return this.bTrapSprung;
            },
            setTrapSprung: function (val){
              this.bTrapSprung = val;
          }
        },
        hallTwo: {
            stillUrl: 'img/stills/HALL-TWO_1.JPG',

            bCanCatch: true,
            getCanCatch: function () {
              return this.bCanCatch;
            },
            setCanCatch: function (val) {
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
            getCatchTime: function () {
              return this.catchTime;
            },
            setCatchTime: function (val) {
              this.catchTime = val;
            },

            curUrl: '',
            getCurUrl: function () {
              return this.curUrl;
            },
            setCurUrl: function (val) {
              this.curUrl    = val;
            },

            nextUrl: '',
            getNextUrl: function () {
              return this.nextUrl;
            },
            setNextUrl: function (val) {
              this.nextUrl   = val;
            },

            trapUrl: '',
            getTrapUrl: function () {
              return this.trapUrl;
            },
            setTrapUrl: function (val) {
              this.trapUrl   = val;
            },

            bTrapSprung: false,
            getTrapSprung: function () {
              return this.bTrapSprung;
            },
            setTrapSprung: function (val){
              this.bTrapSprung = val;
            }
        },
        driveway: {
            stillUrl: 'img/stills/Driveway_1.JPG',

          bCanCatch: true,
          getCanCatch: function () {
            return this.bCanCatch;
          },
          setCanCatch: function (val) {
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
          getCatchTime: function () {
            return this.catchTime;
          },
          setCatchTime: function (val) {
            this.catchTime = val;
          },

          curUrl: '',
          getCurUrl: function () {
            return this.curUrl;
          },
          setCurUrl: function (val) {
            this.curUrl    = val;
          },

          nextUrl: '',
          getNextUrl: function () {
            return this.nextUrl;
          },
          setNextUrl: function (val) {
            this.nextUrl   = val;
          },

          trapUrl: '',
          getTrapUrl: function () {
            return this.trapUrl;
          },
          setTrapUrl: function (val) {
            this.trapUrl   = val;
          },

          bTrapSprung: false,
          getTrapSprung: function () {
            return this.bTrapSprung;
          },
          setTrapSprung: function (val){
            this.bTrapSprung = val;
          }
        }
    };

    /**
     * Obj to get / set current values for the game.
     * @property {string} cam           - Room the user has currently selected
     * @property {string} stillUrl      - Background image when room is empty.
     * @property {bool}   bCanCatch     - Is there a character who can be caught in the scene?
     * @property {float}  urlChangeTime - Time into the game should curUrl should be set.  
     * @property {float}  time          - Current time stamp when curUrl is being set. 
     * @property {float}  catchTime     - When can the user catch an auger?
     * @property {sting}  curUrl        - Url should be set as video.src() right now.
     * @property {string} nextUrl       - NextUrl to be set as video.src() when curUrl finishes.
     * @property {string} trapUrl       - If a character can be trapped in the scene, have it trigger this Url.
     * @property {bool}   bTrapSpring   - Has the user set the trap in this current scene yet?
     */
    var current = {
        cam: {
           camHallOne   : 'hallOne'
          ,camKitchen   : 'kitchen'
          ,camEntryway  : 'entryway'
          ,camLivingRoom: 'livingroom'
          ,camBathroom  : 'bathroom'
          ,camBedroom   : 'bedroom'
          ,camHallTwo   : 'hallTwo'
          ,camDriveway  : 'driveway'
        },
        getCam: function () {
          return this.cam;
        },
        setCam: function (val){
          this.cam = val;
        },

        stillUrl: '',
        getStillUrl () {
            return this.stillUrl;
        },
        setStillUrl: function (val) {
            this.stillUrl = val;
        },

        bCanCatch: true,
        getCanCatch: function () {
            return this.bCanCatch;
        },
        setCanCatch: function (val) {
            this.bCanCatch = val;
        },

        time: 0,
        getTime: function () {
            return this.time;
        },
        setTime: function (val) {
            this.time = val;
        },

        urlChangeTime: 0,
        getUrlChangeTime: function () {
            return this.urlChangeTime;
        },
        setUrlChangeTime: function(val) {
            this.urlChangeTime = val;
        },

        catchTime: 0,
        getCatchTime: function () {
            return this.catchTime;
        },
        setCatchTime: function (val) {
            this.catchTime = val;
        },

        curUrl: '',
        getCurUrl: function () {
            return this.curUrl;
        },
        setCurUrl: function (val) {
            this.curUrl = val;
        },

        nextUrl: '',
        getNextUrl: function () {
            return this.nextUrl;
        },
        setNextUrl: function (val) {
            this.nextUrl = val;
        },

        trapUrl: '',
        getTrapUrl: function () {
            return this.trapUrl;
        },
        setTrapUrl: function (val) {
            this.trapUrl = val;
        },

        bTrapSprung: true,
            getTrapSprung: function () {
          return this.bTrapSprung;
        },
        setTrapSprung: function (val){
          this.bTrapSprung = val;
        }
    };


    /**
     * How many augers has the user caught?
     */
    var nTotalCaught           = {
        caught: 0,
        get: function () {
            return this.caught;
        },
        set: function (val) {
            this.caught        = val;
        },
        increment: function () {
            this.caught ++;
        }
    };

    /**
     * How many augers has the user missed?
     */
    var nTotalMissed           = {
        missed: 0,
        get: function () {
            return this.missed;
        },
        set: function (val) {
            this.missed        = val;
        },
        increment: function () {
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
        generateRanPass:  function () {
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
    var init                   = function init () {
        registerRoomButton();
        initializeAudio();
        initializeVideoStream();
        MainLoop.setUpdate(update).setDraw(draw).start();
    };


    /**
     * Room buttons now changeVideoStream() when clicked.
     */
    var registerRoomButton      = function registerRoomButton () {
            document.getElementById('Hall-1'     ).addEventListener(   'click', changeVideoStream, false);
            document.getElementById('Kitchen'    ).addEventListener(   'click', changeVideoStream, false);
            document.getElementById('Entry-Way'  ).addEventListener(   'click', changeVideoStream, false);
            document.getElementById('Living-Room').addEventListener(   'click', changeVideoStream, false);
            document.getElementById('Bathroom'   ).addEventListener(   'click', changeVideoStream, false);
            document.getElementById('Bedroom'    ).addEventListener(   'click', changeVideoStream, false);
            document.getElementById('Hall-2'     ).addEventListener(   'click', changeVideoStream, false);
            document.getElementById('Driveway'   ).addEventListener(   'click', changeVideoStream, false);
    };


    /**
     * Converts seconds to "MM:SS"
     * @param {float} seconds - Takes seconds and returns it in string format of MM:SS for on screen timer
     */
    var secondsToTimeString   = function secondsToTimeString (seconds) {

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
    var elapsedTime           = function elapsedTime () {
        var end               = new Date();
        var elapsedMS         = end.getTime() - nTimeStart.getTime();
        var seconds           = Math.round(elapsedMS / 1000);
        var minutes           = Math.round(seconds   /   60);

        current.setTime(seconds);
    };


    /**
     * Draws current time on screen at 'timer' element.
     */
    var updateTimeOnScreen    = function updateTimeOnScreen () {
        timerElem.innerHTML = secondsToTimeString(current.getTime());
    };


    /**
     * Update loop for checking when to change video scenes 
     * @param {float} delta - The amount of time since the last update, in seconds
     */
    var update                = function update (delta) {
        elapsedTime();
        updateTimeOnScreen();
        calcCatchTime(current.getCatchTime()); // TODO: Does this need to happen each frame?
        eventsHallOne();
        eventsBedroom();
        eventsBathroom();
    };


    /**
     * Check if browser supports audio -- if not, create a new window & tell user to update
     */
    var initializeAudio       = function  initializeAudio () {
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
    var initializeVideoStream = function initializeVideoStream () {
        video                 = videojs('video-player');
        if (!Modernizr.video) {
            window.open('http://outdatedbrowser.com/en', '_blank');
        }
        if (bDebug) {
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
    var draw                  = function draw (interpolatePercentage) {
        // Do I really need this? 
    };


    /**
     * When user selects a room, this takes the current values from the room and applies them to the current object.
     * createVideoSeries is called after properties have been set.
     */
    var changeVideoStream     = function changeVideoStream () {
          switch (this.id) {
              case 'Hall-1':
                  current.setCam          ('hallOne'                    );
                  current.setCurUrl       (room.hallOne.getCurUrl     ());
                  current.setNextUrl      (room.hallOne.getNextUrl    ());
                  current.setTrapUrl      (room.hallOne.getTrapUrl    ());
                  current.setCatchTime    (room.hallOne.getCatchTime  ());
                  current.setCanCatch     (room.hallOne.getCanCatch   ());
                  current.setUrlChangeTime(room.hallOne.getTime       ());
                  current.setStillUrl     (room.hallOne.stillUrl        );
                  current.setTrapSprung   (room.hallOne.getTrapSprung ());
                  console.log(current.getTrapSprung());
                  break;
              case 'Kitchen':
                  current.setCam          ('kitchen'                    );
                  current.setCurUrl       (room.kitchen.getCurUrl     ());
                  current.setNextUrl      (room.kitchen.getNextUrl    ());
                  current.setTrapUrl      (room.kitchen.getTrapUrl    ());
                  current.setCanCatch     (room.kitchen.getCanCatch   ());
                  current.setUrlChangeTime(room.kitchen.getTime       ());
                  current.setStillUrl     (room.kitchen.stillUrl        );
                  break;
              case 'Entry-Way':
                  current.setCam          ('entryway'                   );
                  current.setCurUrl       (room.entryway.getCurUrl    ());
                  current.setNextUrl      (room.entryway.getNextUrl   ());
                  current.setTrapUrl      (room.entryway.getTrapUrl   ());
                  current.setCanCatch     (room.entryway.getCanCatch  ());
                  current.setUrlChangeTime(room.entryway.getTime      ());
                  current.setStillUrl     (room.entryway.stillUrl       );
                  break;
              case 'Living-Room':
                  current.setCam          ('livingroom'                 );
                  current.setCurUrl       (room.livingRoom.getCurUrl  ());
                  current.setNextUrl      (room.livingRoom.getNextUrl ());
                  current.setTrapUrl      (room.livingRoom.getTrapUrl ());
                  current.setCanCatch     (room.livingRoom.getCanCatch());
                  current.setUrlChangeTime(room.livingRoom.getTime    ());
                  current.setStillUrl     (room.livingRoom.stillUrl     );
                  break;
              case 'Bathroom':
                  current.setCam           ('bathroom'                   );
                  current.setCurUrl       (room.bathroom.getCurUrl    ());
                  current.setNextUrl      (room.bathroom.getNextUrl   ());
                  current.setTrapUrl      (room.bathroom.getTrapUrl   ());
                  current.setCanCatch     (room.bathroom.getCanCatch  ());
                  current.setUrlChangeTime(room.bathroom.getTime      ());
                  current.setStillUrl     (room.bathroom.stillUrl       );
                  break;
              case 'Bedroom':
                  current.setCam          ('bedroom'                    );
                  current.setCurUrl       (room.bedroom.getCurUrl     ());
                  current.setNextUrl      (room.bedroom.getNextUrl    ());
                  current.setTrapUrl      (room.bedroom.getTrapUrl    ());
                  current.setCanCatch     (room.bedroom.getCanCatch   ());
                  current.setUrlChangeTime(room.bedroom.getTime       ());
                  current.setStillUrl     (room.bedroom.stillUrl        );
                  current.setTrapSprung   (room.bedroom.getTrapSprung ());
                console.log(current.getTrapSprung());
                  break;
              case 'Hall-2':
                  current.setCam          ('hallTwo'                    );
                  current.setCurUrl       (room.hallTwo.getCurUrl     ());
                  current.setNextUrl      (room.hallTwo.getNextUrl    ());
                  current.setTrapUrl      (room.hallTwo.getTrapUrl    ());
                  current.setCanCatch     (room.hallTwo.getCanCatch   ());
                  current.setUrlChangeTime(room.hallTwo.getTime       ());
                  current.setStillUrl     (room.hallTwo.stillUrl        );
                  break;
              case 'Driveway':
                  current.setCam          ('driveway'                   );
                  current.setCurUrl       (room.driveway.getCurUrl    ());
                  current.setNextUrl      (room.driveway.getNextUrl   ());
                  current.setTrapUrl      (room.driveway.getTrapUrl   ());
                  current.setCanCatch     (room.driveway.getCanCatch  ());
                  current.setUrlChangeTime(room.driveway.getTime      ());
                  current.setStillUrl     (room.driveway.stillUrl       );
                  break;
          }
        createVideoSeries(current.getCurUrl(), current.getNextUrl(), current.getTrapUrl(), current.getStillUrl());
    };


    /**
     *  Sets the current values for each room, which will then be used the events function to
     * then set these values if user has current room selected
     * @Param {string} [curUrl]    - Path to video which should be set at this point in time.
     * @Param {string} [nextUrl]   - Path to video that should play when curUrl is completed.
     * @Param {string} [trapUrl]   - Path to video containing the trap scene.
     * @Param {float}  [catchTime] - Moment when user can trigger a trap.
     */
    var buildStateHallOne = function buildStateHallOne (curUrl, nextUrl, trapUrl, catchTime) {
        room.hallOne.setCurUrl    (curUrl)           ;
        room.hallOne.setNextUrl   (nextUrl)          ;
        room.hallOne.setTrapUrl   (trapUrl)          ;
        room.hallOne.setCatchTime (catchTime)        ;
        room.hallOne.setTime      (current.getTime());
        room.hallOne.setTrapSprung(false)            ;
    };

    var buildStateKitchen = function buildStateKitchen (curUrl, nextUrl, trapUrl, catchTime) {
        room.kitchen.setCurUrl    (curUrl)           ;
        room.kitchen.setNextUrl   (nextUrl)          ;
        room.kitchen.setTrapUrl   (trapUrl)          ;
        room.kitchen.setCatchTime (catchTime)        ;
        room.kitchen.setTime      (current.getTime());
        room.kitchen.setTrapSprung(false)            ;
    };

    var buildStateEntryway = function buildStateEntryway (curUrl, nextUrl, trapUrl, catchTime) {
        room.entryway.setCurUrl    (curUrl)           ;
        room.entryway.setNextUrl   (nextUrl)          ;
        room.entryway.setTrapUrl   (trapUrl)          ;
        room.entryway.setCatchTime (catchTime)        ;
        room.entryway.setTime      (current.getTime());
        room.entryway.setTrapSprung(false)            ;
    };

    var buildStateLivingRoom = function buildStateLivingRoom (curUrl, nextUrl, trapUrl, catchTime) {
        room.livingRoom.setCurUrl    (curUrl)           ;
        room.livingRoom.setNextUrl   (nextUrl)          ;
        room.livingRoom.setTrapUrl   (trapUrl)          ;
        room.livingRoom.setCatchTime (catchTime)        ;
        room.livingRoom.setTime      (current.getTime());
        room.livingRoom.setTrapSprung(false)            ;
    };

    var buildStateBathroom = function buildStateBathroom (curUrl, nextUrl, trapUrl, catchTime) {
        room.bathroom.setCurUrl    (curUrl)           ;
        room.bathroom.setNextUrl   (nextUrl)          ;
        room.bathroom.setTrapUrl   (trapUrl)          ;
        room.bathroom.setCatchTime (catchTime)        ;
        room.bathroom.setTime      (current.getTime());
        room.bathroom.setTrapSprung(false)            ;
    };

    var buildStateBedroom = function buildStateBedroom (curUrl, nextUrl, trapUrl, catchTime) {
        room.bedroom.setCurUrl    (curUrl)           ;
        room.bedroom.setNextUrl   (nextUrl)          ;
        room.bedroom.setTrapUrl   (trapUrl)          ;
        room.bedroom.setCatchTime (catchTime)        ;
        room.bedroom.setTime      (current.getTime());
        room.bedroom.setTrapSprung(false)            ;
    };

    var buildStateHallTwo = function buildStateHallTwo (curUrl, nextUrl, trapUrl, catchTime) {
        room.hallTwo.setCurUrl    (curUrl)           ;
        room.hallTwo.setNextUrl   (nextUrl)          ;
        room.hallTwo.setTrapUrl   (trapUrl)          ;
        room.hallTwo.setCatchTime (catchTime)        ;
        room.hallTwo.setTime      (current.getTime());
        room.hallTwo.setTrapSprung(false)            ;
    };

    var buildStateDriveway = function buildStateDriveway (curUrl, nextUrl, trapUrl, catchTime) {
        room.driveway.setCurUrl    (curUrl)           ;
        room.driveway.setNextUrl   (nextUrl)          ;
        room.driveway.setTrapUrl   (trapUrl)          ;
        room.driveway.setCatchTime (catchTime)        ;
        room.driveway.setTime      (current.getTime());
        room.driveway.setTrapSprung(false)            ;
    };


    /**
     * Sets values of this particular room each time current.getTime() matches the case value.
     * Case is equal to the current number of seconds into the game.
     * NOTE: Need to set current.GetTime() and setTrapSprung(false) for EACH case
     */
    var eventsHallOne         = function eventsHallOne () {
        switch (current.getTime()) {
          case 1:
              buildStateHallOne(camHallOne.c21, null, camHallOne.c130422, 3);
              break;
          case 54:
              buildStateHallOne(camHallOne.c21, null, camHallOne.c130422, null);
              break;
        }
    };


    var eventsBedroom         = function eventsBedroom () {
        switch (current.getTime()) {
          case 1:
            buildStateBedroom(camBedroom.c81, null, camBedroom.c352482, 34);
            break;
          case 54:
            buildStateBedroom(camBedroom.c540281, null, null, null);
            break;
        }
    };


    var eventsBathroom     = function eventsBathroom () {
        switch (current.getTime()) {
            case 18:
              buildStateBathroom(camBathroom.c180291, null, null, null);
              break;
            case 37:
              buildStateBathroom(camBathroom.c352291, null,  camBathroom.c431292, 43);
              break;
          default:
              buildStateBathroom(null, null, null, null);
        }
    };


    /**
     * Sets the poster (background) between clips to the room you are currently viewing
     * hasPlayed variable prevents the footage from looping.
     * Second 'ended' event draws poster to screen when 2nd clip has completed
     * @param {string}  sCurVidUrl   - Clip with the trap sequence.
     * @param {string} [sNextVidUrl] - Trap clips are often have a clip that appears next.
     * @param {string} [sTrapUrl]    - Path to URL w/ trap video.
     * @param {string}  sStillUrl    - Path to URL w/ poster image.
     */
    var createVideoSeries = function createVideoSeries (sCurVidUrl, sNextVidUrl, sTrapUrl, sStillUrl) {
        console.log(arguments);

        /* At beginning of game, user clicks on a room w/ out a video OR user has already set a trap
         * and returns to that same room before a new clip is set to begin */
        if (sCurVidUrl ===  null || current.getTrapSprung() === true) {            //TODO: This may have to be set to check if it is '' as well
          video.poster(sStillUrl);
          displayStill();
          return;
        }

        var hasPlayed = false;
        video.poster(sStillUrl);
        playVideo(sCurVidUrl);

         // Did not catch / no chance to catch....so play next video
        video.on('ended', function() {
            if (hasPlayed === false) {
                if (sNextVidUrl) {
                    playVideo(sNextVidUrl);

                } else {
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
     * TODO: Need to set video.currentTime(0) on this as well! Otherwise we miss most of the trap vid!
     */
    var trap                  = function trap () {
        createTrapVidSeries(current.getTrapUrl(), current.getNextUrl());
        toggleTrapListener(false);
    };


    /**
     * Sets the poster (background) between clips to the room you are currently viewing
     * hasPlayed variable prevents the footage from looping.
     * Second 'ended' event draws poster to screen when 2nd clip has completed
     * @param {string} curVidUrl - Clip with the trap sequence.
     * @param {string} [nextVid] - Trap clips are often have a clip that appears next.
     */
    var createTrapVidSeries = function createTrapVidSeries (sTrapUrl, sNextUrl) {

      // Mark trap as having been sprung after user selects a room.
      //TODO: Need to set this to false, somewhere else. Probably in the NEXT case statement? (ex: beginning of it)
      switch (current.getCam()){
        case 'hallOne':
          room.hallOne   .setTrapSprung(true);
          break;
        case 'kitchen':
          room.kitchen   .setTrapSprung(true);
          break;
        case 'entryway':
          room.entryway  .setTrapSprung(true);
          break;
        case 'livingroom':
          room.livingRoom.setTrapSprung(true);
          break;
        case 'bathroom':
          room.bathroom  .setTrapSprung(true);
          break;
        case 'bedroom':
          room.bedroom   .setTrapSprung(true);
          break;
        case 'hallTwo':
          room.hallTwo   .setTrapSprung(true);
          break;
        case 'driveway':
          room.driveway  .setTrapSprung(true);
          break;
      }

      video.src(sTrapUrl);
      video.play();

      // Video has already played & there is no nextUrl, so use a still
      video.on('ended', function () {
        if (sNextUrl === null) {
          displayStill();
        } else {
          // Play next video here  & when it ends, set a still
          video.src(sNextUrl);
          video.play();


          video.on('ended', function () {
            displayStill();
          });
        }
      });
    };


    /**
     * Have a buffer 1 second before / after catchTime to allow users to try to catch a character.
     * If current.getTime() is between this buffer, then allow user to set the trap.
     * @param {float} nCatchTime - When can the user trigger the trap?
     */
    var calcCatchTime         = function calcCatchTime (nCatchTime) {
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
    var toggleTrapListener    = function toggleTrapListener (bShouldListen) {
        bShouldListen = typeof 'undefined' ? bShouldListen : false;
        if (bShouldListen       === true) {
            document.getElementById('Trap').addEventListener   ('click', trap);
        } else {
            document.getElementById('Trap').removeEventListener('click', trap);
        }
    };


    /**
     * Still to play when no action occurs. Sets video.src to src so that the still image can be displayed as a poster
     * TODO: Needed to make this audio repeatable again
     */
    var displayStill          = function displayStill () {
        video.src(video.src);
        audioElem.src = aAudioClips.crickets;
        audioElem.play();
    };


    /**
     * Useful when viewer enters a room after a video was supposed to have started.
     * Need to apply Math.floor, otherwise Blink throws an error regarding non-finite numbers.
     * Result is then used to set the currentTime on video player. 
     * @param   {float} caseTime     - Which event (time) is creating this object?
     * @param   {float} currentTime  - What is the current game time when this function is called?
     * @returns {float} Result Diff b/t nCaseTime, which is set in the Update() method of each room, & nCurrentTime.get().
     */
    var nTimeDiff             = function  nTimeDiff(caseTime, currentTime) {
        var floorCurrentTime  = Math.floor(currentTime);
        var floorCaseTime     = Math.floor(caseTime   );
        var result            = floorCurrentTime - floorCaseTime;

        return result;
    };


    /**
     * Pauses audio played during stills, sets new video source, & begins to play.
     * @param {string} clipUrl - Address of clip to play.
     * TODO: Do not need diff if it is not a trap. Move this to the trap
     */
    var playVideo             = function playVideo (urlClip) {
        var diff = nTimeDiff(current.getUrlChangeTime(), current.getTime());

        audioElem.pause();
        video.src(urlClip);
        video.play();
        video.currentTime(diff);
    };


    /**
     * Plays a sound effect during gameplay. Used for traps, passwords
     * @param {string} clipUrl - Address of clip to play.
     */
    var playSfx               = function playSfx (urlClip) {
        audioElem.src = urlClip;
        audioElem.play();
    };


    init();

})();