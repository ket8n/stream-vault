import React from "react";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const movies = useSelector((store) => store?.movies?.nowPlayingMovies);

  // early return
  if (!movies) return;

  const mainMovie = movies[0];
  //   console.log(mainMovie);

  const { original_title, overview, id } = mainMovie;

  return (
    <div className="pt-[34%] bg-black md:pt-0">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
