const { ApiError } = require("../Utils/apiError");
const { apiResponse } = require("../Utils/apiResponse");
const { asyncHandeler } = require("../Utils/asyncHandeler");
const { EamilChecker, PasswordChecker } = require("../Utils/checker");
const { NewUserModel } = require("../Model/UserModel");
const { EncodePassword, MakeOTP } = require("../Helpers/helper");
const { SentMail } = require("../Utils/sentMail");

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
    if(ExisUser?.length){
      return res
      .status(404)
      .json(
        new ApiError(
          false,
          null,
          400,
          `User alredy exixt !!`
        )
      );
    }
    // ======Encoded password ====
    const hashpassword =  await EncodePassword(Password);
    // create a new users in database
    const ExamUser = await new NewUserModel({
      FirstName,
      LastName,
      Email,
      TelePhone,
      Password: hashpassword,
    }).save();
    // ======generate otp/Make OTP=========
    const otp = MakeOTP();
    // =========sent veryfication Mail=========
    const sentMailInfo = await SentMail(FirstName,Email,otp);
    console.log(sentMailInfo);
    
    
    
    
    

    return res
      .status(200)
      .json(new apiResponse(true, null, 200, null, "Registration  sucesfull"));
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

module.exports = { createUserControler };
