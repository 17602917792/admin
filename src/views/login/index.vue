<template>
    <div class="login-contianer">
        <router-link to="/" class="logo"></router-link>
        <div class="login-form">
            <div class="login-title">登录</div>
            <a-form
                :form="form"
                @submit="handleSubmit"
            >
                <a-form-item>
                    <a-input
                        v-decorator="[
                          'accountName',
                          { rules: [{ required: true, message: '请输入用户名' }] },
                        ]"
                        placeholder="请输入用户名"
                    ><a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"></a-icon>
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-input-password
                        v-decorator="[
                          'password',
                          { rules: [{ required: true, message: '请输入密码' }] },
                        ]"
                        type="password"
                        placeholder="请输入密码"
                    ><a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"></a-icon>
                    </a-input-password>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type="submit">
                        登录
                    </a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>
<script> 
    import { mapState,mapMutations,mapActions,mapGetters } from 'vuex';
    export default {
        data() {
            return {
                form: this.$form.createForm(this, { name: 'login' }),
            };
        },
        methods: {
            ...mapActions('login',['userLogin','logout']),
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    console.log(err,values)
                    if(!err){
                        console.log(values)
                        if(values.accountName=="admin"&&values.password=="admin"){
                             let redirect = decodeURIComponent(this.$route.query.redirect || '/admin/user');
                               setTimeout(()=>{
                                    this.$router.push({
                                        path:'/admin/user'
                                    });
                                },1000);
                        }else{
                            this.$util.openNotification("登录失败");
                        }
                    }
                    // if (!err) {
                    //     this.userLogin(values).then(res=>{
                    //         if(res.code===0){
                    //             let {result:{givenName}} = res;
                    //             localStorage.setItem('userName',givenName);
                    //             let redirect = decodeURIComponent(this.$route.query.redirect || '/admin/user');
                    //             this.$notification['success']({
                    //                 message: '登录成功！',
                    //                 duration: 1,
                    //             });
                    //             setTimeout(()=>{
                    //                 this.$router.push({
                    //                     path: redirect
                    //                 });
                    //             },1000);
                    //         }else{
                    //              this.$util.openNotification(res.message);
                    //         }
                    //     });
                    // }
                });
            }
        }
    };
</script>
<style lang="less" scoped>
   .login-contianer{
       .pa();
       height: 100%;
       width: 100%;
       overflow: hidden;
       padding:12px 36px;
       background: url("/assets/images/login_bg.jpg") no-repeat center top;
       background-size: cover;
       .logo{
           display: block;
           width: 239px;
           height: 70px;
           background: url("/assets/images/logo_b.png") no-repeat left center;
       }
   }

   .login-form{
       margin: 150px auto 0;
       padding: 50px 64px 30px;
       width: 450px;
       background: #fff;
       box-shadow: 0 6px 30px 0 rgba(0,0,0,.15);
       border-radius: 8px;
       .login-title{
           .fs(32px,#363636);
           line-height: 45px;
           font-weight: 700;
           text-align: center;
           padding-bottom: 50px;
       }
       .ant-btn{
           .lh(40px);
           width: 100%;
       }
   }
</style>