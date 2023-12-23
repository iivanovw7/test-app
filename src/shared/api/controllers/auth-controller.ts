import { AuthService } from "../services";

class AuthController {
    private service: AuthService = new AuthService();

    public refresh = this.service.refresh;
    public logout = this.service.logout;
    public signup = this.service.signup;
    public login = this.service.login;
}

export default new AuthController();
