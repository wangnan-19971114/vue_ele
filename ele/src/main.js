import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import components from "./components"
import Login from "./Login"
import ElementUI from 'element-ui';
import axios from "axios";
import filters from "@/filters"
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.use(filters);
Vue.use(components);
// 请求拦截,可以将请求的配置进行二次处理。
axios.interceptors.request.use(config=>{
    // config 是axios的配置信息.
    // console.log(config);
    if(localStorage.token){
        config.headers = {
            authorization:localStorage.token
        }
    }


    store.commit("CHANGE_LOADING",true);
    //重新给请求添加一个"ele"的开头
    config.url = "/ele"+config.url;
    return config;
})
// 响应拦截
axios.interceptors.response.use(({data})=>{
    // 返回的值即是axios得到的值
    store.commit("CHANGE_LOADING",false);
    if(data.ok === 2 || data.ok === 3){
        store.commit("OUT_LOGIN");
    }else{
        return data;
    }


});
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(store.state.admin.token?App:Login) }
}).$mount('#app');
