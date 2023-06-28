export const PasswordValidator = password => {
  const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}/;
  return regex.test(password);
};
