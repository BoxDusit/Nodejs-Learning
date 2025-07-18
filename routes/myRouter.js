const express = require('express')
const router = express.Router()
const path = require('path')
const Product = require('../models/products')
const multer = require('multer')

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/images/products')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+".jpg")
    }
})
const upload = multer({
    storage:storage
})


router.get('/',(req,res)=>{
    Product.find().exec((err,doc)=>{
        res.render('index',{products:doc});
    })
    
})

router.get('/addForm',(req,res)=>{
    res.render('form');
})

router.get('/manage',(req,res)=>{
    Product.find().exec((err,doc)=>{
        res.render('manage',{products:doc});
    })
})

router.post('/insert',upload.single("image"),(req,res)=>{
    
    let data = new Product({
         name: req.body.name,
         price: req.body.price,
         image: req.file.filename,
         description: req.body.description
    })

    Product.saveProduct(data,(err)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect('/')
        } 
    })
})
// ส่งออกโมดูล
module.exports = router;



//ส่งเเบบget
// router.get('/insert',(req,res)=>{
//     console.log(req.query) 
// })



// const indexPage = path.join(__dirname,"../templates/index.html")

// router.get("/",( req,res)=>{
//     res.status(200)
//     res.type('text/html')
//     res.sendFile(indexPage)
// })
// router.get("/product/:id",( req,res)=>{
//     const productID = req.params.id
//     if(productID === '1'){
//         res.sendFile(path.join(__dirname,"../templates/product1.html"))
//     }else if(productID === '2'){
//         res.sendFile(path.join(__dirname,"../templates/product2.html"))
//     }else if(productID === '3'){
//         res.sendFile(path.join(__dirname,"../templates/product3.html"))
//     }else{
//         res.redirect('/')
 
//     }
    
// })

