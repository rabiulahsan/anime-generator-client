import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Home/Navbar/Navbar";
import { Player } from "@lottiefiles/react-lottie-player";
import AnimiesCard from "../Gallary/AnimiesCard";
import SkeletonCard from "../../Components/SkeletonCard/SkeletonCard";

const SearchPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search_query");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //here i get the data based on search query
  useEffect(() => {
    if (searchQuery) {
      setIsLoading(true);
      fetchResults(searchQuery);
      setIsLoading(false);
    }
  }, [searchQuery]);

  const fetchResults = async (query) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/search?query=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };

  console.log(results);
  return (
    <div>
      <Navbar></Navbar>
      {results?.length === 0 ? (
        // Display 404 if no anime cards
        <div className="flex justify-center items-center my-[3%]">
          <div className="">
            <Player
              className="h-[300px]"
              autoplay
              loop
              src="/no-search-results.json"
            ></Player>
            <p className="text-3xl font-extrabold text-slate-600 text-center mt-[5%]">
              Oops, looks like we couldn&apos;t find what you&apos;re looking
              for.
            </p>
          </div>
        </div>
      ) : (
        <>
          <p className="text-slate-600 font-bold text-3xl my-[5%] text-center">
            Anime World - Your Creations
          </p>
          {/* // Display anime cards when they exist */}
          <div className="grid gap-x-5 gap-y-4 grid-cols-4 px-[10%]  mb-[5%]">
            {/* Show skeletons while loading */}
            {isLoading && <SkeletonCard number={6}></SkeletonCard>}
            {/* Display anime cards once they are loaded */}
            {results?.map((result) => (
              <AnimiesCard key={result?._id} details={result}></AnimiesCard>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;
