export const capitalizeString = (string: string, goSpeedy?: boolean) => {
  /**
   * for fun, really no need to pre-optimize; did it for fun + as a learning exercise
   * refrain from doing this sort of thing until necessary in a prod app
   * Runs in 0(n) time & O(n) space
   */
  if (goSpeedy) {
    let capitalizedString = '';
    let isLastCharSpace = true;

    for (let idx = 0; idx < string.length; idx++) {
      const currentChar = string[idx];

      if (currentChar === ' ') {
        isLastCharSpace = true;
        capitalizedString += currentChar;
        continue;
      }

      if (isLastCharSpace) {
        capitalizedString += currentChar.toUpperCase();
        isLastCharSpace = false;
        continue;
      }

      capitalizedString += currentChar.toLowerCase();
    }

    return capitalizedString;
  }

  // complexity is based on browser, possibly O(n * delimiter.length) or best case O(4n) (still O(n))
  // https://stackoverflow.com/questions/33483793/big-o-of-javascript-built-in-split-function
  return string
    .toLowerCase()
    .split(' ')
    .map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(' ');
};
