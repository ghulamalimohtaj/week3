var express = require('express');
var path = require('path');
var methodOverride = require('method-override');
//install body parser to access request fields
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var db = require('./mongoosedb.js');
var Post = require('./models/post.js')
var Comment = require('./models/comment.js')


var app = express();
/* A template engine enables you to use static template files in your application. At runtime, the template engine replaces variables in a template file with actual values, and transforms the template into an HTML file sent to the client. */
app.set('view engine', 'pug');
app.use(methodOverride('_method'));// to be able to make PUT AND DELETE requests
app.set("views", path.join(__dirname, "views"));
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(urlencodedParser);
app.use(bodyParser.json());

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


app.get('/post/edit', function(req,res) {
  res.send('hello');
});

//find a specific post
app.get('/post/:id', function(req,res) {
  var commentss = '';
  Comment.find({post_id:req.params.id},(err,comm) => {
    commentss = comm;
  });
  Post.findById(req.params.id,function(err,post) {
    console.log(commentss);
    res.render('show',
    {post:post,comments:commentss})
  })
});

// Go on a specific comment in order to delete or update
app.get('/comment/:id', function(req,res) {
  Comment.findById(req.params.id,(err,comment)=> {
    if(err){
      conlose.log(err);
    }else{
      res.render('comment',{comment:comment});
    }
  });
});

app.put('/comment/:id', function(req,res) {
  Comment.findByIdAndUpdate(req.params.id,req.body,{useFindAndModify:false})
   .then(data=>{
       if(!data){
           res.status(404).send({message:"could not update"})
       }else{
         res.redirect('/post/'+req.body.post_id);
       }
   })
   .catch(error=>{
       res.status(500).send({message:"Error!!!"})
   })
 });

app.delete('/comment/:id', function(req,res) {
  Comment.findByIdAndDelete(req.params.id, function(err,result) {
    if(err){
      console.log(err);
    }else{
      res.redirect('/post/'+req.body.postId);
    }
  });
});


app.get('/about', function(req, res){
  res.render('about')
});

app.get('/contact', function(req, res){
  res.render('contact')
});



//simple adding document.
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
      res.redirect('/');
  })
})

app.post('/comment', function(req,res) {
  var comment = new Comment({
    comment:req.body.comment,
    post_id:req.body.post_id,
    posted: new Date()
  })
  comment.save((err,comment) => {
    if(err){
      console.log(err);
    }else{
      console.log(comment);
      res.redirect('/');
    }
  });

});


app.listen(8888);