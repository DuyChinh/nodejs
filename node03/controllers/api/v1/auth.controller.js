const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Blacklist } = require("../../../models/index");

module.exports = {
    login: async(req, res) => {
        const response = {};
        //Validate
        const { email, password} = req.body;
        if(!email && !password) {
            Object.assign(response, {
                status: 400,
                message: "Bad Request",
            })
        } else {
            const user = await User.findOne({where: {email}});
            if(!user) {
                Object.assign(response, {
                    status: 400,
                    message: "Bad Request",
                });
            } else {
                const result = bcrypt.compareSync(password, user.password);
                if(!result) {
                     Object.assign(response, {
                       status: 400,
                       message: "Bad Request",
                     });
                } else {
                    //Login success
                    const { JWT_SECRET, JWT_EXPIRE, JWT_REFRESH_EXPIRE } =
                      process.env;
                    const accessToken = jwt.sign({userId: user.id}, JWT_SECRET, {
                        expiresIn: JWT_EXPIRE,
                    });

                    const refreshToken = jwt.sign(
                      { data: new Date().getTime() + Math.random() },
                      JWT_SECRET,
                      {
                        expiresIn: JWT_REFRESH_EXPIRE,
                      }
                    );
                    await User.update(
                      {
                        refresh_token: refreshToken,
                      },
                      {
                        where: {
                          id: user.id,
                        },
                      }
                    );
                     Object.assign(response, {
                       status: 200,
                       message: "Success",
                       access_token: accessToken,
                     });
                }
            }
        }
        //Xác thực
        //So sánh hashpassword vs password
        //Save user in jwt

        res.status(response.status).json(response);
    },

    profile: async(req, res) => {
        const response = {
            status: 200,
            message: "Success",
            data: req.user,
        }
        res.status(response.status).json(response);
    },

    logout: async(req, res) => {
        //Đưa accesstoken vào blacklist -> Cấm sử dụng các token chưa hết hạn nhưng user không còn dùng đến nữa
        //3 nơi lưu blacklist 
        /**
         -database
         - file
         - 
         */
        const { accessToken, expired } = req.user;
        await Blacklist.findOrCreate({
            where: {token: accessToken},
            defaults: {
                token: accessToken,
                expired,
            }
        });

        res.status(200).json({
            status: 200,
            message: "Success",
        })
    },

    refresh: async(req, res) => {
        const { refresh_token: refreshToken } = req.body;
        const response = {};
        if(!refreshToken) {
            Object.assign(response, {
                status: 401,
                message: "Unauthorized",
            })
        } else {
            try {
                const {JWT_SECRET, JWT_EXPIRE} = process.env;
                jwt.verify(refreshToken, JWT_SECRET);
                const user = await User.findOne({
                    where: {
                        refresh_token: refreshToken,
                    }
                });
                if(!user) {
                    throw new Error("User not exist");
                }
                const accessToken = jwt.sign({ userId: user.id}, JWT_SECRET, {
                    expiresIn: JWT_EXPIRE,
                });
                Object.assign(response, {
                    status: 200,
                    message: "Success",
                })
            } catch {
                Object.assign(response, {
                    status: 401,
                    message: "Unauthorized",
                });
            }
        }
        res.status(response.status).json(response);
    }
}