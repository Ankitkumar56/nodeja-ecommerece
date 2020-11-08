const express= require('express');
const mongoose= require('mongoose');
const Order= mongoose.model('Order');

var router=express.Router();
mongoose.set('useFindAndModify',false);

router.get('/',(req,res)=>{
    res.render('menu');
});
router.get('/login',(req,res)=>{
     res.render('login');
});
router.get('/forget',(req,res)=>{
    res.render('forget');
});
router.get('/afterlogin',(req,res)=>{
    res.render('afterlogin');
});
router.get('/register',(req,res)=>{
    res.render('register');
});
router.get('/cart',(req,res)=>{
    res.render('cart');
});
router.get('/orders',(req,res)=>{
    res.render('orders');
});
router.get('/admin',(req,res)=>{
    Order.find((err,doc)=>{
    if(!err){
        res.render("admin",{order:doc});
    } else{ 
        console.log('Error in order:'+err);
    }
    });
});
router.get('/order/:id',(req,res)=>{
    Order.findById(req.params.id,(err,doc)=>{
    if(!err){
        console.log("orders",{order:doc});
    } else{
      console.log('Error FindById'+err);
    }
    });
});

router.get('/order/delete/:id',(req,res)=>{
    Order.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.redirect('/admin');
        } else{
            console.log('Error in delete:'+err);
        }
    });
});

//post methods

router.post('/cart',(req,res)=>{
    insertOrder(req,res);
});
router.post('/order',(req,res)=>{
    updateOrder(req,res);
});

function updateOrder(req,res){
    Order.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc)=>{
        if(!err){
            res.redirect('/admin');
        } else{
            console.log('Update error'+err);
        }
    });
}

function insertOrder(req,res){
    var d = new Date();
    var t=d.getTime();
    var counter=t;
    counter+=1;
    var order=new Order();
    order.total=req.body.total;
    order.order=counter;
    order.save((err,doc)=>{
        if(!err){
            console.log('order:'+order);
            res.redirect('/admin');
        } else {
            console.log('Error in insertOrder:'+err);
        }
    });
}

module.exports=router;

