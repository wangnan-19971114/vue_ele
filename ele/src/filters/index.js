const filter={
    date(v){
        const data=new Date(v);
        return data.getFullYear()+"-"+
            (data.getMonth()+1).toString().padStart(2,"0")+"-"+
            (data.getDate()).toString().padStart(2,"0")+" "+
            (data.getHours()).toString().padStart(2,"0")+":"+
            (data.getMinutes()).toString().padStart(2,"0")+":"+
            (data.getSeconds()).toString().padStart(2,"0");
    }
}
export default {
    install(Vue){
        for(let key in filter){
            Vue.filter(key,filter[key])
        }
    }
}