import { post,get } from "../http";

const Login = "/api/login"; // 用户登录
const Logout = "/api/logout";// 用户退出

const apis = {
  login(params) {
    return post(Login,params);
  },
  logout(params){
    return get(Logout,params);
  }
};
export default apis;
