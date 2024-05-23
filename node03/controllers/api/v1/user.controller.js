const { User } = require("../../../models/index");
const { Op } = require("sequelize");
const { object, string } = require("yup");
const bcrypt = require("bcrypt");
const UserTransformer = require("../../../transformers/user.transformer");

module.exports = {
  index: async (req, res) => {
    const {
      order = "asc",
      sort = "id",
      status,
      q,
      limit,
      page = 1,
    } = req.query;
    const response = {};
    try {
      const filter = {};
      if (status === "true" || status === "false") {
        filter.status = status === "true";
      }

      if (q) {
        filter[Op.or] = {
          name: {
            [Op.iLike]: `%${q.trim()}%`,
          },
          email: {
            [Op.iLike]: `%${q.trim()}%`,
          },
        };
      }
      const options = {
        order: [["id", "desc"]],
        attributes: { exclude: "password" },
        where: filter,
      };

      if (limit && Number.isInteger(+limit)) {
        const offset = (page - 1) * limit;
        options.limit = limit;
        options.offset = offset;
      }

      const { count, rows: users } = await User.findAndCountAll(options);
      Object.assign(response, {
        status: 200,
        message: "Success",
        data: new UserTransformer(users),
        count,
      });
    } catch {
      Object.assign(response, {
        status: 500,
        message: "Server Error",
      });
    }
    res.status(response.status).json(response);
  },

  find: async (req, res) => {
    const { id } = req.params;
    const response = {};
    try {
      const user = await User.findByPk(id);
      if (!user) {
        const error = new Error("Not Found");
        error.status = 404;
        throw error;
      }
      Object.assign(response, {
        status: 200,
        message: "Success",
        data: user,
      });
    } catch (e) {
      if (e.status !== 404) {
        e.message = "Server Error";
        e.status = 500;
      }
      Object.assign(response, {
        status: e.status,
        message: e.message,
      });
    }
    res.status(response.status).json(response);
  },

  store: async (req, res) => {
    const response = {};
    //Validate
    const schema = object({
      name: string().required("Tên bắt buộc phải nhập"),
      email: string()
        .required("Email bắt buộc phải nhập")
        .email("Email không đúng đinh dạng"),
      password: string().required("Mật khẩu bắt buộc phải nhập"),
      status: string().test(
        "check-boolean",
        "Trạng thái không hợp lệ",
        (value) => {
          return value === "true" || value === "false";
        }
      ),
    });

    const body = req.body;
    try {
      const body = await schema.validate(req.body, {
        abortEarly: false,
      });
      body.password = bcrypt.hashSync(body.password, 10);
      const user = await User.create(body);
      Object.assign(response, {
        status: 200,
        message: "Success",
        data: user,
      });
      delete user.dataValues.password;
    } catch (e) {
      const errors = Object.fromEntries(
        e.inner.map((item) => [item.path, item.message])
      );
      Object.assign(response, {
        status: 400,
        message: "Bad Request",
        errors,
      });
    }
    res.status(response.status).json(response);
  },

  update: async (req, res) => {
    //Validate theo nguyên tắc: Có dữ liệu  --> Validate
    /*
    - Nếu fullname được gửi lên --> Check độ dài

    */
    const method = req.method;
    const { id } = req.params;

    const response = {};
    const rules = {};
    if(req.body.name) {
        rules.name = string().min(4, "Tên phải từ 4 ký tự");
    }

    if (req.body.email) {
      rules.name = string().email("Email đúng định dạng");
    }

    if (req.body.password) {
      rules.name = string().min(6, "Password phải từ 6 kí tự");
    }
    //Validate
    const schema = object(rules);

    // const body = req.body;
    try {
      const body = await schema.validate(req.body, {
        abortEarly: false,
      });
      if(body.password) {
        body.password = bcrypt.hashSync(body.password, 10);
      }

      if(method === "PUT") {
        body = Object.assign({
            name: null,
            email: null,
            status: null,
            password: null,
        },
        body,
        )
      }
    //   const user = await User.create(body);
      await User.update({where: {id}}, body);
      const user = await User.findByPk(id, {
        attributes: {
            exclude: password,
        }
      });
      Object.assign(response, {
        status: 200,
        message: "Success",
        data: user,
      });
      delete user.dataValues.password;
    } catch (e) {
    //   const errors = Object.fromEntries(
    //     e.inner.map((item) => [item.path, item.message])
    //   );
    console.log(e)
      Object.assign(response, {
        status: 400,
        message: "Bad Request",
        // errors,
      });
    }
    res.status(response.status).json(response);
  },
};
