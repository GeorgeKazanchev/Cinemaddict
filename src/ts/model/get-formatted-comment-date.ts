const addPadStart = (value: number): string => value.toFixed().padStart(2, '0');

const getFormattedCommentDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = addPadStart((date.getMonth() + 1));
  const day = addPadStart(date.getDate());
  const hours = addPadStart(date.getHours());
  const minutes = addPadStart(date.getMinutes());
  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

export default getFormattedCommentDate;
