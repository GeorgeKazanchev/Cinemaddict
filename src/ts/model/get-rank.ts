const getRank = (watchedFilmsCount: number): string => {
  if (watchedFilmsCount < 0 || !Number.isInteger(watchedFilmsCount)) {
    throw new RangeError(`Watched films count ${watchedFilmsCount} is not a positive integer`);
  }

  if (watchedFilmsCount === 0) {
    return '';
  }

  if (watchedFilmsCount >= 1 && watchedFilmsCount <= 10) {
    return 'Novice';
  }

  if (watchedFilmsCount >= 11 && watchedFilmsCount <= 20) {
    return 'Fan';
  }

  return 'Movie buff';
};

export default getRank;
