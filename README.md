# Night Trap
#### Author(s): Dave Voyles | [@DaveVoyles](http://www.twitter.com/DaveVoyles)
#### URL: [www.DaveVoyles.com][1]

A browser port of the Sega CD classic from Digital Pictures 
----------
### About
- [Follow along with the development diary](http://www.davevoyles.com/2015/07/16/deconstructing-night-trap/)

- [The night code base for the Alpha is found here.](https://github.com/DaveVoyles/Night-Trap/tree/alpha) Right now you are looking on the static branch.

- [Join the discussion on Reddit](https://www.reddit.com/r/gamedev/comments/3d9m9x/i_ported_night_trap_to_the_browser_today/)

<img src="http://s.emuparadise.org/Sega%20CD/Box%20Scans/Night%20Trap%20(32X)%20(U)%20(Front).jpg" width="500" height="650">

I ported this from 68k Assembly to JavaScript and built a prototype which ran in the browser. The code is all done in JavaScript, and I'm using the open source [Video.JS player](http://www.videojs.com/) to display the video on most devices (mobile included). 

The video is streaming from [Azure Media Services](http://www.davevoyles.com/?s=azure+media+services). I'd suggest giving it a minute to load before advancing the screen. 

Special thanks to Phil Cobley in the [Night Trap](https://www.facebook.com/groups/NightTrap/) Facebook group for his SCAT tool which allowed me to rip the video footage from the Sega CD disc. 

----------
#### To do:

- Add the color coordinated password system
- Pause Screen
- Get multiple video feeds to buffer as soon as the page loads. Allows for quicker camera changes.

#### Current state:
- Not working. Videos are no longer hosted in Azure.
----------

### Change Log
#### v1.1.0
Code review improvements — bug fixes and cleanup

| # | What Changed | File | Why |
|---|---|---|---|
| 1 | `bCanCatch.get()` returned `this.bCanCatch` (the whole object) instead of `this.bool` | `js/main.js` | Bug: trap-availability check always evaluated as truthy, so traps could never be properly disabled |
| 2 | `case 'Entry-Way'` set `nCurrentCam = aCurrentCam.Kitchen` instead of `aCurrentCam.Entryway` | `js/main.js` | Bug: switching to the Entry-Way camera silently selected the Kitchen feed instead |
| 3 | `sCurStill(aStills.Driveway)` missing `.set()` | `js/main.js` | Bug: calling the object as a function throws a `TypeError` at runtime when the Driveway camera is selected |
| 4 | `sNextUrl = aStills.Bedroom` used direct assignment instead of `.set()` | `js/main.js` | Bug: overwrites the `sNextUrl` wrapper object with a plain string, breaking all subsequent `.get()`/`.set()` calls on it |
| 5 | `video.src(video.src)` in `displayStill()` passes the function itself as its own argument | `js/main.js` | Bug: passing a function reference instead of a URL string causes undefined behaviour; changed to `video.src('')` to clear the source and show the poster |
| 6 | `aStills.HallOne` pointed to `BATHROOM_1.JPG` | `js/main.js` | Bug: Hall-One camera was showing the Bathroom poster; corrected to `HALL-ONE_1.jpg` |
| 7 | `aStills.HallTwo` path used `img/stils/` (missing an `l`) | `js/main.js` | Bug: path typo caused a 404 for the Hall-Two poster image |
| 8 | All `aStills` paths had trailing whitespace and wrong extension case (`.JPG`) | `js/main.js` | Bug: trailing spaces and wrong case caused 404s on case-sensitive servers; corrected to match actual filenames on disk |
| 9 | `aAudioClips.frogs` value had a trailing space (`'sfx/FROG2.mp3 '`) | `js/main.js` | Bug: trailing space caused the audio file request to fail |
| 10 | `aPasswords` values had trailing spaces (e.g. `'Blue  '`) | `js/main.js` | Bug: password comparison would always fail because `'Blue'` !== `'Blue  '` |
| 11 | `var bDebug = true` left debug mode on | `js/main.js` | Debug flag enabled a temporary local video path instead of the real intro clip; set to `false` and removed the now-dead branches |
| 12 | `console.log('events Hall 1')` called on every frame inside `eventsHallOne()` | `js/main.js` | Performance / noise: flooded the browser console at 60 fps; removed |
| 13 | `console.log('eventsBedroom')` called on every frame inside `eventsBedroom()` | `js/main.js` | Same as above |
| 14 | `console.log('trap btn hit')` and `console.log('playing next vid')` in production paths | `js/main.js` | Unnecessary noise in production console; removed |
| 15 | `var minutes` computed in `elapsedTime()` but never used | `js/main.js` | Unused variable adds confusion; removed |
| 16 | `var nCaseTime` set in `eventsHallOne()` and `eventsBedroom()` but never read | `js/main.js` | Unused variable; removed |
| 17 | `var sCurrentRoomUrl` and `aCurrentRoomUrl` declared but never referenced | `js/main.js` | Dead code; removed to reduce clutter |
| 18 | `camMisc.DPWORLDD: ''` empty property with unclear name | `js/main.js` | Dead code / placeholder; removed |
| 19 | `var aTempLocal` temp video array left in after debug use | `js/main.js` | Temporary test data no longer needed once `bDebug` was removed; cleaned up |
| 20 | `timerElem.innerHTML = ...` used to write plain text | `js/main.js` | Security: `textContent` is the correct API for writing plain text and avoids any accidental HTML injection |
| 21 | `createVideoSeries()` declared with 2 parameters but called with 3 (`bCanCatch.get()` as extra arg) | `js/main.js` | The third argument was silently ignored; call site updated to pass only the two declared parameters |
| 22 | Commented-out code scattered throughout (`wireButtonsToEvent`, `//eventsBedroom()`, `//playVideo(...)`, etc.) | `js/main.js` | Dead code reduces readability; removed |
| 23 | `eventsBedroom()` referenced removed `aCurrentRoomUrl.Bedroom` and `aTempLocal` | `js/main.js` | Updated to use the proper `camBedroom` URL constants consistent with the rest of the codebase |
| 24 | `eventsHallOne()` used `aTempLocal` placeholder URLs | `js/main.js` | Replaced with proper `camHallOne` URL constants |
| 25 | JSDoc `@example` had typo `nCurremtCam` | `js/main.js` | Typo corrected to `nCurrentCam` |
| 26 | `initializeVideoStream` doc comment said "audio" instead of "video" | `js/main.js` | Doc copy-paste error corrected |
| 27 | `<title>` was empty | `index.html` | An empty title gives users and search engines no context for the page |
| 28 | `<meta name="description">` content was empty | `index.html` | Missing description; added a brief description of the project |
| 29 | `poster="/img/Night-Trap-32x-front.jpg"` used an absolute path with wrong filename casing | `index.html` | Absolute path fails when served from a subdirectory; lowercase `front` doesn't match the file `Front.jpg` on case-sensitive systems |
| 30 | `<audio id="audio-tag" type="audio/mpeg">` used `type` on the `<audio>` element | `index.html` | `type` is not a valid attribute on `<audio>`; it belongs on a `<source>` child element |
| 31 | BOM character at start of `js/utils.js` | `js/utils.js` | Byte Order Marks can cause parse errors in some toolchains; removed |
| 32 | Comment typos in `js/utils.js` (`rerturns`, `Anim an objet`) | `js/utils.js` | Typos corrected for clarity |

#### v1.0.0
Initial build of the app


  [1]: http://www.daveVoyles.com "My website"
