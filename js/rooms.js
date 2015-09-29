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
     * @returns                           - roomPrototype
     */
    var Room = function(sRoom, stillUrl, bCanCatch, time, catchTime, curUrl, nextUrl, trapUrl, bTrapSprung, nPotentialCaptured) {
        this._sRoomName          = sRoom              || ''   ;
        this._stillurl           = stillUrl           || ''   ;
        this._bCanCatch          = bCanCatch          || false;
        this._time               = time               || 0    ;
        this._catchTime          = catchTime          || 0    ;
        this._curUrl             = curUrl             || ''   ;
        this._nextUrl            = nextUrl            || ''   ;
        this._trapUrl            = trapUrl            || ''   ;
        this._bTrapSprung        = bTrapSprung        || false;
        this._nPotentialCaptured = nPotentialCaptured || 0    ;

        this.roomPrototype = {
            getRoomName: function() {
                return this._sRoomName;
            },
            setRoomName: function(val) {
                this._sRoomName = val;
            },

            getStillUrl: function() {
                return this._stillurl;
            },
            setStillUrl: function() {
                this._stillurl = stillUrl;
            },

            getCanCatch: function() {
                return this._bCanCatch;
            },
            setCanCatch: function(val) {
                this._bCanCatch = val;
            },

            getTime: function() {
                return this._time;
            },
            setTime: function(val) {
                this._time = val;
            },

            getCatchTime: function() {
                return this._catchTime;
            },
            setCatchTime: function(val) {
               this._catchTime = val;
            },

            getCurUrl: function() {
                return this._curUrl;
            },
            setCurUrl: function(val) {
                this._curUrl = val;
            },
            getNextUrl: function() {
                return this._nextUrl;
            },
            setNextUrl: function(val) {
                this._nextUrl = val;
            },

            getTrapUrl: function() {
                return this._trapUrl;
            },
            setTrapUrl: function(val) {
                this._trapUrl = val;
            },

            getTrapSprung: function() {
                return this._bTrapSprung;
            },
            setTrapSprung: function(val) {
               this.bTrapSprung = val;
            },

            getPotentialCaptured: function() {
                return this._nPotentialCaptured;
            },
            setPotentialCaptured: function(val) {
                this._nPotentialCaptured = val;
            }
        };
        return this.roomPrototype;
    };

    var hallOne    = new Room('hallOne'   , 'img/stills/HALL-ONE_1.JPG'   );
    var kitchen    = new Room('kitchen'   , 'img/stills/KITCHEN_1.JPG'    );
    var entryway   = new Room('entryway'  , 'img/stills/ENTRY-WAY_1.jpg'  );
    var livingroom = new Room('livingroom', 'img/stills/LIVING-ROOM_1.jpg');
    var bathroom   = new Room('bathroom'  , 'img/stills/BATHROOM_1.jpg'   );
    var bedroom    = new Room('bedroom'   , 'img/stills/BEDROOM_1.jpg'    );
    var hallTwo    = new Room('hallTwo'   , 'img/stills/HALL-TWO_1.jpg'   );
    var driveway   = new Room('driveway'  , 'img/stills/DRIVEWAY_1.jpg'   );

  
    /**
    * Obj to get / set current values for the game.
    * @property {string} cam                - Room the user has currently selected
    * @property {string} stillUrl           - Background image when room is empty.
    * @property {bool}   bCanCatch          - Is there a character who can be captured in the scene?
    * @property {number} urlChangeTime      - Time into the game should curUrl should be set.
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

        this.cam = {
            camHallOne    : 'hallOne'   ,
            camKitchen    : 'kitchen'   ,
            camEntryway   : 'entryway'  ,
            camLivingRoom : 'livingroom',
            camBathroom   : 'bathroom'  ,
            camBedroom    : 'bedroom'   ,
            camHallTwo    : 'hallTwo'   ,
            camDriveway   : 'driveway'  ,
        };
        this.stillUrl           = ''  ;
        this.bCanCatch          = true;
        this.urlChangeTime      = 0   ;
        this.catchTime          = 0   ;
        this.curUrl             = ''  ;
        this.nextUrl            = ''  ;
        this.trapUrl            = ''  ;
        this.bTrapSprung        = true;
        this.nPotentialCaptured = 0   ;

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
                return this.urlChangeTime;
            },
            setUrlChangeTime: function(val) {
                this.urlChangeTime = val;
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
            }
        }
        return currentPrototype;
    };
    
    var current = new Current();