---
description: Ronin consensus protocol.
title: Ronin consensus
---

In May of 2021, Ronin began using the Proof of Authority (PoA) consensus mechanism. In Ronin’s PoA consensus mechanism, the Ronin community hand-selected reliable validators to maintain the network and verify transactions. However, the PoA consensus mechanism required an enormous amount of trust in the chosen group of validators.  As the next step toward decentralization, in April of 2023, Ronin upgraded to Delegated Proof of Stake (DPoS), allowing anyone to become validator. 

## Delegated Proof of Stake

Delegated Proof of Stake (DPoS) is a consensus mechanism where token holders delegate their stake to select validators. These validators verify transactions, produce new blocks, vote for finality, and earn rewards for their work.

Token holders can vote for themselves or delegate stake to a representative. The more tokens a validator receives, the higher their chance of selection. Rewards for producing blocks and voting for finality are shared between validators and delegators (who delegate stake to validators).

In Ronin, a set of validators is selected using DPoS. Then, validators take turns producing blocks and vote for finality. A summary of Ronin's consensus is given as follows:

- **Governing Validators.** While increasing the decentralization of the network, the validator selection process via staking also enables a new vector of attacks. An attacker that controls more than 51\% of the tokens can take over the blockchain. The group of reputable Governing Validators chosen by the community is meant to help prevent such attacks. Besides Governing Validators, any token holders can register to become Validator Candidates.
- **Block production.** For every epoch (or about every 10 minutes), a set of block procedures are randomly selected to produce blocks, of which 12 are reserved for Governing Validators. The remaining 10 slots are chosen among the Validator Candidates based on their staked amount. 
- **Finality Voting.** All validators can participate in finality voting. The voting weight of a validator is proportional to their staked amount.  
- **Delegation.** The delegators delegate their own stake to any validator of their choosing, increasing the validator's chance to be selected as a Standard Validator and earn block production access.

## Block production

At the DPoS launch in April 2023, 22 validators, including 12 Governing Validators and 10 Standard Validators, are selected daily to produce blocks. The 10 Standard Validators are chosen from the Validator Candidates with the highest staked amounts. However, this design does not incentivize token holders to become Validator Candidates if they cannot make it into the top 10 to become Standard Validators. 

In July 2024, Ronin implements an upgrade to introduce Rotating Validators. With this new design, the validator set responsible for producing blocks will be updated every epoch (approximately every 10 minutes). This upgrade ensures that all validators have an opportunity to produce blocks and receive rewards, thereby providing greater incentives for token holders to participate as Validator Candidates.

Below is the overview of how block producers are selected in every epoch. 

- For each period (1 day), the validators jointly compute a random beacon.
- The random beacon in period $i-1$ will be used to select the validators in period $i$.
    - In each epoch, 12 Governing Validators and 10 Rotating Validators are selected.
    - Rotating Validators are randomly selected based on the random beacon.
- For each epoch of period $i$, a set of validators is selected based on the random beacon in period $i-1$ and the epoch number.

### Compute random beacon

A verifiable random function (VRF) is a public-key pseudorandom function that provides proofs of its output's correct calculation. The owner of the secret key can compute the function value and an associated proof for any input value. Everyone else, using the proof and the associated public key, can check that this value was indeed calculated correctly. However, this information cannot be used to find the secret key.

The process of computing the random beacon for period $i$, executed in period $i-1$ consists of 4 steps:
- Step 1: At the beginning of period $i-2$, the Ronin Validator Contract sends the set of Governing Validators to the Random Beacon Contract. At the same time, the Random Beacon Contract sends the random beacon $R_{i-1}$ to the Ronin Validator Contract (this is Step 4 in the previous period).
- Step 2: Each Governing Validator $j$ queries its VRF worker using the random beacon $R_{i-1}$ and obtains the output $\sigma_j$ and the proof $\pi_j$.
- Step 3: Each Governing Validator $j$ submits the output $\sigma_j$ and the proof $\pi_j$ to the Random Beacon Contract (via a system transaction).
- Step 4: At the last epoch of period $i-1$, the Random Beacon Contract computes the random beacon $R_i$ and sends it to the Ronin Validator Contract. $R_i$ is computed as the hash value of all outputs of governing validators. The random seed is the output of VRF with the input as the concatenate of the random beacon of the previous period and the current period number.

## Finality Voting
All validators have the ability to vote for finality. The weight of their votes are based on the staked amount:
- If the staked amount of a validator is smaller than or equal to 1/22 of total stake, the weight is directly proportional to the staked amount. 
- If the staked amount of a validator is larger than 1/22 of total stake, the weight equals 1/22 of total stake. 

Validators confirm a block's validity by providing their signatures on the block's hash. If a block receives enough votes, the validators can create a quorum certificate (QC) to attest to the block's validity. The block's QC is included in its direct descendant block.

