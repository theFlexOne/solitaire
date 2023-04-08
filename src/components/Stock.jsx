import { useGame } from "../context/GameContext";
import Card from "./Card";

const Stock = () => {
  // const {
  //   state: { stock },
  // } = useGame();

  // console.log(stock);

  // const topCard = stock.at(-1);
  // const cardValue = topCard ? topCard.value + topCard.suite : null;

  return (
    <div>
      {cardValue ? (
        <Card cardValue={cardValue} />
      ) : (
        <div className="p-2 bg-red-500"></div>
      )}
    </div>
  );
};

export default Stock;
