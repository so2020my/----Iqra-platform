
        let currentAudio = null;
        let currentBtn = null;

        function playSound(audioId, cardElement) {
            const audioToPlay = document.getElementById(audioId);
            const btn = cardElement.querySelector('.sound-btn');

            // If clicking the same audio that is already playing, just pause it
            if (currentAudio === audioToPlay && !audioToPlay.paused) {
                audioToPlay.pause();
                btn.classList.remove('playing');
                return;
            }

            // Stop any currently playing audio
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }
            if (currentBtn) {
                currentBtn.classList.remove('playing');
            }

            // Play the new audio
            audioToPlay.play().catch(error => {
                console.log("Audio playback failed:", error);
                alert("يرجى التأكد من تفعيل تشغيل الصوت في المتصفح.");
            });

            // Add playing animation class
            btn.classList.add('playing');
            
            // Keep track of current audio
            currentAudio = audioToPlay;
            currentBtn = btn;
        }