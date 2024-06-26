import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-28 md:pt-44 pl-6 md:pl-16 absolute w-screen aspect-video text-white bg-gradient-to-r from-black">
      <h1 className="font-bold text-2xl md:text-4xl p-4">{title}</h1>
      <p className="text-lg p-4 w-1/2 hidden md:block">{overview}</p>
      <div className="flex px-4">
        <button className="bg-white text-black p-3 px-8 rounded-lg hover:opacity-80">
          ▷ Play
        </button>
        <button className="hidden md:block bg-gray-600 opacity-50 text-white p-3 px-8 rounded-lg mx-2 hover:opacity-80">
          ⓘ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
