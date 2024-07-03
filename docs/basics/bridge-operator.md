---
description: Bridge operator.
title: Bridge operator
---

The role of the bridge operator is to acknowledge deposit and withdrawal events to facilitate asset transfers between Ronin and other EVM-based chains. Bridge operators have their own rewarding and slashing logic.


## Rewards for bridge operators

* Ronin allocated 1,000,000 RON each year for bridge operator reward in the first two years.
The rewards are automatically given to the bridge operators at the end of each period.
* In each period, each bridge operator be given a reward that is proportional to the number of votes in the period. 

## Slashing rules

The system slashes bridge operators for not providing enough signatures.
A smart contract records the number of the bridge operators' votes and slash unavailable bridge operators.

### Tier 1 operator slashing

If a bridge operator misses more than $10\%$ votes in a day, the operator
doesn't earn the bridge reward on that day.

### Tier 2 operator slashing

If a bridge operator misses more than $30\%$ votes in a day,
the operator doesn't earn any rewards for the next 5 days.