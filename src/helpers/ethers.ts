import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

window.ethereum.enable();

export default class Ethers {
  provider: ethers.providers.Web3Provider;

  constructor() {
    this.provider = new ethers.providers.Web3Provider(window.ethereum)
  }
}