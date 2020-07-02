<template>
    <!--添加各种类型的封装的模块-->

    <el-dialog title="添加店铺类别" :visible.sync="dialogFormVisible">
        <el-form :model="form">
            <el-form-item label="店铺类别名称" label-width="120px">
                <el-input v-model="form.shopTypeName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="店铺类别图片" label-width="120px">
                <el-upload
                        class="upload-demo"
                        name="shopTypePic"
                        ref="upload"
                        :data="form"
                        :headers="{authorization:$store.state.admin.token}"
                        action="/ele/shopType"
                        :auto-upload="false"
                        :multiple="false"
                        :on-success="success"
                        :limit="1"
                        list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false,form.shopTypeName=''">取 消</el-button>
            <el-button type="primary" @click="submitShopType">提  交</el-button>
        </div>
    </el-dialog>
</template>
<script>
    export default {
        name: 'add-shop-type-two',
        data(){
            return {
                dialogFormVisible: false,
                form:{
                    shopTypeName:""
                }
            }
        },
        methods:{
            submitShopType(){
                this.$refs.upload.submit();
            },
            success(res){
                //当图片上传成功时触发函数的运行
                let ok=(res.ok)/1
                if(ok===2 || ok===3){
                    //当你的takon失效时退出登录
                    this.$store.commit("OUT_LOGIN")
                }else{
                    //当图片上传成功时运行
                    this.$refs.upload.clearFiles();//图片上传成功之后将列表中的图片去掉
                    if(this.$route.name==="shopType"){
                        this.$store.dispatch("getShopType");
                    }else{
                        this.$route.push({name:"shopType"})
                    }
                }
            }
        },
    }
</script>