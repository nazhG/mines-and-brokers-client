import { writable } from "svelte/store";

const Stake = writable({
    address: "0x12eC09259A57A892F21169686ed4238A9F9Bf7A5",
    contract: null,
  }),
  Token = writable({
    address: "0xA80a996007C89802A381A62c7a454166400975B4",
    simbol: "BHM",
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
    address: "0x44fDBC0AA0538F740eDF8244cc429503BEee58d1",
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
    structure: 0,
    treasure: 0,
    role: 0,
    burned: 0,
    bhf: 0,
  });

export { Stake, Token, Bridge, BridgeIn, Connection, User, ETH_Token };
