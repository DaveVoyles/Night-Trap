'use strict';

    /**
     * Constructor obj to get / set current values for the each room.
     * @param {string} sRoom              - Name of the room.
     * @param {string} stillUrl           - Background image when room is empty.
     * @param {bool}   bCanCatch          - Is there a character who can be captured in the scene?
     * @param {number} time               - Current time stamp when curUrl is being set.
     * @param {number} catchTime          - When can the user catch an auger?
     * @param {sting}  curUrl             - Url should be set as video.src() right now.
     * @param {string} nextUrl            - NextUrl to be set as video.src() when curUrl finishes.
     * @param {string} trapUrl            - If a character can be trapped in the scene, have it trigger this Url.
     * @param {bool}   bTrapSprung        - Has the user set the trap in this current scene yet?
     * @param {number} nPotentialCaptured - How many augers can be caught in the current scene?
     * @returns                           - Room 
     */
    var Room = {
        _sRoomName         : ''   ,
        _stillUrl          : ''   ,
        _bCanCatch         : false,
        _urlChangeTime     : 0    ,
        _catchTime         : 0    ,
        _curUrl            : ''   ,
        _nextUrl           : ''   ,
        _trapUrl           : ''   ,
        _bTrapSprung       : false,
        _nPotentialCaptured: 0    ,
        _hasPlayed         : false,

        init: function(roomName, stillUrl) {
            this._sRoomName  = roomName;
            this._stillUrl   = stillUrl;
        }

    };

    Object.defineProperty(Room, 'sRoomName', {
        get: function() {
            return this._sRoomName;
        },
        set: function (val) {
            this._sRoomName = val;
        }
    });
    Object.defineProperty(Room, 'stillUrl', {
        get: function() {
            return this._stillUrl;
        },
        set: function(val) {
            this._stillUrl = val;
        }
    });
    Object.defineProperty(Room, 'urlChangeTime', {
        get: function() {
            return this._urlChangeTime;
        },
        set: function(val) {
            this._urlChangeTime = val;
        }
    });
    Object.defineProperty(Room, 'bCanCatch', {
        get: function() {
            return this._bCanCatch;
        },
        set: function(val) {
            this._bCanCatch = val;
        }
    });
    Object.defineProperty(Room, 'catchTime', {
        get: function() {
            return this._catchTime;
        },
        set: function(val) {
            this._catchTime = val;
        }
    });
    Object.defineProperty(Room, 'curUrl', {
        get: function() {
            return this._curUrl;
        },
        set: function(val) {
            this._curUrl = val;
        }
    });
    Object.defineProperty(Room, 'nextUrl', {
        get: function() {
            return this._nextUrl;
        },
        set: function(val) {
            this._nextUrl = val;
        }
    });
    Object.defineProperty(Room, 'trapUrl', {
        get: function() {
            return this._trapUrl;
        },
        set: function(val) {
            this._trapUrl = val;
        }
    });
    Object.defineProperty(Room, 'bTrapSprung', {
        get: function() {
            return this._bTrapSprung;
        },
        set: function(val) {
            this._bTrapSprung = val;
        }
    });
    Object.defineProperty(Room, 'nPotentialCaptured', {
        get: function() {
            return this._nPotentialCaptured;
        },
        set: function(val) {
            this._nPotentialCaptured = val;
        }
    });
    Object.defineProperty(Room, 'hasPlayed', {
        get: function() {
            return this._hasPlayed;
        },
        set: function(val) {
            this._hasPlayed = val;
        }
    });

    var hallOne             = Object.create(Room                    );
        hallOne.init   ('hallOne', 'img/stills/HALL-ONE_1.JPG'      );

    var kitchen             = Object.create(Room                    );
        kitchen.init   ('kitchen', 'img/stills/KITCHEN_1.JPG'       );

    var entryway            = Object.create(Room                    );
        entryway.init  ('entryway', 'img/stills/ENTRY-WAY_1.jpg'    );

    var livingroom          = Object.create(Room                    );
        livingroom.init('livingroom', 'img/stills/LIVING-ROOM_1.jpg');

    var bathroom            = Object.create(Room                    );
        bathroom.init  ('bathroom', 'img/stills/BATHROOM_1.jpg'     );

    var bedroom             = Object.create(Room                    );
        bedroom.init   ('bedroom', 'img/stills/BEDROOM_1.jpg'       );

    var hallTwo             = Object.create(Room                    );
        hallTwo.init   ('hallTwo', 'img/stills/HALL-TWO_1.jpg'      );

    var driveway            = Object.create(Room                    );
        driveway.init  ('driveway', 'img/stills/DRIVEWAY_1.jpg'     );


