App =
{

    web3Provider: null,
      contracts: {},
      web3:null,
      handle: null,

       initWeb3: function() 
       {
    
            // Is there an injected web3 instance?
            if (typeof web3 !== 'undefined') {
              App.web3Provider = web3.currentProvider;
            } else {
              // If no injected web3 instance is detected, fall back to Ganache
              App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
            }
            App.web3 = new Web3(App.web3Provider);


                return App.initContract();
      },

      initContract: function() 
      {
    
            $.getJSON('Adoption.json', function(data) {
          // Get the necessary contract artifact file and instantiate it with truffle-contract
          var AdoptionArtifact = data;
          App.contracts.Adoption = TruffleContract(AdoptionArtifact);

          // Set the provider for our contract
          App.contracts.Adoption.setProvider(App.web3Provider);

          // Use our contract to retrieve and mark the adopted pets

            App.contracts.Adoption.deployed().then(function(instance) {
    App.handle = instance;
    console.log("deployed");

 

  });
        });

    }

};

function onButtonAdd()
{
    alert("in onButtonClick");
    var account;

    web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }

  account = accounts[0];
  //console.log(account);
  

App.handle.addProperty(document.getElementById("owner_address").value,
                                  document.getElementById("property_id").value,{from:account})
                                  .then(function(result){
                                      return App.handle.getAddress.call(document.getElementById("property_id").value)})
                                      .then(function(addr){console.log(addr);})



});

  
  

    //App.contracts.addProperty(,,{from:account})
    }

function onButtonBuy()
{
    /*var event=App.handle.checkLease();
    event.watch(function(error,result){if (!error)
        console.log(result);});*/
    var account;
    var owner=null;
    var property_id = document.getElementById("property_id").value;
    web3.eth.getAccounts(function(error, accounts) 
    {
      if (error) 
      {
        console.log(error);
      }

      account = accounts[0];
    })
    App.handle.getAddress.call(property_id)
      .then(function(addr)
        {
          owner=addr;
          console.log(addr);
          App.handle.buyProperty(owner,account,property_id,{from:account,to:owner})
            .then(function(bool)
              {
                console.log(Boolean(bool) + " transaction completed");
                App.handle.getAddress.call(property_id)
                  .then(function(addr){console.log("Property transferred to " + addr);})

              }
            )
        }
        );
}

function onButtonLease()
{
  var account,owner;
  var property_id = document.getElementById("property_id").value;
  var property_id = document.getElementById("property_id").value;

  web3.eth.getAccounts(function(error, accounts) 
    {
      if (error) 
      {
        console.log(error);
      }

      account = accounts[0];  //renter
    })
  App.handle.getAddress.call(property_id)
      .then(function(addr)
      {
        owner=addr;
        //App.handle.leaseProperty()
      })

}

function setupBuy(){
  var create_textfields = document.getElementById("text_fields");
  create_textfields.innerHTML = ""
  document.getElementById("time").innerHTML=""
  document.getElementById("button_container").innerHTML=""
  var text_field = document.createElement("input");
  text_field.id="property_id"
  text_field.type="text"
  text_field.placeholder="Property ID"
  console.log(create_textfields)
  console.log(text_field)
  create_textfields.appendChild(text_field);

  var button = document.createElement("button")
  button.className="button success medium-12"
  button.innerHTML="Buy Property"
  button.setAttribute("onclick","onButtonBuy()");
  document.getElementById("button_container").appendChild(button);
}

function setupRegister(){
  var create_textfields = document.getElementById("text_fields");
  create_textfields.innerHTML=""
  document.getElementById("time").innerHTML=""
  document.getElementById("button_container").innerHTML=""
  var text_field = document.createElement("input");
  text_field.id="owner_address"
  text_field.type="text"
  text_field.placeholder="Owner Address"
  create_textfields.appendChild(text_field)

  var text_field1 = document.createElement("input");
  text_field1.id="property_id"
  text_field1.type="text"
  text_field1.placeholder="Property ID"
  create_textfields.appendChild(text_field1);

  var button = document.createElement("button")
  button.className="button success medium-12"
  button.innerHTML="Register Property"
  button.setAttribute("onclick","onButtonAdd()");
  document.getElementById("button_container").appendChild(button);
}

function setupLease(){
  var create_textfields = document.getElementById("text_fields");
  create_textfields.innerHTML=""
  document.getElementById("time").innerHTML=""
  document.getElementById("button_container").innerHTML=""
  var text_field = document.createElement("input");
  text_field.id="property_id"
  text_field.type="text"
  text_field.placeholder="Property ID"
  create_textfields.appendChild(text_field);

  document.getElementById("time").innerHTML+='<div class="medium-4 column"><input type=text id=years placeholder="No of years"></div><div class="medium-4 column"><input type=text id=weeks placeholder="No of weeks"></div><div class="medium-4 column"><input type=text id=days placeholder="No of days"></div>'

  var button = document.createElement("button")
  button.className="button success medium-12"
  button.innerHTML="Lease Property"
  button.setAttribute("onclick","onButtonLease()");
  //console.log(button)
  document.getElementById("button_container").appendChild(button);
  //console.log(document.getElementById("button_container"))
}

$(function() {
  $(window).load(function() {
    App.initWeb3();
  });
}); 
