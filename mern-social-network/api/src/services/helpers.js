export async function postValidator(req, res, next) {
  try {
    req.check("title", "Post must have a title").notEmpty();
    req.check("title", "Post title must be between 4 to 150 characters")
      .isLength({ min: 4, max: 150 });
    req.check("body", "Post must have a body").notEmpty();
    req.check("body", "Post body must be between 4 to 2000 characters")
      .isLength({ min: 4, max: 150 });

    const errors = await req.validationErrors();
    if (errors) {
      const firstError = errors.map(err => err.msg)[0];
      throw ({ statusCode: 400, message: firstError });
    }
    next();
  } catch (err) {
    console.log("[ERROR]:", err.message);
    let statusCode = 500;
    let detail = "Internal Server Error";
    if (err.statusCode) {
      statusCode = err.statusCode;
      detail = err.message;
    }
    res.status(statusCode).json({ status: "error", detail });
  }
}
