const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith("/alquran")) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
    });
  } else {
    res.status(err.statusCode).render("error", {
      title: `Somthing went very wrong!`,
      msg: err.message,
    });
  }
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  sendErrorDev(err, req, res);
};
