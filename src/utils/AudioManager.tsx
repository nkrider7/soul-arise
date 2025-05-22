// src/utils/AudioManager.ts
import { Audio } from 'expo-av';
import { store } from '../store';

export type SoundKey = 'click' | 'bgm';

const soundCache: Partial<Record<SoundKey, Audio.Sound>> = {};

// Load sound once
export const loadSound = async (key: SoundKey, file: number) => {
  if (soundCache[key]) return;
  try {
    const { sound } = await Audio.Sound.createAsync(file);
    soundCache[key] = sound;
  } catch (e) {
    console.error(`Failed to load sound ${key}:`, e);
  }
};

// Play sound (check if loaded + setting)
export const playSound = async (key: SoundKey, options?: { loop?: boolean }) => {
  const { soundEnabled, musicEnabled } = store.getState().settings;
  const isMusic = key === 'bgm';

  if ((isMusic && !musicEnabled) || (!isMusic && !soundEnabled)) return;

  const sound = soundCache[key];
  if (!sound) {
    console.warn(`Sound "${key}" not loaded`);
    return;
  }

  try {
    if (options?.loop) await sound.setIsLoopingAsync(true);
    await sound.replayAsync();
  } catch (e) {
    console.error(`Failed to play sound "${key}"`, e);
  }
};

// Stop a sound
export const stopSound = async (key: SoundKey) => {
  const sound = soundCache[key];
  if (sound) await sound.stopAsync();
};

// Unload all (on screen unmount or logout)
export const unloadAllSounds = async () => {
  for (const sound of Object.values(soundCache)) {
    try {
      await sound?.unloadAsync();
    } catch (e) {
      console.warn('Error unloading sound:', e);
    }
  }
  Object.keys(soundCache).forEach((key) => {
    delete soundCache[key as SoundKey];
  });
};
