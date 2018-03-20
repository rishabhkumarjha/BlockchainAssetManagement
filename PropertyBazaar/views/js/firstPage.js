var propertyObject = "property"
$.getJSON('../Properties.json', function(data) {
      propertyObject = data
      console.log(propertyObject);
      getPropertyDetails()
});

function getPropertyDetails(){
	for(var j = 0;j < propertyObject.length;j++){
		document.getElementById("propertyContainer").innerHTML += '<br><div class="division"><div class = "newspaper" style="width:1000px"><div style = "width:300px;height:300px"><image src = '+propertyObject[j].picture+' style = "width:300px;height:300px"></div><div><div style = "width:700px;height:75px"><div class="newspaper"> <div style = "width:350px;height:75px"><h2>Property Id : '+propertyObject[j].id+'</h2></div><div style = "width:350px;height:75px"><h2>Property Title : '+propertyObject[j].title+'<h2></div></div><div style = "width:700px;height:75px"><div class="newspaper"> <div style = "width:350px;height:75px"><h2>Street : '+propertyObject[j].location.street+'</h2></div><div style = "width:350px;height:75px"><h2>City : '+propertyObject[j].location.city+'</h2></div></div><div style = "width:700px;height:75px"><div class="newspaper"> <div style = "width:350px;height:75px"><h2>Type : '+propertyObject[j].plan.type+'<h2></div><div style = "width:350px;height:75px"><h2>Area : '+propertyObject[j].plan.area+'<h2></div></div></div><div><form action = "/PropertyDetails" action = "get"><input type = "submit" class = "button1" value = "Get Details"/></form></div></div></div></div><br>'
	}
}

function myFunction(){
	var txt;
    	var person = prompt("Enter The Property Id", "Property Id");
    	if (person == null || person == "") {
        	txt = "User cancelled the prompt.";
    	} else {
        	onButtonAdd(person)
		console.log(person)	
    	}
}
