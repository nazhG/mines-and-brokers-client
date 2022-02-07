import { writable } from "svelte/store";

const Stake = writable({
    address: "0xe82e2c3Ffc166FC80257c98B20BB87392Eb6116D",
    contract: null,
  }),
  Token = writable({
    address: "0xd312f18554Ff14e14f40F7705aa3751d7336FC38",
    simbol: "LP",
    contract: null,
  }),
  ETH_Token = writable({
    address: "0x78Eb54810EB97e38A716c069021Df90be6aC68C5",
    simbol: "BHF",
    contract: null,
  }),
  BridgeIn = writable({
    address: "0xDdf8DA085Ed542eD1bc8A32411f1B26C0031623E",
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
    bhm: 0,
    staked: 0,
    role: 0,
    burned: 0,
    bhf: 0,
  });

export { Stake, Token, Bridge, BridgeIn, Connection, User, ETH_Token };
