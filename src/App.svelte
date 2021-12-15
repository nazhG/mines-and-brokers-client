<script>
	import Notifications from 'svelte-notifications';
  	import { Router, Route, Link } from "svelte-navigator";
	import Connect_Button from './Connect_Button.svelte';
	import Modal from 'svelte-simple-modal';
	import Toggle from './Toggle.svelte';
	import { Connection, User } from './stores.js';

	import FaRegFolder from 'svelte-icons/fa/FaRegFolder.svelte'
	import FaRegNewspaper from 'svelte-icons/fa/FaRegNewspaper.svelte'
	import FaCompressArrowsAlt from 'svelte-icons/fa/FaCompressArrowsAlt.svelte'
	import FaTv from 'svelte-icons/fa/FaTv.svelte'
	import FaVoteYea from 'svelte-icons/fa/FaVoteYea.svelte'
	import FaMoon from 'svelte-icons/fa/FaMoon.svelte'

    window.refreshUserInfo = async () => {
		if(!$Connection.web3)
			return console.log('Can\'t refresh');

		// let claimer = $Claimer;	
		// claimer.contract = new $Connection.web3.eth.Contract(abi_claim, $Claimer.address);
		// Claimer.set(claimer);


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
			<a href="https://medium.com/">
				<div class="icon"><FaRegNewspaper /></div><span class="sidenav-item">&nbsp;Blog</span>
			</a>
			<Link to="/">
				<div class="icon"><FaCompressArrowsAlt /></div><span class="sidenav-item">&nbsp;Cripto-funding</span>
			</Link>
			<Link to="videos">
				<div class="icon"><FaTv /></div><span class="sidenav-item">&nbsp;Tutorials</span>
			</Link>
			<Link to="wallet">
				<div class="icon"><FaVoteYea /></div><span class="sidenav-item">&nbsp;Voting</span>
			</Link>
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
					<div style="display: flex;justify-content: space-around;">
						<div>
							<h1><i>M&B</i> <b>Staking</b></h1>
							<div class="staking">
								<h3>staked MaB Tokens</h3>
								<span class="data-r">02304.2</span>
								<span class="data-l">MaB</span>
								<hr>
								<h3>To Stack/Withdraw</h3>
								<span class="data-r">02304.2</span>
								<span class="data-l">Mab</span>
								<hr>
								<button>STACK</button>
								<button>WITHDRAW</button>
							</div>
						</div>
						<div>
							<h1><i>M&B</i> <b>Staking</b></h1>
							<div class="staking">
								<h3>Your Staking Group</h3>
								<span class="data-g">093 Group | A.1</span>
								<small class="details">See group Details</small>
								<h3>Staking Reward</h3>
								<div>
									<div style="display: flex;">
										<span class="data-r" style="width: 70%;text-align: justify;">&nbsp;321</span>
										<span class="data-l">Mab</span>
									</div>
									<div style="display: flex;justify-content: space-between;padding: 0 0.5em;margin-bottom: 0.8em;">
										<small class="details">23% Monthly</small>
										<small class="details">Cycle N°2-23b</small>
									</div>
								</div>
								<button>CLAIM</button>
							</div>
						</div>
					</div>
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

	.staking {
		border: 1px solid white;
		border-radius: 10px;
		background-color: #121427ff;
		padding: 0 2.2em 2em;
    	font-size: larger;
		height: 309px;
		/*-webkit-transform: perspective(300px) rotateX(25deg);*/
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
	}
	
	.staking .data-l{
		color: white;
		background-color: #1c9bf3ff;
		margin-left: -5px;
		padding: 8px;
		border-radius: 0 25px 25px 0;
		border: 1px solid white;
		font-weight: bold;
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
		
	.pushMainToRight {
		margin-left: 40%
	/* 	transform: translate3d(40%, 0, 0); */
		
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