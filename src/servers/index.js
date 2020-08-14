import {get,post} from '../http';


const Menu = '/admin/api/menus';
const Channel = '/admin/channel';
const Game = '/admin/game';
const Service = '/admin/service';
const Level = '/admin/level';

const apis = {
    //获取菜单信息
    async getMenu(params){
        return await get(Menu,params);
    },
    //获取渠道信息
    async getChannel(params){
        return await get(Channel,params);
    },
    //获取游戏
    async getGame(params){
        return await get(Game,params);
    },
    //获取区服
    async getService(params){
        return await get(Service,params);
    },
    //获取等级
    async getLevel(params){
        return await get(Level,params);
    }
};

export default apis;