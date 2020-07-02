<template>
    <el-pagination
            background
            :page-count="$store.state.pageInfo.pageSum"
            @current-change="changeCurrent"
            layout="prev, pager, next"
    >
    </el-pagination>
</template>

<script>
    export default {
        name: "pagination",
        props:["actionsName"],
        methods:{
            changeCurrent(pageIndex=1){
                this.$store.dispatch(this.actionsName,{pageIndex})
            }
        },
        mounted(){
            this.changeCurrent();
        }
    }
</script>

<style scoped>

</style>