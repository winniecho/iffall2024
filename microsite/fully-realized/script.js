// Character Data
const characters = [
    {
        id: 1,
        name: "SpongeBob SquarePants",
        role: "Fry Cook",
        image: "/api/placeholder/300/300",
        description: "An optimistic sea sponge who works at the Krusty Krab.",
        fullDescription: "SpongeBob is the main protagonist of the series. He is an optimistic, cheerful, naive, and hard-working sea sponge who lives in a pineapple house in Bikini Bottom. He works as a fry cook at the Krusty Krab, where he is exceptionally skilled at making Krabby Patties.",
        stats: {
            cooking: 98,
            optimism: 100,
            karate: 75,
            jellyfishing: 85
        }
    },
    {
        id: 2,
        name: "Patrick Star",
        role: "Best Friend",
        image: "/api/placeholder/300/300",
        description: "SpongeBob's best friend and lovable starfish neighbor.",
        fullDescription: "Patrick is SpongeBob's best friend and neighbor. He is a pink starfish who lives under a rock. While not the brightest sea star in the sea, Patrick has a heart of gold and is always ready to join SpongeBob on his adventures.",
        stats: {
            friendship: 95,
            intelligence: 30,
            strength: 80,
            creativity: 65
        }
    },
    {
        id: 3,
        name: "Squidward Tentacles",
        role: "Cashier",
        image: "/api/placeholder/300/300",
        description: "The grumpy but artistic neighbor and coworker.",
        fullDescription: "Squidward is SpongeBob's neighbor and coworker at the Krusty Krab. He's a talented clarinet player (though others might disagree) and aspiring artist. Despite his grumpy exterior, Squidward occasionally shows moments of friendship.",
        stats: {
            art: 85,
            music: 70,
            patience: 20,
            sophistication: 90
        }
    },
    {
        id: 4,
        name: "Sandy Cheeks",
        role: "Scientist",
        image: "/api/placeholder/300/300",
        description: "The brilliant scientist and karate expert from Texas.",
        fullDescription: "Sandy is a squirrel from Texas who lives in an air-filled treedome underwater. She's a brilliant scientist and inventor, as well as a skilled karate practitioner. Sandy often helps her friends with her inventions and teaches SpongeBob karate.",
        stats: {
            science: 95,
            karate: 98,
            strength: 90,
            intelligence: 95
        }
    }
];

// DOM Elements
const carousel = document.getElementById('character-carousel');
const modal = document.getElementById('character-modal');
const closeModal = document.querySelector('.close-modal');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');

// Create Character Cards
function createCharacterCards() {
    characters.forEach(character => {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.innerHTML = `
            <div class="card-header">
                <h3>${character.name}</h3>
                <p class="character-role">${character.role}</p>
            </div>
            <div class="card-image-container">
                <img src="${character.image}" alt="${character.name}" class="character-image">
            </div>
            <div class="card-description">
                <p>${character.description}</p>
            </div>
        `;
        card.addEventListener('click', () => showModal(character));
        carousel.appendChild(card);
    });
}

// Show Modal
function showModal(character) {
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalRole = document.getElementById('modal-role');
    const modalDescription = document.getElementById('modal-description');
    const modalFullDescription = document.getElementById('modal-full-description');
    const modalStats = document.getElementById('modal-stats');

    modalImage.src = character.image;
    modalImage.alt = character.name;
    modalTitle.textContent = character.name;
    modalRole.textContent = character.role;
    modalDescription.textContent = character.description;
    modalFullDescription.textContent = character.fullDescription;

    // Create stats bars
    modalStats.innerHTML = '';
    Object.entries(character.stats).forEach(([stat, value]) => {
        const statContainer = document.createElement('div');
        statContainer.className = 'stat-container';
        statContainer.innerHTML = `
            <div class="stat-label">${stat.charAt(0).toUpperCase() + stat.slice(1)}</div>
            <div class="stat-bar">
                <div class="stat-fill" style="width: ${value}%"></div>
            </div>
            <div class="stat-value">${value}%</div>
        `;
        modalStats.appendChild(statContainer);
    });

    modal.style.display = 'block';
}

// Close Modal
function closeModalFunction() {
    modal.style.display = 'none';
}

// Carousel Navigation
function scrollCarousel(direction) {
    const scrollAmount = 320; // Width of card + gap
    carousel.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

// Event Listeners
closeModal.addEventListener('click', closeModalFunction);
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalFunction();
    }
});

leftBtn.addEventListener('click', () => scrollCarousel(-1));
rightBtn.addEventListener('click', () => scrollCarousel(1));

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createCharacterCards();
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModalFunction();
    }
});