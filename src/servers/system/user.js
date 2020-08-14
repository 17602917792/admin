import { get,post } from "../../http";

const UserList = "/admin/user"; // 获取用户列表
const AddUser = "/admin/user/store"; // 添加用户
const DeleteUser = "/admin/user/destroy"; // 删除用户

const apis = {
    getUserList(params) {
        return get(UserList,params);
    },
    addUser(parmas){
        return post(AddUser,parmas);
    },
    deleteUset(params){
        return post(DeleteUser,params);
    },
    updateUser(params){
        return post(`/admin/user/${params.id}/update`,params);
    },
    getPermissionList(params){
        return get(`/admin/user/${params.id}/permission`,params);
    },
    updateUserPermission(params){
        return post(`/admin/user/${params.id}/assignPermission`,params);
    },
    updateUserRole(params){
        return post(`/admin/user/${params.uId}/assignRole`,params);
    }
};
export default apis;
