import { useEffect, useState } from "react";

const Card = ({ cardValue }) => {
  const [cardSvg, setCardSvg] = useState(null);

  useEffect(() => {
    const getCardSvg = async () => {
      const response = await import(`../assets/cards/${cardValue}.svg`);
      setCardSvg(response.default);
    };
    getCardSvg();
  }, [cardValue]);

  return <div>{cardSvg && <img src={cardSvg} alt="card" />}</div>;
};

export default Card;
