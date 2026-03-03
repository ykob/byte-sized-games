export const zeroPadding = (num: number, length: number) => {
  return ('0000000000' + num).slice(-length);
};
