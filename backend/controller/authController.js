const authService = require("../services/authService");

class authController {
  static async GetAllUser(req, res) {
    await authService.GetAllUserService(req, res);
  }
  static async CreateUser(req, res) {
    await authService.CreateUserService(req, res);
  }
  static async LoginUser(req, res) {
    await authService.LoginUser(req, res);
  }
}
module.exports = authController;
