function totalCost(){
  var x = parseInt(document.getElementById("rate").value);
  var y = parseInt(document.getElementById("area").value);
  document.getElementById("total").value = x * y;
  console.log(x*y)
}
