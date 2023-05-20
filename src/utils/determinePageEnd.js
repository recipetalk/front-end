export const determinePageEnd = (responseSize, limit) => {
  if (responseSize === limit) {
    return false;
  } else {
    return true;
  }
};
