const bcrypt = require("bcrypt");
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");
const jwt = require("jsonwebtoken");

// ======encripted password==========
const EncodePassword = async (password) => {
  try {
    const hashPassword = bcrypt.hash(password, 10);
    return hashPassword;
  } catch (error) {
    console.log(`Bcrypt Error : ${error}`);
  }
};
// =======DeCode Hash Password=========
const deCodeHashPassword = async (InputPass, EncryptedPass) => {
  const PasswordResult = await bcrypt.compare(InputPass, EncryptedPass);
  return PasswordResult;
};
// ============Generate OTP=======
const MakeOTP = async () => {
  return aleaRNGFactory(new Date()).uInt32().toString().slice(0, 4);
};
// ======Accesstoken Genaerator=====
const GenerateAccessToken = async (Email) => {
  const AccessToken = await jwt.sign(
    {
      Email,
    },
    process.env.TOKEN_SECRECT,
    { expiresIn: process.env.TOKEN_EXPIRE_IN }
  );
  return AccessToken;
};

module.exports = {
  EncodePassword,
  deCodeHashPassword,
  MakeOTP,
  GenerateAccessToken,
};
