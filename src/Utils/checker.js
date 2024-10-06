const EamilChecker = (Email) => {
  const EmailRegex =
    /^[a-z0-9]+([._-][0-9a-z]+)*@[a-z0-9]+([.-][0-9a-z]+)*\.[a-z]{1,3}$/;
  const EmailResult = EmailRegex.test(Email);
  return EmailResult;
};

const PasswordChecker = (password = "Mern@2305") => {
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const PasswordResult = passwordRegex.test(password);
  return PasswordResult;
};

module.exports = { EamilChecker, PasswordChecker };