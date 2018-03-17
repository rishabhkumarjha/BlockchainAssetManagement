var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')
var router = express.Router();


//create instance of express
var app = express()

app.set('view engine','html')

app.use(express.static('views'))
app.set('views', __dirname + '/views')
//__dirname is current directory in vhich the server.js script recides

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(logger('dev'))

//app.use(bodyParser())

app.use('/getPropertyDetails',router)
router.get('/',function(request,response){
	response.render('getPropertyDetails.ejs')
})



var fs = require('fs')



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

router.post('/',function(request,response){
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


	var currentSearchResult = {
	id : propertyId,
	title : propertyTitle,
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
   /* for(var i=0;i<data.length;i++)			
    {
    	if(currentSearchResult.id==data[i].id)
    	{
    		//alert("The property with ID "+data[i].id+" is already registered");
    		break;
    	}
    	else if(i==data.length)
    		json.push(currentSearchResult);
    }*/
    
    json.push(currentSearchResult);
    //console.log(json)
    fs.writeFile('./views/Properties.json', JSON.stringify(json))
})
response.render('index.ejs')
})


//'/' is the home page or index page


app.listen(12345, function(){
	console.log("App is running on port " + 12345)
})
