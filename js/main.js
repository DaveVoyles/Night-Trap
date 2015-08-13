(function() {
    'use strict';


   var roomObj                 = {
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

    /**
     * Url about to be drawn to the screen
     */
    var sCurUrl                = {
        url: '',
        get () {
            return this.url;
        },
        set (val) {
            this.url           = val;
        }
    };

    /**
     * When this scene completes, which URL will appear next?
     */
    var sNextUrl               = {
        url: '',
        get () {
            return this.url;
        },
        set (val) {
            this.url           = val;
        }
    };

    /**
     * Which trap scene will be triggered if the user hits the trap button?
     */
    var sCurTrapUrl            = {
        url: '',
        get () {
            return this.url;
        },
        set (val) {
            this.url           = val;
        }
    };

    /**
     * Which static image should appear when there isn't any movement in the room?
     */
    var sCurStill              = {
        still: '',
        get () {
            return this.still;
        },
        set (val) {
            this.still         = val;
        }
    };

    //TODO: Can prob get rid of this
    /**
     * Used to hold the time for when an event should occur in each room. This value is then subtracted from 
     * nCurrentTime.get(), which returns a new value used to set the currentTime() on the video player when switching rooms.
     * @returns {object} new Object for each room containing name and time
     */
    var nCaseRoomTime          = {
        hallOne:  {
            time: 0,
            getTime: function () {
                return this.time;
            },
            setTime: function (val) {
                this.time      = val;
            }
        },
        kitchen:  {
            time: 0,
            getTime: function () {
                return time;
            },
           setTime: function (val) {
                time           = val;
            }
        },
        entryWay:  {
            time: 0,
            getTime: function () {
                return time;
            },
           setTime: function (val) {
                time           = val;
            }
        },
        livingRoom:  {
            time: 0,
            getTime: function () {
                return time;
            },
           setTime: function (val) {
                time           = val;
            }
        },
        bathroom:  {
            time: 0,
            getTime: function () {
                return time;
            },
           setTime: function (val) {
                time           = val;
            }
         },
        bedroom:  {
            time: 0,
            getTime: function () {
                return time;
            },
            setTime: function (val) {
                time           = val;
            }
        },
        hallTwo:  {
            time: 0,
            getTime: function () {
                return time;
            },
           setTime: function (val) {
                time           = val;
            }
        },
        driveWay:  {
            time: 0,
            getTime: function () {
                return time;
            },
           setTime: function (val) {
                time           = val;
            }
        }
    };

    /**
    * Is it possible to catch someone in this scene?
    */
    var bCanCatch              = {
        bool: true,
        get () {
            return this.bCanCatch;
        },
        set (val) {
            this.bCanCatch     = val;
        }
    };

    // Timer to keep track of user's time spent in-game
    var nTimeStart             = new Date();
    // Audio element for SFX, passwords, and noises during stills
    var audioElem              = null;
    // Are we in Debug mode?
    var bDebug                 = true;
    // elapsedTime() sets this value
    var nCurrentTime           = {
        time: 0,
        get () {
            return this.time;
        },
        set (val) {
            this.time          = val;
        }
    };

    var timerElem              = document.getElementById('timer');
    var video                  = null;   
    // What has the user selected?
    var sCurUserPassword       = {
        pass: 'Blue',
        get () {
            return this.pass;
        },
        set (val) {
            this.pass          = val;
        }
    };
    // List of passwords that the game can select
    var aPasswords             = {
        Purple : 'Purple'
      , Blue   : 'Blue  '
      , Red    : 'Red   '
      , Green  : 'Green '
      , Yellow : 'Yellow'
      , Orange : 'Orange'
    };
    // Random password set by game 
    var ranPassword            = 'Blue';

    // Path to SFX
    var aAudioClips            = {
          change   : 'sfx/CHANGE.mp3'
        , crickets : 'sfx/CRICK2.mp3'
        , frogs    : 'sfx/FROG2.mp3 '
        , denied   : 'sfx/DENIED.mp3'
    };

    // Posters, which are set as the camera feed when room is empty
    var aStills                = {
          HallOne    : 'img/stills/BATHROOM_1.JPG   '
        , Kitchen    : 'img/stills/KITCHEN_1.JPG    '
        , Entryway   : 'img/stills/ENTRY-WAY_1.JPG  '
        , Livingroom : 'img/stills/Living-ROom_1.JPG'
        , Bathroom   : 'img/stills/Bathroom_1.JPG   '
        , Bedroom    : 'img/stills/Bedroom_1.JPG    '
        , HallTwo    : 'img/stils/Hall-Two_1.JPG    '
        , Driveway   : 'img/stills/Driveway_1.JPG   '
    };

    /**
     * Which camera is currently selected?
     * You should also set the still to currently selected room when changing cameras, too.
     */
    var aCurrentCam            = {
          HallOne    : 0
        , Kitchen    : 1
        , Entryway   : 2
        , Livingroom : 3
        , Bathroom   : 4
        , Bedroom    : 5
        , HallTwo    : 6
        , Driveway   : 7
    };

    /**
     * Used with aCurrentCam to set the potential values
     * @example: nCurrentCam.set(aCurrentCam.Bathroom);
     * @returns: {Object} cam: 4
     */ 
    var nCurrentCam            = {
        cam: aCurrentCam,
        get () {
            return this.cam;
        },
        set (val) {
            this.cam           = val;
        }
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
          c232241: 'https://nighttrap.blob.core.windows.net/vid/livingroom/00232241.mp4'
        // TRAP: Augers caught on bookshelf
        , c271442:  'https://nighttrap.blob.core.windows.net/vid/livingroom/00271442.mp4'
        // Augers Escape
        , c271641:  'https://nighttrap.blob.core.windows.net/vid/livingroom/00271641.mp4'
        // TRAP: Auger caught on library 
        , c554164a: 'https://nighttrap.blob.core.windows.net/vid/livingroom/0554164a.mp4'
        // 2 Augers enter from outside
        , c1001241: 'https://nighttrap.blob.core.windows.net/vid/livingroom/01001241.mp4'
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
        // 1 Auger caught in  entryway
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
        // TRAP: Augers caught 
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
     * Rooom buttons now changeVideoStream() when clicked.
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
     * @param {float} seconds
     *      Takes seconds and returns it in string format of MM:SS for on screen timer
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

        nCurrentTime.set(seconds);
    };


    /**
     * Draws current time on screen at 'timer' element.
     */
    var updateTimeOnScreen    = function () {
        timerElem.innerHTML   = secondsToTimeString(nCurrentTime.get());
    };


    /**
     * Update loop for checking when to change video scenes 
     * @param {float} delta
     *      The amount of time since the last update, in seconds
     */
    var update                = function (delta) {
        elapsedTime();
        updateTimeOnScreen();
        eventsHallOne();
        //eventsBedroom();
    };


    /**
     * Check if browser supports audio -- if not, tell user to update
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
     * @param {float} interpolationPercentage
     *   How much to interpolate between frames.
     */
    var draw                  = function (interpolatePercentage) {
        // Do I really need this? 
    };


    /**
     * Sets aCurrentCam to the room user is viewing. 
     * Sets currentStill to match that room, so that poster can be set between videos.
     * createVideoSeries is called after properties have been set.
     * @example: nCurremtCam  = aCurrentCam.HallOne;
     */
    var changeVideoStream     = function () {
            bCanListen.set(false); //TODO: May need to set this to true somewhere else...
            toggleRoomButton();

        // TODO: Turn all of these into 'currentObj' object 
            switch (this.id) {
                // Curr, Next, Trap, Catch, Time, canm, & maybe still?
                case 'Hall-1':
                    nCurrentCam           .set(aCurrentCam.HallOne); // TODO: Prob don't need this now...
                    sCurUrl               .set(    roomObj.hallOne.getCurUrl  ());  // 2 augs
                    sNextUrl              .set(    roomObj.hallOne.getNextUrl ());  // Sarah 
                    sCurTrapUrl           .set(    roomObj.hallOne.getTrapUrl ());  // Caught
                    bCanCatch             .set(    roomObj.hallOne.getCanCatch());  
                    nCaseRoomTime.hallOne .setTime(roomObj.hallOne.getTime    ());

                    //TODO: Can probably replace this
                    // bCanCatch, NextUrl, StillUrl, and TrapUrl are all set here
                    sCurStill.set(roomObj.hallOne.stillUrl);
                    break;
                case 'Kitchen':
                    nCurrentCam.set(aCurrentCam.Kitchen);
                    sCurStill.set(aStills.Kitchen);
                    break;
                case 'Entry-Way':
                    nCurrentCam.set(aCurrentCam.Entryway);
                    sCurStill.set(aStills.Entryway);
                    break;
                case 'Living-Room':
                    nCurrentCam.set(aCurrentCam.Livingroom);
                    sCurStill.set(aStills.Livingroom);
                    break;
                case 'Bathroom':
                    nCurrentCam.set(aCurrentCam.Bathroom);
                    sCurStill.set(aStills.Bathroom);
                    break;
                case 'Bedroom':
                    nCurrentCam.set(aCurrentCam.Bedroom);
                    sCurStill.set(aStills.Bedroom);
                    break;
                case 'Hall-2':
                    nCurrentCam.set(aCurrentCam.HallTwo);
                    sCurStill.set(aStills.HallTwo);
                    break;
                case 'Driveway':
                    nCurrentCam.set(aCurrentCam.Driveway);
                    sCurStill(aStills.Driveway);
                    break;
            }
            createVideoSeries(sCurUrl.get(), sNextUrl.get(), bCanCatch.get());
    };


    /**
    * Should be run each frame -- sets URLs for events occuring in the room, as well as bCanCatch.
    * Case is equal to the current timestamp, converted from 'MM:SS' to seconds.
    * Switch events based on the time -- occurs whether or not player has this room selected
    * Need to set nCurrentTime.get() for each case as well, so that it can be used to set currentTime() on video player.
    */
    var eventsHallOne         = function () {
        //if (nCurrentCam.get() === aCurrentCam.HallOne) { //TODO: May need to move this. How do I set the timer if the player is not watching this room? It would never get called!
        switch (nCurrentTime.get()) {
            case 1: 
                    roomObj.hallOne.setCurUrl( aTempLocal[2]);   
                    roomObj.hallOne.setNextUrl(aTempLocal[0]);   
                    roomObj.hallOne.setTrapUrl(aTempLocal[1]);  
                    roomObj.hallOne.setCanCatch(true);
                    roomObj.hallOne.setTime(nCurrentTime.get());

                    //roomObj.hallOne.curUrl.set(aTempLocal[1]);
                    //sCurUrl    .set(aTempLocal[1]);   // 2 augs
                    //sNextUrl   .set(aTempLocal[0]);   // Sarah 
                    //sCurTrapUrl.set(aTempLocal[2]);   // Caught
                    //bCanCatch.set(true);
                    //nCaseRoomTime.hallOne.setTime(nCurrentTime.get()); 
                    break;
                case 30:
                    sCurUrl  .set(aTempLocal[1]);
                    sNextUrl .set(aTempLocal[2]);
                    bCanCatch.set(false);
                    nCaseRoomTime.hallOne.setTime(nCurrentTime.get()); 
                    break;
                default:
            }
        //}
    };


    /**
     * Should be run each frame -- sets URLs for events occuring in the room, as well as bCanCatch.
     * Case is equal to the current timestamp, converted from 'MM:SS' to seconds.
     * Switch events based on the time -- occurs whether or not player has this room selected
     */
    var eventsBedroom         = function () {
        if (nCurrentCam.get()   === aCurrentCam.Bedroom) {
            console.log('eventsBedroom');

            switch (nCurrentTime.get()) {
                case 1: 
                    sCurUrl.set(aTempLocal[1]);
                    sNextUrl.set(null);
                    bCanCatch.set(true);
                    break;
                case 54:
                    sCurUrl.set(camBedroom.c540281);
                    sNextUrl    = aStills.Bedroom;
                    break;
                default:
            }
        }
    };


    /**
     * Sets the poster (background) between clips to the room you are currently viewing
     * hasPlayed variable prevents the footage from looping.
     * Second 'ended' event draws poster to screen when 2nd clip has completed
     * @param {string} currentVidUrl
     *      Clip with the trap sequence.
     * @param {string} [nextVid]
     *      Trap clips are often have a clip that appears next.
     */
    var createVideoSeries = function (currentVidUrl, nextVidUrl) {
        //TODO: Maybe I should have another clip for the trap?
        var hasPlayed           = false;
        video.poster(sCurStill.get());
        playVideo(currentVidUrl);

        // Attach event handler so that user can TRY to catch
        if (bCanCatch.get()     === true) {
            toggleTrapListener(true);
        }

        // Did not catch / no change to catch.....so play next video
        video.on('ended', function() {
            if (hasPlayed       === false) {
                if (nextVidUrl) {
                    console.log(nextVidUrl);
                    playVideo(nextVidUrl);

                // Use a still if nextVidUrl does not exist
                } else { 
                    hasPlayed   = true;
                    displayStill();
                }
            };

            // Video has already played, so use a still
            hasPlayed           = true;
            console.log('using a still');
            video.on('ended', function () {
                displayStill();
            });
        });
    }; 


    /**
     * Can we use a trap in this scene? If so, change clips when user hits 'Trap' button
     * Make it unsable again right after you trigger the video
     */
    var trap                  = function () {
        createVideoSeries(sCurTrapUrl.get(), sNextUrl.get());
        toggleTrapListener(false);
    };


    /**
     * Toggles event listener for the trap button on / off
     * @param {bool} bShouldListen
     *      If true, adds listener. If false, removes listener
     */
    var toggleTrapListener    = function (bShouldListen) {
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
        //TODO: Needed to make this repeatable again
    };


    /**
     * Useful when viewer enters a room after a video was supposed to have started.
     * Need to apply Math.floor, otherwise Blink throws an error regarding non-finite numbers.
     * Result is then used to set the currentTime on video player. 
     * @param   {float} caseTime 
     * @param   {float} currentTime 
     * @returns {float} 
     *      Result Diff b/t nCaseTime, which is set in the Update() method of each room, & nCurrentTime.get().
     */
    var nTimeDiff             = function (caseTime, currentTime) {
        var floorCurrentTime    = Math.floor(currentTime);
        var floorCaseTime       = Math.floor(caseTime);
        var result              = floorCurrentTime - floorCaseTime;

        return result;
    };


    /**
     * Pauses audio played during stills, sets new video source, & begins to play.
     * @param {string} clipUrl 
     *      Address of clip to play.
     */
    var playVideo             = function (urlClip) {
        audioElem.pause();
        video.src(urlClip);
        // TODO: Change param so that it is not ONLY hall one
        var diff                = nTimeDiff(roomObj.hallOne.getTime(), nCurrentTime.get()); 
        video.play();
        video.currentTime(diff);
    };


    /**
     * Plays a sound effect during gameplay. Used for traps, passwords
     * @param {string} clipUrl 
     *      Address of clip to play.
     */
    var playSfx               = function (urlClip) {
        audioElem.src           = urlClip;
        audioElem.play();
    };


    init();

})();