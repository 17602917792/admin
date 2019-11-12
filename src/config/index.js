const env = "test";
const config = {
  //测试环境
  test: {
    API_URL: "http://debug.admin.00joy.com",
    HOST_URL: "",
    SIGN_URL: ""
  },
  //正式环境
  online: {
    API_URL: "http://sh.admin.00joy.com",
    HOST_URL: location.protocol + "//" + location.host,
    SIGN_URL: ""
  }
};
window.envConfig = config;
export default config[env];
