export default function getOffsetGMT() {
  function isSingleDigit(n: number) {
    return `${n < 10 ? '0' : ''}${n}`;
  }
  let offset = new Date().getTimezoneOffset();
  const sign = offset < 0 ? '+' : '-';
  offset = Math.abs(offset);
  return sign + isSingleDigit(offset / 60 || 0);
}
