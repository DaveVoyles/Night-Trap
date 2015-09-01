(function() {
    'use strict';

    /**
     * Obj to get / set current values for the each room.
     * @property {string} stillUrl    - Background image when room is empty.
     * @property {bool}   bCanCatch   - Is there a character who can be caught in the scene?
     * @property {number} time        - Current time stamp when curUrl is being set.
     * @property {number} catchTime   - When can the user catch an auger?
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
            return this.trapUrl;                                               xw
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
     * @property {number} urlChangeTime - Time into the game should curUrl should be set.
     * @property {number} time          - Current time stamp when curUrl is being set.
     * @property {number} catchTime     - When can the user catch an auger?
     * @property {sting}  curUrl        - Url should be set as video.src() right now.
     * @property {string} nextUrl       - NextUrl to be set as video.src() when curUrl finishes.
     * @property {string} trapUrl       - If a character can be trapped in the scene, have it trigger this Url.
     * @property {bool}   bTrapSpring   - Has the user set the trap in this current scene yet?
     * @property {bool}   bJustSwitched - Has the currentUrl switched since the user selected this room?
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
            this.caught += 1;
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
            this.missed += 1;
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
          c21:      'https://nighttrap.blob.core.windows.net/vid/hallone/00000021.mp4'
        // TRAP: Augers caught in hall
        , c130422:  'https://nighttrap.blob.core.windows.net/vid/hallone/00130422.mp4'
        // Tony, Jeff, & Dad enter from basement
        , c1152221: 'https://nighttrap.blob.core.windows.net/vid/hallone/02500221.mp4'           //TODO: These numbers don't match
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
        // Mom enters from bookshelf
          c1572241: 'https://nighttrap.blob.core.windows.net/vid/livingroom/01572241.mp4'
         // Augers enter from outside. Marked as 3230241 in the doc. TODO: Look at correcting this
         ,c232241:  'https://nighttrap.blob.core.windows.net/vid/livingroom/00232241.mp4'
        // TRAP: Augers caught on bookshelf
        , c271442:  'https://nighttrap.blob.core.windows.net/vid/livingroom/00271442.mp4'
        // Augers Escape  TODO: Listed as 3330841 in excel spreadsheet
        , c271641:  'https://nighttrap.blob.core.windows.net/vid/livingroom/00271641.mp4'
        // TRAP: Auger caught on library 
        , c554164a: 'https://nighttrap.blob.core.windows.net/vid/livingroom/0554164a.mp4'
        // 2 Augers enter from outside
        , c1001241 :'https://nighttrap.blob.core.windows.net/vid/livingroom/01001241.mp4'
        // TRAP: Augers caught on right side of living room
        , c1071042: 'https://nighttrap.blob.core.windows.net/vid/livingroom/01071042.mp4'
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
//        eventsKitchen();
        eventsEntry();
//        eventsLiving();
//        eventsBathroom();
        eventsBedroom();
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
                  current.setCam          ('hallOne'                    );
                  current.setCurUrl       (room.hallOne.getCurUrl     ());
                  current.setNextUrl      (room.hallOne.getNextUrl    ());
                  current.setTrapUrl      (room.hallOne.getTrapUrl    ());
                  current.setCatchTime    (room.hallOne.getCatchTime  ());
                  current.setCanCatch     (room.hallOne.getCanCatch   ());
                  current.setUrlChangeTime(room.hallOne.getTime       ());
                  current.setStillUrl     (room.hallOne.stillUrl        );
                  current.setTrapSprung   (room.hallOne.getTrapSprung ());
                  break;
              case 'Kitchen':
                  current.setCam          ('kitchen'                    );
                  current.setCurUrl       (room.kitchen.getCurUrl     ());
                  current.setNextUrl      (room.kitchen.getNextUrl    ());
                  current.setTrapUrl      (room.kitchen.getTrapUrl    ());
                  current.setCanCatch     (room.kitchen.getCanCatch   ());
                  current.setUrlChangeTime(room.kitchen.getTime       ());
                  current.setStillUrl     (room.kitchen.stillUrl        );
                  current.setTrapSprung   (room.kitchen.getTrapSprung ());
                  break;
              case 'Entry-Way':
                  current.setCam          ('entryway'                   );
                  current.setCurUrl       (room.entryway.getCurUrl    ());
                  current.setNextUrl      (room.entryway.getNextUrl   ());
                  current.setTrapUrl      (room.entryway.getTrapUrl   ());
                  current.setCanCatch     (room.entryway.getCanCatch  ());
                  current.setUrlChangeTime(room.entryway.getTime      ());
                  current.setStillUrl     (room.entryway.stillUrl       );
                  current.setTrapSprung   (room.entryway.getTrapSprung ());
                  break;
              case 'Living-Room':
                  current.setCam          ('livingroom'                 );
                  current.setCurUrl       (room.livingRoom.getCurUrl  ());
                  current.setNextUrl      (room.livingRoom.getNextUrl ());
                  current.setTrapUrl      (room.livingRoom.getTrapUrl ());
                  current.setCanCatch     (room.livingRoom.getCanCatch());
                  current.setUrlChangeTime(room.livingRoom.getTime    ());
                  current.setStillUrl     (room.livingRoom.stillUrl     );
                  current.setTrapSprung   (room.livingRoom.getTrapSprung ());
                  break;
              case 'Bathroom':
                  current.setCam           ('bathroom'                   );
                  current.setCurUrl       (room.bathroom.getCurUrl    ());
                  current.setNextUrl      (room.bathroom.getNextUrl   ());
                  current.setTrapUrl      (room.bathroom.getTrapUrl   ());
                  current.setCanCatch     (room.bathroom.getCanCatch  ());
                  current.setUrlChangeTime(room.bathroom.getTime      ());
                  current.setStillUrl     (room.bathroom.stillUrl       );
                  current.setTrapSprung   (room.bathroom.getTrapSprung ());
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
                  break;
              case 'Hall-2':
                  current.setCam          ('hallTwo'                    );
                  current.setCurUrl       (room.hallTwo.getCurUrl     ());
                  current.setNextUrl      (room.hallTwo.getNextUrl    ());
                  current.setTrapUrl      (room.hallTwo.getTrapUrl    ());
                  current.setCanCatch     (room.hallTwo.getCanCatch   ());
                  current.setUrlChangeTime(room.hallTwo.getTime       ());
                  current.setStillUrl     (room.hallTwo.stillUrl        );
                  current.setTrapSprung   (room.hallTwo.getTrapSprung ());
                  break;
              case 'Driveway':
                  current.setCam          ('driveway'                   );
                  current.setCurUrl       (room.driveway.getCurUrl    ());
                  current.setNextUrl      (room.driveway.getNextUrl   ());
                  current.setTrapUrl      (room.driveway.getTrapUrl   ());
                  current.setCanCatch     (room.driveway.getCanCatch  ());
                  current.setUrlChangeTime(room.driveway.getTime      ());
                  current.setStillUrl     (room.driveway.stillUrl       );
                  current.setTrapSprung   (room.driveway.getTrapSprung ());
                  break;
          }
        createVideoSeries(current.getCurUrl(), current.getNextUrl(), current.getTrapUrl(), current.getStillUrl());
    };


    /**
     * Sets the current values for each room, which will then be used the events function to
     * then set these values if user has current room selected
     * @param {object}  oRoom      - Name of the room we should be setting values for
     * @param {string}  curUrl     - Path to video which should be set at this point in time.
     * @param {string} [nextUrl]   - Path to video that should play when curUrl is completed.
     * @param {string} [trapUrl]   - Path to video containing the trap scene.
     * @param {number} [catchTime] - Moment when user can trigger a trap.
     */
    var buildState = function buildState (oRoom, curUrl, nextUrl, trapUrl, catchTime) {
        clearState(oRoom);
        oRoom.setCurUrl    (curUrl)           ;
        oRoom.setNextUrl   (nextUrl)          ;
        oRoom.setTrapUrl   (trapUrl)          ;
        oRoom.setCatchTime (catchTime)        ;
        oRoom.setTime      (current.getTime());
        oRoom.setTrapSprung(false)            ;
    };


    /**
     * Clears all of the values in the room. This makes it easier to debug when I mistakenly put the wrong value in for each room
     * during the buildState function.
     * */
    var clearState = function (oRoom) {
      oRoom.setCurUrl('');
      oRoom.setNextUrl('');
      oRoom.setTrapUrl('');
      oRoom.setCatchTime(0);
      oRoom.setTime(0);
      oRoom.setTrapSprung(false);
    };


    /**
     * Sets values of this particular room each time current.getTime() matches the case value.
     * Case is equal to the current number of seconds into the game.
     */
    var eventsHallOne         = function eventsHallOne () {
        var hall = room.hallOne;
        switch (current.getTime()) {
          case 1:
              buildState(hall, camHallOne.c21, null, camHallOne.c130422, 3);
              break;
          case 76:
              buildState(hall, camHallOne.c1152221, null, null, null);
              break;
        }
    };

    var eventsKitchen = function eventsKitchen () {
        var kitch = room.Kitchen;
        switch (current.getTime()){
          case 81:
            buildState(kitch, camKitchen.c1200431, null, camKitchen.c1240632, 83);
            break;
          case 90:
            buildState(kitch, camKitchen.c1481231);
            break;
          default:
            buildState(kitch, null, null);
        }
    };

    // TODO: Need timestamps
    var eventsEntry = function eventsEntry () {
        var entry = room.entryway;
        switch (current.getTime()){
          default:
              buildState(entry, null);
        }
    };

    var eventsLiving = function eventsLiving () {
        var living = room.livingRoom;
        switch(current.getTime()) {
          case 60:
              buildState(living, cam.livingRoom.c1572241, null, null);
              break;
          case 117:
              //
            break;
          default:
            buildState(living, null);
        }
    };

    var eventsBathroom       = function eventsBathroom () {
        var bath = room.bathroom;
        switch (current.getTime()) {
            case 18:
              buildState(bath, camBathroom.c180291, null, null, null);
              break;
            case 37:
              buildState(bath, camBathroom.c352291, null,  camBathroom.c431292, 43);
              break;
            case 48:
              buildState(bath, camBathroom.c500291, null, camBathroom.c430249b, 49);
              break;
          default:  // Only needed if the room does not have an event occurring as soon as the game starts
              buildState(bath, null);
        }
    };

    var eventsBedroom         = function eventsBedroom () {
        var br = room.bedroom;
        switch (current.getTime()) {
          case 1:
            buildState(br, camBedroom.c81,    null, camBedroom.c352482, 34);
            break;
          case 54:
            buildState(br, camBedroom.c540281, null, null, null);
            break;
          case 72: // This time is a guess. See the spreadsheet
            buildState(br, /* Missing video clip */ null, null, null);
            break;
        }
    };

    var eventshallTwo = function eventsHallTwo () {
        var hall = room.hallTwo;
        switch (current.getTime()) {

          default:
            buildState(hall, null);
        }
    };

    var eventsDriveway = function eventsDriveway () {
        var drive = room.driveway;
        switch(current.getTime()) {
          default:
            buildState(drive, null);
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

        /* At beginning of game, user clicks on a room w/ out a video OR user has already set a trap
         * and returns to that same room before a new clip is set to begin */
        //TODO: This may have to be set to check if it is '' as well
         if (sCurVidUrl ===  null || current.getTrapSprung() === true) {
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
            }

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
     * Second 'ended' event draws poster to screen when 2nd clip has completed.
     * Mark trap as having been sprung after user selects a room.
     * @param {string} curVidUrl - Clip with the trap sequence.
     * @param {string} [nextVid] - Trap clips are often have a clip that appears next.
     */
    var createTrapVidSeries = function createTrapVidSeries (sTrapUrl, sNextUrl) {
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
     * @returns {number} Result Diff b/t nCaseTime, which is set in the Update() method of each room, & nCurrentTime.get().
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
//        updateVidSource();
    };


    /**
     * Sets Object.observe for each room in the game.
     */
    var updateVidSource = function updateVidSource () {
      observeRoom(room.hallOne,    'hallOne'   );
      observeRoom(room.kitchen,    'kitchen'   );
      observeRoom(room.entryway,   'entryway'  );
      observeRoom(room.livingRoom, 'livingroom');
      observeRoom(room.bathroom,   'bathroom'  );
      observeRoom(room.bedroom,    'bedroom'   );
      observeRoom(room.hallTwo,    'hallTwo'   );
      observeRoom(room.driveway,   'driveway'  );
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
     * Plays a sound effect during gameplay. Used for traps, passwords
     * @param {string} clipUrl - Address of clip to play.
     */
    var playSfx               = function playSfx (urlClip) {
        audioElem.src = urlClip;
        audioElem.play();
    };


    init();

})();