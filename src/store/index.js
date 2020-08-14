import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state =()=>{
  return {

    collapsed:false, // 折叠
    roleName:''
  }
};

const mutations = {
  UPDATECOLLAPSED(state){
    state.collapsed = !state.collapsed;
  },
  UPDATEROLENAME(state,payload){
    state.roleName = payload;
  }
};

const actions = {

};

const getters = {

};

const debug = process.env.NODE_ENV !== 'production';

//自动注册modules中所有的store
const modules = require.context('./modules/',false,/\w+\.js$/).keys().reduce((modules,fileName) => {
  // 剥去文件名开头的 `'./` 和结尾的扩展名
  let name = fileName.replace(/^\.\/(.*)\.\w+$/, '$1');
  modules[name] = require('./modules/' + name).default || {};
  return modules;
},{});

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules,
  strict: debug,
  //plugins: debug ? [createLogger()] : []
})
