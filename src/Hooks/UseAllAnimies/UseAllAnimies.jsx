import { useEffect, useState } from "react";

const UseAllAnimies = () => {
  const [allAnimies, setAllAnimies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/animies")
      .then((res) => res.json())
      .then((data) => {
        setAllAnimies(data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  //   console.log(allAnimies);
  return [allAnimies, isLoading];
};

export default UseAllAnimies;
