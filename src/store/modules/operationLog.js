import apis from "../../servers/system/operationLog";
//state
const state=()=>{
    return{
        operationLogListData:[]
    }
};

const mutations = {
    // 获取权限列表
    SETROLELIST(state, payload) {
        state.operationLogListData = payload;
    }
};

const actions = {
    // 获取权限列表
     async getOperationLogList({state,commit,dispatch},params={page:1}) {
        let res = await apis.getOperationLogList(params);
        if(res.code===0){
          commit("SETROLELIST",res.data);
          return res;
        }
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
