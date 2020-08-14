<template>
    <div class="local-map" :class="{'current':collapsed}">
        <div class="left-content display-inline">
            <h2 class="map-title">{{title}}</h2>
        </div>
        <div class="local-opreation">
            <template v-if="showType==='list'">
                <a-button type="primary" @click="showModal">添加</a-button>
                <!-- <a-button type="danger" @click="deleteList" >删除</a-button> -->
            </template>
            <template v-else-if="showType==='detail'">
                <a-button type="primary" @click="goBack"><a-icon type="arrow-left" />返回</a-button>
            </template>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex';
    export default {
        name:'LocalMap',
        data(){
            return{
                title:''
            }
        },
        props:{
            showType:{
                type:String
            }
        },
        mounted() {
            let { title } = this.$route.meta;
            this.title = title;
        },
        computed:{
            ...mapState(['collapsed'])
        },
        methods:{
            showModal(){
                this.$emit('showModal');
            },
            deleteList(){
                this.$emit('deleteList');
            },
            goBack(){
                this.$router.go(-1);//返回上一层
            }
        }
    }
</script>
<style lang="less" scoped>
    .local-map{
        position: fixed;
        left: 200px;
        top: 64px;
        z-index: 999;
        width: calc(100% - 200px);
        .lh(50px);
        border-bottom: 1px solid #e8e8e8;
        border-left: 1px solid #e8e8e8;
        background: #fff;
        overflow: hidden;
        transition: all .2s ease 0s;
        &.current{
            width:calc(100% - 80px);
            left: 80px;
        }
        .map-title{
            .fs(18px,#333);
            font-weight: bold;
            .lh(24px);
            margin-top: 13px;
            width: 120px;
            text-align: center;
            border-right: 1px solid #e8e8e8;
        }
        .local-opreation{
            .fr();
            margin-right: 16px;
            button{
                margin-left: 16px;
            }
        }
    }
</style>