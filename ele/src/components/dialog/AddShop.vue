<template>
    <el-dialog title="添加店铺" :visible.sync="dialogFormVisible">
        <el-form ref="myForm" :model="form">
            <el-form-item label="店铺名称" prop="shopName" label-width="120px">
                <el-input v-model="form.shopName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="店铺类别" prop="shopTypeId" label-width="120px">
                <el-select v-model="form.shopTypeId" placeholder="请选择店铺类别">
                    <el-option v-for="item in $store.state.shop.allShopTypeList" :label="item.shopTypeName" :value="item.shopTypeName   "></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="店铺类别图片" label-width="120px">
                <el-upload
                        class="upload-demo"
                        name="shopPic"
                        ref="upload"
                        :on-success="success"
                        :data="form"
                        :headers="{authorization:$store.state.admin.token}"
                        action="/ele/shopName"
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
                    shopTypeId:""
                },
                dialogFormVisible:false
            }
        },
        methods:{
            success(res){
                this.$refs.myForm.resetFields();
                this.dialogFormVisible=false;
                this.$store.dispatch("getShopList")
            },
            submitForm(){
                this.$refs.upload.submit();
            }
        },
        mounted(){
           if(this.$store.state.shop.allShopTypeList.length===0){
               this.$store.dispatch("getAllShopTypeList");
           }
        }
    }
</script>

<style scoped>

</style>