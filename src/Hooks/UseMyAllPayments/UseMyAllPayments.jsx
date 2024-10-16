import { useEffect, useState } from "react";
import UseAuth from "../UseAuth/UseAuth";

const UseMyAllPayments = () => {
  const [myPayments, setMyPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = UseAuth(); // Assuming you have a hook to get the logged-in user

  useEffect(() => {
    // Fetch data using .then() and .catch() instead of async/await
    if (user?.email) {
      fetch(
        `https://anime-generator-sever.vercel.app/payments?email=${user.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access-token")}`, // Include authorization if required
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user's payments");
          }
          return response.json(); // Convert response to JSON
        })
        .then((data) => {
          setMyPayments(data); // Set fetched data to state
        })
        .catch((error) => {
          console.error("Error fetching user's payments:", error);
        })
        .finally(() => {
          setIsLoading(false); // Stop loading indicator
        });
    }
  }, [user?.email]); // Re-run if the user's email changes

  return [myPayments, isLoading];
};

export default UseMyAllPayments;
