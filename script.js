


document.getElementById('celebrate-btn').addEventListener('click', function() {
    // Play background music
    const backgroundMusic = document.getElementById('background-music');
    backgroundMusic.play();

    // Hide the black screen
    document.getElementById('black-screen').style.display = 'none';

    // Change the background color to a bright or colorful color
    document.body.style.backgroundColor = '#f4e1d2';

    const numHearts = 150; // Number of hearts to create
    const container = document.getElementById('hearts-container');

    for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = Math.random() * 100 + '%'; // Random horizontal position
        heart.style.top = Math.random() * 100 + '%';  // Random vertical position
        heart.style.animationDuration = Math.random() * 3 + 3 + 's'; // Random duration between 3 and 6 seconds
        container.appendChild(heart);
    }

    // Show the hearts container when needed
    function showHearts() {
        container.style.display = 'block';
    }

    // Show the confetti canvas
    const canvas = document.getElementById('confetti-canvas');
    canvas.style.display = 'block';

    // Show the celebration text
    const celebrationText = document.getElementById('celebration-text');
    celebrationText.style.display = 'block';

    // Show the hearts container
    const heartsContainer = document.getElementById('hearts-container');
    heartsContainer.style.display = 'block';

    // Show the images container
    const imagesContainer = document.getElementById('images-container');
    imagesContainer.style.display = 'block';

    // Initialize confetti
    const confettiContext = canvas.getContext('2d');
    const confettiPieces = [];
    const confettiColors = ['#FF0A47', '#0AA0FF', '#0AFF8A', '#FFAA0A', '#A00AFF'];

    function createConfettiPiece() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
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
        confettiContext.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < confettiPieces.length; i++) {
            const piece = confettiPieces[i];
            piece.y += piece.speed;
            if (piece.y > canvas.height) {
                confettiPieces[i] = createConfettiPiece();
            }
            drawConfettiPiece(piece);
        }
        requestAnimationFrame(updateConfetti);
    }

    function initializeConfetti() {
        for (let i = 0; i < 200; i++) {
            confettiPieces.push(createConfettiPiece());
        }
        updateConfetti();
    }

    // Create and animate hearts
    function createHearts() {
        const numberOfHearts = 50; // Number of hearts to display
        for (let i = 0; i < numberOfHearts; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.bottom = '-50px'; // Start position for hearts
            heartsContainer.appendChild(heart);
        }
    }

    // Create and animate stars
    function createStars() {
        const starsContainer = document.getElementById('stars-container');
        starsContainer.style.display = 'block';
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * window.innerWidth + 'px';
            star.style.top = Math.random() * window.innerHeight + 'px';
            starsContainer.appendChild(star);
        }
    }

    // Show surprise message
    function showSurpriseMessage() {
        const surpriseMessage = document.getElementById('surprise-message');
        surpriseMessage.style.display = 'block';
    }

    // Display sad message word by word
    function displaySadMessage() {
        const sadMessage = document.getElementById('sad-message');
        const messageText = "Ennaku theriyum naan oru tharkuri, edhukum use aagada piece and avlo scene um illa... but ennala mudinja alavuku best ah irruka try pannitu thaan irruken 😔";
        const words = messageText.split(' ');
        sadMessage.innerHTML = words.map(word => `<span class="word">${word} </span>`).join('');
        
        const wordsElements = document.querySelectorAll('#sad-message .word');
        wordsElements.forEach((word, index) => {
            word.style.animationDelay = `${index * 0.5}s`; // Staggered appearance
        });
        
        sadMessage.style.display = 'block';
    }

    // Resize canvas to fit window
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Start the confetti animation and heart creation
    initializeConfetti();
    createHearts();

    // Show stars and surprise message after 5 seconds
    setTimeout(createStars, 5000);
    setTimeout(showSurpriseMessage, 7000);

    // Display the sad message
    setTimeout(displaySadMessage, 8000); // Show message after 8 seconds
});

// Handle letter opening
document.getElementById('letter').addEventListener('click', function() {
    this.classList.toggle('open');
    document.getElementById('sad-message').style.display = 'block';
});
