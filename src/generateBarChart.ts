/**
 * based on https://github.com/matchai/waka-box
 */
export default function generateBarChart(percent: number, size: number) {
  const syms = '░▒▓█';

  const frac = Math.floor((size * 3 * percent) / 100);
  const barsFull = Math.floor(frac / 3);
  if (barsFull >= size) {
    return syms.substring(3, 4).repeat(size);
  }
  const semi = frac % 3;

  return [syms.substring(3, 4).repeat(barsFull), syms.substring(semi, semi + 1)]
    .join('')
    .padEnd(size, syms.substring(0, 1));
}
