var platform = require('/utils/platform');

exports.welcomeBar = function(win, nav) {
    var barBack = Ti.UI.createView({
        width : platform.width + 4,
        height : platform.height * 0.09,
        backgroundColor : '#031634',
        top : 0,
        zIndex : 250
    });

    var bar = Ti.UI.createView({
        width : platform.width + 4,
        height : platform.height * 0.07,
        backgroundColor : '#036564',
        top : 0,
        zIndex : 300
    });

    barBack.add(bar);

    return barBack;
};

exports.galleryBar = function(win, nav) {
    var barBack = Ti.UI.createView({
        width : platform.width + 4,
        height : platform.height * 0.09,
        backgroundColor : '#031634',
        top : 0,
        zIndex : 250
    });

    var bar = Ti.UI.createView({
        width : platform.width + 4,
        height : platform.height * 0.07,
        backgroundColor : '#036564',
        top : 0,
        zIndex : 300
    });

    barBack.add(bar);

    return barBack;
}; 