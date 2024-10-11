import { createContext, useState, useContext } from "react";
import UseUserData from "../Hooks/UseUserData/UseUserData";
import UseAuth from "../Hooks/UseAuth/UseAuth";
export const CoinContext = createContext(null);

//   console.log(userData?.coin);

// export const useCoin = () => {
//   return useContext(CoinContext);
// };

const CoinProvider = ({ children }) => {
  const [userData] = UseUserData();
  const [user] = UseAuth();
  const [coin, setCoin] = useState(null);

  const fetchCoin = async () => {
    // Fetch coin from API when component mounts
    const data = await getUserDataFromApi();
    setCoin(data.coin);
  };

  const decreaseCoin = async () => {
    // Call API to decrement coin
    const response = await fetch("/api/decrease-coin", {
      method: "POST",
      body: JSON.stringify({ userId: user.id }),
    });

    if (response.ok) {
      const updatedCoin = await response.json();
      setCoin(updatedCoin);
    }
  };

  return (
    <CoinContext.Provider value={{ coin, decreaseCoin, fetchCoin, setCoin }}>
      {children}
    </CoinContext.Provider>
  );
};

export default CoinProvider;
