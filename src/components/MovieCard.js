import { POSTER_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  //   const check = POSTER_URL + posterPath;
  //   console.log(check);
  return (
    <div className="w-44 pr-4">
      <img src={POSTER_URL + posterPath} alt="movie card" />
    </div>
  );
};

export default MovieCard;
