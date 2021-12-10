/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Web3 from 'web3';
import { BNLike } from 'ethereumjs-util';
import slpVaultAbi from './abi/SLPVault.json';
import slpTokenAbi from '../SLPToken/SLPToken.json';

const SLP_VAULT = process.env.REACT_APP_SLP_VAULT;
const SLP_TOKEN = process.env.REACT_APP_SLP_TOKEN_ADDRESS;

export default class SLPVault {
  public slpTokenInstance;

  public slpVaultInstance;

  public yearInSeconds = 31536000;

  constructor() {
    window.web3 = new Web3(window.ethereum);

    const slpVaultAbstract = slpVaultAbi;

    this.slpTokenInstance = new window.web3.eth.Contract(
      slpTokenAbi,
      SLP_TOKEN,
    );
    this.slpVaultInstance = new window.web3.eth.Contract(
      slpVaultAbstract,
      SLP_VAULT,
    );
  }

  async getTokenBalance(who: string) {
    const balance = await this.slpTokenInstance.methods.balanceOf(who).call();

    const formattedBal = Number((Number(balance) / 10 ** 18).toFixed(2));

    return formattedBal;
  }

  async getVaultBalance() {
    const balance = await this.slpVaultInstance.methods.totalSupply().call();

    const formattedBal = Number((Number(balance) / 10 ** 18).toFixed(2));

    return formattedBal;
  }

  async getUserVaultBalance(who: string) {
    const balance = await this.slpVaultInstance.methods.balanceOf(who).call();

    const formattedBal = Number((Number(balance) / 10 ** 18).toFixed(2));

    return formattedBal;
  }

  async getApproval(spender: string, amount: number | BNLike, sender: string) {
    try {
      const tx = await this.slpTokenInstance.methods
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
      const tx = await this.slpTokenInstance.methods
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
      const estimate = await this.slpVaultInstance.methods
        .stake(bnValue)
        .estimateGas({ from: who });

      const tx = await this.slpVaultInstance.methods
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

  async getStrategyAPY() {
    const rewardRate = await this.slpVaultInstance.methods.rewardRate().call();
    const totalSupply = await this.slpVaultInstance.methods
      .totalSupply()
      .call();

    const apy =
      100 * Number(this.yearInSeconds) * (Number(rewardRate) / totalSupply);

    const formattedAPY = apy.toFixed(2);

    if (Number.isNaN(parseInt(formattedAPY))) return 0;

    return parseInt(formattedAPY);
  }

  async userWithDrawAll(who: string) {
    try {
      const estimate = await this.slpVaultInstance.methods
        .exit()
        .estimateGas({ from: who });

      const tx = await this.slpVaultInstance.methods
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

  async getRewards(who: string) {
    const rewards = await this.slpVaultInstance.methods.rewards(who).call();

    const formattedBal = Number((Number(rewards) / 10 ** 18).toFixed(2));

    return formattedBal;
  }
}
