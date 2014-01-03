var platform = require('/utils/platform');
var _ = require('/utils/underscore');

var fixText = function(t){
    t = t.replace("(F) ", " ");
    t = t.replace("(f) ", " ");
    t = t.replace("[F] ", " ");
    t = t.replace("[f] ", " ");
    t = t.replace(" (F)", " ");
    t = t.replace(" (f)", " ");
    t = t.replace(" [F]", " ");
    t = t.replace(" [f]", " ");
    
    return t;
};

exports.fetchGoneWild = function(args) {
    var pictures = [];

    var xhr = Ti.Network.createHTTPClient({
        onload : function(e) {
            // this.responseText holds the raw text return of the message (used for JSON)
            // this.responseXML holds any returned XML (used for SOAP web services)
            // this.responseData holds any returned binary data
            var jason = JSON.parse(this.responseText);
            Ti.API.info("the Count: " + jason.count);
            Ti.API.info("the JSON: " + jason);
            Ti.API.info("the JSON Gallery: " + jason.images);
            _.each(jason.images, function(p) {
            	var ext = p.link.split('.').pop();
                var photo = new Picture(p.id, fixText(p.title), p.size, p.section, p.datetime, 'http://i.imgur.com/' + p.id + '.' + ext, 'http://i.imgur.com/' + p.id + 'b' + '.' + ext);
                Ti.API.info("Image: " + p.id + " - http://i.imgur.com/" + p.id + '.' + ext);
                pictures.push(photo);
            });
            args.callback(pictures);
        },
        onerror : function(e) {
            Ti.API.debug(e.error);
            alert('Something went wrong with the network: ' + e);
        },
        timeout : 5000
    });

    xhr.open("GET", platform.apiGoneWild + "?page=" + args.page + "&count=" + args.count);
    xhr.send();
};

//picture class
var Picture = function(id, name, size, collection, created, url, thumb) {
    this.id = id;
    this.name = name;
    this.size = size;
    this.collection = collection;
    this.created = created;
    this.url = url;
    this.thumb = thumb;
};