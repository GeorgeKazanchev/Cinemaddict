import { MAX_DESCRIPTION_LENGTH, ELLIPSIS } from './consts';

const getLimitedDescription = (description: string): string => {
  if (description.length <= MAX_DESCRIPTION_LENGTH) {
    return description;
  }

  const limitedDescription = description.slice(0, MAX_DESCRIPTION_LENGTH - 1);
  return `${limitedDescription}${ELLIPSIS}`;
};

export default getLimitedDescription;
