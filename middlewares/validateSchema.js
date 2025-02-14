const Joi = require("joi");

const userValidationSchema = Joi.object({
  username: Joi.string().trim().min(3).max(30).required().messages({
    "string.empty": "Username cannot be empty",
    "string.min": "Username must be at least 3 characters long",
    "string.max": "Username cannot exceed 30 characters",
  }),

  password: Joi.string()
    .min(8)
    .max(72)
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
      )
    )
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base":
        "Password must include uppercase, lowercase, number, and special character",
    }),

  fullName: Joi.string().trim().min(2).max(50).required().messages({
    "string.empty": "Full Name cannot be empty",
    "string.min": "Full Name must be at least 2 characters long",
    "string.max": "Full Name cannot exceed 50 characters",
  }),

  email: Joi.string().trim().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
  }),

  gender: Joi.string().valid("Male", "Female").required().messages({
    "any.only": "Gender must be either 'Male' or 'Female'",
    "string.empty": "Gender is required",
  }),

  DateOfBirth: Joi.date().iso().required().messages({
    "date.base": "Invalid date format",
    "any.required": "Date of Birth is required",
  }),

  country: Joi.string().trim().required().messages({
    "string.empty": "Country is required",
  }),

  role: Joi.string().valid("User", "Admin").default("User"),
});

// Middleware for validation
function validateUser(req, res, next) {
  const { error } = userValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({
      errors: errorMessages,
    });
  }

  next();
}

module.exports = {
  validateUser,
};
