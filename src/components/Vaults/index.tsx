/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Web3 from 'web3';
import { BNLike } from 'ethereumjs-util';
// import registryAbi from './abi/Registry.json';
// import riskManagerAbi from './abi/RiskManager.json';
import vaultAbi from './abi/Vault.json';
import tokenAbi from '../Staking/Governance-Token.json';
// import { signMessage } from './utils/web3';
// import { version } from './constants.json';

// const REGISTRY_ADDRESS = process.env.REACT_APP_REGISTRY_ADDRESS;
// const RISK_MANAGER_ADDRESS = process.env.REACT_APP_RISK_MANAGER_ADDRESS;
const VAULT_RP_ADDRESS = process.env.REACT_APP_BAL_ODEFI_RP0_Vault;
const TOKEN_ADDRESS = process.env.REACT_APP_TOKEN_ADDRESS;
const RATE = process.env.REACT_APP_RATE_PER_SECOND_PER_TOKEN;
export default class Vault {
  // public registryInstance;

  // public riskManagerInstance;

  public tokenInstance;

  public rpVaultInstance;

  public ratePerToken;

  public yearInSeconds = 31536000;

  constructor() {
    window.web3 = new Web3(window.ethereum);

    // const registryAbstract = registryAbi.abi;
    // const riskmanagerAbstract = riskManagerAbi.abi;
    // const usdcAbstract = vaultAbi.abi;
    const rpAbstract = vaultAbi;

    // this.registryInstance = new window.web3.eth.Contract(
    //   registryAbstract,
    //   REGISTRY_ADDRESS,
    // );
    // this.riskManagerInstance = new window.web3.eth.Contract(
    //   riskmanagerAbstract,
    //   RISK_MANAGER_ADDRESS,
    // );

    this.ratePerToken = RATE;
    this.tokenInstance = new window.web3.eth.Contract(tokenAbi, TOKEN_ADDRESS);
    this.rpVaultInstance = new window.web3.eth.Contract(
      rpAbstract,
      VAULT_RP_ADDRESS,
    );
  }

  async getVaultBalance() {
    const balance = await this.rpVaultInstance.methods.totalSupply().call();

    const formattedBal = Number((Number(balance) / 10 ** 18).toFixed(2));

    return formattedBal;
  }

  async getUserVaultBalance(who: string) {
    const balance = await this.rpVaultInstance.methods.balanceOf(who).call();

    const formattedBal = Number((Number(balance) / 10 ** 18).toFixed(2));

    return formattedBal;
  }

  async getApproval(spender: string, amount: number | BNLike, sender: string) {
    try {
      // const tokens = window.web3.utils.toWei(amount.toString(), 'ether');
      // const bnValue = window.web3.utils.toBN(tokens);

      const tx = await this.tokenInstance.methods
        .approve(spender, amount)
        .send({ from: sender }, (error, transactionHash) => {
          if (error) {
            return false;
          }

          return transactionHash.hash;
        });

      return tx;
    } catch (error) {
      return false;
    }
  }

  async getAllowance(who: string, spender: string) {
    try {
      const tx = await this.tokenInstance.methods
        .allowance(who, spender)
        .call();

      return tx;
    } catch (err) {
      return false;
    }
  }

  async userDeposit(amount: number, who: string) {
    try {
      const tokens = window.web3.utils.toWei(amount.toString(), 'ether');
      const bnValue = window.web3.utils.toBN(tokens);
      const estimate = await this.rpVaultInstance.methods
        .stake(amount)
        .estimateGas({ from: who });

      const tx = await this.rpVaultInstance.methods
        .stake(bnValue)
        .send(
          { from: who, gas: estimate + 10000 },
          (error, transactionHash) => {
            if (error) {
              return false;
            }

            return transactionHash.hash;
          },
        );

      return tx;
    } catch (error) {
      return false;
    }
  }

  /*
20% APY is 0.20 over 31536000 seconds
or 0.20 / 31536000 per second
= 0.000000006341958 which is
or 6341958000 * 10^-18
*/

  async getPricePerShare() {
    const price = await this.rpVaultInstance.methods
      .getPricePerFullShare()
      .call();

    return price;
  }

  // GET APY FOR VAULT
  async getStrategyAPY() {
    // const balance = await this.rpVaultInstance.methods.balanceOf(who).call();
    const rewardRate = await this.rpVaultInstance.methods.rewardRate().call();
    const totalSupply = await this.rpVaultInstance.methods.totalSupply().call();

    const apy =
      100 * Number(this.yearInSeconds) * (Number(rewardRate) / totalSupply);

    const formattedAPY = apy.toFixed(2);

    if (Number.isNaN(parseInt(formattedAPY))) return 0;

    return parseInt(formattedAPY);
  }

  async userWithDrawAll(who: string) {
    try {
      const estimate = await this.rpVaultInstance.methods
        .exit()
        .estimateGas({ from: who });

      const tx = await this.rpVaultInstance.methods
        .exit()
        .send({ from: who, gas: estimate }, (error, transactionHash) => {
          if (error) {
            return false;
          }

          return transactionHash.hash;
        });

      return tx;
    } catch (error) {
      return false;
    }
  }
}
