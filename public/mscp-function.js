// Data for songs
        const songs = [
            {
                title: "Serene Morning",
                artist: "Ambient Explorers",
                src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
                albumArt: "https://placehold.co/144x144/aab8c2/4A90E2?text=Track+A"
            },
            {
                title: "Digital Horizon",
                artist: "Synthwave Dreams",
                src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
                albumArt: "https://placehold.co/144x144/cad2da/4A90E2?text=Track+B"
            },
            {
                title: "Urban Echoes",
                artist: "City Soundscapes",
                src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
                albumArt: "https://placehold.co/144x144/e0e5ec/4A90E2?text=Track+C"
            },
            {
                title: "Whispering Pines",
                artist: "Nature Melodies",
                src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
                albumArt: "https://placehold.co/144x144/aab8c2/4A90E2?text=Track+D"
            },
            {
                title: "Cosmic Journey",
                artist: "Stellar Sounds",
                src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
                albumArt: "https://placehold.co/144x144/cad2da/4A90E2?text=Track+E"
            },
            {
                title: "Rainy Day Comfort",
                artist: "Cozy Rhythms",
                src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
                albumArt: "https://placehold.co/144x144/e0e5ec/4A90E2?text=Track+F"
            },
            {
                title: "Sunset Chaser",
                artist: "Evening Vibes",
                src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
                albumArt: "https://placehold.co/144x144/aab8c2/4A90E2?text=Track+G"
            }
        ];

        // Get DOM elements
        const audioPlayer = document.getElementById('audio-player');
        const playPauseBtn = document.getElementById('play-pause-btn');
        const playPauseIcon = document.getElementById('play-pause-icon');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const songTitle = document.getElementById('song-title');
        const songArtist = document.getElementById('song-artist');
        const albumArt = document.getElementById('album-art');
        const progressBar = document.getElementById('progress-bar');
        const currentTimeSpan = document.getElementById('current-time');
        const totalDurationSpan = document.getElementById('total-duration');

        let currentSongIndex = 0;
        let isPlaying = false;

        // Function to load a song
        function loadSong(index) {
            const song = songs[index];
            audioPlayer.src = song.src;
            songTitle.textContent = song.title;
            songArtist.textContent = song.artist;
            albumArt.src = song.albumArt;
            // Reset progress bar
            progressBar.value = 0;
            currentTimeSpan.textContent = '0:00';
            totalDurationSpan.textContent = '0:00';
        }

        // Function to play song
        function playSong() {
            isPlaying = true;
            audioPlayer.play();
            playPauseIcon.classList.remove('fa-play');
            playPauseIcon.classList.add('fa-pause');
        }

        // Function to pause song
        function pauseSong() {
            isPlaying = false;
            audioPlayer.pause();
            playPauseIcon.classList.remove('fa-pause');
            playPauseIcon.classList.add('fa-play');
        }

        // Event listener for play/pause button
        playPauseBtn.addEventListener('click', () => {
            if (isPlaying) {
                pauseSong();
            } else {
                playSong();
            }
        });

        // Event listener for next button
        nextBtn.addEventListener('click', () => {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
            loadSong(currentSongIndex);
            playSong();
        });

        // Event listener for previous button
        prevBtn.addEventListener('click', () => {
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
            loadSong(currentSongIndex);
            playSong();
        });

        // Event listener for time update (for progress bar)
        audioPlayer.addEventListener('timeupdate', () => {
            const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            progressBar.value = progress || 0; // Ensure it's not NaN

            // Update current time
            const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
            const currentSeconds = Math.floor(audioPlayer.currentTime % 60).toString().padStart(2, '0');
            currentTimeSpan.textContent = `${currentMinutes}:${currentSeconds}`;
        });

        // Event listener for song loaded (to get total duration)
        audioPlayer.addEventListener('loadedmetadata', () => {
            const totalMinutes = Math.floor(audioPlayer.duration / 60);
            const totalSeconds = Math.floor(audioPlayer.duration % 60).toString().padStart(2, '0');
            totalDurationSpan.textContent = `${totalMinutes}:${totalSeconds}`;
        });

        // Event listener for progress bar change (seek functionality)
        progressBar.addEventListener('input', () => {
            const seekTime = (progressBar.value / 100) * audioPlayer.duration;
            audioPlayer.currentTime = seekTime;
        });

        // Event listener for when a song ends
        audioPlayer.addEventListener('ended', () => {
            nextBtn.click(); // Automatically play the next song
        });

        // Initial load of the first song
        window.onload = () => {
            loadSong(currentSongIndex);
        };