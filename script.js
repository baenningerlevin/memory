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
const shuffledCards = cardContent.sort(() => Math.random() - 0.5);
const game = document.querySelector('.game');
const resetBtn = document.querySelector('.reset');
const counterEl = document.querySelector('.counter');
let counter = 0;

for (let i = 0; i < cardContent.length; i++) {
  // Create cards
  const card = document.createElement('div');
  card.classList.add('card');
  card.textContent = shuffledCards[i];
  game.appendChild(card);

  // Flip cards and check for match
  card.addEventListener('click', () => {
    counter++;
    counterEl.textContent = `Counter: ${counter}`;
    card.classList.add('flip');
    setTimeout(() => checkForMatch(), 3000);
  });
}

resetBtn.addEventListener('click', () => {
  location.reload();
});

const checkForMatch = () => {
  const flippedCards = document.querySelectorAll('.flip');

  if (flippedCards.length > 1) {
    if (flippedCards[0].textContent === flippedCards[1].textContent) {
      flippedCards[0].classList.add('match');
      flippedCards[1].classList.add('match');

      flippedCards[1].classList.remove('flip');
      flippedCards[0].classList.remove('flip');

      if (document.querySelectorAll('.match').length === cardContent.length) {
        alert('You won!');
      }
    } else {
      flippedCards[1].classList.remove('flip');
      flippedCards[0].classList.remove('flip');
    }
  }
};
