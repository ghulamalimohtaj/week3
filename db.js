//object destructuring
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client)=>{
    if(err){
        return console.log('Unable to connect to mongodb server.', err);
    }

    console.log('Successfully connected to MongoDB server!');



    var db = client.db('blog');



 
// deleting multiple documents 

/*   db.collection('posts').deleteMany({title: 'some title'})
    .then((result)=>{
        console.log(result);
    })
    .catch((err)=>{
        if(err){
            console.log('Unable to delete ', err);
        }
    })  */


/*  find one

    db.collection('posts').find({title: 'some title'}).toArray().then((docs)=>{
        console.log('Posts');
        console.log(JSON.stringify(docs, undefined, 2));
    }).catch((err)=>{
        console.log('unable to fetch posts ', err);
    }) 
    
*/



// inserting one document.
    
   /*  db.collection('posts').insertOne({

        title: 'Data Science',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe nostrum ullam eveniet pariatur voluptates odit, fuga atque ea nobis sit soluta odio, adipisci quas excepturi maxime quae totam ducimus consectetur? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius praesentium recusandae illo eaque architecto error, repellendus iusto reprehenderit, doloribus, minus sunt. Numquam at quae voluptatum in officia voluptas voluptatibus, minus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut consequuntur magnam, excepturi aliquid ex itaque esse est vero natus quae optio aperiam soluta voluptatibus corporis atque iste neque sit tempora!',
        author: 'Aziz Qadeer',
        date: new Date()
        
    }, (err, result)=>{
        if(err){
           return console.log('Unable to insert post');
     
        }

        console.log(JSON.stringify(result.ops, undefined,  2));

        client.close();

    });  */
 
 


 
})







