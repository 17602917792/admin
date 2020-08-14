<template>
    <div>
     <a-menu
         theme="dark"
         mode="inline"
         v-model="current"
         :defaultOpenKeys="[defaultOpenKeys]"
         :inlineCollapsed="collapsed"
         @select="selectKeys"
     >
         <template v-for="(item,index) in menuDatas">
             <a-sub-menu :key="item.key" v-if="item.child">
                 <span slot="title"><a-icon :type="item.icon"></a-icon><span>{{item.name}}</span></span>
                 <template v-for="(list,j) in item.child">
                     <a-menu-item :key="'/'+list.url" >
                         <router-link :to="'/'+list.url">
                             <a-icon :type="list.icon"></a-icon>
                             <span>{{list.name}}</span>
                         </router-link>
                     </a-menu-item>
                 </template>
             </a-sub-menu>
             <template v-else>
                 <a-menu-item :key="'/'+item.url">
                     <router-link :to="'/'+item.url">
                         <a-icon :type="item.icon"></a-icon>
                         <span>{{item.name}}</span>
                     </router-link>
                 </a-menu-item>
             </template>
         </template>
     </a-menu>
    </div>
</template>
<script>
    export default {
        name:'Header',
        data(){
            return{
                current:[this.$route.meta.activePath],
                defaultOpenKeys:this.$route.meta.openPath?this.$route.meta.openPath:'sub1'
            }
        },
        props:{
            menuDatas:{
                type:Array,
                default:[]
            },
            collapsed:{
                type:Boolean,
                default: true
            }
        },
        watch:{
            '$route' () {
                this.current = [this.$route.meta.activePath]
            }
        },
        methods:{
            selectKeys(path){
                this.$emit('sendPath',path);
            }
        }
    }
</script>
<style lang="less" scoped>

</style>