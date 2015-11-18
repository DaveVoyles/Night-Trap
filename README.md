# Night Trap
### Author(s): Dave Voyles | [@DaveVoyles](http://www.twitter.com/DaveVoyles)
### URL: [www.DaveVoyles.com][1]

A browser port of the Sega CD classic from Digital Pictures 
----------
### About

## [You can play / view the Alpha here. May not always work.](http://nighttrapalpha.azurewebsites.net/)

[Join the discussion on Reddit](https://www.reddit.com/r/gamedev/comments/3d9m9x/i_ported_night_trap_to_the_browser_today/)

[Follow along with the development diary](http://www.davevoyles.com/deconstructing-night-trap/)

![] (http://s.emuparadise.org/Sega%20CD/Box%20Scans/Night%20Trap%20(32X)%20(U)%20(Front).jpg)

I spent about 45 minutes bringing this over to the browser today. The code is all done in JavaScript, and I'm using the open source [Video.JS player](http://www.videojs.com/) to display the video on most devices (mobile included). 

The video is streaming from [Azure Media Services](http://www.davevoyles.com/?s=azure+media+services). I'd suggest giving it a minute to load before advancing the screen. 

There's obviously still a lot of work to go. Special thanks to Phil Cobley in the [Night Trap](https://www.facebook.com/groups/NightTrap/) Facebook group for chopping up the footage!

[This YouTube video](https://www.youtube.com/watch?v=Invzbp5QQVs) has all of the clips playing simultaneously, so that you can get a better idea of what the process if like for piecing this game together. Paul Jenson, the creator of the SCAT tool I used to rip the video from the disc, put this together.

----------
### To do:

- Add interactivity to catch augers
- Create a UI
- Chop up the clips to create branching paths (ex: caught / missed an aug)
- Add the color coordinated password system
- Pause Screen
- Get raw footage, to prevent that *click* noise from going off every time you miss an auger
- Get multiple video feeds to buffer as soon as the page loads. Allows for quicker camera changes.

----------

##Change Log
###v1.0.0
Initial build of the app


  [1]: http://www.daveVoyles.com "My website"
