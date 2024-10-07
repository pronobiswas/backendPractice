const { ApiError } = require("../Utils/apiError");
const { apiResponse } = require("../Utils/apiResponse");
const { asyncHandeler } = require("../Utils/asyncHandeler");
const { EamilChecker, PasswordChecker } = require("../Utils/checker");
const { NewUserModel } = require("../Model/UserModel");
const {
  EncodePassword,
  MakeOTP,
  deCodeHashPassword,
  GenerateAccessToken,
} = require("../Helpers/helper");
const { SentMail } = require("../Utils/sentMail");

// ======CookiesOption========
const options = {
  httpOnly: true,
  secure: true,
};

// ==========regestetion Controler========
const createUserControler = asyncHandeler(async (req, res) => {
  try {
    // =======Distuct data from body=====
    const {
      FirstName,
      LastName,
      Email,
      TelePhone,
      City,
      PostCode,
      Token,
      Password,
      Role,
    } = req.body;
    // ===========validation=======
    if (!FirstName) {
      return res
        .status(404)
        .json(new ApiError(false, null, 400, `FirstName Missing !!`));
    }
    if (!LastName) {
      return res
        .status(404)
        .json(new ApiError(false, null, 400, `LastName Missing !!`));
    }
    if (!TelePhone) {
      return res
        .status(404)
        .json(new ApiError(false, null, 400, `TelePhone Missing !!`));
    }
    if (!Email || !EamilChecker(Email)) {
      return res
        .status(404)
        .json(
          new ApiError(
            false,
            null,
            400,
            `Email_Adress Missing or Invalid Eamil  !!`
          )
        );
    }
    if (!Password || !PasswordChecker(Password)) {
      return res
        .status(404)
        .json(
          new ApiError(
            false,
            null,
            400,
            `Password Missing or Minimum eight characters, at least one uppercase letter, one lowercase letter and one number !!`
          )
        );
    }
    // ========find user on database isExist!User=====
    const ExisUser = await NewUserModel.find({
      $or: [{ Email: Email }, { TelePhone: TelePhone }],
    });
    // ========return user if Exist=========
    if (ExisUser?.length) {
      return res
        .status(404)
        .json(new ApiError(false, null, 400, `User alredy exixt !!`));
    }
    // ======Encoded password ====
    const hashpassword = await EncodePassword(Password);
    // create a new users in database
    const ExamUser = await new NewUserModel({
      FirstName,
      LastName,
      Email,
      TelePhone,
      Password: hashpassword,
    }).save();
    // ======generate otp/Make OTP=========
    const otp = await MakeOTP();
    // =========sent veryfication Mail=========
    const sentMailInfo = await SentMail(FirstName, Email, otp);
    // ========set otp in database=========
    if (ExamUser || sentMailInfo || otp) {
      // now set the opt
      await NewUserModel.findOneAndUpdate(
        {
          _id: ExamUser._id,
        },
        {
          $set: { OTP: otp },
        },
        {
          new: true,
        }
      );
    }
    // =========call/show recent create user=========
    const recentCreateUser = await NewUserModel.find({
      $or: [{ TelePhone }, { Email }],
    }).select("-Password ");
    return res
      .status(200)
      .json(
        new apiResponse(
          true,
          recentCreateUser,
          200,
          null,
          "Registration  sucesfull"
        )
      );

    // return res
    //   .status(200)
    //   .json(new apiResponse(true, null, 200, null, "Registration  sucesfull"));
  } catch (error) {
    console.log("asyncHandeler Error");
    return res
      .status(404)
      .json(
        new ApiError(
          false,
          null,
          400,
          `Registration Controller Error:  ${error} !!`
        )
      );
  }
});

// ============login Controler=============
const logInControler = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !EamilChecker(Email)) {
      return res
        .status(404)
        .json(
          new ApiError(
            false,
            null,
            400,
            `Email_Adress Missing or Invalid Eamil  !!`
          )
        );
    }
    if (!Password || !PasswordChecker(Password)) {
      return res
        .status(404)
        .json(
          new ApiError(
            false,
            null,
            400,
            `Password Missing or Minimum eight characters, at least one uppercase letter, one lowercase letter and one number !!`
          )
        );
    }
    // ==find User==
    const FindUser = await NewUserModel.findOne({ Email: Email });
    // ==password veryfing==
    const PasswordIsValid = await deCodeHashPassword(
      Password,
      FindUser?.Password
    );
    // ==========GenerateAccessToken==========
    const Token = await GenerateAccessToken(Email);
    // ===========set token in database======
    if (PasswordIsValid) {
      await NewUserModel.findOneAndUpdate(
        {
          _id: FindUser?._id,
        },
        {
          $set: { Token: Token },
        },
        {
          new: true,
        }
      );
    }
    // ========recentCreateUser=====
    const recentCreateUser = await NewUserModel.findOne({
      Email: Email,
    }).select("-Password -OTP -Token");
    // =======set token In cookies=====
    if (PasswordIsValid) {
      return res
        .status(200)
        .cookie("AccessToken", Token, options)
        .json(
          new apiResponse(true, recentCreateUser, 200, null, "login  sucesfull")
        );
    }
  } catch (error) {
    console.log(`logIn Controler Error : ${error}`);
    return res
      .status(404)
      .json(
        new ApiError(
          false,
          null,
          400,
          `logInControler Controller Error:  ${error} !!`
        )
      );
  }
};

// ========OTP Controler========
const MatchOTPcontroler = async (req, res) => {
  try {
    const { Email, OTP } = req.body;
    // =======validation=====
    if (!Email || !OTP) {
      return res
        .status(404)
        .json(
          new ApiError(
            false,
            null,
            400,
            `Email_Adress Missing or Invalid OTP  !!`
          )
        );
    }
    // ============Checking User=========
    const ExistUser = await NewUserModel.findOne({
      $or: [{ Email: Email }, { OTP: OTP }],
    });
    // ============matching  OTP==========
    if (OTP == ExistUser.OTP) {
      ExistUser.OTP = null;
      await ExistUser.save();
      return res
        .status(200)
        .json(new apiResponse(true, 200, null, "OTP veryfied"));
    } else {
      console.log("match kori nai");
      return res
        .status(404)
        .json(new ApiError(false, null, 400, `OTP Doesn't Match!!`));
    }
    
  } catch (error) {
    console.log(`OTP Controler Error : ${error}`);
    return res
      .status(404)
      .json(
        new ApiError(false, null, 400, `OTP Controller Error:  ${error} !!`)
      );
  }
};

module.exports = { createUserControler, logInControler, MatchOTPcontroler };
