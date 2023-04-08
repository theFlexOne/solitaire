// This is the main component for a Solitaire game

import { GameProvider } from "../context/GameContext";
import Card from "./Card";
import Stock from "./Stock";

const Game = () => {
  return (
    <GameProvider>
      <div className="h-screen max-h-screen bg-neutral-800">
        <div className="min-w-fit max-w-[1280px] grid grid-rows-[auto_1fr] mx-auto py-6 gap-4">
          <div className="row-span-1 grid grid-cols-[repeat(7,_1fr)] gap-2 bg-blue-500">
            <div className="col-span-1 grid">
              <Stock />
            </div>
            <div className="col-span-2 grid grid-cols-[repeat(2,_1fr)]"></div>
            <div className="grid col-span-4 grid-cols-[repeat(4,_1fr)]">
              <div className="col-span-1"></div>
              <div className="col-span-1"></div>
              <div className="col-span-1"></div>
              <div className="col-span-1"></div>
            </div>
          </div>
          <div className="row-span-1 grid grid-cols-[repeat(7,_1fr)] gap-2 bg-green-500">
            <div className="col-span-1"></div>
            <div className="col-span-1"></div>
            <div className="col-span-1"></div>
            <div className="col-span-1"></div>
            <div className="col-span-1"></div>
            <div className="col-span-1"></div>
            <div className="col-span-1"></div>
          </div>
        </div>
      </div>
    </GameProvider>
  );
};

export default Game;
