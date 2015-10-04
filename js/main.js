var mainJS = (function () {
    'use strict';

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

    /**
     * Wires up event handlers for buttons.
     * Sets src property for video player and sets reference to audio tag
     * Inits update loop.
     */
    var init                   = function init () {
        registerRoomButton   ();
        initializeAudio      ();
        initializeVideoStream();
        observeAllRooms      (); 
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

    var update = function update(delta) {
        elapsedTime();
        updateTimeOnScreen();
        calcCatchTime(current.getCatchTime());

        eventsHallOne();
        eventsKitchen();
        //eventsEntry   ();
        //eventsLiving  ();
        eventsBathroom();
        eventsBedroom();
        //eventsHallTwo ();
        //eventsDriveway();
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
     * Update (handles the timer) waits for the video to be loaded before init. 
     */
    var initializeVideoStream = function initializeVideoStream() {
        video = videojs('video-player');
        if (!Modernizr.video) {
            window.open('http://outdatedbrowser.com/en', '_blank');
        }
        if (bDebug) {
            video.src([{ type: 'video/mp4', src: camMisc.c11 }]);
            video.load();
            video.play();
        } else {
            video.src([{ type: 'video/mp4', src: camMisc.c11 }]);
            video.load();
            video.play();
        }

        document.getElementById('video-player').addEventListener('contextmenu', function(e) {
            e.defaultPrevented();
        }, false);

        video.on('loadeddata',
            MainLoop.setUpdate(update).start()
          , false
        );
    }


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
                  current.setStillUrl         (hallOne.getStillUrl         ())      ;
                  current.setTrapSprung       (hallOne.getTrapSprung       ())      ;
                  current.setPotentialCaptured(hallOne.getPotentialCaptured());

                  console.log('H: ' + hallOne.getCurUrl());
                  console.log('C: ' + current.getCurUrl());
                  break                                                             ;
              case 'Kitchen':
                  current.setCam              ('kitchen'                     )      ;
                  current.setCurUrl           (kitchen.getCurUrl           ())      ;
                  current.setNextUrl          (kitchen.getNextUrl          ())      ;
                  current.setTrapUrl          (kitchen.getTrapUrl          ())      ;
                  current.setCanCatch         (kitchen.getCanCatch         ())      ;
                  current.setUrlChangeTime    (kitchen.getTime             ())      ;
                  current.setStillUrl         (kitchen.getStillUrl         ())      ;
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
                  current.setStillUrl         (entryway.getStillUrl         ())     ;
                  current.setTrapSprung       (entryway.getTrapSprung       ())     ;
                  current.setPotentialCaptured(entryway.getPotentialCaptured())     ;
                  break                                                             ;
              case 'Living-Room':
                  current.setCam              ('livingroom'                     )   ;
                  current.setCurUrl           (livingroom.getCurUrl           ())   ;
                  current.setNextUrl          (livingroom.getNextUrl          ())   ;
                  current.setTrapUrl          (livingroom.getTrapUrl          ())   ;
                  current.setCanCatch         (livingroom.getCanCatch         ())   ;
                  current.setUrlChangeTime    (livingroom.getTime             ())   ;
                  current.setStillUrl         (livingroom.getStillUrl         ())   ;
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
                  current.setStillUrl         (bathroom.getStillUrl         ())     ;
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
                  current.setStillUrl         (bedroom.getStillUrl         ())      ;
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
                  current.setStillUrl         (hallTwo.getStillUrl         ())      ;
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
                  current.setStillUrl         (driveway.getStillUrl         ())     ;
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
        oRoom.setCurUrl           ('')   ;
        oRoom.setNextUrl          ('')   ;
        oRoom.setTrapUrl          ('')   ;
        oRoom.setCatchTime        (0)    ;
        oRoom.setTime             (0)    ;
        oRoom.setTrapSprung       (false);
        oRoom.setPotentialCaptured(0)    ;
    };


    /**
     * Sets the current values for each room, which will then be used by events() to
     * set these values if user has current room selected. Wipes values from previous state, first.
     * @param {object} oRoom  - Reference to the room we should be setting values for.
     * @param (object} rObj   - Object w/ properties for urls, time, & trap within the room.
     */
    var buildState = function buildState (oRoom, roomTemp) {
        clearState(oRoom);

        oRoom.setCurUrl           (roomTemp.curUrl           );
        oRoom.setNextUrl          (roomTemp.nextUrl          );
        oRoom.setTrapUrl          (roomTemp.trapUrl          );
        oRoom.setCatchTime        (roomTemp.catchTime        );
        oRoom.setTime             (current.getTime()         );
        oRoom.setTrapSprung       (roomTemp.trapSprung       );
        oRoom.setPotentialCaptured(roomTemp.potentialCaptured);
    };


    /**
     * Template used by events functions to store current values for each room. This is where the video player gets the url from.
     * A new instance is created for each room, with: Object.create(objRoom);
     * Object.observe uses this to detect value changes, then changes video.src() on the fly, so it must 
     * remain an object and cannot be turned into a function.
     */
    var roomTemplate =  {
        curUrl            : ''
      , nextUrl           : ''
      , trapUrl           : ''
      , catchTime         : 0
      , setTime           : 0
      , trapSprung        : false
      , potentialCaptured : 0
      , sRoomName         : ''
    };

    var hallOneTemplate = Object.create(roomTemplate);
    var kitchenTemplate = Object.create(roomTemplate);
    var entryTemplate   = Object.create(roomTemplate);
    var livingTemplate  = Object.create(roomTemplate);
    var bathTemplate    = Object.create(roomTemplate);
    var bedTemplate     = Object.create(roomTemplate);
    var hallTwoTemplate = Object.create(roomTemplate);
    var driveTemplate   = Object.create(roomTemplate);


    /**
     * Creates an object & sets values of this particular room each time current.getTime() matches the case value.
     * Case is equal to the current number of seconds into the game.
     * If the value of property is not set here, it will be set to default values of the objRoom.
     */
    var eventsHallOne         = function eventsHallOne () { 
        var h           = hallOneTemplate;
            h.sRoomName = 'hallOne'      ;
            
        switch (current.getTime()) {
            case minSecToNum(0, 1):
                // ONLY USE THESE WHEN TESTING OFFLINE
                //h.curUrl    = aTempLocal[0];
                //h.nextUrl   = aTempLocal[1];
                //h.trapUrl   = aTempLocal[2];            
                //h.catchTime = 3;
                h.curUrl     = camHallOne.c21    ;
                h.trapUrl    = camHallOne.c130422;
                h.catchTime  = minSecToNum(0, 13);                
                buildState(hallOne, h)           ;
                break                            ;
            case minSecToNum(1, 16):
                h.curUrl    = camHallOne.c1152221;
                buildState(hallOne, h)           ;
                break                            ;
            case minSecToNum(2, 50):
                h.curUrl    = camHallOne.c2500221;
                h.trapUrl   = camHallOne.c3150422;
                h.catchTime = minSecToNum(3, 14) ;
                buildState(hallOne, h)           ;
                break                            ;
            case minSecToNum(3, 34):
                h.curUrl    = camHallOne.c3332421;
                h.trapUrl   = camHallOne.c3422422;
                h.catchTime = minSecToNum(3, 42) ;
                buildState(hallOne, h)           ;
                break                            ;
            case minSecToNum(4, 45):
                h.curUrl    = camHallOne.c4442421;
                buildState(hallOne, h)           ;
                break                            ;
            default:
                //buildState(hallOne, h);
        }
    };

    var eventsKitchen         = function eventsKitchen() {
        var k                 = kitchenTemplate;
            k.sRoomName       = 'kitchen'      ;
            
        switch (current.getTime()){     
            case minSecToNum(1, 21):
                k.curUrl      = camKitchen.c1200431;
                k.trapUrl     = camKitchen.c1240632;
                k.catchTime   = minSecToNum(1, 23) ;
                buildState(kitchen, k)            ;
                break                             ;
            case minSecToNum(1, 48):
                k.currentUrl  = camKitchen.c1481231;
                buildState(kitchen, k)            ;
                break                             ;
            case minSecToNum(3, 54):
                k.curUrl      = camKitchen.c3540631;
                buildState(kitchen, k)            ;
                break                             ;
            default:
                buildState(kitchen, k);
        }
    };

    var eventsEntry           = function eventsEntry() {
        var e                 = entryTemplate;
            e.sRoomName       = 'entryway'   ;
            
        switch (current.getTime()) {
            case minSecToNum(1, 33):
                e.curUrl      = camEntryway.c1320261;
                e.trapUrl     = camEntryway.c1391862;
                e.catchTime   = minSecToNum(1, 39)  ;
                buildState(entryway, e)           ;
                break;
            case minSecToNum(2, 13):
                e.curUrl      = camEntryway.c2122461;
                e.trapUrl     = camEntryway.c2590262;
                e.catchTime   = minSecToNum(2,58)   ;
                buildState(entryway, e)           ;
                break;
              default:
                  buildState(entryway, e);
        }
    };

    var eventsLiving          = function eventsLiving () {
        var l                 = livingTemplate;
            l.sRoomName       = 'livingRoom'  ;
            
       switch(current.getTime()) {
           case minSecToNum(0, 25):
               l.curUrl       = camLivingRoom.c232241 ;
               l.trapUrl      = camLivingRoom.c271442 ;
               l.catchTime    = minSecToNum(0, 27)    ;
               l.nextUrl      = camLivingRoom.c271641 ;
               buildState(livingroom, l)           ;
               break                               ;
           case minSecToNum(1, 0):
               l.curUrl       = camLivingRoom.c1001241; 
               l.trapUrl      = camLivingRoom.c1071042;
               l.catchTime    = minSecToNum(1, 6)     ;
               buildState(livingroom, l)           ;
               break                               ;
         case minSecToNum(1, 57):
              l.curUrl        = camLivingRoom.c1572241    ;
              buildState(livingroom, l)            ;
              break                                ;
        case minSecToNum(3, 24):
              l.curUrl        = camLivingRoom.c3230241 ;
              l.trapUrl       = camLivingRoom.c3330842 ;
              l.catchTime     = minSecToNum(3, 32)     ;
              l.nextUrl       = camLivingRoom.c3330841 ;
              buildState(camLivingRoom, l)         ;
            break                                  ;
        case minSecToNum(4, 43):
              l.curUrl        = camLivingRoom.c4511041 ;
              l.trapUrl       = camLivingRoom.c3330842 ;
              l.catchTime     = minSecToNum(4, 56)     ;
              buildState(livingroom, l)            ;
              break;
         default:
            buildState(livingroom, l);
       }        
    };

    var eventsBathroom        = function eventsBathroom () {
       var b                  = bathTemplate;
           b.sRoomName        = 'bathroom'  ;
           
       switch (current.getTime()) {
           case minSecToNum(0, 18):
               b.curUrl       = camBathroom.c180291    ;
               buildState(bathroom, b)                 ;
               break                                   ;
           case minSecToNum(0, 37):
               b.curUrl       = camBathroom.c352291    ;
               b.trapUrl      = camBathroom.c431292    ;
               b.catchTime    = minSecToNum(0, 43)     ;                 
               buildState(bathroom, b)                 ;
               break                                   ;
           case minSecToNum(0, 48):
               b.curUrl       = camBathroom.c500291    ;
               b.trapUrl      = camBathroom.c430249b   ;
               b.catchTime    = minSecToNum(0, 49)     ;
               buildState(bathroom, b)                 ;
               break                                   ;
         default: 
             buildState(bathroom, b);
       }
    };

    var eventsBedroom         = function eventsBedroom () {
       var bed           = bedTemplate;
           bed.sRoomName = 'bedrom'   ;
           
       switch (current.getTime()) {
           case minSecToNum(0, 1):
               bed.curUrl    = camBedroom.c81      ;
               bed.trapUrl   = camBedroom.c352482  ;
               bed.catchTime = minSecToNum(0, 34)  ;
               buildState(bedroom, bed)            ;
               break                             ;
           case minSecToNum(0, 54):
               bed.curUrl = camBedroom.c540281     ;
               buildState(bedroom, bed)            ;
               break                             ;
           case minSecToNum(3, 7): // May need to start with 07? But strict mode does not allow
               bed.curUrl    = camBedroom.c3060281 ;
               bed.trapUrl   = camBedroom.c3262482 ;
               bed.catchTime = minSecToNum(3, 25)  ;
               buildState(bedroom, bed)            ;              
               break                             ;
           case minSecToNum(4, 35):
               bed.curUrl    = camBedroom.c4390482 ;
               bed.trapUrl   = camBedroom.c4390482 ;
               bed.catchTime = minSecToNum(4, 38)  ;
               buildState(bedroom, bed)            ;
               break                             ;
        default:
              buildState(bedroom, bed);
       }
    };

    var eventsHallTwo = function eventsHallTwo () {
       var hall           = hallTwoTemplate;
           hall.sRoomName = 'hallTwo';

       switch (current.getTime()) {
           case minSecToNum(0, 31):
                hall.curUrl = camHallTwo.c310471   ;
                buildState(hallTwo, hall)          ;
                break                           ;
            case minSecToNum(0, 51):
                hall.curUrl    = camHallTwo.c500271;
                hall.trapUrl   = camHallTwo.c542272;
                hall.catchTime = minSecToNum(0, 54);
                buildState(hallTwo, hall)          ;
                break                           ;

           case minSecToNum(2, 39):
               hall.curUrl = camHallTwo.c2390671   ;
               buildState(hallTwo, hall)           ;
               break                            ;
           case minSecToNum(4, 2):
               hall.curUrl    = camHallTwo.c4000471; 
               hall.trapUrl   = camHallTwo.c4120872;
               hall.catchTime = minSecToNum(4, 11) ;
               buildState(hallTwo, hall)           ;
               break;
         default:
           buildState(hallTwo, hall);
       }
    };

    var eventsDriveway = function eventsDriveway () {
       var d           = driveTemplate;
           d.sRoomName = 'driveway';
 
       switch(current.getTime()) {
           case minSecToNum(1, 56):
               d.curUrl    = camDriveway.c1440451;
               d.trapUrl   = camDriveway.c3481052;
               d.catchTime = minSecToNum(2, 45)  ;
               buildState(driveway, d)           ;
               break;        
         default:
           buildState(driveway, d);
       }
    };


    /**
     * Still to play when no action occurs. Sets video.src to src so that the still image can be displayed as a poster
     * TODO: Need to make this audio loop
     */
    var displayStill          = function displayStill () {
        video.src(video.src);
        audioElem.src = aAudioClips.crickets;
        audioElem.play();
    };


    /**
     * Sets the poster (background) between clips to the room you are currently viewing
     * hasPlayed variable prevents the footage from looping.
     * Second 'ended' event draws poster to screen when 2nd clip has completed
     * @param {string}  sCurVidUrl   - Clip with the trap sequence.
     * @param {string} [sNextVidUrl] - Trap clips often have a clip that appears next.
     * @param {string} [sTrapUrl]    - Path to URL w/ trap video.
     * @param {string}  sStillUrl    - Path to URL w/ poster image.
     */
     var createVideoSeries = function createVideoSeries() {
    
       /* At beginning of game, user clicks on a room w/ out a video OR user has already set a trap
        * and returns to that same room before a new clip is set to begin.                       */
       if (current.getCurUrl() === null || current.getCurUrl() === '' || current.getTrapSprung() === true) {
           console.log(current.getStillUrl());
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
            livingroom.setTrapSprung(true);
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
        video.pause(); //TODO: Not sure if this is needed.
        video.src(urlClip);
        video.load();
        video.play();
        if (current.getJustSwitched() === true) { //TODO: not sure if I need this?
            var diff = nTimeDiff(current.getUrlChangeTime(), current.getTime());
            //console.log('URL change Time: ' +current.getUrlChangeTime());
            //console.log('get time:' + current.getTime());
            //console.log('clip: ' + urlClip);
            //console.log(current);
            console.log('diff: ' + diff);
            video.currentTime(diff);
        }
        console.log('currentTime: ' + video.currentTime());
    };


    /**
     * This occurs automatically, as Object.observe is constantly polling to check if values have changed.
     * If player is watching a room & the currentUrl of a video changes at any point (this is done in the events[RoomName] function),
     * then that new URL is passed into the video player & played.
     * @param {object} roomTemp - Room we are operating on.
     */
    var ObserveRoom = function observeRoom(roomTemp) {
        Object.observe(roomTemp, function (changes) {
            if (changes[0] !== undefined) {
                var oldUrl              = changes[0].oldValue;
                var curUrl              = changes[0].object.curUrl;
                var watchingCurrentRoom = current.getCam() === roomTemp.sRoomName;
                var curUrlHasChanged    = curUrl !== oldUrl;

                if (curUrlHasChanged && watchingCurrentRoom) {
                }
            }
        });
    };


    /**
     * Sets Object.observe for each room in the game.
     */
    var observeAllRooms = function observeAllRooms() {
        var observeHallOne = new ObserveRoom(hallOneTemplate  );
        var observeKitchen = new ObserveRoom(kitchenTemplate  );
        var observeEntry   = new ObserveRoom(entryTemplate    );
        var observeLiving  = new ObserveRoom(livingTemplate   );
        var observeBath    = new ObserveRoom(bathTemplate     );
        var observeBed     = new ObserveRoom(bedTemplate      );
        var observeHallTwo = new ObserveRoom(hallTwoTemplate  );
        var observeDrive   = new ObserveRoom(driveTemplate    );
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