import { useContext } from "react";
import { CoinContext } from "../../Providers/CoinContext";

const UseCoin = () => {
  const coin = useContext(CoinContext);
  return coin;
};

export default UseCoin;
