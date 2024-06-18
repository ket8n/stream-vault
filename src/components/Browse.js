import React from "react";
import Header from "./Header";
import useNowPlayinMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  useNowPlayinMovies();

  return (
    <div>
      <Header />
      <MainContainer />
      <SecondaryContainer />
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
