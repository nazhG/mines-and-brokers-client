<script>

</script>

<div class="main">
	<div>
		<h1 class="tittle"><i>M&B</i> <b>Staking</b></h1>
		<div class="staking">
			<h3>staked MaB Tokens</h3>
			<input type="text" value="" class="data-r">
			<input type="text" value="MaB" class="data-l">
			<hr>
			<h3>To Stack/Withdraw</h3>
			<input type="text" value="" class="data-r">
			<input type="text" value="Mab" class="data-l">
			<hr>
			<button>STACK</button>
			<button>WITHDRAW</button>
		</div>
	</div>
	<div>
		<h1 class="tittle"><i>M&B</i> <b>Staking</b></h1>
		<div class="staking">
			<h3>Your Staking Role</h3>
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

<style>
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
		padding: 0 2.2em 2em;
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