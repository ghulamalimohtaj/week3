var express = require('express');
var path = require('path');
var methodOverride = require('mothod-override');
//install body parser to access request fields
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var db = require('./mongoosedb.js');
var Post = require('./models/post.js')

var app = express();
/* A template engine enables you to use static template files in your application. At runtime, the template engine replaces variables in a template file with actual values, and transforms the template into an HTML file sent to the client. */
app.set('view engine', 'pug');
app.use(methodOverride('_method'));// to be able to make PUT AND DELETE requests
app.set("views", path.join(__dirname, "views"));
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(urlencodedParser);
app.use(bodyParser.json());

app.get('/', function(req, res){
  
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
app.put('/post', function(req,res) {
  console.log('put fired');
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

      console.log(post);
      res.redirect('/');
  })
})



app.listen(8888);