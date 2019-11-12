import { get, post } from "../http";

const Init = "/admin/init";

const apis = {
  // 获取用户信息
  getInit(params) {
    return get(Init,params);
  }
};
export default apis;
