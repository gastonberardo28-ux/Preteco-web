/** Mezcla una lista con un orden que cambia cada hora (igual para todos durante esa hora).
 *  Se usa en el equipo para que todas las personas tengan la misma visibilidad. */
export function hourlyShuffle<T>(list: T[], now = Date.now()): T[] {
  let seed = Math.floor(now / 3_600_000);
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
