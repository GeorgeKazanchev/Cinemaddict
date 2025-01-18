import { monthNames } from './consts';

const getFormattedReleaseDate = (date: Date): string => {
  const day = date.getDate().toFixed().padStart(2, '0');
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export default getFormattedReleaseDate;
