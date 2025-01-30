import { Rating } from './consts';

const getRatingClassname = (rating: number, baseClassname: string): string => {
  if (rating < Rating.MIN || rating > Rating.MAX) {
    throw new RangeError('An incorrect rating received');
  }

  if (baseClassname.length === 0) {
    throw new RangeError('The rating element classname is empty');
  }

  let classname = baseClassname;

  if (rating > Rating.POOR && rating <= Rating.AVERAGE) {
    classname += ` ${baseClassname}--average`;
  } else if (rating <= Rating.POOR) {
    classname += ` ${baseClassname}--poor`;
  }

  return classname;
};

export default getRatingClassname;
