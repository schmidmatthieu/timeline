import { Howl } from 'howler';
import { ASSET_URLS } from './constants';

export const SOUND_EFFECTS = {
  move: new Howl({
    src: [ASSET_URLS.SOUNDS.MOVE],
    volume: 0.3,
    preload: true,
  }),
  tvOn: new Howl({
    src: [ASSET_URLS.SOUNDS.TV_ON],
    volume: 0.4,
    preload: true,
  }),
  tvOff: new Howl({
    src: [ASSET_URLS.SOUNDS.TV_OFF],
    volume: 0.4,
    preload: true,
  }),
  transition: new Howl({
    src: [ASSET_URLS.SOUNDS.TRANSITION],
    volume: 0.2,
    preload: true,
  }),
};