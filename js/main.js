(function () {
    'use strict';

    var nCurrentCam         = null;
    var video               = null;
    var nCurrentTime        = null;
    var urlMediaStream      = null;

    // Used for testing videos locally. Will not work on a server
    var aLocalCamList       = [
          'video/Hall-1.m4v'
        , 'video/Kitchen.m4v'
        , 'video/Entryway.m4v'      // Not avaialble
        , 'video/Living-Room.m4v'
        , 'video/Bathroom.m4v'      // Not available
        , 'video/Bedroom.m4v'
        , 'video/Hall-2.m4v'        // Not available
        , 'video/Driveway.m4v'
    ];

    // Azure hosted MP4s -- works on the web
    var aMP4CamList = [
        // Hall-1
        'https://medianighttrap.blob.core.windows.net/asset-ec25435d-1500-80c3-09ca-f1e52a3a5233/Hall-1.mp4?sv=2012-02-12&sr=c&si=2d42fed2-be3f-4a6c-9217-9482cf0a9156&sig=9nKW%2B9hN2iYZW%2BW0skSqs8RB9vM3Ehd5k3ltPxxDcWg%3D&st=2015-07-14T15%3A09%3A44Z&se=2115-06-20T15%3A09%3A44Z'
        // Kitchen
        , 'https://medianighttrap.blob.core.windows.net/asset-0308435d-1500-80c3-a8c0-f1e52a3ac3b0/Kitchen.mp4?sv=2012-02-12&sr=c&si=1d52abda-4f5a-475d-911f-ed2d0a4e953e&sig=S2oNOwATZSPKSqxDRg8XukiXYA58YZeu6WJlHdcgV%2BI%3D&st=2015-07-14T15%3A16%3A47Z&se=2115-06-20T15%3A16%3A47Z'
        //Entryway
        , ''
        // Living-Room
        , 'https://medianighttrap.blob.core.windows.net/asset-cc27435d-1500-80c3-ad76-f1e52a3ae894/Living-room.mp4?sv=2012-02-12&sr=c&si=bf5a6a18-cfa1-408c-a45f-560687398497&sig=DzBbLzsm3AnaV3XcE3e2JoW%2Foi%2F2ksF4J4vPDRpedq4%3D&st=2015-07-14T15%3A16%3A55Z&se=2115-06-20T15%3A16%3A55Z'
        //Bathroom
        ,''
        // Bedroom
        , 'https://medianighttrap.blob.core.windows.net/asset-9412435d-1500-80c3-6f56-f1e529d32336/Bedroom.mp4?sv=2012-02-12&sr=c&si=a7d1fbe9-58bd-45e2-8d2d-09e04d2e817d&sig=xYng3DacbYamyksaGGRtHYo6ul8dGFuCxyioxwQ%2FGzA%3D&st=2015-07-14T03%3A02%3A16Z&se=2115-06-20T03%3A02%3A16Z'
        // Hall-2
        ,''
        // Driveway
        , 'https://medianighttrap.blob.core.windows.net/asset-5310435d-1500-80c3-fa08-f1e52a3a9080/Driveway.mp4?sv=2012-02-12&sr=c&si=1ef4a6dd-0639-4ad5-88b8-c922ea173424&sig=4bQsPLzeu3BKtXeLolISNHxuqVWkfALOCDZuXybicxc%3D&st=2015-07-14T15%3A11%3A03Z&se=2115-06-20T15%3A11%3A03Z'  
    ]

    // Adaptive bitrate, hosted on Azure. Not tested
    aAdaptiveStreamCamList = [
        ''
        ,'http://nighttrap.streaming.mediaservices.windows.net/1071ab9e-7ae9-431a-a9bd-56dcff768afb/Bedroom.ism/Manifest'
        ,''
        ,''
        ,''
        ,''
        ,''
        ,''
        ,''
    ]

    // Intro videos
    var introVidLocal    = 'video/Intro-Outro.m4v';
    var introVidMp4      = 'https://medianighttrap.blob.core.windows.net/asset-5310435d-1500-80c3-279c-f1e52a3a5429/Intro-outro.mp4?sv=2012-02-12&sr=c&si=7405f907-bcb3-4ef2-9234-32c8277f62fc&sig=BHlAH2uKWjB6I612bXgnA0s3iID7FuaHj%2FftB388Vi0%3D&st=2015-07-14T15%3A09%3A48Z&se=2115-06-20T15%3A09%3A48Z';
    var introVidAdaptive = null;



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
        video.src({ type: 'video/mp4', src: introVidMp4 });
        video.load();
    };

   

    // changeVideoStreamLocal() - Returns a new video stream, used for testing on a local machine. Will not work on a web server.
    // 1. Get current timestamp for video
    // 2. Set the current stream to the ID of the button passed in
    // 3. Set current video time

    var changeVideoStreamLocal = function () {

        nCurrentTime = video.currentTime();
        console.log(nCurrentTime);

        switch (this.id) {
            case 'Hall-1':
                urlMediaStream = aLocalCamList[0];
                break;
            case 'Kitchen':
                urlMediaStream = aLocalCamList[1];
                break;
            case 'Entry-Way':
                urlMediaStream = aLocalCamList[2];
                break;
            case 'Living-Room':
                urlMediaStream = aLocalCamList[3];
                break;
            case'Bathroom':
                urlMediaStream = aLocalCamList[4];
                break;
            case 'Bedroom':
                urlMediaStream = aLocalCamList[5];
                break;
             case 'Hall-2':
                urlMediaStream = aLocalCamList[6];
                break;
            case 'Driveway':
                urlMediaStream = aLocalCamList[7];
        }
        loadNewVideo(urlMediaStream);
    };



    // changeVideoStreamRemote() - Returns a new video stream -- Used for production environment. Pulls feeds from Azure
    // 1. Get current timestamp for video
    // 2. Set the current stream to the ID of the button passed in
    // 3. Set current video time

    var changeVideoStreamLocal = function () {

        nCurrentTime = video.currentTime();
        console.log(nCurrentTime);

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