<template>
    <div class="search-container">
        <a-row :gutter="24">
            <a-form >
                <a-form-item label="" :label-col="{ span: 1 }" :wrapper-col="{ span: 4 }">
                    <a-select
                            showSearch
                            placeholder="请选择游戏"
                            optionFilterProp="children"
                            style="width: 200px"
                            @focus="handleFocus"
                            @blur="handleBlur"
                            @change="handleChange"
                            :filterOption="filterOption">
                        <a-select-option value="0">请选择游戏</a-select-option>
                        <a-select-option value="1">新楚留香</a-select-option>
                        <a-select-option value="2">五四超神</a-select-option>
                    </a-select>
                </a-form-item>
            </a-form>
        </a-row>
    </div>
</template>
<script>
    export default {
        name:'seatchForm',
        data(){
            return{

            }
        },
        methods:{
            handleChange(value) {
                console.log(`selected ${value}`);
            },
            handleBlur() {
                console.log('blur');
            },
            handleFocus() {
                console.log('focus');
            },
            filterOption(input, option) {
                return (
                    option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
                );
            },
        }
    }
</script>
<style lang="less" scoped>

</style>