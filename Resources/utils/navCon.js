var NavCon = function() {
    this.stack = [];
};

NavCon.prototype.open = function(windowToOpen, openProperties) {
    if ( typeof (openProperties) === 'undefined') {
        openProperties = {};
    }

    //add the window to the stack
    this.stack.push(windowToOpen);

    //decorate the window with the navCon remove on it's on 'close'
    var that = this;
    windowToOpen.addEventListener('close', function() {
        that.stack.pop();
    });

    //the infamous android hack to make the window "heavyweight"
    windowToOpen.navBarHidden = windowToOpen.navBarHidden || false;

    //if its numero uno, just return it quickly
    if (this.stack.length === 1) {
        if (Ti.Platform.osname === 'android') {
            windowToOpen.exitOnClose = true;
            windowToOpen.open(openProperties);
        } else {
            this.navGroup = Ti.UI.iPhone.createNavigationGroup({
                window : this.stack[this.stack.length - 1]
            });
            var containerWindow = Ti.UI.createWindow({
                navBarHidden : true
            });
            containerWindow.add(this.navGroup);
            containerWindow.open(openProperties);
        }
    }
    //all others
    else {
        if (Ti.Platform.osname === 'android') {
            windowToOpen.open(openProperties);
        } else {
            this.navGroup.open(this.stack[this.stack.length - 1], openProperties);
        }
    }
};

NavCon.prototype.close = function(win, closeProperties) {
    if ( typeof (closeProperties) === 'undefined') {
        closeProperties = {};
    }
    if (this.navGroup) {
        this.navGroup.close(win, closeProperties);
    } else {
        win.close(closeProperties);
    }
};

NavCon.prototype.destroy = function() {
    var windows = this.stack.concat([]);
    for (var i = 0, l = windows.length; i < l; i++) {
        (this.navGroup) ? this.navGroup.close(windows[i]) : windows[i].close();
    }
    this.stack = [];
    //reset stack

    if (this.navGroup) {
        this.navGroup.close();
    }
};

NavCon.prototype.home = function() {
    //store a copy of all the current windows on the stack
    var windows = this.stack.concat([]);
    for (var i = 1, l = windows.length; i < l; i++) {
        (this.navGroup) ? this.navGroup.close(windows[i]) : windows[i].close();
    }
};

module.exports = NavCon;
