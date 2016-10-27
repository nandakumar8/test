var express = require('express');
var app = express();
var http=require('http');
var bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(express.static(__dirname + "/views"));
app.use('/js',express.static(__dirname + "/js"));
app.use('/data',express.static(__dirname + "/data"));
app.use('/views',express.static(__dirname + "/views"));
app.use('/styles',express.static(__dirname + "/styles"));
app.use('/node_modules',express.static(__dirname + "/node_modules"));
app.use('/controllers',express.static(__dirname + "/controllers"));
app.use('/services',express.static(__dirname + "/services"));
app.use('/data',express.static(__dirname + "/data"));
app.set('views', './views');


var impala=require('node-impala');

/*app.get('/',function(req,res){
res.sendFile('views/index.html', {root: __dirname });
});*/


app.get('/data',function(req,res){
var sql ="select day,country,c.countryname,publisherid,ma.accountname as publisher,sum(revenue) as revenue ,sum(cost) as cost,sum(paid_impressions) as paid_impressions,sum(total_impressions) as total_impressions,"+
" " +"sum(total_blocked_impressions) as total_blocked_impressions from rpt.kpidaily kpi"+
" " +"left join (select * from reference.countryiso where isactive = 1) c on kpi.country = c.countrythreedigit"+
" " +"left join reference.masteraccount ma on kpi.publisherid=ma.accountid "+
" "+"where day = date_sub(to_date(FROM_UNIXTIME(IUDF.DET_UNIX_TIMESTAMP())), 1) group by 1,2,3,4,5 limit 1000"
  console.log(sql);
	var client = impala.createClient();
	console.log(client);
	console.log("trying to connect");
	client.connect(
		{
			host:'10.210.50.11',
			port: 21000,
			resultType: 'json-array'
		});
		console.log("client connected");
		client.query(sql)
     .then(result => res.send(result))
		.catch(err =>  res.status(400).send({
			message: err.message }))
		.done(() => client.close().catch(err => console.error(err)));
		console.log("client closed");
		console.log("waiting for next request");
});

app.get('/alldata',function(req,res){
var sqlall ="select day,publisherid,ma.accountname as publisher,sum(revenue) as revenue ,sum(cost) as cost,sum(paid_impressions) as paid_impressions,sum(total_impressions) as total_impressions,"+
" " +"sum(total_blocked_impressions) as total_blocked_impressions from rpt.kpidaily kpi left join reference.masteraccount ma on kpi.publisherid=ma.accountid "+
" "+"where day > date_sub(to_date(FROM_UNIXTIME(IUDF.DET_UNIX_TIMESTAMP())), 30) group by 1,2,3"
  console.log(sqlall);
	var client = impala.createClient();
	console.log(client);
	console.log("trying to connect");
	client.connect(
		{
			host:'10.210.50.11',
			port: 21000,
			resultType: 'json-array'
		});
		console.log("client connected");
		client.query(sqlall)
     .then(result => res.send(result))
		.catch(err =>  res.status(400).send({
			message: err.message }))
		.done(() => client.close().catch(err => console.error(err)));
		console.log("client closed");
		console.log("waiting for next request");
});
//const PORT = process.env.PORT || 9000;
  app.listen(3000, function () {
		console.log('Example app listening on port 3000!');
	});
