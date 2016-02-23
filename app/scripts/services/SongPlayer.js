(function() {
    function SongPlayer() {
        
        /**
        * @desc defining SongPlayer object
        * @type {Object}
        */
        
        var SongPlayer = {};
        
        /**
        * @desc current song is defined
        * @type {Boolean}
        */
        
        var currentSong = null;
        
        /**
        * @desc Buzz ojbect audio file
        * @type {Ojbect} song
        */
        
        var currentBuzzObject = null;
        
        /**
        * @function playSong
        * @desc Sets currentBuzzObject to play and song.playing to true
        * @param {Object} song
        */
        
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };
        
        /**
        * @function setSong
        * @desc Stop currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentSong = song;
        };
        
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);            
                playSong(song);
                
            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song)
                }
            }
        };
        
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();