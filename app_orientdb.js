var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('views','./views_orientdb');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false}));

//==================db연결부분==========================
var OrientDB = require('orientjs');

var server = OrientDB({
  host: 'localhost',
  port:2424,
  username:'root',
  password:'root'
});
var db = server.use('o2');
/*
db.record.get('#26:0').then(function(record){
  console.log('loaded record:', record);
});
*/
//============================================
//라우트의 순서는 경우에따라서 중요할 수 있다.
app.get('/topic/add',function(req, res){
  var sql = 'select * from topic';
  db.query(sql).then(function(topics){
    if(topics.length === 0){ //결과값은 배열이기때문에
      console.log('there is no record.');
      res.status(500).send('Internal Serve Error');
    }
      res.render('add',{topics:topics});
  });
});

app.get(['/topic','/topic/:id'],function(req, res){
  var sql = 'select from topic';

  db.query(sql).then(function(topics){
    var id = req.params.id;
    //아이디값이 있다면 파라미터를 2개 넘겨줌.
    if(id){
      var sql = 'select * from topic where @rid=:rid';
      var param = {
        params:{
          rid:id
        }
      };
      db.query(sql,param).then(function(topic){
        res.render('view',{topics:topics,topic:topic[0]})
      });
    }else{
        res.render('view',{topics:topics});//정보전달
    }
  });
});

app.post('/topic/add',function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var sql = 'insert into topic (title, description, author)values(:title, :desc, :author)';
  var param = {
    params:{
      title:title,
      desc:description,
      author:author
    }
  }
  db.query(sql,param).then(function(results){
    //res.send(results[0]['@rid']);
    res.redirect('/topic/'+ encodeURIComponent(results[0]['@rid']));
  });
});
app.get('/topic/:id/edit',function(req, res){
  var sql = 'select from topic';
  var id = req.params.id;
  db.query(sql).then(function(topics){
    sql = 'select from topic where @rid=:id'
    var param = {
      params:{
        id:id
      }
    }
    db.query(sql,param).then(function(topic){
        res.render('edit',{topics:topics,topic:topic[0]});
    });
  })
});
app.post('/topic/:id/edit',function(req, res){
  var sql = 'UPDATE topic set title=:t, description=:d, author=:a where @rid=:id';
  var id = req.params.id;
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var param = {
    params:{
      t:title
      ,d:description
      ,a:author
      ,id:id
    }
  }
  db.query(sql,param).then(function(topics){
    res.redirect('/topic/'+encodeURIComponent(id));
  })
});

app.get('/topic/:id/delete',function(req, res){
  var sql = 'select from topic';
  var id = req.params.id;
  db.query(sql).then(function(topics){
    sql = 'select from topic where @rid=:id'
    var param = {
      params:{
        id:id
      }
    }
    db.query(sql,param).then(function(topic){
        res.render('delete',{topics:topics,topic:topic[0]});
    });
  })
});

app.post('/topic/:id/delete',function(req, res){
  var sql = 'delete from topic where @rid=:id';
  var id = req.params.id;
  var param = {
    params:{
      id:id
    }
  }
  db.query(sql,param).then(function(topics){
    res.redirect('/topic/');
  })
});



app.listen(3000, function(){
  console.log('connected 3000 port!')
})