/**
    * Obj to get / set current values for the game.
    * @property {string} cam                - Room the user has currently selected
    * @property {string} stillUrl           - Background image when room is empty.
    * @property {bool}   bCanCatch          - Is there a character who can be captured in the scene?
    * @property {number} _urlChangeTime      - Time into the game should curUrl should be set.
    * @property {number} time               - Current time stamp when curUrl is being set.
    * @property {number} catchTime          - When can the user catch an auger?
    * @property {sting}  curUrl             - Url should be set as video.src() right now.
    * @property {string} nextUrl            - NextUrl to be set as video.src() when curUrl finishes.
    * @property {string} trapUrl            - If a character can be trapped in the scene, have it trigger this Url.
    * @property {bool}   bTrapSpring        - Has the user set the trap in this current scene yet?
    * @property {bool}   bJustSwitched      - Has the currentUrl switched since the user selected this room?
    * @property {number} nPotentialCaptured - Number of augers that could have been captured in this scene
    */
    var Current = function Current() {

        //var cam = {
        //    camHallOne   : 'hallOne'   ,
        //    camKitchen   : 'kitchen'   ,
        //    camEntryway  : 'entryway'  ,
        //    camLivingRoom: 'livingroom',
        //    camBathroom  : 'bathroom'  ,
        //    camBedroom   : 'bedroom'   ,
        //    camHallTwo   : 'hallTwo'   ,
        //    camDriveway  : 'driveway'
        //};
        var cam = {
            camHallOne   : hallOne   ,
            camKitchen   : kitchen   ,
            camEntryway  : entryway  ,
            camLivingRoom: livingroom,
            camBathroom  : bathroom  ,
            camBedroom   : bedroom   ,
            camHallTwo   : hallTwo   ,
            camDriveway  : driveway
        };
         var camAsString        = ''   ;
         var stillUrl           = ''   ;
         var bCanCatch          = true ;
         var urlChangeTime      = 0    ;
         var catchTime          = 0    ;
         var time               = 0    ;
         var curUrl             = ''   ;
         var nextUrl            = ''   ;
         var trapUrl            = ''   ;
         var bTrapSprung        = true ;
         var bJustSwitched      = false;
         var nPotentialCaptured = 0    ;
         var hasPlayed          = false;

        var currentPrototype = {
            getCam: function() {
                return this.cam;
            },
            setCam: function(val) {
                this.cam = val;
            },
            getCanCatch: function() {
                return this.bCanCatch;
            },
            setCanCatch: function(val) {
                this.bCanCatch = val;
            },
            getUrlChangeTime: function() {
                return this._urlChangeTime;
            },
            setUrlChangeTime: function(val) {
                this._urlChangeTime = val;
            },
            getCatchTime: function() {
                return this.catchTime;
            },
            setCatchTime: function(val) {
                this.catchTime = val;
            },
            getTime: function() {
                return this.time;
            },
            setTime: function(val) {
                this.time = val;
            },
            getCurUrl: function() {
                return this.curUrl;
            },
            setCurUrl: function(val) {
                this.curUrl = val;
            },
            getNextUrl: function() {
                return this.nextUrl;
            },
            setNextUrl: function(val) {
                this.nextUrl = val;
            },
            getStillUrl: function() {
                return this.stillUrl;
            },
            setStillUrl: function(val) {
                this.stillUrl = val;
            },
            getTrapUrl: function() {
                return this.trapUrl;
            },
            setTrapUrl: function(val) {
                this.trapUrl = val;
            },
            getTrapSprung: function() {
                return this.bTrapSprung;
            },
            setTrapSprung: function(val) {
                this.bTrapSprung = val;
            },
            getJustSwitched: function() {
                return this.bJustSwitched;
            },
            setJustSwitched: function(val) {
                this.bJustSwitched = val;
            },
            getPotentialCaptured: function() {
                return this.nPotentialCaptured;
            },
            setPotentialCaptured: function(val) {
                this.nPotentialCaptured = val;
            },
            getHasPlayed: function() {
                return this.hasPlayed;
            },
            setHasPlayed: function(val) {
                this.hasPlayed = val;
            },
            getCamAsString: function () {
                return this.camAsString;               
            },
            setCamAsString: function (val) {
                switch (val) {
                    case hallOne:
                        this.camAsString = 'hallOne'   ;
                    case kitchen:
                        this.camAsString = 'kitchen'   ;
                    case entryway:
                        this.camAsString = 'entryway'  ;
                    case livingroom:
                        this.camAsString = 'livingroom';
                    case bathroom:
                        this.camAsString = 'bathroom'  ;
                    case bedroom:
                        this.camAsString = 'bathroom'  ;
                    case hallTwo:
                        this.camAsString = 'hallTwo'   ;
                    case driveway:
                        this.camAsString = 'driveway'  ;
                }
            }
        }
        return currentPrototype;
    };

var current = new Current();

