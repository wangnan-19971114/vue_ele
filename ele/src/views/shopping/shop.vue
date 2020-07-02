<template>
        <div>
            <div>
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-input placeholder="请输入商店的名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="$refs.shopCom.dialogFormVisible=true">添加商店</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div>
                <AddShop ref="shopCom"></AddShop>
            </div>
            <div>
                <el-table :data="$store.state.shop.shopList" class="el_table" id="table">
                    <!--:data：表示你要渲染的数据   是逐条显示出来的-->
                    <el-table-column label="_id" width="180">
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{scope.row._id}}</span>
                            <!--scope.row.createTime    就是你需要渲染的数据库中的登陆的时间-->
                        </template>
                    </el-table-column>
                    <el-table-column label="添加时间" width="180">
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{scope.row.shopTime}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="店铺名称" width="180">
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{scope.row.shopName}}</span>
                            <!--scope.row.createTime    就是你需要渲染的数据库中的登陆的时间-->
                        </template>
                    </el-table-column>
                    <el-table-column label="店铺类型" width="180">
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{scope.row.shopTypeName}}</span>
                            <!--scope.row.createTime    就是你需要渲染的数据库中的登陆的时间-->
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="店铺图片"
                            width="180">
                        <template slot-scope="scope">
                            <!--<img :src="'/ele/'+scope.row.shopTypePic" class="el_img">-->
                            <el-image
                                    style="width: 100px;"
                                    :src="'/ele/'+scope.row.shopPic"
                                    :preview-src-list="['/ele/'+scope.row.shopTypePic]">
                            </el-image>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini">编辑</el-button>
                            <el-button size="mini" type="danger" @click="deleteTable(scope.row._id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="tools">
                <Pagination actions-name="getShopList"></Pagination>
            </div>
        </div>
</template>

<script>
    export default {
        name:"shop",
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
            deleteTable(_id){
                this.$store.dispatch("getdeleteShopeName",_id);
            }
        }
    }
</script>

<style scoped>
#table{
    width:1050px;
}
</style>