<template>
    <a-breadcrumb class="local-map">
        <a-breadcrumb-item v-for="item in data">{{item}}</a-breadcrumb-item>
    </a-breadcrumb>
</template>
<script>
    export default {
        name:'localMap',
        data(){
            return{

            }
        },
        props:{
            data:{
                type:Array,
                default:[]
            }
        }
    }
</script>
<style lang="less" scoped>
    .local-map{
        padding-bottom: 6px;
        border-bottom: 1px solid #ccc;
    }
</style>