export const CalanderPrint = time => {
  return time.split('T')[0].replaceAll('-', '.');
};
