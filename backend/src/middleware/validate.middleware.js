const validate = (validator) => {
  return (req, res, next) => {
    try {
      validator(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default validate;