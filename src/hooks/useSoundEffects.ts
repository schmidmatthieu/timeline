import { useCallback, useEffect, useRef } from 'react';
import { SOUND_EFFECTS } from '../utils/sound';

export function useSoundEffects() {
  const isMovingRef = useRef(false);
  const moveIntervalRef = useRef<number>();

  const playMove = useCallback(() => {
    if (!isMovingRef.current) {
      isMovingRef.current = true;
      SOUND_EFFECTS.move.play();
      moveIntervalRef.current = window.setInterval(() => {
        SOUND_EFFECTS.move.play();
      }, 300);
    }
  }, []);

  const stopMove = useCallback(() => {
    if (isMovingRef.current) {
      isMovingRef.current = false;
      if (moveIntervalRef.current) {
        clearInterval(moveIntervalRef.current);
      }
    }
  }, []);

  const playTvOn = useCallback(() => {
    SOUND_EFFECTS.tvOn.play();
  }, []);

  const playTvOff = useCallback(() => {
    SOUND_EFFECTS.tvOff.play();
  }, []);

  const playTransition = useCallback(() => {
    SOUND_EFFECTS.transition.play();
  }, []);

  useEffect(() => {
    return () => {
      if (moveIntervalRef.current) {
        clearInterval(moveIntervalRef.current);
      }
    };
  }, []);

  return {
    playMove,
    stopMove,
    playTvOn,
    playTvOff,
    playTransition,
  };
}