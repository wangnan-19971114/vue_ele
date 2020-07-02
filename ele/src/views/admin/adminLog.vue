<template>

    <div>

            <el-button type="success" @click="$refs.addShopType.dialogFormVisible=true">添加商店类别</el-button>
        <AddShopTypeTwo ref="addShopType"></AddShopTypeTwo>
        <el-table :data="$store.state.admin.adminLog">
            <!--:data：表示你要渲染的数据   是逐条显示出来的-->
            <el-table-column label="日期" width="180">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{scope.row.createTime | date}}</span>
                    <!--scope.row.createTime    就是你需要渲染的数据库中的登陆的时间-->
                </template>
            </el-table-column>
            <el-table-column
                    label="管理者"
                    width="180">
                <template slot-scope="scope">
                    <i class="el-icon-user-solid"></i>
                    <span style="margin-left: 10px">{{scope.row.adminName}}</span>
                    <!--scope.row.createTime    就是你需要渲染的数据库中的登陆的时间-->
                    <!--scope    就是你需要渲染的数据所在的位置-->
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini">编辑</el-button>
                    <el-button size="mini" type="danger" @click="delTable(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                :current-page.sync="currentPage"
                @current-change="changeCurrent"
                layout="prev, pager, next"
                :page-count="$store.state.pageInfo.pageSum"
                >
            <!--current-page   表示页面显示的当前的页数-->
        </el-pagination>
        <div>{{wang}}2222222</div>
        <wang msg="wangnan12334" @getMsg="this.getDataChild"></wang>
    </div>
    <!--<div>-->
        <!--<AddShopTypeTwo ref="addShopType"></AddShopTypeTwo>-->
    <!--</div>-->
</template>

<script>
    import axios from "axios"
    // console.log($store.state)
    export default {
        name: "admin-log",
        data(){
            return{
              //  dialogFormVisible:false,
                currentPage:1,//分页器的当前显示的页数
                msg:"父子传值",
                twoMsg:"",
                wang:""
            }
        },
        methods:{
            changeCurrent(pageIndex=1){
                this.$store.dispatch("getAdminLog",pageIndex);
                console.log(this.$store.state.admin.adminLog)
            },
            delTable(_id){
                this.$store.dispatch("deleteTable",_id);
            },
            getTwoMsg(msg){
                console.log(msg,1111)
                this.twoMsg=msg
            },
            getDataChild(msg){
                this.wang = msg
            }
        },
        mounted(){
            // console.log($store.state.admin.adminLog)
            console.log(this.$store);
            this.changeCurrent()
        }
    }
</script>

<style scoped>
.el-table{
    width:800px;height:311px;
}

</style>