/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import { BNLike } from 'ethereumjs-util';
import { logger } from 'services';
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
    const balance = new BigNumber(
      await this.rpVaultInstance.methods.totalSupply().call(),
    );

    return Number(balance.shiftedBy(-18).toFixed(4, 1));
  }

  async getUserVaultBalance(who: string) {
    const balance = new BigNumber(
      await this.rpVaultInstance.methods.balanceOf(who).call(),
    );

    return Number(balance.shiftedBy(-18).toFixed(4, 1));
  }

  async getApproval(spender: string, amount: number | BNLike, sender: string) {
    try {
      // const tokens = window.web3.utils.toWei(amount.toString(), 'ether');
      // const bnValue = window.web3.utils.toBN(tokens);

      const estimate = await this.tokenInstance.methods
        .approve(spender, amount)
        .estimateGas({ from: sender });

      const tx = await this.tokenInstance.methods
        .approve(spender, amount)
        .send(
          { from: sender, gas: Math.round(estimate + estimate * 0.2) },
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

  async userDeposit(amount: string, who: string) {
    try {
      const depositAmountEther = window.web3.utils.toWei(amount, 'ether');
      const depositBn = window.web3.utils.toBN(depositAmountEther);

      const estimate = await this.rpVaultInstance.methods
        .stake(depositBn)
        .estimateGas({ from: who });

      const tx = await this.rpVaultInstance.methods
        .stake(depositBn)
        .send(
          { from: who, gas: Math.round(estimate + estimate * 0.2) },
          (error, transactionHash) => {
            if (error) {
              return false;
            }

            return transactionHash.hash;
          },
        );

      return tx;
    } catch (error) {
      logger.log(error);

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
    const rewardRate = new BigNumber(
      await this.rpVaultInstance.methods.rewardRate().call(),
    );
    const totalSupply = new BigNumber(
      await this.rpVaultInstance.methods.totalSupply().call(),
    );

    const apy =
      100 *
      Number(this.yearInSeconds) *
      (rewardRate.shiftedBy(-18).toNumber() /
        totalSupply.shiftedBy(-18).toNumber());

    const formattedAPY = apy.toFixed(4);

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

  async getRewards(who: string) {
    const rewards = new BigNumber(
      await this.rpVaultInstance.methods.earned(who).call(),
    );

    return Number(rewards.shiftedBy(-18).toFixed(4, 1));
  }

  async withdrawRewards(who: string) {
    try {
      const estimate = await this.rpVaultInstance.methods
        .getReward()
        .estimateGas({ from: who });

      const tx = await this.rpVaultInstance.methods
        .getReward()
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
