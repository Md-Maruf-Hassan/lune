export function errorHandler(err, _req, res, _next) {
  const statusCode = Number(err.statusCode) || 500;

  // Do not expose internal error details in production.
  res.status(statusCode).json({
    success: false,
    message: statusCode >= 500 && process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message || "Internal server error"
  });
}