import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUpcommingMovies } from "../utils/moviesSlice";

const useUpcommingMovies = () => {
  const dispatch = useDispatch();
  const upcommingMovies = useSelector((store) => store.movies.upcommingMovies);

  const getUpcommingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?page=1",
      API_OPTIONS
    );

    const json = await data.json();
    dispatch(addUpcommingMovies(json.results));
  };

  useEffect(() => {
    !upcommingMovies && getUpcommingMovies();
  }, []);
};

export default useUpcommingMovies;
