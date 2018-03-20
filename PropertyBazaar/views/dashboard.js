App =
{
    handle: null,
    web3Provider: null,
      contracts: {},
      web3:null,
    account:null,
      

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
	App.account =res;
        account_info = "Account Number : " + res;
        console.log(account_info)
        //document.getElementById("account_info_container").innerHTML = account_info
        console.log(res)
	onButtonGetProperties();
        web3.eth.getBalance(account[0],function(err,bal)
        {
          if(err){
            console.log(err)
          }
          else{
            console.log(bal['e'])
            console.log(bal)
            //account_info +='<br>'+"Balance : "+web3.fromWei(parseInt(bal['s'])*10**parseInt(bal['e'])) + " ethers";
            account_info +='<br>'+"Balance : "+parseInt(bal['c'][0])/10000 + " ethers";
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

function onButtonGetProperties()
{
  var acc=App.account;
  console.log(acc);
  App.handle.getProperties.call(acc)
  .then(function(id)
  {var pids = [];
    for(var i=0;i<id.length;i++)
    {
      pids[i] = id[i]
      console.log(Number(id[i]));
      document.getElementById("property_container").innerHTML += '<br><div class="division" id="'+id[i]+'">'+"Property ID : "+id[i]+'</div><br>'
      //document.getElementById(id[i]).setAttribute("onclick",'showPropertyDetails('+id[i]+')')
      document.getElementById(id[i]).innerHTML += '<input class="button" type=button value="View Details" style="margin-left:10px;margin-right:10px" class="button" onclick="showPropertyDetails('+id[i]+')">'
      document.getElementById(id[i]).innerHTML += '<input class="button" type=button value="Sell" background-color="green" style="margin-left:10px;margin-right:10px" id="'+id[i]+'_sell_button" onclick="putOnSale('+id[i]+')">'
      App.handle.getRented.call(id[i])
        .then(function(ifrented)
          {
            if(ifrented == true){
              console.log("pids : " + pids[i])
              document.getElementById(pids[i]).innerHTML += '<input class="button" type="button" value="Rented" disabled>';
              document.getElementById(pids[i]+"_sell_button").disabled=true;
            }
            else{
              console.log("pids : " + pids[i])
              document.getElementById(id[i]).innerHTML += '<input class="button" type=button value="Rent" background-color="green" style="margin-left:10px;margin-right:10px" onclick="putOnRent('+id[i]+')">';
            }
          }).wait();
    }
  })
}

function showPropertyDetails(pid){
  document.cookie = pid;
  document.location.href = "PropertyDetails?"
}

$(function() {
    $(window).load(function() {
      App.initWeb3();
    });
  }); 
