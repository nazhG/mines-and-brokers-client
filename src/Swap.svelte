<script>
import { getNotificationsContext } from "svelte-notifications";
import { Connection, User, Token, Stake, ETH_Token, BridgeIn, Bridge } from './stores.js';
import abi_eth_token from './abi/ETH_Token';
import abi_token from './abi/Token';
import abi_bridgeIn from './abi/BridgeIn';
import abi_bridgeOut from './abi/Bridge';
const { addNotification } = getNotificationsContext();

let toClaim = 0;

const toWei = (num) => $Connection.web3.utils.toWei(num.toString());

async function handleBurn() {
	let connection = $Connection;

	let token_eth = new $Connection.web3.eth.Contract(abi_eth_token, $ETH_Token.address);
	let bridgeIn = new $Connection.web3.eth.Contract(abi_bridgeIn, $BridgeIn.address);

	if (toClaim == 0) {
		addNotification({
			text: 'not value to burn',
			position: "top-right",
			type: "danger",
			removeAfter: 800,
		});
		return;
	}

	let success = await token_eth.methods.approve(
		$BridgeIn.address, 
		toWei(toClaim)
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

	if(!success) return;
	
	await bridgeIn.methods.burn(
			$Connection.account,
			toWei(toClaim)
		).send({ from: $Connection.account })
		.once('sent', () => {
			connection.tx_Message = 'waiting ...';
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

	window.refreshUserInfo();
};

async function handleClaimRequest() {
	let connection = $Connection;

	let bridgeOut = new $Connection.web3.eth.Contract(abi_bridgeOut, $Bridge.address);

	await bridgeOut.methods.claimRequest(
		$Connection.account
	).send({ from: $Connection.account, value: 1000000000 })
	.once('sent', () => {
		connection.tx_Message = 'waiting for request';
		Connection.set(connection); 
	})
	.once('transactionHash',  (hash) => {
		connection.tx_Message = 'transaction sent';
		Connection.set(connection); 
	})
	.on('error', err => 
		addNotification({
		text: 'claim request error: ' + err.message,
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

	window.refreshUserInfo();
};

async function handleMint() {
	let connection = $Connection;

	let token_eth = new $Connection.web3.eth.Contract(abi_eth_token, $ETH_Token.address);

	await token_eth.methods.mint(
		$Connection.account,
		$Connection.web3.utils.toWei("10")
	).send({ from: $Connection.account })
	.once('sent', () => {
		connection.tx_Message = 'waiting for Mint';
		Connection.set(connection); 
	})
	.once('transactionHash',  (hash) => {
		connection.tx_Message = 'transaction sent';
		Connection.set(connection); 
	})
	.on('error', err => 
		addNotification({
		text: 'Mint error: ' + err.message,
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

	window.refreshUserInfo();
};

async function handleApproveClaim() {
	let connection = $Connection;
	const token = new $Connection.web3.eth.Contract(abi_token, $Token.address);

	await token.methods.mint($Connection.account, toWei(toClaim)).send({ from: $Connection.account})
	.once('sent', () => {
		connection.tx_Message = 'waiting for Claim';
		Connection.set(connection); 
	})
	.once('transactionHash',  (hash) => {
		connection.tx_Message = 'transaction sent';
		Connection.set(connection); 
	})
	.on('error', err => 
		addNotification({
		text: 'Claim error: ' + err.message,
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
		<h2 class="tittle">Swap</h2>
		<div class="staking">
			<!-- <h3>Status</h3>
			<input type="text" value={$User.burned/1e18} class="data-r" disabled>
			<input type="text" value="BHM" class="data-l">
			<hr> -->
			<h3>To Burn</h3>
			<input type=number bind:value={toClaim} class="data-r" max={$User.bhm} min=0>
			<input type="text" value="BHF" class="data-l">
			<br>
			<div class="double-detail">
				<small class="details">Blance BMF: {$User.bhf/1e18}</small>
				<small class="details">Blance BM: {$User.bhm/1e18}</small>
			</div>
			<hr>
			<button
			on:click={handleBurn}
			disabled={$Connection.chainId == 97}
			>Burn</button>
			<button
			disabled={$Connection.chainId == 4}
			on:click={handleClaimRequest}
			>Claim Request</button>
			<div class="test-btn tooltip">
				<span class="tooltiptext detail-roles">
					Botones de prueba
				</span>
				<button
				on:click={handleMint}
				disabled={$Connection.chainId == 97}
				>Get BHF</button>
				<button
				on:click={handleApproveClaim}
				disabled={$Connection.chainId == 4}
				>Approve Claim</button>
			</div>
		</div>
	</div>
</div>

<style>
	button:disabled {
		background-color: #ccc !important;
	}

	.double-detail {
		display: inline-flex;
		justify-content: space-around;
		width: 60%;
	}
	:global(body.dark-mode) .tittle {
		color: #f1f1f1;
	}

	.content {
		width: 50%;
		padding: 0 2em;
	}

    .main {
        display: flex;
        justify-content: space-around;
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