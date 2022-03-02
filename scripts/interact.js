const hre = require('hardhat');
const USElection = require('../artifacts/contracts/USElection.sol/USElection.json');

const run = async function () {
	// Providers
	const provider = new hre.ethers.providers.JsonRpcProvider(
		'http://localhost:8545'
	);
	const latestBlock = await provider.getBlock('latest');
	console.log(latestBlock.hash);

	// The Wallet Instance
	const wallet = new hre.ethers.Wallet(
		'0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
		provider
	);
	const balance = await wallet.getBalance();
	console.log(hre.ethers.utils.formatEther(balance, 18));

	// Smart Contract Instance
	const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
	const electionContract = new hre.ethers.Contract(
		contractAddress,
		USElection.abi,
		wallet
	);
	console.log(electionContract);

	// Making calls
	const hasEnded = await electionContract.electionEnded();
	console.log('The election has ended: ', hasEnded);

	// const haveResultsForOhio = await electionContract.resultsSubmitted('Ohio');
	// console.log('Have results for Ohio:', haveResultsForOhio);
};

run();

// Deploying contracts with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// Account balance: 10000000000000000000000
// Waiting for USElection deployment...
// USElection Contract address:  0x5FbDB2315678afecb367f032d93F642f64180aa3
