var platform = {};

//the root os name
platform.device = Ti.Platform.osname;

//apis
platform.apiGoneWild = 'http://sauceapi.rslvr.net/api/v1/all';

//some ui sizes based on the device
platform.height = Ti.Platform.displayCaps.platformHeight;
platform.width = Ti.Platform.displayCaps.platformWidth;

//the current language selection
platform.locale = Ti.Locale.currentLanguage;

module.exports = platform;
