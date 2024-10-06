const { ApiError } = require("../Utils/apiError");
const { apiResponse } = require("../Utils/apiResponse");
const { asyncHandeler } = require("../Utils/asyncHandeler");

const createUserControler = asyncHandeler(async (req, res) => {
  try {
    console.log("asyncHandeler kaj kortiche");
    return res
        .status(200)
        .json(
          new apiResponse(
            true,
            null,
            200,
            null,
            "Registration  sucesfull"
          )
        );
    
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
