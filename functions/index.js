const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

exports.iptv = functions.https.onRequest((req, res) => {

    admin.database().ref('/channels')
        .on('value', function (snapshot) {

            var jsonSnap = snapshot.val();
            var playlist = "#EXTM3U\n\n";

            const groupTitle = "#EXTINF:-1 group-title=";

            for (entry in jsonSnap) {
                var channel = groupTitle + '"' + jsonSnap[entry].category + '",' + jsonSnap[entry].title + "\n"
                    + jsonSnap[entry].link + "\n";

                playlist = playlist + channel;
            }

            res.send(playlist);
        });

});
