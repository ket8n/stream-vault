import { BG_IMG_URL } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GptSearch = () => {
  return (
    <div>
      <div className="fixed -z-10">
        <img
          className="h-screen object-cover md:h-full"
          src={BG_IMG_URL}
          alt="bg-img"
        />
      </div>
      <div className="">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </div>
  );
};

export default GptSearch;
