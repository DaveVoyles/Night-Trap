(function() {
    'use strict';

    /**
     * Constructor obj to get / set current values for the each room.
     * @returns                           - roomPrototype
     * @param {string} sRoom              - Name of the room.
     * @param {string} stillUrl           - Background image when room is empty.
     * @param {bool}   bCanCatch          - Is there a character who can be captured in the scene?
     * @param {number} time               - Current time stamp when curUrl is being set.
     * @param {number} catchTime          - When can the user catch an auger?
     * @param {sting}  curUrl             - Url should be set as video.src() right now.
     * @param {string} nextUrl            - NextUrl to be set as video.src() when curUrl finishes.
     * @param {string} trapUrl            - If a character can be trapped in the scene, have it trigger this Url.
     * @param {bool}   bTrapSprung        - Has the user set the trap in this current scene yet?
     * @param {number} nPotentialCaptured - How many augers can be caught in the current scene?
     */
    var room = function(sRoom, stillUrl, bCanCatch, time, catchTime, curUrl, nextUrl, trapUrl, bTrapSprung, nPotentialCaptured) {
        var _sRoom              = sRoom              || ''   ;
        var _stillurl           = stillUrl           || ''   ;
        var _bCanCatch          = bCanCatch          || false;
        var _time               = time               || 0    ;
        var _catchTime          = catchTime          || 0    ;
        var _curUrl             = curUrl             || ''   ;
        var _nextUrl            = nextUrl            || ''   ;
        var _trapUrl            = trapUrl            || ''   ;
        var _bTrapSprung        = bTrapSprung        || false;
        var _nPotentialCaptured = nPotentialCaptured || 0    ;

        var roomPrototype = {
            getRoomName: function() {
                return _sRoom;
            },
            setRoomName: function(val) {
                _sRoom = val;
            },

            getStillUrl: function() {
                return _stillurl;
            },
            setStillUrl: function() {
                _stillurl = stillUrl;
            },

            getCanCatch: function() {
                return _bCanCatch;
            },
            setCanCatch: function(val) {
                _bCanCatch = val;
            },

            getTime: function() {
                return _time;
            },
            setTime: function(val) {
                _time = val;
            },

            getCatchTime: function() {
                return _catchTime;
            },
            setCatchTime: function(val) {
                _catchTime = val;
            },

            getCurUrl: function() {
                return _curUrl;
            },
            setCurUrl: function(val) {
                _curUrl = val;
            },

            getNextUrl: function() {
                return _nextUrl;
            },
            setNextUrl: function(val) {
                _nextUrl = val;
            },

            getTrapUrl: function() {
                return _trapUrl;
            },
            setTrapUrl: function(val) {
                _trapUrl = val;
            },

            getTrapSprung: function() {
                return _bTrapSprung;
            },
            setTrapSprung: function(val) {
                bTrapSprung = val;
            },

            getPotentialCaptured: function() {
                return _nPotentialCaptured;
            },
            setPotentialCaptured: function(val) {
                _nPotentialCaptured = val;
            }
        };
        return roomPrototype;
    };

    var hallOne    = room('hallOne'   , 'img/stills/HALL-ONE_1.JPG' );
    var kitchen    = room('kitchen'   , 'img/stills/KITCHEN_1.JPG'  );
    var entryway   = room('entryway'  , 'img/stills/ENTRY-WAY_1.jpg');
    var livingroom = room('livingroom', 'img/stills/LIVING-ROOM_1'  );
    var bathroom   = room('bathroom'  , 'img/stills/BATHROOM_1'     );
    var bedroom    = room('bedroom'   , 'img/stills/BATHROOM_1'     );
    var hallTwo    = room('hallTwo'   , 'img/stills/HALL-TWO_1'     );
    var driveway   = room('driveway'  , 'img/stills/DRIVEWAY_1.jpg' );


    var cur = {
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
        stillUrl          : ''  ,
        bCanCatch         : true,
        urlChangeTime     : 0   ,
        catchTime         : 0   ,
        curUrl            : ''  ,
        nextUrl           : ''  ,
        trapUrl           : ''  ,
        bTrapSprung       : true,
        nPotentialCaptured: 0   ,
        bJustSwitched     : false
    };


    //TODO: Change this name to 'current'
    // http://eclipsesource.com/blogs/2013/07/05/private-members-in-javascript/
    cur.prototype = {
        getCam: function() {
            return this.cam;
        },
        setCam: function(val) {
            this.cam = val;
        },
        getCanCatch: function () {
            return this.bCanCatch;
        },
        setCanCatch: function (val) {
            this.bCanCatch = val;
        },
        getUrlChangeTime: function () {
            return this.urlChangeTime;
        },
        setUrlChangeTime: function(val) {
            this.urlChangeTime = val;
        },
        getCatchTime: function () {
            return this.catchTime;
        },
        setCatchTime: function (val) {
            this.catchTime = val;
        },
        getTime: function () {
            return this.time;
        },
        setTime: function (val) {
            this.time = val;
        },
        getCurUrl: function () {
            return this.curUrl;
        },
        setCurUrl: function (val) {
            this.curUrl = val;
        },
        getNextUrl: function () {
            return this.nextUrl;
        },
        setNextUrl: function (val) {
            this.nextUrl = val;
        },
        getTrapUrl: function () {
            return this.trapUrl;
        },
        setTrapUrl: function (val) {
            this.trapUrl = val;
        },
        getTrapSprung: function () {
          return this.bTrapSprung;
        },
        setTrapSprung: function (val){
          this.bTrapSprung = val;
        },
        getJustSwitched: function () {
          return this.bJustSwitched;
        },
        setJustSwitched: function (val){
          this.bJustSwitched = val;
        },
        getPotentialCaptured: function () {
          return this.nPotentialCaptured;
        },
        setPotentialCaptured: function (val) {
          this.nPotentialCaptured = val;
        }
    };


    /**
     * Obj to get / set current values for the game.
     * @property {string} cam                - Room the user has currently selected
     * @property {string} stillUrl           - Background image when room is empty.
     * @property {bool}   bCanCatch          - Is there a character who can be captured in the scene?
     * @property {number} urlChangeTime      - Time into the game should curUrl should be set.
     * @property {number} time               - Current time stamp when curUrl is being set.
     * @property {number} catchTime          - When can the user catch an auger?
     * @property {sting}  curUrl             - Url should be set as video.src() right now.
     * @property {string} nextUrl            - NextUrl to be set as video.src() when curUrl finishes.
     * @property {string} trapUrl            - If a character can be trapped in the scene, have it trigger this Url.
     * @property {bool}   bTrapSpring        - Has the user set the trap in this current scene yet?
     * @property {bool}   bJustSwitched      - Has the currentUrl switched since the user selected this room?
     * @property {number} nPotentialCaptured - Number of augers that could have been captured in this scene
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
        getStillUrl: function () {
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
        },

        bJustSwitched: false,
        getJustSwitched: function () {
          return this.bJustSwitched;
        },
        setJustSwitched: function (val){
          this.bJustSwitched = val;
        },

        nPotentialCaptured: 0,
        getPotentialCaptured: function () {
          return this.nPotentialCaptured;
        },
        setPotentialCaptured: function (val) {
          this.nPotentialCaptured = val;
        }
    };

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
    var nTotalMissed           = {
        missed: 0,
        get: function () {
            return this.missed;
        },
        increment: function (val) {
            this.missed        += val;
        }
    };

    // Timer to keep track of user's time spent in-game
    var nTimeStart             = new Date();
    // Audio element for SFX, passwords, and noises during stills
    var audioElem              = null;
    // Are we in Debug mode?
    var bDebug                 = true;
    var timerElem              = document.getElementById('timer'   );
    var passElem               = document.getElementById('pass'    );
    var possibleElem           = document.getElementById('possible');
    var capturedElem           = document.getElementById('captured');
    var video                  = null;   

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
            var count = 0;
          for (var prop in this.passwords)
              if (Math.random() < 1/++count) {
                result = prop;
                switch(result) {
                  case Purple:
                    playSfx(sfxPath.Purple);
                    break;
                  case Blue:
                    playSfx(sfxPath.Blue  );
                    break;
                  case Red:
                    playSfx(sfxPath.Red   );
                    break;
                  case Green:
                    playSfx(sfxPath.Green );
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
          c21:      'https://nighttrapblob.blob.core.windows.net/ntvids/hallOne/00000021.mp4'
        // TRAP: Augers captured in hall
        , c130422:  'https://nighttrapblob.blob.core.windows.net/ntvids/hallOne/00130422.mp4'
        // Tony, Jeff, & Dad enter from basement
        , c1152221: 'https://nighttrapblob.blob.core.windows.net/ntvids/hallOne/02500221.mp4'           //TODO: AZURE: Labeled wrong
    };

    /* 3 - Kitchen */
    var camKitchen             = {
         // 1 Auger walks in from Entry. Can catch at 4 Sec
          c1200431: 'https://nighttrapblob.blob.core.windows.net/ntvids/kitchen/01200431.mp4'
        // 1 Auger captured in kitchen when trying to access fridge
        , c1240632: 'https://nighttrapblob.blob.core.windows.net/ntvids/kitchen/01240632.mp4'
        // Tony, Jeff, & Dad enter from Hall-1, talk to parents
        , c1481231: 'https://nighttrapblob.blob.core.windows.net/ntvids/kitchen/01481231.mp4'
    };

    /* 4- Living-Room */
    var camLivingRoom          = {
        // Mom enters from bookshelf
          c1572241: 'https://nighttrapblob.blob.core.windows.net/ntvids/livingroom/01572241.mp4'
         // Augers enter from outside (branches)
         ,c232241:  'https://nighttrapblob.blob.core.windows.net/ntvids/livingroom/00232241.mp4'
        // TRAP: Augers captured on bookshelf
        , c271442:  'https://nighttrapblob.blob.core.windows.net/ntvids/livingroom/00271442.mp4'
        // Augers Escape  
        , c271641:  'https://nighttrapblob.blob.core.windows.net/ntvids/livingroom/00271641.mp4'
        // TRAP: Auger captured on library
        , c554164a: 'https://nighttrapblob.blob.core.windows.net/ntvids/livingroom/0554164a.mp4'
        // 2 Augers enter from outside
        , c1001241 :'https://nighttrapblob.blob.core.windows.net/ntvids/livingroom/01001241.mp4'
        // TRAP: Augers captured on right side of living room
        , c1071042: 'https://nighttrapblob.blob.core.windows.net/ntvids/livingroom/01071042.mp4'
    };

    /* 5 - Driveway */
    var camDriveway            = {
        //  Girls enter the driveway, meet eddy, walk in. Can catch at ~6 Sec.
          c1440451: 'https://nighttrapblob.blob.core.windows.net/ntvids/driveway/01440451.mp4'
        // TRAP: Launching auger from roof
        , c1502452: 'https://nighttrapblob.blob.core.windows.net/ntvids/driveway/01502452.mp4'
    };

    /* 6 - Entryway */
    var camEntryway            = {
        // 1 Auger walks in from beneath stairs. Looks outside. Can be captured
          c1320261: 'https://nighttrapblob.blob.core.windows.net/ntvids/driveway/01502452.mp4'
        // 1 Auger captured in entryway
        , c1391862: 'https://nighttrapblob.blob.core.windows.net/ntvids/entryway/01391862.mp4'
        // Sarah enters from closet, parents enter, augers can be trapped on stairs
        , c2122461: 'https://nighttrapblob.blob.core.windows.net/ntvids/entryway/02122461.mp4'
        // Tony & Jeff walk in from kitchen, argue about door, walk outside
        , c2500221: 'https://medianighttrap.blob.core.windows.net/asset-e41e435d-1500-80c4-3ba5-f1e52dbb97ae/02500221.mp4?sv=2012-02-12&sr=c&si=f34e6bd8-dbe4-464f-b0f8-2b16c61fcecd&sig=DretusvijWM7WVsXbipYK6W%2FBjEHDn9jXwsxg8%2F3zyE%3D&st=2015-07-19T02%3A18%3A59Z&se=2115-06-25T02%3A18%3A59Z'
    };

    /* 7 - Hall-2 */
    var camHallTwo             = {
        // Auger enters hall 2 from bedroom
          c310471: 'https://nighttrapblob.blob.core.windows.net/ntvids/hallTwo/00310471.mp4'
        // Auger walks in from Bathroom.
        , c500271: 'https://nighttrapblob.blob.core.windows.net/ntvids/hallTwo/00500271.mp4'
        // Auger captured in hall trap
        , c542272: 'https://nighttrapblob.blob.core.windows.net/ntvids/hallTwo/00542272.mp4'
        // Augers enters from bedroom, goes down stairs
        , c2390671: 'https://nighttrapblob.blob.core.windows.net/ntvids/hallTwo/02390671.mp4'
    };

    /* 8 - Bedroom */
    var camBedroom             = {
        //Sarah staring at mirror, 3 augers enter two go to bathroom one to hall-2
           c81:    'https://nighttrapblob.blob.core.windows.net/ntvids/bedroom/00000081.mp4'
        // TRAP: Augers captured
        , c130422: 'https://medianighttrap.blob.core.windows.net/asset-e41e435d-1500-80c4-a05f-f1e52dbb857e/00130422.mp4?sv=2012-02-12&sr=c&si=681815ff-ed6f-4acf-861c-3886316945ee&sig=vUMKUifi5f3Pcj7WlVQqy4R0FYJ6AF9%2BjPQXbdMaONc%3D&st=2015-07-19T02%3A18%3A44Z&se=2115-06-25T02%3A18%3A44Z'
        // TRAP: 1 Auger is captured, other walks into bathroom
        , c352482: 'https://nighttrapblob.blob.core.windows.net/ntvids/bedroom/00352482.mp4'
        // Auger walks in from Bathroom, goes out window
        , c540281: 'https://nighttrapblob.blob.core.windows.net/ntvids/bedroom/00540281.mp4'
    };

    /* 9 - Bathroom */
    var camBathroom            = {
        // Sarah enters bathroom from bedroom. Enters mirror
          c180291:   'https://nighttrapblob.blob.core.windows.net/ntvids/bathroom/00180291.mp4'
        // 2 Augers enter bathroom from bedroom, 1 catchable
        , c352291:   'https://nighttrapblob.blob.core.windows.net/ntvids/bathroom/00352291.mp4'
        // TRAP: 1 Auger is captured, other walks into mirror
        , c430249b:  'https://nighttrapblob.blob.core.windows.net/ntvids/bathroom/0430249b.mp4'
        // TRAP: Auger captured on scale trap
        , c431292:   'https://nighttrapblob.blob.core.windows.net/ntvids/bathroom/00431292.mp4'
        // Auger walks in from Hall-2, walks toward bedroom
        , c480291:   'https://nighttrapblob.blob.core.windows.net/ntvids/bathroom/00480291.mp4'
        // TRAP: Auger captured in floor trap
        , c500291:   'https://nighttrapblob.blob.core.windows.net/ntvids/bathroom/00500291.mp4'
    };

    /**
     * Wires up event handlers for buttons.
     * Sets src property for video player and sets reference to audio tag
     */
    var init                   = function init () {
        registerRoomButton();
        initializeAudio();
        initializeVideoStream();
        MainLoop.setUpdate(update).start();
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
     * @param {number} seconds - Takes seconds and returns it in string format of MM:SS for on screen timer
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
     * Displays current password on screen.
     * TODO: Check spreadsheet to see when this value changes.
     * TODO: When it does, generate a new password, and check to see if user has matched password.
     */
    var updatePasswordOnScreen = function updatePasswordOnScreen () {
//      Object.observe(password,  function (changes) {
//
//        if (changes[0]!== undefined) {
//          var oldUrl = changes[0].oldValue;
//          var newUrl = password.sCurUserPass.get();
//
//          if (oldUrl !== newUrl && current.getCam() === sRoomName) {
//            passElem.innerHTML = password.sCurUserPass.get();
//          }
//        }
//      });
    };


    /**
     * Update loop for checking when to change video scenes 
     * @param {number} delta - The amount of time since the last update, in seconds
     */
    var update                = function update (delta) {
        elapsedTime();
        updateTimeOnScreen();
        calcCatchTime(current.getCatchTime());
        eventsHallOne();
        eventsKitchen();
        //eventsEntry();
//        eventsLiving();
//        eventsBathroom();
        //eventsBedroom();
//        eventshallTwo();
//        eventsDriveway();
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
     * When user selects a room, this takes the current values from the room and applies them to the current object.
     * createVideoSeries is called after properties have been set.
     * Considered refactoring this, but it actually made it more difficult to read.
     */
    var changeVideoStream     = function changeVideoStream () {
          current.setJustSwitched(true);
          switch (this.id) {
            case 'Hall-1':
                  current.setCam              ('hallOne'                     )      ;
                  current.setCurUrl           (hallOne.getCurUrl           ())      ;
                  current.setNextUrl          (hallOne.getNextUrl          ())      ;
                  current.setTrapUrl          (hallOne.getTrapUrl          ())      ;
                  current.setCatchTime        (hallOne.getCatchTime        ())      ;
                  current.setCanCatch         (hallOne.getCanCatch         ())      ;
                  current.setUrlChangeTime    (hallOne.getTime             ())      ;
                  current.setStillUrl         (hallOne.stillUrl              )      ;
                  current.setTrapSprung       (hallOne.getTrapSprung       ())      ;
                  current.setPotentialCaptured(hallOne.getPotentialCaptured())      ;
                  break                                                             ;
              case 'Kitchen':
                  current.setCam              ('kitchen'                     )      ;
                  current.setCurUrl           (kitchen.getCurUrl           ())      ;
                  current.setNextUrl          (kitchen.getNextUrl          ())      ;
                  current.setTrapUrl          (kitchen.getTrapUrl          ())      ;
                  current.setCanCatch         (kitchen.getCanCatch         ())      ;
                  current.setUrlChangeTime    (kitchen.getTime             ())      ;
                  current.setStillUrl         (kitchen.stillUrl              )      ;
                  current.setTrapSprung       (kitchen.getTrapSprung       ())      ;
                  current.setPotentialCaptured(kitchen.getPotentialCaptured())      ;
                  break                                                             ;
              case 'Entry-Way':
                  current.setCam              ('entryway'                     )     ;
                  current.setCurUrl           (entryway.getCurUrl           ())     ;
                  current.setNextUrl          (entryway.getNextUrl          ())     ;
                  current.setTrapUrl          (entryway.getTrapUrl          ())     ;
                  current.setCanCatch         (entryway.getCanCatch         ())     ;
                  current.setUrlChangeTime    (entryway.getTime             ())     ;
                  current.setStillUrl         (entryway.stillUrl              )     ;
                  current.setTrapSprung       (entryway.getTrapSprung       ())     ;
                  current.setPotentialCaptured(entryway.getPotentialCaptured())     ;
                  break                                                             ;
              case 'Living-Room':
                  current.setCam              ('livingroom'                     )   ;
                  current.setCurUrl           (livingroom.getCurUrl           ())   ;
                  current.setNextUrl          (livingroom.getNextUrl          ())   ;
                  current.setTrapUrl          (livingroom.getTrapUrl          ())   ;
                  current.setCanCatch         (livingroom.getCanCatch         ())   ;
                  current.setUrlChangeTime    (livingroom.getTime               )   ;
                  current.setStillUrl         (livingroom.stillUrl              )   ;
                  current.setTrapSprung       (livingroom.getTrapSprung       ())   ;
                  current.setPotentialCaptured(livingroom.getPotentialCaptured())   ;
                  break                                                             ;
              case 'Bathroom':
                  current.setCam              ('bathroom'                     )     ;
                  current.setCurUrl           (bathroom.getCurUrl           ())     ;
                  current.setNextUrl          (bathroom.getNextUrl          ())     ;
                  current.setTrapUrl          (bathroom.getTrapUrl          ())     ;
                  current.setCanCatch         (bathroom.getCanCatch         ())     ;
                  current.setUrlChangeTime    (bathroom.getTime             ())     ;
                  current.setStillUrl         (bathroom.stillUrl              )     ;
                  current.setTrapSprung       (bathroom.getTrapSprung       ())     ;
                  current.setPotentialCaptured(bathroom.getPotentialCaptured())     ;
                  break                                                             ;
              case 'Bedroom':
                  current.setCam              ('bedroom'                     )      ;
                  current.setCurUrl           (bedroom.getCurUrl           ())      ;
                  current.setNextUrl          (bedroom.getNextUrl          ())      ;
                  current.setTrapUrl          (bedroom.getTrapUrl          ())      ;
                  current.setCanCatch         (bedroom.getCanCatch         ())      ;
                  current.setUrlChangeTime    (bedroom.getTime             ())      ;
                  current.setStillUrl         (bedroom.stillUrl              )      ;
                  current.setTrapSprung       (bedroom.getTrapSprung       ())      ;
                  current.setPotentialCaptured(bedroom.getPotentialCaptured())      ;
                  break                                                             ;
              case 'Hall-2':
                  current.setCam              ('hallTwo'                     )      ;
                  current.setCurUrl           (hallTwo.getCurUrl           ())      ;
                  current.setNextUrl          (hallTwo.getNextUrl          ())      ;
                  current.setTrapUrl          (hallTwo.getTrapUrl          ())      ;
                  current.setCanCatch         (hallTwo.getCanCatch         ())      ;
                  current.setUrlChangeTime    (hallTwo.getTime             ())      ;
                  current.setStillUrl         (hallTwo.stillUrl              )      ;
                  current.setTrapSprung       (hallTwo.getTrapSprung       ())      ;
                  current.setPotentialCaptured(hallTwo.getPotentialCaptured())      ;
                  break                                                             ;
              case 'Driveway':
                  current.setCam              ('driveway'                     )     ;
                  current.setCurUrl           (driveway.getCurUrl           ())     ;
                  current.setNextUrl          (driveway.getNextUrl          ())     ;
                  current.setTrapUrl          (driveway.getTrapUrl          ())     ;
                  current.setCanCatch         (driveway.getCanCatch         ())     ;
                  current.setUrlChangeTime    (driveway.getTime             ())     ;
                  current.setStillUrl         (driveway.stillUrl              )     ;
                  current.setTrapSprung       (driveway.getTrapSprung       ())     ;
                  current.setPotentialCaptured(driveway.getPotentialCaptured())     ;
                  break;
          }
        createVideoSeries(current);
    };

   
    /**
     * Clears all of the values in the room and sets them to these default values.
     * Allows me to not have to worry about incorrect values being set when a new event occurs in a room.
     * Gets called each time buildState() is used.
     */
    var clearState = function clearState (oRoom) {
        oRoom.setCurUrl('')          ;
        oRoom.setNextUrl('')         ;
        oRoom.setTrapUrl('')         ;
        oRoom.setCatchTime(0)        ;
        oRoom.setTime(0)             ;
        oRoom.setTrapSprung(false)   ;
        oRoom.setPotentialCaptured(0);
    };


    /**
     * Sets the current values for each room, which will then be used the events function to
     * then set these values if user has current room selected
     * @param {object} oRoom  - Reference to the room we should be setting values for.
     * @param (object} rObj   - Object w/ properties for urls, time, & trap within the room.
     */
    var buildState = function buildState (oRoom, rObj) {
        clearState(oRoom);

        oRoom.setCurUrl           (rObj.curUrl           );
        oRoom.setNextUrl          (rObj.nextUrl          );
        oRoom.setTrapUrl          (rObj.trapUrl          );
        oRoom.setCatchTime        (rObj.catchTime        );
        oRoom.setTime             (current.getTime()     );
        oRoom.setTrapSprung       (rObj.trapSprung       );
        oRoom.setPotentialCaptured(rObj.potentialCaptured);
    };

    /**
     * Template used by events functions to store current values for each room. This is where the video player gets the url from.
     */
    var objRoom =  {
        curUrl            : ''
      , nextUrl           : ''
      , trapUrl           : ''
      , catchTime         : 0
      , setTime           : 0
      , trapSprung        : false
      , potentialCaptured : 0
    };


    /**
     * Sets values of this particular room each time current.getTime() matches the case value.
     * Case is equal to the current number of seconds into the game.
     * If the value of property is not set here, it will be set to default values of the objRoom.
     */
    var eventsHallOne         = function eventsHallOne () {
        var r    = Object.create(objRoom);

        switch (current.getTime()) {
          case 1:
                //r.curUrl    = camHallOne.c21    ;
                //r.trapUrl   = camHallOne.c130422;
                //r.catchTime = 3                 ;
                //console.log(r)                  ;
         
                // ONLY USE THESE WHEN TESTING OFFLINE
                r.curUrl    = aTempLocal[2];
                r.nextUrl   = aTempLocal[0];
                r.trapUrl   = aTempLocal[1];            
                r.catchTime = 3            ;

                buildState(hallOne, r);
              break;
            case 76:
                r.curUrl = camHallOne.c1152221;
                buildState(hallOne, r);
              break;
        }
    };


    var eventsKitchen = function eventsKitchen () {
        var r = Object.create(objRoom);

        switch (current.getTime()){
         
            case 1:
                //r.curUrl    = camKitchen.c1200431;
                //r.trapUrl   = camKitchen.c1240632;
                //r.catchTime = 83;
                r.curUrl    = aTempLocal[1];
                r.nextUrl   = aTempLocal[2];
                r.trapUrl   = aTempLocal[2];
                buildState(kitchen, r);
                break;
            case 90:
                r.curUrl = camKitchen.c1481231;
                buildState(kitchen, r);
            break;
            default:
                buildState(kitchen, r); 
        }
    };

    //// TODO: Need timestamps
    //var eventsEntry = function eventsEntry () {
    //    var entry = room.entryway;
    //    switch (current.getTime()){
    //      default:
    //          buildState(entry, null);
    //    }
    //};

    //var eventsLiving = function eventsLiving () {
    //    var living = room.livingRoom;
    //    //var r      = new objRoom();
    //    switch(current.getTime()) {
    //        case 60:
    //            r.curUrl = camLivingRoom.c1572241;
    //            buildState(living, r);
    //          break;
    //      case 117:
    //          //
    //        break;
    //      default:
    //        buildState(living, r);
    //    }
    //};

    //var eventsBathroom       = function eventsBathroom () {
    //    var bath = room.bathroom;
    //    //var r    = new objRoom();
    //    switch (current.getTime()) {
    //        case 18:
    //            r.curUrl = camBathroom.c180291;
    //            buildState(bath, r);
    //          break;
    //        case 37:
    //            r.curUrl    = camBathroom.c352291;
    //            r.trapUrl   = camBathroom.c431292;
    //            r.catchTime = 43;
    //            buildState(bath, r);
    //          break;
    //        case 48:
    //            r.curUrl    = camBathroom.c500291;
    //            r.trapUrl   = camBathroom.c430249b;
    //            r.catchTime = 49;
    //            buildState(bath, r);
    //          break;
    //      default:  // Only needed if the room does not have an event occurring as soon as the game starts. Used to be (bath, null);
    //          buildState(bath, r);
    //    }
    //};

    //var eventsBedroom         = function eventsBedroom () {
    //    var br = room.bedroom;
    //    //var r  = new objRoom();
    //    switch (current.getTime()) {
    //        case 1:
    //            r.curUrl    = camBedroom.c81;
    //            r.trapUrl   = camBedroom.c352482;
    //            r.catchTime = 34;
    //            buildState(br, r);
    //        break;
    //        case 54:
    //            r.curUrl = camBedroom.c540281;
    //            buildState(br, r);
    //        break;
    //      case 72: // This time is a guess. See the spreadsheet
    //        buildState(br, /* Missing video clip */ null, null, null);
    //        break;
    //    }
    //};

    //var eventshallTwo = function eventsHallTwo () {
    //    var hall = room.hallTwo;
    //    //var r    = new objRoom();
    //    switch (current.getTime()) {

    //      default:
    //        buildState(hall, r);
    //    }
    //};

    //var eventsDriveway = function eventsDriveway () {
    //    var drive = room.driveway;
    //    //var r     = new objRoom();
    //    switch(current.getTime()) {
    //      default:
    //        buildState(drive, r);
    //    }
    //};


    /**
     * Sets the poster (background) between clips to the room you are currently viewing
     * hasPlayed variable prevents the footage from looping.
     * Second 'ended' event draws poster to screen when 2nd clip has completed
     * @param {string}  sCurVidUrl   - Clip with the trap sequence.
     * @param {string} [sNextVidUrl] - Trap clips are often have a clip that appears next.
     * @param {string} [sTrapUrl]    - Path to URL w/ trap video.
     * @param {string}  sStillUrl    - Path to URL w/ poster image.
     */
     var createVideoSeries = function createVideoSeries() {
    
       /* At beginning of game, user clicks on a room w/ out a video OR user has already set a trap
        * and returns to that same room before a new clip is set to begin.                       */
       if (current.getCurUrl() === null || current.getCurUrl() === '' || current.getTrapSprung() === true) {  
          video.poster(current.getStillUrl());
          displayStill();
          return;
        }

        var hasPlayed = false;
        video.poster(current.getStillUrl());
        playVideo(current.getCurUrl());

        // Did not catch / no chance to catch....so play next video
        video.on('ended', function() {
            if (hasPlayed === false) {
                if (current.getNextUrl()) {
                    playVideo(current.getNextUrl());
                } else {
                    displayStill();
                }
            }

            // Video has already played, so use a still
            hasPlayed = true;
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
        createTrapVidSeries(current.getTrapUrl(), current.getNextUrl(), current.getPotentialCaptured());
        toggleTrapListener(false);
    };


    /**
     * Mark trap as having been sprung after user selects a room.
     * To be used by createTrapVidSeries().
     */
    var setTrapAsSprung = function setTrapAsSprung () {
      switch (current.getCam()){
        case 'hallOne':
          hallOne   .setTrapSprung(true);
          break;
        case 'kitchen':
          kitchen   .setTrapSprung(true);
          break;
        case 'entryway':
          entryway  .setTrapSprung(true);
          break;
        case 'livingroom':
          livingRoom.setTrapSprung(true);
          break;
        case 'bathroom':
          bathroom  .setTrapSprung(true);
          break;
        case 'bedroom':
          bedroom   .setTrapSprung(true);
          break;
        case 'hallTwo':
          hallTwo   .setTrapSprung(true);
          break;
        case 'driveway':
          driveway  .setTrapSprung(true);
          break;
      }
    };


    /**
     * Sets the poster (background) between clips to the room you are currently viewing.
     * hasPlayed variable prevents the footage from looping.
     * Second 'ended' event draws poster to screen when 2nd clip has completed.
     * @param {string} curVidUrl        - Clip with the trap sequence.
     * @param {string} [nextVid]        - Trap clips are often have a clip that appears next.
     * @param {number} nPotentialCaptured - Number of augers that could have been captured in this scene
     */
    var createTrapVidSeries = function createTrapVidSeries (sTrapUrl, sNextUrl, nPotentialCaptured) {
      setTrapAsSprung();
      video.src(sTrapUrl);
      video.play();
      nTotalCaptured.set(nPotentialCaptured);

      // Video has already played & there is no nextUrl, so use a still
      video.on('ended', function () {
        if (sNextUrl === null) {
          displayStill();
        } else {
          // Play next video here  & when it ends, set a still
          video.src(sNextUrl);
          video.play();

          // When second video has finished, use a still
          video.on('ended', function () {
            displayStill();
          });
        }
      });
    };


    /**
     * Have a buffer 1 second before / after catchTime to allow users to try to catch a character.
     * If current.getTime() is between this buffer, then allow user to set the trap.
     * @param {number} nCatchTime - When can the user trigger the trap?
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
     * @param   {number} caseTime     - Which event (time) is creating this object?
     * @param   {number} currentTime  - What is the current game time when this function is called?
     * @returns {number} result       - Diff b/t nCaseTime, which is set in the Update() method of each room, & nCurrentTime.get().
     */
    var nTimeDiff             = function  nTimeDiff(caseTime, currentTime) {
        current.setJustSwitched(false);
        var floorCurrentTime  = Math.floor(currentTime);
        var floorCaseTime     = Math.floor(caseTime   );
        var result            = floorCurrentTime - floorCaseTime;

        return result;
    };


    /**
     * Pauses audio played during stills, sets new video source, & begins to play.
     * Only use diff if the user has selected a room after a video has started playing.
     * @param {string} clipUrl - Address of clip to play.
     * TODO: Do not need diff if it is not a trap. Move this to the trap
     */
    var playVideo             = function playVideo (urlClip) {
        audioElem.pause();
        video.src(urlClip);
        video.load();
        video.play();
        if (current.getJustSwitched() === true){
           var diff = nTimeDiff(current.getUrlChangeTime(), current.getTime());
           video.currentTime(diff);
        }
        updateVidSource();
    };


    /**
     * Sets Object.observe for each room in the game.
     */
    var updateVidSource = function updateVidSource () {
      observeRoom(hallOne,    'hallOne'   );
      observeRoom(kitchen,    'kitchen'   );
      observeRoom(entryway,   'entryway'  );
      observeRoom(livingroom, 'livingroom');
      observeRoom(bathroom,   'bathroom'  );
      observeRoom(bedroom,    'bedroom'   );
      observeRoom(hallTwo,    'hallTwo'   );
      observeRoom(driveway,   'driveway'  );
    };


    /**
     * This occurs automatically, as Object.observe is constantly polling to check if values have changed.
     * If player is watching a room & the currentUrl of a video changes at any point (this is done in the events[RoomName] function),
     * then that new URL is passed into the video player & played.
     * @param {object} - Name of the room
     * @param {string} - Name of the room
     */
    var observeRoom = function observeRoom (oRoom, sRoomName) {
      Object.observe(oRoom,  function (changes) {

        if (changes[0]!== undefined) {
          var oldUrl = changes[0].oldValue;
          var newUrl = oRoom.getCurUrl();

          if (oldUrl !== newUrl && current.getCam() === sRoomName) {
            playVideo(newUrl);
          }
        }
      });
    };


    /**
     * TODO: Test this out
     * Updates HTML to reflect the current values of possible and captured.
     */
    var observeTrapValues = function observeTrapValues () {
      Object.observe(traps,  function (changes) {

        if (changes[0]!== undefined) {
          var nCaughtOld = changes[0].oldValue;
          var nCaughtNew = changes[0].oldValue;

          if (nCaughtOld !== nCaughtNew) {
            possibleElem.innerHTML = traps.nTotalCaptured.get();
            capturedElem.innerHTML = traps.nTotalPossible.get();
          }
        }
      });
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