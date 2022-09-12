const { ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

const BASE_FEE = ethers.utils.parseEther("0.25") //0.25 is the premium it costs 0.25 per link
const GAS_PRICE_LINK = 1e9 // 1000,000,000// link per gas. calculated value based on the gas price of the chain.

//Eth price $1,000,000,000
// Chainlink Nodes pay the gas fees to give us randomness and do external execution

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    // const chainId = network.config.chainId
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocks...")
        //deploy a mock vrfcoordinator...
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        })
        log("Mocks Deployed!")
        log("_______________________________________________________________________")
    }
}

module.exports.tags = ["all", "mocks"]
