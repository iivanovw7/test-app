import { UserService } from "../services";

class UserController {
    private service: UserService = new UserService();

    public count = this.service.count;
    public getMe = this.service.getMe;
}

export default new UserController();
