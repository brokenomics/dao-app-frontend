const numberWithCommas = (number: number): string =>
  number
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
export default numberWithCommas;
