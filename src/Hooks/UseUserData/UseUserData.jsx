import { useEffect, useState } from "react";
import UseAuth from "../UseAuth/UseAuth";

const UseUserData = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = UseAuth();
  // console.log(user?.email);
  useEffect(() => {
    // Fetch data using .then() and .catch() instead of async/await
    if (user?.email) {
      fetch(
        `https://anime-generator-sever.vercel.app/users/user/${user.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user's data");
          }
          return response.json(); // Convert response to JSON
        })
        .then((data) => {
          setUserData(data); // Set fetched data to state
        })
        .catch((error) => {
          console.error("Error fetching user's data:", error);
        })
        .finally(() => {
          setIsLoading(false); // Stop loading indicator
        });
    }
  }, [user?.email]); // Re-run if the user's email changes
  //   console.log(userData);
  return [userData, isLoading];
};

export default UseUserData;
