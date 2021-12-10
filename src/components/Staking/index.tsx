/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Web3 from 'web3';
import { BNLike } from 'ethereumjs-util';
import stakingAbi from './Voting-Power.json';
import tokenAbi from './Governance-Token.json';
// import { signMessage } from './utils/web3';
// import { version } from './constants.json';

const STAKING_CONTRACT_ADDRESS = process.env.REACT_APP_STAKING_ADDRESS;
const GOVERNANCE_TOKEN_ADDRESS = process.env.REACT_APP_TOKEN_ADDRESS;
export default class Staking {
  public stakingInstance;

  public tokenInstance;

  constructor() {
    window.web3 = new Web3(window.ethereum);

    const abstract = stakingAbi;
    const tokenAbstract = tokenAbi;

    this.tokenInstance = new window.web3.eth.Contract(
      tokenAbstract,
      GOVERNANCE_TOKEN_ADDRESS,
    );
    this.stakingInstance = new window.web3.eth.Contract(
      abstract,
      STAKING_CONTRACT_ADDRESS,
    );
  }

  async getApproval(spender: string, amount: number | BNLike, sender: string) {
    try {
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

  // view staked + locked
  async getTotalVotingPower(who: string) {
    const totalVotingPower = await this.stakingInstance.methods
      .votingPower(who)
      .call();

    return totalVotingPower;
  }

  // view staked
  async getStakedVotingPower(who: string) {
    const stakedVotingPower = await this.stakingInstance.methods
      .totalStakedFor(who)
      .call();

    return stakedVotingPower;
  }

  async stakeToken(amount: number, who: string) {
    try {
      const tokens = window.web3.utils.toWei(amount.toString(), 'ether');
      const bnValue = window.web3.utils.toBN(tokens);
      const tx = await this.stakingInstance.methods
        .stake(bnValue)
        .send({ from: who }, (error, transactionHash) => {
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

  async unstakeToken(amount: number, who: string) {
    try {
      const tokens = window.web3.utils.toWei(amount.toString(), 'ether');
      const bnValue = window.web3.utils.toBN(tokens);
      const tx = await this.stakingInstance.methods
        .unstake(bnValue)
        .send({ from: who }, (error, transactionHash) => {
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