Validators vote according to the following rules:
- Rule 1: A validator must not publish two distinct votes for the same height.
- Rule 2: A validator always votes for the latest block of its best chain.
- Rule 3: A validator only votes for the block with a bigger block height than its previous vote.

Once the validators vote for a block, the next block producer collects those votes and creates a Quorum Certificate (QC) if the weight of the voted validators is more than $2/3$ of the total weight. If the validators cannot collect enough votes before the next block is generated, the QC will not be generated.

The QC will be verified by other nodes in the network. A block containing an invalid QC will be considered invalid. The BLS signature scheme is used to optimize the size and verification time of QCs. The BLS signature allows the block producers to aggregate the signatures of validators on a block into a single signature. Compared to unaggregated signatures, the aggregated signature can save up to $n$ times the space. Additionally, nodes can verify the QC of validators with a single signature verification operation.

Finalizing a block involves two steps: justification and finalization.
- A block is considered justified if its QC is included in the header of its direct descendant block.
- A block is considered finalized if it is justified and its direct descendant (in the same epoch) is also justified. If a block is finalized, all of its ancestor blocks are finalized.

In Ronin, validators use the sum of the difficulty field to compare and confirm which chain is the best ancestor to pick. This finality mechanism requires the chain to grow under a new fork choice rule.
- The chain that includes the highest justified block is considered the best chain, even if there are other chains with a higher total difficulty.
- If multiple chains include the highest justified block, the chain with the highest total difficulty is selected as the best chain.

## Slashing rules

We use a slashing mechanism to penalize validators and bridge operators for malicious behavior.

:::note
A "day" in the slashing rules refers to the period
from midnight to midnight UTC.
:::

### Double-sign validator

It's a serious error when a validator signs more than one block with
the same height. As mentioned in [Security and finality](#security-and-finality),
validators who engage in double-signing effectively launch a Clone
attack to break the security of the blockchain. Because our
implementation already has a logic to prevent double-signing, only
malicious code can trigger this behavior.

Anyone can submit a slash request with the double-sign evidence, which
should contain the two block headers with the same height, sealed by
the same validator. Upon verifying the evidence, the offending
validator is penalized as follows:

* The validator is jailed for $2^{63}-1$ blocks and can't be a
validator in the future.
* The validator is slashed the minimum staking amount of
self-delegated RON.
* The validator doesn't earn commission and the staking reward while in jail.

### Unavailability validator

The performance of Ronin relies on the ability of everyone in the
validator set to produce blocks on time when it's their turn.
If a validator misses their turn, it affects the performance of
the entire system. Thus, we implemented a mechanism that penalizes
validators who miss too many blocks.

We use a smart contract to record the number of missed blocks for each
validator. If the number of missed blocks exceeds a predefined threshold,
the validator gets slashed.

#### Tier 1 validator slashing

If a validator misses more than 100 blocks in a day,
they don't earn commission and the staking reward on that day.

#### Tier 2 validator slashing

If a validator misses more than 500 blocks in a day, the following penalties apply:

* The validator doesn't earn commission and the staking reward on that day.
* The validator is slashed 1,000 of self-delegated RON.
* The validator is jailed for about 2 days (57,600 blocks) and is
banned from the validator set while in jail.

:::info Credit score and bailout system
While we encourage validators to be online and produce blocks in turn,
technical issues can still happen. A validator might be well-performing,
but if their machine suddenly crashes, they get slashed and jailed.
Ronin's credit score system awards validators with credits that can be
used to [bail out](./../validators/slashing.mdx#bailout)
of jail in the event of tier 2 validator slashing.

Here's how this system works:

* Every day, each validator (who is not in jail) is given 50 credits.
The maximum number of credits per validator is 600.
* A validator loses 1 credit for every missed block.
* A jailed validator can use 2 credits for each epoch to bail out of jail.
* After getting bailed out, the validator can claim half of the reward for the remaining time of the day.
:::

#### Tier 3 validator slashing

After getting bailed out, if the validator
misses 100 more blocks on the same day, the following penalties apply:

* The reward after bailout is removed.
* The validator is slashed 1,000 of self-delegated RON.
* The validator is jailed for about 2 days (57,600 blocks).

This time, the validator can't bail out.

:::info Temporary maintenance mode
Validators can [schedule](./../validators/manage/maintenance.mdx) temporary maintenance, during which they don't get slashed for unavailability.
:::

### Double-vote validator
A validator must not publish two distinct votes for the same height. Anyone can submit a slash request with the double-sign evidence, which should contain the two signatures of finality voting of two blocks at the same height. Upon verifying the evidence, the offending
validator is penalized as follows:

* The validator is jailed for $2^{63}-1$ blocks and can't be a
validator in the future.
* The validator is slashed the minimum staking amount of
self-delegated RON.
* The validator doesn't earn commission and the staking reward while in jail.