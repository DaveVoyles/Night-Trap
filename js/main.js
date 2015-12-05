var mainJS = (function () {
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

    // Timer to keep track of user's time spent in-game
    //var nTimeStart             = new Date();
    var nTimeStart = 0;
    // Audio element for SFX, passwords, and noises during stills
    var audioElem              = null;
    // Are we in Debug mode?
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
        document.getElementById('hallOne'   ).addEventListener(   'click', changeVideoStream, false);
        document.getElementById('kitchen'   ).addEventListener(   'click', changeVideoStream, false);
        document.getElementById('entryway'  ).addEventListener(   'click', changeVideoStream, false);
        document.getElementById('livingroom').addEventListener(   'click', changeVideoStream, false);
        document.getElementById('bathroom'  ).addEventListener(   'click', changeVideoStream, false);
        document.getElementById('bedroom'   ).addEventListener(   'click', changeVideoStream, false);
        document.getElementById('hallTwo'   ).addEventListener(   'click', changeVideoStream, false);
        document.getElementById('driveway'  ).addEventListener(   'click', changeVideoStream, false);
    };


    /**
     * Converts seconds to "MM:SS"
     * @param {number} seconds - Takes seconds and returns it in string format of MM:SS for on screen timer
     */
    var secondsToTimeString   = function secondsToTimeString (seconds) {

        var s                 = Math.floor( seconds % 60);
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
        var min = minutes  || 0;
        var sec = seconds  || 0;

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

        eventsHallOne ();
        eventsKitchen ();
        eventsEntry   ();
        eventsLiving  ();
        eventsBathroom();
        eventsBedroom ();
        eventsHallTwo ();
        eventsDriveway();
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

    Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function(){
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
})


    /**
     * Check if browser supports audio -- if not, tell user to update
     * Loads video as soon as page loads for Video.js player.
     * Disable right-click controls for video player. Cannot reference videoJs directly, event listener
     * does not work.
     * Update (handles the timer) waits for the video to be loaded before init. 
     */
    var initializeVideoStream = function initializeVideoStream() {
        if (!Modernizr.video) {
            window.open('http://outdatedbrowser.com/en', '_blank');
        }
        if (bDebug) {
            video.src([{ type: 'video/mp4', src: camMisc.c11 }]);
            //video.src([{ type: 'video/mp4', src: aTempLocal[0] }]);  // Local video
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

        if (video.playing) {
            c('vid not paused');
        }

        // Start the global timer when the intro video is played. Prevents timer from starting before video has loaded
        if (video.src() === 'https://nighttrap.blob.core.windows.net/vid/intro/00000011-Intro.mp4') {
                MainLoop.setUpdate(update).start();
                nTimeStart  = new Date();
        }      
    };


    /**
     * When user selects a room, this takes the current values from the room and applies them to the current object.
     * createVideoSeries is called after properties have been set.
     * Need to check if user has selected a room, then set that room. Check for 'undefined' is necessary to
     * b/c if obserRoom calls changeVideoStream instead, idType comes back as undefined. 
     */
    var changeVideoStream = function changeVideoStream() {
        current.setJustSwitched(true);
        c('switching');
        var idType  = {}  ;
        var curRoom = ''  ;
        var that    = this;

        if (that !== undefined) { idType = document.getElementById(this.id).type; }

        if (idType === 'image') {
            curRoom = this.id;
            c('image');
        } else {
            //curRoom = current.getCam();
            // Prob need this to be turned to a string
            //curRoom = '' + current.getCam();
            //curRoom = current.getCam().sRoomName;
            curRoom = current.getCamAsString();
            c('curRoom: ' + curRoom);
        }

        switch (curRoom) {
            case 'hallOne':
                  current.setCamAsString      (hallOne                      );
                  current.setCam              (hallOne                      );
                  current.setCurUrl           (hallOne.curUrl               );
                  current.setNextUrl          (hallOne.nextUrl              );
                  current.setTrapUrl          (hallOne.trapUrl              );
                  current.setCanCatch         (hallOne.bCanCatch            );
                  current.setCatchTime        (hallOne.catchTime            );
                  current.setUrlChangeTime    (hallOne.urlChangeTime        );
                  current.setStillUrl         (hallOne.stillUrl             );
                  current.setTrapSprung       (hallOne.bTrapSprung          );
                  current.setPotentialCaptured(hallOne.nPotentialCaptured   );
                  current.setHasPlayed        (hallOne.hasPlayed            );
                  break                                                      ;
            case 'kitchen':
                  current.setCamAsString      (kitchen                      );
                  current.setCam              (kitchen                      );
                  current.setCurUrl           (kitchen.curUrl               );
                  current.setNextUrl          (kitchen.nextUrl              );
                  current.setTrapUrl          (kitchen.trapUrl              );
                  current.setCanCatch         (kitchen.bCanCatch            );
                  current.setCatchTime        (kitchen.catchTime            );
                  current.setUrlChangeTime    (kitchen.urlChangeTime        );
                  current.setStillUrl         (kitchen.stillUrl             );
                  current.setTrapSprung       (kitchen.bTrapSprung          );
                  current.setPotentialCaptured(kitchen.nPotentialCaptured   );
                  current.setHasPlayed        (kitchen.hasPlayed            );
                  break                                                      ;
            case 'entryway':
                  current.setCamAsString      (entryway                     );
                  current.setCam              (entryway                     );
                  current.setCurUrl           (entryway.curUrl              );
                  current.setNextUrl          (entryway.nextUrl             );
                  current.setTrapUrl          (entryway.trapUrl             );
                  current.setCanCatch         (entryway.bCanCatch           );
                  current.setCatchTime        (entryway.catchTime           );
                  current.setUrlChangeTime    (entryway.urlChangeTime       );
                  current.setStillUrl         (entryway.stillUrl            );
                  current.setTrapSprung       (entryway.bTrapSprung         );
                  current.setPotentialCaptured(entryway.nPotentialCaptured  );
                  current.setHasPlayed        (entryway.hasPlayed           );
                  break                                                      ;
            case 'livingroom':
                  current.setCamAsString      (livingroom                   );
                  current.setCam              (livingroom                   );
                  current.setCurUrl           (livingroom.curUrl            );
                  current.setNextUrl          (livingroom.nextUrl           );
                  current.setTrapUrl          (livingroom.trapUrl           );
                  current.setCanCatch         (livingroom.bCanCatch         );
                  current.setCatchTime        (livingroom.catchTime         );
                  current.setUrlChangeTime    (livingroom.urlChangeTime     );
                  current.setStillUrl         (livingroom.stillUrl          );
                  current.setTrapSprung       (livingroom.bTrapSprung       );
                  current.setPotentialCaptured(livingroom.nPotentialCaptured);
                  current.setHasPlayed        (livingroom.hasPlayed         );
                  break                                                      ;
            case 'bathroom':
                  current.setCamAsString      (bathroom                     );
                  current.setCam              (bathroom                     );
                  current.setCurUrl           (bathroom.curUrl              );
                  current.setNextUrl          (bathroom.nextUrl             );
                  current.setTrapUrl          (bathroom.trapUrl             );
                  current.setCanCatch         (bathroom.bCanCatch           );
                  current.setCatchTime        (bathroom.catchTime           );
                  current.setUrlChangeTime    (bathroom.urlChangeTime       );
                  current.setStillUrl         (bathroom.stillUrl            );
                  current.setTrapSprung       (bathroom.bTrapSprung         );
                  current.setPotentialCaptured(bathroom.nPotentialCaptured  );
                  current.setHasPlayed        (bathroom.hasPlayed           );
                  break                                                      ;
            case 'bedroom':
                  current.setCamAsString      (bedroom                      );
                  current.setCam              (bedroom                      );
                  current.setCurUrl           (bedroom.curUrl               );
                  current.setNextUrl          (bedroom.nextUrl              );
                  current.setTrapUrl          (bedroom.trapUrl              );
                  current.setCanCatch         (bedroom.bCanCatch            );
                  current.setCatchTime        (bedroom.catchTime            );
                  current.setUrlChangeTime    (bedroom.urlChangeTime        );
                  current.setStillUrl         (bedroom.stillUrl             );
                  current.setTrapSprung       (bedroom.bTrapSprung          );
                  current.setPotentialCaptured(bedroom.nPotentialCaptured   );
                  current.setHasPlayed        (bedroom.hasPlayed            );
                  break                                                      ;
            case 'hallTwo':
                  current.setCamAsString      (hallTwo                      );
                  current.setCam              (hallTwo                      );
                  current.setCurUrl           (hallTwo.curUrl               );
                  current.setNextUrl          (hallTwo.nextUrl              );
                  current.setTrapUrl          (hallTwo.trapUrl              );
                  current.setCanCatch         (hallTwo.bCanCatch            );
                  current.setCatchTime        (hallTwo.catchTime            );
                  current.setUrlChangeTime    (hallTwo.urlChangeTime        );
                  current.setStillUrl         (hallTwo.stillUrl             );
                  current.setTrapSprung       (hallTwo.bTrapSprung          );
                  current.setPotentialCaptured(hallTwo.nPotentialCaptured   );
                  current.setHasPlayed        (hallTwo.hasPlayed            );
                  break                                                      ;
            case 'driveway':
                  current.setCamAsString      (driveway                     );
                  current.setCam              (driveway                     );
                  current.setCurUrl           (driveway.curUrl              );
                  current.setNextUrl          (driveway.nextUrl             );
                  current.setTrapUrl          (driveway.trapUrl             );
                  current.setCanCatch         (driveway.bCanCatch           );
                  current.setCatchTime        (driveway.catchTime           );
                  current.setUrlChangeTime    (driveway.urlChangeTime       );
                  current.setStillUrl         (driveway.stillUrl            );
                  current.setTrapSprung       (driveway.bTrapSprung         );
                  current.setPotentialCaptured(driveway.nPotentialCaptured  );
                  current.setHasPlayed        (driveway.hasPlayed           );
                  break                                                      ;
        }
         createVideoSeries(current);
    };


    /**
     * Creates an object & sets values of this particular room each time current.getTime() matches the case value.
     * Case is equal to the current number of seconds into the game.
     * If the value of property is not set here, it will be set to default values of the objRoom.
     */
    var eventsHallOne  = function eventsHallOne () { 
            
        switch (current.getTime()) {

            // Actual #1 
            case minSecToNum(0, 1):
                 hallOne.urlChangeTime = minSecToNum(0, 1)  ;
                 hallOne.curUrl        = camHallOne.c21     ;       
                 hallOne.trapUrl       = camHallOne.c130422 ;
                 hallOne.catchTime     = minSecToNum(0, 4)  ;    // If I start this at 4 secs, it shows very end of clip...
                // If I start it at 10 seconds, it says that it has passed already....
                 //hallOne.catchTime     = minSecToNum(0, 13) ;   
                 break;
         // Debug # 1
         //case minSecToNum(0, 1):
         //       hallOne.urlChangeTime = minSecToNum(0, 1);
         //       hallOne.curUrl = camHallOne.c130422;                 
         //       hallOne.trapUrl = camHallOne.c130422;
         //       hallOne.catchTime = minSecToNum(0, 13);
         //       break;
            // Debug # 2
            // Actual # 2 
            case minSecToNum(1, 20):                               
                 hallOne.urlChangeTime = minSecToNum(1, 20) ;
                 hallOne.curUrl        = camHallOne.c1152221;
                 break;
                // Debug # 2
            //case minSecToNum(0, 12):
            //    hallOne.hasPlayed = false;
            //    hallOne.urlChangeTime = minSecToNum(0, 12);
            //    hallOne.curUrl = camHallOne.c1152221;
            //    break;
            case minSecToNum(2, 50):
                 hallOne.hasPlayed     = false              ;
                 hallOne.urlChangeTime = minSecToNum(2, 50) ;
                 hallOne.curUrl        = camHallOne.c2500221;
                 hallOne.trapUrl       = camHallOne.c3150422;
                 hallOne.catchTime     = minSecToNum(3, 14) ;
                 break                                      ;
            case minSecToNum(3, 34):
                 hallOne.hasPlayed     = false              ;
                 hallOne.urlChangeTime = minSecToNum(3, 34) ;
                 hallOne.curUrl        = camHallOne.c3332421;
                 hallOne.trapUrl       = camHallOne.c3422422;
                 hallOne.catchTime     = minSecToNum(3, 42) ;
                 break                                      ;
            case minSecToNum(4, 45):
                 hallOne.hasPlayed     = false              ;
                 hallOne.urlChangeTime = minSecToNum(4, 45) ;
                 hallOne.curUrl        = camHallOne.c4442421;
                 break                                      ;
        }};

    var eventsKitchen  = function eventsKitchen () {
            
        switch (current.getTime()){     
            case minSecToNum(1, 21):
                 kitchen.hasPlayed     = false              ;
                 kitchen.urlChangeTime = minSecToNum(1, 23) ;
                 kitchen.curUrl        = camKitchen.c1200431;
                 kitchen.trapUrl       = camKitchen.c1240632;
                 kitchen.catchTime     = minSecToNum(1, 23) ;
                 break                                      ;
            case minSecToNum(1, 48):
                 kitchen.hasPlayed     = false              ;
                 kitchen.urlChangeTime = minSecToNum(1, 48) ;
                 kitchen.currentUrl    = camKitchen.c1481231;
                 break                                      ;
            case minSecToNum(3, 54):
                 kitchen.hasPlayed     = false              ;
                 kitchen.urlChangeTime = minSecToNum(3, 54) ;
                 kitchen.curUrl        = camKitchen.c3540631;
                 break                                      ;
        }
    };

    var eventsEntry    = function eventsEntry () {
            
        switch (current.getTime()) {
            case minSecToNum(1, 33):
                 entryway.hasPlayed     = false               ;
                 entryway.urlChangeTime = minSecToNum(1, 33)  ;
                 entryway.curUrl        = camEntryway.c1320261;
                 entryway.trapUrl       = camEntryway.c1391862;
                 entryway.catchTime     = minSecToNum(1, 39)  ;
                 break                                        ;
            case minSecToNum(2, 13):
                 entryway.hasPlayed     = false               ;
                 entryway.urlChangeTime = minSecToNum(2, 13)  ;
                 entryway.curUrl        = camEntryway.c2122461;
                 entryway.trapUrl       = camEntryway.c2590262;
                 entryway.catchTime     = minSecToNum(2,58)   ;
                 break                                        ;
        }
    };

    var eventsLiving   = function eventsLiving () {
            
       switch(current.getTime()) {
           case minSecToNum(0, 25):
                livingroom.hasPlayed     = false                 ;
                livingroom.urlChangeTime = minSecToNum(0, 25)    ;
                livingroom.curUrl        = camLivingRoom.c232241 ;
                livingroom.trapUrl       = camLivingRoom.c271442 ;
                livingroom.catchTime     = minSecToNum(0, 27)    ;
                livingroom.nextUrl       = camLivingRoom.c271641 ;
                break                                            ;
           case minSecToNum(1, 0):
                livingroom.hasPlayed     = false                 ;
                livingroom.urlChangeTime = minSecToNum(1, 0)     ;
                livingroom.curUrl        = camLivingRoom.c1001241; 
                livingroom.trapUrl       = camLivingRoom.c1071042;
                livingroom.catchTime     = minSecToNum(1, 6)     ;
                break                                            ;
           case minSecToNum(1, 57):
                livingroom.hasPlayed     = false                 ;
                livingroom.urlChangeTime = minSecToNum(1, 57)    ;
                livingroom.curUrl        = camLivingRoom.c1572241;
                break                                            ;
           case minSecToNum(3, 24):
                livingroom.hasPlayed     = false                 ;
                livingroom.urlChangeTime = minSecToNum(3, 24)    ;
                livingroom.curUrl        = camLivingRoom.c3230241;
                livingroom.trapUrl       = camLivingRoom.c3330842;
                livingroom.catchTime     = minSecToNum(3, 32)    ;
                livingroom.nextUrl       = camLivingRoom.c3330841;
               break                                             ;
           case minSecToNum(4, 43):
                livingroom.hasPlayed     = false                 ;
                livingroom.urlChangeTime = minSecToNum(4, 43)    ;
                livingroom.curUrl        = camLivingRoom.c4511041;
                livingroom.trapUrl       = camLivingRoom.c3330842;
                livingroom.catchTime     = minSecToNum(4, 56)    ;
                break                                            ;
       }        
    };

    var eventsBathroom = function eventsBathroom () {
           
       switch (current.getTime()) {
           //case minSecToNum(0, 18):
           //    bathroom.urlChangeTime = minSecToNum(0, 18)  ;
           //    bathroom.curUrl        = camBathroom.c180291 ;
           //    break;      
               case minSecToNum(0, 5):  // DEBUG
               bathroom.urlChangeTime = minSecToNum(0, 5)  ;
               bathroom.curUrl        = camBathroom.c180291 ;
               break      ;
           case minSecToNum(0, 37):
               bathroom.hasPlayed = false;
               bathroom.urlChangeTime = minSecToNum(0, 37)  ;
               bathroom.curUrl        = camBathroom.c352291 ;
               bathroom.trapUrl       = camBathroom.c431292 ;
               bathroom.catchTime     = minSecToNum(0, 43)  ;                 
               break                                        ;
           case minSecToNum(0, 48):
               bathroom.urlChangeTime = minSecToNum(0, 48)  ;
               bathroom.curUrl        = camBathroom.c500291 ;
               bathroom.trapUrl       = camBathroom.c430249b;
               bathroom.catchTime     = minSecToNum(0, 49)  ;
               break                                        ;
       }
    };
   
    var eventsBedroom  = function eventsBedroom () {

       switch (current.getTime()) {
           case minSecToNum(0, 1):
               bedroom.hasPlayed     = false              ;
               bedroom.urlChangeTime = minSecToNum(0, 1)  ;
               bedroom.curUrl        = camBedroom.c81     ;
               bedroom.trapUrl       = camBedroom.c352482 ;
               bedroom.catchTime     = minSecToNum(0, 34) ;
               break                                      ;
           case minSecToNum(0, 54):
               bedroom.hasPlayed     = false              ;
               bedroom.urlChangeTime = minSecToNum(0, 54) ;
               bedroom.curUrl        = camBedroom.c540281 ;
               break                                      ;
           case minSecToNum(3, 7): // May need to start with 07? But strict mode does not allow
               bedroom.hasPlayed     = false              ;
               bedroom.urlChangeTime = minSecToNum(3, 7)  ;
               bedroom.curUrl        = camBedroom.c3060281;
               bedroom.trapUrl       = camBedroom.c3262482;
               bedroom.catchTime     = minSecToNum(3, 25) ;           
               break                                      ;
           case minSecToNum(4, 35):
               bedroom.hasPlayed     = false              ;
               bedroom.urlChangeTime = minSecToNum(4, 35) ;
               bedroom.curUrl        = camBedroom.c4390482;
               bedroom.trapUrl       = camBedroom.c4390482;
               bedroom.catchTime     = minSecToNum(4, 38) ;
               break                                      ;
       }
    };

    var eventsHallTwo  = function eventsHallTwo () {

       switch (current.getTime()) {
           case minSecToNum(0, 31):
                hallTwo.hasPlayed     = false             ;
                hallTwo.urlChangeTime = minSecToNum(0, 31);
                hallTwo.curUrl        = camHallTwo.c310471;
                break                                     ;
           case minSecToNum(0, 51):
                hallTwo.hasPlayed     = false              ;
                hallTwo.urlChangeTime = minSecToNum(0, 51) ;
                hallTwo.curUrl        = camHallTwo.c500271 ;
                hallTwo.trapUrl       = camHallTwo.c542272 ;
                hallTwo.catchTime     = minSecToNum(0, 54) ;
                break                                      ;
           case minSecToNum(2, 39):
               hallTwo.hasPlayed      = false              ;
               hallTwo.urlChangeTime  = minSecToNum(2, 39) ;
               hallTwo.curUrl         = camHallTwo.c2390671;
               break                                       ;
           case minSecToNum(4, 2):
               hallTwo.hasPlayed      = false              ;
               hallTwo.urlChangeTime  = minSecToNum(4, 2)  ;
               hallTwo.curUrl         = camHallTwo.c4000471; 
               hallTwo.trapUrl        = camHallTwo.c4120872;
               hallTwo.catchTime      = minSecToNum(4, 11) ;
               break                                       ;
       }
    };

    var eventsDriveway = function eventsDriveway () {
 
       switch(current.getTime()) {
           case minSecToNum(1, 56):
               driveway.hasPlayed     = false               ;
               driveway.urlChangeTime = minSecToNum(1, 56)  ;
               driveway.curUrl        = camDriveway.c1440451;
               driveway.trapUrl       = camDriveway.c3481052;
               driveway.catchTime     = minSecToNum(2, 45)  ;
               break;        
       }
    };


    /**
     * Still to play when no action occurs. Sets video.src to src so that the still image can be displayed as a poster
     * TODO: Need to make this audio loop
     */
    var displayStill = function displayStill() {
        video.src(video.src);
        audioElem.src = aAudioClips.crickets;
        audioElem.play();
    };


    /**
     * Sets the poster (background) between clips to the room you are currently viewing
     * hasPlayed variable prevents the footage from looping.
     * Second 'ended' event draws poster to screen when 2nd clip has completed;
     */
    var createVideoSeries = function createVideoSeries() {
       /* At beginning of game, user clicks on a room w/ out a video OR user has already set a trap
        * and returns to that same room before a new clip is set to begin.                       */
        if (current.getCurUrl() === null || current.getCurUrl() === '' || current.getTrapSprung() === true || current.getCam().hasPlayed) {
            c('null: displaying poster');
            video.poster(current.getStillUrl());
            displayStill();
            return;
        }

        video.poster(current.getStillUrl());
        playVideo(current.getCurUrl());

        var hasPlayed = false;
        
        // Current vid ended. Did not catch || no chance to catch....so play next video 
        video.on('ended', function() {
            if (hasPlayed === false) {
                current.getCam().hasPlayed = true;
   
                if (current.getNextUrl()) {
                    c('r: playing nextUrl time');
                    playVideo(current.getNextUrl());
                } else {
                    c('r: no 2nd url, so using still');
                    displayStill();
                }
            }

            // 2nd video has already played, so use a still (poster).
            hasPlayed = true;
            video.on('ended', function () {
                c('r: 2nd video has already played, so use a still (poster).');
                displayStill();
            });
        });
    }; 


    /**
     * Pauses audio played during stills, sets new video source, & begins to play.
     * Only use diff if the user has selected a room after a video has started playing.
     * Using readState() to prevent setting currentTime before video player is ready.
     * @param {string} clipUrl - Address of clip to play.
     * @Param {bool}   bIsTrap - Will determine how the video should be loaded 
     */
    var playVideo = function playVideo(urlClip, bIsTrap) {
        audioElem.pause();
        var _bIsTrap = bIsTrap || false;
        var diff     = nTimeDiff(current.getUrlChangeTime(), current.getTime());

        video.src(urlClip);
        video.load();
        c('playVideo sRoomName: ' + current.getCam().sRoomName);

        video.on('loadedmetadata', function() {
            var duration = Math.round(video.duration());
            var difference = current.getTime() - current.getUrlChangeTime();
            c('loaded Metadata. change: ' + current.getUrlChangeTime() + '   difference: ' + difference + '    duration: ' + duration);

            // If user triggers a trap, play the trap footage, and ignore all time stamps
            if (_bIsTrap) {
                c('Playing trap video');
                video.play();
            } else if (!_bIsTrap) {

                // The opportunity to play the clip has passed
                if (difference >= duration) {
                    c('difference is greater! Displaying still');
                    displayStill();
                }

                if (difference < duration) {
                    // Seek to current time stamp then play
                    if (current.getUrlChangeTime() !== current.getTime()) {
                        c('Playing vid w/ time diff');
                        video.currentTime(diff);
                        video.play();
                    } else {
                        // Play video from the beginning
                        c('returning - Play video from the beginning');
                        video.play();
                        return;
                    }
                }
            }
        });
    };

    /**
     * Change clips when user hits 'Trap' button
     * Make it unusable again right after you trigger the video
     * TODO: Need to set video.currentTime(0) on this as well! Otherwise we miss most of the trap vid!
     */
    var trap = function trap() {
        createTrapVidSeries(current.getTrapUrl(), current.getNextUrl(), current.getPotentialCaptured());
        toggleTrapListener(false);
    };


    /**
     * Mark trap as having been sprung after user selects a room.
     * To be used by createTrapVidSeries().
     */
    var setTrapAsSprung = function setTrapAsSprung() {
        switch (current.getCam()) {
            case hallOne:
            hallOne   .bTrapSprung = true;
            break;
        case kitchen:
            kitchen   .bTrapSprung = true;
            break;                          
        case entryway:
            entryway  .bTrapSprung = true;
            break;
        case livingroom:
            livingroom.bTrapSprung = true;
            break;
        case bathroom:
            bathroom  .bTrapSprung = true;
            break;
        case bedroom:
            bedroom   .bTrapSprung = true;
            break;
        case hallTwo:
            hallTwo   .bTrapSprung = true;
            break;                          
        case driveway:
            driveway  .bTrapSprung = true;
            break;
        }
    };


    /**
     * Sets the poster (background) between clips to the room you are currently viewing.
     * hasPlayed variable prevents the footage from looping.
     * Second 'ended' event draws poster to screen when 2nd clip has completed.
     * @param {string} curVidUrl          - Clip with the trap sequence.
     * @param {string} [nextVid]          - Trap clips are often have a clip that appears next.
     * @param {number} nPotentialCaptured - Number of augers that could have been captured in this scene
     */
    var createTrapVidSeries = function createTrapVidSeries (sTrapUrl, sNextUrl, nPotentialCaptured) {
        c('t: playing first time');
        setTrapAsSprung();
        playVideo(sTrapUrl, true);
        nTotalCaptured.set(nPotentialCaptured);

      // Video has already played & there is no nextUrl, so use a still
      video.on('ended', function () {
          if (sNextUrl === "" || null) {
              c('t: Video has already played & there is no nextUrl, so use a still');
              displayStill();
        } else {
            // Play next video here  & when it ends, set a still
            c('t: Play next video here  & when it ends, set a still');
            playVideo(sNextUrl);   

            // Second video has finished, use a still
            video.on('ended', function () {
                c('t: Second video has finished, use a still');
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
            document.getElementById('Trap').addEventListener('click', trap);
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
            c('can trigger trap');
            toggleTrapListener(true);
        }
    };


    /**
     * Useful when viewer enters a room after a video was supposed to have started.
     * Need to apply Math.floor, otherwise Blink throws an error regarding non-finite numbers.
     * Result is then used to set the currentTime on video player. 
     * @param   {number} caseTime     - Which event (time) is creating this object
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
     * This occurs automatically, as Object.observe is constantly polling to check if values have changed.
     * If player is watching a room & the currentUrl of a video changes at any point (this is done in the events[RoomName] function),
     * then that new URL is passed into the video player & played.
     * We only want to listen for updates to the url, not add / remove, so we check for that.
     * @param {object} room - Room we are operating on.
     */
    var ObserveRoom = function observeRoom(room) {
        Object.observe(room, function (changes) {
            c(changes[0]);
                if (changes[0] !== undefined) {
                    c(room);
                    var oldUrl              = changes[0].oldValue                        ;
                    var curUrl              = changes[0].object.curUrl                   ;
                    var watchingCurrentRoom = current.getCamAsString() === room.sRoomName;
                    var curUrlHasChanged    = curUrl !== oldUrl                          ;
                    var typeIsUpdate        = {}                                         ;

                    if (changes[0].type === update) {
                        typeIsUpdate = changes[0].type;
                    }

                    if (curUrlHasChanged && watchingCurrentRoom && typeIsUpdate) {
                        changeVideoStream();
                    }
                }
        });
    };


    /**
     * Sets Object.observe for each room in the game.
     * Read about the polyfill I am using, here: https://github.com/MaxArt2501/object-observe
     */
    var observeAllRooms = function observeAllRooms() {
        var observeHallOne = new ObserveRoom(hallOne   );
        var observeKitchen = new ObserveRoom(kitchen   );
        var observeEntry   = new ObserveRoom(entryway  );
        var observeLiving  = new ObserveRoom(livingroom);
        var observeBath    = new ObserveRoom(bathroom  );
        var observeBed     = new ObserveRoom(bedroom   );
        var observeHallTwo = new ObserveRoom(hallTwo   );
        var observeDrive   = new ObserveRoom(driveway  );
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