<template>
    <div>
        <div>
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                    <el-input placeholder="请输入商店的类别"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="$refs.addShopType.dialogFormVisible=true">添加商店类别</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <AddShopTypeTwo ref="addShopType"></AddShopTypeTwo>
        </div>
        <div>
            <el-table :data="$store.state.shop.shopTypeList" class="el_table">
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
                        <span style="margin-left: 10px">{{scope.row.shopTypeTime | date}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="类型名称" width="180">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{scope.row.shopTypeName}}</span>
                        <!--scope.row.createTime    就是你需要渲染的数据库中的登陆的时间-->
                    </template>
                </el-table-column>
                <el-table-column
                        label="类型图片"
                        width="180">
                    <template slot-scope="scope">
                        <!--<img :src="'/ele/'+scope.row.shopTypePic" class="el_img">-->
                        <el-image
                                style="width: 100px;"
                                :src="'/ele/'+scope.row.shopTypePic"
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
            <Pagination actions-name="getShopType"></Pagination>
        </div>
    </div>
</template>
<!--action为上传的地址
                            limit上传的最大个数
                            file-list上传的文件列表
                            multiple是否可以多选
                            -->

<script>
    export default {
        name: 'shopType',
        data(){
            return {
               // dialogFormVisible: false,
                form:{
                    shopTypeName:""
                }
            }
        },
        methods:{
            deleteTable(_id){
                this.$store.dispatch("getdeleteShop",_id)
            }
        },
    }
</script>
<style>
.el_table{
    width:880px;
}
    .el_img{
        width:100px;
    }
</style>
