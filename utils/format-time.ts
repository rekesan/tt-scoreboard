export const formatTime = (
  totalSeconds: number
): `${string}:${string}:${string}` => {
  const h = Math.floor(totalSeconds / 3600).toString();
  const m = Math.floor((totalSeconds % 3600) / 60).toString();
  const s = (totalSeconds % 60).toString();

  return `${h.padStart(2, "0")}:${m.padStart(2, "0")}:${s.padStart(2, "0")}`;
};
