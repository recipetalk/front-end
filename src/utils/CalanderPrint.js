export const CalanderPrint = time => {
  if (time === undefined) {
    return null;
  }
  return time.split('T')[0].replaceAll('-', '.');
};
