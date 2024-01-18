const cardContent = [
  '⚽',
  '⚽',
  '⚾',
  '⚾',
  '🏀',
  '🏀',
  '🏈',
  '🏈',
  '🎱',
  '🎱',
  '🏒',
  '🏒',
  '🥋',
  '🥋',
  '🏓',
  '🏓',
];

// Algorithm to shuffle cards
function shuffle(arr) {
  let currentIndex = arr.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = arr[currentIndex];
    arr[currentIndex] = arr[randomIndex];
    arr[randomIndex] = temporaryValue;
  }

  return arr;
}

// Select all global elements
const game = document.querySelector('.game');
const resetBtns = document.querySelectorAll('.reset');
const counterEl = document.querySelector('.counter');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.btn-close');

// Declare variables for initGame() function
let shuffledCards;
let flippedCards;
let matchedCards;

const flipCard = (event) => {
  // Check if card can be flipped
  if (flippedCards.length < 2 && !flippedCards.includes(event.currentTarget)) {
    event.currentTarget.classList.add('flip');
    flippedCards.push(event.currentTarget);

    if (flippedCards.length === 2) {
      setTimeout(() => checkForMatch(), 1000);
    }
  }
};

function initGame() {
  // Initialize values
  shuffledCards = shuffle(cardContent);
  game.innerHTML = '';
  flippedCards = [];
  matchedCards = [];

  // Create cards
  for (let i = 0; i < cardContent.length; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = shuffledCards[i];
    game.appendChild(card);
  }

  const cards = document.querySelectorAll('.card');

  cards.forEach((card) => {
    card.addEventListener('click', flipCard);
  });
}

initGame();

const openModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const displayModal = () => {
  openModal();

  // Watch for clicks on button or overlay
  overlay.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);

  // Listen for esc
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
};

const checkForMatch = () => {
  if (flippedCards[0].textContent === flippedCards[1].textContent) {
    matchedCards.push(...flippedCards);
    matchedCards.forEach((card) => {
      card.classList.add('match');
      card.removeEventListener('click', flipCard);
    });

    if (matchedCards.length === cardContent.length) {
      displayModal();
    }
  } else {
    flippedCards.forEach((card) => card.classList.remove('flip'));
  }

  flippedCards = [];
};

resetBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    closeModal();
    initGame();
  });
});
