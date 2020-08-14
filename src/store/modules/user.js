import apis from "../../servers/system/user";
//state
const state=()=>{
    return{
        userListData:[],
        permissionList:[],
        userRoleList:[]
    }
};

const mutations = {
    // 获取用户列表
    SETUSERLIST(state, payload) {
        state.userListData =payload.user;
        state.userRoleList = payload.role;
    },
    // 删除用户
    DELEATELIST(state,payload){
        payload.map(res=>{
            state.userListData = state.userListData.filter(item => item.id != res);
        });
    },
    // 获取用户权限列表
    SETPERMISSIONLIST(state,payload){
        state.permissionList = payload.permissions;
    }
};

const actions = {
    // 获取用户列表
     async getUserList({state,commit,dispatch},params) {
        let res = await apis.getUserList(params);
        if(res.code===0){
            commit("SETUSERLIST",res.data);
        }
        return res;
    },
    // 添加用户
    async adduser({state,commit,dispatch},params){
         let res = await apis.addUser(params);
         if(res.code===0){
             dispatch('getUserList',{
                 page:1,
                 limit:10
             });
         }
         return res;
    },
    // 删除用户
    async deleteUser({state,commit,duispatch},params){
         let res = await apis.deleteUset(params);
         if(res.code===0){
             commit('DELEATELIST',params.ids);
         }
    },
    // 更新用户
    async updateUser({state,commit,dispatch},params){
         let res = await apis.updateUser(params);
         if(res.code===0){
             dispatch('getUserList',{
                 page:1,
                 limit:10
             });
         }
         return res;
    },
    // 获取用户权限列表
    async getPermissionList({state,commit},params){
         let res = await apis.getPermissionList(params);
         if(res.code===0){
             commit('SETPERMISSIONLIST',res.data);
         }
         return res;
    },
    // 更新用户权限列表
    async updateUserPermission({state,commit},params){
        return await apis.updateUserPermission(params);
    },
    // 更新用户角色
    async updateUserRole({state,commit,dispatch},params){
        let res =  await apis.updateUserRole(params);
        if(res.code===0){
            dispatch('getUserList',{
                page:1,
                limit:10
            });
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
