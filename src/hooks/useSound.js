import { useCallback, useEffect, useRef } from "react";
import useLocalStorage from "./useLocalStorage";

const SOUNDS = {
  correct: {
    url: "/sounds/correct.mp3",
    volume: 0.5,
    description: "Jawaban benar",
  },
  wrong: {
    url: "/sounds/wrong.mp3",
    volume: 0.5,
    description: "Jawaban salah",
  },
  timer: {
    url: "/sounds/timer.mp3",
    volume: 0.3,
    description: "Timer warning",
  },
  complete: {
    url: "/sounds/complete.mp3",
    volume: 0.6,
    description: "Kuis selesai",
  },
  achievement: {
    url: "/sounds/achievement.mp3",
    volume: 0.7,
    description: "Achievement unlock",
  },
  click: {
    url: "/sounds/click.mp3",
    volume: 0.2,
    description: "Button click",
  },
  hover: {
    url: "/sounds/hover.mp3",
    volume: 0.1,
    description: "Hover effect",
  },
  levelup: {
    url: "/sounds/levelup.mp3",
    volume: 0.6,
    description: "Level up",
  },
  notification: {
    url: "/sounds/notification.mp3",
    volume: 0.4,
    description: "Notification",
  },
};

export const useSound = (soundId = null, options = {}) => {
  const [settings] = useLocalStorage("user_settings", {});
  const audioRef = useRef(null);
  const isMuted = settings?.notifications?.sound_effects === false;

  useEffect(() => {
    if (!soundId || !SOUNDS[soundId]) return;

    audioRef.current = new Audio(SOUNDS[soundId].url);
    audioRef.current.volume = options.volume || SOUNDS[soundId].volume || 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [soundId, options.volume]);

  const play = useCallback(async () => {
    if (isMuted || !audioRef.current) return;

    try {
      audioRef.current.currentTime = 0;
      await audioRef.current.play();
    } catch (error) {
      console.debug("Sound play prevented:", error);
    }
  }, [isMuted]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const setVolume = useCallback((volume) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  }, []);

  return {
    play,
    stop,
    pause,
    setVolume,
    isMuted,
    sound: SOUNDS[soundId],
  };
};

export const useSoundManager = () => {
  const [settings, setSettings] = useLocalStorage("user_settings", {});

  const toggleMute = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        sound_effects: !prev.notifications?.sound_effects,
      },
    }));
  }, [setSettings]);

  const setMasterVolume = useCallback(
    (volume) => {
      setSettings((prev) => ({
        ...prev,
        masterVolume: Math.max(0, Math.min(1, volume)),
      }));
    },
    [setSettings],
  );

  const getAllSounds = useCallback(() => {
    return Object.entries(SOUNDS).map(([id, sound]) => ({
      id,
      ...sound,
    }));
  }, []);

  const testSound = useCallback(async (soundId) => {
    try {
      const audio = new Audio(SOUNDS[soundId].url);
      audio.volume = 0.5;
      await audio.play();
      setTimeout(() => {
        audio.pause();
      }, 1000);
    } catch (error) {
      console.debug("Sound test failed:", error);
    }
  }, []);

  return {
    isMuted: settings?.notifications?.sound_effects === false,
    masterVolume: settings?.masterVolume || 0.5,
    toggleMute,
    setMasterVolume,
    getAllSounds,
    testSound,
    sounds: SOUNDS,
  };
};

export default useSound;
