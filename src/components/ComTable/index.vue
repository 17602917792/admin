<template>
    <div class="com-table">
        <a-table
                :columns="columns"
                :dataSource="dataSource"
                :loading="loading"
                :pagination="pagination"
                :scroll="{ x: 1200 }"
                @change="handleTableChange"
        ></a-table>
    </div>
</template>
<script>
    export default {
        name:'Header',
        data(){
            return{

            }
        },
        props:{
            columns:{
                type:Array
            },
            dataSource:{
                type: Array
            },
            loading:{
                type:Boolean,
                default:false
            },
            pagination:{
                type:Object
            }
        },
        methods:{
            handleTableChange(pagination){
                this.$emit('handleTableChange',pagination);
            }
        }
    }
</script>
<style lang="less" scoped>

</style>