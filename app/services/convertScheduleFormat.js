const convertScheduleFormat = (arr) => {
  const result = [];
  arr.forEach(({ user, day, startedTime, endedTime, timeZone }) => {
    const existingEntry = result.find((entry) => entry.day === day);
    if (existingEntry) {
      existingEntry.time.push({ startedTime, endedTime });
    } else {
      result.push({
        user,
        day,
        timeZone,
        time: [{ startedTime, endedTime }],
      });
    }
  });
  return result;
};

export default convertScheduleFormat;
