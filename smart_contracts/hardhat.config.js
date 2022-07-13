//https://eth-rinkeby.alchemyapi.io/v2/6kLDopwJ_4ApQfYVuzgoOxXn0J9uTc8t
require('@nomiclabs/hardhat-waffle');
module.exports ={
  solidity:'0.8.9',
  networks:{
    ropsten:{
      url:'https://eth-rinkeby.alchemyapi.io/v2/6kLDopwJ_4ApQfYVuzgoOxXn0J9uTc8t',
      accounts:['d09751206e9734e053b2e0d051e4a264a94778eaca95c5c56f4ec57117dc4634']
    }
  }
}