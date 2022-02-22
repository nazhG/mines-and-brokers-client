<script>
	import Notifications from 'svelte-notifications';
  	import { Router, Route, Link } from "svelte-navigator";
	import Connect_Button from './Connect_Button.svelte';
	import Modal from 'svelte-simple-modal';
	import Toggle from './Toggle.svelte';
	import { Connection, User, Stake, Token, Bridge, BridgeIn, ETH_Token } from './stores.js';
	import abi_stake from './abi/Stake';
	import abi_token from './abi/Token';
	import abi_eth_token from './abi/ETH_Token';
	import abi_bridge from './abi/Bridge';
	import abi_bridgeIn from './abi/BridgeIn';
	import Stack from './Stack.svelte';
	import Swap from './Swap.svelte';
	import { fly } from "svelte/transition";

	import FaMoon from 'svelte-icons/fa/FaMoon.svelte'

    window.refreshUserInfo = async () => {
		if(!$Connection.web3)
			return console.log('Can\'t refresh');

		let stake = $Stake;	
		stake.contract = new $Connection.web3.eth.Contract(abi_stake, $Stake.address);
		Stake.set(stake);

		let token = $Token;	
		token.contract = new $Connection.web3.eth.Contract(abi_token, $Token.address);
		Token.set(token);

    
		let connection = $Connection;
		let user = $User;

		if ($Connection.chainId == 4) {
			
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

			let token = new $Connection.web3.eth.Contract(abi_eth_token, $ETH_Token.address);
			
			const balance = Number(await token.methods.balanceOf(
				$Connection.account
			).call());

			let bridgeIn = new $Connection.web3.eth.Contract(abi_bridgeIn, $BridgeIn.address);
			
			const burned = Number(await bridgeIn.methods.balance(
				$Connection.account
			).call());
			console.log("burned",burned);
			
			user.burned = burned;
			user.bhf = balance;
			User.set(user);    		

		} else {
			try {
				connection.tx_OnGoing = true;
				
				connection.tx_Message = 'Consulting balance';
				Connection.set(connection); 
				const st = await stake.contract.methods.getStake($Connection.account).call();
				user.affiliation_date = st.time;
				
				user.structure = st.roleStructure == 0 ? 0: new Date(Number(st.roleStructure)*1000);
				user.treasure = st.roleTreasure == 0 ? 0: new Date(Number(st.roleTreasure)*1000);
				console.log('User structure: ', user.structure);
				console.log('User treasure: ', user.treasure);
				const staked = await stake.contract.methods.balanceOf($Connection.account).call();
				const role = await stake.contract.methods.getRole($Connection.account).call();
				console.log("staked", staked);
				console.log("role", role);
				
				const balance = await token.contract.methods.balanceOf($Connection.account).call();
				console.log("Balance: ", balance);
				user.bhm = balance;
				user.staked = staked;
				user.role = role;
				
				User.set(user);    		
			} catch (error) {
				console.log("Can\'t refresh", error);
				setTimeout(() => window.refreshUserInfo() , 3000);
			} finally {
				connection.tx_OnGoing = false;
				connection.tx_Message = '';
				Connection.set(connection); 
			}
		}
    };

    window.claim = async () => {
        
		let bridge = $Bridge;	
		bridge.contract = new $Connection.web3.eth.Contract(abi_bridge, $Bridge.address);
		Token.set(bridge);

		connection.tx_OnGoing = true;
		Connection.set(connection); 
		console.log('Claiming');
		
		
		await $Bridge.contract.methods.claim($Connection.account, tier_num, []).send({ from: $Connection.account })
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
	};

	let navOpen = false;
	
	function handleNav() {
		navOpen = !navOpen;
	}
	
	// function handleNavWithKey(e) {
	// 	console.log(e.code);
	// 	if (e.code === "F1") {
	// 		navOpen = !navOpen;
	// 	}
	// }	

	let swap = true;
	    
</script>

<!-- <svelte:window on:keydown={handleNavWithKey} /> -->

<div class="body">

	
	<Router>
	<Modal>
	<Notifications>
		<div class="top-bar">
			<div>
				<img class="logo" src="" alt="logo">
			</div>
			<div class="switch">
				<button class="btn" on:click={()=>{ swap = !swap }}>
					<b>
						{#if swap}
							Staking
						{:else}
							Swap
						{/if}
					</b>
				</button>
			</div>
			<div>
				<div class="container">
					<Toggle>
						<div class="icon-2">
							<FaMoon />
						</div>
					</Toggle>
				</div>
				<div class="container">
					<Connect_Button />
				</div>
			</div>
		</div>
		<div id="main" class:pushMainToRight={navOpen}>
			<main>
				{#if swap}
				<div 
					in:fly={{ x: 100, duration: 400, delay: 150 }}
					out:fly={{ x: 100, duration: 400 }}>
						<Stack />
				</div>
				{:else}
				<div 
					in:fly={{ x: -100, duration: 400, delay: 150 }}
					out:fly={{ x: -100, duration: 400 }}>
						<Swap />
				</div>
				{/if}
			</main>
		</div>

		<footer>
			<p><small><b>Mines</b>&<b>Brokers</b></small></p>
			<p class="footer-icon">
				<a href="https://medium.com/">
					<img class="icon" src="/img/icon/blog.png" alt="">
				</a>
				<a href="https://snapshot.org/#/collectorsdefi.eth">
					<img class="icon" src="/img/icon/voting.png" alt="">
				</a>
				<a href="https://www.youtube.com/watch?v=YVgfHZMFFFQ&t=1s">
					<img class="icon" src="/img/icon/tutorials.png" alt="">
				</a>
				<a href="https://git-scm.com/doc">
					<img class="icon" src="/img/icon/documents.png" alt="">
				</a>
			</p>
		</footer>
	</Notifications>
	</Modal>
	</Router>
</div>

<style>
	.top-bar>div {
		width: 200px;
		justify-content: center;
    	display: flex;
	}

	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
		width: 80%;
	}

	.footer-icon .icon {
		padding: 0 3px 0 3px;
		filter: brightness(0);
	}

	footer {
		background-color: #6a696956;
	}

	:global(body.dark-mode) footer {
		background-color: #f5f5f556;
	}

	.body {
		/* background-image: url("/img/background.gif"); */
		background: #e9e9e9;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover; 
		height: 100%;
		display:flex; 
		flex-direction:column;
		overflow: auto;
		opacity: 0.8;
	}
	
	:global(body.dark-mode) .body {
		background-image: url("/img/platform_bg.jpg");
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	:global(body.dark-mode) .icon {
		color: #080808;
	}

	/* Hamburger Menu icon */	
	.container {
		display: inline-block;
		cursor: pointer;
	}

	.top-bar {
		display: flex;
		justify-content: space-between;
		margin-top: 1.5em;
		align-items: center;
		padding: 0 2em 0 2em;
	}

	.top-bar > * {
		margin-right: 1em;
	}

	/* Style page content - use this if you want to push the page content to the right when you open the side navigation */
	#main {
	transition: all .5s;
	padding: 20px;
	}
	
</style>