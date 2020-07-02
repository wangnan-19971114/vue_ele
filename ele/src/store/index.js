import Vue from 'vue'
import Vuex from 'vuex'
import admin from "./admin"
import shop from "./shop"
Vue.use(Vuex);

const state = {
    loading:false,
    pageInfo:{
        pageIndex:1,
        pageSum:1,//便是页面的初始值和初始的总页数
    },
};
const modules = {
    admin,
    adv:{},
    shop,
    shopType:{},
    goods:{},
    goodsType:{},
}
const mutations = {
    CHANGE_LOADING(state,bol){
        state.loading = bol;
    },
    CHANGE_PAGE_INFO(state,data){
        state.pageInfo.pageIndex=data.pageIndex
        state.pageInfo.pageSum=data.pageSum
    },
}
export default new Vuex.Store({
    state,
    mutations,
    actions: {},
    modules
})
