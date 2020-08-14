<template>
    <div id="components-form-demo-advanced-search" class="search-container">
        <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
            <template v-for="(item,index) in searchConditionData">
                <a-form-item :label="`${item.label}`" :key="index" class="form-item" v-if="item.type==='input'">
                    <a-input
                            v-decorator="[`${item.name}`]"
                            :placeholder="`${item.placeholder}`"></a-input>
                </a-form-item>
                <a-form-item :label="`${item.label}`" :key="index" class="form-item" v-if="item.type==='select' && item.option[0]">
                    <a-select
                            showSearch
                            :placeholder="`${item.placeholder}`"
                            v-decorator="[`${item.name}`, {initialValue: item.option[0].id }]"
                            optionFilterProp="children"
                            style="width: 200px"
                            :key="index"
                            :filterOption="filterOption"
                    >
                        <a-select-option :value="list.id" v-for="(list,j) in item.option" :key="j">{{list.name}}</a-select-option>
                    </a-select>
                </a-form-item>
            </template>
            <a-button type="primary" html-type="submit">
                搜索
            </a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                重置
            </a-button>
        </a-form>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                form: this.$form.createForm(this, { name: 'advanced_search' }),
            }
        },
        props:{
            searchConditionData:{
                type:Array
            }
        },
        methods:{
            //select
            filterOption(input, option) {
                return (
                    option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
            },
            handleSearch(e){
                e.preventDefault();
                this.$emit('handleSearch',this.form);
            },
            handleReset(){
                this.$emit('handleReset',this.form);
            }
        }
    }
</script>
<style lang="less">
    .search-container{
        .ant-advanced-search-form {
            padding: 24px 24px 0;
            .form-item,.ant-col,button{
                display: inline-block;
                vertical-align: middle;
            }
            button{
                margin: 0 0 24px 0;
            }
        }
        .ant-col{
            margin-right: 8px;
        }
    }
</style>