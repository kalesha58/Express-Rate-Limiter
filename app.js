const express = require("express");
const { applyRateLimitToLoginRoute } = require("./jwt");
const os = require("os");
const app = express();

const port = 5600;
const laptopIdentifier = os.hostname();

app.use(applyRateLimitToLoginRoute);
app.use((req, res, next) => {
  res.header("x-laptop-identifier", `${laptopIdentifier}`);

  next();
});
// const customKeyGenerator = (req) => {
//   console.log(req.ip);
//   return req.ip;
// };
// const limit = rateLlimit({
//   windowMs: 15 * 60 * 1000,
//   max: 5,
//   keyGenerator: customKeyGenerator,
// });
// app.use(limit);
app.get("/login", function (req, res) {
  res.json([{ id: 1, title: "kalesha" }]);
});
app.listen(port, () => console.log(`App listen port ${port}`));
