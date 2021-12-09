/**
 * clone from https://github.com/matchai/waka-box
 */
export default function generateBarChart(percent: number, size: number) {
  const syms = '░▏▎▍▌▋▊▉█';

  const frac = Math.floor((size * 6 * percent) / 100);
  const barsFull = Math.floor(frac / 6);
  if (barsFull >= size) {
    return syms.substring(6, 7).repeat(size);
  }
  const semi = frac % 6;

  return [syms.substring(6, 7).repeat(barsFull), syms.substring(semi, semi + 1)]
    .join('')
    .padEnd(size, syms.substring(0, 1));
}
