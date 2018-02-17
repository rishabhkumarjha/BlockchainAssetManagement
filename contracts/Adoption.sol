pragma solidity ^0.4.17;

contract Adoption {
	address[16] public adopters;
   mapping(uint=>address) public pid_to_address_map;
   mapping(address=>uint) public address_to_pid_map;
   mapping(uint=>uint) public prop_id_to_contract_end;
   mapping(uint=>bool) public pid_to_rented_map;

   //event checkLease(uint prop_id,address indexed contract_end);
	
function addProperty(address owner, uint propid) returns (bool) {
        if(pid_to_address_map[propid] == 0x0000000000000000000000000000000000000000){
            pid_to_address_map[propid]=owner;
            address_to_pid_map[owner]=propid;
            return true;
        }
        return false;
    }

function getAddress(uint prop_id) public view returns (address)
{
  return pid_to_address_map[prop_id];
}

function buyProperty(address owner, address buyer, uint propid) returns (bool) {

        if(pid_to_address_map[propid] == owner)
        {
            pid_to_address_map[propid] = buyer;
            //checkLease(propid,pid_to_address_map[propid]);
            return true;
        }

        return false;
    }


function leasePropertyStart(address owner,address renter,uint prop_id,uint years_after,uint weeks_after,uint days_after) 
        {
          
             

            if(pid_to_address_map[prop_id]==owner)
            {
                if(pid_to_rented_map[prop_id]==false)
                {
                   prop_id_to_contract_end[prop_id]=now + years_after* 1 hours + weeks_after * 1 minutes + days_after * 1 seconds;
                   //contract_end=now + years_after* 1 years + weeks_after * 1 weeks + days_after * 1 days;
                    if(now<=prop_id_to_contract_end[prop_id])
                    {
                        pid_to_address_map[prop_id]=renter;
                        pid_to_rented_map[prop_id]=true;
                    }
                }
            }
            
            
            
    }


    function leasePropertyEnd(address owner,address renter,uint prop_id)
    {
      if(pid_to_address_map[prop_id]==renter && now>prop_id_to_contract_end[prop_id])
            {
                pid_to_address_map[prop_id]=owner;
                pid_to_rented_map[prop_id]=false;
        
            }
            
            //checkLease(prop_id,prop_id_to_contract_end[prop_id]);
    }


}