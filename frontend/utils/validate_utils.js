export const name = value => {
  let result = {
    valid: value.length !== 0,
    messeage: null
  }
  if (!result.valid) result.message = "What's your name?";

  return result;
};

export const password = value => {
  let result = {
    valid: value.length !== 0,
    messeage: null
  }
  if (!result.valid) result.message = "Enter a combination of at least six numbers, letters and punctuation marks (like ! and &).";

  return result;
};

export const email = value => {
  let result = {
    valid: value.length !== 0,
    messeage: null
  }

  if (!result.valid) {
    result.message = "You'll use this when you log in and if you ever need to reset your password.";
    // return result;
  }
  
  
  return result;
};

export const isValidEmail = value => {
  const firstSlice = value.split("@");

  if (firstSlice.length !== 2 || firstSlice[1].length === 0) {
    return false;
  }
  
  const secondSlice = firstSlice[1].split(".");
  return secondSlice.length === 2 && secondSlice[1].length > 0;
}

export const reEmail = (value, otherValue) => {
  let result = {
    valid: value.length !== 0,
    message: null
  }

  if (!result.valid || value !== otherValue) {
    result.message = "Your emails do not match. Please try again.";
  }

  return result
}