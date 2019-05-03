const errHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.log(err);
  res.status(statusCode).json({
    type: 'error',
    message: err.message
  });
  next();
};

module.exports = { errHandler };
