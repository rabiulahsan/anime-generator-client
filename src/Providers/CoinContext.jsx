/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import UseUserData from "../Hooks/UseUserData/UseUserData";
import UseAuth from "../Hooks/UseAuth/UseAuth";

export const CoinContext = createContext(null);

const CoinProvider = ({ children }) => {
  const [userData] = UseUserData(); // Custom hook to get user data
  const { user } = UseAuth(); // Custom hook to get auth data
  const [coin, setCoin] = useState(null);

  // Fetch coin using the userData already fetched
  const fetchCoin = () => {
    if (userData?.coin !== undefined) {
      setCoin(userData.coin); // Set coin directly from userData
    }
  };

  // Automatically update coin when userData changes
  useEffect(() => {
    if (userData?.coin !== undefined) {
      setCoin(userData.coin); // Sync coin with userData whenever it updates
    }
  }, [userData]); // Runs every time userData updates

  // Decrease the coin in the database and locally
  const decreaseCoin = async () => {
    try {
      // Decrease coin by 1
      const updatedCoin = coin - 1;

      // Call the API to update the coin value in the database
      const response = await fetch(
        `http://localhost:5000/users/update?email=${user.email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ coin: updatedCoin }), // Send only the updated coin value
        }
      );

      if (response.ok) {
        // Update the local coin state with the new value
        setCoin(updatedCoin);
      } else {
        console.error("Failed to decrease coin in the database");
      }
    } catch (error) {
      console.error("Error decreasing coin:", error);
    }
  };

  return (
    <CoinContext.Provider value={{ coin, decreaseCoin, fetchCoin }}>
      {children}
    </CoinContext.Provider>
  );
};

export default CoinProvider;
