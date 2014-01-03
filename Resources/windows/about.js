var platform = require('/utils/platform');
var _ = require('/utils/underscore');

exports.welcomeWindow = function(nav) {
    var win = Ti.UI.createWindow({
        navBarHidden : true,
        fullscreen : true,
        backgroundColor : '#033649',
        orientationModes : [Ti.UI.PORTRAIT]
    });

    var topBar = require('/views/bars').welcomeBar(win, nav);

    win.add(topBar);

    return win;
};
