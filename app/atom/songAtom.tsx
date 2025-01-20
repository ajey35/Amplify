"use client"
import { atom } from 'jotai';
export const currentSongIdState = atom<string | null>(null);
export const isPlayingState = atom<boolean>(false);
export const volumeState = atom<number>(50);
export const songInfoState = atom(null);