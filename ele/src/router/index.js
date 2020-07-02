import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import admin from "./admin"
import shapping from "./shopping"
import store from "@/store"
Vue.use(Router)
const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        ...admin,
        ...shapping,
        ... [
            {
                path: '/',
                name: 'home',
                component: Home
            },
            {
                path: '/about',
                name: 'about',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: function () {
                    return import(/* webpackChunkName: "about" */ '../views/About.vue')
                }
            }
        ]
    ]
})
router.beforeEach((to,from,next)=>{
    if(to.meta.isAuthorization){
        if(localStorage.token){
            next();
        }else{
            store.commit("OUT_LOGIN");
        }
    }else{
        next();
    }

})
export default router;