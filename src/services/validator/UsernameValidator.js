export const UsernameValidator = username => {
  const regex = /^[a-zA-Z0-9]{6,16}$/;
  return regex.test(username);
};
