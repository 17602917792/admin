import { get,post,put } from "../../http";

const RoleList = "/admin/role"; // 获取用户列表
const AddRole = "/admin/role/store"; // 添加用户
const DeleteRole = "/admin/role/destroy"; // 删除用户

const apis = {
    getRoleList(params) {
        return get(RoleList,params);
    },
    addRole(parmas){
        return post(AddRole,parmas);
    },
    deleteUset(params){
        return post(DeleteRole,params);
    },
    updateRole(params){
        return post(`/admin/role/${params.id}/update`,params);
    },
    getPermissionList(params){
        return get(`/admin/role/${params.id}/permission`,params);
    },
    updateRolePermission(params){
        return post(`/admin/role/${params.id}/assignPermission`,params);
    },
};
export default apis;
