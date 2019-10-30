// TODO what is this file considered? utility? middleware? ???

function clientErrorHandler(error, req, res, next) {
  if (req.xhr) {
    console.log(`clientErrorHandler() req.xhr`, error);
    res.status(500).send({
      success: false,
      message: "An error occured",
      data: error
    });
  } else {
    next(error);
  }
}

function errorHandler(error, req, res, next) {
  console.log(`errorHandler() error`, error);
  res.status(500).send({
    success: false,
    message: "An error occured",
    data: error
  });
}

module.exports = {
  clientErrorHandler,
  errorHandler
};
