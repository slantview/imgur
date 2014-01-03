var cropper = require('org.selfkleptomaniac.ti.imageasresized');
var API_GALLERY = require('/utils/imageApi');
var platform = require('/utils/platform');
var _ = require('/utils/underscore');
var gallery = require('/utils/gridTable');

exports.galleryWindow = function(nav) {
    var win = Ti.UI.createWindow({
        navBarHidden : true,
        fullscreen : true,
        backgroundColor : '#033649',
        orientationModes : [Ti.UI.PORTRAIT]
    });

    var topBar = require('/views/bars').galleryBar(win, nav);

    win.add(topBar);

    gallery.gridCreator({
        w : win,
        n : nav
    });

    return win;
};
