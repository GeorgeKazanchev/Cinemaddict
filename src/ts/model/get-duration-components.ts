type DurationComponents = {
  hours: number;
  minutes: number;
};

const getDurationComponents = (durationMinutes: number): DurationComponents => {
  if (durationMinutes < 0) {
    throw new RangeError(`Duration = ${durationMinutes} minutes is not a positive`);
  }

  const hours = Math.floor(durationMinutes / 60);
  const minutes = Math.floor(durationMinutes - hours * 60);

  return {
    hours,
    minutes,
  };
};

export default getDurationComponents;
