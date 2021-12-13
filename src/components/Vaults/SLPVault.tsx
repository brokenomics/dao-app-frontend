/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import { logger } from 'services';
import { BNLike } from 'ethereumjs-util';
import coinGeckoApi from 'api/coingeckoApi';
import slpVaultAbi from './abi/SLPVault.json';
import slpTokenAbi from '../SLPToken/SLPToken.json';
import newoTokenAbi from '../Staking/Governance-Token.json';
import usdcTokenAbi from './abi/USDCToken.json';

const SLP_VAULT = process.env.REACT_APP_SLP_VAULT;
const SLP_TOKEN = process.env.REACT_APP_SLP_TOKEN_ADDRESS;
const NEWO_TOKEN = process.env.REACT_APP_TOKEN_ADDRESS;
const USDC_TOKEN = process.env.REACT_APP_USDC_TOKEN_ADDRESS;

export default class SLPVault {
  public slpTokenInstance;

  public slpVaultInstance;

  public newoTokenInstance;

  public usdcTokenInstance;

  public yearInSeconds = 31536000;

  public dayInSeconds = 86400;

  public newoTokenId = 'new-order';

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

    this.newoTokenInstance = new window.web3.eth.Contract(
      newoTokenAbi,
      NEWO_TOKEN,
    );

    this.usdcTokenInstance = new window.web3.eth.Contract(
      usdcTokenAbi,
      USDC_TOKEN,
    );
  }

  async getLatestNewoTokenPrice() {
    let currentPrice = 0;

    await coinGeckoApi
      .get(`/coins/${this.newoTokenId}`)
      .then((res) => {
        currentPrice = res.data.market_data.current_price.usd;
      })
      .catch((err) => {
        logger.log(err);
      });

    return currentPrice;
  }

  async getTokenBalance(who: string) {
    const balance = new BigNumber(
      await this.slpTokenInstance.methods.balanceOf(who).call(),
    );

    return Number(balance.shiftedBy(-18).toFixed(6, 1));
  }

  async getVaultBalance() {
    const balance = new BigNumber(
      await this.slpVaultInstance.methods.totalSupply().call(),
    );

    return Number(balance.shiftedBy(-18).toFixed(6, 1));
  }

  async getUserVaultBalance(who: string) {
    const balance = new BigNumber(
      await this.slpVaultInstance.methods.balanceOf(who).call(),
    );

    return Number(balance.shiftedBy(-18).toFixed(6, 1));
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

  async userDeposit(amount: string, who: string, balance: string) {
    try {
      const depositAmountEther = window.web3.utils.toWei(amount, 'ether');
      let depositAmount = new BigNumber(depositAmountEther);

      const tokenAmountEther = window.web3.utils.toWei(balance, 'ether');
      const tokenAmount = new BigNumber(tokenAmountEther);

      if (depositAmount > tokenAmount) {
        depositAmount = tokenAmount;
      }

      const estimate = await this.slpVaultInstance.methods
        .stake(depositAmount)
        .estimateGas({ from: who });

      const tx = await this.slpVaultInstance.methods
        .stake(depositAmount)
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
    const totalNewo = new BigNumber(
      await this.newoTokenInstance.methods.balanceOf(SLP_TOKEN).call(),
    );

    const totalUsdc = new BigNumber(
      await this.usdcTokenInstance.methods.balanceOf(SLP_TOKEN).call(),
    );

    const rewardRate = new BigNumber(
      await this.slpVaultInstance.methods.rewardRate().call(),
    );
    const tokenPrice = await this.getLatestNewoTokenPrice();

    const totalSlpToken = new BigNumber(
      await this.slpTokenInstance.methods.totalSupply().call(),
    );

    const totalVaultBalance = new BigNumber(
      await this.slpVaultInstance.methods.totalSupply().call(),
    );

    const tvl =
      ((totalUsdc.shiftedBy(-6).toNumber() +
        totalNewo.shiftedBy(-18).toNumber()) *
        tokenPrice *
        totalVaultBalance.shiftedBy(-18).toNumber()) /
      totalSlpToken.shiftedBy(-18).toNumber();

    const apy =
      ((rewardRate.shiftedBy(-18).toNumber() * tokenPrice) / tvl) *
      this.yearInSeconds *
      100;

    const formattedApy = Number(apy.toFixed(4));

    return formattedApy;
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
    const rewards = new BigNumber(
      await this.slpVaultInstance.methods.earned(who).call(),
    );

    return Number(rewards.shiftedBy(-18).toFixed(6, 1));
  }

  async withdrawRewards(who: string) {
    try {
      const estimate = await this.slpVaultInstance.methods
        .getReward()
        .estimateGas({ from: who });

      const tx = await this.slpVaultInstance.methods
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
