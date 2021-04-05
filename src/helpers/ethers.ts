import { ethers } from "ethers";
const diamondAbi = require('../abi/diamond.json');
const aavegotchiAddress = '0x86935F11C86623deC8a25696E1C19a8659CbF95d';

declare global {
  interface Window {
    ethereum: any;
  }
}

window.ethereum.enable();

export default class Ethers {
  provider: ethers.providers.Web3Provider;
  contract: ethers.Contract;

  constructor() {
    this.provider = new ethers.providers.Web3Provider(window.ethereum)
    this.contract = new ethers.Contract(aavegotchiAddress, diamondAbi, this.provider);
  }

  public getAavegotchiSVG = async (tokenId: string) => {
    const svg = await this.contract.getAavegotchiSvg(tokenId);
    return svg;
  };
}