const rateLimit = require("express-rate-limit");

// Define rate limiting middleware for the "login" route
const loginLimiter = rateLimit({

  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 5, // Maximum 5 requests per 15 minutes
  keyGenerator: (req) => {
    const userIp = req.ip;
    const laptopIdentifier = req.headers["x-laptop-identifier"]; // Assuming a custom header for the laptop identifier
    return laptopIdentifier ? `${userIp}-${laptopIdentifier}` : userIp;
  },
});

// Create a custom middleware to apply rate limiting only to the "login" route
const applyRateLimitToLoginRoute = (req, res, next) => {
  if (req.url.includes("login")) {
    
    return loginLimiter(req, res, next);
  }
  next();
};

module.exports = {
  applyRateLimitToLoginRoute,
};
