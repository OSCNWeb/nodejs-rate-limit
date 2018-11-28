var express = require('express')
var redis = require('redis')
var client = redis.createClient('6379','10.100.181.26')
var app = express()

app.get('/', function(req, res){
		//res.send('hello world')
		client.set('hello','world',redis.print)
		client.get('hello', function(error, result){
				if(error){
					console.log(error)
					throw error
				}
				console.log('GET result ->'+ result);
		})
		res.send('hello world')
})

client.on('connect', function(){
    console.log('Redis Client Connected');
});


app.listen(7777, function() {
	console.log('app is listening on port 7777')
})

