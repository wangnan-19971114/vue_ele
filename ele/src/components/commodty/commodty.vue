<template>
    <el-dialog title="添加商品店铺" :visible.sync="dialogFormVisible">
        <el-form ref="myForm" :model="form">
            <el-form-item label="商店名称" prop="shopName" label-width="120px">
                <el-input v-model="form.shopList" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品类别名称" prop="shopName" label-width="120px">
                <el-input v-model="form.shopName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品类别图片" label-width="120px">
                <el-upload
                        class="upload-demo"
                        name="shopListPic"
                        ref="upload"
                        :on-success="success"
                        :data="form"
                        :headers="{authorization:$store.state.admin.token}"
                        action="/ele/shopList"
                        :auto-upload="false"
                        :multiple="false"
                        :limit="1"
                        list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm">提 交</el-button>
        </div>
    </el-dialog>
</template>
<script>
    export default {
        name: "add-shop",
        data(){
            return {
                form:{
                    shopName:"",
                    shopList:"",
                },
                dialogFormVisible:false
            }
        },
        methods:{
            success({data}){
               // console.log(data);
                let arr=data.params;
                //console.log(data.params.shopList);
                this.$refs.myForm.resetFields();
                this.dialogFormVisible=false;
                this.$store.dispatch("getShopNameList",arr);
            },
            submitForm(){
                this.$refs.upload.submit();
            }
        },
        mounted(){

        }
    }
</script>