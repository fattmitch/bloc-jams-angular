(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};
        
        /**
        * @desc Buzz ojbect audio file
        * @type {Ojbect} song
        */
        
        var currentBuzzObject = null;
        
        /**
        * @function setSong
        * @desc Stop currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        
        var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong(song);
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            SongPlayer.currentSong = song;
        };
        
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
        * @function stopSong
        * @desc stops the current song
        * @param {Object} song
        */
        
        var stopSong = function(song) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        };
        
        /**
        * @function getSongIndex
        * @desc Gets the index of the current song.
        * param {Ojbect} song
        * returns {number}
        */
        
        var getSongIndex = function(song){
            return SongPlayer.currentAlbum.songs.indexOf(song);
        };
           
        /**
        * @desc Stores the current album information into currentAlbum
        * @type {Object}
        */
        
        SongPlayer.currentAlbum = Fixtures.getAlbum();
        
        /**
        * @desc current song is defined
        * @type {Ojbect}
        */
        
        SongPlayer.currentSong = null;
        
        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {number}
        */
        
        SongPlayer.currentTime = null;
        
        /** 
        * @function play
        * @desc If no song is playing, play song, if a song is playing, pause that song, and play the new one.
        * @param {object} song
        */
        
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);            
                playSong(song);
                
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song)
                }
            }
        };
        
        /** 
        * @method SongPlayer.pause
        * @desc set current song playing to pause.
        * @param {object} song
        */
        
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /**
        * @function previous
        * @desc skips to the previous song
        * @returns {number}
        */
        
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                stopSong(song);
            } else {
                var song = SongPlayer.currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /**
        * @function next
        * @desc skips to the next song
        * @returns {number}
        */
        
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex > SongPlayer.currentAlbum.songs.length) {
                stopSong(song);
            } else {
                var song = SongPlayer.currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {number} time
        */
        
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();