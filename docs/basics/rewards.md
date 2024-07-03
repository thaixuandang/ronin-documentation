---
description: Rewards earned by validators, delegators, and bridge operators.
title: Rewards
---

## Overview

On Ronin, token holders stake their RON to participate in validator selection and in exchange, earn rewards for their service. Ronin allocates 180,000,000 RON for the staking rewards. 

<details>
<summary>Expand to see the reward allocation table</summary>

|         Year        	| Staking rewards (RON)	|
|:-------------------:	|:--------------:	|
|          1          	|   30,000,000   	| 
|          2          	|   30,000,000   	|  
|          3          	|   30,000,000   	| 
|          4          	|   28,000,000   	|
|          5          	|   24,000,000   	| 
|          6          	|   18,000,000   	|
|          7          	|   14,000,000   	|
|          8          	|    6,000,000   	|
| Total allocated RON 	|   180,000,000  	|

</details>

When the validator generates a block, they earn transaction fees for all the transactions in the block. These rewards are primarily meant to jump-start the network, until transaction fees become sustainable for staking rewards.


## Rewards for finality voting and producing blocks

Validators are responsible for producing blocks finality voting, and earning rewards for their efforts. When the DPoS went live in April 2023, only 22 selected validators (and their delegators) could produce blocks, vote for finality, and earn rewards on any given day. Starting in July 2024, all validators and delegators have the opportunity to earn rewards daily. Here’s how it works:

- All validators always actively **vote for finality**, which makes up 85% of the total rewards.
- Alongside 12 Governing Validators, 10 Rotating Validators are randomly selected every 10 minutes based on their staked amount to **produce blocks**. This process allows them to earn the remaining 15% of the total rewards.


## Rewards for validators

For their efforts to secure Ronin chain, validators receive block rewards, which are divided into *staking rewards* and *transaction fees*. A validator shares the staking reward and the transaction fees with their delegators—token holders who staked their RON with this validator.

### Commission from staking rewards

Each validator can set a commission rate, which is a percentage of the staking rewards that they get to keep. The rest is shared with the delegators based on the amount of RON each delegator staked to this validator. The higher the stake, the bigger the reward for the delegator.

<details>
<summary>Expand to see the expected annual commission amount</summary>

The following table is a sensitivity analysis of the expected annual commission for the first 8 years, considering the commission rate ranging from 5% to 20%.

| Commission rate | 5%     | 10%     | 15%     | 20%     |
| --------------- | ------ | ------- | ------- | ------- |
| Year 1          | 68,182 | 136,364 | 204,545 | 272,727 |
| Year 2          | 68,182 | 136,364 | 204,545 | 272,727 |
| Year 3          | 68,182 | 136,364 | 204,545 | 272,727 |
| Year 4          | 63,636 | 127,273 | 190,909 | 254,545 |
| Year 5          | 54,545 | 109,091 | 163,636 | 218,182 |
| Year 6          | 40,909 | 81,818  | 122,727 | 163,636 |
| Year 7          | 31,818 | 63,636  | 95,455  | 127,273 |
| Year 8          | 13,636 | 27,273  | 40,909  | 54,545  |

</details>


## Rewards for delegators

For staking RON to a validator, a delegator earns the staking reward that is correspondent to the amount that was staked and the commission rate of the validator.

The rewards for a delegator are calculated based on their lowest balance per day. This means that if it's the delegator's first day to delegate, they do not receive any rewards for that period as their lowest balance for that day is zero.

The delegator may get less or no rewards if their chosen validator is punished due to being unavailable (validator nodes are expected to be always online and up to date) or due to malicious activities. The delegator should look at the stats such as the uptime percentage in the validator list to choose a reliable validator to maximize their RON rewards.

<details>
<summary>Expand to see a breakdown of the annual percentage rate</summary>

The following table is a sensitivity analysis of the annual percentage rate (APR) for the first 8 years, considering the commission rate ranging from 5% to 20%, and the staked supply of 50%.

| Commission rate, % | 5%     | 10%   | 15%   | 20%   |
| --------------- | ------ | ----- | ----- | ----- |
| Year 1          | 19.19% | 18.18% | 17.17% | 16.16% |
| Year 2          | 12.17% | 11.53% | 10.89% | 10.25% |
| Year 3          | 9.20%  | 8.72%  | 8.23%  | 7.75% |
| Year 4          | 7.06%  | 6.69%  | 6.32%  | 5.95%  |
| Year 5          | 5.36%  | 5.08%  | 4.80%  | 4.52%  |
| Year 6          | 3.69%  | 3.50%  | 3.30%  | 3.11%  |
| Year 7          | 2.76%  | 2.62%  | 2.47%  | 2.33%  |
| Year 8          | 1.16%  | 1.10%  | 1.04%  | 0.98%  |

The following table is a sensitivity analysis of the annual percentage rate (APR) for the first 8 years, considering the staked supply ranging from 40% to 70%, and the commission rate of 5%.

| Circulating supply staked, % | 40%   | 50%   | 60%   | 70%   |
| ------------------------------ | ----- | ----- | ----- | ----- |
| Year 1                         | 23.99% | 19.19% | 15.99% | 16.16% |
| Year 2                         | 15.21% | 12.17% | 10.14% | 10.25% |
| Year 3                         | 11.50% | 9.20%  | 7.67%  | 7.75%  |
| Year 4                         | 8.83%  | 7.06%  | 5.89%  | 5.95%  |
| Year 5                         | 6.71%  | 5.36%  | 4.47%  | 4.52%  |
| Year 6                         | 4.61%  | 3.69%  | 3.08%  | 3.11%  |
| Year 7                         | 3.45%  | 2.76%  | 2.30%  | 2.33%  |
| Year 8                         | 1.45%  | 1.16%  | 0.97%  | 0.98%  |

</details>


