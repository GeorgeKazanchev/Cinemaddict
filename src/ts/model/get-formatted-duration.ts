const getFormattedDuration = (durationMinutes: number): string => {
  if (durationMinutes < 0) {
    throw new RangeError(`Duration = ${durationMinutes} minutes is not a positive`);
  }

  const hours = Math.floor(durationMinutes / 60);
  const minutes = Math.floor(durationMinutes - hours * 60);

  let formattedDuration = '';
  if (hours >= 1) {
    formattedDuration += `${hours.toFixed(0)}h `;
  }

  formattedDuration += `${minutes.toFixed(0)}m`;
  return formattedDuration;
};

export default getFormattedDuration;
