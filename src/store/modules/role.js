import apis from "../../servers/system/role";
//state
const state=()=>{
    return{
        roleListData:[],
        permissionList:[]
    }
};

const mutations = {
    // 获取角色列表
    SETROLELIST(state, payload) {
        state.roleListData =payload;
    },
    // 删除角色
    DELEATELIST(state,payload){
        payload.map(res=>{
            state.roleListData = state.roleListData.filter(item => item.id != res);
        });
    },
    // 获取角色权限列表
    SETPERMISSIONLIST(state,payload){
        state.permissionList = payload.permissions;
    }
};

const actions = {
    // 获取角色列表
     async getRoleList({state,commit,dispatch},params) {
        let res = await apis.getRoleList(params);
        if(res.code===0){
          return commit("SETROLELIST",res.data);
        }
    },
    // 添加角色
    async adduser({state,commit,dispatch},params){
         let res = await apis.addRole(params);
         if(res.code===0){
             dispatch('getRoleList',{
                 page:1,
                 limit:10
             });
         }
         return res;
    },
    // 删除角色
    async deleteRole({state,commit,duispatch},params){
         let res = await apis.deleteUset(params);
         if(res.code===0){
             commit('DELEATELIST',params.ids);
         }
    },
    // 更新角色
    async updateRole({state,commit,dispatch},params){
         let res = await apis.updateRole(params);
         if(res.code===0){
             dispatch('getRoleList',{
                 page:1,
                 limit:10
             });
         }
        return res;
    },
    // 获取角色权限列表
    async getPermissionList({state,commit},params){
         let res = await apis.getPermissionList(params);
         if(res.code===0){
             commit('SETPERMISSIONLIST',res.data);
         }
         return res;
    },
    // 更新用户权限列表
    async updateRolePermission({state,commit},params){
        return await apis.updateRolePermission(params);
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
