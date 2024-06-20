import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import openai from "../utils/openai";
import groq from "../utils/groq";
import { API_OPTIONS } from "../utils/constants";
import { addGptResults } from "../utils/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );

    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {
    // const gptResults = await openai.chat.completions.create({
    //   messages: [{ role: "user", content: searchText.current.value }],
    //   model: "gpt-3.5-turbo",
    // });

    const query =
      "Act as a Movie Recommendation System and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me 5 movies, no other words, commma seprated like the expample given ahead. Expample Results : Sholay, Gadar, Golmaal, Hera Pheri, Koi Mil Gaya.";

    const gptResults = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: query,
        },
      ],
      model: "llama3-8b-8192",
    });

    if (!gptResults) {
      // TODO : Error handling
    }

    // console.log(gptResults.choices[0]?.message?.content || "");
    const gptMovies = gptResults.choices[0]?.message?.content.split(", ");

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

    const tmdbResults = await Promise.all(promiseArray);

    dispatch(
      addGptResults({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };
  return (
    <div className="pt-[15%] flex justify-center">
      <form
        className="bg-black w-1/2 grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="col-span-9 p-4 m-4 rounded-lg"
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
        ></input>
        <button
          className="text-white p-4 m-4 bg-red-700 col-span-3 rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
