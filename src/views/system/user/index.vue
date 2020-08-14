<template>
  <div>
    <local-map @showModal="showModal" showType="list" />
    <div class="table-container">
      <com-search
        :searchConditionData="searchConditionData"
        @handleSearch="handleSearch"
        @handleReset="handleReset"
      ></com-search>
      <a-table
        :rowKey="record => record.id"
        :columns="columns"
        :dataSource="userListData"
        :loading="loading"
        :pagination="pagination"
        bordered
      >
        <span slot="organizationalUnits" slot-scope="text">{{text.join('-')}}</span>
        <template slot="operation" slot-scope="text, record, index">
          <div class="editable-row-operations">
            <a-button size="small" type="danger" @click="disable(record)">禁用</a-button>
            <a-button size="small" type="primary" @click="enable(record)">启用</a-button>
            <a-button size="small" type="primary" @click="showModal(record)">编辑</a-button>
            <a-popconfirm
              v-if="userListData.length"
              title="确认要删除此用户吗？"
              @confirm="() => onDelete(record,index)"
            >
              <a-button size="small" type="danger">删除</a-button>
            </a-popconfirm>
          </div>
        </template>
      </a-table>
      <a-modal :title="userModelTitle" :visible="visible" @ok="handleOk" @cancel="handleCancel">
        <a-form
          :form="form"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
          @submit="handleSubmit"
        >
          <a-form-item label="用户名">
            <a-input
              :disabled="editRecord.accountName?true:false"
              v-decorator="['accountName', {initialValue: editRecord.accountName, rules: [{ required: true, message: '请输入登录名' }] }]"
            ></a-input>
          </a-form-item>

          <a-form-item label="邮箱">
            <a-input
              :disabled="editRecord.email?true:false"
              v-decorator="['email', {initialValue: editRecord.email, rules: [{type: 'email',message: '请输入正确的邮箱'},{ required: true, message: '请输入邮箱' }] }]"
            ></a-input>
          </a-form-item>
          <a-form-item label="员工ID">
            <a-input
              :disabled="editRecord.employeeId?true:false"
              v-decorator="['employeeId', {initialValue: editRecord.employeeId, rules: [{ required: true, message: '请输入员工ID' }] }]"
            ></a-input>
          </a-form-item>
          <a-form-item label="姓名">
            <a-input
              :disabled="editRecord.givenName?true:false"
              v-decorator="['givenName', {initialValue: editRecord.givenName, rules: [{ required: true, message: '请输入昵称' }] }]"
            ></a-input>
          </a-form-item>
          <a-form-item label="组织单位">
            <a-cascader
              v-decorator="['organizationalUnits',{initialValue: editRecord.organizationalUnits,rules: [{required: true, message: '请输入员工当前所在部门' }]}]"
              :options="organizationalUnits"
            />
          </a-form-item>
          <a-form-item label="密码">
            <a-input-password
              v-decorator="['password', {rules: [{ required: userId==0?true:false, message: '请输入您的密码' }] }]"
            ></a-input-password>
          </a-form-item>
          <a-form-item label="确认密码">
            <a-input-password
              v-decorator="['password_confirmation', {rules: [{ required:  userId==0?true:false, message: '请确认密码' }] }]"
            ></a-input-password>
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>
<script>
import { get, post } from "../../../http";
import ComSearch from "@/components/ComSearch";
import LocalMap from "@/components/ComLocalMap";

