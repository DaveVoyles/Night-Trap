(function () {
    'use strict';

    // Audio element for SFX, passwords, and noises during stills
    var audio           = null;
    // Are we in Debug mode?
    var bDebug          = true;
    var timer           = new Timer();
    var newClip         = null;
    // Camera (room) player currently has selected
    var nCurrentCam     = null;   
    var video           = null;   
    var nCurrentTime    = null;
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
    var roomCam = {
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
     * @example: currentRoomUrl.HallOne = camHallOne.c21;
     */
    var currentRoomUrl = {
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
        c11: 'https://medianighttrap.blob.core.windows.net/asset-e41e435d-1500-80c4-bfd6-f1e52dbc8916/00000011-Intro.mp4?sv=2012-02-12&sr=c&si=2e8cdfc7-b544-41d5-b589-f9b7a63b30cf&sig=WafTBePJo8TIgpXdc29Mgw1wBi9wQ6nxtOpF7amRoJY%3D&st=2015-07-19T02%3A20%3A13Z&se=2115-06-25T02%3A20%3A13Z',
    };

    /* 2 - Hall-1 */
    var camHallOne = {
        // Augers enter through back door, walk to basement
          c21: 'https://medianighttrap.blob.core.windows.net/asset-e41e435d-1500-80c4-7565-f1e52dbb7f85/00000021.mp4?sv=2012-02-12&sr=c&si=ebc8ac96-42bb-4bb0-aa3d-73568364a354&sig=NZQg4LdeJvFfbGf%2FUIEAhMsVLM0K3HhmTD%2FgZH%2BbgFM%3D&st=2015-07-19T02%3A18%3A40Z&se=2115-06-25T02%3A18%3A40Z'
        // Tony, Jeff, & Dad enter from basement
        , c1152221: ''
    };

    /* 3 - Kitchen */
    var camKitchen = {
        // 1 Auger walks in from Entry. Can catch at 4 Sec
          c1200431: 'https://medianighttrap.blob.core.windows.net/asset-0308435d-1500-80c4-30fc-f1e52dbc38c6/01200431.mp4?sv=2012-02-12&sr=c&si=de4d8c8a-d3e6-4b6d-9508-4a8beb6ce5b3&sig=5WGDAMEEjgJMgtv%2FDB8C2WWIrQN9v%2B9xyAKwUyq77V8%3D&st=2015-07-19T02%3A19%3A17Z&se=2115-06-25T02%3A19%3A17Z'
        // 1 Auger caught in kitchen when trying to access fridge
        , c1240632: 'https://medianighttrap.blob.core.windows.net/asset-0308435d-1500-80c4-6394-f1e52dbc3ec0/01240632.mp4?sv=2012-02-12&sr=c&si=5c9aa1f6-d179-4b7b-bf1c-c14c18cca372&sig=oeolzxJAOJxFrIvyQGC9ry9Rdlqkgvx5LUap2wtAgTU%3D&st=2015-07-19T02%3A19%3A21Z&se=2115-06-25T02%3A19%3A21Z'
        // Tony, Jeff, & Dad enter from Hall-1, talk to parents
        , c1481231: 'https://medianighttrap.blob.core.windows.net/asset-0308435d-1500-80c4-3035-f1e52dbc44db/01481231.mp4?sv=2012-02-12&sr=c&si=dff21bde-1643-4883-a120-25a8d12a6127&sig=wBr7IOrNZVpo7eGsePFxD0vvNMXt%2BMhpDHqa5ece55g%3D&st=2015-07-19T02%3A19%3A25Z&se=2115-06-25T02%3A19%3A25Z'
    };

    /* 4- Living-Room */
    var camLivingRoom = {
        // Augers enter from outside
          c232241: 'https://medianighttrap.blob.core.windows.net/asset-e41e435d-1500-80c4-70ef-f1e52dbc471a/00232241.mp4?sv=2012-02-12&sr=c&si=02d08290-0b0a-4034-b9f0-d8db227c6f29&sig=yJ6xoJnnV6aoLc04XkASxWwL9UHxPkhKcME5%2FNO0zTY%3D&st=2015-07-19T02%3A19%3A28Z&se=2115-06-25T02%3A19%3A28Z'
        // TRAP: Augers caught on bookshelf
        , c271442: 'https://medianighttrap.blob.core.windows.net/asset-e41e435d-1500-80c4-bef1-f1e52dbc4d16/00271442.mp4?sv=2012-02-12&sr=c&si=42a81bac-2d95-4f80-8aac-626335a5e760&sig=MAHzyqHhfFPhszrB3JG9LRsJruwVoD892C8nXm61xeU%3D&st=2015-07-19T02%3A19%3A36Z&se=2115-06-25T02%3A19%3A36Z'
        // Augers Escape
        , c271641: 'https://medianighttrap.blob.core.windows.net/asset-0308435d-1500-80c4-58ba-f1e52dbc50eb/00271641.mp4?sv=2012-02-12&sr=c&si=7e282a7b-0092-4f12-a655-365244830884&sig=HiM5bOCTM6%2BAfBli1N642%2BcoB7cZ5uflwobMboFoofg%3D&st=2015-07-19T02%3A19%3A39Z&se=2115-06-25T02%3A19%3A39Z'
        // TRAP: Auger caught on library 
        , c0554164a: 'https://medianighttrap.blob.core.windows.net/asset-0308435d-1500-80c4-598b-f1e52dbc50eb/0554164a.mp4?sv=2012-02-12&sr=c&si=40d4ed57-a60f-466e-a419-d23df7cd2453&sig=KgF457WZQ3ZFLt6ZzQlLHPTP0itBY6Y%2FS%2FwD8fHw9uA%3D&st=2015-07-19T02%3A19%3A47Z&se=2115-06-25T02%3A19%3A47Z'
        // 2 Augers enter from outside
        , c1001241: 'https://medianighttrap.blob.core.windows.net/asset-e41e435d-1500-80c4-bfbe-f1e52dbc5935/01001241.mp4?sv=2012-02-12&sr=c&si=2fa14586-eef1-4054-b396-5aca05a35663&sig=iPT8AbjglSPkF5kG58SlUSb6wfp4PFMenLK%2FvUqkcsU%3D&st=2015-07-19T02%3A19%3A51Z&se=2115-06-25T02%3A19%3A51Z'
        // TRAP: Augers caught on right side of living room
        , c1071042: 'https://medianighttrap.blob.core.windows.net/asset-e41e435d-1500-80c4-c069-f1e52dbc5935/01071042.mp4?sv=2012-02-12&sr=c&si=5ce46602-104d-4edb-802d-d83ba7138b2c&sig=eLTJrZNXNwmrlBSMND%2BxAOPSwdJo%2BKwUNK4%2BY3YNNXw%3D&st=2015-07-19T02%3A20%3A00Z&se=2115-06-25T02%3A20%3A00Z'
        // Mom enters from bookshelf
        , c1572241: 'https://medianighttrap.blob.core.windows.net/asset-e41e435d-1500-80c4-1c85-f1e52dbc5f31/01572241.mp4?sv=2012-02-12&sr=c&si=3b4d698c-ef70-4a50-bd89-9c570c6d530a&sig=eqz3g9UoWZzSXYZTTEzMCoUL0NpVZh0S24Oh5m5evDA%3D&st=2015-07-19T02%3A20%3A06Z&se=2115-06-25T02%3A20%3A06Z'
    };

    /* 5 - Driveway */
    var camDriveway = {
        //  Girls enter the driveway, meet eddy, walk in. Can catch at ~6 Sec.
          c1440451: 'https://medianighttrap.blob.core.windows.net/asset-e41e435d-1500-80c4-7449-f1e52dbb7f85/01440451.mp4?sv=2012-02-12&sr=c&si=3bfe3669-5427-446a-a00b-39129ec7986c&sig=hxwhWHtAMXA4kExbUiaoBIFRuLNETcTmPWfGxauHIbU%3D&st=2015-07-19T02%3A18%3A35Z&se=2115-06-25T02%3A18%3A35Z'
        // TRAP: Auger caught on roof 
        , c1502452: 'https://medianighttrap.blob.core.windows.net/asset-cc27435d-1500-80c4-583c-f1e52dbb7ba6/01502452.mp4?sv=2012-02-12&sr=c&si=67b13384-7b89-4bc2-bd4d-24163b07e630&sig=XA1XP%2BMY6LspCBBrCXeWq6Rm2tAGZZNy5333sK1KfzU%3D&st=2015-07-19T02%3A18%3A28Z&se=2115-06-25T02%3A18%3A28Z'
    };

    /* 6 - Entryway */
    var camEntryway = {
        // 1 Auger walks in from beneath stairs. Looks outside. Can be caught
          c1320261: 'https://medianighttrap.blob.core.windows.net/asset-e41e435d-1500-80c4-c0df-f1e52dbb8b7f/01320261.mp4?sv=2012-02-12&sr=c&si=b6ef1446-a021-466c-84aa-42a8c1e065be&sig=gvEE8c4rvCQDGfS33E62CZJ1rU%2FYhwKy%2BTkpJkfyoeM%3D&st=2015-07-19T02%3A18%3A47Z&se=2115-06-25T02%3A18%3A47Z'
        // 1 Auger caught in  entryway
        , c1391862: 'https://medianighttrap.blob.core.windows.net/asset-e41e435d-1500-80c4-c1b2-f1e52dbb8b7f/01391862.mp4?sv=2012-02-12&sr=c&si=f1bd3094-de36-4308-aa5e-dce204fe24a2&sig=E9JpzFTxabxjAcmFuq8sg%2FwgiATaVvZhjR%2BAdiXuetI%3D&st=2015-07-19T02%3A18%3A51Z&se=2115-06-25T02%3A18%3A51Z'
        // Sarah enters from closet, parents enter, augers can be trapped on stairs
        , c2122461: 'https://medianighttrap.blob.core.windows.net/asset-e41e435d-1500-80c4-5c78-f1e52dbb9199/02122461.mp4?sv=2012-02-12&sr=c&si=407f5bad-f9d0-4bf2-ae6a-6c6c722ce486&sig=IJRawvQ9P8dH590TbLEx21u8fbuOPD2paOVWANHjE%2FE%3D&st=2015-07-19T02%3A18%3A56Z&se=2115-06-25T02%3A18%3A56Z'
        // 
        , c2500221: 'https://medianighttrap.blob.core.windows.net/asset-e41e435d-1500-80c4-3ba5-f1e52dbb97ae/02500221.mp4?sv=2012-02-12&sr=c&si=f34e6bd8-dbe4-464f-b0f8-2b16c61fcecd&sig=DretusvijWM7WVsXbipYK6W%2FBjEHDn9jXwsxg8%2F3zyE%3D&st=2015-07-19T02%3A18%3A59Z&se=2115-06-25T02%3A18%3A59Z'
    };

    /* 7 - Hall-2 */
    var camHallTwo = {
        // Auger enters hall 2 from bedroom
          c310471: 'https://medianighttrap.blob.core.windows.net/asset-e41e435d-1500-80c4-c3ee-f1e52dbc2ef2/00310471.mp4?sv=2012-02-12&sr=c&si=8e4457eb-c052-4465-9402-3ad0bec91833&sig=0ztjrEiCDVsooxbKihP4ZSCl7XZSMgwf3%2Bka9C8Sc1g%3D&st=2015-07-19T02%3A19%3A02Z&se=2115-06-25T02%3A19%3A02Z'
        // Auger walks in from Bathroom.
        , c500271: 'https://medianighttrap.blob.core.windows.net/asset-ec25435d-1500-80c4-b5d4-f1e52dbc2df2/00500271.mp4?sv=2012-02-12&sr=c&si=3e6be747-bd64-4047-9a30-3e4646d07369&sig=gAN8fjUrUDz1OzZ5VhxM6Dg1BejdR5yPR3OeHRh%2FO4E%3D&st=2015-07-19T02%3A19%3A06Z&se=2115-06-25T02%3A19%3A06Z'
        // Auger caught in hall trap
        , c542272: 'https://medianighttrap.blob.core.windows.net/asset-0308435d-1500-80c4-555d-f1e52dbc32c4/00542272.mp4?sv=2012-02-12&sr=c&si=b5c9631d-572e-4ff2-95e7-bcee0d093753&sig=N%2Fw%2Fbpocu1ZN8qtlDlPvID6U7Wf0%2FTZXqXUNVK5I2dM%3D&st=2015-07-19T02%3A19%3A09Z&se=2115-06-25T02%3A19%3A09Z'
        // Augers enters from bedroom, goes down stairs
        , c2390671: 'https://medianighttrap.blob.core.windows.net/asset-0308435d-1500-80c4-5633-f1e52dbc32c4/02390671.mp4?sv=2012-02-12&sr=c&si=a9bd4dcc-329d-4599-b2d9-93551867f579&sig=BtC0Aj2s%2FmMiLDr8UVwrPgMrVD7YILUdSO2y5zv04Qs%3D&st=2015-07-19T02%3A19%3A13Z&se=2115-06-25T02%3A19%3A13Z'
    };

    /* 8 - Bedroom */
    var camBedroom = {
        //Sarah staring at mirror, 3 augers enter two go to bathroom one to hall-2
          c81: 'https://medianighttrap.blob.core.windows.net/asset-e41e435d-1500-80c4-ca75-f1e52dbb617d/00000081.mp4?sv=2012-02-12&sr=c&si=283f3a04-7e97-4de1-9b94-a2292537baac&sig=hT1mSrjIuE9eAcIYvSKTbFu7H96ZV2sYjD0XgPdZQXQ%3D&st=2015-07-19T02%3A17%3A58Z&se=2115-06-25T02%3A17%3A58Z'
        // TRAP: Augers caught 
        , c130422: 'https://medianighttrap.blob.core.windows.net/asset-e41e435d-1500-80c4-a05f-f1e52dbb857e/00130422.mp4?sv=2012-02-12&sr=c&si=681815ff-ed6f-4acf-861c-3886316945ee&sig=vUMKUifi5f3Pcj7WlVQqy4R0FYJ6AF9%2BjPQXbdMaONc%3D&st=2015-07-19T02%3A18%3A44Z&se=2115-06-25T02%3A18%3A44Z'
        // TRAP: 1 Auger is caught, other walks into bathroom
        , c352482: 'https://medianighttrap.blob.core.windows.net/asset-cc27435d-1500-80c4-455b-f1e52dbb63bb/00352482.mp4?sv=2012-02-12&sr=c&si=c3377a98-55fe-475a-aa89-1160cf338a83&sig=T6rqaAbiay9XdNG3Y4uWuULpfDt0t3AzJNRPU7ZxLaI%3D&st=2015-07-19T02%3A18%3A10Z&se=2115-06-25T02%3A18%3A10Z'
        // Auger walks in from Bathroom, goes out window
        , c540281: 'https://medianighttrap.blob.core.windows.net/asset-cc27435d-1500-80c4-4857-f1e52dbb63bb/00540281.mp4?sv=2012-02-12&sr=c&si=03a79dc6-4c0d-4186-9dce-098169bdd7b4&sig=pD9i1bhqXxS1pz8FEEjSNUBaplZ0qyVkyiawxCTQhkg%3D&st=2015-07-19T02%3A18%3A20Z&se=2115-06-25T02%3A18%3A20Z'
    };

    

    /* 9 - Bathroom */
    var camBathroom = {
        // Sarah enters bathroom from bedroom. Enters mirror
          c180291: 'https://medianighttrap.blob.core.windows.net/asset-e41e435d-1500-80c4-0846-f1e52dbb48b2/00500293.mp4?sv=2012-02-12&sr=c&si=807448ef-06c8-4fff-9434-6e145fe88a74&sig=QJfnf48nuV92TkT%2FNaeKbLZs7pdqEJa%2FmCnN41df5Gw%3D&st=2015-07-19T02%3A17%3A54Z&se=2115-06-25T02%3A17%3A54Z'
        // 2 Augers enter bathroom from bedroom, 1 catchable
        , c352291: 'https://medianighttrap.blob.core.windows.net/asset-e41e435d-1500-80c4-b046-f1e52dbb36bb/00352291.mp4?sv=2012-02-12&sr=c&si=ebc60e48-09c2-4a7a-ab9d-8d6cdc9bb786&sig=6cKz6CmiQaEsixTOEjHazYs5UIShcwepnlCRNwF9TSM%3D&st=2015-07-19T02%3A20%3A09Z&se=2115-06-25T02%3A20%3A09Z'
        // TRAP: 1 Auger is caught, other walks into mirror
        , c0430249b: 'https://medianighttrap.blob.core.windows.net/asset-ec25435d-1500-80c4-5431-f1e52dbb36ff/0430249b.mp4?sv=2012-02-12&sr=c&si=400c9e22-430a-4b09-9c90-edbf8304c93b&sig=fK39NVXPiXqEGshg7Mgnyx6IoGeJKyjL8YCVMVU63mw%3D&st=2015-07-19T02%3A19%3A55Z&se=2115-06-25T02%3A19%3A55Z'
        // TRAP: Auger caught on scale trap
        , c431292: 'https://medianighttrap.blob.core.windows.net/asset-cc27435d-1500-80c4-c4a6-f1e52dbb33e8/00431292.mp4?sv=2012-02-12&sr=c&si=b137f9b5-ccb6-41b2-8699-d11d51ed540b&sig=MDdl4kR9kZrHofh2HbMQ0erVyc3ZeuacLwGjpLTAIQ4%3D&st=2015-07-19T02%3A19%3A43Z&se=2115-06-25T02%3A19%3A43Z'
        // Auger walks in from Hall-2, walks toward bedroom
        , c480291: 'https://medianighttrap.blob.core.windows.net/asset-cc27435d-1500-80c4-46ef-f1e52dbb45d5/00480291.mp4?sv=2012-02-12&sr=c&si=1415e871-43a6-4e08-b6e7-4bae341b5ba6&sig=VmvgBYD3zd6JdbZSP%2FHQJKmMRm8rKWE8ho7pKCifH6I%3D&st=2015-07-19T02%3A17%3A48Z&se=2115-06-25T02%3A17%3A48Z'
        // TRAP: Auger caught in floor trap
        , c500291: ''

    };

    /* Azure hosted MP4s -- Just used for temp prototype */
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
        // Intro
        , 'https://medianighttrap.blob.core.windows.net/asset-e41e435d-1500-80c4-3ded-f1e52e2c2261/00000011-Intro.mp4?sv=2012-02-12&sr=c&si=0bf72883-4a5b-475e-be0f-bbe6ed7cbd3e&sig=2K7QFWy7Xrtpk4mUzv3ff87p5cu29sYomDDLyROWG6U%3D&st=2015-07-19T15%3A37%3A19Z&se=2115-06-25T15%3A37%3A19Z'
    ];

    /**
     * Wires up event handlers for buttons.
     * Sets src property for video player and sets reference to audio tag
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

        initializeAudio();
        initializeVideoStream();       
    };


    /**
     * Check if browser supports audio -- if not, tell user to update
     */
    var initializeAudio = function () {
        audio = document.getElementById('audio-tag');
        if (!Modernizr.audio) {
            window.location = "http://outdatedbrowser.com/en";
        }
    }


    /**
      * Check if browser supports audio -- if not, tell user to update
      * Loads video as soon as page loads for Video.js player
      */
    var initializeVideoStream = function () {
        video = videojs('video-player');
        if (!Modernizr.video) {
            window.location = "http://outdatedbrowser.com/en";
        }
        if (bDebug) {
            video.src([{ type: 'video/mp4', src: aTempLocal[0] }]);
            video.load();
        } else {
            video.src([{ type: 'video/mp4', src: aMP4CamList[8] }]);
            video.load();
        }
    };

    /**
     * Pulls url from Azure 
     * Get current timestamp for video
     * Set the current stream to the ID ofs the button passed in
     * Set current video time
     * @returns New video stream 
     */
    var changeVideoStream = function () {
        nCurrentTime = video.currentTime();

        if (bDebug) {
            switch (this.id) {
                case 'Hall-1':
                    urlMediaStream = aTempLocal[1];
                    console.log("1 - Augs")
                    break;
                case 'Kitchen':
                    urlMediaStream = aTempLocal[2];
                    console.log("2 - trap")
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
     * TODO: SHOULD I DISABLE AUDIO IF VIDEO IS PLAYING?
     * hasPlayed variable prevents the footage from looping.
     * Second 'ended' event draws poster to screen when 2nd clip has completed
     * @param {string} trapUrl   Clip with the trap sequence.
     * @param {string} [nexturl] Trap clips are often have a clip that appears next.
     * @param {string} [still]   Image source to set after clips have completed   
     */
    var triggerTrap = function (trapUrl, nextUrl, still) {
        audio.pause();
        playVideo(trapUrl);

        var hasPlayed = false;
        video.on('ended', function () { 
            if (hasPlayed === false) {
                playVideo(nextUrl);
            }

            hasPlayed = true;
            video.on('ended', function () {
                video.src(video.src);
                video.poster(still);
                playAudio(aAudioClips.crickets);
            })
        })
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
     * Video to play.
     * @param {url} clipUrl - Address of clip to play.
     */
    var playVideo = function (urlClip) {
        video.src(urlClip);
        video.play();
    };


    init();

})();