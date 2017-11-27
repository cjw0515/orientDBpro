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


//CREATE
/*
var sql = 'SELECT FROM TOPIC'
db.query(sql).then(function(result){
  console.log(result);
})
*/
//파라미터 주기
/*
var sql = 'SELECT FROM TOPIC WHERE @RID=:RID';
var param = {
  params:{
    RID:'#26:0'
  }
};
db.query(sql,param).then(function(result){
  console.log(result);
})
*/
//INSERT
/*
var sql = 'INSERT INTO TOPIC(title, description) VALUES(:title, :desc)'
var param = {
  params:{
    title:'express',
    desc:'express is framework for web'
  }
}
db.query(sql, param).then(function(results){
  console.log(results);
});
*/
//update
/*
var sql = 'update topic set title = :title where @rid = :rid'
var param = {
  params : {
    title:'express2',
    rid : '#26:1'
  }
}
db.query(sql,param).then(function(results){
  console.log(results);
})
*/
//delete
var sql = 'delete from topic where @rid = :rid';
var param ={
  params : {
    rid : '#26:1'
  }
}
db.query(sql, param).then(function(results){
  console.log(results);
})