const columns = [
  {
    title: "用户名",
    dataIndex: "accountName"
  },
  {
    title: "邮箱",
    dataIndex: "email"
  },
  {
    title: "员工Id",
    dataIndex: "employeeId"
  },
  {
    title: "昵称",
    dataIndex: "givenName"
  },
  {
    title: "组织单位",
    dataIndex: "organizationalUnits",
    scopedSlots: { customRender: "organizationalUnits" }
  },
  {
    title: "状态",
    dataIndex: "enabled"
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];
const searchConditionData = [
  {
    label: "用户名",
    name: "accountName",
    placeholder: "请输入用户名",
    type: "input"
  }
];
export default {
  name: "Event",
  data() {
    return {
      columns,
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "user" }),
      userModelTitle: "添加用户",
      visible: false,
      editRecord: {}, // 编辑展示用户信息
      userId: 0, // 用户编辑弹窗 0 表示添加用户  其他为编辑用户
      loading: false,
      searchConditionData,
      pagination: {},
      uId: -1,
      userListData: [],
      organizationalUnits: [] //级联
    };
  },
  components: {
    LocalMap,
    ComSearch
  },
  async mounted() {
    if (sessionStorage.getItem("organizationalUnits") == null) {
      this.OrgPost();
    } else {
      let org = JSON.parse(sessionStorage.getItem("organizationalUnits"));
      this.organizationalUnits = org;
    }
  },
  methods: {
    //搜索
    handleSearch(form) {
      form.validateFields((error, values) => {
        if (values.accountName === undefined) {
          this.$util.openNotification("请输入搜索关键词");
          return false;
        }
        this.userPost(values);
      });
    },
    handleReset(form) {
      form.resetFields();
      this.userPost();
    },
    // 搜索用户查询
    userPost(params) {
      post("/api/get_user", params).then(res => {
        this.loading = false;
        if (res.code == 0) {
          this.userListData = [];
          this.userListData = res.result;
          console.log("res=" + res.result);
        } else if (res.code == "10104") {
          this.userListData = [];
          this.$util.openNotification(res.message);
        }
      });
    },
    //  禁用
    disablePost(record) {
      let params = {
        accountName: record.accountName
      };
      post("api/disable", params).then(res => {
        console.log(res);
        if (res.code == 0) {
          record.enabled = "禁用";
        } else {
          this.$util.openNotification(res.message);
        }
      });
    },
    // 启用
    enablePost(record) {
      let params = {
        accountName: record.accountName
      };
      post("api/enable", params).then(res => {
        console.log(res);
        if (res.code == 0) {
          record.enabled = "启用";
        } else {
          this.$util.openNotification(res.message);
        }
      });
    },
    // 删除
    deletePost(record, index) {
      let params = {
        deleteName: record.accountName
      };
      post("api/delete", params).then(res => {
        if (res.code == 0) {
          this.userListData.splice(index, 1);
        } else {
          this.$util.openNotification(res.message);
        }
      });
    },
    //组织架构
    OrgPost() {
      post("api/get_ou").then(res => {
        console.log(res);
        if (res.code == 0) {
          this.loading = false;
          this.organizationalUnits = res.result;
          sessionStorage.setItem(
            "organizationalUnits",
            JSON.stringify(res.result)
          );
        } else {
          this.$util.openNotification(res.message);
        }
      });
    },
    //新增
    addPost(params) {
      post("api/register", params).then(res => {
        if (res.code == 0) {
          this.$util.openNotification(res.message, "success");
          this.visible = false;
          this.form.resetFields();
        } else {
          this.$util.openNotification(res.message);
          this.form.resetFields();
        }
      });
    },
    //编辑
    passwordPost(params,values) {
      post("api/edit", params).then(res => {
        console.log(res);
        if (res.code == 0) {
          this.$util.openNotification(res.message, "success");
          this.visible = false;
          this.form.resetFields();
          this.editRecord.organizationalUnits = values.organizationalUnits;
        } else {
          this.form.resetFields();
          this.$util.openNotification(res.message);
        }
      });
    },
    onSearch(value) {
      if (value !== "") {
        this.userPost(value);
        return;
      }
    },
    disable(record) {
      this.disablePost(record);
    },
    enable(record) {
      this.enablePost(record);
    },
    onDelete(record, index) {
      //删除此用户
      this.deletePost(record, index);
    },
    handleSubmit(e) {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("values of form: ", values);
        }
      });
      this.form.validateFields((err, values) => {
        // if (values.password !== values.password_confirmation) {
        //   this.$util.openNotification("请确定两次密码一样！");
        //   return false;
        // }
        if (!err) {
          this.loading = true;
          if (this.userId !== 0) {
            const params = {
              accountName: values.accountName,
              password: values.password,
              oldOrganizationalUnits: this.editRecord.organizationalUnits,
              newOrganizationalUnits: values.organizationalUnits
            };
            this.form.resetFields();
            this.passwordPost(params,values);
          } else {
            this.form.resetFields();
            this.addPost(values);
          }
          this.loading = false;
        }
      });
    },
    showModal(record) {
      this.visible = true;
      this.userId = 0;
      this.userModelTitle = `添加用户`;
      if (!record) {
        this.form.resetFields();
        this.editRecord = {};
      }
      if (record) {
        this.userModelTitle = `编辑用户`;
        this.userId = record.id;
        this.editRecord = record;
        this.form.resetFields();
      }
    },
    handleOk(e) {
      this.handleSubmit();
    },
    handleCancel(e) {
      this.visible = false;
    }
  }
};
</script>
<style>
th.column-money,
td.column-money {
  text-align: right !important;
}
</style>