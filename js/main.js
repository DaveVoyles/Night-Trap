(function () {
    //'use strict';

    // Timer to keep track of user's time spent in-game
    var start          = new Date();
    // Audio element for SFX, passwords, and noises during stills
    var audio           = null;
    // Are we in Debug mode?
    var bDebug          = true;
    var timer           = new Timer();
    var newClip         = null;
    // Camera (room) player currently has selected
    var nCurrentCam     = null;
    // elapsedTime() sets this value
    var nCurrentTime    = 0;
    var video           = null;   
    // Source for the video feed
    var urlMediaStream  = null;
    // Random password set by game 
    var ranPassword     = "Blue";
    // What has the user selected?
    var curUserPassword = "Blue"; 
    var aPasswords      = {
        Purple : "Purple"
      , Blue   : "Blue"
      , Red    : "Red"
      , Green  : "Green"
      , Yellow : "Yellow"
      , Orange : "Orange"
    };

    // Path to SFX
    var aAudioClips = {
          change   : "sfx/CHANGE.mp3"
        , crickets : "sfx/CRICK2.mp3"
        , frogs    : "sfx/FROG2.mp3"
        , denied   : "sfx/DENIED.mp3"
    };

    // Posters, which are set as the camera feed when room is empty
    var aStills = {
          HallOne    : "img/stills/BATHROOM_1.JPG   "
        , Kitchen    : "img/stills/KITCHEN_1.JPG    "
        , Entryway   : "img/stills/ENTRY-WAY_1.JPG  "
        , Livingroom : "img/stills/Living-ROom_1.JPG"
        , Bathroom   : "img/stills/Bathroom_1.JPG   "
        , Bedroom    : "img/stills/Bedroom_1.JPG    "
        , HallTwo    : "img/stils/Hall-Two_1.JPG    "
        , Driveway   : "img/stills/Driveway_1.JPG   "
    };

    /**
     * Which camera is currently selected?
     * You should also set the still to currently selected room when changing cameras, too.
     */
    var aRoomCam = {
          HallOne    : 0
        , Kitchen    : 1
        , Entryway   : 2
        , Livingroom : 3
        , Bathroom   : 4
        , Bedroom    : 5
        , HallTwo    : 6
        , Driveway   : 7
    };

    /** Which url should this room be on at this moment? 
     * @example: aCurrentRoomUrl.HallOne = camHallOne.c21;
     */
    var aCurrentRoomUrl = {
          HallOne    : ''
        , Kitchen    : ''
        , Entryway   : ''
        , LivingRoom : ''
        , Bathroom   : ''
        , Bedroom    : ''
        , HallTwo    : ''
        , Driveway   : ''
    };

    /* Temp videos for testing playback */
    var aTempLocal = [
        'video/00180291.mp4',
        'video/00352291.mp4',
        'video/00431292.mp4'
    ];

    /* 0 | 1 Opening & General */
    var camMisc = {
        DPWORLDD: '',
        // Intro briefing
        c11: 'https://nighttrap.blob.core.windows.net/vid/intro/00000011-Intro.mp4'
    };

    /* 2 - Hall-1 */
    var camHallOne = {
         // Augers enter through back door, walk to basement
          c21:      'https://nighttrap.blob.core.windows.net/vid/hallone/00000021.mp4'
        // TRAP: Augers caught in hall
        , c130422:  'https://nighttrap.blob.core.windows.net/vid/hallone/00130422.mp4'
        // Tony, Jeff, & Dad enter from basement
        , c1152221: 'https://nighttrap.blob.core.windows.net/vid/hallone/02500221.mp4'
    };

    /* 3 - Kitchen */
    var camKitchen = {
         // 1 Auger walks in from Entry. Can catch at 4 Sec
          c1200431: 'https://nighttrap.blob.core.windows.net/vid/kitchen/01200431.mp4'
        // 1 Auger caught in kitchen when trying to access fridge
        , c1240632: 'https://nighttrap.blob.core.windows.net/vid/kitchen/01240632.mp4'
        // Tony, Jeff, & Dad enter from Hall-1, talk to parents
        , c1481231: 'https://nighttrap.blob.core.windows.net/vid/kitchen/01481231.mp4'
    };

    /* 4- Living-Room */
    var camLivingRoom = {
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
    var camDriveway = {
        //  Girls enter the driveway, meet eddy, walk in. Can catch at ~6 Sec.
          c1440451: 'https://nighttrap.blob.core.windows.net/vid/driveway/01440451.mp4'
        // TRAP: Launching auger from roof
        , c1502452: 'https://nighttrap.blob.core.windows.net/vid/driveway/01502452.mp4'
    };

    /* 6 - Entryway */
    var camEntryway = {
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
    var camHallTwo = {
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
    var camBedroom = {
        //Sarah staring at mirror, 3 augers enter two go to bathroom one to hall-2
           c81:    'https://nighttrap.blob.core.windows.net/vid/bedroom/00000081.mp4'
        // TRAP: Augers caught 
        , c130422: 'https://medianighttrap.blob.core.windows.net/asset-e41e435d-1500-80c4-a05f-f1e52dbb857e/00130422.mp4?sv=2012-02-12&sr=c&si=681815ff-ed6f-4acf-861c-3886316945ee&sig=vUMKUifi5f3Pcj7WlVQqy4R0FYJ6AF9%2BjPQXbdMaONc%3D&st=2015-07-19T02%3A18%3A44Z&se=2115-06-25T02%3A18%3A44Z'
        // TRAP: 1 Auger is caught, other walks into bathroom
        , c352482: 'https://nighttrap.blob.core.windows.net/vid/bedroom/00352482.mp4'
        // Auger walks in from Bathroom, goes out window
        , c540281: 'https://nighttrap.blob.core.windows.net/vid/bedroom/00540281.mp4'
    };


    //TODO: 1 too many here?
    /* 9 - Bathroom */
    var camBathroom = {
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
    var init = function () {
        wireButtonsToEvent();
        initializeAudio();
        initializeVideoStream();
        MainLoop.setUpdate(update).setDraw(draw).start();
    };


    /**
     * Rooom buttons now changeVideoStream() when clicked.
     */
    var wireButtonsToEvent = function () {

        document.getElementById('Hall-1'     ).addEventListener('click', changeVideoStream, false);
        document.getElementById('Kitchen'    ).addEventListener('click', changeVideoStream, false);
        document.getElementById('Entry-Way'  ).addEventListener('click', changeVideoStream, false);
        document.getElementById('Living-Room').addEventListener('click', changeVideoStream, false);
        document.getElementById('Bathroom'   ).addEventListener('click', changeVideoStream, false);
        document.getElementById('Bedroom'    ).addEventListener('click', changeVideoStream, false);
        document.getElementById('Hall-2'     ).addEventListener('click', changeVideoStream, false);
        document.getElementById('Driveway'   ).addEventListener('click', changeVideoStream, false);
    };


    /**
     * Converts seconds to "MM:SS"
     * @param {float} seconds
     *      Takes seconds and returns it in string format of MM:SS for on screen timer
     */
    var secondsToTimeString = function (seconds) {

        var s         = Math.floor(seconds % 60);
        var m         = Math.floor((seconds * 1000 / (1000 * 60)) % 60);
        var strFormat = "MM:SS";

        if (s < 10) s = "0" + s;
        if (m < 10) m = "0" + m;

        strFormat = strFormat.replace(/MM/, m);
        strFormat = strFormat.replace(/SS/, s);

        return strFormat;
    };


    /**
     * Place in update() to get total time since user has started game.
     */
    var elapsedTime = function () {
        var end       = new Date();
        var elapsedMS = end.getTime() - start.getTime();
        var seconds   = Math.round(elapsedMS / 1000);
        var minutes   = Math.round(seconds   /   60);

        nCurrentTime = seconds;
    };


    /**
     * Update loop for checking when to change video scenes 
     * @param {float} delta
     *      The amount of time since the last update, in seconds
     */
    var update = function (delta) {
        elapsedTime();
        eventsHallOne();

        if (bDebug) {
            //console.log(secondsToTimeString(nCurrentTime));
            //console.log(nCurrentTime);
        }
    };


    /**
     * Check if browser supports audio -- if not, tell user to update
     */
    var initializeAudio = function () {
        audio = document.getElementById('audio-tag');
        if (!Modernizr.audio) {
            window.open("http://outdatedbrowser.com/en", '_blank');
        }
    };


    /**
     * Check if browser supports audio -- if not, tell user to update
     * Loads video as soon as page loads for Video.js player
     */
    var initializeVideoStream = function () {
        video = videojs('video-player');
        if (!Modernizr.video) {
            window.open("http://outdatedbrowser.com/en", '_blank');
        }
        if (bDebug) {
            video.src([{ type: 'video/mp4', src: camMisc.c11 }]);
            video.load();
        } else {
            video.src([{ type: 'video/mp4', src: camMisc.c11 }]);
            video.load();
        }
    };

     
    /**
     * Draws the GUI to the screen
     * @param {float} interpolationPercentage
     *   How much to interpolate between frames.
     */
    var draw = function (interpolatePercentage) {
    };


    /**
     * Pulls url from Azure 
     * Get current timestamp for video
     * Set the current stream to the ID ofs the button passed in
     * Set current video time
     * @returns New video stream 
     */
    var changeVideoStream = function () {

        if (bDebug) {
            switch (this.id) {
                case 'Hall-1':
                    urlMediaStream = aTempLocal[1];
                    console.log("1 - Augs");
                    break;
                case 'Kitchen':
                    urlMediaStream = aTempLocal[2];
                    console.log("2 - trap");
                    break;
                case 'Entry-Way':
                    triggerTrap(aTempLocal[2], aTempLocal[1], aStills.HallOne);
                    break;
                case 'Living-Room':
                    triggerTrap(aTempLocal[1], aTempLocal[0], aStills.HallOne);
                    break;
                case 'Bathroom':
                    urlMediaStream = aMP4CamList[4];
                    break;
                case 'Bedroom':
                    urlMediaStream = aMP4CamList[5];
                    break;
                case 'Hall-2':
                    urlMediaStream = aMP4CamList[6];
                    break;
                case 'Driveway':
                    urlMediaStream = aMP4CamList[7];
            }
            playVideo(urlMediaStream);

        } else {
            switch (this.id) {
                case 'Hall-1':
                    urlMediaStream = aMP4CamList[0];
                    break;
                case 'Kitchen':
                    urlMediaStream = aMP4CamList[1];
                    break;
                case 'Entry-Way':
                    urlMediaStream = aMP4CamList[2];
                    break;
                case 'Living-Room':
                    urlMediaStream = aMP4CamList[3];
                    break;
                case 'Bathroom':
                    urlMediaStream = aMP4CamList[4];
                    break;
                case 'Bedroom':
                    urlMediaStream = aMP4CamList[5];
                    break;
                case 'Hall-2':
                    urlMediaStream = aMP4CamList[6];
                    break;
                case 'Driveway':
                    urlMediaStream = aMP4CamList[7];
            }
            playVideo(urlMediaStream);
        }
    };


    /**
     * All events occuring in Hall One are triggered from this
     */
    var eventsHallOne = function () {
        switch (nCurrentTime) {
            case 0:
                triggerTrap(camHallOne.c21, camHallOne.c, aStills.HallOne);
                break;
            case 7:
                //console.log("Time is: " + nCurrentTime);
                break;
        }
    };


    /**
     * hasPlayed variable prevents the footage from looping.
     * Second 'ended' event draws poster to screen when 2nd clip has completed
     * Sets the poster (background) between clips to the room you are currently viewing
     * @param {string} trapUrl   Clip with the trap sequence.
     * @param {string} [nexturl] Trap clips are often have a clip that appears next.
     * @param {string} [still]   Image source to set after clips have completed   
     */
    var triggerTrap = function (trapUrl, nextUrl, still) {
        playVideo(trapUrl);
        video.poster(still);

        var hasPlayed = false;
        video.on('ended', function() {
            if (hasPlayed === false) {
                playVideo(nextUrl);
            }

            hasPlayed = true;
            video.on('ended', function() {
                video.src(video.src);
                playAudio(aAudioClips.crickets);
            });
        });
    }; 


    /**
     * Audio to play during stills
     * @param {string} clipUrl      - Address of clip to play
     * @param {bool}  [bShouldLoop] - Stills need to loop. SFX for passwords / traps do not.
     */
    var playAudio = function (urlClip, bShouldLoop) {
        bShouldLoop = bShouldLoop || true;
        if (bShouldLoop) {
            audio.loop = bShouldLoop;
        }

        audio.src = urlClip;
        audio.play();
    };


    /**
     * Pauses audio played during stills, sets new video source, & begins to play.
     * @param {url} clipUrl - Address of clip to play.
     */
    var playVideo = function (urlClip) {
        audio.pause();
        video.src(urlClip);
        video.play();
    };


    init();

})();