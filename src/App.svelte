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

	import FaExchangeAlt from 'svelte-icons/fa/FaExchangeAlt.svelte'
	import FaRegFolder from 'svelte-icons/fa/FaRegFolder.svelte'
	import FaRegNewspaper from 'svelte-icons/fa/FaRegNewspaper.svelte'
	import FaCompressArrowsAlt from 'svelte-icons/fa/FaCompressArrowsAlt.svelte'
	import FaTv from 'svelte-icons/fa/FaTv.svelte'
	import FaVoteYea from 'svelte-icons/fa/FaVoteYea.svelte'
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
				console.log('User staked: ', st);
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
	
	function handleNavWithKey(e) {
		console.log(e.code);
		if (e.code === "F1") {
			navOpen = !navOpen;
		}
	}	
	    
</script>

<svelte:window on:keydown={handleNavWithKey} />

<div class="body">

	
	<Router>
	<Modal>
	<Notifications>

		<div class="sidenav" class:open={navOpen}>
			<a href="#a" class="closebtn" on:click={handleNav}>&times;</a>
			
			<Link to="files">
				<div class="icon"><FaRegFolder /></div><span class="sidenav-item">&nbsp;Documents</span> 
			</Link>
			<Link to="swap">
				<div class="icon"><FaExchangeAlt /></div><span class="sidenav-item">&nbsp;Swap</span> 
			</Link>
				<a href="https://medium.com/">
					<div class="icon"><FaRegNewspaper /></div><span class="sidenav-item">&nbsp;Blog</span>
				</a>
			<Link to="/">
				<div class="icon"><FaCompressArrowsAlt /></div><span class="sidenav-item">&nbsp;Cripto-funding</span>
			</Link>
			<Link to="videos">
				<div class="icon"><FaTv /></div><span class="sidenav-item">&nbsp;Tutorials</span>
			</Link>
			<a href="https://snapshot.org/#/collectorsdefi.eth">
				<div class="icon"><FaVoteYea /></div><span class="sidenav-item">&nbsp;Voting</span>
			</a>
		</div>

		<div class="top-bar">
			<div class="container">
				<Toggle>
					<div class="icon-2"><FaMoon />
				</Toggle>
			</div>

			<div class="container">
				<Connect_Button />
			</div>
	
			<div class="container" class:change={navOpen} on:click={handleNav}>
				<div class="bar1"></div>
				<div class="bar2"></div>
				<div class="bar3"></div>
			</div>
		</div>

		<div id="main" class:pushMainToRight={navOpen}>
			<main>
				<Route path="wallet">
					<!-- <Wallet /> -->
				</Route>
				<Route path="/">
					<Stack />
				</Route>
				<Route path="swap">
					<Swap></Swap>
				</Route>
				<Route path="files">
					<h1><i>Files</i>.</h1>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
						Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
						nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
						in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
						Excepteur sint occaecat cupidatat non proident,
						sunt in culpa qui officia deserunt mollit anim id est laborum.
					</p>
				</Route>
				<Route path="videos">
					<h1><i>Videos</i>.</h1>
					<div>
						<iframe 
							width="590" 
							height="345" 
							title="Totu"
							src="https://www.youtube.com/embed/CVHj7Wxhvdo">
						</iframe>
						<br>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
							sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
							in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
							Excepteur sint occaecat cupidatat non proident,
							sunt in culpa qui officia deserunt mollit anim id est laborum.
					</div>
				</Route>
			</main>
		</div>

		<footer>
			<p><b>Mines</b>&<b>Brokers</b></p>
		</footer>
	</Notifications>
	</Modal>
	</Router>
</div>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
		width: 80%;
	}

	.body {
		background-image: url("/img/background.gif");
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
		background-image: url("/img/dark-background.gif");
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	:global(body.dark-mode) .icon {
		color: white;
	}

	/* Hamburger Menu icon */	
	.container {
		display: inline-block;
		cursor: pointer;
	}

	.top-bar {
		display: flex;
		justify-content: end;
		margin-top: 1.5em;
		align-items: center;
	}

	.top-bar > * {
		margin-right: 1em;
	}

	.bar1, .bar2, .bar3 {
	width: 35px;
	height: 5px;
	background-color: #333;
	border-radius: 10px;
	margin: 6px 0;
	transition: 0.4s;
	}

	:global(body.dark-mode) .bar1, 
	:global(body.dark-mode) .bar2, 
	:global(body.dark-mode) .bar3 {
		background-color: white
	}
	
	.change .bar1 {
	-webkit-transform: rotate(-45deg) translate(-9px, 6px);
	transform: rotate(-45deg) translate(-9px, 6px);
	}

	.change .bar2 {opacity: 0;}

	.change .bar3 {
	-webkit-transform: rotate(45deg) translate(-8px, -8px);
	transform: rotate(45deg) translate(-8px, -8px);
	}
		
	/* The side navigation menu */
	.sidenav {
		height: 100%; 
		width: 0; /* 0 width - change this with JavaScript */
		position: fixed;
		z-index: 1;
		top: 0;
		left: 0;
		background: linear-gradient(180deg, #72bafd 1%, #F7FBE7 100%);
		overflow-x: hidden; /* Disable horizontal scroll */
		padding-top: 60px;
		transition: 0.5s;
	}

	:global(body.dark-mode) .sidenav {
		background: linear-gradient(180deg, #011a3fff 1%, #1c9bf3ff 100%);
	}


	/* When you mouse over the navigation links, change their color */
	.sidenav a:hover {
		color: #f1f1f1;
	}

	.sidenav-item {
		color: black;
	}

	.sidenav-item {
		color: #333;
	}

	:global(body.dark-mode) .sidenav-item {
		color: white;
	}

	:global(body.dark-mode) .sidenav a:hover {
		color: black
	}

	/* Position and style the close button (top right corner) */
	.sidenav .closebtn {
		position: absolute;
		top: 0;
		right: 25px;
		font-size: 36px;
		margin-left: 50px;
	}

	/* Style page content - use this if you want to push the page content to the right when you open the side navigation */
	#main {
	transition: all .5s;
	padding: 20px;
	}
		
	.open {
		width: 320px;
	}	

	/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
	@media screen and (max-height: 450px) {
	.sidenav {padding-top: 15px;}
	.sidenav a {font-size: 18px;}
	}
	
</style>