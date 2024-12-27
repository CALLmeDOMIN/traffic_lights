import { useCallback, useEffect, useRef, useState } from "react";

export function useSimulationControl(handleNextStep: () => void) {
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(handleNextStep, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, handleNextStep]);

  return { isPlaying, togglePlay };
}
