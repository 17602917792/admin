<template>
    <div>
        <local-map showType="detail"/>
        <div class="table-container">
            <h2 class="permission-title">用户 【{{roleName}}】分配直接权限，直接权限与角色拥有的角色权限不冲突</h2>
            <a-tree
                checkable
                :expandedKeys="expandedKeys"
                :autoExpandParent="autoExpandParent"
                v-model="checkedKeys"
                :selectedKeys="selectedKeys"
                showLine
                :treeData="treeData">
            </a-tree>
            <a-button type="primary" class="btn" @click="handleSubmit">确认</a-button>
        </div>
    </div>
</template>
<script>
    const treeData = [];
    import LocalMap from '@/components/ComLocalMap';
    import { mapState,mapActions } from 'vuex';
    export default {
        name:"Permission",
        data(){
            return {
                userId:-1,
                expandedKeys: [],
                autoExpandParent: true,
                checkedKeys: [],
                selectedKeys: [],
                treeData,
            }
        },
        components:{
            LocalMap
        },
        computed:{
            ...mapState('user',['permissionList']),
            ...mapState(['roleName'])
        },
        async mounted() {
            let { id } = this.$route.query;
            this.userId = id;
            let params = {
                id
            };
            await this.getPermissionList(params);
            this.renderCheckList();
        },
        watch: {
            checkedKeys(val) {
                console.log('onCheck', val);
            },
        },
        methods:{
            ...mapActions('user',['getPermissionList','updateUserPermission']),
            renderCheckList(){
              this.permissionList.map(item=>{
                  console.log(item)
                  if(item.own){
                      this.checkedKeys=[...this.checkedKeys,item.id.toString()];
                  }
                  if(item._child){
                      this.expandedKeys=[...this.expandedKeys,item.id.toString()];
                      this.treeData =[...this.treeData,{title:item.display_name,key:item.id.toString(),children:[]}];
                      item._child.map(item2=>{
                          if(item2.own){
                              this.checkedKeys=[...this.checkedKeys,item2.id.toString()];
                          }
                          this.treeData.map(value2 =>{
                              if(item.display_name===value2.title){
                                  if(item2._child){
                                      this.expandedKeys=[...this.expandedKeys,item2.id.toString()];
                                      value2.children = [...value2.children,{title:item2.display_name,key:item2.id.toString(),children:[]}];
                                          item2._child.map(item3 => {
                                              if(item3.own){
                                                  this.checkedKeys=[...this.checkedKeys,item3.id.toString()];
                                              }
                                              value2.children.map(value3 => {
                                                  if(item2.id.toString()===value3.key) {
                                                     value3.children=[...value3.children,{title: item3.display_name, key: item3.id.toString()}];
                                                  }
                                              })
                                          });
                                  }else{
                                      value2.children = [...value2.children,{title:item2.display_name,key:item2.id.toString()}]
                                  }
                              }

                          })
                      })
                  }else{
                      this.treeData=[...this.treeData,{title:item.display_name,key:item.id.toString()}]
                  }
              });
            },
            onCheck(checkedKeys) {
                this.checkedKeys = checkedKeys;
            },
            handleSubmit(){
                if(!this.checkedKeys.length){
                    this.$util.openNotification('请先分布权限');
                    return false
                }
                let params = {
                    permissions:this.checkedKeys,
                    id:this.userId
                };
                this.updateUserPermission(params).then(res=>{
                    if(res.code===0){
                        this.$util.openNotification('权限分布成功！','success');
                        this.$router.go(-1)
                    }
                });
            }
        }
    }
</script>
<style lang="less" scoped>
    .table-container{
        padding:16px 0;
    }
    .btn{
        margin:36px 50px;
    }
    .permission-title{
        .fs(24px,#333);
        border-bottom: 1px solid #ccc;
        padding:0 16px 16px;
    }
    .ant-tree{
        padding: 0 50px;
    }
</style>