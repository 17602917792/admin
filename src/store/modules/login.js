import apis from "../../servers/login";
//state
const state=()=>{
    return{

    }
};

const mutations = {
    SETUSERINFO(state, payload) {
        let { name } = payload;
        localStorage.setItem('userName',name);
    },
    REMOVEUSERINFO(state,payload){
        localStorage.removeItem('userName');
    }
};

const actions = {
    // 用户登录
    async userLogin({state,commit,dispatch},params) {
        let res = await apis.login(params);
        if(res.error_code===0){
            commit("SETUSERINFO",res.response_data);
        }
        return res;
    },
    // 用户退出
    async logout({state,commit,dispatch},params){
         let res = await apis.logout(params);
         if(res.code === 0){
            commit("REMOVEUSERINFO");
         }
         return res;
    }
};


const getters = {

};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
