(function () {
    'use strict';

    var nCurrentCam    = null;  // Camera (room) player currently has selected
    var video          = null;  // Video player
    var nCurrentTime   = null;  // Timestamp
    var urlMediaStream = null;  // Source for the video feed
    var bUsingAMP      = false; // Using Azure Media Player for adaptive streaming?
    var password       = [{}];

    // Fallback options for video playing when using AMP
    if (typeof amp === undefined) {
        amp.options.flashSS.swf       = "//amp.azure.net/libs/amp/1.0.0/techs/StrobeMediaPlayback.2.0.swf";
        amp.options.flashSS.plugin    = "//amp.azure.net/libs/amp/1.0.0/techs/MSAdaptiveStreamingPlugin-osmf2.0.swf";
        amp.options.silverlightSS.xap = "//amp.azure.net/libs/amp/1.0.0/techs/SmoothStreamingPlayer.xap";
    }

    var camMisc = {
        DPWORLDD: '',
        // Intro
        c11: 'https://medianighttrap.blob.core.windows.net/asset-e41e435d-1500-80c4-bfd6-f1e52dbc8916/00000011-Intro.mp4?sv=2012-02-12&sr=c&si=2e8cdfc7-b544-41d5-b589-f9b7a63b30cf&sig=WafTBePJo8TIgpXdc29Mgw1wBi9wQ6nxtOpF7amRoJY%3D&st=2015-07-19T02%3A20%3A13Z&se=2115-06-25T02%3A20%3A13Z',
    }

    var camHallOne = {
        c21: 'https://medianighttrap.blob.core.windows.net/asset-e41e435d-1500-80c4-7565-f1e52dbb7f85/00000021.mp4?sv=2012-02-12&sr=c&si=ebc8ac96-42bb-4bb0-aa3d-73568364a354&sig=NZQg4LdeJvFfbGf%2FUIEAhMsVLM0K3HhmTD%2FgZH%2BbgFM%3D&st=2015-07-19T02%3A18%3A40Z&se=2115-06-25T02%3A18%3A40Z'
    }


    // Azure hosted MP4s -- works on the web
    var aMP4CamList = [
        // Hall-1
          'https://medianighttrap.blob.core.windows.net/asset-cc27435d-1500-80c4-2ff5-f1e52dcd6b9b/Hall%201.mp4?sv=2012-02-12&sr=c&si=25e8addd-457c-42c7-adf9-6f2be68f2214&sig=tHHSs9wzZKVBrBKYOBddwy7hc2GdSfjeCI6IaLslVJY%3D&st=2015-07-19T04%3A19%3A19Z&se=2115-06-25T04%3A19%3A19Z'
        // Kitchen
        , 'https://medianighttrap.blob.core.windows.net/asset-9412435d-1500-80c4-f800-f1e52dd5a212/Kitchen.mp4?sv=2012-02-12&sr=c&si=1513ed65-b011-4620-b128-1e16dcfe395e&sig=Yt7jTW5fxOWJk5KNi0nYOESyl2EkXqcLrHYuy%2Bz3uPk%3D&st=2015-07-19T05%3A18%3A06Z&se=2115-06-25T05%3A18%3A06Z'
        // Entryway
        , 'https://medianighttrap.blob.core.windows.net/asset-5310435d-1500-80c4-f3ea-f1e52e216cf4/Entry%20Way.mp4?sv=2012-02-12&sr=c&si=4ec337f4-fe1d-4603-b707-cf5e4364a875&sig=UAuW673XANrycx2tJKWGSu%2BRHx%2Fw562X%2BB7dJ%2BeCDWU%3D&st=2015-07-19T14%3A21%3A21Z&se=2115-06-25T14%3A21%3A21Z'
        // Living-Room
        , 'https://medianighttrap.blob.core.windows.net/asset-9412435d-1500-80c4-1b8f-f1e52e219307/Living%20Room.mp4?sv=2012-02-12&sr=c&si=d1c9ff74-197f-4b54-980b-6fd03659a038&sig=xyf%2B35eRfAgJgE5PG6qclWFPmFs9KJPc7rTbVChbcsg%3D&st=2015-07-19T14%3A21%3A42Z&se=2115-06-25T14%3A21%3A42Z'
        // Bathroom
        , 'https://medianighttrap.blob.core.windows.net/asset-ec25435d-1500-80c4-67eb-f1e52dc2410d/Bathroom.mp4?sv=2012-02-12&sr=c&si=c3d18fc6-8f68-4c1b-a0af-2b4dea3e3427&sig=QzETveyrXJ%2BvEO787B3NlKeFuNaN37sCzMa%2F7K3%2FKbE%3D&st=2015-07-19T03%3A11%3A00Z&se=2115-06-25T03%3A11%3A00Z'
        // Bedroom
        , 'https://medianighttrap.blob.core.windows.net/asset-9412435d-1500-80c4-a131-f1e52dc68826/Bedroom.mp4?sv=2012-02-12&sr=c&si=527a5f46-e297-4de5-9066-45908dd8860b&sig=6IYbeUeDaZp7A2CESbRngC0VGSJscxUU8qFyi5UnAKU%3D&st=2015-07-19T03%3A30%3A25Z&se=2115-06-25T03%3A30%3A25Z'
        // Hall-2
        , 'https://medianighttrap.blob.core.windows.net/asset-e41e435d-1500-80c4-b2c6-f1e52e22ea99/Hall%202.mp4?sv=2012-02-12&sr=c&si=1807cd36-2894-4d6f-8715-8e670bac1a83&sig=pVwcFddrVon1dRK07WFaC1ZkZVUfWP%2BL4UMu1ox4EgQ%3D&st=2015-07-19T14%3A31%3A20Z&se=2115-06-25T14%3A31%3A20Z'
        // Driveway
        , 'https://medianighttrap.blob.core.windows.net/asset-e41e435d-1500-80c4-cb0f-f1e52e2ba9ad/Driveway.mp4?sv=2012-02-12&sr=c&si=5ef75072-f00a-4dfe-b594-2bca9a240e72&sig=dA17z0KePOg1lJztRxEeAqbTmBKqEqnbeyov0WP8BhU%3D&st=2015-07-19T15%3A33%3A50Z&se=2115-06-25T15%3A33%3A50Z'
    ]

    // Intro video
    var introVidMp4 = 'https://medianighttrap.blob.core.windows.net/asset-e41e435d-1500-80c4-3ded-f1e52e2c2261/00000011-Intro.mp4?sv=2012-02-12&sr=c&si=0bf72883-4a5b-475e-be0f-bbe6ed7cbd3e&sig=2K7QFWy7Xrtpk4mUzv3ff87p5cu29sYomDDLyROWG6U%3D&st=2015-07-19T15%3A37%3A19Z&se=2115-06-25T15%3A37%3A19Z';


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