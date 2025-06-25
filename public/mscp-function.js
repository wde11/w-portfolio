const audio = new Audio();
        let currentSongIndex = 0;
        let isPlaying = false;

        // Sample playlist (replace with your actual audio file paths and info)
        const playlist = [
            {
                title: "Can't Decide",
                artist: "wurai",
                src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
                albumArt: "https://placehold.co/180x180/63b3ed/ffffff?text=Song+1"
            },
            {
                title: "She Want It More",
                artist: "wurai",
                src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
                albumArt: "https://placehold.co/180x180/48bb78/ffffff?text=Song+2"
            },
            {
                title: "Rhythmic Journey",
                artist: "Artist Three",
                src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
                albumArt: "https://placehold.co/180x180/fc8181/ffffff?text=Song+3"
            },
            {
                title: "Echoes of Silence",
                artist: "Artist Four",
                src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
                albumArt: "https://placehold.co/180x180/a0aec0/ffffff?text=Song+4"
            },
            {
                title: "Midnight Serenade",
                artist: "Artist Five",
                src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
                albumArt: "https://placehold.co/180x180/ed8936/ffffff?text=Song+5"
            },
            {
                title: "Starlight Dance",
                artist: "Artist Six",
                src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
                albumArt: "https://placehold.co/180x180/ecc94b/ffffff?text=Song+6"
            }
        ];

        // Get DOM elements
        const openPlayerButton = document.getElementById('open-player-button');
        const musicPlayerModal = document.getElementById('music-player-modal');
        const closePlayerButton = document.getElementById('close-player-button');

        const albumArt = document.getElementById('album-art');
        const songTitle = document.getElementById('song-title');
        const artistName = document.getElementById('artist-name');
        const playPauseButton = document.getElementById('play-pause-button');
        const prevButton = document.getElementById('prev-button');
        const nextButton = document.getElementById('next-button');
        const progressBarContainer = document.getElementById('progress-bar-container');
        const progressBarFill = document.getElementById('progress-bar-fill');
        const currentTimeDisplay = document.getElementById('current-time');
        const durationDisplay = document.getElementById('duration');
        const volumeSlider = document.getElementById('volume-slider');
        const playPauseIcon = playPauseButton.querySelector('i');
        const playlistContainer = document.getElementById('playlist-container');

        /**
         * Loads a song from the playlist based on the index.
         * Updates player info and highlights active song in the list.
         * @param {number} index - The index of the song in the playlist.
         */
        function loadSong(index) {
            currentSongIndex = index;
            const song = playlist[currentSongIndex];
            audio.src = song.src;
            albumArt.src = song.albumArt;
            songTitle.textContent = song.title;
            artistName.textContent = song.artist;
            audio.load(); // Load the audio

            // Update active class in playlist
            updatePlaylistActiveState();

            if (isPlaying) {
                audio.play();
            }
        }

        /**
         * Toggles play/pause state of the audio.
         */
        function togglePlayPause() {
            if (isPlaying) {
                audio.pause();
                playPauseIcon.classList.remove('fa-pause');
                playPauseIcon.classList.add('fa-play');
            } else {
                audio.play();
                playPauseIcon.classList.remove('fa-play');
                playPauseIcon.classList.add('fa-pause');
            }
            isPlaying = !isPlaying;
        }

        /**
         * Plays the next song in the playlist.
         */
        function playNextSong() {
            loadSong((currentSongIndex + 1) % playlist.length);
            if (!isPlaying) {
                togglePlayPause(); // Start playing if it wasn't already
            }
        }

        /**
         * Plays the previous song in the playlist.
         */
        function playPreviousSong() {
            loadSong((currentSongIndex - 1 + playlist.length) % playlist.length);
            if (!isPlaying) {
                togglePlayPause(); // Start playing if it wasn't already
            }
        }

        /**
         * Formats time in seconds to MM:SS format.
         * @param {number} seconds - The time in seconds.
         * @returns {string} Formatted time string.
         */
        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = Math.floor(seconds % 60);
            return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        }

        /**
         * Renders the playlist items into the DOM.
         */
        function renderPlaylist() {
            playlistContainer.innerHTML = ''; // Clear existing playlist
            playlist.forEach((song, index) => {
                const playlistItem = document.createElement('div');
                playlistItem.classList.add('playlist-item');
                playlistItem.dataset.index = index; // Store index for click handling

                // Add active class if it's the current song
                if (index === currentSongIndex) {
                    playlistItem.classList.add('active');
                }

                playlistItem.innerHTML = `
                    <img class="playlist-album-thumb" src="${song.albumArt}" alt="${song.title} album art">
                    <div class="playlist-song-info">
                        <div class="playlist-song-title">${song.title}</div>
                        <div class="playlist-artist-name">${song.artist}</div>
                    </div>
                `;
                playlistItem.addEventListener('click', () => {
                    if (index !== currentSongIndex) { // Only load if a different song is clicked
                        loadSong(index);
                        if (!isPlaying) {
                           togglePlayPause(); // Start playing if it wasn't already
                        }
                    } else if (index === currentSongIndex) {
                        togglePlayPause(); // If current song is clicked, toggle play/pause
                    }
                });
                playlistContainer.appendChild(playlistItem);
            });
        }

        /**
         * Updates the active class on playlist items based on currentSongIndex.
         */
        function updatePlaylistActiveState() {
            document.querySelectorAll('.playlist-item').forEach((item, index) => {
                if (parseInt(item.dataset.index) === currentSongIndex) {
                    item.classList.add('active');
                    // Scroll to active item if it's out of view
                    item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                } else {
                    item.classList.remove('active');
                }
            });
        }

        // Event Listeners for Modal
        openPlayerButton.addEventListener('click', () => {
            musicPlayerModal.classList.add('open');
        });

        closePlayerButton.addEventListener('click', () => {
            musicPlayerModal.classList.remove('open');
        });

        // Close modal if clicked outside modal-content
        musicPlayerModal.addEventListener('click', (e) => {
            if (e.target === musicPlayerModal) {
                musicPlayerModal.classList.remove('open');
            }
        });

        // Event Listeners for Music Player Controls
        playPauseButton.addEventListener('click', togglePlayPause);
        nextButton.addEventListener('click', playNextSong);
        prevButton.addEventListener('click', playPreviousSong);

        audio.addEventListener('timeupdate', () => {
            if (audio.duration) {
                const progressPercent = (audio.currentTime / audio.duration) * 100;
                progressBarFill.style.width = `${progressPercent}%`;
                currentTimeDisplay.textContent = formatTime(audio.currentTime);
            }
        });

        audio.addEventListener('loadedmetadata', () => {
            durationDisplay.textContent = formatTime(audio.duration);
        });

        audio.addEventListener('ended', playNextSong);

        progressBarContainer.addEventListener('click', (e) => {
            const width = progressBarContainer.clientWidth;
            const clickX = e.offsetX;
            const duration = audio.duration;
            if (duration) {
                audio.currentTime = (clickX / width) * duration;
            }
        });

        volumeSlider.addEventListener('input', () => {
            audio.volume = volumeSlider.value;
        });

        // Initial setup on window load
        window.onload = () => {
            renderPlaylist();
            loadSong(currentSongIndex);
            audio.volume = volumeSlider.value;
        };