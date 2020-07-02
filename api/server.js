const express = require("express");
const bodyParser = require('body-parser');
const db = require("./module/db");
const upPic=require("./module/upPic");
const tools = require("./module/tools");
const time = require("./module/time");
const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname+"/upload"));

app.get("reactEle",function(req,res){
    res.json({
        data:{
            a:1,
            b:2,
            c:3
        }
    })
})

app.get("/allShopType",async function(req,res){
    const data=await db.find("shopTypeList",{
        sort:{
            shopTypeTime:-1
        }
    });
    res.json({
        data
    })
});
app.post("/adminLogin", function (req, res) {
    /*
    * 1、先接收数据
    * 2、去数据库当中根据条件找到数据是否存在
    * 3、更新一下登陆的时间
    * 4、增加一条登陆日志
    * 5、登陆成功以后返回结果*/
    const {adminName, passWord} = req.body;
    db.findOne("adminList", {
        adminName,
        passWord: tools.md5(passWord)
    }).then(async (adminInfo) => {
        if (adminInfo) {
            // 存在 更新登陆的时间
            await db.updateOne("adminList", {
                _id: adminInfo._id
            }, {
                $set: {
                    loginTime: Date.now()
                }
            })
            // 增加一条登陆信息
            await db.insertOne("adminLog", {
                adminId: adminInfo._id,
                adminName: adminInfo.adminName,
                createTime: Date.now()
            })

            res.json({
                ok: 1,
                adminName,
                token: tools.enToken({
                    adminName
                })
            })
        } else {
            tools.json(res, -1, "管理员账号或密码错误")
        }

    }).catch(() => {// 异常
        tools.json(res);
    })

});
app.post("/sendCode",async function(req,res){
    const phoneId = req.body.phoneId;
    // 得到该手机号的验证码信息
    const codeInfo = await  db.findOne("phoneCode",{phoneId});
    let code = tools.getRandom(100000,999999);
    if(codeInfo){
        //发送过
        if((Date.now()-codeInfo.addTime)/1000>60){
            // 过期，发送验证码

            await db.updateOne("phoneCode",{phoneId},{
                $set:{
                    code,
                    addTime:Date.now()
                }
            });
            tools.sendCode(phoneId,code).then(()=>{
                res.json({
                    ok:1,
                    msg:"成功"
                })
            }).catch(()=>{
                res.json({
                    ok:-1,
                    msg:"发送失败"
                })
            })
        }else{
            // 未过期
            res.json({
                ok:-1,
                msg:"请稍后再发"
            })
        }
    }else{
        // 未发送过，发送验证码
        await db.insertOne("phoneCode",{
            code,
            phoneId,
            addTime:Date.now()
        })
        tools.sendCode(phoneId,code)
            .then(()=>tools.json(res,1,"成功"))
            .catch(()=>tools.json(res,-1,"发送失败"))
    }
});
/**********************************************************************/
app.all("*", function (req, res, next) {
    //判断项目中的请求是否是在deToken的有效时间内发出的
    const {ok, msg} = tools.deToken(req.headers.authorization);
    if (ok === 1) {
        next();
    } else {
        res.json({
            ok,
            msg
        })
    }
});
app.get("/adminLog", async function (req, res) {
    //根据传入的数据来判断页面现实的数据
    const pageSize=5;//每页中的显示最大的条数
    let pageIndex=(req.query.pageIndex || 1)/1//为当前页数
    const count = await db.count("adminLog", {});//count为数据库中的总条数
    let pageSum=Math.ceil(count/pageSize);//总页数
    if(pageSum<1) pageSum=1;
    if(pageIndex<1)pageIndex=1;
    if(pageIndex>pageSum)pageSum=pageIndex
    const adminLog = await  db.find("adminLog", {
        skip:(pageIndex-1)*pageSize,//跳过的条数
        limit:pageSize,//获取的条数
        sort: {
            createTime: -1//按照时间来进行排序
        }
    })
    res.json({
        ok: 1,
        adminLog,
        pageIndex,
        pageSum,
        count
    })


});


//添加商品类别
app.get("/shopType",async function(req,res){
    const results= await db.getPageInfo("shopTypeList",{
        pageIndex:(req.query.pageIndex || 1)/1,
        sort:{"shopTypeTime":-1},
        limit:3,
        resultsName:"shopTypeList",
    });
    res.json(results)
});
app.post("/shopType",async function(req,res){
    const data = await upPic.upPic(req,"shopTypePic");
    try{
        await db.insertOne("shopTypeList",{
            shopTypeName:data.params.shopTypeName,
            shopTypePic:data.newPicName,
            shopTypeTime:Date.now(),
        });
        tools.json(res,1,"添加成功")
    }catch(err){
        tools.json(res);
    }
});
app.get("/shopName",async function(req,res){
    const results= await db.getPageInfo("shopList",{
        pageIndex:(req.query.pageIndex || 1)/1,
        sort:{"shopTypeTime":1},
        limit:3,
        resultsName:"shopList",
    });
    res.json(results)
})
app.post("/shop",async function(req,res){
    const data= await upPic.upPic(req,"shopPic");
    try{//图片接收成功的话接受shopTypeList
        const shopTypeInfo= await db.findOneById("shopTypeList",data.params.shopTypeId);
        //shopTypeTnfo就是根据传过来类别id来查找到的类别名称
        await db.insertOne("shopList",{
            shopName:data.params.shopName,
            shopTypeId:shopTypeInfo._id,
            shopPic:data.newPicName,
            shopTypeName:shopTypeInfo.shoptTypeName,
            shopTime:time.getNowTime()
        });
        res.json({
            ok:1,
            msg:"添加成功"
        })
    }catch (err){
        //添加失败是触发
        tools.json(res);
    }
})
app.get("/deleteTable",function(req,res){
    //点击删除时删除数据库中的数据
    let id=req.query._id;
    db.deleteOneById("adminLog",id);
            res.json({
                ok:1,
                msg:"删除成功"
            })
});
app.get("/deleShopName",async function(req,res){
    let id=req.query.id;
    const data=await db.deleteOneById("shopList",id);
    res.json({
        ok:1,
        msg:"删除成功"
    })
})
app.get("/deleShopType",async function(req,res){
    let id=req.query.id;
   const data=await db.deleteOneById("shopTypeList",id);
    res.json({
       data
    })
})
app.post("/shopName", async function(req,res){
    //向数据库中添加图片
    //接受传来的图片 并将图片放入的指定的文件夹里
   const data= await upPic.upPic(req,"shopPic");
    try{//图片接收成功的话接受
        // console.log(data)
        await db.insertOne("shopList",{
            shopName:data.params.shopName,
            shopPic:data.newPicName,
            shopTime:time.getNowTime(),
            shopTypeName:data.params.shopTypeId
        });
        res.json({
            ok:1,
            msg:"添加成功"
        })
    }catch (err){
        //添加失败是触发
        tools.json(res);
    }
});
app.post("/shopList",async function(req,res){
    const data= await upPic.upPic(req,"shopListPic");
    await db.insertOne("shopName",{
        shopName:data.params.shopName,
        shopNamePic:data.newPicName,
        shopList:data.params.shopList,
    });
    res.json({
        data
    })
})
app.listen(80, function () {
    console.log("success");
});