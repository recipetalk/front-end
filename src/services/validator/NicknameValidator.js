export const NicknameValidator = username => {
  const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{4,10}$/;
  return regex.test(username);
};
