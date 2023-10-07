export const validateEmail = (email: string) => {
  let response = {
    valid: true,
    message: "",
  };

  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!email.match(validRegex)) {
    response.valid = false;
    response.message = "Please enter the correct email format";
  }

  return response;
};

export const validatePassword = (password: string) => {
  let response = {
    valid: true,
    message: "",
  };

  if (password.length < 8) {
    response.valid = false;
    response.message = "Enter a strong password: at least 8 characters long";
  }

  return response;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
) => {
  let response = {
    valid: true,
    message: "",
  };

  if (password !== confirmPassword) {
    response.valid = false;
    response.message = "Passwords don’t match";
  }

  return response;
};
