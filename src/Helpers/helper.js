const bcrypt = require("bcrypt");
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");

// ======encripted password==========
const EncodePassword = async (password) => {
  try {
    const hashPassword = bcrypt.hash(password, 10);
    return hashPassword;
  } catch (error) {
    console.log(`Bcrypt Error : ${error}`);
  }
};

// ============Generate OTP=======
const MakeOTP = async () => {
  return aleaRNGFactory(new Date()).uInt32().toString().slice(0, 4);
};

module.exports = { EncodePassword, MakeOTP };
