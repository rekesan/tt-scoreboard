import { formatTime } from "@/utils/format-time";
import { atom } from "jotai";

export const isPlayingAtom = atom(false);
export const elapsedSeconds = atom(0);
export const formattedElapsedTime = atom((get) => {
  return formatTime(get(elapsedSeconds));
});

export const RESET_TIME = atom(null, (_, set) => {
  set(isPlayingAtom, false);
  set(elapsedSeconds, 0);
});
