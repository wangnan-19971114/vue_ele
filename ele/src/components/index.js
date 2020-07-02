const components={
    Pagination:()=>import("@/components/compon/Pagination"),
    wang:()=>import("@/components/dialog/wang.vue"),
    AddShopTypeTwo:()=>import("@/components/dialog/AddShopTypeTwo.vue"),
    AddShop:()=>import("@/components/dialog/AddShop.vue"),
    Commodty:()=>import("@/components/commodty/commodty.vue")
};
export default {
    install(Vue){
        for(let key in components){
            Vue.component(key,components[key]);
        }
    }
}