var API_GALLERY = require('/utils/imageApi');
var platform = require('/utils/platform');
var _ = require('/utils/underscore');

//for the pull updates
function formatDate() {
    var d = new Date;
    var datestr = d.getMonth() + '/' + d.getDate() + '/' + d.getFullYear();
    if (d.getHours() >= 12) {
        datestr += ' ' + (d.getHours() == 12 ? d.getHours() : d.getHours() - 12) + ':' + d.getMinutes() + ' PM';
    } else {
        datestr += ' ' + d.getHours() + ':' + d.getMinutes() + ' AM';
    }
    return datestr;
};

exports.gridCreator = function(p) {
    var galleryGridWindow = p.w;
    var nav = p.n;

    setThumbnails = function(imagesArray) {
        var imageGallery = createGallery({
            photos : imagesArray,
            nav : nav,
            win : galleryGridWindow
        });

        galleryGridWindow.add(imageGallery);
    };
    function fetchPhotos() {
        API_GALLERY.fetchGoneWild({
            callback : setThumbnails,
            page : 1,
            count : 10
        });
    }

    fetchPhotos();
};

exports.gridReload = function(p) {
    var win = p.w;
    var nav = p.n;

    _.each(win.children, function(e) {
        if (e.isTableView || e.isTopButton) {
            win.remove(e);
            e = null;
        };
    });

    setThumbnails = function(imagesArray) {
        var imageGallery = createGallery({
            photos : imagesArray,
            nav : nav,
            win : win
        });

        win.add(imageGallery);
    };

    function fetchPhotos() {
        API_GALLERY.fetchGoneWild({
            callback : setThumbnails,
            page : 1
        });
    };

    fetchPhotos();
};

createGallery = function(param) {
    var data = param.photos;
    var nav = param.nav;
    var win = param.win;

    var scrollView = Ti.UI.createScrollView({
        height : platform.height * 0.91,
        width : platform.width,
        bottom : 0,
        contentHeight : 'auto',
        layout : 'vertical'
    });

    _.each(data.slice(0, 10), function(pic) {
        var thumb = Ti.UI.createImageView({
            top : 10,
            image : pic.url,
            width : platform.width - 20,
            borderWidth : 5,
            borderColor : 'white'
        });

        scrollView.add(thumb);
    });

    var loadMore = Ti.UI.createView({
        width : platform.width - 20,
        top : 10,
        backgroundColor : '#031634',
        backgroundSelectedColor : '#415d88'
    });

    loadMore.addEventListener('click', function() {
        scrollView.remove(loadMore);
        _.each(data.slice(11, 22), function(pic) {
            var thumb = Ti.UI.createImageView({
                top : 10,
                image : pic.url,
                width : platform.width - 20,
                borderWidth : 5,
                borderColor : 'white'
            });

            scrollView.add(thumb);
        });
    });
    
    scrollView.add(loadMore);

    return scrollView;

};
