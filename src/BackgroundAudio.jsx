import { useEffect, useRef } from "react";

export default function BackgroundAudio({
  src = "/assets/Audio/pleasant-atmosphere-153275.mp3",
  volume = 0.8
}) {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    // Start playing automatically when user interacts (browser policies)
    const startAudio = () => {
      audio.play().catch(() => {});
      document.removeEventListener("click", startAudio);
    };
    document.addEventListener("click", startAudio);

  
  }, [src, volume]);

  return null;
}
