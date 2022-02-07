<script>
import { getNotificationsContext } from "svelte-notifications";
import { Connection, User, Token, Stake } from './stores.js';
import abi_token from './abi/Token';
import abi_stake from './abi/Stake';

const { addNotification } = getNotificationsContext();

let toStake = 0;
let Bhm = 100;

const toWei = (num) => $Connection.web3.utils.toWei(num.toString());

async function handleStake() {

	let connection = $Connection;
	let toStakeFormat = toWei(toStake);
	if (!$Connection.logged) {
		addNotification({
			text: 'Connect wallet to join',
			position: "top-right",
			type: "danger",
			removeAfter: 2500,
		})
		// return false;
	}

	let success = false;
	connection.tx_OnGoing = true;
	Connection.set(connection); 

	let token = new $Connection.web3.eth.Contract(abi_token, $Token.address);
	let stake = new $Connection.web3.eth.Contract(abi_stake, $Stake.address);
	const allowance = Number(await token.methods.allowance(
		$Connection.account, 
		$Stake.address
	).call());

	if (allowance >= toStakeFormat) {
		console.log('User already set allowance: ', allowance);
		success = true
	} else {
		/// Set approvals to join in tier
		success = await token.methods.approve(
			$Stake.address, 
			toStakeFormat
		).send({ from: $Connection.account })
		.once('sent', () => {
			connection.tx_Message = 'waiting for approval';
			Connection.set(connection); 
		})
		.once('transactionHash',  (hash) => {
			connection.tx_Message = 'transaction sent';
			Connection.set(connection); 
		})
		.on('error', err => 
			addNotification({
			text: 'Approval error: ' + err.message,
			position: "top-right",
			type: "danger",
			removeAfter: 8000,
		}))
		.then(() => true)
		.catch(() => false)
		.finally(() => {
			connection.tx_Message = '';
			connection.tx_OnGoing = false;
			Connection.set(connection); 
		});
	}

	if(!success) return;
	connection.tx_OnGoing = true;
	Connection.set(connection); 
	console.log('Staking: ', toStakeFormat);

	await stake.methods.staking(toStakeFormat).send({ from: $Connection.account })
	.once('sent', () => {
			connection.tx_Message = 'waiting for approval';
			Connection.set(connection); 
	})
	.once('transactionHash',  (hash) => {
			connection.tx_Message = 'transaction sent';
			Connection.set(connection); 
	})
	.on('error', err => 
		addNotification({
		text: 'Joining to Tier error: ' + err.message,
		position: "top-right",
		type: "danger",
		removeAfter: 8000,
	}))
	.then(() => {})
	.catch(()=>{}) // this avoid a warning in console
	.finally(function(receipt){
		connection.tx_Message = '';
		connection.tx_OnGoing = false;
		Connection.set(connection); 
	});

	window.refreshUserInfo();

};

const handleWithdraw = async () => {
	
	console.log("Withdraw");
	
	let connection = $Connection;
	let toStakeFormat = toWei(toStake);
	if (!$Connection.logged) {
		addNotification({
			text: 'Connect wallet to join',
			position: "top-right",
			type: "danger",
			removeAfter: 2500,
		})
		// return false;
	}
	let stake = new $Connection.web3.eth.Contract(abi_stake, $Stake.address);
	await stake.methods.withdraw(toStakeFormat).send({ from: $Connection.account })
	.once('sent', () => {
			connection.tx_Message = 'waiting for approval';
			Connection.set(connection); 
	})
	.once('transactionHash',  (hash) => {
			connection.tx_Message = 'transaction sent';
			Connection.set(connection); 
	})
	.on('error', err => 
		addNotification({
		text: 'Joining to Tier error: ' + err.message,
		position: "top-right",
		type: "danger",
		removeAfter: 8000,
	}))
	.then(() => {})
	.catch(()=>{}) // this avoid a warning in console
	.finally(function(receipt){
		connection.tx_Message = '';
		connection.tx_OnGoing = false;
		Connection.set(connection); 
	});

	window.refreshUserInfo();
  
};

const toFixed = (x) => {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split('e-')[1]);
    if (e) {
        x *= Math.pow(10,e-1);
        x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
        e -= 20;
        x /= Math.pow(10,e);
        x += (new Array(e+1)).join('0');
    }
  }
  return x;
};

</script>

<div class="main">
	<div class="content">
		<h1 class="tittle"><i>M&B</i> <b>Staking</b></h1>
		<div class="staking">
			<h3>staked MaB Tokens</h3>
			<input type="text" value={$User.staked/1e18} class="data-r" disabled>
			<input type="text" value="MaB" class="data-l">
			<hr>
			<h3>To Stack/Withdraw</h3>
			<input type=number bind:value={toStake} class="data-r" max={$User.bhm} min=0>
			<input type="text" value="Mab" class="data-l">
			<br>
			<small class="details">Balance: {toFixed($User.bhm/1e18)}</small>
			<hr>
			<button
			on:click={handleStake}
			>STACK</button>
			<button
			on:click={handleWithdraw}
			>WITHDRAW</button>
		</div>
	</div>
	<div class="content">
		<h1 class="tittle"><i>M&B</i> <b>Staking</b></h1>
		<div class="staking">
			<h3>Your Staking Role</h3>
			<span class="data-g">{$User.role == 0 ? "Unstaking" : ($User.role == 1 ? "Treasure" : "Structure")}</span>
			<small class="details">See group Details</small>
			<hr>
			<h3>Staking Reward</h3>
			<input type="text" class="data-r">
			<input type="text" class="data-l" value="Mab">
			<br>
			<div class="double-detail">
				<small class="details">----- --</small>
				<small class="details">----- --</small>
			</div>
			<hr>
			<button>CLAIM</button>
		</div>
	</div>
</div>

<style>
	.double-detail {
		display: inline-flex;
		justify-content: space-around;
		width: 60%;
	}

	.content {
		width: 50%;
		padding: 0 2em;
	}

    .main {
        display: flex;
        justify-content: space-around;
    }

	:global(body.dark-mode) .tittle {
		color: #f1f1f1;
	}

	.staking {
		border: 1px solid white;
		border-radius: 10px;
		background-color: #121427ff;
		padding: 0 0 2em;
    	font-size: larger;
	}

	.staking h3 {
		color: #1c9bf3ff;
		font-weight: bold;
	}

	.staking .data-g{
		color: white;
		background-color: #011a3fff;
		padding: 8px;
		border-radius: 25px;
		border: 1px solid white;
	}

	.staking .data-r{
		color: white;
		background-color: #011a3fff;
		padding: 8px;
		border-radius: 25px 0 0 25px;
		border: 1px solid white;
		width: 35%;
	}
	
	.staking .data-l{
		color: white;
		background-color: #1c9bf3ff;
		margin-left: -5px;
		padding: 8px;
		border-radius: 0 25px 25px 0;
		border: 1px solid white;
		font-weight: bold;
		width: 15%;
	}	
	
	.staking hr{
		border: none;
    	padding: 0.8em;
	}

	.details {
		color: white;
		font-size: small;
		display: block;
		margin-top: 1em;
	}

	.staking button{
		background-color: #af8a2eff;
		color: white;
		padding: 10px;
		font-weight: bold;
		border-radius: 25px;
		border: none;
	}

</style>