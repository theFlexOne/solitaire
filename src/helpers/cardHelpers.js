export const CARD_VALUES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];
const CARD_SUITES = ["C", "D", "H", "S"];

export const createDeck = () => {
  const deckOfCards = CARD_VALUES.reduce((deck, value) => {
    CARD_SUITES.forEach((suite) => deck.push(`${value}${suite}`));
    return deck;
  }, []);
  return deckOfCards.map((card) => ({
    value: card.slice(0, -1),
    suite: card.slice(-1),
    isFlipped: false,
  }));
};

export const shuffleDeck = (deck) => {
  const shuffledDeck = [...deck];
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    // Generate random number
    const j = Math.floor(Math.random() * (i + 1));

    // Swap the cards
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }
  return shuffledDeck;
};
