import { get,post} from "../../http";

const OperationLogList = "/admin/operationLog/data"; // 获取操作日志列表

const apis = {
    getOperationLogList(params) {
        return get(OperationLogList,params);
    }
};
export default apis;
