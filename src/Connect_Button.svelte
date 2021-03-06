<script>
  import { getNotificationsContext } from "svelte-notifications";
  import { onMount } from "svelte";
  import detectEthereumProvider from '@metamask/detect-provider';
  import { getContext } from 'svelte';
  import { useNavigate, useLocation } from "svelte-navigator";
  import Modal from './Modal.svelte';
	import { Connection, User } from './stores.js';

const { open } = getContext('simple-modal');
const { addNotification } = getNotificationsContext();

const navigate = useNavigate();
const location = useLocation();

let provider, connection = $Connection;

onMount(async () => {
  provider = await detectEthereumProvider();
  if (provider) {
    connection.web3 = new Web3(provider);
		Connection.set(connection); 
  } else {
    open(Modal, { message: 'To connect you will need MetaMask. 🦊',
    linkRef: 'https://metamask.io/download',
    linkText: 'How to download metaMask?', });
    console.log('No provider found');
  }

  handleChainChanged(await ethereum.request({ method: 'eth_chainId' }));

  ethereum
    .request({ method: 'eth_accounts' })
    .then(handleAccountsChanged)
    .catch((err) => {
      console.error(err);
  });

  ethereum.on('chainChanged', handleChainChanged);

  ethereum.on('accountsChanged', handleAccountsChanged);
});

const handleChainChanged = (_chainId) => {
  connection.chainId = parseInt(_chainId); // hex to dec
	Connection.set(connection); 
  console.log('chain Id: ', parseInt(_chainId));
  
  if ($Connection.chainId != 97 && $Connection.chainId != 4) {
    open(Modal, { message: 'Please, change the chain to bnb testnet',
      linkRef: 'https://docs.binance.org/smart-chain/wallet/metamask.html',
      linkText: 'How add the chain to MetaMask?',
    });
  }
  // window.location.reload();
};

const handleAccountsChanged = async (_accounts) => {
  if (_accounts.length === 0) {
    addNotification({
      text: 'Please connect to MetaMask.',
      position: "top-right",
      type: "danger",
      removeAfter: 5000,
    });
    connection.logged = false;
    connection.account = null;
    connection.web3 = null;
		Connection.set(connection); 

    let user = $User;
    user.funds = 0;
    user.tier = -1;
    user.affiliation_date = 0;
    user.reward = 0;
    User.set(user);
  } else if (_accounts[0] !== $Connection.account) {
    connection.logged = true;
    connection.account = _accounts[0];
    connection.web3 = new Web3(provider);
		Connection.set(connection); 

		// window.refreshUserInfo();
    
    if ($User.tier >= 0) {
      navigate("/wallet", {
        state: { from: $location.pathname }
      });
    }

    addNotification({
      text: 'Connected to ' + accountFilter($Connection.account),
      position: "top-right",
      type: "success",
      removeAfter: 3000,
    });

	  window.refreshUserInfo();

    handleChainChanged(await ethereum.request({ method: 'eth_chainId' }));
  }
};

const handleConnect = () => {
  ethereum
    .request({ method: 'eth_requestAccounts' })
    .then(handleAccountsChanged)
    .catch((err) => {
      addNotification({
        text: 'Connection error: ' + err.message,
        position: "top-right",
        type: "danger",
        removeAfter: 5000,
      });
    });
};

const accountFilter = (_account) => {
  let ac = String(_account);
  return `${ac.substr(0, 6)}...${ac.substr(ac.length - 4, 4)}`;
};

</script>

<button
	class="btn btn-connect tooltip"
	on:click={handleConnect}
	disabled={$Connection.logged}>
  {#if $Connection.logged}
    <div>
      { accountFilter($Connection.account) }
      <div class="badge { $Connection.logged ? ($Connection.chainId != 97 ? 'warnig' : 'success') : '' }"></div>
    </div>
    <span class="tooltiptext">
			{#if $Connection.chainId != 97}
        Wrong chain
			{:else}
        Connected
			{/if}
    </span>
    {#if $Connection.tx_Message}
      <br><i class="fas fa-spinner fa-pulse"></i>&nbsp;{ $Connection.tx_Message }
    {/if}
  {:else}
    Connect MetaMask
  {/if}
</button>

<style>

  .badge {
    border-radius: 50%;
    width: 10px;
    height: 10px;
    display: inline-flex;
  }

  .warnig {
    color: white;
    background-color: #ffb900;
  }
  
  .success {
    color: white;
    background-color: #22ce6c;
  }

  .tooltip .tooltiptext {
    bottom: 110% !important;
    max-width: 300px;
  }

  button {
    color: #333;
    margin-bottom: 0 !important;
    font-weight: bold;
  }

</style>
