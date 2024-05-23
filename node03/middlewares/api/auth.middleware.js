const { User, Blacklist } = require("../../models/index");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.get("Authorization")?.split(" ")[1];
  const response = {};
  if (!token) {
    Object.assign(response, {
      status: 401,
      message: "Unauthorized",
    });
  } else {
    try {
      const existToken = await Blacklist.findOne({ where: { token } });
      if (existToken) {
        throw new Error("Token in blacklist");
      }
      const { JWT_SECRET } = process.env;
      const { userId, exp } = jwt.verify(token, JWT_SECRET);
      // console.log(decoded);
      const { dataValues: user } = await User.findByPk(userId, {
        attributes: { exclude: ["password", "refresh_token"] },
      });
      if (!user) {
        throw new Error("User not exist");
      }

      req.user = { ...user, accessToken: token, expired: new Date(exp * 1000) };
      return next();
    } catch (e) {
      console.log(e);
      Object.assign(response, {
        status: 401,
        message: "Unauthorized",
      });
    }
  }
  res.status(response.status).json(response);
};
