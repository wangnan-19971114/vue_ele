export default [
    {
        path:"/adminLog",
        name:"adminLog",
        component:()=>import("@/views/admin/adminLog"),
        meta:{
            isAuthorization:true
        }
    }
]