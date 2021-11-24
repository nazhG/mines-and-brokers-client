<script>
	import Notifications from 'svelte-notifications';
  	import { Router, Route, Link } from "svelte-navigator";
	import Connect_Button from './Connect_Button.svelte';
	import Modal from 'svelte-simple-modal';
	import { Connection, User } from './stores.js';

	import FaRegFolder from 'svelte-icons/fa/FaRegFolder.svelte'
	import FaRegNewspaper from 'svelte-icons/fa/FaRegNewspaper.svelte'
	import FaCompressArrowsAlt from 'svelte-icons/fa/FaCompressArrowsAlt.svelte'
	import FaTv from 'svelte-icons/fa/FaTv.svelte'
	import FaVoteYea from 'svelte-icons/fa/FaVoteYea.svelte'

    window.refreshUserInfo = async () => {
		if(!$Connection.web3)
			return console.log('Can\'t refresh');

		// let claimer = $Claimer;	
		// claimer.contract = new $Connection.web3.eth.Contract(abi_claim, $Claimer.address);
		// Claimer.set(claimer);


	};
</script>

<div class="body">
	<Router>
	<Modal>
	<Notifications>
		<header>
			<nav>
				<Link to="files">
					<div class="icon"><FaRegFolder /></div>&nbsp;Documents 
				</Link>
				<Link to="blog">
					<div class="icon"><FaRegNewspaper /></div>&nbsp;Blog 
				</Link>
				<Link to="/">
					<div class="icon"><FaCompressArrowsAlt /></div>&nbsp;Cripto-funding 
				</Link>
				<Link to="videos">
					<div class="icon"><FaTv /></div>&nbsp;Tutorials 
				</Link>
				<Link to="wallet">
					<div class="icon"><FaVoteYea /></div>&nbsp;Voting
				</Link>
			</nav>
			<Connect_Button />
		</header>
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
			<Route path="blog">
				<h1><i>Blog</i>.</h1>
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
		</main>
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
		background-image: url("/img/background.jpg");
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover; 
		height: 100%;
		display:flex; 
		flex-direction:column;
		overflow: auto;
	}

	header {
		background-color: #f5f5f528;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30px 30px 0;
		border-radius: 4px;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
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
	
</style>