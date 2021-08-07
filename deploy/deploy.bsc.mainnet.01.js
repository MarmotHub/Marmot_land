require('@nomiclabs/hardhat-ethers')
const hre = require('hardhat')
const BigNumber = require("bignumber.js");

const decimalStr = (value) => {
  return new BigNumber(value).multipliedBy(10 ** 18).toFixed(0, BigNumber.ROUND_DOWN)
}

function one(value=1, left=0, right=18) {
    let from = ethers.BigNumber.from('1' + '0'.repeat(left))
    let to = ethers.BigNumber.from('1' + '0'.repeat(right))
    return ethers.BigNumber.from(value).mul(to).div(from)
}

const MAX = ethers.BigNumber.from('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
const DEADLINE = parseInt(Date.now() / 1000) + 86400

let network
let deployer

async function logTransaction(title, transaction) {
    let receipt = await transaction.wait()
    if (receipt.contractAddress != null) {
        title = `${title}: ${receipt.contractAddress}`
    }
    let gasEthers = transaction.gasPrice.mul(receipt.gasUsed)
    console.log('='.repeat(80))
    console.log(title)
    console.log('='.repeat(80))
    console.log(receipt)
    console.log(`Gas: ${ethers.utils.formatUnits(transaction.gasPrice, 'gwei')} GWei / ${receipt.gasUsed} / ${ethers.utils.formatEther(gasEthers)}`)
    console.log('')
    await new Promise(resolve => setTimeout(resolve, 2000))
}

async function getNetwork() {
    network = await ethers.provider.getNetwork()
    if (network.chainId === 97)
        network.name = 'bsctestnet'
    else if (network.chainId === 256)
        network.name = 'hecotestnet'
    deployer = (await ethers.getSigners())[0]

    console.log('='.repeat(80))
    console.log('Network and Deployer')
    console.log('='.repeat(80))
    console.log('Network:', network.name, network.chainId)
    console.log('Deployer:', deployer.address)
    console.log('Deployer Balance:', ethers.utils.formatEther(await deployer.getBalance()))
    console.log('')
}


addresses = {
    // chainlink oracle source
    // https://docs.chain.link/docs/binance-smart-chain-addresses/
    chainlinkBTCUSD:        "0x264990fbd0A4796A3E3d8E37C4d5F87a3aCa5Ebf",
    chainlinkETHUSD:        "0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e",
    chainlinkBNBUSD:        "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE",

    // Tokens
    btcAddress:             "0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c",
    ethAddress:             "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    wbnbAddress:            "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    busdAddress:            "0xe9e7cea3dedca5984780bafc599bd69add087d56",
    alpacaAddress:          "0x8f0528ce5ef7b51152a59745befdd91d97091d2f",

    // Pancakeswap Addresses
    factory:                "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
    router:                 "0x10ED43C718714eb63d5aA57B78B54704E256024E",

    //Alpaca addresses
    //https://github.com/alpaca-finance/bsc-alpaca-contract/blob/main/.mainnet.json
    alpacaFairLaunchAddress:    "0xA625AB01B08ce023B2a342Dbb12a16f2C8489A8F",
    ibWBNBAddress:              "0xd7D069493685A581d27824Fc46EdA46B7EfC0063",
    ibWBNBId:                   1,
    ibBUSDAddress:              "0x7C9e73d4C71dae564d41F78d56439bB4ba87592f",
    ibBUSDId:                   3,
    ibETHAddress:              "0xbfF4a34A4644a113E8200D7F1D79b3555f723AfE",
    ibETHId:                    9,
    ibBTCBAddress:              "0x08FC9Ba2cAc74742177e0afC3dC8Aed6961c24e7",
    ibBTCBId:                   18,
}



deployed_addresses = {
    marmotToken: "0xe5f729f959AE3FC51928c3A23AF21672f015170d",
    pool: "0xBF53f66381F235450C921fc2DFa12ACae7C13057",
    poolImplementation: "0xa40269d70036cbd582ff57fa091d213e562187e0",
    poolImplementationNew: "0x07d286DB9B9E7D306De0bB05c5B7589929FFDF98",
    poolImplementationNew2: "0xFe4A9BBD4d2314a4198c248ef4134791aE006926",
    poolProxyAdmin: "0xc895aAb24DdABBB63a36273ee7D1569d86E20dB9",
    poolNaive: "0x7e5B52291f09Cf72C1241DD8319b3B6234e1B5a2",
    poolNaiveImplementation: "0xC5af992792761aC574A77A77A5Af3C78c12dECD4",
    poolNaiveProxyAdmin: "0xc895aAb24DdABBB63a36273ee7D1569d86E20dB9",
    timelock: "0x4564B43fC660Acf1841e5D76C1Abb4DFE470a73C",
    vault: "0x4e7369474301364B6348F0660a87A6D5557e6F9f",
    pairBUSD_WBNB: "0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16",
    pairBTC_WBNB: "0x61EB789d75A95CAa3fF50ed7E47b96c132fEc082",
    pairETH_WBNB: "0x74E4716E431f45807DCF19f284c7aA99F18a4fbc",
    pairMARMOT_WBNB: "0x76d1bDA5Bcd8C5204E7379D51569B08AcBf7135B",
    pairALPACA_WBNB: "0x1099C2E6Ed6ebA95099c205b599B409305783E43",
    swapperMARMOT_WBNB: "0x2f72cD8D04023E415A3248A5670186f02ae6b1e6",
    swapperMARMOT_BUSD: "0xf78Ee28217433e82DBeE2e72351d5cDDBbaB527c",
    swapperMARMOT_BTC: "0x9226374ac251a52CD7a2B2050d5e2d40Ce41Ca73",
    swapperMARMOT_ETH: "0x3Fc24E0B1a802bda84D0813Abf2e347fbcd86e6F",
    swapperMARMOT_ALPACA: "0xB9F44fE7404f90368cF4B353b0d1E28679573060",
    SymbolOracleBTC: "0xe9DE83691fb70bda6d7028EA323641910702306F",
    SymbolOracleETH: "0xCBFc8d16917f523adda72eFC2324189687b51D3C",
    SymbolOracleBNB: "0x8e62BceeF6c234795ca8a428b2eC1DcC30E4E31c",

}


async function deployMarmotToken() {
    marmotToken = await (await ethers.getContractFactory('MarmotToken')).deploy()
    await logTransaction('marmotToken', marmotToken.deployTransaction)
    await new Promise(resolve => setTimeout(resolve, 30000))
    await hre.run('verify:verify', {
        address: marmotToken.address,
        constructorArguments: []
    })
}

async function mintInitialMarmotToken() {
    marmot = await ethers.getContractAt('MarmotToken', deployed_addresses.marmotToken)
    tx = await marmot.addMinter(deployer.address)
    await logTransaction('marmotToken addMinter deployer', tx)
    tx = await marmot.mint(deployer.address, decimalStr("2000000"))
    await logTransaction('marmotToken initial mint', tx)
    tx = await marmot.delMinter(deployer.address)
    await logTransaction('marmotToken removeMinter', tx)
}

async function addLiquidityMarmotAndBnb() {
    const DEADLINE = parseInt(Date.now() / 1000) + 86400
    marmot = await ethers.getContractAt('MarmotToken', deployed_addresses.marmotToken)
    wbnb = await ethers.getContractAt('contracts/interface/IERC20.sol:IERC20', addresses.wbnbAddress)
    unifactory = await ethers.getContractAt('UniswapV2Factory', addresses.factory)
    unirouter = await ethers.getContractAt('UniswapV2Router02', addresses.router)
    tx = await unirouter.connect(deployer).addLiquidity(addresses.wbnbAddress, deployed_addresses.marmotToken, decimalStr("0.1"), decimalStr("3000"), 0, 0, deployer.address, DEADLINE)
    await logTransaction('add marmot-wbnb lp to pancakeswap', tx)
}

async function getPairAddress() {
    unifactory = await ethers.getContractAt('UniswapV2Factory', addresses.factory)
    pairBUSD_WBNB = await unifactory.getPair(addresses.busdAddress, addresses.wbnbAddress)
    console.log("pairBUSD_WBNB address", pairBUSD_WBNB)
    pairBTC_WBNB = await unifactory.getPair(addresses.btcAddress, addresses.wbnbAddress)
    console.log("pairBTC_WBNB address", pairBTC_WBNB)
    pairETH_WBNB = await unifactory.getPair(addresses.ethAddress, addresses.wbnbAddress)
    console.log("pairETH_WBNB address", pairETH_WBNB)
    pairMARMOT_WBNB = await unifactory.getPair(deployed_addresses.marmotToken, addresses.wbnbAddress)
    console.log("pairMARMOT_WBNB address", pairMARMOT_WBNB)
    pairALPACA_WBNB = await unifactory.getPair(addresses.alpacaAddress, addresses.wbnbAddress)
    console.log("pairALPACA_WBNB address", pairALPACA_WBNB)
}

async function deploySwapperMARMOT_WBNB() {
    swapperMARMOT_WBNB = await (await ethers.getContractFactory('BTokenSwapper1')).deploy(
        addresses.router, deployed_addresses.pairMARMOT_WBNB, addresses.wbnbAddress, deployed_addresses.marmotToken, addresses.wbnbAddress < deployed_addresses.marmotToken, decimalStr("0.02"), decimalStr(1)
    )
    await logTransaction('swapperMARMOT_WBNB', swapperMARMOT_WBNB.deployTransaction)
    await new Promise(resolve => setTimeout(resolve, 30000))
    await hre.run('verify:verify', {
        address: swapperMARMOT_WBNB.address,
        constructorArguments: [addresses.router, deployed_addresses.pairMARMOT_WBNB, addresses.wbnbAddress,
            deployed_addresses.marmotToken, addresses.wbnbAddress < deployed_addresses.marmotToken, decimalStr("0.02"), decimalStr(1)]
    })
}

async function deploySwapperMARMOT_BUSD() {
    swapperMARMOT_BUSD = await (await ethers.getContractFactory('BTokenSwapper2')).deploy(
        addresses.router, deployed_addresses.pairBUSD_WBNB, deployed_addresses.pairMARMOT_WBNB,
        addresses.busdAddress, addresses.wbnbAddress, deployed_addresses.marmotToken, addresses.busdAddress < addresses.wbnbAddress,
        deployed_addresses.marmotToken < addresses.wbnbAddress, decimalStr("0.02"), decimalStr(1)
    )
    await logTransaction('swapperMARMOT_BUSD', swapperMARMOT_BUSD.deployTransaction)
    await new Promise(resolve => setTimeout(resolve, 30000))
    await hre.run('verify:verify', {
        address: swapperMARMOT_BUSD.address,
        constructorArguments: [
            addresses.router, deployed_addresses.pairBUSD_WBNB, deployed_addresses.pairMARMOT_WBNB,
            addresses.busdAddress, addresses.wbnbAddress, deployed_addresses.marmotToken, addresses.busdAddress < addresses.wbnbAddress,
            deployed_addresses.marmotToken < addresses.wbnbAddress, decimalStr("0.02"), decimalStr(1)]
    })
}

async function deploySwapperMARMOT_BTC() {
    swapperMARMOT_BTC = await (await ethers.getContractFactory('BTokenSwapper2')).deploy(
        addresses.router, deployed_addresses.pairBTC_WBNB, deployed_addresses.pairMARMOT_WBNB,
        addresses.btcAddress, addresses.wbnbAddress, deployed_addresses.marmotToken, addresses.btcAddress < addresses.wbnbAddress,
        deployed_addresses.marmotToken < addresses.wbnbAddress, decimalStr("0.02"), decimalStr(1)
    )
    await logTransaction('swapperMARMOT_BTC', swapperMARMOT_BTC.deployTransaction)
    await new Promise(resolve => setTimeout(resolve, 30000))
    await hre.run('verify:verify', {
        address: swapperMARMOT_BTC.address,
        constructorArguments: [
            addresses.router, deployed_addresses.pairBTC_WBNB, deployed_addresses.pairMARMOT_WBNB,
            addresses.btcAddress, addresses.wbnbAddress, deployed_addresses.marmotToken, addresses.btcAddress < addresses.wbnbAddress,
            deployed_addresses.marmotToken < addresses.wbnbAddress, decimalStr("0.02"), decimalStr(1)]
    })
}

async function deploySwapperMARMOT_ETH() {
    swapperMARMOT_ETH = await (await ethers.getContractFactory('BTokenSwapper2')).deploy(
        addresses.router, deployed_addresses.pairETH_WBNB, deployed_addresses.pairMARMOT_WBNB,
        addresses.ethAddress, addresses.wbnbAddress, deployed_addresses.marmotToken, addresses.ethAddress < addresses.wbnbAddress,
        deployed_addresses.marmotToken < addresses.wbnbAddress, decimalStr("0.02"), decimalStr(1)
    )
    await logTransaction('swapperMARMOT_ETH', swapperMARMOT_ETH.deployTransaction)
    await new Promise(resolve => setTimeout(resolve, 30000))
    await hre.run('verify:verify', {
        address: swapperMARMOT_ETH.address,
        constructorArguments: [
            addresses.router, deployed_addresses.pairETH_WBNB, deployed_addresses.pairMARMOT_WBNB,
            addresses.ethAddress, addresses.wbnbAddress, deployed_addresses.marmotToken, addresses.ethAddress < addresses.wbnbAddress,
            deployed_addresses.marmotToken < addresses.wbnbAddress, decimalStr("0.02"), decimalStr(1)]
    })
}

async function deploySwapperMARMOT_ALPACA() {
    swapperMARMOT_ALPACA = await (await ethers.getContractFactory('BTokenSwapper2')).deploy(
        addresses.router, deployed_addresses.pairALPACA_WBNB, deployed_addresses.pairMARMOT_WBNB,
        addresses.alpacaAddress, addresses.wbnbAddress, deployed_addresses.marmotToken, addresses.alpacaAddress < addresses.wbnbAddress,
        deployed_addresses.marmotToken < addresses.wbnbAddress, decimalStr("0.02"), decimalStr(1)
    )
    await logTransaction('swapperMARMOT_ALPACA', swapperMARMOT_ALPACA.deployTransaction)
    await new Promise(resolve => setTimeout(resolve, 30000))
    await hre.run('verify:verify', {
        address: swapperMARMOT_ALPACA.address,
        constructorArguments: [
            addresses.router, deployed_addresses.pairALPACA_WBNB, deployed_addresses.pairMARMOT_WBNB,
            addresses.alpacaAddress, addresses.wbnbAddress, deployed_addresses.marmotToken, addresses.alpacaAddress < addresses.wbnbAddress,
            deployed_addresses.marmotToken < addresses.wbnbAddress, decimalStr("0.02"), decimalStr(1)
            ]
    })
}

async function deploySymbolOracleBTC() {
    SymbolOracleBTC = await (await ethers.getContractFactory("SymbolOracleChainlink")).deploy(
        addresses.chainlinkBTCUSD
    )
    await logTransaction('SymbolOracleBTC', SymbolOracleBTC.deployTransaction)
    await new Promise(resolve => setTimeout(resolve, 30000))
    await hre.run('verify:verify', {
        address: SymbolOracleBTC.address,
        constructorArguments: [addresses.chainlinkBTCUSD]

    })
}

async function deploySymbolOracleETH() {
    SymbolOracleETH = await (await ethers.getContractFactory("SymbolOracleChainlink")).deploy(
        addresses.chainlinkETHUSD
    )
    await logTransaction('SymbolOracleETH', SymbolOracleETH.deployTransaction)
    await new Promise(resolve => setTimeout(resolve, 30000))
    await hre.run('verify:verify', {
        address: SymbolOracleETH.address,
        constructorArguments: [addresses.chainlinkETHUSD]

    })
}

async function deploySymbolOracleBNB() {
    SymbolOracleBNB = await (await ethers.getContractFactory("SymbolOracleChainlink")).deploy(
        addresses.chainlinkBNBUSD
    )
    await logTransaction('SymbolOracleBNB', SymbolOracleBNB.deployTransaction)
    await new Promise(resolve => setTimeout(resolve, 30000))
    await hre.run('verify:verify', {
        address: SymbolOracleBNB.address,
        constructorArguments: [addresses.chainlinkBNBUSD]

    })
}

async function deployPool() {
    POOL = await ethers.getContractFactory('MarmotPool');
    //fairlaunch in first month emit speed: 21.28MARMOT/block
    pool = await hre.upgrades.deployProxy(POOL,
        [deployed_addresses.marmotToken, decimalStr("8.51"), decimalStr("12.77"), 9895000])
    await pool.deployed();
    await logTransaction('pool deploy', pool.deployTransaction)
    await new Promise(resolve => setTimeout(resolve, 30000))
}

async function upgradePool() {
    POOL = await ethers.getContractFactory('MarmotPool');
    console.log('Upgrading Pool.');
    tx = await upgrades.upgradeProxy(deployed_addresses.pool, POOL);
    console.log(tx)
    console.log('Pool upgraded');
}

async function deployNaivePool() {
    POOL = await ethers.getContractFactory('MarmotPoolNaive');
    //fairlaunch in first month emit speed: 21.28MARMOT/block
    pool = await hre.upgrades.deployProxy(POOL,
        [deployed_addresses.marmotToken, decimalStr("11.79"), 10039000])
    await pool.deployed();
    await logTransaction('poolNaive deploy', pool.deployTransaction)
    await new Promise(resolve => setTimeout(resolve, 30000))
}

async function upgradeNaivePool() {
    POOL = await ethers.getContractFactory('MarmotPoolNaive');
    console.log('Upgrading PoolNaive.');
    tx = await upgrades.upgradeProxy(deployed_addresses.poolNaive, POOL);
    console.log(tx)
    console.log('PoolNaive upgraded');
}

async function addPoolToMarmotMinter() {
    marmot = await ethers.getContractAt('MarmotToken', deployed_addresses.marmotToken)
    tx = await marmot.addMinter(deployed_addresses.pool)
    await logTransaction('marmotToken addMinter pool', tx)
}

async function addPoolNaiveToMarmotMinter() {
    marmot = await ethers.getContractAt('MarmotToken', deployed_addresses.marmotToken)
    tx = await marmot.addMinter(deployed_addresses.poolNaive)
    await logTransaction('marmotToken addMinter poolNaive', tx)
}

async function removePoolFromMarmotMinter() {
    marmot = await ethers.getContractAt('MarmotToken', deployed_addresses.marmotToken)
    tx = await marmot.delMinter(deployed_addresses.pool)
    await logTransaction('marmotToken removeMinter pool', tx)
}


async function transferOwnershipToPool() {
    marmot = await ethers.getContractAt('MarmotToken', deployed_addresses.marmotToken)
    tx = await marmot.transferOwnership(deployed_addresses.pool)
    await logTransaction('marmotToken transfer ownership', tx)
}

async function addSwapperToPool() {
    pool = await ethers.getContractAt('MarmotPool', deployed_addresses.pool)
    tx = await pool.addSwapper(deployed_addresses.swapperMARMOT_BUSD);
    await logTransaction('add swapperMARMOT_BUSD', tx)
    tx = await pool.addSwapper(deployed_addresses.swapperMARMOT_WBNB);
    await logTransaction('add swapperMARMOT_WBNB', tx)
    tx = await pool.addSwapper(deployed_addresses.swapperMARMOT_BTC);
    await logTransaction('add swapperMARMOT_BTC', tx)
    tx = await pool.addSwapper(deployed_addresses.swapperMARMOT_ETH);
    await logTransaction('add swapperMARMOT_ETH', tx)
    tx = await pool.addSwapper(deployed_addresses.swapperMARMOT_ALPACA);
    await logTransaction('add swapperMARMOT_ALPACA', tx)
}

async function deployVault() {
    vault = await (await ethers.getContractFactory("MarmotVault")).deploy(deployed_addresses.marmotToken)
    await logTransaction('vault', vault.deployTransaction)
    await new Promise(resolve => setTimeout(resolve, 30000))
    await hre.run('verify:verify', {
        address: vault.address,
        constructorArguments: [deployed_addresses.marmotToken]
    })
}

async function setupPool() {
    pool = await ethers.getContractAt('MarmotPool', deployed_addresses.pool)
    tx = await pool.setVaultAddress(deployed_addresses.vault);
    await logTransaction('set vault address to pool', tx)

    tx = await pool.setAlpacaFairLaunch(addresses.alpacaFairLaunchAddress)
    await logTransaction('set alpacaFairLaunch address to pool', tx)

    tx = await pool.setWrappedNativeAddr(addresses.wbnbAddress)
    await logTransaction('set wbnb address to pool', tx)
}

async function setupPoolNaive() {
    pool = await ethers.getContractAt('MarmotPoolNaive', deployed_addresses.poolNaive)
    tx = await pool.setVaultAddress(deployed_addresses.vault);
    await logTransaction('set vault address to poolNaive', tx)
}

async function addPool() {
    pool = await ethers.getContractAt('MarmotPool', deployed_addresses.pool)
    tx = await pool.addPool(
            addresses.busdAddress,
            'BUSD',
            decimalStr(1),
            ZERO_ADDRESS,
            addresses.ibBUSDAddress,
            addresses.ibBUSDId
            )
    await logTransaction('add busd pool', tx)
    tx = await pool.addPool(
            addresses.wbnbAddress,
            'BNB',
            decimalStr(1),
            deployed_addresses.SymbolOracleBNB,
            addresses.ibWBNBAddress,
            addresses.ibWBNBId
            )
    await logTransaction('add bnb pool', tx)
    tx = await pool.addPool(
            addresses.btcAddress,
            'BTC',
            decimalStr("0.5"),
            deployed_addresses.SymbolOracleBTC,
            addresses.ibBTCBAddress,
            addresses.ibBTCBId
            )
    await logTransaction('add btc pool', tx)
    tx = await pool.addPool(
            addresses.ethAddress,
            'ETH',
            decimalStr("0.5"),
            deployed_addresses.SymbolOracleETH,
            addresses.ibETHAddress,
            addresses.ibETHId
            )
    await logTransaction('add eth pool', tx)
}

async function addPoolNaive() {
    pool = await ethers.getContractAt('MarmotPoolNaive', deployed_addresses.poolNaive)
    tx = await pool.addPool(
        deployed_addresses.marmotToken,
        'MARMOT',
        100
    )
    await logTransaction('add marmot pool', tx)

    tx = await pool.addPool(
        deployed_addresses.pairMARMOT_WBNB,
        'MARMOT-WBNB-LP',
        300
    )
    await logTransaction('add marmot LP pool', tx)
}



async function deployTimelock() {
    timelock = await (await ethers.getContractFactory('Timelock')).deploy(deployer.address, 1*24*60*60)
    await logTransaction('vault', timelock.deployTransaction)
    await new Promise(resolve => setTimeout(resolve, 30000))
    await hre.run('verify:verify', {
        address: timelock.address,
        constructorArguments: [deployer.address, 1*24*60*60]
    })
}

async function transferOwnershipMarmotPoolToTimelock() {
    pool = await ethers.getContractAt('MarmotPool', deployed_addresses.pool)
    tx = await pool.transferOwnership(deployed_addresses.timelock)
    await logTransaction('pool transfer ownership', tx)
}

async function transferOwnershipMarmotPoolNaiveToTimelock() {
    pool = await ethers.getContractAt('MarmotPoolNaive', deployed_addresses.poolNaive)
    tx = await pool.transferOwnership(deployed_addresses.timelock)
    await logTransaction('pool transfer ownership', tx)
}


async function transferOwnershipVaultToTimelock() {
    vault = await ethers.getContractAt("MarmotVault", deployed_addresses.vault)
    tx = await vault.transferOwnership(deployed_addresses.timelock)
    await logTransaction('vault transfer ownership', tx)
}

async function transferOwnershipProxyAdmintoTimelock() {
 console.log("Transferring ownership of ProxyAdmin...");       // The owner of the ProxyAdmin can upgrade our contracts
 tx = await upgrades.admin.transferProxyAdminOwnership(deployed_addresses.timelock);
 await logTransaction('proxyAdmin transfer ownership', tx)

 }


async function main() {
    await getNetwork()
    // await deployMarmotToken()
    // await mintInitialMarmotToken()
    // await addLiquidityMarmotAndBnb()
    // await getPairAddress()

    // await deploySwapperMARMOT_WBNB()
    // await deploySwapperMARMOT_BUSD()
    // await deploySwapperMARMOT_BTC()
    // await deploySwapperMARMOT_ETH()
    // await deploySwapperMARMOT_ALPACA()
    // await deploySymbolOracleBTC()
    // await deploySymbolOracleETH()
    // await deploySymbolOracleBNB()
    // await deployPool()
    // await upgradePool()
    // await deployNaivePool()
    //
    // await addPoolToMarmotMinter()
    // await addPoolNaiveToMarmotMinter()
    // await removePoolFromMarmotMinter()
    // await transferOwnershipToPool()
    // await addSwapperToPool()
    // await deployVault()
    // await setupPool()
    // await setupPoolNaive()
    // await addPool()
    await addPoolNaive()
    //
    // await deployTimelock()
    // await transferOwnershipToTimelock()


}

main()
.then(() => process.exit(0))
.catch(error => {
    console.error(error);
    process.exit(1);
});


