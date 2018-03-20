var propertyData
$.getJSON('../Properties.json', function(data) {
      console.log("data"+data);
      propertyData = data
      console.log(propertyData);
    });


$(".target" ).change(function() {
  alert( "Handler for .change() called." );
});
