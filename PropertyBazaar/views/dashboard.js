App =
{
    handle: null,
    web3Provider: null,
      contracts: {},
      web3:null,
      

       initWeb3: function() 
       {
    
            // Is there an injected web3 instance?
            if (typeof web3 !== 'undefined') {
              App.web3Provider = web3.currentProvider;
            } else {
              // If no injected web3 instance is detected, fall back to Ganache
              App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
            }
            App.web3 = new Web3(App.web3Provider);


                return App.initContract();
      },

      initContract: function() 
      {
    
            $.getJSON('../build/contracts/Adoption.json', function(data) {
          // Get the necessary contract artifact file and instantiate it with truffle-contract
          var AdoptionArtifact = data;
          App.contracts.Adoption = TruffleContract(AdoptionArtifact);

          // Set the provider for our contract
          App.contracts.Adoption.setProvider(App.web3Provider);

          // Use our contract to retrieve and mark the adopted pets

            App.contracts.Adoption.deployed().then(function(instance) {
    App.handle = instance;
    console.log("deployed");
    getAccountDetails();
 

  });
        });

    }

};

function getAccountDetails(){
  console.log("in account details")
  var account;
  var account_info = "";
  App.web3.eth.getAccounts(function(err,res)
    {
      if(err){
        console.log(err)
      }
      else{
        account = res;
        account_info = "Account Number : " + res;
        console.log(account_info)
        //document.getElementById("account_info_container").innerHTML = account_info
        console.log(res)
        web3.eth.getBalance(account[0],function(err,bal)
        {
          if(err){
            console.log(err)
          }
          else{
            console.log(bal['e'])
            account_info +='<br>'+"Balance : "+web3.fromWei(parseInt(bal['s'])*10**parseInt(bal['e'])) + " ethers";
            document.getElementById("account_info_container").innerHTML += account_info;
          }
        }
      )
      //   App.web3.eth.getBalance(account,function(err,balance){
      //     if(err){
      //       console.log(err);
      //     }
      //     else{
      //       bal = balance;
      //       account_info +='<br>'+"Balance : "+bal['c'];
      //       document.getElementById("account_info_container").innerHTML = account_info
      //     }
      // });
    
      //document.getElementById("account_info_container").innerHTML = account_info;
      }
    });

  
}


$(function() {
    $(window).load(function() {
      App.initWeb3();
    });
  }); 