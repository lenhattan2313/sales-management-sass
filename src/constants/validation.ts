// Validation rules and limits
export const VALIDATION_RULES = {
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBERS: true,
    REQUIRE_SPECIAL_CHARS: true,
  },
  EMAIL: {
    MAX_LENGTH: 254,
  },
  PRODUCT: {
    NAME_MIN_LENGTH: 3,
    NAME_MAX_LENGTH: 100,
    DESCRIPTION_MIN_LENGTH: 10,
    DESCRIPTION_MAX_LENGTH: 2000,
    SKU_MAX_LENGTH: 50,
    PRICE_MIN: 0,
    PRICE_MAX: 999999.99,
  },
  ORDER: {
    NOTES_MAX_LENGTH: 500,
    CUSTOMER_NAME_MAX_LENGTH: 100,
    ADDRESS_MAX_LENGTH: 200,
  },
  FILE_UPLOAD: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp", "image/gif"],
    ALLOWED_DOCUMENT_TYPES: [
      "application/pdf",
      "text/csv",
      "application/vnd.ms-excel",
    ],
    MAX_IMAGES_PER_PRODUCT: 10,
    MAX_FILES_PER_UPLOAD: 5,
  },
} as const;

// Error messages for validation
export const VALIDATION_MESSAGES = {
  PASSWORD: {
    TOO_SHORT: "Password must be at least 8 characters long",
    TOO_LONG: "Password must be less than 128 characters",
    MISSING_UPPERCASE: "Password must contain at least one uppercase letter",
    MISSING_LOWERCASE: "Password must contain at least one lowercase letter",
    MISSING_NUMBER: "Password must contain at least one number",
    MISSING_SPECIAL: "Password must contain at least one special character",
  },
  EMAIL: {
    INVALID: "Please enter a valid email address",
    TOO_LONG: "Email address is too long",
    ALREADY_EXISTS: "An account with this email already exists",
  },
  PRODUCT: {
    NAME_TOO_SHORT: "Product name must be at least 3 characters long",
    NAME_TOO_LONG: "Product name must be less than 100 characters",
    DESCRIPTION_TOO_SHORT:
      "Product description must be at least 10 characters long",
    DESCRIPTION_TOO_LONG:
      "Product description must be less than 2000 characters",
    PRICE_INVALID: "Product price must be greater than 0",
    PRICE_TOO_HIGH: "Product price cannot exceed $999,999.99",
  },
  FILE: {
    TOO_LARGE: "File size must be less than 5MB",
    INVALID_TYPE: "File type not allowed",
    TOO_MANY_FILES: "Too many files uploaded",
  },
  REQUIRED: "This field is required",
  INVALID_FORMAT: "Invalid format",
} as const;
