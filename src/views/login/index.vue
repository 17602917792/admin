<template>
  <div class="login-container">
  <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="login-form"
    @submit="handleSubmit"
  >
    <a-form-item>
      <h2>登录</h2>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'username',
          { rules: [{ required: true, message: '请输入您的用户名！' }] },
        ]"
        placeholder="请输入您的用户名"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码！' }] },
        ]"
        type="password"
        placeholder="请输入密码"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-checkbox
        v-decorator="[
            'remember',
            {
              valuePropName: 'checked',
              initialValue: true,
            },
          ]"
      >
        记住我
      </a-checkbox>
      <a-button type="primary" html-type="submit" class="login-form-button">
        登录
      </a-button>
    </a-form-item>
  </a-form>
  </div>
</template>
<script>
export default {
    name:"login",
    data(){
        return{

        }
    },
    beforeCreate() {
        this.form = this.$form.createForm(this, { name: 'normal_login' });
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                }
            });
        },
    },
}
</script>
<style scoped lang="less">
  @import "../../assets/css/reset";
  .login-container{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    min-height: 100%;
    background: #f0f2f5 url("../../assets/images/background.svg") no-repeat 50%;
    background-size: 100%;
    padding:240px 0 144px;
    .login-form{
      width: 320px;
      margin: 0 auto;
    }
    h2{
      .fs(36px,#333);
      text-align: center;
    }
    .login-form-button{
      width: 100%;
    }
  }
</style>
