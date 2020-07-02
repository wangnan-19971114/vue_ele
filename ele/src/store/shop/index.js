import axios from "axios";
const state={
    shopTypeList:[],
    allShopTypeList:[],
    shopList:[]
};
const mutations={
    CHANG_SHOP_TYPE_LIST(state,shopTypeList){
        state.shopTypeList=shopTypeList;
    },
    CHANG_DELETE_SHOP_TYPE(){
        this.dispatch("getShopType")
    },
    CHANGE_ALL_SHOP_LIST(state,data){
        state.allShopTypeList=data;
    },
    CHANGE_SHOP_LIST(state,data){
        state.shopList=data
    },
    CHANGE_DELEATE_SHOP_LIST(){
        this.dispatch("getShopList")
    }
};
const actions={
    async getAllShopTypeList({commit}){
        const {data}= await axios.get("/allShopType");
        let arr=[];
        console.log(data)
        commit("CHANGE_ALL_SHOP_LIST",data)
    },
    async getShopType({commit},obj={}){
        const {pageIndex}=obj;
        const data=await axios.get("/shopType",{
            params:{
                pageIndex
            }
        });
        commit("CHANG_SHOP_TYPE_LIST",data.shopTypeList);
        commit("CHANGE_PAGE_INFO",data);
    },
    async getShopList({commit},obj={}){
        const {pageIndex}=obj;
        const data=await axios.get("/shopName",{
            params:{
                pageIndex
            }
        });
        commit("CHANGE_SHOP_LIST",data.shopList);
        commit("CHANGE_PAGE_INFO",data);
    },
    async getdeleteShop({commit},id){
        const data=await axios.get("/deleShopType",{
            params:{
                id
            }
        })
        commit("CHANG_DELETE_SHOP_TYPE")
    },
    async getdeleteShopeName({commit},id){
        const data=await axios.get("/deleShopName",{
            params:{
                id
            }
        });
        commit("CHANGE_DELEATE_SHOP_LIST");
    },
    async getShopNameList({commit},data){
        console.log(data);
    }
}

;
export default {
    state,
    mutations,
    actions
}