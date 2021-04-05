
app.get('/', function(req, res){//0728501000
  
    Post.find((err, posts)=>{
        if(err){
          console.log('Error getting post');
        }
        console.log(posts);
        res.render('index', {
          posts: posts
        })
    })
  });
  
  app.get('/api', function(req, res){
    Post.find((err, posts)=>{
        if(err){
          console.log('Error getting post');
        }
        res.send(posts)
    })
  });
  
  
  // route for adding posts
  app.get('/post/create', function(req,res) {
    res.render('add');
  });
  app.put('/post/edit/:id', function(req,res) {
   Post.findByIdAndUpdate(req.params.id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:"could not update"})
        }else{
          console.log('ID: '+req.params.id +' was updated');
          res.redirect('/');
        }
    })
    .catch(error=>{
        res.status(500).send({message:"Error!!!"})
    })
  });
  app.delete('/post/delete/:id', function(req,res) {
    Post.findByIdAndDelete(req.params.id, function(err,docs) {
      if(err){
        console.log(err);
      }else{
        res.redirect('/');
      }
    });
  });
  app.get("/post/:id/edit", async(req,res)=>{
    Blog.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:"could not update"})
        }else{
            res.redirect('/');
        }
    })
    .catch(error=>{
        res.status(500).send({message:"Error!!!"})
    })
  });
  
  app.get('/post/edit', function(req,res) {
    res.send('hello');
  });
  //find a specific post
  app.get('/post/:id', function(req,res) {
    Post.findById(req.params.id,function(err,post) {
      res.render('show',
      {post:post})
    })
  });
  
  
  
  app.delete('/:id', function(req,res) {
    console.log(req.pamars.id);
  });
  // post data coming from add page
  
  
  
  app.get('/about', function(req, res){
    res.render('about')
  });
  
  app.get('/contact', function(req, res){
    res.render('contact')
  });

var express = require('express');
var postRouter = express();
app.post('/create', (req, res)=>{
    var post = new Post({
      title: req.body.title,
      body: req.body.blog,
      author: req.body.author,
      date: new Date()
    })
  
    post.save((err, post)=>{
        if(err){
          console.log(err);
        }
  
        console.log(post);
        res.redirect('/');
    })
  })
  module.exports = app;