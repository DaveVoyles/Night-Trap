(function () {
    'use strict';

    var urlMediaStream = null;
    var aCamList       = [
          'video/Hall-1.m4v'
        , 'video/Kitchen.m4v'
        , 'video/Entryway.m4v'      // Not avaialble
        , 'video/Living-Room.m4v'
        , 'video/Bathroom.m4v'      // Not available
        , 'video/Bedroom.m4v'
        , 'video/Hall-2.m4v'        // Not available
        , 'video/Driveway.m4v'
    ];
    var introVid       = 'video/Intro-Outro.m4v';
    var nCurrentCam    = null;
    var video          = null;
    var nCurrentTime   = null;


    // init() - The entry point to the demo code
    // 1. Wires up event handlers for buttons
    // 2. Sets src property for video player

    var init = function () {
        document.getElementById('Hall-1'     ).addEventListener('click', changeVideoStream, false);
        document.getElementById('Kitchen'    ).addEventListener('click', changeVideoStream, false);
        document.getElementById('Entry-Way'  ).addEventListener('click', changeVideoStream, false);
        document.getElementById('Living-Room').addEventListener('click', changeVideoStream, false);
        document.getElementById('Bathroom'   ).addEventListener('click', changeVideoStream, false);
        document.getElementById('Bedroom'    ).addEventListener('click', changeVideoStream, false);
        document.getElementById('Hall-2'     ).addEventListener('click', changeVideoStream, false);
        document.getElementById('Driveway'   ).addEventListener('click', changeVideoStream, false);

        initializeVideoStream();
    };


    // initializeVideoStream() - Loads video as soon as page loads
    // 1. Set the urlMediaStream on the video tag

    var initializeVideoStream = function (stream) {
        video = videojs('video-player');
        video.src({ type: 'video/mp4', src: "https://medianighttrap.blob.core.windows.net/asset-9412435d-1500-80c3-6f56-f1e529d32336/Bedroom.mp4?sv=2012-02-12&sr=c&si=a7d1fbe9-58bd-45e2-8d2d-09e04d2e817d&sig=xYng3DacbYamyksaGGRtHYo6ul8dGFuCxyioxwQ%2FGzA%3D&st=2015-07-14T03%3A02%3A16Z&se=2115-06-20T03%3A02%3A16Z" });
        video.load();
    };

   


    // changeVideoStream() - Returns a new video stream
    // 1. Get current timestamp for video
    // 2. Set the current stream to the ID of the button passed in
    // 3. Set current video time

    var changeVideoStream = function () {

        nCurrentTime = video.currentTime();
        console.log(nCurrentTime);

        switch (this.id) {
            case 'Hall-1':
                urlMediaStream = aCamList[0];
                break;
            case 'Kitchen':
                urlMediaStream = aCamList[1];
                break;
            case 'Entry-Way':
                urlMediaStream = aCamList[2];
                break;
            case 'Living-Room':
                urlMediaStream = aCamList[3];
                break;
            case'Bathroom':
                urlMediaStream = aCamList[4];
                break;
            case 'Bedroom':
                urlMediaStream = aCamList[5];
                break;
             case 'Hall-2':
                urlMediaStream = aCamList[6];
                break;
            case 'Driveway':
                urlMediaStream = aCamList[7];
        }
        loadNewVideo(urlMediaStream);
    };


    // loadNewVideo () - Accepts urlMediaStream 
    // 1. Pauses, sets new source, loads source, sets currentTime & plays

    var loadNewVideo = function (urlMediaStream) {
        video.pause();
        video.src(urlMediaStream);
        video.load();
        video.currentTime(nCurrentTime);
        video.play();
    }


    init();

})();