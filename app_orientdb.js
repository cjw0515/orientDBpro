var express = require('express');
var app = express();

app.set('views','./views_orientdb');
app.set('view engine', 'jade');

//==================db연결부분==========================
//깃 테스트
var OrientDB = require('orientjs');

var server = OrientDB({
  host: 'localhost',
  port:2424,
  username:'root',
  password:'root'
});
var db = server.use('o2');
db.record.get('#26:0').then(function(record){
  console.log('loaded record:', record);
});
//============================================

app.get(['/topic','/topic/:id'],function(req, res){
  var sql = 'select from topic';
  db.query(sql).then(function(topics){
    res.render('view',{topics:topics});//정보전달
  });



})







app.listen(3000, function(){
  console.log('connected 3000 port!')
})
