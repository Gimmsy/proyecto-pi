import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";

const AudioComponent = ({ audioSrc, title, description }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="audio-container flex flex-col items-center p-4">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="mb-4">{description}</p>
      <button
        onClick={toggleAudio}
        className="bg-primary text-white px-4 py-2 rounded-md mt-4 text-center transition-colors hover:bg-quaternary"
      >
        <FontAwesomeIcon icon={isPlaying ? faVolumeUp : faVolumeMute} />
      </button>
      <audio ref={audioRef} src={audioSrc} />
    </div>
  );
};

export default AudioComponent;