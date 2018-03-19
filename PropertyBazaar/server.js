var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')
var router = express.Router();
var router1 = express.Router();

//create instance of express
var app = express()
app.set('view engine','ejs')

app.use(express.static('views'))
app.set('views', __dirname + '/views')
//__dirname is current directory in vhich the server.js script recides

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(logger('dev'))

//app.use(bodyParser())

app.use('/getPropertyDetails',router)
router.get('/',function(request,response,next){
	response.render('getPropertyDetails.ejs')
})


var fs = require('fs')
process.on('uncaughtException', function (exception) {
  console.log(exception); // to see your exception details in the console
});

var fname;
var lname;
var propertyId;
var propertyTitle;
var propertyType;
var propertyArea;
var propertyRate;
var propertyTotal;
var street;
var city;
var state;
var overview;

app.get('/',function(request,response){
	//response.send("<h1>Prep For Prep</h1>")
	response.render('index.ejs')
})

router.post('/',function(request,response,next){
	console.log(request.body);
	console.log(request.body.propertyId)
	propertyId = request.body.id;
	propertyTitle = request.body.title;
	overview = request.body.overview;
	propertyType = request.body.type;
	propertyArea = request.body.area;
	propertyRate = request.body.rate;
	propertyTotal = request.body.total;
	street = request.body.street;
	city = request.body.city;
	state = request.body.state;
	fname= request.body.fname;
	lname= request.body.lname;


	var currentSearchResult = {
	id : propertyId,
	title : propertyTitle,
	firstName : fname,
	lastName : lname,
	overview : overview,
	picture : "images/p13.jpeg",
	plan : {
		type : propertyType,
		area : propertyArea,
		rate : propertyRate,
		total : propertyTotal
	},
	location : {
		street:street,
    		city:city,
    		state:state,
    		country:"",
    		lat:"",
    		lng:""
	},
	amenities:{
		"24-hour-water-supply":true,
    		"24-hour-security":true,
    		"club-house":true,
    		"fire-fighting-equipment":true,
    		"kids-play-ground":true,
    		"Wifi Connectivity":true,
    		"Meditation Center":true,
    		"Senior Citizen Park":true,
    		"Power Backup":true,
    		"Jogging Amenities":true
	}
};

console.log(currentSearchResult);

fs.readFile('./views/Properties.json', function (err, data) {
    var json = JSON.parse(data)
    //console.log(json)
    json.push(currentSearchResult)
    //console.log(json)
    fs.writeFile('./views/Properties.json', JSON.stringify(json))
})
response.render('index.ejs')
})


//'/' is the home page or index page
app.use('/PropertyDetails',router1)
router1.get('/',function(request,response,next){
	//console.log(request.params.id)
	//var temp = request.params.id
	//var responseObject
	//fs.readFile('./views/Properties.json', function (err, data) {
	  //  var js = JSON.parse(data)
	    //console.log(json)
			//console.log(json[request.params.id])
			//var i
			//for(i = 0;i<js.length;i++){
				//console.log(js[i])
				//if(js[i].id == temp){
					//responseObject = js[i]
					//break;
				//}
			//}
			//responseObject = js[i]
			//console.log(responseObject)
			response.render('PropertyDetails.ejs')

	//response.send(responseObject);
});

/*
app.get('*',function(reuest,response,next){
	response.send("404 Page Not Found")
})
*/




app.listen(12345, function(){
	console.log("App is running on port " + 12345)
})
