<template>
    <div>
      <!--<div>  1234567wangnan</div>-->
        <div>{{msg}}</div>
        <button @click="getMsg">dianji</button>
    </div>
</template>

<script>
    export default {
        name:"wangnan-component",
        props:["msg"],
        data(){
          return{
              daa:"子传夫"
          }
        },
        methods:{
            name(){
//                console.log(23456);
//                console.log(this.wangName)
            },
            getMsg(){
                console.log(2343)
                this.$emit("getMsg",this.daa)
            }
        },
        mounted() {
            this.name()
        },
        props:{
            msg:{
                type:String
            }
        }
    }
</script>

<style>

</style>