import axios from "axios";
const state = {
    adminName:localStorage.adminName,
    token:localStorage.token,
    adminLog:[],// 管理员登陆日志
}
const mutations = {
    CHANGE_ADMIN_LOG(state,adminLog){
        state.adminLog = adminLog;
    },
    CHANGE_ADMIN_TOKEN(state,{adminName,token}){
        state.adminName = localStorage.adminName =  adminName;
        state.token = localStorage.token = token;
    },
    OUT_LOGIN(state){
        localStorage.clear();
        state.adminName = state.token = null;
    },
    CHANGE_DELETE_TABLE() {
        this.dispatch("getAdminLog");
    }
}
const actions = {
    // 管理员登陆
    adminLogin({commit},{adminInfo}){
        return new Promise(async (resolve,reject)=>{
            const data = await axios.post("/adminLogin",adminInfo);
            if(data.ok===1){
                commit("CHANGE_ADMIN_TOKEN",data);
                resolve(data);
            }else{
                reject(data);
            }
        })
    },
    async getAdminLog({commit},pageIndex){
       //console.log(pageIndex);
        const data = await  axios.get("/adminLog",{
            params:{
                pageIndex
            }
        });
        commit("CHANGE_ADMIN_LOG",data.adminLog);
        commit("CHANGE_PAGE_INFO",data);
    },
    async  deleteTable({commit},_id){
        //根据接受的id操作数据库从而删除信息;
        const data = await axios.get("/deleteTable",{
            params:{
                _id
            }
        });
        if(data.ok==1){
            commit("CHANGE_DELETE_TABLE")
        }
    }
}
// 处理与你的管理员相关的操作。
export default {
    state,
    actions,
    mutations
}