import { Howl } from 'howler';
import { useCallback, useEffect, useRef } from 'react';

const SOUNDS = {
  move: new Howl({
    src: ['https://assets.codepen.io/189524/move.mp3'],
    volume: 0.3,
  }),
  tvOn: new Howl({
    src: ['https://assets.codepen.io/189524/tv-on.mp3'],
    volume: 0.4,
  }),
  tvOff: new Howl({
    src: ['https://assets.codepen.io/189524/tv-off.mp3'],
    volume: 0.4,
  }),
  transition: new Howl({
    src: ['https://assets.codepen.io/189524/transition.mp3'],
    volume: 0.2,
  }),
};

export function useSoundEffects() {
  const isMovingRef = useRef(false);
  const moveIntervalRef = useRef<number>();

  const playMove = useCallback(() => {
    if (!isMovingRef.current) {
      isMovingRef.current = true;
      SOUNDS.move.play();
      moveIntervalRef.current = window.setInterval(() => {
        SOUNDS.move.play();
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
    SOUNDS.tvOn.play();
  }, []);

  const playTvOff = useCallback(() => {
    SOUNDS.tvOff.play();
  }, []);

  const playTransition = useCallback(() => {
    SOUNDS.transition.play();
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