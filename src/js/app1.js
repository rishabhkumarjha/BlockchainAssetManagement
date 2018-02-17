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
  

App.handle.addProperty(document.getElementById("owner_addr").value,
                                  document.getElementById("property_id").value,{from:account})
                                  .then(function(result){
                                      return App.handle.getAddress.call(document.getElementById("property_id").value)})
                                      .then(function(addr){console.log(addr);})



});

  
  

    //App.contracts.addProperty(,,{from:account})
    }

function onButtonBuy()
{
    var account;
    var owner=null;
    var prop_id = document.getElementById("prop_id").value
    web3.eth.getAccounts(function(error, accounts) 
    {
      if (error) 
      {
        console.log(error);
      }

      account = accounts[0];
    })
    App.handle.getAddress.call(prop_id)
      .then(function(addr)
        {
          owner=addr;
          console.log(addr);
          App.handle.buyProperty(owner,account,prop_id,{from:owner})
            .then(function(bool)
              {
                console.log(Boolean(bool) + "transaction completed");
                App.handle.getAddress.call(prop_id)
                  .then(function(addr){console.log(addr);})

              }
            )
        }
        );
}


$(function() {
  $(window).load(function() {
    App.initWeb3();
  });
}); 
