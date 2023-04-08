import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { createDeck, shuffleDeck, CARD_VALUES } from "../helpers/cardHelpers";

const GameContext = createContext();

const initialState = {
  stock: [],
  foundations: [[], [], [], []],
  tableau: [[], [], [], [], [], [], []],
  waste: [],
  selected: null,
  moves: 0,
  isWon: false,
  isLost: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_GAME_STATE":
      return action.payload;

    default:
      return state;
  }
};

const initialConfig = {
  drawCount: 1,
  canDrawFromEmptyStock: false,
  canUndo: true,
  canRedo: true,
};

const checkValidTableauMove = (selectedCard, destinationCard) => {
  const selectedValue = selectedCard.slice(0, -1);
  const selectedSuite = selectedCard.slice(-1);
  const destinationValue = destinationCard.slice(0, -1);
  const destinationSuite = destinationCard.slice(-1);

  const selectedValueIndex = CARD_VALUES.indexOf(selectedValue);
  const destinationValueIndex = CARD_VALUES.indexOf(destinationValue);
  const isSelectedRed = selectedSuite === "H" || selectedSuite === "D";
  const isDestinationRed = destinationSuite === "H" || destinationSuite === "D";

  if (selectedValue === "K" && destinationValue === "") {
    return true;
  }

  if (selectedValueIndex === destinationValueIndex - 1) {
    if (isSelectedRed !== isDestinationRed) {
      return true;
    }
  }

  return false;
};

const checkValidFoundationMove = (selectedCard, destinationCard) => {
  const selectedValue = selectedCard.slice(0, -1);
  const selectedSuite = selectedCard.slice(-1);
  const destinationValue = destinationCard.slice(0, -1);
  const destinationSuite = destinationCard.slice(-1);

  const selectedValueIndex = CARD_VALUES.indexOf(selectedValue);
  const destinationValueIndex = CARD_VALUES.indexOf(destinationValue);

  if (selectedValue === "A" && destinationValue === "") {
    return true;
  }

  if (
    selectedValueIndex === destinationValueIndex + 1 &&
    selectedSuite === destinationSuite
  ) {
    return true;
  }

  return false;
};

const setupNewGame = () => {
  const gameState = { ...initialState };
  const newDeck = createDeck();
  console.log("newDeck:", newDeck);
  const shuffledDeck = shuffleDeck(newDeck);
  for (let i = 1; i <= 7; i++) {
    for (let j = i; j <= 7; j++) {
      const card = shuffledDeck.pop();

      if (j === i) {
        card.isFaceUp = true;
      } else {
        card.isFaceUp = false;
      }

      gameState.tableau[j - 1].push(card);
    }
  }
  gameState.stock = shuffledDeck;
  return gameState;
};

const GameProvider = ({ children, config = initialConfig }) => {
  const [state, dispatch] = useReducer(reducer, setupNewGame());

  const updateGameState = () => {
    dispatch({
      type: "SET_GAME_STATE",
      payload: state,
    });
  };

  const drawCards = () => {
    if (state.stock.length === 0) {
      return;
    }

    for (let i = 0; i < config.drawCount; i++) {
      const card = state.stock.pop();
      card.isFaceUp = true;
      state.waste.push(card);
    }
    return;
  };

  const selectCardByValue = (cardValue) => {
    state.selected = cardValue;
  };

  const handleCardClick = ({ cardValue, location }) => {
    switch (location) {
      case "stock": {
        if (state.stock.length === 0) {
          if (!config.canDrawFromEmptyStock) {
            return;
          }
          state.stock = state.waste.reverse();
        }
        drawCards();
        break;
      }
      case "waste": {
        selectCardByValue(cardValue);
        break;
      }
      case "tableau": {
        if (state.selected) {
          const selectedCard = state.selected;
          const selectedCardIndex = state.tableau.findIndex(
            (card) => card.value === selectedCard
          );
          const destinationCardIndex = state.tableau.findIndex(
            (card) => card.value === cardValue
          );

          if (checkValidTableauMove(selectedCard, cardValue)) {
            const cardsToMove =
              state.tableau[selectedCardIndex].splice(selectedCardIndex);
            state.tableau[destinationCardIndex].push(...cardsToMove);
          }
        } else {
          selectCardByValue(card);
        }
        break;
      }
      case "foundation": {
        if (state.selected) {
          const selectedCard = state.selected;
          const selectedCardIndex = state.tableau.findIndex(
            (card) => card.value === selectedCard
          );
          const destinationCardIndex = state.tableau.findIndex(
            (card) => card.value === cardValue
          );

          if (checkValidFoundationMove(selectedCard, cardValue)) {
            const cardsToMove =
              state.tableau[selectedCardIndex].splice(selectedCardIndex);
            state.tableau[destinationCardIndex].push(...cardsToMove);
          }
        }
      }
      default:
        break;
    }
    updateGameState();
  };

  const actions = useMemo(
    () => ({
      handleCardClick,
    }),
    []
  );

  console.log("state", state);

  return (
    <GameContext.Provider value={{ state, actions }}>
      {children}
    </GameContext.Provider>
  );
};

const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return ctx;
};

export { GameProvider, useGame };
