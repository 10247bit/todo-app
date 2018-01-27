//var data = [{item:'Get some sleep'},{item:'Code for a bit'},{item:'manage your calender'}];
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});



var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds117158.mlab.com:17158/todo-netninja');
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo',todoSchema);


module.exports = function(app){

  app.get('/todo',function(req,res){
    //get data from mongodb
    Todo.find({},function(err,data){
      if(err) throw err;
      res.render('todo',{todos:data});
    });


  });

  app.post('/todo',urlencodedParser,function(req,res){
    // add item to the mongodb
    var newtodo= Todo(req.body).save(function(err,data){
      if(err) throw err;
      res.json(data);
    });

  });

  app.delete('/todo/:item',function(req,res){
    //delete item from the mongodb
    Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
      if(err) throw err;
      res.json(data);

    });
  });
}
