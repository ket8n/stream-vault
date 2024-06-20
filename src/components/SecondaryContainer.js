import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className="bg-black">
      <div className="-mt-52 relative z-20 pl-12">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
        <MovieList title={"Popular"} movies={movies.popularMovies} />
        <MovieList title={"Upcomming"} movies={movies.upcommingMovies} />
      </div>
      {/* 
    
      MovieList - Now Playing
        - MovieCard * n
      MovieList - Trending
      MovieList - Popular
      MovieList - Disney
    
    */}
    </div>
  );
};

export default SecondaryContainer;
