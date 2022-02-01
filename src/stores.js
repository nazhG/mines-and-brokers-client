import { writable } from "svelte/store";

const Stake = writable({
    address: "0xe0a424cBE0a155E6983048F7db8DDDBD19F1f1ac",
    contract: null,
  }),
  Token = writable({
    address: "0xd312f18554Ff14e14f40F7705aa3751d7336FC38",
    simbol: "LP",
    contract: null,
  }),
  Bridge = writable({
    address: "0xe61C78556Eb753DF4723dd2e5c7538ad97cfcFeE",
    contract: null,
  }),
  Connection = writable({
    web3: null,
    logged: false,
    account: null,
    chainId: null,
    tx_OnGoing: false,
    tx_Message: "",
  }),
  User = writable({
    affiliation_date: 0,
    staked: 0,
    role: 0,
  });

export { Stake, Token, Connection, User };
