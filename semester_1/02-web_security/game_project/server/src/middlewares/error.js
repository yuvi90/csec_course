// Error Middleware
export const errorMiddleware = (err, req, res, next) => {
  err.message ||= "Internal Server Error";
  err.statusCode ||= 500;

  if (err.name === "CastError") err.message = "Invalid ID";

  console.log(err);

  return res.status(err.statusCode).json({
    status: false,
    message: err.message,
  });
};
