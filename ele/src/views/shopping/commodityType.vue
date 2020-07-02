<template>
    <div>
        <div id="table">
            <el-table :data="$store.state.shop.shopList" class="el_table" id="table">
                <!--:data：表示你要渲染的数据   是逐条显示出来的-->
                <el-table-column label="店铺id" width="182">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{scope.row._id}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="店铺名称" width="120">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{scope.row.shopName}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="店铺类型" width="120">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{scope.row.shopTypeName}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="$refs.shopCom.dialogFormVisible=true">添加商品类别</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="查看">
                    <template slot-scope="scope">
                        <el-button size="mini">查看商品类别</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="tools">
            <Pagination actions-name="getShopList"></Pagination>
        </div>
        <Commodty ref="shopCom"></Commodty>
    </div>
</template>
<script>
    export default {
        name:"commodityType",
        data(){
            return{
                dialogFormVisible: true,
                value:"",
                from:{
                    shopName:"",
                    shopTypeId:"",
                }
            }
        },
        methods:{
            getType(_id){
                console.log(_id)
            }
        }
    }
</script>
<style>
    #table{
       float:left;width:800px;
    }
    .tools{
        float:left;width:400px;
    }
</style>