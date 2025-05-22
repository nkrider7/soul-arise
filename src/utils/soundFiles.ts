// src/assets/soundFiles.ts
import { SoundKey } from '~/src/utils/AudioManager';

export const soundFiles: Record<SoundKey, number> = {
  click: require('../../assets/sfx/yun.mp3'),
  bgm: require('../../assets/sfx/bg.mp3'),
};
