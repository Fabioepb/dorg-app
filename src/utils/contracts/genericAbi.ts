// a generic ERC20 ABI that can be used for any ERC20 token with permit for Aave V3
const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address, uint256) returns (bool)",
  "function transferFrom(address, address, uint256) returns (bool)",
  "function approve(address, uint256) returns (bool)",
  "function nonces(address) view returns (uint256)",
  "function DOMAIN_SEPARATOR() view returns (bytes32)",
  "function permit(address, address, uint256, uint256, uint8, bytes32, bytes32) returns (bool)",
];

export default ERC20_ABI;
