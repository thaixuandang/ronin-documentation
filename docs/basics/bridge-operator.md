---
description: Bridge operator.
title: Bridge operator
---

The role of the bridge operator is to acknowledge deposit and withdrawal events to facilitate asset transfers between Ronin and other EVM-based chains. Bridge operators have their own rewarding and slashing logic.


## Rewards for bridge operators

The rewards for bridge operators are funded by RON allocation rewards:

* We allocated 1,000,000 RON for bridge operator reward in the first two years.
The rewards are automatically given to the bridge operators at the end of each period.
* In each period, each bridge operator will be given a reward that is proportional to the number of votes in the period. After this period, we will need to find other sources of rewards for the bridge operators. We are planning to introduce other types of rewards with the goal that the operators are profitable without receiving the fund from RON allocation rewards.

## Slashing rules

The system slashes bridge operators for not providing enough signatures.
This is checked against a smart contract that records the
number of the bridge operators' votes.

### Tier 1 operator slashing

If a bridge operator misses more than $10\%$ votes in a day, the operator
doesn't earn the bridge reward on that day.

### Tier 2 operator slashing

If a bridge operator misses more than $30\%$ votes in a day,
the operator doesn't earn any rewards for the next 5 days.