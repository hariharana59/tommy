document.addEventListener('DOMContentLoaded', () => {
    const celebrateBtn = document.getElementById('celebrate-btn');
    const celebrationText = document.getElementById('celebration-text');
    const sadMessage = document.getElementById('sad-message');
    const confettiCanvas = document.getElementById('confetti-canvas');
    const backgroundMusic = document.getElementById('background-music');
    const heartsContainer = document.getElementById('hearts-container');
    const starsContainer = document.getElementById('stars-container');
    const imagesContainer = document.getElementById('images-container');
    const confettiContext = confettiCanvas.getContext('2d');
    
    let isClicked = false; // Prevent multiple clicks

    // Handle click event on the celebrate button
    celebrateBtn.addEventListener('click', () => {
        if (isClicked) return;  // Prevent multiple clicks
        isClicked = true;

        // Play background music
        backgroundMusic.play();

        // Hide the black screen and change background color
        document.getElementById('black-screen').style.display = 'none';
        document.body.style.backgroundColor = '#f4e1d2';

        // Display celebration elements
        celebrationText.style.display = 'block';
        heartsContainer.style.display = 'block';
        imagesContainer.style.display = 'block';
        confettiCanvas.style.display = 'block';

        // Resize the canvas to fit window size
        resizeCanvas();

        // Initialize confetti and hearts animations
        initializeConfetti();
        createHearts();

        // Show stars after 5 seconds
        setTimeout(createStars, 5000);

        // Display sad message word by word after 8 seconds
        setTimeout(displaySadMessage, 8000);
    });

    // Resize canvas on window resize
    window.addEventListener('resize', resizeCanvas);

    function resizeCanvas() {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    }

    // Confetti animation logic
    const confettiPieces = [];
    const confettiColors = ['#FF0A47', '#0AA0FF', '#0AFF8A', '#FFAA0A', '#A00AFF'];

    function createConfettiPiece() {
        return {
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height - confettiCanvas.height,
            size: Math.random() * 10 + 5,
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            speed: Math.random() * 3 + 2
        };
    }

    function drawConfettiPiece(piece) {
        confettiContext.fillStyle = piece.color;
        confettiContext.fillRect(piece.x, piece.y, piece.size, piece.size);
    }

    function updateConfetti() {
        confettiContext.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        confettiPieces.forEach((piece, index) => {
            piece.y += piece.speed;
            if (piece.y > confettiCanvas.height) {
                confettiPieces[index] = createConfettiPiece();
            }
            drawConfettiPiece(piece);
        });
        requestAnimationFrame(updateConfetti);
    }

    function initializeConfetti() {
        for (let i = 0; i < 100; i++) {  // Limit to 100 pieces for better performance
            confettiPieces.push(createConfettiPiece());
        }
        updateConfetti();
    }

    // Hearts animation logic
    function createHearts() {
        const numHearts = 50;  // Adjust the number of hearts
        for (let i = 0; i < numHearts; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.bottom = '-50px'; // Start position for hearts
            heartsContainer.appendChild(heart);
        }
    }

    // Stars animation logic
    function createStars() {
        starsContainer.style.display = 'block';
        const numStars = 50;
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * window.innerWidth + 'px';
            star.style.top = Math.random() * window.innerHeight + 'px';
            starsContainer.appendChild(star);
        }
    }

    // Display sad message word by word
    function displaySadMessage() {
        const messageText = "Ennaku theriyum naan oru tharkuri, edhukum use aagada piece and avlo scene um illa... but ennala mudinja alavuku best ah irruka try pannitu thaan irruken 😔";
        const words = messageText.split(' ');
        sadMessage.innerHTML = words.map(word => `<span class="word">${word} </span>`).join('');

        const wordsElements = document.querySelectorAll('#sad-message .word');
        wordsElements.forEach((word, index) => {
            word.style.animationDelay = `${index * 0.5}s`;  // Staggered word animation
        });

        sadMessage.style.display = 'block';
    }
});
