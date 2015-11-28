
    // App cache validation
    var appCache = window.applicationCache;

    if (appCache === null || undefined) {
        console.log("App cache does not exist");
    }

    appCache.addEventListener('checking', function(event) {
        console.log("Checking for updates.");
    }, false);

    appCache.addEventListener('error', function(event) {
        if (navigator.onLine === true) { //If the user is connected to the internet.
            //alert("Error - Please contact the website administrator if this problem consists.");
            console.log("Error - Please contact the website administrator if this problem consists. " + event.type);
        } else {
            //alert("You aren't connected to the internet. Some things might not be available.");
            console.log("You aren't connected to the internet. Some things might not be available.");
        }
    }, false);

    appCache.addEventListener('downloading', function(event) {
        console.log("Started Download.");
    }, false);


    appCache.addEventListener('progress', function(event) {
        console.log(event.loaded + " of " + event.total + " downloaded.");
    }, false);

    appCache.addEventListener('cached', function(event) {
        console.log("Cached assets -- Done.");
    }, false);

    appCache.addEventListener('updateready', function() {
        console.log("New resources are available for download -- update ready");
    }, false );

    appCache.addEventListener('obsolete', function(event) {
        console.log("Obsolete - no resources are cached, and previous cache(s) are now deleted.");
    }, false);