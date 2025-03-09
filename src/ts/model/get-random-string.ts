const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const getRandomString = (length: number): string => {
  if (!Number.isInteger(length) || length <= 0) {
    throw new RangeError(`Cannot get a random string with the length ${length.toString()}`);
  }

  let str = '';
  for (let i = 0; i < length; ++i) {
    const randomIndex = Math.floor(Math.random() * CHARS.length);
    str += CHARS[randomIndex];
  }
  return str;
};

export default getRandomString;
