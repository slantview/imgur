Ti.UI.backgroundColor = '#033649';

//navigation setup
var navCon = require('/utils/navCon');
var nav = new navCon();

//if(Ti.App.Properties.getBool('firstOpen', true)){
if(false){
    Ti.App.Properties.setBool('firstOpen', false);
    nav.open(require('/windows/about').welcomeWindow(nav));
}else{
    nav.open(require('/windows/main').galleryWindow(nav));
};