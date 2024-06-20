import React from "react";
import Header from "./Header";
import useNowPlayinMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcommingMovies from "../hooks/useUpcommingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  useNowPlayinMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcommingMovies();

  return (
    <div>
      <Header />

      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}

      {/* 
          MainContainer
            - VideoBackround
            - VideoTitle
          SecondaryContainer
            - MovieLiest * n
              - cards * m

      */}
    </div>
  );
};

export default Browse;
