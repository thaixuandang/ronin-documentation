---
title: Roles
description: Who are delegators, validators, and bridge operators, and what they do.
---

## Delegator

A delegator is an individual that delegates their stake to a validator and earns rewards in return. By delegating their stake, delegators can participate in the network and be rewarded without the technical expertise or resources required to run a validator node themselves.

### Stake RON

In Ronin, token holders can choose validators based on various factors such as the performance of the validators and their commission rate.

After choosing the validators, the RON holders can follow the steps in [Stake RON](./../delegators/onboarding/become-delegator.mdx).

## Validator

A validator is an individual or institution that has the following responsibilities:

* Generate blocks: a validator runs the validator node to confirm transactions and generate blocks.
* Act as a chain governor: Governing Validators can propose and vote for changes, such as adding or removing Governing Validators, upgrading smart contracts, and changing thresholds.

### Validator categories

There are three categories of validators:

* **Validator Candidate.** After registering as a validator on Ronin, you'll become a Validator Candidate and have a chance to be selected as a Standard Validator on the next day. To become a Validator Candidate, an individual or institution has to stake 250,000 RON. For instructions on becoming a candidate, see [Register as a validator](./../validators/onboarding/become-validator.mdx).
* **Standard Validator.** Every day, 10 Validator Candidates with the highest amount staked are selected as Standard Validators. The system records your total staking amount at 00:00 UTC every day for the selection process.
* **Governing Validator.** The validators chosen by the community and Sky Mavis to ensure network security. Governing Validators are validators by default, and they account for more than half of the total validator pool.

### Validator selection

The validators are selected using Delegated Proof of Stake (DPoS). Beside the 12 Governing Validators, top 10 Validator Candidates with the highest staked amount are selected as Standard Validators.

### Slashing penalties for validators

Validators who fail to fulfill their responsibilities are subject to [slashing](./../validators/slashing.mdx).

## Bridge operator

A bridge operator is an individual or institution that has the following responsibilities:

* Act as a bridge governor: create proposals for any changes in the bridge, such as adding or removing bridge operators, mapping new tokens, deploying new contract logic, and more. All bridge operators have the same voting power. A proposal is executed if it gets approved by 70% of the operators.
* Run the bridge node: an open-source service that acknowledges deposit and withdrawal events between the Ronin and Ethereum chains.

### Bridge operator selection

The initial set of bridge operators was defined according to [REP-0002](https://github.com/axieinfinity/REPs/blob/main/REP-0002/REP-0002.md#bridge-operator-selection). Subsequently, new operators are added and existing ones removed through proposals that receive approval from the incumbent operators.

### Slashing penalties for bridge operators

Bridge operators who fail to fulfill their responsibilities are subject to [slashing](./../bridge-operators/slashing.md).
