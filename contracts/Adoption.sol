pragma solidity ^0.4.17;

contract Adoption {
	address[16] public adopters;
   mapping(uint=>address) public pid_to_address_map;
   mapping(address=>uint) public address_to_pid_map;
	// Adopting a pet
function adopt(uint petId) public returns (uint) {
  require(petId >= 0 && petId <= 15);

  adopters[petId] = msg.sender;

  return petId;
}

// Retrieving the adopters
function getAdopters() public view returns (address[16]) {
  return adopters;
}

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
            return true;
        }
        return false;
    }

}