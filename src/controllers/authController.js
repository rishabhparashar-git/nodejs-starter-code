const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

// @desc    Register admin user
// @route   POST /api/auth/admin/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Validate email & password
  if (!email || !password || !name) {
    return next(
      new ErrorResponse("Please provide a valid email, password and name", 400)
    );
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(new ErrorResponse("Email already registered", 400));
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  sendTokenResponse(user, 200, res);
});

// @desc    Login admin user
// @route   POST /api/auth/admin/loginc
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return next(
        new ErrorResponse("Please provide an email and password", 400)
      );
    }

    // Check for user
    const user = await User.findOne({ email }).select(
      "name email password active"
    );

    if (!user) {
      console.log("User not found!!");
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Check if user is active or not
    if (!user.active) {
      return next(
        new ErrorResponse(
          "Your account is not active yet, please contact the admin.",
          401
        )
      );
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      console.log("Incorrect Password!!");
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("Internal server error", 500));
  }
});

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
// @body    { currentPassword, newPassword }
exports.changePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  console.log({ currentPassword }, { newPassword });

  if (!currentPassword || !newPassword) {
    return next(
      new ErrorResponse("Please provide current password and new password", 400)
    );
  }

  const user = await User.findById(req.user.id).select("password");

  const isMatch = await user.matchPassword(currentPassword);

  if (!isMatch) {
    return next(new ErrorResponse("Current password is incorrect", 401));
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  res.status(statusCode).json({
    success: true,
    user,
    token,
  });
};
