//Kế thừa
const Transformer = require("../core/transformer");
class UserTransformer extends Transformer {
    response(instance) {
        return {
          UID: instance.id,
          nameUser: instance.name,
          email: instance.email,
          status: instance.status,
          //add statusText
          statusText: instance.status ? "Kích hoạt" : "Chưa kích hoạt",
          createdAt: instance.created_at,
          updatedAt: instance.updated_at,
        };
    }
}

module.exports = UserTransformer;