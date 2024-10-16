import { useEffect, useState } from "react";

const UseAllAnimies = () => {
  const [allAnimies, setAllAnimies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://anime-generator-sever.vercel.app/animies")
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
