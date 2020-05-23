var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var methodOverride = require("method-override");

mongoose.connect("mongodb+srv://g2440:opennow@cluster0-nrpz0.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true,  useUnifiedTopology: true });
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

var diarySchema = new mongoose.Schema({
    title : String,
    content : String,
    pic : String,
    author : String,
    date  : {type : Date , default:Date.now}
});

    var diary = mongoose.model("Diary",diarySchema);


app.get("/",function(req,res){
    res.locals.title = "HOME";
    diary.find({},function(err,diaries){
        if(err)
        console.log(err);
        else
        res.render("index",{ALLdiaries : diaries});
    });
});

app.get("/diary",function(req,res){
    res.locals.title = "HOME";
    diary.find({},function(err,diaries){
        if(err)
        console.log(err);
        else
        res.render("index",{ALLdiaries : diaries});
    });
});
app.get("/diary/new",function(req,res){
    res.locals.title = "New Page";
    res.render("new");
});
app.post("/diary",function(req,res){
    diary.create(req.body.diary,function(err,newdiary){
    if(err)
    console.log(err);
    else{
        console.log(req.body.diary);    
        res.redirect("/diary");
    }
})
});
app.get("/diary/:id",function(req,res){
    res.locals.title = "Show Page";
    diary.findById(req.params.id,function(err,diary){
        if(err)
        res.send(err);
        else 
        res.render("show",{diary:diary});
    })
});



app.get("/diary/:id/edit",function(req,res){
    res.locals.title = "EDIT PAGE";
    diary.findById(req.params.id,function(err,data){
        if(err)
        console.log(err);
        else
        res.render("edit",{diary:data});
    })
});
app.put("/diary/:id",function(req,res){
    res.locals.title = "SHOW PAGE";
    diary.findByIdAndUpdate(req.params.id,req.body.diary,function(err,newDiary){
        if(err)
        res.redirect("/show");
        
        else{
        var URL = "/diary/" + req.params.id;    
        res.redirect(URL);
        }
    });
});

app.get("/diary/:id/delete",function(req,res){
    res.locals.title = "DELETE PAGE";
    diary.findById(req.params.id,function(err,data){
        if(err)
        console.log(err);
        else
        res.render("delete",{diary:data});
    })
});

app.delete("/diary/:id",function(req,res){
    diary.findByIdAndDelete(req.params.id,function(err,pop){
        if(err)
        console.log(err);
        else 
        res.redirect("/diary");
    })
});

app.listen(process.env.PORT||8080,process.env.IP,function(){
    console.log("STARTED *-*");
});