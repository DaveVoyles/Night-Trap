(function () {
    'use strict';

    var nCurrentCam    = null;
    var video          = null;
    var nCurrentTime   = null;
    var urlMediaStream = null;
    var bUsingAMP      = false;

    // Fallback options for video playing when using AMP
    if (typeof amp === undefined) {
        amp.options.flashSS.swf       = "//amp.azure.net/libs/amp/1.0.0/techs/StrobeMediaPlayback.2.0.swf";
        amp.options.flashSS.plugin    = "//amp.azure.net/libs/amp/1.0.0/techs/MSAdaptiveStreamingPlugin-osmf2.0.swf";
        amp.options.silverlightSS.xap = "//amp.azure.net/libs/amp/1.0.0/techs/SmoothStreamingPlayer.xap";
    }

    // Used for testing videos locally. Will not work on a web server
    var aLocalCamList = [
          'video/Hall-1.mp4     '
        , 'video/Kitchen.mp4    '
        , 'video/Entryway.mp4   '
        , 'video/Living-Room.mp4'
        , 'video/Bathroom.mp4   '
        , 'video/Bedroom.mp4    '
        , 'video/Hall-2.mp4     '
        , 'video/Driveway.mp4   '
    ];

    // Azure hosted MP4s -- works on the web
    var aMP4CamList = [
        // Hall-1
        'https://medianighttrap.blob.core.windows.net/asset-ec25435d-1500-80c3-09ca-f1e52a3a5233/Hall-1.mp4?sv=2012-02-12&sr=c&si=2d42fed2-be3f-4a6c-9217-9482cf0a9156&sig=9nKW%2B9hN2iYZW%2BW0skSqs8RB9vM3Ehd5k3ltPxxDcWg%3D&st=2015-07-14T15%3A09%3A44Z&se=2115-06-20T15%3A09%3A44Z'
        // Kitchen
        , 'https://medianighttrap.blob.core.windows.net/asset-0308435d-1500-80c3-a8c0-f1e52a3ac3b0/Kitchen.mp4?sv=2012-02-12&sr=c&si=1d52abda-4f5a-475d-911f-ed2d0a4e953e&sig=S2oNOwATZSPKSqxDRg8XukiXYA58YZeu6WJlHdcgV%2BI%3D&st=2015-07-14T15%3A16%3A47Z&se=2115-06-20T15%3A16%3A47Z'
        // Entryway
        , 'https://medianighttrap.blob.core.windows.net/asset-0914435d-1500-80c4-dc33-f1e52b5a50bc/Entry%20Way.mp4?sv=2012-02-12&sr=c&si=fae29d98-c886-4163-bff6-f7e698da0b0d&sig=USlApgIimNyM4gHINHVwMe332WIdGWKZZJXm6E12dL4%3D&st=2015-07-16T01%3A30%3A40Z&se=2115-06-22T01%3A30%3A40Z'
        // Living-Room
        , 'https://medianighttrap.blob.core.windows.net/asset-cc27435d-1500-80c3-ad76-f1e52a3ae894/Living-room.mp4?sv=2012-02-12&sr=c&si=bf5a6a18-cfa1-408c-a45f-560687398497&sig=DzBbLzsm3AnaV3XcE3e2JoW%2Foi%2F2ksF4J4vPDRpedq4%3D&st=2015-07-14T15%3A16%3A55Z&se=2115-06-20T15%3A16%3A55Z'
        // Bathroom
        , 'https://medianighttrap.blob.core.windows.net/asset-0308435d-1500-80c4-1748-f1e52b6c787f/Bathroom.mp4?sv=2012-02-12&sr=c&si=f1b69592-0563-41de-be85-46367b0315d2&sig=AEL6zFUvM7IkpBzEHleccdaCOBAjfOcV%2BbOyRdNiVK0%3D&st=2015-07-16T03%3A43%3A29Z&se=2115-06-22T03%3A43%3A29Z'
        // Bedroom
        , 'https://medianighttrap.blob.core.windows.net/asset-9412435d-1500-80c3-6f56-f1e529d32336/Bedroom.mp4?sv=2012-02-12&sr=c&si=a7d1fbe9-58bd-45e2-8d2d-09e04d2e817d&sig=xYng3DacbYamyksaGGRtHYo6ul8dGFuCxyioxwQ%2FGzA%3D&st=2015-07-14T03%3A02%3A16Z&se=2115-06-20T03%3A02%3A16Z'
        // Hall-2
        , 'https://medianighttrap.blob.core.windows.net/asset-e41e435d-1500-80c4-8d2c-f1e52b5f0ed9/Hall-2.mp4?sv=2012-02-12&sr=c&si=d076960f-85e4-457b-a5fc-2a233219bcde&sig=%2FZyXTR%2F7sKHCaDngQT3cLjlSkQJrY5lfDJEsvfwgpC0%3D&st=2015-07-16T02%3A32%3A24Z&se=2115-06-22T02%3A32%3A24Z'
        // Driveway
        , 'https://medianighttrap.blob.core.windows.net/asset-5310435d-1500-80c3-fa08-f1e52a3a9080/Driveway.mp4?sv=2012-02-12&sr=c&si=1ef4a6dd-0639-4ad5-88b8-c922ea173424&sig=4bQsPLzeu3BKtXeLolISNHxuqVWkfALOCDZuXybicxc%3D&st=2015-07-14T15%3A11%3A03Z&se=2115-06-20T15%3A11%3A03Z'
    ]

    // Adaptive bitrate, hosted on Azure. Not tested
    var aAdaptiveStreamCamList = [
        // Hall-1
          'http://nighttrap.streaming.mediaservices.windows.net/90bfe0f4-04f0-4223-8883-c4a1a8246a5a/Hall-1.ism/Manifest'
        // Kitchen
        , 'http://nighttrap.streaming.mediaservices.windows.net/cdaa8b80-8308-47da-b5b1-c6bf95a33c74/Kitchen.ism/Manifest'
        // Entryway
        , 'http://nighttrap.streaming.mediaservices.windows.net/3ddefd8b-9463-4238-80b2-3de5d242a880/Entry%20Way.ism/Manifest'
        // Living-Room
        , 'http://nighttrap.streaming.mediaservices.windows.net/be159b0b-538e-4e72-b7d1-44f4d2868052/Living-room.ism/Manifest'
        // Bathroom
        , ''
        // Bedroom
        , 'http://nighttrap.streaming.mediaservices.windows.net/1071ab9e-7ae9-431a-a9bd-56dcff768afb/Bedroom.ism/Manifest'
        // Hall-2
        , 'http://nighttrap.streaming.mediaservices.windows.net/27535007-d6d3-4245-8122-d89fbbec95a4/Hall-2.ism/Manifest'
        // Driveway
        , 'http://nighttrap.streaming.mediaservices.windows.net/a424d14c-fbab-42d1-a070-b4a722cc6fa7/Driveway.ism/ManifestCopy'
    ]

    // Intro video
    var introVidMp4      = 'https://medianighttrap.blob.core.windows.net/asset-5310435d-1500-80c3-279c-f1e52a3a5429/Intro-outro.mp4?sv=2012-02-12&sr=c&si=7405f907-bcb3-4ef2-9234-32c8277f62fc&sig=BHlAH2uKWjB6I612bXgnA0s3iID7FuaHj%2FftB388Vi0%3D&st=2015-07-14T15%3A09%3A48Z&se=2115-06-20T15%3A09%3A48Z';
    var introVidAdaptive = 'http://nighttrap.streaming.mediaservices.windows.net/fed82a4b-e146-4bde-bbcf-333713e14f37/Intro-outro.ism/Manifest';


    /**
     * Wires up event handlers for buttons.
     * Sets src property for video player.
     */
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


    /**
      * Loads video as soon as page loads for Video.js player
      * Set the urlMediaStream on the video tag.
      */
    var initializeVideoStream = function (stream) {
        video = videojs('video-player');
        video.src([{ type: 'video/mp4', src: introVidMp4 }]);
        video.load();
    };


    /**
     * Loads video as soon as page loads for Azure Media Player.
     * Set the urlMediaStream on the video tag.
     */
    var initializeVideoStreamAMP = function () {
        video = amp('video-p', playerOptions);
        video.src([{
            src: introVidAdaptive, type: "application/vnd.ms-sstr+xml"
        }]);
        video.load();
    }


    /**
     * Pulls url from Azure 
     * Get current timestamp for video
     * Set the current stream to the ID ofs the button passed in
     * Set current video time
     * @returns New video stream 
     */
    var changeVideoStream = function () {
        nCurrentTime = video.currentTime();

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


    /**
     * Pauses, sets new source, loads source, sets currentTime & plays. 
     * If using AMP, urlMediaStream from Azure Media Player of type: .manifest for adaptive bitrate. 
     * If using AMP, need to set time after stream starts playing.
     * @param {string} [urlMediaStream] 
     */
    var loadNewVideo = function (urlMediaStream) {
        if (bUsingAMP) {
            video.pause();
            video.src([{ src: urlMediaStream, type: "application/vnd.ms-sstr+xml" }]);
            video.load();
            video.play();
            video.currentTime(nCurrentTime);
        } else {
            video.pause();
            video.src(urlMediaStream);
            video.load();
            video.currentTime(nCurrentTime);
            video.play();
        }
    }


    /**
     * Only applicable if using the AMP
     */
    var playerOptions = {
        "nativeControlsForTouch": false,
        autoplay: false,
        controls: true,
        width: "640",
        height: "480",
        poster: "/img/Night-Trap-32x-front.jpg"
    };

    init();

})();